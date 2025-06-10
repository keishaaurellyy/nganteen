import { RegisterAccountSchema } from "@/app/schema/account";
import { db } from "@/db/client";
import { account } from "@/drizzle/schema";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { buyerId: string } }
) {
  const body = await req.json();
  const buyerId = parseInt(params.buyerId);

  const parsed = RegisterAccountSchema.safeParse({ ...body, buyer_id: buyerId });
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
  }

const accountData = {
  buyerId: buyerId,
  createdDate: dayjs().toISOString(),
  bankName: parsed.data.bank_name,
  accountNumber: parsed.data.account_number,
  accountName: parsed.data.account_name,
};


  await db.insert(account).values(accountData);
  return NextResponse.json({ message: "Account created" }, { status: 201 });
}

export async function GET(
  _req: Request,
  { params }: { params: { buyerId: string } }
) {
  const buyerId = parseInt(params.buyerId);

  const accounts = await db
    .select()
    .from(account)
    .where(eq(account.buyerId, buyerId));

  return NextResponse.json(accounts);
}
