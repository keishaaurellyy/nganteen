import { EditAccountSchema } from "@/app/schema/account";
import { db } from "@/db/client";
import { account } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const accountId = parseInt(id, 10);

  if (isNaN(accountId)) {
    return NextResponse.json({ error: "Invalid account ID" }, { status: 400 });
  }

  const [existing] = await db
    .select({ buyerId: account.buyerId })
    .from(account)
    .where(eq(account.accountId, accountId));
  if (!existing) {
    return NextResponse.json({ error: "Account not found" }, { status: 404 });
  }
  const auth = await requireUser({ buyerId: existing.buyerId });
  if (auth instanceof NextResponse) return auth;

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
    })
    .where(eq(account.accountId, accountId));

  return NextResponse.json({ message: "Account updated" }, { status: 200 });
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const accountId = parseInt(id, 10);

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

    const auth = await requireUser({ admin: true, buyerId: result[0].buyerId });
    if (auth instanceof NextResponse) return auth;

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
