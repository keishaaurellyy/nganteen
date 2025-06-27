export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { kitchens as kitchensTable } from "@/drizzle/schema";
import { EditKitchenSchema } from "@/app/schema/kitchen";
import { eq } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const kitchenId = parseInt(id, 10);

  if (isNaN(kitchenId)) {
    return NextResponse.json({ error: "Invalid kitchen ID" }, { status: 400 });
  }

  try {
    const kitchen = await db
      .select()
      .from(kitchensTable)
      .where(eq(kitchensTable.kitchenId, kitchenId));

    if (!kitchen || kitchen.length === 0) {
      return NextResponse.json({ error: "Kitchen not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, data: kitchen[0] },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch kitchen", details: error?.message ?? error },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const kitchenId = parseInt(id, 10);

  if (isNaN(kitchenId)) {
    return NextResponse.json({ error: "Invalid kitchen ID" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const validated = EditKitchenSchema.parse(body);

    const updated = await db
      .update(kitchensTable)
      .set({
        kitchenEmail: validated.kitchen_email,
        kitchenPassword: validated.kitchen_password,
        kitchenName: validated.kitchen_name,
        kitchenDescription: validated.kitchen_description,
        adminName: validated.admin_name,
        adminPhone: validated.admin_phone,
        location: validated.location,
        status: validated.status,
      })
      .where(eq(kitchensTable.kitchenId, kitchenId))
      .returning();

    return NextResponse.json({ updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to update kitchen",
        details: error?.errors ?? error?.message,
      },
      { status: 400 }
    );
  }
}
