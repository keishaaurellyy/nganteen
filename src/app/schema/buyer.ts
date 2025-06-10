import { z } from "zod";
import { UniversityName } from "@/app/types/buyer";

export const RegisterBuyerSchema = z
  .object({
    university_name: z.nativeEnum(UniversityName, {
      required_error: "Please select one university",
    }),
    university_email: z.string().email("That's an invalid email"),
    password: z
      .string()
      .min(5, "Password must be at least 5 characters")
      .max(15, "Password must be at most 15 characters")
      .regex(/[0-9!@#$%^&*]/, "Password must contain number or symbol"),
    confirm_password: z.string().min(1, "Confirm password is required"),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    phone_number: z
      .string()
      .regex(/^08[0-9]{8,12}$/, "Invalid Phone Number")
      .optional(),
    student_id_number: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
export type RegisterBuyer = z.infer<typeof RegisterBuyerSchema>;

export const EditBuyerSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone_number: z
    .string()
    .regex(/^08[0-9]{8,12}$/, "Invalid Phone Number")
    .optional(),
  student_id_number: z.string().optional(),
  university_email: z.string(),
});
export type EditBuyer = z.infer<typeof EditBuyerSchema>;

export const LoginBuyerSchema = z.object({
  university_email: z.string().email("That's an invalid email"),
  password: z.string().min(1, "Password is required"),
});
export type LoginBuyer = z.infer<typeof LoginBuyerSchema>;
