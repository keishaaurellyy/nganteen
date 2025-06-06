import { RegisterBuyer } from "@/app/schema/buyer";
import axios from "axios";

export const registerBuyer = async (
  url: string,
  { arg }: { arg: RegisterBuyer }
) => {
  const response = await axios.post(url, arg);
  return response.data;
};
