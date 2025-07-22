import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./api";
import { UserDto, UserRoutineDto } from "@/services/userService";
import { AxiosRequestConfig } from "axios";

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: { handle?: string } | undefined) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  self: () => [...userKeys.all, 'self'] as const,
};

export const useCurrentUser = (
  enabled: boolean = true,
  config: AxiosRequestConfig = {},
) => {
  const api = useApi(true);

  return useQuery({
    queryKey: userKeys.self(),
    queryFn: async () => {
      const response = await api.get<UserDto>({ ...config, url: '/user/self' });
      return response;
    },
    enabled: enabled && api.ready,
  });
};

export const useUser = (
  id: string,
  enabled: boolean = true,
  config: AxiosRequestConfig = {},
) => {
  const api = useApi(true);

  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const response = await api.get<UserDto>({ ...config, url: `/user/${id}` });
      return response;
    },
    enabled: enabled && api.ready && !!id,
  });
};

export const useUsers = (
  filters?: { handle?: string },
  enabled: boolean = true,
  config: AxiosRequestConfig = {},
) => {
  const api = useApi(true);

  return useQuery({
    queryKey: userKeys.list(filters),
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.handle) {
        params.append('handle', filters.handle);
      }

      const url = `/user${params.toString() ? `?${params.toString()}` : ''}`;
      const response = await api.get<UserDto[]>({ ...config, url });
      return response;
    },
    enabled: enabled && api.ready,
  });
};

export const useCreateUser = (config: AxiosRequestConfig = {}) => {
  const api = useApi(true);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { handle: string; name: string }) => {
      const response = await api.post<UserDto>({
        ...config,
        url: '/user',
        data,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.self() });
    },
  });
};

export const useUpdateUser = (config: AxiosRequestConfig = {}) => {
  const api = useApi(true);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: { handle?: string; name?: string } }) => {
      const response = await api.put<UserDto>({
        ...config,
        url: `/user/${id}`,
        data,
      });
      return response;
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(userKeys.detail(variables.id), data);
      queryClient.setQueryData(userKeys.self(), data);
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

export const useDeleteUser = (config: AxiosRequestConfig = {}) => {
  const api = useApi(true);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete({ ...config, url: `/user/${id}` });
    },
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: userKeys.detail(id) });
      queryClient.removeQueries({ queryKey: userKeys.self() });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

export const useUpdateUserRoutine = (config: AxiosRequestConfig = {}) => {
  const api = useApi(true);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UserRoutineDto[] }) => {
      const response = await api.put<UserDto>({
        ...config,
        url: `/user/${id}/routine`,
        data,
      });
      return response;
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(userKeys.detail(variables.id), data);
      queryClient.setQueryData(userKeys.self(), data);
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};
