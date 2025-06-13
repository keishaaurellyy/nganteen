import { db } from "@/db/client";
import { orderItems, orders, orderStatus } from "@/drizzle/schema";
import { eq, and, inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type OrderStatus = (typeof orderStatus.enumValues)[number];

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const buyerId = parseInt(params.id);
    const rawStatus =
      req.nextUrl.searchParams.get("status")?.toUpperCase() || "COMPLETED";

    if (isNaN(buyerId)) {
      return NextResponse.json({ error: "Invalid buyer_id" }, { status: 400 });
    }

    const validStatuses = orderStatus.enumValues;
    if (!validStatuses.includes(rawStatus as OrderStatus)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const status = rawStatus as OrderStatus;

    const foundOrders = await db
      .select()
      .from(orders)
      .where(and(eq(orders.buyerId, buyerId), eq(orders.status, status)))
      .orderBy(orders.createdDate);

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
          name: item.itemName,
          quantity: item.itemQty,
          price: item.itemPrice,
          totalPrice: item.totalItemPrice,
          imageUrl: item.itemUrl,
        })),
      };
    });

    return NextResponse.json({ success: true, data: grouped });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}