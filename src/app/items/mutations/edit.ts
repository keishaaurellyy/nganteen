import { EditItem } from "@/app/schema/item";
import axios, { toFormData } from "axios";

export const editItem = async (
  url: string,
  { arg }: { arg: EditItem & { id: string } }
) => {
  const { id, ...data } = arg;
  const payload = toFormData(data);
  const response = await axios.patch(`${url}/${id}`, payload, {
    headers:
      payload instanceof FormData
        ? { "Content-Type": "multipart/form-data" }
        : undefined,
  });
  return response.data;
};
