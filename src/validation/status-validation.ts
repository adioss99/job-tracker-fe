import { z } from "zod";

export const statusSchema = z.object({
  status: z.string().min(1, { message: "This field is required" }),
  statusInput: z.string().optional(),
  addDate: z.date().min(1, { message: "This field is required" }),
});

export type StatusFormData = z.infer<typeof statusSchema>;
