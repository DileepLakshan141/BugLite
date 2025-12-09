import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name at least have 1 character.")
    .max(50, "Project name can not exceed 50 characters."),
  description: z
    .string()
    .min(1, "Project description at least have 1 character.")
    .max(300, "Project description can not exceed 300 characters."),
  author: z.string(),
});
