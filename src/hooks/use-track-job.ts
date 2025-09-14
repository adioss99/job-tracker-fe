import { useMutation, useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/api";
import { queryClient } from "@/main";
import { usePersistStore } from "@/stores/use-persist";
import type {
  JobDetailsResponse,
  JobListResponse,
  JobRequest,
  JobResponse,
} from "@/types/job-interfaces";

export const useGetJobList = (pagination: string, filters: string) => {
  const userId = usePersistStore((state) => state.auth._user);
  const queryParams = `?${pagination}${filters ? `&${filters}` : ""}`;
  return useQuery({
    queryKey: ["getJobList", userId, queryParams],
    queryFn: () =>
      apiFetch<JobListResponse>(`/api/jobs${queryParams}`, {
        method: "GET",
      }),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAddJob = () => {
  return useMutation({
    mutationKey: ["addJob"],
    mutationFn: (payload: JobRequest) =>
      apiFetch<JobResponse>("/api/job", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onError: (err) => {
      console.error(err);
      throw new Error("Something went wrong");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getJobList"] });
    },
    retry: false,
  });
};

export const useGetJobById = (id: string) => {
  return useQuery({
    queryKey: ["getJobDetail", id],
    queryFn: () =>
      apiFetch<JobDetailsResponse>(`/api/job/${id}`, { method: "GET" }),
    retry: false,
    enabled: !!id,
    staleTime: 1000 * 10 * 60,
  });
};

export const useUpdateJob = (id: string) => {
  return useMutation({
    mutationKey: ["updateJob", id],
    mutationFn: (payload: JobRequest) =>
      apiFetch<JobResponse>(`/api/job/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    onError: (err) => {
      console.error(err);
      throw new Error("Something went wrong");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getJobDetail", id] });
      queryClient.invalidateQueries({ queryKey: ["getJobList"] });
    },
    retry: false,
  });
};

export const useRemoveJob = (id: string) => {
  return useMutation({
    mutationKey: ["removeJob", id],
    mutationFn: () =>
      apiFetch<JobResponse>(`/api/job/${id}`, { method: "DELETE" }),
    onError: (err) => {
      console.error(err);
      throw new Error("Something went wrong");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getJobList"] });
    },
    retry: false,
  });
};
