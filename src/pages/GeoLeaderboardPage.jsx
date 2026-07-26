import { useEffect, useState } from "react";
import { geoGameApi } from "../api/geoGameApi";
import { Card } from "../components/ui/Card";

export function GeoLeaderboardPage() {
  const [modes, setModes] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  if (!activeTab) return;
  let cancelled = false;
  setLoading(true);

  const request = activeTab === "total" ? geoGameApi.getTotalLeaderboard() : geoGameApi.getLeaderboard(activeTab);
  request
    .then((data) => { if (!cancelled) setEntries(data); })
    .catch((err) => { if (!cancelled) setError(err.message); })
    .finally(() => { if (!cancelled) setLoading(false); });

  return () => { cancelled = true; };
}, [activeTab]);

  const activeLabel = activeTab === "total" ? "Total (All Modes)" : modes.find((m) => m.modeCode === activeTab)?.label;

  return (
    <main className="min-h-[calc(100vh-80px)] bg-navy-950 px-6 py-10 text-amber-50">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="font-heading text-5xl text-amber-400">Leaderboard</h1>
          <p className="mt-3 text-amber-50/70">Top Pinpoint scores across every mode.</p>
        </header>

        <div className="mb-6 flex flex-wrap gap-2">
          <button onClick={() => setActiveTab("total")} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${activeTab === "total" ? "border-amber-400 bg-amber-500 text-navy-950" : "border-navy-600 text-amber-50/70 hover:border-amber-400"}`}>Total</button>
          {modes.map((mode) => (
            <button key={mode.modeCode} onClick={() => setActiveTab(mode.modeCode)} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${activeTab === mode.modeCode ? "border-amber-400 bg-amber-500 text-navy-950" : "border-navy-600 text-amber-50/70 hover:border-amber-400"}`}>{mode.label}</button>
          ))}
        </div>

        {error && <p className="mb-4 text-red-300">{error}</p>}

        <Card className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-navy-700 bg-navy-800">
              <tr><th className="px-6 py-4">Rank</th><th className="px-6 py-4">Player</th><th className="px-6 py-4">Score</th>{activeTab !== "total" && <th className="px-6 py-4">Rounds</th>}</tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-amber-50/50">Loading...</td></tr>
              ) : entries.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-amber-50/50">No scores yet for {activeLabel}.</td></tr>
              ) : (
                entries.map((entry, i) => (
                  <tr key={entry.username + i} className="border-b border-navy-700 last:border-b-0">
                    <td className="px-6 py-4 font-semibold text-amber-400">#{i + 1}</td>
                    <td className="px-6 py-4 text-amber-50">{entry.username}</td>
                    <td className="px-6 py-4 text-amber-50/80">{(activeTab === "total" ? entry.totalScore : entry.score).toLocaleString()}</td>
                    {activeTab !== "total" && <td className="px-6 py-4 text-amber-50/60">{entry.rounds}</td>}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </main>
  );
}