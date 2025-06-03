import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { db } from "@/db/client";
import { buyers } from "@/drizzle/schema";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { universityEmail, password } = body;

  if (!universityEmail || !password) {
    return NextResponse.json({ error: "Field is required." }, { status: 400 });
  }

  try {
    const [buyer] = await db
      .select()
      .from(buyers)
      .where(eq(buyers.universityEmail, universityEmail));

    if (!buyer) {
      return NextResponse.json({ error: "Email not found." }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, buyer.password);

    if (!passwordMatch) {
      return NextResponse.json({ error: "Wrong password." }, { status: 401 });
    }

    return NextResponse.json({
      message: "Login successful",
      buyerId: buyer.buyerId,
      fullName: `${buyer.firstName} ${buyer.lastName ?? ""}`,
      email: buyer.universityEmail,
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
