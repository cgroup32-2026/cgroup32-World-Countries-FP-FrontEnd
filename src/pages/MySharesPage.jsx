import { useEffect, useState } from "react";
import { ShareCard } from "../components/shares/ShareCard";
import { ShareFormModal } from "../components/shares/ShareFormModal";
import { sharesApi } from "../api/sharesApi";

export function MySharesPage() {
  const [shares, setShares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingShare, setEditingShare] = useState(null);

  useEffect(() => {
    sharesApi
      .getMine()
      .then(setShares)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function handleEdit(share) {
    setEditingShare(share);
  }

  async function handleDelete(shareId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this share?",
    );
    if (!confirmed) return;
    try {
      await sharesApi.remove(shareId);
      setShares((current) => current.filter((s) => s.shareId !== shareId));
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleUpdateShare(updatedData) {
    try {
      await sharesApi.update(editingShare.shareId, updatedData);
      setShares((current) =>
        current.map((s) =>
          s.shareId === editingShare.shareId
            ? { ...s, ...updatedData, updatedAt: new Date().toISOString() }
            : s,
        ),
      );
      setEditingShare(null);
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
  if (error)
    return (
      <main className="min-h-[80vh] flex items-center justify-center bg-navy-950 text-red-300">
        {error}
      </main>
    );

  return (
    <main className="min-h-[calc(100vh-80px)] bg-navy-950 px-6 py-10 text-amber-50">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <h1 className="font-heading text-5xl text-amber-400">My Shares</h1>
          <p className="mt-3 max-w-2xl text-amber-50/70">
            Manage the experiences and reviews you have shared with the
            community.
          </p>
        </header>

        {shares.length === 0 ? (
          <div className="rounded-lg border border-dashed border-navy-700 py-16 text-center">
            <p className="text-lg text-amber-50/60">
              You haven't shared anything yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {shares.map((share) => (
              <ShareCard
                key={share.shareId}
                share={share}
                showActions
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <ShareFormModal
        share={editingShare}
        onClose={() => setEditingShare(null)}
        onSubmit={handleUpdateShare}
      />
    </main>
  );
}
