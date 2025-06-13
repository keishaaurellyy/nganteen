import axios from "axios";
import { LoginKitchen } from "@/app/schema/kitchen";

export const loginKitchen = async (
  url: string,
  { arg }: { arg: LoginKitchen }
) => {
  const response = await axios.post(url, {
    ...arg,
    role: "kitchen",
  });
  return response.data;
};