import { useState } from "react";
import { mockProfile } from "../data/profile";

export function ProfilePage() {
  const [profile, setProfile] = useState(mockProfile);

  function handleChange(e) {
    const { name, value } = e.target;

    setProfile((currentProfile) => ({
      ...currentProfile,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Later:
    // await authApi.updateProfile(profile);

    alert("Profile saved! (Mock)");
  }

  const initials = profile.fullName
    ? profile.fullName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : profile.username.slice(0, 2).toUpperCase();

  return (
    <main className="min-h-[calc(100vh-80px)] bg-navy-950 px-6 py-10 text-amber-50">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}

        <section className="rounded-lg border border-navy-700 bg-navy-900 p-8 shadow-lg">
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
                Member since {profile.joined}
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Visited Countries" value={profile.stats.visited} />

          <StatCard title="Want to Visit" value={profile.stats.wishlist} />

          <StatCard title="Reviews Posted" value={profile.stats.reviews} />

          <StatCard title="Quizzes Played" value={profile.stats.quizzes} />
        </section>

        {/* Edit Form */}

        <section className="rounded-lg border border-navy-700 bg-navy-900 p-8 shadow-lg">
          <h2 className="mb-6 font-heading text-2xl">Edit Profile</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1 block text-sm">Username</label>

              <input
                name="username"
                value={profile.username}
                onChange={handleChange}
                className="w-full rounded border border-navy-600 bg-navy-800 px-3 py-2 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm">Full Name</label>

              <input
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                className="w-full rounded border border-navy-600 bg-navy-800 px-3 py-2 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm">Email</label>

              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full rounded border border-navy-600 bg-navy-800 px-3 py-2 focus:border-amber-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="rounded bg-amber-500 px-6 py-2 font-semibold text-navy-950 transition hover:bg-amber-400"
            >
              Save Changes
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-lg border border-navy-700 bg-navy-900 p-6 text-center shadow-lg">
      <div className="text-4xl font-bold text-amber-400">{value}</div>

      <div className="mt-2 text-sm text-amber-50/60">{title}</div>
    </div>
  );
}
