import { apiClient } from './apiClient';

export const authApi = {
  register: (data) => apiClient.post('/Auth/register', data),
  login: (data) => apiClient.post('/Auth/login', data),
  getMe: () => apiClient.get('/Auth/me'),
  updateProfile: (data) => apiClient.put('/Auth/me', data),
};