
import { db } from "@/db/client";
import { account } from "@/drizzle/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const accounts = await db.select().from(account);
  return NextResponse.json(accounts);
}
