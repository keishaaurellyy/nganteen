import { RegisterAccount } from "@/app/schema/account";
import axios from "axios";

type RegisterAccountPayload = RegisterAccount & { buyer_id: string };

export const registerAccount = async (data: RegisterAccountPayload) => {
  const url = `/api/buyers/${data.buyer_id}/account`;
  const response = await axios.post(url, data);
  return response.data;
};
