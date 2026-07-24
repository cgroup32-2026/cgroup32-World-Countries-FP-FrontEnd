import { useEffect, useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { preferencesApi } from "../../api/preferencesApi";

export function ContinentPreferences() {
  const [allContinents, setAllContinents] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([
      preferencesApi.getAllContinents(),
      preferencesApi.getMyContinents(),
    ])
      .then(([all, mine]) => {
        setAllContinents(all);
        setSelectedIds(mine.map((c) => c.continentId));
      })
      .finally(() => setLoading(false));
  }, []);

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
    try {
      await preferencesApi.setMyContinents(selectedIds);
      setSaved(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Card>Loading continents...</Card>;

  return (
    <Card>
      <h3 className="font-heading text-xl text-amber-50">
        Continents of Interest
      </h3>
      <p className="mt-1 text-sm text-amber-50/60">
        Select the continents you're most interested in exploring.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        {allContinents.map((continent) => {
          const isSelected = selectedIds.includes(continent.continentId);
          return (
            <button
              key={continent.continentId}
              type="button"
              onClick={() => toggleContinent(continent.continentId)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${isSelected ? "border-amber-400 bg-amber-500 text-navy-950" : "border-navy-600 text-amber-50/70 hover:border-amber-400"}`}
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
