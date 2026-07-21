import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CountryHero } from "../components/countries/CountryHero";
import { CountryInfo } from "../components/countries/CountryInfo";
import { CountryActions } from "../components/countries/CountryActions";
import { CountryReviews } from "../components/countries/CountryReviews";
import { countries } from "../data/countries";


const initialReviews = [
  {
    id: 1,
    username: "alex_travels",
    rating: 5,
    text: "Absolutely fascinating. The combination of tradition, food, and modern life makes this an unforgettable destination.",
    date: "2 weeks ago",
  },
  {
    id: 2,
    username: "worldexplorer",
    rating: 4,
    text: "A country with so much to discover. I would definitely like to visit again.",
    date: "1 month ago",
  },
];

export function CountryDetailPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [listStatus, setListStatus] = useState(null);
  const [reviews, setReviews] = useState(initialReviews);
  const country = countries.find((country) => country.id === id);

  if (!country) {
    return (
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-navy-950 px-6 text-center text-amber-50">
        <div>
          <h1 className="font-heading text-4xl">Country not found</h1>

          <p className="mt-4 text-amber-50/60">
            We couldn't find the country you're looking for.
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

  function handleListChange(status) {
    if (!isAuthenticated) {
      return;
    }

    setListStatus(status);
  }

  function handleReviewSubmit(reviewText, rating) {
    const newReview = {
      id: Date.now(),
      username: "You",
      rating,
      text: reviewText,
      date: "Just now",
    };

    setReviews((currentReviews) => [newReview, ...currentReviews]);
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-navy-950 text-amber-50">
      <CountryHero country={country} />

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <CountryInfo country={country} />

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
