import { apiClient } from "./apiClient";

export const adminApi = {
  getUsers: () => apiClient.get("/Admin/users"),
  setLocked: (userId, isLocked) => apiClient.put(`/Admin/users/${userId}/lock`, { isLocked }),
  setCanShare: (userId, canShare) => apiClient.put(`/Admin/users/${userId}/sharing`, { canShare }),
  getStats: () => apiClient.get("/Admin/stats"),
};