import { db } from "@/db/client";
import { orders } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const UpdateOrderStatusSchema = z.object({
  status: z.enum(["INCOMING", "COOKING", "READY", "COMPLETED", "CANCELLED"]),
});

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
    const updated = await db
      .update(orders)
      .set({ status: parsed.data.status })
      .where(eq(orders.orderId, orderId))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
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
