
import { Buyer } from "@/app/types/buyer";
import axios from "axios";

export const viewBuyerById = async (
  url: string,
  { arg }: { arg: { id: string } }
): Promise<Buyer> => {
  const response = await axios.get(`${url}/${arg.id}`);
  return response.data;
};