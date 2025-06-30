import { Account } from "@/app/types/account";
import axios from "axios";

export const getAllAccounts = async () => {
  const res = await axios.get<Account[]>("/api/accounts");
  return res.data;
};

export const getAccountById = async (id: string) => {
  const res = await axios.get<Account>(`/api/accounts/${id}`);
  return res.data;
};

export async function getAccountByBuyerId(buyerId: string) {
  const res = await fetch(`/api/accounts?buyerId=${buyerId}`);
  const result = await res.json();
  return result.data;
}
