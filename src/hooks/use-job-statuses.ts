import { useMutation } from "@tanstack/react-query";

import { apiFetch } from "@/api";
import { queryClient } from "@/main";
import type {
  JobStatusesRequest,
  JobStatusesResponse,
} from "@/types/job-interfaces";

export const useAddJobStatus = (id: string) => {
  return useMutation({
    mutationKey: ["addJobStatus", id],
    mutationFn: (payload: JobStatusesRequest) =>
      apiFetch<JobStatusesResponse>(`/api/job-status/${id}`, {
        method: "POST",
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

export const useUpdateJobStatus = (jobId: string, id: string) => {
  return useMutation({
    mutationKey: ["updateJobStatus", id],
    mutationFn: (payload: JobStatusesRequest) =>
      apiFetch<JobStatusesResponse>(`/api/job-status/${jobId}?statusId=${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    onError: (err) => {
      console.error(err);
      throw new Error("Something went wrong");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getJobDetail", jobId] });
      queryClient.invalidateQueries({ queryKey: ["getJobList"] });
    },
    retry: false,
  });
};

export const useRemoveJobStatus = (jobId: string, id: string) => {
  return useMutation({
    mutationKey: ["removeJobStatus", id],
    mutationFn: () =>
      apiFetch<JobStatusesResponse>(`/api/job-status?statusId=${id}`, {
        method: "DELETE",
      }),
    onError: (err) => {
      console.error(err);
      throw new Error("Something went wrong");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getJobDetail", jobId] });
      queryClient.invalidateQueries({ queryKey: ["getJobList"] });
    },
    retry: false,
  });
};
