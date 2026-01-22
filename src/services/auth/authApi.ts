import { apiClient } from '@/services/api/client';

export const authApi = {
  logout: () => apiClient.post('/api/auth/logout'),
  withdrawal: () => apiClient.post('/api/users/withdrawal'),
};
