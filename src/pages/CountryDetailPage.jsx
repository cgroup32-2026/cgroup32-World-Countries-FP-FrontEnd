import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CountryHero } from "../components/countries/CountryHero";
import { CountryInfo } from "../components/countries/CountryInfo";
import { CountryActions } from "../components/countries/CountryActions";
import { CountryReviews } from "../components/countries/CountryReviews";
import { countriesApi } from "../api/countriesApi";
import { sharesApi } from "../api/sharesApi";
import { listsApi } from "../api/listsApi";
import { CountryLandmarks } from "../components/countries/CountryLandmarks";


export function CountryDetailPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [country, setCountry] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [listStatus, setListStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([countriesApi.getById(id), sharesApi.getByCountry(id)])
      .then(([countryData, reviewsData]) => {
        setCountry(countryData);
        setReviews(reviewsData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!isAuthenticated) {
      setListStatus(null);
      return;
    }
    listsApi
      .getMine()
      .then((entries) => {
        const match = entries.find((e) => e.countryId === Number(id));
        setListStatus(match ? match.listType : null);
      })
      .catch(() => {});
  }, [id, isAuthenticated]);

  async function handleListChange(newStatus) {
    const countryId = Number(id);
    try {
      if (newStatus === null) {
        if (listStatus) await listsApi.remove(countryId, listStatus);
      } else if (listStatus)
        await listsApi.move(countryId, listStatus, newStatus);
      else await listsApi.add(countryId, newStatus);
      setListStatus(newStatus);
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleReviewSubmit(reviewText, rating) {
    try {
      const newReview = await sharesApi.create({
        countryId: Number(id),
        content: reviewText,
        rating,
      });
      setReviews((current) => [newReview, ...current]);
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading)
    return (
      <main className="min-h-[80vh] flex items-center justify-center bg-navy-950 text-amber-50">
        Loading...
      </main>
    );

  if (error || !country) {
    return (
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-navy-950 px-6 text-center text-amber-50">
        <div>
          <h1 className="font-heading text-4xl">Country not found</h1>
          <p className="mt-4 text-amber-50/60">
            {error || "We couldn't find the country you're looking for."}
          </p>
          <Link
            to="/countries"
            className="mt-6 inline-block text-amber-400 hover:text-amber-300"
          >
            ← Back to countries
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-navy-950 text-amber-50">
      <CountryHero country={country} />
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <CountryInfo country={country} />
            <CountryLandmarks countryId={country.countryId} />
            <CountryReviews
              reviews={reviews}
              isAuthenticated={isAuthenticated}
              onReviewSubmit={handleReviewSubmit}
            />
          </div>
          <aside>
            <CountryActions
              isAuthenticated={isAuthenticated}
              listStatus={listStatus}
              onListChange={handleListChange}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
