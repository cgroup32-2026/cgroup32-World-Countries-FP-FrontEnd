import { apiClient } from "./apiClient";

export const quizzesApi = {
  getAll: () => apiClient.get("/Quizzes"),
  getQuestions: (quizId) => apiClient.get(`/Quizzes/${quizId}/questions`),
  submit: (quizId, data) => apiClient.post(`/Quizzes/${quizId}/submit`, data),
  getMyAttempts: () => apiClient.get("/Quizzes/me/attempts"),
  getLeaderboard: (quizId) => apiClient.get(`/Quizzes/${quizId}/leaderboard`),
};