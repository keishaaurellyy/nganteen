import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { orders, orderItems } from "@/drizzle/schema";
import { eq, and, inArray } from "drizzle-orm";

const validStatuses = [
  "INCOMING",
  "COOKING",
  "READY",
  "COMPLETED",
  "CANCELLED",
] as const;
type OrderStatus = (typeof validStatuses)[number];

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const kitchenId = Number(params.id);
  const { searchParams } = new URL(req.url);
  const rawStatus = searchParams.get("status")?.toUpperCase() ?? null;

  if (isNaN(kitchenId)) {
    return NextResponse.json(
      { success: false, error: "Invalid kitchen ID" },
      { status: 400 }
    );
  }

  try {
    let foundOrders;

    if (rawStatus && validStatuses.includes(rawStatus as OrderStatus)) {
      foundOrders = await db
        .select()
        .from(orders)
        .where(
          and(
            eq(orders.kitchenId, kitchenId),
            eq(orders.status, rawStatus as OrderStatus)
          )
        );
    } else {
      foundOrders = await db
        .select()
        .from(orders)
        .where(eq(orders.kitchenId, kitchenId));
    }

    if (foundOrders.length === 0) {
      return NextResponse.json({ success: true, data: [] });
    }

    const orderIds = foundOrders.map((o) => o.orderId);

    const items = await db
      .select()
      .from(orderItems)
      .where(inArray(orderItems.orderId, orderIds));

    const grouped = foundOrders.map((order) => {
      const itemsOfOrder = items.filter((i) => i.orderId === order.orderId);
      return {
        orderId: order.orderId,
        orderCode: order.orderCode,
        createdDate: order.createdDate,
        totalPayment: order.totalPayment,
        status: order.status,
        kitchenId: order.kitchenId,
        notes: order.notes,
        items: itemsOfOrder.map((item) => ({
          itemId: item.itemId,
          itemName: item.itemName,
          itemQty: item.itemQty,
          itemPrice: item.itemPrice,
          totalPrice: item.totalItemPrice,
        })),
      };
    });

    return NextResponse.json({ success: true, data: grouped });
  } catch (error: any) {
    console.error("Failed to fetch kitchen orders:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
