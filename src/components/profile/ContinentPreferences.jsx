import { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { continents } from "../../data/continents";

export function ContinentPreferences({ initialSelected }) {
  const [selectedIds, setSelectedIds] = useState(
    initialSelected.map((c) => c.continentId),
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function toggleContinent(continentId) {
    setSaved(false);
    setSelectedIds((current) =>
      current.includes(continentId)
        ? current.filter((id) => id !== continentId)
        : [...current, continentId],
    );
  }

  async function handleSave() {
    setSaving(true);
    // Later: await preferencesApi.setContinents(selectedIds);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 400);
  }

  return (
    <Card>
      <h3 className="font-heading text-xl text-amber-50">
        Continents of Interest
      </h3>
      <p className="mt-1 text-sm text-amber-50/60">
        Select the continents you're most interested in exploring.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        {continents.map((continent) => {
          const isSelected = selectedIds.includes(continent.continentId);
          return (
            <button
              key={continent.continentId}
              type="button"
              onClick={() => toggleContinent(continent.continentId)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                isSelected
                  ? "border-amber-400 bg-amber-500 text-navy-950"
                  : "border-navy-600 text-amber-50/70 hover:border-amber-400"
              }`}
            >
              {continent.name}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Continents"}
        </Button>
        {saved && <span className="text-sm text-green-400">Saved!</span>}
      </div>
    </Card>
  );
}
