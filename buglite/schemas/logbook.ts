import { z } from "zod";

export const logbook_schema = z.object({
  project_id: z.string("Project id is required!"),
  user_id: z.string("User id is required!"),
  title: z
    .string()
    .min(1, "At least 1 character is needed for title!")
    .max(100, "Maximum limit for title is 100 characters!"),
  description: z
    .string()
    .min(1, "At least 1 character is needed for description!")
    .max(300, "Maximum limit for description is 300 characters!"),
  category: z.enum(
    [
      "issue",
      "bug",
      "testing",
      "feature_request",
      "refactor",
      "performance",
      "security",
      "dependency",
      "architecture",
    ],
    "Category should be one of values from dropdown!"
  ),
  state: z.enum(
    ["pending", "resolved"],
    "State should be either pending or resolved!"
  ),
});
