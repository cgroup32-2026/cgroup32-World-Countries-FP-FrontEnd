import { useEffect, useMemo, useState } from "react";
import { CountryCard } from "../components/countries/CountryCard";
import { countriesApi } from "../api/countriesApi";
import { preferencesApi } from "../api/preferencesApi";


const regions = [
  "All Regions",
  "Africa",
  "Antarctica",
  "Asia",
  "Europe",
  "Americas",
  "Oceania",
];


const SORT_OPTIONS = [
  {
    value: "name-asc",
    label: "Name (A-Z)",
    sortBy: "name",
    sortDescending: false,
  },
  {
    value: "name-desc",
    label: "Name (Z-A)",
    sortBy: "name",
    sortDescending: true,
  },
  {
    value: "population-desc",
    label: "Population (High to Low)",
    sortBy: "population",
    sortDescending: true,
  },
  {
    value: "population-asc",
    label: "Population (Low to High)",
    sortBy: "population",
    sortDescending: false,
  },
  {
    value: "area-desc",
    label: "Area (Large to Small)",
    sortBy: "area",
    sortDescending: true,
  },
  {
    value: "area-asc",
    label: "Area (Small to Large)",
    sortBy: "area",
    sortDescending: false,
  },
  {
    value: "region-asc",
    label: "Region (A-Z)",
    sortBy: "region",
    sortDescending: false,
  },
];

export function CountriesPage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [languages, setLanguages] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [languageCode, setLanguageCode] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [minPopulation, setMinPopulation] = useState("");
  const [maxPopulation, setMaxPopulation] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [sortValue, setSortValue] = useState("name-asc");

  useEffect(() => {
    preferencesApi
      .getAllLanguages()
      .then(setLanguages)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const sortOption = SORT_OPTIONS.find((o) => o.value === sortValue);
      setLoading(true);
      countriesApi
        .search({
          name: searchTerm || undefined,
          region: selectedRegion === "All Regions" ? undefined : selectedRegion,
          languageCode: languageCode || undefined,
          currencyCode: currencyCode || undefined,
          minPopulation: minPopulation || undefined,
          maxPopulation: maxPopulation || undefined,
          minArea: minArea || undefined,
          maxArea: maxArea || undefined,
          sortBy: sortOption.sortBy,
          sortDescending: sortOption.sortDescending,
        })
        .then(setCountries)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(timer);
  }, [
    searchTerm,
    selectedRegion,
    languageCode,
    currencyCode,
    minPopulation,
    maxPopulation,
    minArea,
    maxArea,
    sortValue,
  ]);

  function clearFilters() {
    setSearchTerm("");
    setSelectedRegion("All Regions");
    setLanguageCode("");
    setCurrencyCode("");
    setMinPopulation("");
    setMaxPopulation("");
    setMinArea("");
    setMaxArea("");
    setSortValue("name-asc");
  }

  const inputClass =
    "rounded-md border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-amber-50 placeholder:text-amber-50/40 focus:border-amber-400 focus:outline-none";

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
        <div className="rounded-lg border border-navy-700 bg-navy-900 p-4 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <input
              type="search"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={inputClass}
            />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className={inputClass}
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <select
              value={languageCode}
              onChange={(e) => setLanguageCode(e.target.value)}
              className={inputClass}
            >
              <option value="">All Languages</option>
              {languages.map((lang) => (
                <option key={lang.languageId} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Currency code (e.g. USD)"
              value={currencyCode}
              onChange={(e) => setCurrencyCode(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <input
              type="number"
              placeholder="Min population"
              value={minPopulation}
              onChange={(e) => setMinPopulation(e.target.value)}
              className={inputClass}
            />
            <input
              type="number"
              placeholder="Max population"
              value={maxPopulation}
              onChange={(e) => setMaxPopulation(e.target.value)}
              className={inputClass}
            />
            <input
              type="number"
              placeholder="Min area (km²)"
              value={minArea}
              onChange={(e) => setMinArea(e.target.value)}
              className={inputClass}
            />
            <input
              type="number"
              placeholder="Max area (km²)"
              value={maxArea}
              onChange={(e) => setMaxArea(e.target.value)}
              className={inputClass}
            />
            <select
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
              className={inputClass}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={clearFilters}
            className="text-sm font-semibold text-amber-400 hover:text-amber-300"
          >
            Clear all filters
          </button>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm text-amber-50/60">
            {loading ? (
              "Searching..."
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-amber-50">
                  {countries.length}
                </span>{" "}
                {countries.length === 1 ? "country" : "countries"}
              </>
            )}
          </p>
        </div>

        {error && <p className="mt-4 text-red-300">{error}</p>}

        {!loading && countries.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-navy-600 py-20 text-center">
            <p className="text-lg text-amber-50/60">No countries found.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-sm font-semibold text-amber-400 hover:text-amber-300"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map((country) => (
              <CountryCard key={country.countryId} country={country} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}