-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."kitchen_status" AS ENUM('ACTIVE', 'INACTIVE');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('INCOMING', 'COOKING', 'READY', 'COMPLETED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."university_name" AS ENUM('BINUS_ALAM_SUTERA', 'BINUS_KEMANGGISAN');--> statement-breakpoint
CREATE TABLE "items" (
	"item_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "items_item_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"kitchen_id" integer NOT NULL,
	"item_name" text NOT NULL,
	"item_description" text,
	"item_price" integer NOT NULL,
	"item_stock" integer NOT NULL,
	"item_url" text
);
--> statement-breakpoint
CREATE TABLE "buyers" (
	"buyer_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "buyers_buyer_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"first_name" text NOT NULL,
	"last_name" text,
	"phone_number" text NOT NULL,
	"student_id_number" text,
	"university_name" "university_name" NOT NULL,
	"university_email" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "buyers_phone_number_key" UNIQUE("phone_number"),
	CONSTRAINT "buyers_student_id_number_key" UNIQUE("student_id_number"),
	CONSTRAINT "buyers_university_email_key" UNIQUE("university_email"),
	CONSTRAINT "format_phone_number" CHECK (phone_number ~ '^08[0-9]{8,12}$'::text),
	CONSTRAINT "password_length" CHECK ((char_length(password) >= 5) AND (char_length(password) <= 15))
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"order_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "orders_order_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"buyer_id" integer,
	"kitchen_id" integer,
	"notes" text,
	"total_payment" integer NOT NULL,
	"status" "order_status" NOT NULL,
	"created_date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "kitchens" (
	"kitchen_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "kitchens_kitchen_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"kitchen_email" text NOT NULL,
	"kitchen_password" text NOT NULL,
	"kitchen_name" text NOT NULL,
	"admin_name" text NOT NULL,
	"admin_phone" text NOT NULL,
	"location" text NOT NULL,
	"status" "kitchen_status" NOT NULL,
	CONSTRAINT "kitchens_admin_phone_key" UNIQUE("admin_phone"),
	CONSTRAINT "kitchens_location_key" UNIQUE("location"),
	CONSTRAINT "format_phone_number" CHECK (admin_phone ~ '^08[0-9]{8,12}$'::text),
	CONSTRAINT "password_length" CHECK ((char_length(kitchen_password) >= 5) AND (char_length(kitchen_password) <= 15)),
	CONSTRAINT "location_alphanumeric" CHECK (location ~ '^[a-zA-Z0-9 ]+$'::text)
);
--> statement-breakpoint
CREATE TABLE "account" (
	"account_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "account_account_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"buyer_id" integer NOT NULL,
	"bank_name" text NOT NULL,
	"account_number" text NOT NULL,
	"account_name" text NOT NULL,
	"created_date" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "balance" (
	"kitchen_id" integer NOT NULL,
	"period_month" date NOT NULL,
	"total_income" integer NOT NULL,
	"total_refund" integer,
	"is_fee_paid" boolean NOT NULL,
	"fee_payment_date" date NOT NULL,
	CONSTRAINT "balance_pk" PRIMARY KEY("kitchen_id","period_month")
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"order_id" integer NOT NULL,
	"item_id" integer NOT NULL,
	"item_name" text NOT NULL,
	"item_price" integer NOT NULL,
	"item_qty" integer NOT NULL,
	"item_url" text,
	"total_item_price" integer NOT NULL,
	CONSTRAINT "order_items_pk" PRIMARY KEY("order_id","item_id")
);
--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "kitchen_id_fk" FOREIGN KEY ("kitchen_id") REFERENCES "public"."kitchens"("kitchen_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "buyer_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."buyers"("buyer_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "kitchen_id_fk" FOREIGN KEY ("kitchen_id") REFERENCES "public"."kitchens"("kitchen_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "buyer_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."buyers"("buyer_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "balance" ADD CONSTRAINT "kitchen_id_fk" FOREIGN KEY ("kitchen_id") REFERENCES "public"."kitchens"("kitchen_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("order_id") ON DELETE no action ON UPDATE no action;
*/