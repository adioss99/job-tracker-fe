import { useMutation, useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/api/api";
import type { JobRequest, JobResponse } from "@/types/job-interfaces";

export const useGetJobList = () => {
  return useQuery({
    queryKey: ["getJobList"],
    queryFn: () => apiFetch<JobResponse[]>("/api/job", { method: "GET" }),
    retry: false,
    staleTime: 1000 * 10,
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
    retry: false,
  });
};

export const useGetJobById = (id: string) => {
  return useQuery({
    queryKey: ["getJobById", id],
    queryFn: () => apiFetch<JobResponse>(`/api/job/${id}`, { method: "GET" }),
    retry: false,
    enabled: !!id,
    staleTime: 1000 * 10,
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
    retry: false,
  });
};

export const useRemoveJob = (id: string) => {
  return useMutation({
    mutationKey: ["removeJob", id],
    mutationFn: () =>
      apiFetch<JobResponse>(`/api/job/${id}`, { method: "PUT" }),
    retry: false,
  });
};
