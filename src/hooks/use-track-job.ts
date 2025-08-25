import { useMutation } from "@tanstack/react-query";

import { apiFetch } from "@/api/api";
import type { JobRequest, JobResponse } from "@/ts/interface/job-interfaces";

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

export const useRemoveJob = () => {};

export const useUpdateJob = () => {};

export const useGetJobList = () => {};

export const useGetJobDetails = () => {};
