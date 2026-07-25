import { useEffect, useState } from "react";
import { countriesApi } from "../../api/countriesApi";

export function CountryLandmarks({ countryId }) {
  const [landmarks, setLandmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    countriesApi
      .getLandmarks(countryId)
      .then(setLandmarks)
      .catch(() => setLandmarks([]))
      .finally(() => setLoading(false));
  }, [countryId]);

  if (loading || landmarks.length === 0) return null; 

  return (
    <section className="mt-8">
      <h2 className="font-heading text-3xl text-amber-50">Nearby Landmarks</h2>
      <p className="mt-1 text-sm text-amber-50/50">Sourced from Wikipedia</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {landmarks.map((landmark) => (
          <a
            key={landmark.title}
            href={landmark.wikipediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group overflow-hidden rounded-lg border border-navy-700 bg-navy-900 transition hover:-translate-y-1 hover:border-amber-500"
          >
            <div className="h-40 overflow-hidden bg-navy-800">
              <img
                src={landmark.imageUrl}
                alt={landmark.title}
                className="h-full w-full object-cover transition group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <p className="font-semibold text-amber-50">{landmark.title}</p>
              {landmark.description && (
                <p className="mt-1 text-xs text-amber-50/60">
                  {landmark.description}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
