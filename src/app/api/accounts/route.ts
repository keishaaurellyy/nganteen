import { db } from "@/db/client";
import { account } from "@/drizzle/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";

export async function GET() {
  const auth = await requireUser({ admin: true });
  if (auth instanceof NextResponse) return auth;
  const accounts = await db
    .select()
    .from(account)
    .orderBy(desc(account.createdDate));
  return NextResponse.json(accounts);
}
