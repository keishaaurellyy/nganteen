import { db } from "@/db/client";
import { orders } from "@/drizzle/schema";
import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";

export async function GET() {
  const auth = await requireUser({ admin: true });
  if (auth instanceof NextResponse) return auth;
  try {
    const allOrders = await db.select().from(orders);

    return NextResponse.json({
      success: true,
      data: allOrders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
