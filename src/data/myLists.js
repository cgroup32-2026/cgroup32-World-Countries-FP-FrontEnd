import { countries } from "./countries";

function buildEntry(countryId, listType, listEntryId, addedAt) {
  const country = countries.find((c) => c.countryId === countryId);
  return {
    listEntryId,
    countryId: country.countryId,
    nameCommon: country.nameCommon,
    flagUrl: country.flagUrl,
    region: country.region,
    listType,
    addedAt,
  };
}

export const myListEntries = [
  buildEntry(1, "Visited", 1, "2026-06-01T10:00:00Z"),
  buildEntry(2, "Visited", 2, "2026-06-10T10:00:00Z"),
  buildEntry(5, "Visited", 3, "2026-06-15T10:00:00Z"),
  buildEntry(4, "WantToVisit", 4, "2026-07-01T10:00:00Z"),
  buildEntry(6, "WantToVisit", 5, "2026-07-05T10:00:00Z"),
  buildEntry(3, "WantToVisit", 6, "2026-07-10T10:00:00Z"),
];