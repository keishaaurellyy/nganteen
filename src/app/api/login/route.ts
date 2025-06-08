import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { db } from "@/db/client";
import { buyers, kitchens } from "@/drizzle/schema";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password, role } = body;

  if (!email || !password || !role) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  try {
    let user;
    if (role === "buyer") {
      const [buyer] = await db
        .select()
        .from(buyers)
        .where(eq(buyers.universityEmail, email));

      if (!buyer) {
        return NextResponse.json(
          { error: "Email not found." },
          { status: 404 }
        );
      }

      const passwordMatch = await bcrypt.compare(password, buyer.password);
      if (!passwordMatch) {
        return NextResponse.json({ error: "Wrong password." }, { status: 401 });
      }

      user = {
        id: buyer.buyerId,
        name: `${buyer.firstName} ${buyer.lastName ?? ""}`,
        email: buyer.universityEmail,
        role: "buyer",
      };
    } else if (role === "kitchen") {
      const [kitchen] = await db
        .select()
        .from(kitchens)
        .where(eq(kitchens.kitchenEmail, email));

      if (!kitchen) {
        return NextResponse.json(
          { error: "Email not found." },
          { status: 404 }
        );
      }

      const passwordMatch = await bcrypt.compare(
        password,
        kitchen.kitchenPassword
      );
      if (!passwordMatch) {
        return NextResponse.json({ error: "Wrong password." }, { status: 401 });
      }

      user = {
        id: kitchen.kitchenId,
        name: kitchen.kitchenName,
        email: kitchen.kitchenEmail,
        role: "kitchen",
      };
    } else {
      return NextResponse.json({ error: "Invalid role." }, { status: 400 });
    }

    return NextResponse.json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
