import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const featuredCountries = [
  {
    name: "Japan",
    code: "JP",
    region: "Asia",
    description:
      "A fascinating blend of ancient tradition and modern innovation.",
    emoji: "🇯🇵",
  },
  {
    name: "Italy",
    code: "IT",
    region: "Europe",
    description:
      "Explore centuries of history, culture, art, and unforgettable cuisine.",
    emoji: "🇮🇹",
  },
  {
    name: "New Zealand",
    code: "NZ",
    region: "Oceania",
    description:
      "Discover breathtaking landscapes and unforgettable adventures.",
    emoji: "🇳🇿",
  },
];

export function HomePage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <main className="bg-navy-950 text-amber-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-950" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
              Explore the world
            </p>

            <h1 className="font-heading text-5xl leading-tight text-amber-50 md:text-6xl lg:text-7xl">
              Every country has a story.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-amber-50/70">
              Discover countries, learn about cultures, track the places you've
              visited, plan your next adventure, and test your geography
              knowledge.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/countries"
                className="rounded-md bg-amber-500 px-6 py-3 font-semibold text-navy-950 transition hover:bg-amber-400"
              >
                Explore Countries
              </Link>

              <Link
                to="/quizzes"
                className="rounded-md border border-navy-600 px-6 py-3 font-semibold text-amber-50 transition hover:border-amber-400 hover:text-amber-400"
              >
                Test Your Knowledge
              </Link>
            </div>

            {isAuthenticated && (
              <p className="mt-6 text-sm text-amber-50/50">
                Welcome back, {user?.username}.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="border-y border-navy-800 bg-navy-900/50">
        <div className="mx-auto grid max-w-7xl gap-px md:grid-cols-3">
          <Link
            to="/countries"
            className="group p-8 transition hover:bg-navy-800/60"
          >
            <span className="text-3xl">🌍</span>
            <h2 className="mt-4 text-xl font-semibold text-amber-50">
              Discover Countries
            </h2>
            <p className="mt-2 text-sm leading-6 text-amber-50/60">
              Browse countries from around the world and learn something new.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-amber-400 transition group-hover:translate-x-1">
              Browse countries →
            </span>
          </Link>

          <Link
            to="/quizzes"
            className="group p-8 transition hover:bg-navy-800/60"
          >
            <span className="text-3xl">🧠</span>
            <h2 className="mt-4 text-xl font-semibold text-amber-50">
              Challenge Yourself
            </h2>
            <p className="mt-2 text-sm leading-6 text-amber-50/60">
              Test your knowledge with geography quizzes and track your
              progress.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-amber-400 transition group-hover:translate-x-1">
              Play a quiz →
            </span>
          </Link>

          <Link
            to={isAuthenticated ? "/my-lists" : "/login"}
            className="group p-8 transition hover:bg-navy-800/60"
          >
            <span className="text-3xl">✈️</span>
            <h2 className="mt-4 text-xl font-semibold text-amber-50">
              Plan Your Journey
            </h2>
            <p className="mt-2 text-sm leading-6 text-amber-50/60">
              Keep track of places you've visited and destinations you want to
              see.
            </p>
            <span className="mt-4 inline-block text-sm font-semibold text-amber-400 transition group-hover:translate-x-1">
              {isAuthenticated ? "View my lists →" : "Log in to start →"}
            </span>
          </Link>
        </div>
      </section>

      {/* Featured Countries */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
              Start exploring
            </p>

            <h2 className="mt-2 font-heading text-4xl text-amber-50">
              Featured destinations
            </h2>
          </div>

          <Link
            to="/countries"
            className="text-sm font-semibold text-amber-400 hover:text-amber-300"
          >
            View all countries →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {featuredCountries.map((country) => (
            <Link
              key={country.code}
              to={`/countries/${country.code}`}
              className="group overflow-hidden rounded-lg border border-navy-700 bg-navy-900 transition hover:-translate-y-1 hover:border-amber-500"
            >
              <div className="flex h-48 items-center justify-center bg-navy-800 text-8xl">
                {country.emoji}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-amber-50">
                    {country.name}
                  </h3>

                  <span className="text-sm text-amber-400">
                    {country.region}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-amber-50/60">
                  {country.description}
                </p>

                <span className="mt-5 inline-block text-sm font-semibold text-amber-400 transition group-hover:translate-x-1">
                  Explore country →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-navy-800 bg-navy-900">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="font-heading text-4xl text-amber-50">
            The world is waiting to be explored.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-amber-50/60">
            Whether you're planning your next trip, learning about different
            cultures, or simply curious about the world, start exploring today.
          </p>

          <Link
            to="/countries"
            className="mt-8 inline-block rounded-md bg-amber-500 px-6 py-3 font-semibold text-navy-950 transition hover:bg-amber-400"
          >
            Explore the World
          </Link>
        </div>
      </section>
    </main>
  );
}

