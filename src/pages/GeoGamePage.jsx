import "leaflet/dist/leaflet.css";
import { useEffect, useState, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { countriesApi } from "../api/countriesApi";
import {
  getBoundingBox,
  paddedBounds,
  distanceKm,
  scoreForDistance,
  titleForScore,
} from "../utils/geo";

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
const TOTAL_ROUNDS = 5;
const REGIONS = [
  "All Regions",
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Oceania",
];

function ClickCapture({ onGuess, disabled }) {
  useMapEvents({
    click(e) {
      if (!disabled) onGuess([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export function GeoGamePage() {
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [pool, setPool] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [usedIds, setUsedIds] = useState([]);
  const [target, setTarget] = useState(null);
  const [guess, setGuess] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [roundScore, setRoundScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const regionPool = useMemo(
    () =>
      selectedRegion === "All Regions"
        ? pool
        : pool.filter((c) => c.region === selectedRegion),
    [pool, selectedRegion],
  );

  const regionBounds = useMemo(
    () =>
      selectedRegion === "All Regions" || regionPool.length === 0
        ? null
        : paddedBounds(getBoundingBox(regionPool)),
    [regionPool, selectedRegion],
  );

  const regionMaxDistance = useMemo(() => {
    if (selectedRegion === "All Regions" || regionPool.length === 0)
      return 20000;
    const box = getBoundingBox(regionPool);
    return Math.max(
      distanceKm(box.minLat, box.minLng, box.maxLat, box.maxLng),
      500,
    );
  }, [regionPool, selectedRegion]);

  useEffect(() => {
    countriesApi
      .getAll()
      .then((data) =>
        setPool(
          data.filter(
            (c) => c.latitude != null && c.longitude != null && c.flagUrl,
          ),
        ),
      )
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function pickTarget(excludeIds) {
    const candidates = regionPool.filter(
      (c) => !excludeIds.includes(c.countryId),
    );
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function startGame() {
    const first = pickTarget([]);
    setUsedIds([first.countryId]);
    setTarget(first);
    setRound(1);
    setTotalScore(0);
    setGuess(null);
    setRevealed(false);
    setStarted(true);
    setFinished(false);
  }

  function submitGuess() {
    if (!guess) return;
    const dist = distanceKm(
      guess[0],
      guess[1],
      target.latitude,
      target.longitude,
    );
    const points = scoreForDistance(dist, regionMaxDistance);
    setRoundScore(points);
    setTotalScore((current) => current + points);
    setRevealed(true);
  }

  function nextRound() {
    if (round >= TOTAL_ROUNDS) {
      setFinished(true);
      return;
    }
    const next = pickTarget(usedIds);
    setUsedIds((current) => [...current, next.countryId]);
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

  if (!started) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-navy-950 flex items-center justify-center px-6">
        <div className="w-full max-w-xl rounded-lg border border-navy-700 bg-navy-900 p-10 text-center">
          <h1 className="font-heading text-4xl text-amber-400">Pinpoint</h1>
          <p className="mt-4 text-amber-50/70">
            You'll see a flag — click the map where you think that country is.{" "}
            {TOTAL_ROUNDS} rounds, closer guesses score more.
          </p>

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
          </div>

          <button
            onClick={startGame}
            className="mt-8 rounded bg-amber-500 px-8 py-3 font-semibold text-navy-950 hover:bg-amber-400"
          >
            Start Game
          </button>
        </div>
      </main>
    );
  }

  if (finished) {
    return (
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-navy-950 px-6">
        <div className="w-full max-w-xl rounded-lg border border-navy-700 bg-navy-900 p-10 text-center">
          <div className="text-6xl">🌍</div>
          <h1 className="mt-4 font-heading text-4xl text-amber-400">
            Game Complete
          </h1>
          <p className="mt-4 text-lg text-amber-50">
            Total Score:{" "}
            <span className="font-bold text-amber-400">
              {totalScore.toLocaleString()}
            </span>{" "}
            / {TOTAL_ROUNDS * 5000}
          </p>
          <p className="mt-2 text-xl text-amber-50">
            Rank:{" "}
            <span className="font-semibold">{titleForScore(totalScore)}</span>
          </p>
          <button
            onClick={startGame}
            className="mt-8 rounded bg-amber-500 px-8 py-3 font-semibold text-navy-950 hover:bg-amber-400"
          >
            Play Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-navy-950 px-6 py-10 text-amber-50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-heading text-3xl text-amber-400">
            Round {round} / {TOTAL_ROUNDS}
          </h1>
          <p className="text-amber-50/70">
            Score so far:{" "}
            <span className="font-semibold text-amber-400">
              {totalScore.toLocaleString()}
            </span>
          </p>
        </div>

        <div className="mb-6 flex flex-col items-center gap-3 rounded-lg border border-navy-700 bg-navy-900 p-6">
          <img
            src={target.flagUrl}
            alt="Mystery country flag"
            className="h-20 rounded shadow-lg"
          />
          <p className="text-amber-50/70">
            Click on the map where you think this country is.
          </p>
        </div>

        <div
          className="overflow-hidden rounded-lg border border-navy-700"
          style={{ height: "500px" }}
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
                <span className="font-semibold text-amber-400">
                  {target.nameCommon}
                </span>{" "}
                — you scored{" "}
                <span className="font-bold text-amber-400">
                  {roundScore.toLocaleString()}
                </span>{" "}
                points
              </p>
              <button
                onClick={nextRound}
                className="rounded bg-amber-500 px-8 py-3 font-semibold text-navy-950 hover:bg-amber-400"
              >
                {round >= TOTAL_ROUNDS ? "See Results" : "Next Round"}
              </button>
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
