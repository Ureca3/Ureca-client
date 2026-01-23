import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

export interface InterceptorDeps {
  getAccessToken: () => string | null;
  setAccessToken: (token: string) => void;
  clearAuth: () => void;
  onUnauthorized?: () => void;
  refreshPath?: string;
}

interface InterceptorFlaggedClient extends AxiosInstance {
  __interceptorsAttached?: boolean;
}

export interface RefreshResponse {
  accessToken: string;
  accessTokenExpiresIn: number;
}

/* Axios 인스턴스에 인터셉터를 "한 번만" 붙임. 반환값은 teardown 함수(eject)라서 필요하면 해제 가능.*/
export function setupInterceptors(apiClient: AxiosInstance, deps: InterceptorDeps) {
  const refreshPath = deps.refreshPath ?? '/api/auth/refresh';

  // 인터셉터 중복 장착 방지 (개발환경 리렌더/핫리로드 대비)
  const anyClient = apiClient as InterceptorFlaggedClient;
  if (anyClient.__interceptorsAttached) {
    return () => {};
  }
  anyClient.__interceptorsAttached = true;

  // refresh는 인터셉터 없는 별도 클라이언트로 호출 (무한루프 방지)
  const refreshClient = axios.create({
    baseURL: apiClient.defaults.baseURL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
    timeout: apiClient.defaults.timeout ?? 10000,
  });

  let isRefreshing = false;
  let refreshQueue: Array<(token: string | null) => void> = [];

  const notifyQueue = (token: string | null) => {
    refreshQueue.forEach((resolve) => resolve(token));
    refreshQueue = [];
  };

  const requestId = apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 쿠키가 필요한 요청이면 항상 쿠키 포함
      // (refreshToken 기반 로직이거나, 이후 서버에서 HttpOnly 쿠키 쓰게 될 때 대비)
      config.withCredentials = true;

      const token = deps.getAccessToken();
      if (token) {
        config.headers = config.headers ?? {};
        // 이미 있으면 덮어쓰지 않음(원하면 덮어써도 됨)
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  const responseId = apiClient.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const status = error.response?.status;
      const original = error.config as
        | (InternalAxiosRequestConfig & { _retry?: boolean })
        | undefined;

      if (!original) return Promise.reject(error);

      const urlPath = (original.url ?? '').split('?')[0];

      const isAuthEndpoint =
        urlPath === '/api/auth/logout' ||
        urlPath === refreshPath ||
        urlPath.startsWith('/api/auth/login');

      if (status !== 401 || original._retry || isAuthEndpoint) {
        return Promise.reject(error);
      }

      // refresh 동시 호출 1회로 합치기
      if (isRefreshing) {
        const newToken = await new Promise<string | null>((resolve) => {
          refreshQueue.push(resolve);
        });

        if (!newToken) {
          deps.clearAuth();
          deps.onUnauthorized?.();
          return Promise.reject(error);
        }

        original.headers = original.headers ?? {};
        original.headers.Authorization = `Bearer ${newToken}`;
        original._retry = true;
        return apiClient(original);
      }

      // 여기부터 refresh 1회 실행
      isRefreshing = true;
      original._retry = true;

      function isValidRefreshResponse(data: unknown): data is RefreshResponse {
        return (
          typeof data === 'object' &&
          data !== null &&
          'accessToken' in data &&
          typeof (data as RefreshResponse).accessToken === 'string'
        );
      }

      try {
        const refreshRes = await refreshClient.post(refreshPath, null);

        if (!isValidRefreshResponse(refreshRes.data)) {
          console.error('[Auth] Invalid refresh response:', refreshRes.data);
          notifyQueue(null);
          deps.clearAuth();
          deps.onUnauthorized?.();
          return Promise.reject(new Error('Invalid refresh response'));
        }

        const newToken = refreshRes.data.accessToken;
        if (!newToken) {
          notifyQueue(null);
          deps.clearAuth();
          deps.onUnauthorized?.();
          return Promise.reject(error);
        }

        deps.setAccessToken(newToken);
        notifyQueue(newToken);

        original.headers = original.headers ?? {};
        original.headers.Authorization = `Bearer ${newToken}`;

        return apiClient(original);
      } catch (refreshErr) {
        notifyQueue(null);
        deps.clearAuth();
        deps.onUnauthorized?.();
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    },
  );

  return () => {
    apiClient.interceptors.request.eject(requestId);
    apiClient.interceptors.response.eject(responseId);
    anyClient.__interceptorsAttached = false;
  };
}
