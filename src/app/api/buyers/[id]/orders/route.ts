import { CreateOrderSchema } from "@/app/schema/order-item";
import { db } from "@/db/client";
import { kitchens, orderItems, orders, orderStatus } from "@/drizzle/schema";
import { eq, and, gte, inArray, desc, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { items as itemsTable } from "@/drizzle/schema";
import { OrderStatus } from "@/app/types/order";
import { requireUser } from "@/lib/auth";

// Thrown inside the order transaction to roll it back with a 400 for the buyer.
class OrderRejected extends Error {}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const buyerId = parseInt((await context.params).id, 10);
    if (isNaN(buyerId)) {
      return NextResponse.json(
        { success: false, error: "Invalid buyer ID" },
        { status: 400 }
      );
    }
    const auth = await requireUser({ buyerId });
    if (auth instanceof NextResponse) return auth;

    const body = await req.json();
    const parsed = CreateOrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.format() },
        { status: 400 }
      );
    }

    const { kitchen_id, items, notes } = parsed.data;

    if (new Set(items.map((item) => item.item_id)).size !== items.length) {
      return NextResponse.json(
        { success: false, error: "Each item may appear only once" },
        { status: 400 }
      );
    }

    const kitchen = await db.query.kitchens.findFirst({
      where: eq(kitchens.kitchenId, kitchen_id),
      columns: { status: true },
    });

    if (!kitchen || kitchen.status !== "ACTIVE") {
      return NextResponse.json(
        { success: false, error: "Kitchen is not available" },
        { status: 400 }
      );
    }

    const randomCode = Math.floor(Math.random() * 900000)
      .toString()
      .padStart(6, "0");

    const wibDate = new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString();

    // Prices come from the database, never from the request. Each stock update only
    // succeeds while enough stock is left, so two buyers cannot both take the last one.
    const order = await db.transaction(async (tx) => {
      const orderItemValues = [];
      for (const item of items) {
        const [dbItem] = await tx
          .update(itemsTable)
          .set({ itemStock: sql`${itemsTable.itemStock} - ${item.item_qty}` })
          .where(
            and(
              eq(itemsTable.itemId, item.item_id),
              eq(itemsTable.kitchenId, kitchen_id),
              gte(itemsTable.itemStock, item.item_qty)
            )
          )
          .returning({
            itemName: itemsTable.itemName,
            itemPrice: itemsTable.itemPrice,
          });

        if (!dbItem) {
          throw new OrderRejected(
            `Item "${item.item_name}" exceeds available stock`
          );
        }

        orderItemValues.push({
          itemId: item.item_id,
          itemName: dbItem.itemName,
          itemPrice: dbItem.itemPrice,
          itemQty: item.item_qty,
          totalItemPrice: dbItem.itemPrice * item.item_qty,
        });
      }

      const [created] = await tx
        .insert(orders)
        .values({
          buyerId,
          kitchenId: kitchen_id,
          notes: notes ?? null,
          totalPayment: orderItemValues.reduce(
            (sum, item) => sum + item.totalItemPrice,
            0
          ),
          status: "INCOMING",
          createdDate: wibDate,
          orderCode: `TRX${randomCode}`,
        })
        .returning({ orderId: orders.orderId });

      await tx
        .insert(orderItems)
        .values(
          orderItemValues.map((item) => ({ ...item, orderId: created.orderId }))
        );

      return created;
    });

    return NextResponse.json({
      success: true,
      data: { orderId: order.orderId },
    });
  } catch (error) {
    if (error instanceof OrderRejected) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
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
    const auth = await requireUser({ admin: true, buyerId });
    if (auth instanceof NextResponse) return auth;

    const lastOnly = req.nextUrl.searchParams.get("last") === "true";

    const rawStatuses = req.nextUrl.searchParams
      .getAll("status")
      .map((s) => s.toUpperCase());
    const statuses: OrderStatus[] =
      rawStatuses.length > 0
        ? (rawStatuses.filter((s) =>
            orderStatus.enumValues.includes(s as OrderStatus)
          ) as OrderStatus[])
        : ["COMPLETED" as OrderStatus];

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
