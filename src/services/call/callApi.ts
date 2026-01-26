import type { TokenResponse } from '@/types/call/dto';

import { apiClient } from '../api';

export const callApi = {
  token: (channel: string, uid: number) =>
    apiClient.get<TokenResponse>(`/api/agora/token?channel=${channel}&uid=${uid}`),
};
