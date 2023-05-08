import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from './token';

const BASE_URL = 'https://grading.design.pages.academy';
const TIMEOUT = 5000;

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    }
  );

  // api.interceptors.response.use(
  //   (response) => response,
  //   (error: AxiosError<{ error: string }>) => {
  //     if (error.response && shouldDisplayError(error.response)) {
  //       toast.warn(error.response.data.error);
  //     }

  //     throw error;
  //   }
  // );

  return api;
};
