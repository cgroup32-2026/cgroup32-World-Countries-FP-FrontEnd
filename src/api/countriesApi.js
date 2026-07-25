import { apiClient } from "./apiClient";

export const countriesApi = {
  getAll: () => apiClient.get("/Countries"),
  getById: (id) => apiClient.get(`/Countries/${id}`),
  getLandmarks: (id) => apiClient.get(`/Countries/${id}/landmarks`),
  search: (params) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") query.append(key, value);
    });
    return apiClient.get(`/Countries/search?${query.toString()}`);
  },
  create: (data) => apiClient.post("/Countries", data),
  update: (id, data) => apiClient.put(`/Countries/${id}`, data),
  remove: (id) => apiClient.delete(`/Countries/${id}`),
};