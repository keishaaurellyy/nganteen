import { cookies } from "next/headers";

export const ACCESS_TOKEN = "access_token";
export const DEFAULT_EXPIRED_COOKIE = 365 * 24 * 60 * 60;

export async function getAccessTokenFromCookie() {
    const access_token = (await cookies()).get(ACCESS_TOKEN)?.value as string;
    if (!access_token) return null;
  
    return access_token;
}