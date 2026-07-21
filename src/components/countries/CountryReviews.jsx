import { useState } from "react";

export function CountryReviews({ reviews, isAuthenticated, onReviewSubmit }) {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  function handleSubmit(e) {
    e.preventDefault();

    if (!reviewText.trim()) {
      return;
    }

    onReviewSubmit(reviewText.trim(), rating);
    setReviewText("");
    setRating(5);
  }

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-3xl text-amber-50">Reviews</h2>

        <span className="text-sm text-amber-50/50">
          {reviews.length} reviews
        </span>
      </div>

      {isAuthenticated && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-lg border border-navy-700 bg-navy-900 p-6"
        >
          <h3 className="font-semibold text-amber-50">Share your thoughts</h3>

          <div className="mt-4">
            <label className="block text-sm text-amber-50/60">Rating</label>

            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="mt-2 rounded-md border border-navy-600 bg-navy-800 px-3 py-2 text-amber-50 focus:border-amber-400 focus:outline-none"
            >
              <option value={5}>★★★★★ - Excellent</option>
              <option value={4}>★★★★☆ - Very good</option>
              <option value={3}>★★★☆☆ - Good</option>
              <option value={2}>★★☆☆☆ - Average</option>
              <option value={1}>★☆☆☆☆ - Poor</option>
            </select>
          </div>

          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write a short review..."
            rows={4}
            className="mt-4 w-full resize-none rounded-md border border-navy-600 bg-navy-800 px-4 py-3 text-amber-50 placeholder:text-amber-50/40 focus:border-amber-400 focus:outline-none"
          />

          <button
            type="submit"
            className="mt-4 rounded-md bg-amber-500 px-5 py-2 font-semibold text-navy-950 transition hover:bg-amber-400"
          >
            Post Review
          </button>
        </form>
      )}

      <div className="mt-6 space-y-4">
        {reviews.map((review) => (
          <article
            key={review.id}
            className="rounded-lg border border-navy-700 bg-navy-900 p-6"
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row">
              <div>
                <p className="font-semibold text-amber-50">{review.username}</p>

                <p className="text-sm text-amber-400">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </p>
              </div>

              <span className="text-sm text-amber-50/40">{review.date}</span>
            </div>

            <p className="mt-4 leading-7 text-amber-50/70">{review.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
