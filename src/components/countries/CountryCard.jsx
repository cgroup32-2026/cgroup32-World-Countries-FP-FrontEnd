import { Link } from "react-router-dom";

export function CountryCard({ country }) {
  return (
    <Link
      to={`/countries/${country.id}`}
      className="group rounded-lg border border-navy-700 bg-navy-900 p-6 transition hover:-translate-y-1 hover:border-amber-500"
    >
      <div className="flex items-start justify-between">
        <span className="text-5xl">{country.flag}</span>

        <span className="rounded-full bg-navy-800 px-3 py-1 text-xs text-amber-50/60">
          {country.code}
        </span>
      </div>

      <h2 className="mt-5 text-2xl font-semibold text-amber-50">
        {country.name}
      </h2>

      <p className="mt-1 text-sm text-amber-400">{country.region}</p>

      <div className="mt-5 space-y-2 border-t border-navy-700 pt-4 text-sm text-amber-50/60">
        <p>
          <span className="text-amber-50/40">Capital:</span> {country.capital}
        </p>

        <p>
          <span className="text-amber-50/40">Population:</span>{" "}
          {country.population}
        </p>
      </div>

      <p className="mt-5 text-sm font-semibold text-amber-400 transition group-hover:translate-x-1">
        View details →
      </p>
    </Link>
  );
}
