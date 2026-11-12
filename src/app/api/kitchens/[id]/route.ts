export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db, kitchenPublicColumns } from "@/db/client";
import { kitchens as kitchensTable } from "@/drizzle/schema";
import { EditKitchenSchema } from "@/app/schema/kitchen";
import { eq } from "drizzle-orm";
import { requireUser } from "@/lib/auth";

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
      .select(kitchenPublicColumns)
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
    console.error("Error fetching kitchen:", error);
    return NextResponse.json(
      { error: "Failed to fetch kitchen" },
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
  const auth = await requireUser({ admin: true, kitchenId });
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await req.json();
    const validated = EditKitchenSchema.parse(body);

    const updated = await db
      .update(kitchensTable)
      .set({
        kitchenEmail: validated.kitchen_email,
        kitchenPassword: validated.kitchen_password
          ? await bcrypt.hash(validated.kitchen_password, 10)
          : undefined,
        kitchenName: validated.kitchen_name,
        kitchenDescription: validated.kitchen_description,
        adminName: validated.admin_name,
        adminPhone: validated.admin_phone,
        location: validated.location,
        status: validated.status,
        isBusy: validated.is_busy,
      })
      .where(eq(kitchensTable.kitchenId, kitchenId))
      .returning(kitchenPublicColumns);

    return NextResponse.json({ updated }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating kitchen:", error);
    return NextResponse.json(
      {
        error: "Failed to update kitchen",
        details: error?.errors,
      },
      { status: 400 }
    );
  }
}
