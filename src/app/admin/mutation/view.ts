import { OrderData } from "@/app/types/order";
import axios from "axios";

export const getAllOrders = async (): Promise<OrderData[]> => {
  const res = await axios.get("/api/orders");

  if (res.data.success) {
    return res.data.data;
  } else {
    throw new Error(res.data.error || "Failed to fetch orders");
  }
};
