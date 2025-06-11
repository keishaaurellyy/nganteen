import { db } from "@/db/client";
import "dotenv/config";
async function test() {
  try {
    const result = await db.query.buyers.findMany();
    console.log("Connected! Buyers:", result);
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
}

test();
