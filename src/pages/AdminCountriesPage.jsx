import { useEffect, useState } from "react";
import { countriesApi } from "../api/countriesApi";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { CountryFormModal } from "../components/admin/CountryFormModal";
import { formatNumber } from "../utils/format";

export function AdminCountriesPage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);

  function loadCountries() {
    setLoading(true);
    countriesApi
      .getAll()
      .then(setCountries)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    loadCountries();
  }, []);

  function openAddModal() {
    setEditingCountry(null);
    setModalOpen(true);
  }
  function openEditModal(country) {
    setEditingCountry(country);
    setModalOpen(true);
  }

  async function handleSubmit(formData) {
    try {
      if (editingCountry)
        await countriesApi.update(editingCountry.countryId, formData);
      else await countriesApi.create(formData);
      setModalOpen(false);
      loadCountries();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDelete(countryId, name) {
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return;
    try {
      await countriesApi.remove(countryId);
      setCountries((current) =>
        current.filter((c) => c.countryId !== countryId),
      );
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
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-5xl text-amber-400">
              Manage Countries
            </h1>
            <p className="mt-3 text-amber-50/70">
              Add, edit, or remove country records.
            </p>
          </div>
          <Button onClick={openAddModal}>+ Add Country</Button>
        </header>

        <Card className="overflow-x-auto p-0">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b border-navy-700 bg-navy-800">
              <tr>
                <th className="px-6 py-4">Country</th>
                <th className="px-6 py-4">Region</th>
                <th className="px-6 py-4">Population</th>
                <th className="px-6 py-4">Area (km²)</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country) => (
                <tr
                  key={country.countryId}
                  className="border-b border-navy-700 last:border-b-0"
                >
                  <td className="px-6 py-5">
                    <p className="font-semibold text-amber-50">
                      {country.nameCommon}
                    </p>
                    <p className="mt-1 text-xs text-amber-50/50">
                      {country.ccaCode3}
                    </p>
                  </td>
                  <td className="px-6 py-5 text-amber-50/70">
                    {country.region ?? "—"}
                  </td>
                  <td className="px-6 py-5 text-amber-50/70">
                    {country.population != null
                      ? formatNumber(country.population)
                      : "—"}
                  </td>
                  <td className="px-6 py-5 text-amber-50/70">
                    {country.areaKm2 != null
                      ? formatNumber(country.areaKm2)
                      : "—"}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        className="px-3 py-1.5 text-xs"
                        onClick={() => openEditModal(country)}
                      >
                        Edit
                      </Button>
                      <button
                        onClick={() =>
                          handleDelete(country.countryId, country.nameCommon)
                        }
                        className="rounded-md border border-red-800 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-900/30"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <CountryFormModal
        isOpen={modalOpen}
        country={editingCountry}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
