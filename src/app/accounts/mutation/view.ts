import { Account } from "@/app/types/account";
import axios from "axios";

export const getAllAccounts = async () => {
  const res = await axios.get<Account[]>("/api/accounts");
  return res.data;
};

export async function getAccountById(id: string) {
  const res = await fetch(`/api/accounts/${id}`);
  const json = await res.json();
  if (!json.success || !json.data) throw new Error("Failed to fetch account");
  return json.data;
}

export async function getAccountByBuyerId(buyerId: number) {
  const res = await fetch(`/api/buyers/${buyerId}/account`);
  const json = await res.json();
  if (!json.success || !json.data) throw new Error("Failed to fetch account");
  return json.data;
}
