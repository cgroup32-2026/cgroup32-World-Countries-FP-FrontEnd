import { useState } from "react";
import { CountryCard } from "../components/countries/CountryCard";
import { myLists } from "../data/myLists";

export function MyListsPage() {
  const [lists] = useState(myLists);

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
          countries={lists.visited}
          emptyMessage="You haven't marked any countries as visited yet."
        />

        <CountrySection
          title="Want to Visit"
          countries={lists.wishlist}
          emptyMessage="Start building your travel bucket list."
        />
      </div>
    </main>
  );
}

function CountrySection({ title, countries, emptyMessage }) {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-3xl text-amber-50">{title}</h2>

        <span className="rounded-full bg-navy-800 px-4 py-1 text-sm text-amber-400">
          {countries.length}
        </span>
      </div>

      {countries.length === 0 ? (
        <div className="rounded-lg border border-dashed border-navy-700 py-12 text-center text-amber-50/50">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {countries.map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </div>
      )}
    </section>
  );
}
