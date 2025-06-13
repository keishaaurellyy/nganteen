import { z } from "zod";

export const RegisterAccountSchema = z.object({
  bank_name: z.string(),
  account_number: z.string(),
  account_name: z.string(),
  created_date: z.string(),
});

export type RegisterAccount = z.infer<typeof RegisterAccountSchema>;
