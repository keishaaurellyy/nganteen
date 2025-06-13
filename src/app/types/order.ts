import { orderStatus } from "@/drizzle/schema";

export type OrderStatus = (typeof orderStatus.enumValues)[number];

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface OrderData {
  transactionId: string;
  orderDate: string;
  items: OrderItem[];
}
