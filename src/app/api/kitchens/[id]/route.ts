import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { kitchens } from "@/drizzle/schema";
import { eq, and, ne, or } from "drizzle-orm";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import { EditKitchenSchema } from "@/app/schema/kitchen";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const kitchenId = parseInt(params.id, 10);

  if (isNaN(kitchenId)) {
    return NextResponse.json({ error: "Invalid kitchen ID" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const parsed = EditKitchenSchema.parse(body);

    const conflict = await db
      .select()
      .from(kitchens)
      .where(
        and(
          ne(kitchens.kitchenId, kitchenId),
          or(
            eq(kitchens.kitchenEmail, parsed.kitchen_email ?? ""),
            eq(kitchens.adminPhone, parsed.admin_phone ?? ""),
            eq(kitchens.location, parsed.location ?? "")
          )
        )
      );

    if (conflict.length > 0) {
      return NextResponse.json(
        { error: "Email, phone, or location already used by another kitchen." },
        { status: 409 }
      );
    }

    const hashedPassword = parsed.kitchen_password
      ? await bcrypt.hash(parsed.kitchen_password, 10)
      : undefined;

    const updated = await db
      .update(kitchens)
      .set({
        kitchenEmail: parsed.kitchen_email,
        kitchenPassword: hashedPassword ?? undefined,
        kitchenName: parsed.kitchen_name,
        adminName: parsed.admin_name,
        adminPhone: parsed.admin_phone,
        location: parsed.location,
        status: parsed.status,
      })
      .where(eq(kitchens.kitchenId, kitchenId))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json(
        { error: "Kitchen not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Kitchen updated successfully.",
      kitchen: {
        id: updated[0].kitchenId,
        email: updated[0].kitchenEmail,
        name: updated[0].kitchenName,
      },
    });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: err.flatten().fieldErrors },
        { status: 400 }
      );
    }

    console.error("Update kitchen error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
