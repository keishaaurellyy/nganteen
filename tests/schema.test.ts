import { describe, expect, it } from "@jest/globals";
import { RegisterBuyerSchema } from "@/app/schema/buyer";
import { EditKitchenSchema, UpdateStatusSchema } from "@/app/schema/kitchen";
import { CreateOrderSchema } from "@/app/schema/order-item";
import { RegisterItemSchema } from "@/app/schema/item";

const buyer = {
  university_name: "BINUS_ALAM_SUTERA",
  university_email: "budi@binus.ac.id",
  password: "rahasia1",
  confirm_password: "rahasia1",
  first_name: "Budi",
  phone_number: "081234567890",
};

const orderItem = {
  item_id: 1,
  item_name: "Nasi Goreng",
  item_price: 15000,
  item_qty: 2,
  total_item_price: 30000,
};

describe("RegisterBuyerSchema", () => {
  it("accepts a valid buyer", () => {
    expect(RegisterBuyerSchema.safeParse(buyer).success).toBe(true);
  });

  it("rejects mismatched passwords on confirm_password", () => {
    const result = RegisterBuyerSchema.safeParse({
      ...buyer,
      confirm_password: "berbeda1",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].path).toEqual(["confirm_password"]);
  });

  it.each([
    ["password without number or symbol", { password: "rahasia", confirm_password: "rahasia" }],
    ["password shorter than 5", { password: "ab1", confirm_password: "ab1" }],
    ["phone number not starting with 08", { phone_number: "621234567890" }],
    ["invalid email", { university_email: "budi" }],
    ["unknown university", { university_name: "UI" }],
  ])("rejects %s", (_, override) => {
    expect(RegisterBuyerSchema.safeParse({ ...buyer, ...override }).success).toBe(false);
  });
});

describe("kitchen schemas", () => {
  it("EditKitchenSchema requires at least one field", () => {
    expect(EditKitchenSchema.safeParse({}).success).toBe(false);
    expect(EditKitchenSchema.safeParse({ is_busy: true }).success).toBe(true);
  });

  it("UpdateStatusSchema only accepts known statuses", () => {
    expect(UpdateStatusSchema.safeParse({ status: "ACTIVE" }).success).toBe(true);
    expect(UpdateStatusSchema.safeParse({ status: "CLOSED" }).success).toBe(false);
  });
});

describe("order and item schemas", () => {
  it("CreateOrderSchema accepts a valid order", () => {
    const order = { kitchen_id: 1, items: [orderItem], total_payment: 30000 };
    expect(CreateOrderSchema.safeParse(order).success).toBe(true);
  });

  it.each([
    ["an empty item list", { items: [] }],
    ["a zero quantity", { items: [{ ...orderItem, item_qty: 0 }] }],
    ["a zero total payment", { total_payment: 0 }],
  ])("CreateOrderSchema rejects %s", (_, override) => {
    const order = { kitchen_id: 1, items: [orderItem], total_payment: 30000 };
    expect(CreateOrderSchema.safeParse({ ...order, ...override }).success).toBe(false);
  });

  it("RegisterItemSchema rejects negative price and stock", () => {
    const item = { item_name: "Es Teh", item_price: 5000, item_stock: 10 };
    expect(RegisterItemSchema.safeParse(item).success).toBe(true);
    expect(RegisterItemSchema.safeParse({ ...item, item_price: -1 }).success).toBe(false);
    expect(RegisterItemSchema.safeParse({ ...item, item_stock: -1 }).success).toBe(false);
  });
});
