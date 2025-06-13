import { z } from "zod";

export const OrderItemSchema = z.object({
  item_id: z.number().int().min(1),
  item_name: z.string().min(1),
  item_price: z.number().int().min(0),
  item_qty: z.number().int().min(1),
  item_url: z.string().url().optional(),
});

export const OrderItemListSchema = z.array(OrderItemSchema);

export type OrderItem = z.infer<typeof OrderItemSchema>;
export type OrderItemList = z.infer<typeof OrderItemListSchema>;
