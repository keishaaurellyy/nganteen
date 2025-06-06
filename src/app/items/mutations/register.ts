import { RegisterItem } from "@/app/schema/item";
import { toFormDataWithArray } from "@/utils";
import axios from "axios";

export const registerItem = async (
  url: string,
  { arg }: { arg: RegisterItem }
) => {
  const payload = toFormDataWithArray(arg);
  const response = await axios.post(url, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
