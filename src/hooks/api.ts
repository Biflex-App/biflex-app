import { AxiosRequestConfig, AxiosInstance, createClient } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";

const request = async <T>(
  client: AxiosInstance,
  config: AxiosRequestConfig,
) => {
  const { data } = await client.request<T>(config);
  return data;
}

export const useApi = (authenticated: boolean) => {
  const { getToken, isSignedIn } = useAuth();

  if (authenticated && !isSignedIn) {
    throw new Error('User is not signed in');
  }

  const client = createClient(authenticated ? getToken : undefined)

  return {
    client,

    get<T>(config?: AxiosRequestConfig) {
      return request<T>(client, { ...config, method: 'GET' });
    },

    post<T>(config?: AxiosRequestConfig) {
      return request<T>(client, { ...config, method: 'POST' });
    },

    put<T>(config?: AxiosRequestConfig) {
      return request<T>(client, { ...config, method: 'PUT' });
    },

    patch<T>(config?: AxiosRequestConfig) {
      return request<T>(client, { ...config, method: 'PATCH' });
    },

    delete<T>(config?: AxiosRequestConfig) {
      return request<T>(client, { ...config, method: 'DELETE' });
    },
  };
};
