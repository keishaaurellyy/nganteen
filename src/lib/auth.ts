import { getServerSession, type Session } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "./auth-option";

type Allow = {
  admin?: boolean;
  buyerId?: number | null;
  kitchenId?: number | null | (number | null)[];
};

// Returns the signed-in user if they match `allow`, otherwise the 401/403 response to send back.
export async function requireUser(
  allow: Allow
): Promise<Session["user"] | NextResponse> {
  const user = (await getServerSession(authOptions))?.user;
  if (!user?.role) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allowed =
    (allow.admin && user.role === "admin") ||
    (user.role === "buyer" &&
      allow.buyerId != null &&
      Number(user.buyer_id) === allow.buyerId) ||
    (user.role === "kitchen" &&
      user.kitchen_id != null &&
      [allow.kitchenId].flat().includes(Number(user.kitchen_id)));

  return allowed
    ? user
    : NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
