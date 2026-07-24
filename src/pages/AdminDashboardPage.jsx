import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card";
import { Link } from "react-router-dom";
import { adminApi } from "../api/adminApi";
import { formatNumber } from "../utils/format";

export function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi
      .getStats()
      .then(setStats)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

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

  return (
    <main className="min-h-[calc(100vh-80px)] bg-navy-950 px-6 py-10 text-amber-50">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <h1 className="font-heading text-5xl text-amber-400">
            Admin Dashboard
          </h1>
          <p className="mt-3 text-amber-50/70">
            Monitor World Countries usage and activity.
          </p>
        </header>
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AdminStatCard label="Total Users" value={stats.totalUsers} />
          <AdminStatCard label="Logins Today" value={stats.loginsToday} />
          <AdminStatCard
            label="Countries Imported"
            value={stats.totalCountriesImported}
          />
          <AdminStatCard
            label="Saved Countries"
            value={stats.totalSavedCountries}
          />
          <AdminStatCard label="Total Shares" value={stats.totalShares} />
          <AdminStatCard
            label="Quiz Attempts"
            value={stats.totalQuizAttempts}
          />
        </section>
        <div className="mt-8">
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/admin/users"
              className="inline-block rounded-md bg-amber-500 px-5 py-2.5 font-semibold text-navy-950 transition hover:bg-amber-400"
            >
              Manage Users →
            </Link>

            <Link
              to="/admin/countries"
              className="inline-block rounded-md border border-amber-500 px-5 py-2.5 font-semibold text-amber-400 transition hover:bg-amber-500 hover:text-navy-950"
            >
              Manage Countries →
            </Link>
            <Link
              to="/admin/login-history"
              className="inline-block rounded-md border border-amber-500 px-5 py-2.5 font-semibold text-amber-400 transition hover:bg-amber-500 hover:text-navy-950"
            >
              Login History →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function AdminStatCard({ label, value }) {
  return (
    <Card className="shadow-lg">
      <p className="text-sm text-amber-50/60">{label}</p>
      <p className="mt-3 text-4xl font-bold text-amber-400">
        {formatNumber(value)}
      </p>
    </Card>
  );
}
