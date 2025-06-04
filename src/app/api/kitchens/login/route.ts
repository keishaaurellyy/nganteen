import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/client";
import { kitchens } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { kitchenEmail, password } = body;

  if (!kitchenEmail || !password) {
    return NextResponse.json({ error: "Field is required." }, { status: 400 });
  }

  try {
    const [kitchen] = await db
      .select()
      .from(kitchens)
      .where(eq(kitchens.kitchenEmail, kitchenEmail));

    if (!kitchen) {
      return NextResponse.json({ error: "Email not found." }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      kitchen.kitchenPassword
    );

    if (!passwordMatch) {
      return NextResponse.json({ error: "Wrong password." }, { status: 401 });
    }

    return NextResponse.json({
      message: "Login successful",
      kitchenId: kitchen.kitchenId,
      kitchenName: kitchen.kitchenName,
      email: kitchen.kitchenEmail,
      status: kitchen.status,
    });
  } catch (err) {
    console.error("Kitchen login error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
