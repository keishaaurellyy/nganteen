import { db } from "@/db/client";
import { orderItems, orders } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const orderId = parseInt(params.id);
  if (isNaN(orderId)) {
    return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
  }
  const items = await db
    .select()
    .from(orderItems)
    .where(eq(orderItems.orderId, orderId));

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

    return NextResponse.json(
      { success: true, data: { order, items } },
      { status: 200 }
    );
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
