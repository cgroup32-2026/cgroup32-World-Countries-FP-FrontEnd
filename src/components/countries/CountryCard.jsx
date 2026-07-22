import { Link } from "react-router-dom";
import { formatNumber } from "../../utils/format";

export function CountryCard({ country, footer }) {
  return (
    <Link
      to={`/countries/${country.countryId}`}
      className="group rounded-lg border border-navy-700 bg-navy-900 p-6 transition hover:-translate-y-1 hover:border-amber-500"
    >
      <div className="flex items-start justify-between">
        {country.flagUrl ? (
          <img
            src={country.flagUrl}
            alt={`${country.nameCommon} flag`}
            className="h-10 w-14 rounded object-cover"
          />
        ) : (
          <span className="text-5xl">🏳️</span>
        )}

        {country.region && (
          <span className="rounded-full bg-navy-800 px-3 py-1 text-xs text-amber-50/60">
            {country.region}
          </span>
        )}
      </div>

      <h2 className="mt-5 text-2xl font-semibold text-amber-50">
        {country.nameCommon}
      </h2>

      <div className="mt-5 space-y-2 border-t border-navy-700 pt-4 text-sm text-amber-50/60">
        {country.capital && (
          <p>
            <span className="text-amber-50/40">Capital:</span> {country.capital}
          </p>
        )}
        {country.population != null && (
          <p>
            <span className="text-amber-50/40">Population:</span>{" "}
            {formatNumber(country.population)}
          </p>
        )}
      </div>

      <div className="mt-5">
        {footer ?? (
          <p className="text-sm font-semibold text-amber-400 transition group-hover:translate-x-1">
            View Details →
          </p>
        )}
      </div>
    </Link>
  );
}
