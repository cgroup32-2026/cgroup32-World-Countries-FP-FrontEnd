export function CountryHero({ country }) {
  return (
    <section className="border-b border-navy-800 bg-navy-900">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-32 w-32 items-center justify-center rounded-full border border-navy-600 bg-navy-800 text-7xl">
            {country.flag}
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
              {country.region}
            </p>

            <h1 className="mt-2 font-heading text-5xl text-amber-50">
              {country.name}
            </h1>

            <p className="mt-2 text-amber-50/50">
              {country.officialName} · {country.code}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
