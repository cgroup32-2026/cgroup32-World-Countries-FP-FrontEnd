import { useEffect, useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { preferencesApi } from "../../api/preferencesApi";

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Native"];

export function LanguagePreferences() {
  const [allLanguages, setAllLanguages] = useState([]);
  const [myLanguages, setMyLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pickerLanguageId, setPickerLanguageId] = useState("");
  const [pickerLevel, setPickerLevel] = useState("Beginner");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([
      preferencesApi.getAllLanguages(),
      preferencesApi.getMyLanguages(),
    ])
      .then(([all, mine]) => {
        setAllLanguages(all);
        setMyLanguages(mine);
      })
      .finally(() => setLoading(false));
  }, []);

  const availableToAdd = allLanguages.filter(
    (lang) => !myLanguages.some((ml) => ml.languageId === lang.languageId),
  );

  function handleAdd() {
    if (!pickerLanguageId) return;
    const language = allLanguages.find(
      (l) => l.languageId === Number(pickerLanguageId),
    );
    if (!language) return;
    setSaved(false);
    setMyLanguages((current) => [
      ...current,
      {
        languageId: language.languageId,
        code: language.code,
        name: language.name,
        level: pickerLevel,
      },
    ]);
    setPickerLanguageId("");
    setPickerLevel("Beginner");
  }

  function handleRemove(languageId) {
    setSaved(false);
    setMyLanguages((current) =>
      current.filter((l) => l.languageId !== languageId),
    );
  }

  function handleLevelChange(languageId, newLevel) {
    setSaved(false);
    setMyLanguages((current) =>
      current.map((l) =>
        l.languageId === languageId ? { ...l, level: newLevel } : l,
      ),
    );
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload = myLanguages.map(({ languageId, level }) => ({
        languageId,
        level,
      }));
      await preferencesApi.setMyLanguages(payload);
      setSaved(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Card>Loading languages...</Card>;

  return (
    <Card>
      <h3 className="font-heading text-xl text-amber-50">Languages Spoken</h3>
      <p className="mt-1 text-sm text-amber-50/60">
        Add the languages you speak, and how well you know them.
      </p>
      <div className="mt-5 flex flex-wrap items-end gap-3">
        <div>
          <label className="mb-1 block text-xs text-amber-50/50">
            Language
          </label>
          <select
            value={pickerLanguageId}
            onChange={(e) => setPickerLanguageId(e.target.value)}
            className="rounded border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-amber-50 focus:border-amber-400 focus:outline-none"
          >
            <option value="">Select a language...</option>
            {availableToAdd.map((lang) => (
              <option key={lang.languageId} value={lang.languageId}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs text-amber-50/50">Level</label>
          <select
            value={pickerLevel}
            onChange={(e) => setPickerLevel(e.target.value)}
            className="rounded border border-navy-600 bg-navy-800 px-3 py-2 text-sm text-amber-50 focus:border-amber-400 focus:outline-none"
          >
            {LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleAdd}
          disabled={!pickerLanguageId}
        >
          Add
        </Button>
      </div>
      <div className="mt-6 space-y-2">
        {myLanguages.length === 0 ? (
          <p className="text-sm text-amber-50/40">No languages added yet.</p>
        ) : (
          myLanguages.map((lang) => (
            <div
              key={lang.languageId}
              className="flex items-center justify-between rounded border border-navy-700 bg-navy-800 px-4 py-2.5"
            >
              <span className="font-medium text-amber-50">{lang.name}</span>
              <div className="flex items-center gap-3">
                <select
                  value={lang.level}
                  onChange={(e) =>
                    handleLevelChange(lang.languageId, e.target.value)
                  }
                  className="rounded border border-navy-600 bg-navy-900 px-2 py-1 text-sm text-amber-50 focus:border-amber-400 focus:outline-none"
                >
                  {LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => handleRemove(lang.languageId)}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-6 flex items-center gap-4">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Languages"}
        </Button>
        {saved && <span className="text-sm text-green-400">Saved!</span>}
      </div>
    </Card>
  );
}
