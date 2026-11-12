import { db } from "@/db/client";
import { items, orderItems, orders } from "@/drizzle/schema";
import { requireUser } from "@/lib/auth";
import { and, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const UpdateOrderStatusSchema = z.object({
  status: z.enum(["INCOMING", "COOKING", "READY", "COMPLETED", "CANCELLED"]),
});

// Status changes each side may make, as "FROM>TO". Admins may make the kitchen's.
const ALLOWED = {
  kitchen: [
    "INCOMING>COOKING",
    "INCOMING>CANCELLED",
    "COOKING>READY",
    "COOKING>CANCELLED",
    "READY>CANCELLED",
  ],
  buyer: ["COOKING>COMPLETED", "READY>COMPLETED"],
};

export async function PATCH(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;
  const orderId = Number(id);

  if (isNaN(orderId)) {
    return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
  }

  const json = await req.json();
  const parsed = UpdateOrderStatusSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }

  try {
    const [order] = await db
      .select({
        status: orders.status,
        buyerId: orders.buyerId,
        kitchenId: orders.kitchenId,
      })
      .from(orders)
      .where(eq(orders.orderId, orderId));

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const auth = await requireUser({
      admin: true,
      buyerId: order.buyerId,
      kitchenId: order.kitchenId,
    });
    if (auth instanceof NextResponse) return auth;

    const next = parsed.data.status;
    const side = auth.role === "buyer" ? "buyer" : "kitchen";
    if (!ALLOWED[side].includes(`${order.status}>${next}`)) {
      return NextResponse.json(
        { error: `Cannot change order from ${order.status} to ${next}` },
        { status: 409 }
      );
    }

    const updated = await db.transaction(async (tx) => {
      // Only update if nobody changed the status meanwhile, so stock is returned once.
      const rows = await tx
        .update(orders)
        .set({ status: next })
        .where(and(eq(orders.orderId, orderId), eq(orders.status, order.status)))
        .returning();

      if (rows.length > 0 && next === "CANCELLED") {
        const lines = await tx
          .select({ itemId: orderItems.itemId, qty: orderItems.itemQty })
          .from(orderItems)
          .where(eq(orderItems.orderId, orderId));

        for (const line of lines) {
          await tx
            .update(items)
            .set({ itemStock: sql`${items.itemStock} + ${line.qty}` })
            .where(eq(items.itemId, line.itemId));
        }
      }

      return rows;
    });

    if (updated.length === 0) {
      return NextResponse.json(
        { error: "Order status changed meanwhile, please reload" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: true, data: updated[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating order status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
