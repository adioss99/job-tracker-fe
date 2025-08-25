import { z } from "zod";

export const addJobSchema = z.object({
  title: z.string().min(3),
  company: z.string().min(3),
  role: z.enum([
    "Full Time",
    "Part Time",
    "Internship",
    "Contract",
    "Freelance",
  ]),
  type: z.enum(["Remote", "Onsite", "Hybrid"]),
  source: z.enum([
    "LinkedIn",
    "Indeed",
    "Socmed",
    "Glints",
    "Jobstreet",
    "Other",
  ]),
  sourceLink: z.string().url().optional().or(z.literal("")),
  location: z.string().min(3),
  applyDate: z.date().min(3),
  applyOn: z.enum([
    "InApp",
    "Email",
    "Company Web",
    "Whatsapp",
    "GoogleForm",
    "Other",
  ]),
});

export type AddJobFormData = z.infer<typeof addJobSchema>;
