import {
  pgTable,
  foreignKey,
  integer,
  text,
  timestamp,
  unique,
  check,
  primaryKey,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const kitchenStatus = pgEnum("kitchen_status", ["ACTIVE", "INACTIVE"]);
export const orderStatus = pgEnum("order_status", [
  "INCOMING",
  "COOKING",
  "READY",
  "COMPLETED",
  "CANCELLED",
]);
export const universityName = pgEnum("university_name", [
  "BINUS_ALAM_SUTERA",
  "BINUS_KEMANGGISAN",
]);

export const items = pgTable(
  "items",
  {
    itemId: integer("item_id")
      .primaryKey()
      .generatedAlwaysAsIdentity({
        name: "items_item_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 2147483647,
        cache: 1,
      }),
    kitchenId: integer("kitchen_id").notNull(),
    itemName: text("item_name").notNull(),
    itemDescription: text("item_description"),
    itemPrice: integer("item_price").notNull(),
    itemStock: integer("item_stock").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.kitchenId],
      foreignColumns: [kitchens.kitchenId],
      name: "kitchen_id_fk",
    }),
  ]
);

export const account = pgTable(
  "account",
  {
    accountId: integer("account_id")
      .primaryKey()
      .generatedAlwaysAsIdentity({
        name: "account_account_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 2147483647,
        cache: 1,
      }),
    id: integer().notNull(),
    bankName: text("bank_name").notNull(),
    accountNumber: text("account_number").notNull(),
    accountName: text("account_name").notNull(),
    createdDate: timestamp("created_date", { mode: "string" }),
  },
  (table) => [
    foreignKey({
      columns: [table.id],
      foreignColumns: [buyers.buyerId],
      name: "buyer_id_fk",
    }),
  ]
);

export const orders = pgTable(
  "orders",
  {
    orderId: integer("order_id")
      .primaryKey()
      .generatedAlwaysAsIdentity({
        name: "orders_order_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 2147483647,
        cache: 1,
      }),
    buyerId: integer("buyer_id"),
    kitchenId: integer("kitchen_id"),
    notes: text(),
    totalPayment: integer("total_payment").notNull(),
    status: orderStatus().notNull(),
    createdDate: timestamp("created_date", { mode: "string" }).notNull(),
    orderCode: text("order_code").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.buyerId],
      foreignColumns: [buyers.buyerId],
      name: "buyer_id_fk",
    }),
    foreignKey({
      columns: [table.kitchenId],
      foreignColumns: [kitchens.kitchenId],
      name: "kitchen_id_fk",
    }),
    unique("orders_order_code_key").on(table.orderCode),
  ]
);

export const kitchens = pgTable(
  "kitchens",
  {
    kitchenId: integer("kitchen_id")
      .primaryKey()
      .generatedAlwaysAsIdentity({
        name: "kitchens_kitchen_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 2147483647,
        cache: 1,
      }),
    kitchenEmail: text("kitchen_email").notNull(),
    kitchenPassword: text("kitchen_password").notNull(),
    kitchenName: text("kitchen_name").notNull(),
    adminName: text("admin_name").notNull(),
    adminPhone: text("admin_phone").notNull(),
    location: text().notNull(),
    status: kitchenStatus().notNull(),
    kitchenDescription: text("kitchen_description"),
  },
  (table) => [
    unique("kitchens_admin_phone_key").on(table.adminPhone),
    unique("kitchens_location_key").on(table.location),
    check("format_phone_number", sql`admin_phone ~ '^08[0-9]{8,12}$'::text`),
    check(
      "password_length",
      sql`(char_length(kitchen_password) >= 5) AND (char_length(kitchen_password) <= 15)`
    ),
    check("location_alphanumeric", sql`location ~ '^[a-zA-Z0-9 ]+$'::text`),
  ]
);

export const buyers = pgTable(
  "buyers",
  {
    buyerId: integer("buyer_id")
      .primaryKey()
      .generatedAlwaysAsIdentity({
        name: "buyers_buyer_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 2147483647,
        cache: 1,
      }),
    firstName: text("first_name"),
    lastName: text("last_name"),
    phoneNumber: text("phone_number"),
    studentIdNumber: text("student_id_number"),
    universityName: universityName("university_name").notNull(),
    universityEmail: text("university_email").notNull(),
    password: text().notNull(),
  },
  (table) => [
    unique("buyers_phone_number_key").on(table.phoneNumber),
    unique("buyers_student_id_number_key").on(table.studentIdNumber),
    unique("buyers_university_email_key").on(table.universityEmail),
    check("format_phone_number", sql`phone_number ~ '^08[0-9]{8,12}$'::text`),
  ]
);

export const orderItems = pgTable(
  "order_items",
  {
    orderId: integer("order_id").notNull(),
    itemId: integer("item_id").notNull(),
    itemName: text("item_name").notNull(),
    itemPrice: integer("item_price").notNull(),
    itemQty: integer("item_qty").notNull(),
    totalItemPrice: integer("total_item_price").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.orderId],
      name: "order_id_fk",
    }),
    primaryKey({
      columns: [table.orderId, table.itemId],
      name: "order_items_pk",
    }),
  ]
);
