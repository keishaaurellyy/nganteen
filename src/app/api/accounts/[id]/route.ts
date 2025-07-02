import { EditAccountSchema } from "@/app/schema/account";
import { db } from "@/db/client";
import { account } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const accountId = parseInt(id, 10);

  if (isNaN(accountId)) {
    return NextResponse.json({ error: "Invalid account ID" }, { status: 400 });
  }

  const body = await req.json();
  const parsed = EditAccountSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }

  await db
    .update(account)
    .set({
      bankName: parsed.data.bank_name,
      accountNumber: parsed.data.account_number,
      accountName: parsed.data.account_name,
      createdDate: new Date().toISOString(),
    })
    .where(eq(account.accountId, accountId));

  return NextResponse.json({ message: "Account updated" }, { status: 200 });
}

export async function GET(
  _req: NextRequest,
  context: { params: { id: string } }
) {
  const accountId = parseInt(context.params.id, 10);

  if (isNaN(accountId)) {
    return NextResponse.json(
      { success: false, error: "Invalid ID" },
      { status: 400 }
    );
  }

  try {
    const result = await db
      .select()
      .from(account)
      .where(eq(account.accountId, accountId));

    if (!result.length) {
      return NextResponse.json({ success: true, data: null }, { status: 200 });
    }

    return NextResponse.json(
      { success: true, data: result[0] },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /api/accounts/[id] error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
