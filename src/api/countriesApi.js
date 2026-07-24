import { apiClient } from "./apiClient";

export const countriesApi = {
  getAll: () => apiClient.get("/Countries"),
  getById: (id) => apiClient.get(`/Countries/${id}`),
  search: (params) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") query.append(key, value);
    });
    return apiClient.get(`/Countries/search?${query.toString()}`);
  },
};