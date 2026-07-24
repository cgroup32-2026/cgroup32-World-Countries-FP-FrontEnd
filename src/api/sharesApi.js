import { apiClient } from "./apiClient";

export const sharesApi = {
  getAll: () => apiClient.get("/Shares"),
  getByCountry: (countryId) => apiClient.get(`/Shares/country/${countryId}`),
  getMine: () => apiClient.get("/Shares/me"),
  create: (data) => apiClient.post("/Shares", data),
  update: (shareId, data) => apiClient.put(`/Shares/${shareId}`, data),
  remove: (shareId) => apiClient.delete(`/Shares/${shareId}`),
};