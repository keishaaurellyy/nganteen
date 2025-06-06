import axios from "axios";
import { LoginBuyer } from "@/app/schema/buyer";

export const loginBuyer = async (url: string, { arg }: { arg: LoginBuyer }) => {
  const response = await axios.post(url, arg);
  return response.data;
};
