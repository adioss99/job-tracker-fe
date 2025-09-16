import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/api";
import type { JobChartType, jobDashboardType } from "@/types/job-interfaces";

export const useGetDashboard = () => {
  return useQuery({
    queryKey: ["getDashboard"],
    queryFn: () =>
      apiFetch<jobDashboardType>("/api/dashboard", { method: "GET" }),
    retry: false,
    staleTime: 1000 * 10 * 60,
  });
};

export const useGetDashboardChart = () => {
  return useQuery({
    queryKey: ["getDashboardChart"],
    queryFn: () =>
      apiFetch<JobChartType>("/api/dashboard/chart", { method: "GET" }),
    retry: false,
    staleTime: 1000 * 10 * 60,
  });
};
