import { useEffect, useState } from "react";
import { authApi } from "../api/authApi";
import { listsApi } from "../api/listsApi";
import { sharesApi } from "../api/sharesApi";
import { quizzesApi } from "../api/quizzesApi";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { ContinentPreferences } from "../components/profile/ContinentPreferences";
import { LanguagePreferences } from "../components/profile/LanguagePreferences";
import { formatMonthYear } from "../utils/format";
import { Link } from "react-router-dom";
import { ChangePasswordForm } from "../components/profile/ChangePasswordForm";


export function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({
    visited: 0,
    wishlist: 0,
    reviews: 0,
    quizzes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([
      authApi.getMe(),
      listsApi.getMine(),
      sharesApi.getMine(),
      quizzesApi.getMyAttempts(),
    ])
      .then(([me, lists, shares, attempts]) => {
        setProfile(me);
        setStats({
          visited: lists.filter((l) => l.listType === "Visited").length,
          wishlist: lists.filter((l) => l.listType === "WantToVisit").length,
          reviews: shares.length,
          quizzes: attempts.length,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile((current) => ({ ...current, [name]: value }));
    setSaved(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await authApi.updateProfile({
        email: profile.email,
        fullName: profile.fullName,
      });
      setProfile(updated);
      setSaved(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading || !profile)
    return (
      <main className="min-h-[80vh] flex items-center justify-center bg-navy-950 text-amber-50">
        Loading...
      </main>
    );

  const initials = profile.fullName
    ? profile.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : profile.username.slice(0, 2).toUpperCase();

  return (
    <main className="min-h-[calc(100vh-80px)] bg-navy-950 px-6 py-10 text-amber-50">
      <div className="mx-auto max-w-6xl space-y-8">
        <Card className="shadow-lg">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-amber-500 text-3xl font-bold text-navy-950">
              {initials}
            </div>
            <div>
              <h1 className="font-heading text-4xl">
                {profile.fullName || profile.username}
              </h1>
              <p className="mt-2 text-amber-400">@{profile.username}</p>
              <p className="mt-1 text-sm text-amber-50/50">
                Member since {formatMonthYear(profile.createdAt)}
              </p>
            </div>
          </div>
        </Card>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Visited Countries"
            value={stats.visited}
            to="/my-lists"
          />
          <StatCard
            title="Want to Visit"
            value={stats.wishlist}
            to="/my-lists"
          />
          <StatCard
            title="Reviews Posted"
            value={stats.reviews}
            to="/my-shares"
          />
          <StatCard
            title="Quizzes Played"
            value={stats.quizzes}
            to="/my-quiz-history"
          />
        </section>

        <Card className="shadow-lg">
          <h2 className="mb-6 font-heading text-2xl">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              name="fullName"
              value={profile.fullName ?? ""}
              onChange={handleChange}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              {saved && <span className="text-sm text-green-400">Saved!</span>}
            </div>
          </form>
        </Card>
        <ChangePasswordForm />
        <ContinentPreferences />
        <LanguagePreferences />
      </div>
    </main>
  );
}


function StatCard({ title, value, to }) {
  const content = (
    <>
      <div className="text-4xl font-bold text-amber-400">{value}</div>
      <div className="mt-2 text-sm text-amber-50/60">{title}</div>
    </>
  );
  if (to)
    return (
      <Link
        to={to}
        className="block rounded-lg border border-navy-700 bg-navy-900 p-6 text-center shadow-lg transition hover:-translate-y-1 hover:border-amber-500"
      >
        {content}
      </Link>
    );
  return <Card className="text-center shadow-lg">{content}</Card>;
}
