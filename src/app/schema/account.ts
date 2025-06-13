import { z } from "zod";

const BaseAccountSchema = z.object({
  bank_name: z.string().min(1, "Bank name is required"),
  account_number: z.string().min(1, "Account number is required"),
  account_name: z.string().min(1, "Account name is required"),
});

export const RegisterAccountSchema = BaseAccountSchema;

export const EditAccountSchema = BaseAccountSchema.partial();

export type RegisterAccount = z.infer<typeof RegisterAccountSchema>;
export type EditAccount = z.infer<typeof EditAccountSchema>;
