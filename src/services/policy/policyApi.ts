import { apiClient } from '@/services/api/client';

export const policyApi = {
  agree: async () => {
    await apiClient.post('/api/policy/agree');
  },
};
