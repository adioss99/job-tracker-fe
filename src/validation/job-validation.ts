import { z } from "zod";

export const addJobSchema = z.object({
  title: z.string().min(1, { message: "required*" }),
  company: z.string().min(1, { message: "required*" }),
  role: z.string().min(1, { message: "required*" }),
  type: z.string().min(1, { message: "required*" }),
  source: z.string().min(1, { message: "required*" }),
  sourceLink: z.string().optional(),
  location: z.string().min(1, { message: "required*" }),
  applyDate: z.date().min(1, { message: "required*" }),
  applyOn: z.string().min(1, { message: "required*" }),
});

export type AddJobFormData = z.infer<typeof addJobSchema>;
