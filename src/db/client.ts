import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/drizzle/schema";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });
