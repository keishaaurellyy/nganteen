import { EditAccountSchema } from "@/app/schema/account";
import { db } from "@/db/client";
import { account } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context;
  const accountId = parseInt(params.id);

  if (isNaN(accountId)) {
    return NextResponse.json({ error: "Invalid account ID" }, { status: 400 });
  }

  const body = await req.json();

  const parsed = EditAccountSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
  }

  try {
    await db
      .update(account)
      .set({
        bankName: parsed.data.bank_name,
        accountNumber: parsed.data.account_number,
        accountName: parsed.data.account_name,
      })
      .where(eq(account.accountId, accountId));

    return NextResponse.json({ message: "Account updated" }, { status: 200 });
  } catch (error: any) {
    console.error("Update failed:", error);
    return NextResponse.json(
      { error: "Failed to update account" },
      { status: 500 }
    );
  }
}
