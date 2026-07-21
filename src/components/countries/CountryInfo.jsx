export function CountryInfo({ country }) {
  const facts = [
    {
      label: "Capital",
      value: country.capital,
    },
    {
      label: "Population",
      value: country.population,
    },
    {
      label: "Area",
      value: country.area,
    },
    {
      label: "Currency",
      value: country.currency,
    },
    {
      label: "Language",
      value: country.language,
    },
  ];

  return (
    <section>
      <div className="rounded-lg border border-navy-700 bg-navy-900 p-6">
        <h2 className="font-heading text-3xl text-amber-50">
          About {country.name}
        </h2>

        <p className="mt-4 leading-8 text-amber-50/70">{country.description}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="rounded-lg border border-navy-700 bg-navy-900 p-5"
          >
            <p className="text-sm text-amber-50/40">{fact.label}</p>

            <p className="mt-2 font-semibold text-amber-50">{fact.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
