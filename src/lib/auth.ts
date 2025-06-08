import { getServerSession } from "next-auth";
import { authOptions } from "./auth-option";

export async function auth() {
  return await getServerSession(authOptions);
}
