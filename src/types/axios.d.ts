import 'axios';

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }

  export interface AxiosInstance {
    __interceptorsAttached?: boolean;
  }
}
