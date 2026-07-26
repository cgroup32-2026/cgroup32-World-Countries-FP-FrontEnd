import { apiClient } from "./apiClient";

export const geoGameApi = {
  getModes: () => apiClient.get("/GeoGame/modes"),
  submitAttempt: (data) => apiClient.post("/GeoGame/attempts", data),
  getLeaderboard: (modeCode) => apiClient.get(`/GeoGame/leaderboard/${modeCode}`),
  getTotalLeaderboard: () => apiClient.get("/GeoGame/leaderboard-total"),
  getMyAttempts: () => apiClient.get("/GeoGame/me/attempts"),
  getLandmarkPool: () => apiClient.get("/GeoGame/landmarks")
};