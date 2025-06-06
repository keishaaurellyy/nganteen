import { EditBuyer } from "@/app/schema/buyer";
import axios from "axios";

export const editBuyer = async (
  url: string,
  { arg }: { arg: EditBuyer & { id: string } }
) => {
  const { id, ...data } = arg;
  const response = await axios.patch(`${url}/${id}`, data);
  return response.data;
};
