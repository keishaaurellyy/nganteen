import axios from "axios";
import { OrderItemList } from "../schema/order-item";

export const passOrderItems = async (
  url: string,
  { arg }: { arg: OrderItemList }
) => {
  const response = await axios.post(url, arg);
  return response.data;
};
