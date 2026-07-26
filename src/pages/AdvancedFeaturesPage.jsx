import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";

const FEATURES = [
  {
    title: "Interactive World Map",
    description:
      "Every country plotted by real coordinates, with capital city info in each marker's popup. Logged-in users see their Visited and Want-to-Visit countries highlighted in different colors, pulled directly from their saved lists.",
    linkTo: "/map",
    linkLabel: "Open the Map",
  },
  {
    title: "Nearby Landmarks",
    description:
      "Each country's detail page shows real tourist landmarks sourced live from Wikipedia, found by searching near that country's capital and filtered to exclude historical/political articles in favor of actual visitable places.",
    linkTo: "/countries",
    linkLabel: "Browse a Country",
  },
  {
    title: "Pinpoint — an original map-guessing game",
    description:
      "Inspired by GeoGuessr: a flag appears, you click the map where you think that country is. Scoring is tiered (Miss through Perfect) based on distance relative to that specific country's real size, with a combo multiplier for consecutive good guesses and a shrinking time-bank that makes later rounds tougher. Every mode and region has its own leaderboard, plus a combined total leaderboard across all of them.",
    linkTo: "/game",
    linkLabel: "Play Pinpoint",
  },
];

export function AdvancedFeaturesPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-navy-950 px-6 py-10 text-amber-50">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10">
          <h1 className="font-heading text-5xl text-amber-400">
            Advanced Features
          </h1>
          <p className="mt-3 max-w-2xl text-amber-50/70">
            Optional features built on top of the core site, described briefly
            below.
          </p>
        </header>

        <div className="space-y-6">
          {FEATURES.map((feature) => (
            <Card key={feature.title}>
              <h2 className="font-heading text-2xl text-amber-50">
                {feature.title}
              </h2>
              <p className="mt-3 leading-7 text-amber-50/70">
                {feature.description}
              </p>
              <Link
                to={feature.linkTo}
                className="mt-4 inline-block text-sm font-semibold text-amber-400 hover:text-amber-300"
              >
                {feature.linkLabel} →
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
