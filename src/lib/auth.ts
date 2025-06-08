import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth-option";

export async function auth() {
  return await getServerSession(authOptions);
}
