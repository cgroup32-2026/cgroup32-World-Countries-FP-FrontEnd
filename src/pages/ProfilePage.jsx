import { useState } from "react";
import { Link } from "react-router-dom";
import { mockProfile } from "../data/profile";
import { myListEntries } from "../data/myLists";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { formatMonthYear } from "../utils/format";
import { ContinentPreferences } from "../components/profile/ContinentPreferences";
import { LanguagePreferences } from "../components/profile/LanguagePreferences";
import {
  myPreferredContinents,
  myLanguagePreferences,
} from "../data/myPreferences";

export function ProfilePage() {
  const [profile, setProfile] = useState(mockProfile);
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    // Later: only email + fullName are sent — backend rejects a username change
    // await authApi.updateProfile({ email: profile.email, fullName: profile.fullName });

    setTimeout(() => {
      setSaving(false);
      alert("Profile saved! (Mock)");
    }, 400);
  }

  const initials = profile.fullName
    ? profile.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : profile.username.slice(0, 2).toUpperCase();

  const visitedCount = myListEntries.filter(
    (e) => e.listType === "Visited",
  ).length;
  const wishlistCount = myListEntries.filter(
    (e) => e.listType === "WantToVisit",
  ).length;

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
          <StatCard title="Visited Countries" value={visitedCount} />
          <StatCard title="Want to Visit" value={wishlistCount} />
          <Link to="/my-shares">
            <StatCard
              title="Reviews Posted"
              value={profile.stats.reviews}
              clickable
            />
          </Link>
          <Link to="/my-quiz-history">
            <StatCard
              title="Quizzes Played"
              value={profile.stats.quizzes}
              clickable
            />
          </Link>
        </section>

        <Card className="shadow-lg">
          <h2 className="mb-6 font-heading text-2xl">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Card>

        <ContinentPreferences initialSelected={myPreferredContinents} />
        <LanguagePreferences initialSelected={myLanguagePreferences} />
      </div>
    </main>
  );
}

function StatCard({ title, value, clickable = false }) {
  return (
    <Card
      className={`text-center shadow-lg ${
        clickable
          ? "transition hover:-translate-y-1 hover:border-amber-500"
          : ""
      }`}
    >
      <div className="text-4xl font-bold text-amber-400">{value}</div>

      <div className="mt-2 text-sm text-amber-50/60">{title}</div>

      {clickable && (
        <div className="mt-3 text-xs font-semibold text-amber-400">
          View My Shares →
        </div>
      )}
    </Card>
  );
}
