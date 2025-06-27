import { RegisterAccountSchema } from "@/app/schema/account";
import { db } from "@/db/client";
import { account } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const buyerId = parseInt(id, 10);

  if (isNaN(buyerId)) {
    return NextResponse.json({ error: "Invalid buyer ID" }, { status: 400 });
  }

  const body = await req.json();
  const parsed = RegisterAccountSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }

  const accountData = {
    id: buyerId,
    bankName: parsed.data.bank_name,
    accountNumber: parsed.data.account_number,
    accountName: parsed.data.account_name,
  };

  await db.insert(account).values(accountData);

  return NextResponse.json({ message: "Account created" }, { status: 201 });
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const buyerId = parseInt(id, 10);

  if (isNaN(buyerId)) {
    return NextResponse.json({ error: "Invalid buyer ID" }, { status: 400 });
  }

  const existingAccount = await db
    .select()
    .from(account)
    .where(eq(account.id, buyerId));

  return NextResponse.json(existingAccount[0] ?? null);
}
