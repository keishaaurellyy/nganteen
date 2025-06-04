import { LoginKitchen } from "@/app/schema/kitchen";
import axios from "axios";

export const loginKitchen = async (
  url: string,
  { arg }: { arg: LoginKitchen }
) => {
  const response = await axios.post(url, arg);
  return response.data;
};
