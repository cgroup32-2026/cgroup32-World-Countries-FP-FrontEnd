import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CountryCard } from "../components/countries/CountryCard";
import { countries } from "../data/countries";

export function CountriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesSearch =
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.capital.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRegion =
        selectedRegion === "All Regions" || country.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [searchTerm, selectedRegion]);

  return (
    <main className="min-h-[calc(100vh-80px)] bg-navy-950 text-amber-50">
      <section className="border-b border-navy-800 bg-navy-900">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            Explore the world
          </p>

          <h1 className="mt-3 font-heading text-5xl text-amber-50">
            Countries
          </h1>

          <p className="mt-4 max-w-2xl text-amber-50/60">
            Browse countries around the world, learn about them, and discover
            your next destination.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex flex-col gap-4 rounded-lg border border-navy-700 bg-navy-900 p-4 md:flex-row">
          <input
            type="search"
            placeholder="Search by country, code, or capital..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 rounded-md border border-navy-600 bg-navy-800 px-4 py-3 text-amber-50 placeholder:text-amber-50/40 focus:border-amber-400 focus:outline-none"
          />

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="rounded-md border border-navy-600 bg-navy-800 px-4 py-3 text-amber-50 focus:border-amber-400 focus:outline-none"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-amber-50/60">
            Showing{" "}
            <span className="font-semibold text-amber-50">
              {filteredCountries.length}
            </span>{" "}
            {filteredCountries.length === 1 ? "country" : "countries"}
          </p>
        </div>

        {filteredCountries.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-navy-600 py-20 text-center">
            <p className="text-lg text-amber-50/60">No countries found.</p>

            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedRegion("All Regions");
              }}
              className="mt-4 text-sm font-semibold text-amber-400 hover:text-amber-300"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCountries.map((country) => (
              <CountryCard key={country.id} country={country} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
