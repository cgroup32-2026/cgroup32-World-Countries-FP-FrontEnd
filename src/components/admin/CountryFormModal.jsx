import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

const emptyForm = {
  ccaCode3: "",
  nameCommon: "",
  nameOfficial: "",
  region: "",
  subregion: "",
  capital: "",
  population: "",
  areaKm2: "",
  flagUrl: "",
  mapUrl: "",
  latitude: "",
  longitude: "",
};

export function CountryFormModal({ isOpen, country, onClose, onSubmit }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(
      country
        ? {
            ccaCode3: country.ccaCode3 ?? "",
            nameCommon: country.nameCommon ?? "",
            nameOfficial: country.nameOfficial ?? "",
            region: country.region ?? "",
            subregion: country.subregion ?? "",
            capital: country.capital ?? "",
            population: country.population ?? "",
            areaKm2: country.areaKm2 ?? "",
            flagUrl: country.flagUrl ?? "",
            mapUrl: country.mapUrl ?? "",
            latitude: country.latitude ?? "",
            longitude: country.longitude ?? "",
          }
        : emptyForm,
    );
  }, [country, isOpen]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      ...form,
      population: form.population ? Number(form.population) : null,
      areaKm2: form.areaKm2 ? Number(form.areaKm2) : null,
      latitude: form.latitude ? Number(form.latitude) : null,
      longitude: form.longitude ? Number(form.longitude) : null,
    });
  }

  if (!isOpen) return null;
  const isEditing = country !== null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-10"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-lg border border-navy-700 bg-navy-900 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between">
          <h2 className="font-heading text-2xl text-amber-400">
            {isEditing ? "Edit Country" : "Add Country"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-amber-50/50 hover:text-amber-50"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Country Code (3 letters)"
              name="ccaCode3"
              value={form.ccaCode3}
              onChange={handleChange}
              maxLength={3}
              required
              disabled={isEditing}
            />
            <Input
              label="Common Name"
              name="nameCommon"
              value={form.nameCommon}
              onChange={handleChange}
              required
            />
            <Input
              label="Official Name"
              name="nameOfficial"
              value={form.nameOfficial}
              onChange={handleChange}
            />
            <Input
              label="Region"
              name="region"
              value={form.region}
              onChange={handleChange}
            />
            <Input
              label="Subregion"
              name="subregion"
              value={form.subregion}
              onChange={handleChange}
            />
            <Input
              label="Capital"
              name="capital"
              value={form.capital}
              onChange={handleChange}
            />
            <Input
              label="Population"
              name="population"
              type="number"
              value={form.population}
              onChange={handleChange}
            />
            <Input
              label="Area (km²)"
              name="areaKm2"
              type="number"
              value={form.areaKm2}
              onChange={handleChange}
            />
            <Input
              label="Latitude"
              name="latitude"
              type="number"
              value={form.latitude}
              onChange={handleChange}
            />
            <Input
              label="Longitude"
              name="longitude"
              type="number"
              value={form.longitude}
              onChange={handleChange}
            />
          </div>
          <Input
            label="Flag URL"
            name="flagUrl"
            value={form.flagUrl}
            onChange={handleChange}
          />
          <Input
            label="Map URL"
            name="mapUrl"
            value={form.mapUrl}
            onChange={handleChange}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Save Changes" : "Add Country"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
