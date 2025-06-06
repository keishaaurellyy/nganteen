import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { kitchens } from "@/drizzle/schema";
import bcrypt from "bcrypt";
import { eq, or } from "drizzle-orm";
import { RegisterKitchenSchema } from "@/app/schema/kitchen";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RegisterKitchenSchema.parse(body);

    const existing = await db
      .select()
      .from(kitchens)
      .where(
        or(
          eq(kitchens.adminPhone, parsed.admin_phone),
          eq(kitchens.location, parsed.location)
        )
      );

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Phone number & location already registered." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(parsed.kitchen_password, 10);

    const inserted = await db
      .insert(kitchens)
      .values({
        kitchenEmail: parsed.kitchen_email,
        kitchenPassword: hashedPassword,
        kitchenName: parsed.kitchen_name,
        adminName: parsed.admin_name,
        adminPhone: parsed.admin_phone,
        location: parsed.location,
        status: parsed.status,
      })
      .returning();

    return NextResponse.json(
      {
        message: "Register successful.",
        kitchen: {
          id: inserted[0].kitchenId,
          name: inserted[0].kitchenName,
          email: inserted[0].kitchenEmail,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
