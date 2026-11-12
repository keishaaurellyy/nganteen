import { db } from "@/db/client";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { items } from "@/drizzle/schema";
import { requireUser } from "@/lib/auth";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const itemId = Number((await context.params).id);
  if (isNaN(itemId)) {
    return NextResponse.json({ error: "Invalid itemId" }, { status: 400 });
  }

  const item = await db.query.items.findFirst({
    where: eq(items.itemId, itemId),
  });

  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(item);
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const itemId = Number((await context.params).id);
  if (isNaN(itemId)) {
    return NextResponse.json({ error: "Invalid itemId" }, { status: 400 });
  }

  const existing = await db.query.items.findFirst({
    where: eq(items.itemId, itemId),
    columns: { kitchenId: true },
  });
  if (!existing) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }
  const auth = await requireUser({ admin: true, kitchenId: existing.kitchenId });
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();
  const { itemName, itemDescription, itemPrice, itemStock } = body;

  try {
    await db
      .update(items)
      .set({
        itemName,
        itemDescription,
        itemPrice,
        itemStock,
      })
      .where(eq(items.itemId, itemId));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}
