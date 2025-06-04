import { EditKitchen } from "@/app/schema/kitchen";
import axios from "axios";

export const editKitchen = async (
  url: string,
  { arg }: { arg: EditKitchen & { id: string } }
) => {
  const { id, ...data } = arg;
  const response = await axios.patch(`${url}/${id}`, data);
  return response.data;
};
