import { useEffect, useState } from "react";
import { Button } from "../ui/Button";

export function ShareFormModal({ share, onClose, onSubmit }) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (share) {
      setContent(share.content);
      setRating(share.rating);
    }
  }, [share]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }

    onSubmit({
      content: content.trim(),
      rating: Number(rating),
    });
  }

  if (!share) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-lg border border-navy-700 bg-navy-900 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="font-heading text-2xl text-amber-400">Edit Share</h2>

            <p className="mt-1 text-sm text-amber-50/60">{share.CountryName}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-amber-50/50 transition hover:text-amber-50"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm text-amber-50">
              Your Review
            </label>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              required
              className="w-full resize-none rounded border border-navy-600 bg-navy-800 px-3 py-2 text-amber-50 placeholder:text-amber-50/40 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-amber-50">Rating</label>

            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full rounded border border-navy-600 bg-navy-800 px-3 py-2 text-amber-50 focus:border-amber-400 focus:outline-none"
            >
              <option value={1}>1 / 5</option>
              <option value={2}>2 / 5</option>
              <option value={3}>3 / 5</option>
              <option value={4}>4 / 5</option>
              <option value={5}>5 / 5</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
