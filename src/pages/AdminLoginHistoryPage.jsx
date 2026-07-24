import { useEffect, useState } from "react";
import { adminApi } from "../api/adminApi";
import { Card } from "../components/ui/Card";

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

export function AdminLoginHistoryPage() {
  const [selectedDate, setSelectedDate] = useState(todayIsoDate());
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    adminApi
      .getLoginHistory(selectedDate)
      .then(setEntries)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [selectedDate]);

  return (
    <main className="min-h-[calc(100vh-80px)] bg-navy-950 px-6 py-10 text-amber-50">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-5xl text-amber-400">
              Login History
            </h1>
            <p className="mt-3 text-amber-50/70">
              See who logged in on a given day.
            </p>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-md border border-navy-600 bg-navy-800 px-3 py-2 text-amber-50 focus:border-amber-400 focus:outline-none"
          />
        </header>

        {loading ? (
          <p className="text-amber-50/60">Loading...</p>
        ) : error ? (
          <p className="text-red-300">{error}</p>
        ) : entries.length === 0 ? (
          <Card className="py-16 text-center">
            <p className="text-lg text-amber-50/60">
              No logins recorded for this date.
            </p>
          </Card>
        ) : (
          <Card className="overflow-x-auto p-0">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-navy-700 bg-navy-800">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Login Time</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr
                    key={entry.logId}
                    className="border-b border-navy-700 last:border-b-0"
                  >
                    <td className="px-6 py-4 text-amber-50">
                      {entry.username}
                    </td>
                    <td className="px-6 py-4 text-amber-50/70">
                      {new Date(entry.loginAt).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </main>
  );
}
