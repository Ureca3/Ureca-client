import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/services/api/client';

export interface MeResponse {
  id: number;
  email: string | null;
  name: string;
  role: string;
  provider: string | null;
  termsAgreed: boolean;
  termsAgreedAt: string | null;
}

export const useMe = () =>
  useQuery<MeResponse>({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const res = await apiClient.get('/api/auth/me'); // withCredentials는 apiClient에 이미 true
      return res.data;
    },
  });
