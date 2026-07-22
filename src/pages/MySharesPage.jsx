import { useState } from "react";
import { ShareCard } from "../components/shares/ShareCard";
import { ShareFormModal } from "../components/shares/ShareFormModal";
import { shares as initialShares } from "../data/shares";

export function MySharesPage() {
  // Mock-only: pretending userId 101 is "me". Real version calls sharesApi.getMine()
  // (GET /Shares/me) instead — the server already filters to the logged-in user,
  // this whole .filter() line goes away entirely, not just the field name.
  const [shares, setShares] = useState(
    initialShares.filter((share) => share.userId === 101),
  );

  const [editingShare, setEditingShare] = useState(null);

  function handleEdit(share) {
    setEditingShare(share);
  }

  function handleDelete(shareId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this share?",
    );
    if (!confirmed) return;

    setShares((current) =>
      current.filter((share) => share.shareId !== shareId),
    );
  }

  function handleUpdateShare(updatedData) {
    setShares((current) =>
      current.map((share) =>
        share.shareId === editingShare.shareId
          ? {
              ...share,
              content: updatedData.content,
              rating: updatedData.rating,
              updatedAt: new Date().toISOString(),
            }
          : share,
      ),
    );
    setEditingShare(null);
  }

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
