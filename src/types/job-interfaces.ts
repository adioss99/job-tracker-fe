import type { ApiResponse } from "./api-interface";

type roles =
  | "Full Time"
  | "Part Time"
  | "Internship"
  | "Contract"
  | "Freelance";
type types = "Onsite" | "Remote" | "Hybrid";
type sources =
  | "LinkedIn"
  | "Indeed"
  | "Socmed"
  | "Glints"
  | "Jobstreet"
  | "Other";
type applyOns =
  | "InApp"
  | "Email"
  | "Company Web"
  | "Whatsapp"
  | "GoogleForm"
  | "Other";

export type JobPayloadType = {
  title: string;
  company: string;
  role: roles;
  type: types;
  source: sources;
  sourceLink?: string;
  location: string;
  applyDate: Date;
  applyOn: applyOns;
};

export type JobResponse = ApiResponse<JobPayloadType>;
export type JobRequest = JobPayloadType;
