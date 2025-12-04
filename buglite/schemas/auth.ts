import { refine, z } from "zod";

export const signInSchema = z.object({
  email: z.email("valid email address required"),
  password: z.string().min(8, "Minimum password length is 8 chars/letters"),
});

export const signUpSchema = z
  .object({
    username: z.string().min(5, "Username must have at least 5 letters"),
    email: z.email("valid email address required"),
    password: z.string().min(8, "Minimum password length is 8 chars/letters"),
    confirm_password: z.string(),
  })
  .refine((data) => data.confirm_password === data.password, {
    message: "Entered passwords are mismatching",
    path: ["confirm_password"],
  });
