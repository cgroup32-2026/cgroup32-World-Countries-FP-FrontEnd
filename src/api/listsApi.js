import { apiClient } from "./apiClient";

export const listsApi = {
  getMine: () => apiClient.get("/Lists/me"),
  add: (countryId, listType) => apiClient.post("/Lists/me", { countryId, listType }),
  remove: (countryId, listType) => apiClient.delete(`/Lists/me/${countryId}/${listType}`),
  move: (countryId, fromListType, toListType) => apiClient.put("/Lists/me/move", { countryId, fromListType, toListType }),
};