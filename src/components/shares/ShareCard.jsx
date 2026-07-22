import { Link } from "react-router-dom";
import { Card } from "../ui/Card";
import { formatDate } from "../../utils/format";

export function ShareCard({ share, showActions = false, onEdit, onDelete }) {
  return (
    <Card className="transition hover:-translate-y-1 hover:border-amber-500">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-amber-50/60">Shared by</p>
          <p className="font-semibold text-amber-50">{share.username}</p>
        </div>
        <span className="text-sm text-amber-50/50">
          {formatDate(share.createdAt)}
        </span>
      </div>

      <Link
        to={`/countries/${share.countryId}`}
        className="mt-5 inline-block text-xl font-heading text-amber-400 transition hover:text-amber-300"
      >
        {share.countryName}
      </Link>

      <div className="mt-3 text-amber-400">
        {"★".repeat(share.rating)}
        <span className="ml-2 text-sm text-amber-50/50">{share.rating}/5</span>
      </div>

      <p className="mt-5 leading-relaxed text-amber-50/80">{share.content}</p>

      <div className="mt-6 flex items-center justify-between">
        <Link
          to={`/countries/${share.countryId}`}
          className="text-sm font-semibold text-amber-400 transition hover:translate-x-1"
        >
          View Country →
        </Link>

        {showActions && (
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(share)}
              className="text-sm text-amber-400 hover:text-amber-300"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(share.shareId)}
              className="text-sm text-red-400 hover:text-red-300"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}
