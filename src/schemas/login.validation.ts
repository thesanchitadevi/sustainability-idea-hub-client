import { z } from "zod";

// Form schema validation
export const loginFormSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Please enter a valid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .required();
