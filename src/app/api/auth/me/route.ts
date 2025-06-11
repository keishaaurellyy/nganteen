import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { db } from "@/db/client";
import { buyers } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user?.id || user.role !== "buyer") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const buyer = await db
    .select()
    .from(buyers)
    .where(eq(buyers.buyerId, parseInt(user.id)))
    .limit(1);

  if (!buyer.length) {
    return new Response(JSON.stringify({ error: "Buyer not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(buyer[0]), { status: 200 });
}
