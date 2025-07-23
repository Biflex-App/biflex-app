import { AxiosRequestConfig } from "axios";
import { useApi } from "./api";
import { useQuery } from "@tanstack/react-query";
import { ExerciseDto } from "@/services/exerciseService";

export const exerciseKeys = {
  all: ['exercises'] as const,
};

export const useExercises = (
  enabled: boolean = true,
  config: AxiosRequestConfig = {},
) => {
  const api = useApi(false);

  return useQuery({
    queryKey: exerciseKeys.all,
    queryFn: async () => {
      const response = await api.get<ExerciseDto[]>({ ...config, url: '/exercise' });
      return response;
    },
    enabled: enabled && api.ready,
  });
};
