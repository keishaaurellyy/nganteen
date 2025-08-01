import { z } from "zod";
import { KitchenStatus } from "../types/kitchen";

export const RegisterKitchenSchema = z.object({
  kitchen_email: z.string().email("That's an invalid email"),
  kitchen_password: z.string().min(5).max(15),
  kitchen_name: z.string().min(1, "Please input kitchen's name"),
  kitchen_description: z.string().min(1, "Please input kitchen's description"),
  admin_name: z.string().min(1, "Please input kitchen PIC's name"),
  admin_phone: z.string().regex(/^08[0-9]{8,12}$/, "Invalid phone number"),
  location: z
    .string()
    .regex(
      /^[a-zA-Z0-9 ]+$/,
      "Location should only contain alphabet, number, and space."
    ),
  status: z.nativeEnum(KitchenStatus, {
    required_error: "Please define kitchen status",
  }),
  is_busy: z.boolean().optional(),
});
export type RegisterKitchen = z.infer<typeof RegisterKitchenSchema>;

export const EditKitchenSchema = z
  .object({
    kitchen_email: z.string().email("That's an invalid email").optional(),
    kitchen_password: z.string().min(5).max(15).optional(),
    kitchen_name: z.string().optional(),
    kitchen_description: z.string().nullish(),
    admin_name: z.string().optional(),
    admin_phone: z
      .string()
      .regex(/^08[0-9]{8,12}$/)
      .optional(),
    location: z
      .string()
      .regex(/^[a-zA-Z0-9 ]+$/)
      .optional(),
    status: z.nativeEnum(KitchenStatus).optional(),
    is_busy: z.boolean().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one field must be updated",
  });
export type EditKitchen = z.infer<typeof EditKitchenSchema>;

export const LoginKitchenSchema = z.object({
  email: z.string().email("That's an invalid email"),
  password: z.string().min(1, "Password is required"),
});
export type LoginKitchen = z.infer<typeof LoginKitchenSchema>;

export const UpdateStatusSchema = z.object({
  status: z.nativeEnum(KitchenStatus),
});

export type UpdateStatusKitchen = z.infer<typeof UpdateStatusSchema>;
