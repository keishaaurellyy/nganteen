import { NextResponse } from "next/server";
import { db } from "@/db/client";
import { kitchens } from "@/drizzle/schema";
import { asc, eq, or } from "drizzle-orm";
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

    if (parsed.kitchen_email === "nganteen.binus@gmail.com") {
      return NextResponse.json(
        { error: "This email is reserved." },
        { status: 403 }
      );
    }

    const inserted = await db
      .insert(kitchens)
      .values({
        kitchenEmail: parsed.kitchen_email,
        kitchenPassword: parsed.kitchen_password,
        kitchenName: parsed.kitchen_name,
        kitchenDescription: parsed.kitchen_description,
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

export async function GET() {
  try {
    const allKitchens = await db
      .select()
      .from(kitchens)
      .orderBy(asc(kitchens.kitchenName));

    return NextResponse.json({
      success: true,
      data: allKitchens,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch kitchens" },
      { status: 500 }
    );
  }
}
