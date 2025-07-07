import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class ApiError extends Error {
  public status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

export const createClient = (getToken?: () => Promise<string | null>): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (getToken) {
    client.interceptors.request.use(
      async (config) => {
        try {
          const token = await getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.warn('Failed to get auth token:', error);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
      const status = error.response?.status || 500;
      return Promise.reject(new ApiError(errorMessage, status));
    }
  );

  return client;
};

const request = async <T>(
  client: AxiosInstance,
  config: AxiosRequestConfig,
) => {
  const { data } = await client.request<T>(config);
  return data;
}

const wrap = (token?: string) => {
  if (token) {
    return async () => token;
  }
}

export const api = {
  get<T>(config: AxiosRequestConfig, token?: string) {
    const client = createClient(wrap(token));
    return request<T>(client, { ...config, method: 'GET' });
  },

  post<T>(config: AxiosRequestConfig, token?: string) {
    const client = createClient(wrap(token));
    return request<T>(client, { ...config, method: 'POST' });
  },

  put<T>(config: AxiosRequestConfig, token?: string) {
    const client = createClient(wrap(token));
    return request<T>(client, { ...config, method: 'PUT' });
  },

  patch<T>(config: AxiosRequestConfig, token?: string) {
    const client = createClient(wrap(token));
    return request<T>(client, { ...config, method: 'PATCH' });
  },

  delete<T>(config: AxiosRequestConfig, token?: string) {
    const client = createClient(wrap(token));
    return request<T>(client, { ...config, method: 'DELETE' });
  },
};

export type { AxiosRequestConfig, AxiosInstance };
