import { ShareCard } from "../components/shares/ShareCard";
import { shares } from "../data/shares";

export function CommunityPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-navy-950 px-6 py-10 text-amber-50">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <h1 className="font-heading text-5xl text-amber-400">Community</h1>

          <p className="mt-3 max-w-2xl text-amber-50/70">
            Discover experiences, opinions, and recommendations shared by
            travelers around the world.
          </p>
        </header>

        {shares.length === 0 ? (
          <div className="rounded-lg border border-dashed border-navy-700 py-16 text-center">
            <p className="text-lg text-amber-50/60">
              No shares have been posted yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {shares.map((share) => (
              <ShareCard key={share.shareId} share={share} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
