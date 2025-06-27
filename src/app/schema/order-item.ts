import { z } from "zod";

export const OrderItemSchema = z.object({
  item_id: z.number().int().min(1),
  item_name: z.string().min(1),
  item_price: z.number().int().min(0),
  item_qty: z.number().int().min(1),
  total_item_price: z.number().int().min(0),
});

export const OrderItemListSchema = z.array(OrderItemSchema);

export type OrderItem = z.infer<typeof OrderItemSchema>;
export type OrderItemList = z.infer<typeof OrderItemListSchema>;

export const CreateOrderSchema = z.object({
  kitchen_id: z.number(),
  items: z.array(OrderItemSchema).min(1),
  notes: z.string().nullish(),
  total_payment: z.number().min(1),
});

export type CreateOrder = z.infer<typeof CreateOrderSchema>;
