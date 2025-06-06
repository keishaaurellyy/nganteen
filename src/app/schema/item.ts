import { z } from "zod";
import { KitchenStatus } from "../types/kitchen";

const KitchenOperational = z.object({
  status: z.nativeEnum(KitchenStatus).optional(),
});

export const RegisterItemSchema = z.object({
  item_name: z.string().min(1, { message: "Name is required" }),
  item_description: z.string().optional(),
  item_price: z.number().int().min(0, { message: "Price cannot be negative" }),
  item_stock: z.number().int().min(0, { message: "Stock cannot be negative" }),
  item_url: z.instanceof(File).optional(),
});

export const ExtendedRegisterItemSchema = KitchenOperational.extend({
  items: z.array(RegisterItemSchema),
});
export type RegisterItem = z.infer<typeof ExtendedRegisterItemSchema>;

export const EditItemSchema = z.object({
  item_id: z.number().int().min(1),
  item_name: z.string().optional(),
  item_description: z.string().optional(),
  item_price: z.number().int().min(0).optional(),
  item_stock: z.number().int().min(0).optional(),
  item_url: z.instanceof(File).optional(),
});

export const ExtendedEditItemSchema = KitchenOperational.extend({
  items: z.array(EditItemSchema),
});

export type EditItem = z.infer<typeof ExtendedEditItemSchema>;
