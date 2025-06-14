import { Kitchen } from "@/app/types/kitchen";
import axios from "axios";

export const exploreKitchens = async (url: string) => {
  const response = await axios.get<{
    success: boolean;
    data: Kitchen[];
  }>(url);
  return response.data;
};

export const exploreKitchensById = async (
  url: string,
  { arg }: { arg: { id: string } }
): Promise<Kitchen> => {
  const response = await axios.get(`${url}/${arg.id}`);
  return response.data;
};