import { OrderItems } from "./order-item";

export enum OrderStatus {
  INCOMING = "INCOMING",
  COOKING = "COOKING",
  READY = "READY",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
export interface OrderData {
  buyerId?: number;
  kitchenId?: number;
  orderId?: number;
  orderCode: string;
  createdDate: string;
  items: OrderItems[];
  notes?: string;
  totalPayment?: number;
  status?: OrderStatus;
}
