import { EditAccount } from "@/app/schema/account";
import axios from "axios";

type UpdateAccountPayload = EditAccount;

export const editAccount = async (
  accountId: string,
  data: UpdateAccountPayload
) => {
  const url = `/api/accounts/${accountId}`;
  const response = await axios.patch(url, data);
  return response.data;
};
