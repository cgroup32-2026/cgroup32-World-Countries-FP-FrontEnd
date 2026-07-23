import { apiClient } from "./apiClient";

export const countriesApi = {
  getAll: () => apiClient.get("/Countries"),
  getById: (id) => apiClient.get(`/Countries/${id}`),
};