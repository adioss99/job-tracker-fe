import type { ApiResponse } from "./api-interface";

type RolesType =
  | "Full Time"
  | "Part Time"
  | "Internship"
  | "Contract"
  | "Freelance";
type TypesType = "Onsite" | "Remote" | "Hybrid";
type SourcesType =
  | "LinkedIn"
  | "Indeed"
  | "Socmed"
  | "Glints"
  | "Jobstreet"
  | "Other";
type ApplyOnsType =
  | "InApp"
  | "Email"
  | "Company Web"
  | "Whatsapp"
  | "GoogleForm"
  | "Other";

export type JobPayloadType = {
  title: string;
  company: string;
  role: RolesType;
  type: TypesType;
  source: SourcesType;
  sourceLink?: string;
  location: string;
  applyDate: Date;
  applyOn: ApplyOnsType;
};

export type JobStatusesType = {
  id?: string;
  status: string;
  addDate: Date;
};

export type JobSearchType = {
  title?: string;
  company?: string;
  location?: string;
};

export type JobResponse = ApiResponse<JobPayloadType>;
export type JobRequest = JobPayloadType;
export type JobListResponse = ApiResponse<
  Array<
    JobPayloadType & {
      id: string;
      latestStatus: string;
    }
  >
> & {
  pagination: {
    currentPage: number;
    totalItems: number;
    totalPages: number;
  };
};

export type JobDetailsResponse = ApiResponse<
  JobPayloadType & { statuses: JobStatusesType[] }
> & {
  id: string;
};

export type JobStatusesRequest = JobStatusesType;
export type JobStatusesResponse = ApiResponse<JobStatusesType>;

export type jobDashboardType = ApiResponse<{
  totalJobApplied: number;
  totalJobLast30Days: number;
  applicationsResponded: number;
  applicationsRejected: number;
}>;
