import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import { countriesApi } from "../api/countriesApi";
import { geoGameApi } from "../api/geoGameApi";
import { useAuth } from "../context/AuthContext";
import { getBoundingBox, paddedBounds, distanceKm } from "../utils/geo";
import {
  getTier,
  baseScoreForTier,
  updateCombo,
  timeBonusForTier,
  deriveRoundCount,
  regionToModeCode,
  TIER_COLORS,
  INITIAL_TIME_SECONDS,
  MAX_BANK_SECONDS,
  getEffectiveRadius,
} from "../utils/geoGame";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
const dotIcon = (color) =>
  L.divIcon({
    className: "",
    html: `<div style="background:${color};width:16px;height:16px;border-radius:50%;border:2px solid white;"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
const guessIcon = dotIcon("#d68a2d");
const actualIcon = dotIcon("#22c55e");

const REGIONS = [
  "All Regions",
  "Africa",
  "Asia",
  "Europe",
  "Americas",
  "Oceania",
];
const MIN_POOL_SIZE = 5;

function ClickCapture({ onGuess, disabled }) {
  useMapEvents({
    click(e) {
      if (!disabled) onGuess([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export function GeoGamePage() {
  const { isAuthenticated } = useAuth();
  const [countryPool, setCountryPool] = useState([]);
  const [landmarkPool, setLandmarkPool] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [gameMode, setGameMode] = useState("flags"); // 'flags' | 'landmarks'
  const [selectedRegion, setSelectedRegion] = useState("All Regions");

  const [phase, setPhase] = useState("menu");
  const [round, setRound] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [usedIds, setUsedIds] = useState([]);
  const [target, setTarget] = useState(null);
  const [guess, setGuess] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [lastTier, setLastTier] = useState(null);
  const [lastRoundScore, setLastRoundScore] = useState(0);
  const [lastTimeBonus, setLastTimeBonus] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [comboMultiplier, setComboMultiplier] = useState(1.0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [endReason, setEndReason] = useState(null);

  useEffect(() => {
    Promise.all([countriesApi.getAll(), geoGameApi.getLandmarkPool()])
      .then(([countries, landmarks]) => {
        setCountryPool(countries);
        setLandmarkPool(landmarks);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const activePool = useMemo(() => {
    if (gameMode === "flags") {
      const withCoords = countryPool.filter(
        (c) => c.latitude != null && c.longitude != null && c.flagUrl,
      );
      return selectedRegion === "All Regions"
        ? withCoords
        : withCoords.filter((c) => c.region === selectedRegion);
    }
    return selectedRegion === "All Regions"
      ? landmarkPool
      : landmarkPool.filter((l) => l.region === selectedRegion);
  }, [gameMode, countryPool, landmarkPool, selectedRegion]);

  const targetIdKey = gameMode === "flags" ? "countryId" : "landmarkId";
  const previewRoundCount = deriveRoundCount(activePool.length);
  const poolTooSmall = activePool.length < MIN_POOL_SIZE;

  const regionBounds = useMemo(() => {
    if (selectedRegion === "All Regions" || activePool.length === 0)
      return null;
    return paddedBounds(getBoundingBox(activePool));
  }, [activePool, selectedRegion]);

  function pickTarget(excludeIds) {
    const candidates = activePool.filter(
      (item) => !excludeIds.includes(item[targetIdKey]),
    );
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function startGame() {
    const rounds = deriveRoundCount(activePool.length);
    const first = pickTarget([]);
    setTotalRounds(rounds);
    setUsedIds([first[targetIdKey]]);
    setTarget(first);
    setRound(1);
    setTotalScore(0);
    setComboMultiplier(1.0);
    setTimeLeft(INITIAL_TIME_SECONDS);
    setGuess(null);
    setRevealed(false);
    setEndReason(null);
    setPhase("playing");
  }

  async function endGame(reason) {
    setEndReason(reason);
    setPhase("finished");
    if (isAuthenticated) {
      try {
        await geoGameApi.submitAttempt({
          modeCode: regionToModeCode(gameMode, selectedRegion),
          score: totalScore,
          rounds: round,
        });
      } catch (err) {
        console.error("Failed to submit score", err);
      }
    }
  }

  useEffect(() => {
    if (phase !== "playing" || revealed) return;
    const timer = setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          clearInterval(timer);
          endGame("timeout");
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, revealed]);

  function submitGuess() {
    if (!guess) return;
    const dist = distanceKm(
      guess[0],
      guess[1],
      target.latitude,
      target.longitude,
    );
    const radius = getEffectiveRadius(target.areaKm2);
    const tier = getTier(dist, radius);
    const base = baseScoreForTier(dist, radius);
    const roundScore = Math.round(base * comboMultiplier);
    const bonus = timeBonusForTier(tier.name, round, totalRounds);

    setLastTier(tier.name);
    setLastRoundScore(roundScore);
    setLastTimeBonus(bonus);
    setTotalScore((s) => s + roundScore);
    setComboMultiplier(updateCombo(comboMultiplier, tier.name));
    setTimeLeft((t) => Math.min(MAX_BANK_SECONDS, t + bonus));
    setRevealed(true);
  }

  function nextRound() {
    if (round >= totalRounds) {
      endGame("completed");
      return;
    }
    const next = pickTarget([...usedIds]);
    setUsedIds((ids) => [...ids, next[targetIdKey]]);
    setTarget(next);
    setRound((r) => r + 1);
    setGuess(null);
    setRevealed(false);
  }

  if (loading)
    return (
      <main className="min-h-[80vh] flex items-center justify-center bg-navy-950 text-amber-50">
        Loading...
      </main>
    );
  if (error)
    return (
      <main className="min-h-[80vh] flex items-center justify-center bg-navy-950 text-red-300">
        {error}
      </main>
    );

  if (phase === "menu") {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-navy-950 flex items-center justify-center px-6">
        <div className="w-full max-w-xl rounded-lg border border-navy-700 bg-navy-900 p-10 text-center">
          <h1 className="font-heading text-4xl text-amber-400">Pinpoint</h1>
          <p className="mt-4 text-amber-50/70">
            Click the map where you think the shown place is. Chain good guesses
            for a multiplier, earn time back to keep going.
          </p>

          <div className="mt-6 flex justify-center gap-2">
            <button
              onClick={() => setGameMode("flags")}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${gameMode === "flags" ? "border-amber-400 bg-amber-500 text-navy-950" : "border-navy-600 text-amber-50/70 hover:border-amber-400"}`}
            >
              Flags
            </button>
            <button
              onClick={() => setGameMode("landmarks")}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${gameMode === "landmarks" ? "border-amber-400 bg-amber-500 text-navy-950" : "border-navy-600 text-amber-50/70 hover:border-amber-400"}`}
            >
              Landmarks
            </button>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm text-amber-50/60">
              Region
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="rounded-md border border-navy-600 bg-navy-800 px-4 py-2 text-amber-50 focus:border-amber-400 focus:outline-none"
            >
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-amber-50/50">
              {poolTooSmall
                ? "Not enough entries for this region/mode yet."
                : `${previewRoundCount} rounds this run`}
            </p>
          </div>

          {!isAuthenticated && (
            <p className="mt-4 text-xs text-amber-50/40">
              Log in to save your score to the leaderboard.
            </p>
          )}

          <button
            onClick={startGame}
            disabled={poolTooSmall}
            className="mt-8 rounded bg-amber-500 px-8 py-3 font-semibold text-navy-950 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-amber-400"
          >
            Start Game
          </button>
        </div>
      </main>
    );
  }

  if (phase === "finished") {
    const reasonLabel = {
      completed: "Run Complete",
      timeout: "Time's Up",
      cashout: "Cashed Out",
    }[endReason];
    return (
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-navy-950 px-6">
        <div className="w-full max-w-xl rounded-lg border border-navy-700 bg-navy-900 p-10 text-center">
          <div className="text-6xl">🌍</div>
          <h1 className="mt-4 font-heading text-4xl text-amber-400">
            {reasonLabel}
          </h1>
          <p className="mt-4 text-lg text-amber-50">
            Final Score:{" "}
            <span className="font-bold text-amber-400">
              {totalScore.toLocaleString()}
            </span>
          </p>
          <p className="mt-1 text-sm text-amber-50/60">
            {round} round{round === 1 ? "" : "s"} played
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setPhase("menu")}
              className="rounded bg-amber-500 px-8 py-3 font-semibold text-navy-950 hover:bg-amber-400"
            >
              Play Again
            </button>
            <Link
              to="/leaderboard"
              className="rounded border border-amber-500 px-8 py-3 font-semibold text-amber-400 hover:bg-amber-500 hover:text-navy-950"
            >
              View Leaderboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const timerCritical = timeLeft <= 5;
  const clueImage = gameMode === "flags" ? target.flagUrl : target.imageUrl;
  const revealLabel =
    gameMode === "flags"
      ? target.nameCommon
      : `${target.title} — ${target.countryName}`;

  return (
    <main className="min-h-[calc(100vh-80px)] bg-navy-950 px-6 py-10 text-amber-50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-heading text-2xl text-amber-400">
            Round {round} / {totalRounds}
          </h1>
          <div className="flex items-center gap-4">
            <p className="text-sm text-amber-50/70">
              Score:{" "}
              <span className="font-semibold text-amber-400">
                {totalScore.toLocaleString()}
              </span>
            </p>
            <p className="text-sm text-amber-50/70">
              Combo:{" "}
              <span className="font-semibold text-amber-400">
                {comboMultiplier.toFixed(2)}x
              </span>
            </p>
            <div
              className={`rounded px-4 py-1.5 font-bold ${timerCritical ? "animate-pulse bg-red-900 text-red-300" : "bg-navy-900 text-amber-400"}`}
            >
              {timeLeft}s
            </div>
          </div>
        </div>

        <div className="mb-4 flex flex-col items-center gap-3 rounded-lg border border-navy-700 bg-navy-900 p-5">
          {gameMode === "flags" ? (
            <img
              src={clueImage}
              alt="Mystery flag"
              className="h-16 rounded shadow-lg"
            />
          ) : (
            <img
              src={clueImage}
              alt="Mystery landmark"
              className="h-48 w-full max-w-md rounded object-cover shadow-lg"
            />
          )}
        </div>

        <div
          className="overflow-hidden rounded-lg border border-navy-700"
          style={{ height: "480px" }}
        >
          <MapContainer
            {...(regionBounds
              ? { bounds: regionBounds }
              : { center: [20, 0], zoom: 2 })}
            minZoom={2}
            maxBounds={
              regionBounds ?? [
                [-90, -180],
                [90, 180],
              ]
            }
            maxBoundsViscosity={1.0}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <ClickCapture onGuess={setGuess} disabled={revealed} />
            {guess && <Marker position={guess} icon={guessIcon} />}
            {revealed && (
              <Marker
                position={[target.latitude, target.longitude]}
                icon={actualIcon}
              />
            )}
            {revealed && guess && (
              <Polyline
                positions={[guess, [target.latitude, target.longitude]]}
                color="#f0c178"
                dashArray="6"
              />
            )}
          </MapContainer>
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          {revealed ? (
            <>
              <p className="text-lg text-amber-50">
                {revealLabel} —{" "}
                <span className={`font-bold ${TIER_COLORS[lastTier]}`}>
                  {lastTier}
                </span>{" "}
                (+{lastRoundScore.toLocaleString()} pts, +{lastTimeBonus}s)
              </p>
              <div className="flex gap-4">
                <button
                  onClick={nextRound}
                  className="rounded bg-amber-500 px-8 py-3 font-semibold text-navy-950 hover:bg-amber-400"
                >
                  {round >= totalRounds ? "See Results" : "Next Round"}
                </button>
                {round < totalRounds && (
                  <button
                    onClick={() => endGame("cashout")}
                    className="rounded border border-amber-500 px-8 py-3 font-semibold text-amber-400 hover:bg-amber-500 hover:text-navy-950"
                  >
                    Cash Out
                  </button>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={submitGuess}
              disabled={!guess}
              className="rounded bg-amber-500 px-8 py-3 font-semibold text-navy-950 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-amber-400"
            >
              Submit Guess
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
