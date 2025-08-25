import { useMutation } from "@tanstack/react-query";

import { apiFetch } from "@/api/api";
import type { AddJobFormData } from "@/validation/job-validation";

export const useAddTrackJob = () => {
  return useMutation({
    mutationKey: ["addTrackJob"],
    mutationFn: (payload: AddJobFormData) =>
      apiFetch<AddJobFormData>("/api/job", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    retry: false,
  });
};

export const useRemoveTrackJob = () => {};

export const useUpdateTrackJob = () => {};

export const useGetTrackJobList = () => {};

export const useGetTrackJobDetails = () => {};
