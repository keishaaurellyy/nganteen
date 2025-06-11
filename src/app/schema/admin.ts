import { z } from "zod";

export const loginAdmin = z.object({
  email: z.string().email({ message: "Email invalid" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginAdmin = z.infer<typeof loginAdmin>;
