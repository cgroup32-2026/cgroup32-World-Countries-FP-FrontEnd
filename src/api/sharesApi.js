import { apiClient } from "./apiClient";

export const sharesApi = {
  getByCountry: (countryId) => apiClient.get(`/Shares/country/${countryId}`),
  create: (data) => apiClient.post("/Shares", data),
};