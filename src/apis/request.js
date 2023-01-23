import axios from 'axios';
import { Alert } from 'react-native';

// ==================================== 요청 ======================================

/**
 * SERVER WIFI : 192.168.35.217
 * localhost
 *
 */
const instance = axios.create({
  baseURL: 'http://192.168.35.217:4000',
  timeout: 5000,
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
    if (response.code === 'fail' && response.message) {
      Alert.alert(response.message);
    }

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
