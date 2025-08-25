import type { ApiResponse } from "./api-interface";

type JobPayload = {
  title: string;
  company: string;
  role: string;
  type: string;
  source: string;
  sourceLink?: string;
  location: string;
  applyDate: Date;
  applyOn: string;
};

export type JobResponse = ApiResponse<JobPayload>;
export type JobRequest = JobPayload;
