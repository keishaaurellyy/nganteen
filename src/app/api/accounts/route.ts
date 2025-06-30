import { db } from "@/db/client";
import { account } from "@/drizzle/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const accounts = await db
    .select()
    .from(account)
    .orderBy(desc(account.createdDate));
  return NextResponse.json(accounts);
}
