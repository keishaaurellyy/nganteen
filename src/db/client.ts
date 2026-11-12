import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/drizzle/schema";
import { getTableColumns } from "drizzle-orm";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });

// Columns that are safe to send to clients: everything except the password.
const { kitchenPassword: _kitchenPassword, ...kitchenPublicColumns } =
  getTableColumns(schema.kitchens);
const { password: _buyerPassword, ...buyerPublicColumns } =
  getTableColumns(schema.buyers);
export { kitchenPublicColumns, buyerPublicColumns };
