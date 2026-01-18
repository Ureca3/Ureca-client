// 모든 API 요청에 사용되는 Axios 인스턴스를 설정하는 파일
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '', // 지금은 mock이라 비워둠
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
