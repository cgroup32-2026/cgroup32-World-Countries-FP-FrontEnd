import { formatNumber } from "../../utils/format";

export function CountryInfo({ country }) {
  const facts = [
    { label: "Capital", value: country.capital },
    {
      label: "Population",
      value:
        country.population != null ? formatNumber(country.population) : null,
    },
    {
      label: "Area",
      value:
        country.areaKm2 != null ? `${formatNumber(country.areaKm2)} km²` : null,
    },
    { label: "Currency", value: country.currencyCodes?.join(", ") },
    { label: "Languages", value: country.languageCodes?.join(", ") },
  ];

  return (
    <section>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="rounded-lg border border-navy-700 bg-navy-900 p-5"
          >
            <p className="text-sm text-amber-50/40">{fact.label}</p>
            <p className="mt-2 font-semibold text-amber-50">
              {fact.value ?? "—"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
