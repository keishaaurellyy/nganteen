import { OrderStatus } from "@/app/types/order";
import { db } from "@/db/client";
import { orders } from "@/drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const buyerId = parseInt(searchParams.get("buyerId") || "");
  const rawStatus = searchParams.get("status");

  const allowedStatuses = Object.values(OrderStatus);

  if (isNaN(buyerId)) {
    return NextResponse.json(
      { success: false, error: "Invalid buyerId" },
      { status: 400 }
    );
  }

  const status =
    rawStatus && allowedStatuses.includes(rawStatus as OrderStatus)
      ? (rawStatus as OrderStatus)
      : null;

  try {
    const result = await db
      .select()
      .from(orders)
      .where(
        status
          ? and(eq(orders.buyerId, buyerId), eq(orders.status, status))
          : eq(orders.buyerId, buyerId)
      )
      .orderBy(desc(orders.createdDate))
      .limit(1);

    return NextResponse.json({ success: true, data: result[0] });
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
