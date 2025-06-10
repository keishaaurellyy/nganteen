import { Account } from "@/app/types/account";
import axios from "axios";

export const getAllAccounts = async () => {
  const res = await axios.get<Account[]>("/api/accounts");
  return res.data;
};