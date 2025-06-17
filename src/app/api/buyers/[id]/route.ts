import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { db } from "@/db/client";
import { buyers } from "@/drizzle/schema";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const buyerId = parseInt(id);

  if (isNaN(buyerId) || buyerId <= 0) {
    return NextResponse.json({ error: "Invalid buyer ID." }, { status: 400 });
  }

  try {
    const result = await db
      .select()
      .from(buyers)
      .where(eq(buyers.buyerId, buyerId))
      .limit(1);

    if (!result || result.length === 0) {
      return NextResponse.json(
        { success: false, error: "Buyer not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (err) {
    console.error(`GET buyer error for ID ${buyerId}:`, err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch buyer." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const body = await request.json();

  const buyerId = parseInt(id);
  if (isNaN(buyerId)) {
    return NextResponse.json({ error: "ID invalid." }, { status: 400 });
  }

  const updateData: any = { ...body };

  try {
    if (body.password) {
      updateData.password = await bcrypt.hash(body.password, 10);
    }
    const result = await db
      .update(buyers)
      .set(updateData)
      .where(eq(buyers.buyerId, buyerId))
      .returning();
    if (result.length === 0) {
      return NextResponse.json({ error: "Buyer not found." }, { status: 404 });
    }

    return NextResponse.json({
      message: "Update buyer successful",
      data: result[0],
    });
  } catch (err) {
    console.error("PATCH buyer error:", err);
    return NextResponse.json({ error: "Update buyer error." }, { status: 500 });
  }
}
