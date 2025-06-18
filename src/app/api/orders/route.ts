import { db } from "@/db/client";
import { orders } from "@/drizzle/schema";
import { NextResponse } from "next/server";

export async function GET() {
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
