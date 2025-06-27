import { OrderStatus } from "@/app/types/order";
import { db } from "@/db/client";
import { orders } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const buyerId = parseInt(searchParams.get("buyerId") || "");
  const rawStatus = searchParams.get("status");

  const allowedStatuses = Object.values(OrderStatus);
  if (
    isNaN(buyerId) ||
    !rawStatus ||
    !allowedStatuses.includes(rawStatus as OrderStatus)
  ) {
    return NextResponse.json(
      { success: false, error: "Invalid query params" },
      { status: 400 }
    );
  }

  const status = rawStatus as OrderStatus;

  try {
    const result = await db
      .select()
      .from(orders)
      .where(and(eq(orders.buyerId, buyerId), eq(orders.status, status)));

    return NextResponse.json({ success: true, data: result });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Database error",
        details: err?.message ?? err,
      },
      { status: 500 }
    );
  }
}
