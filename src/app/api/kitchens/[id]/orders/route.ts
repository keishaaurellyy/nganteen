import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { orders, orderItems, orderStatus } from "@/drizzle/schema";
import { eq, and, inArray, desc } from "drizzle-orm";
import { requireUser } from "@/lib/auth";

type OrderStatus = (typeof orderStatus.enumValues)[number];

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;
  const kitchenId = Number(id);
  const { searchParams } = new URL(req.url);
  const rawStatus = searchParams.get("status");

  if (isNaN(kitchenId)) {
    return NextResponse.json(
      { success: false, error: "Invalid kitchen ID" },
      { status: 400 }
    );
  }
  const auth = await requireUser({ admin: true, kitchenId });
  if (auth instanceof NextResponse) return auth;

  try {
    let foundOrders;
    const statusFilters = rawStatus
      ?.split(",")
      .map((s) => s.trim().toUpperCase())
      .filter((s): s is OrderStatus =>
        orderStatus.enumValues.includes(s as OrderStatus)
      );

    if (statusFilters && statusFilters.length > 0) {
      foundOrders = await db
        .select()
        .from(orders)
        .where(
          and(
            eq(orders.kitchenId, kitchenId),
            inArray(orders.status, statusFilters)
          )
        )
        .orderBy(desc(orders.createdDate));
    } else {
      foundOrders = await db
        .select()
        .from(orders)
        .where(eq(orders.kitchenId, kitchenId))
        .orderBy(desc(orders.createdDate));
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
        buyerId: order.buyerId,
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
  } catch (error) {
    console.error("Failed to fetch kitchen orders:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
