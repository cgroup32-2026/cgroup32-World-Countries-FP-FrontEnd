import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const destinations = [
  {
    name: "Japan",
    region: "East Asia",
    description:
      "Where ancient traditions and modern life exist in remarkable harmony.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Italy",
    region: "Southern Europe",
    description:
      "A country shaped by art, history, food, and a deep appreciation for life.",
    image:
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "New Zealand",
    region: "Oceania",
    description:
      "Wild landscapes, dramatic coastlines, and endless opportunities for adventure.",
    image:
      "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1200&q=80",
  },
];

export function MagazineHomePage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <main className="bg-[#f4f0e8] text-[#1d2a2e]">
      {/* Editorial Hero */}
      <section className="relative min-h-[720px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2200&q=85"
          alt="Mountain landscape"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/35" />

        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-end px-6 pb-20 lg:px-8">
          <div className="max-w-3xl text-white">
            <p className="mb-5 text-sm uppercase tracking-[0.35em] text-white/80">
              World Countries · Issue No. 01
            </p>

            <h1 className="font-heading text-6xl leading-[0.95] md:text-8xl">
              See the world
              <br />
              differently.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-white/85">
              A digital journey through the countries, cultures, landscapes, and
              stories that make our world extraordinary.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                to="/countries"
                className="bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#1d2a2e] transition hover:bg-[#e8dfcf]"
              >
                Begin exploring
              </Link>

              <Link
                to="/quizzes"
                className="border border-white/70 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-[#1d2a2e]"
              >
                Test your knowledge
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introductory Editorial Section */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#9a6b35]">
            The world is vast
          </p>

          <h2 className="mt-5 max-w-xl font-heading text-5xl leading-tight">
            There is always somewhere new to discover.
          </h2>
        </div>

        <div className="flex items-end">
          <p className="max-w-xl text-lg leading-8 text-[#1d2a2e]/70">
            From the streets of ancient cities to remote landscapes untouched by
            time, every country offers a different perspective on the world.
            Explore destinations, keep track of your journey, and discover
            somewhere you may want to visit next.
          </p>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="bg-[#e8dfcf] px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#9a6b35]">
                Featured destinations
              </p>

              <h2 className="mt-4 font-heading text-5xl">
                Places worth knowing.
              </h2>
            </div>

            <Link
              to="/countries"
              className="hidden text-sm font-semibold uppercase tracking-wider text-[#9a6b35] hover:text-[#765027] md:block"
            >
              View all countries →
            </Link>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {destinations.map((destination) => (
              <Link
                key={destination.name}
                to={`/countries/${destination.name.toLowerCase()}`}
                className="group"
              >
                <div className="relative h-[430px] overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 p-7 text-white">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                      {destination.region}
                    </p>

                    <h3 className="mt-2 font-heading text-4xl">
                      {destination.name}
                    </h3>

                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/80">
                      {destination.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Journey */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1fr_0.8fr] lg:px-8">
        <div className="flex items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#9a6b35]">
              Your journey
            </p>

            <h2 className="mt-5 max-w-2xl font-heading text-5xl leading-tight">
              The best travel story is the one you create yourself.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#1d2a2e]/70">
              Mark the places you've visited. Save the destinations you've
              dreamed about. Share your experiences and challenge yourself to
              learn more about the world.
            </p>

            <Link
              to={isAuthenticated ? "/my-lists" : "/login"}
              className="mt-8 inline-block border-b-2 border-[#9a6b35] pb-2 text-sm font-semibold uppercase tracking-wider text-[#9a6b35]"
            >
              {isAuthenticated
                ? `Continue your journey, ${user?.username} →`
                : "Start your journey →"}
            </Link>
          </div>
        </div>

        <div className="relative min-h-[500px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
            alt="Traveler looking at a landscape"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1d2a2e] px-6 py-24 text-center text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-[#d6a76b]">
          Your next discovery awaits
        </p>

        <h2 className="mx-auto mt-5 max-w-3xl font-heading text-5xl leading-tight md:text-6xl">
          How much of the world is still waiting for you?
        </h2>

        <Link
          to="/countries"
          className="mt-10 inline-block bg-[#f4f0e8] px-7 py-3 text-sm font-semibold uppercase tracking-wider text-[#1d2a2e] transition hover:bg-[#e8dfcf]"
        >
          Explore the countries
        </Link>
      </section>
    </main>
  );
}
