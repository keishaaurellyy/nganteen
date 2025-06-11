import { EditKitchen } from "@/app/schema/kitchen";
import axios from "axios";

export const editKitchen = async ({
  arg,
}: {
  arg: EditKitchen & { id: string };
}) => {
  const { id, ...data } = arg;

  const response = await axios.patch(`/api/kitchens/${id}`, data);
  return response.data;
};
