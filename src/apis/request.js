import axios from 'axios';

// ==================================== 요청 ======================================

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 6000,
  maxRedirects: 0,
  withCredentials: true,
});
// 요청 인터셉션
instance.interceptors.request.use(
  async (config) =>
    // 요청 보내기 전  수행로직
    {
      return config;
    },

  (
    // 요청 에러 발생시 수행로직
    error,
  ) => {
    return Promise.reject(error);
  },
);

// ==================================== 요청 ======================================

// ==================================== 응답 ======================================

// 응답 인터셉션 추
instance.interceptors.response.use(
  async (
    // 응답 로직 생성
    response,
  ) => {
    return response;
  },

  (
    // 응답 에러
    error,
  ) => {
    return Promise.reject(error);
  },
);

// ==================================== 응답 ======================================

instance.interceptors.response;

export default instance;
