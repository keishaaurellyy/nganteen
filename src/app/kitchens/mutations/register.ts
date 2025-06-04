import { RegisterKitchen } from "@/app/schema/kitchen";
import axios from "axios";

export const registerKitchen = async (
  url: string,
  { arg }: { arg: RegisterKitchen }
) => {
  const response = await axios.post(url, arg);
  return response.data;
};
