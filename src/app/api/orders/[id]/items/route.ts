import { OrderItemListSchema } from "@/app/types/order-item";
import { db } from "@/db/client";
import { orderItems } from "@/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const orderId = parseInt(params.orderId);
  if (isNaN(orderId)) {
    return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
  }

  try {
    const body = await req.json();

    const validated = OrderItemListSchema.parse(body);

    const values = validated.map((item) => ({
      orderId,
      itemId: item.item_id,
      itemName: item.item_name,
      itemPrice: item.item_price,
      itemQty: item.item_qty,
      itemUrl: item.item_url ?? null,
      totalItemPrice: item.item_price * item.item_qty,
    }));

    const inserted = await db.insert(orderItems).values(values).returning();

    return NextResponse.json(inserted, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to pass order items",
        details: error?.message ?? error,
      },
      { status: 400 }
    );
  }
}
