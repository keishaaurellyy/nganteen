import { z } from "zod";

export const loginAdmin = z.object({
  email: z.string().email({ message: "That's an invalid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginAdmin = z.infer<typeof loginAdmin>;
