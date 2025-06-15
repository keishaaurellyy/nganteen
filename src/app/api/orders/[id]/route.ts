import { db } from "@/db/client";
import { orders } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { orderId: string } }
) {
  const orderId = parseInt(params.orderId);
  if (isNaN(orderId)) {
    return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
  }

  try {
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.orderId, orderId));

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: order }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch order",
        details: error?.message ?? error,
      },
      { status: 500 }
    );
  }
}
