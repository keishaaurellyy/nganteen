import { CreateOrderSchema } from "@/app/schema/order-item";
import { db } from "@/db/client";
import { orderItems, orders, orderStatus } from "@/drizzle/schema";
import { eq, and, inArray, desc, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { items as itemsTable } from "@/drizzle/schema";

type OrderStatus = (typeof orderStatus.enumValues)[number];

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const buyerId = parseInt(context.params.id, 10);
    if (isNaN(buyerId)) {
      return NextResponse.json(
        { success: false, error: "Invalid buyer ID" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const parsed = CreateOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.format() },
        { status: 400 }
      );
    }

    const { kitchen_id, items, notes, total_payment } = parsed.data;

    for (const item of items) {
      const dbItem = await db.query.items.findFirst({
        where: eq(itemsTable.itemId, item.item_id),
      });

      if (!dbItem || item.item_qty > dbItem.itemStock) {
        return NextResponse.json(
          {
            success: false,
            error: `Item "${item.item_name}" exceeds available stock`,
          },
          { status: 400 }
        );
      }
    }

    const randomCode = Math.floor(Math.random() * 900000)
      .toString()
      .padStart(6, "0");

    const wibDate = new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString();

    const [order] = await db
      .insert(orders)
      .values({
        buyerId,
        kitchenId: kitchen_id,
        notes: notes ?? null,
        totalPayment: total_payment,
        status: "INCOMING",
        createdDate: wibDate,
        orderCode: `TRX${randomCode}`,
      })
      .returning({ orderId: orders.orderId });

    const orderItemValues = items.map((item) => ({
      orderId: order.orderId,
      itemId: item.item_id,
      itemName: item.item_name,
      itemPrice: item.item_price,
      itemQty: item.item_qty,
      totalItemPrice: item.total_item_price,
    }));

    await db.insert(orderItems).values(orderItemValues);

    for (const item of items) {
      await db
        .update(itemsTable)
        .set({
          itemStock: sql`${itemsTable.itemStock} - ${item.item_qty}`,
        })
        .where(eq(itemsTable.itemId, item.item_id));
    }

    return NextResponse.json({
      success: true,
      data: { orderId: order.orderId },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;

  try {
    const buyerId = parseInt(params.id);
    if (isNaN(buyerId)) {
      return NextResponse.json({ error: "Invalid buyer_id" }, { status: 400 });
    }

    const lastOnly = req.nextUrl.searchParams.get("last") === "true";

    const rawStatuses = req.nextUrl.searchParams
      .getAll("status")
      .map((s) => s.toUpperCase());
    const statuses: OrderStatus[] =
      rawStatuses.length > 0
        ? (rawStatuses.filter((s) =>
            orderStatus.enumValues.includes(s as OrderStatus)
          ) as OrderStatus[])
        : ["COMPLETED"];

    if (statuses.length === 0) {
      return NextResponse.json(
        { error: "Invalid status values" },
        { status: 400 }
      );
    }

    const query = db
      .select()
      .from(orders)
      .where(and(eq(orders.buyerId, buyerId), inArray(orders.status, statuses)))
      .orderBy(desc(orders.createdDate));

    const foundOrders = lastOnly ? await query.limit(1) : await query;

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
  } catch (err: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}
