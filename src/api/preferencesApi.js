import { apiClient } from "./apiClient";

export const preferencesApi = {
  getAllContinents: () => apiClient.get("/Preferences/continents"),
  getAllLanguages: () => apiClient.get("/Preferences/languages"),
  getMyContinents: () => apiClient.get("/Preferences/me/continents"),
  setMyContinents: (continentIds) => apiClient.put("/Preferences/me/continents", { continentIds }),
  getMyLanguages: () => apiClient.get("/Preferences/me/languages"),
  setMyLanguages: (languages) => apiClient.put("/Preferences/me/languages", { languages }),
};