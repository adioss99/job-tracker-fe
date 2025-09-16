import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/api";
import type { jobDashboardType } from "@/types/job-interfaces";

export const useGetDashboard = () => {
  return useQuery({
    queryKey: ["getDashboard"],
    queryFn: () =>
      apiFetch<jobDashboardType>("/api/dashboard", { method: "GET" }),
    retry: false,
    staleTime: 1000 * 10 * 60,
  });
};
