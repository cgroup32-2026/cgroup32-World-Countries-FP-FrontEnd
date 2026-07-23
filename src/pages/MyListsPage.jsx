import { useEffect, useState } from "react";
import { CountryCard } from "../components/countries/CountryCard";
import { listsApi } from "../api/listsApi";

export function MyListsPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function loadLists() {
    setLoading(true);
    listsApi
      .getMine()
      .then(setEntries)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    loadLists();
  }, []);

  async function handleRemove(countryId, listType) {
    try {
      await listsApi.remove(countryId, listType);
      setEntries((current) =>
        current.filter(
          (e) => !(e.countryId === countryId && e.listType === listType),
        ),
      );
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleMove(countryId, fromListType, toListType) {
    try {
      await listsApi.move(countryId, fromListType, toListType);
      loadLists();
    } catch (err) {
      alert(err.message);
    }
  }

  const visited = entries.filter((e) => e.listType === "Visited");
  const wishlist = entries.filter((e) => e.listType === "WantToVisit");

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
      <div className="mx-auto max-w-7xl space-y-12">
        <header>
          <h1 className="font-heading text-5xl text-amber-400">My Lists</h1>
          <p className="mt-3 max-w-2xl text-amber-50/70">
            Keep track of countries you've explored and destinations you're
            planning to visit next.
          </p>
        </header>
        <CountrySection
          title="Visited Countries"
          entries={visited}
          otherListType="WantToVisit"
          emptyMessage="You haven't marked any countries as visited yet."
          onRemove={handleRemove}
          onMove={handleMove}
        />
        <CountrySection
          title="Want to Visit"
          entries={wishlist}
          otherListType="Visited"
          emptyMessage="Start building your travel bucket list."
          onRemove={handleRemove}
          onMove={handleMove}
        />
      </div>
    </main>
  );
}

function CountrySection({
  title,
  entries,
  otherListType,
  emptyMessage,
  onRemove,
  onMove,
}) {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-3xl text-amber-50">{title}</h2>
        <span className="rounded-full bg-navy-800 px-4 py-1 text-sm text-amber-400">
          {entries.length}
        </span>
      </div>
      {entries.length === 0 ? (
        <div className="rounded-lg border border-dashed border-navy-700 py-12 text-center text-amber-50/50">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {entries.map((entry) => (
            <CountryCard
              key={entry.listEntryId}
              country={entry}
              footer={
                <div className="flex gap-3 text-sm">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onMove(entry.countryId, entry.listType, otherListType);
                    }}
                    className="font-semibold text-amber-400 hover:text-amber-300"
                  >
                    Move to{" "}
                    {otherListType === "Visited" ? "Visited" : "Want to Visit"}
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onRemove(entry.countryId, entry.listType);
                    }}
                    className="font-semibold text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
