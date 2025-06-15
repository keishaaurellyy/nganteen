import { UpdateStatusSchema } from "@/app/schema/kitchen";
import { db } from "@/db/client";
import { kitchens } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const kitchenId = Number(params.id);

  if (isNaN(kitchenId)) {
    return NextResponse.json({ error: "Invalid kitchen ID" }, { status: 400 });
  }

  const body = await req.json();

  const parse = UpdateStatusSchema.safeParse(body);

  if (!parse.success) {
    return NextResponse.json({ error: parse.error.format() }, { status: 400 });
  }

  try {
    const result = await db
      .update(kitchens)
      .set({ status: parse.data.status })
      .where(eq(kitchens.kitchenId, kitchenId))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({ error: "Kitchen not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, data: result[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating kitchen status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
