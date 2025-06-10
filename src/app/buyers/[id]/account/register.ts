import { RegisterAccount } from "@/app/schema/account";
import axios from "axios";

export const Account = async (
  buyerId: number,
  data: RegisterAccount
) => {
  const url = `/api/buyers/${buyerId}/account`;
  const response = await axios.post(url, data);
  return response.data;
};