import { Link } from "react-router-dom";

export function CountryActions({ isAuthenticated, listStatus, onListChange }) {
  return (
    <div className="rounded-lg border border-navy-700 bg-navy-900 p-6 lg:sticky lg:top-6">
      <h2 className="text-xl font-semibold text-amber-50">Your Journey</h2>
      {!isAuthenticated ? (
        <div className="mt-4">
          <p className="text-sm leading-6 text-amber-50/60">
            Log in to save this country to your personal lists and write
            reviews.
          </p>
          <Link
            to="/login"
            className="mt-5 block rounded-md bg-amber-500 px-4 py-3 text-center font-semibold text-navy-950 transition hover:bg-amber-400"
          >
            Log in
          </Link>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          <button
            onClick={() => onListChange("Visited")}
            className={`w-full rounded-md border px-4 py-3 text-left transition ${listStatus === "Visited" ? "border-amber-400 bg-amber-500 text-navy-950" : "border-navy-600 text-amber-50 hover:border-amber-400"}`}
          >
            ✓ I've visited this country
          </button>
          <button
            onClick={() => onListChange("WantToVisit")}
            className={`w-full rounded-md border px-4 py-3 text-left transition ${listStatus === "WantToVisit" ? "border-amber-400 bg-amber-500 text-navy-950" : "border-navy-600 text-amber-50 hover:border-amber-400"}`}
          >
            ✈ I want to visit this country
          </button>
          {listStatus && (
            <button
              onClick={() => onListChange(null)}
              className="w-full text-sm text-amber-50/50 hover:text-amber-400"
            >
              Remove from my list
            </button>
          )}
        </div>
      )}
    </div>
  );
}
