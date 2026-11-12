import { beforeEach, describe, expect, it } from "@jest/globals";
import {
  capitalizeFirstLetter,
  createUrlWithQueryParams,
  formatToRupiah,
  isOTPComplete,
  isValidPhoneNumber,
  isValidStudentId,
} from "@/utils";
import { useCartStore } from "@/components/buyers/store/use-cart-store";

describe("formatter utils", () => {
  it("formats numbers as Rupiah", () => {
    expect(formatToRupiah(15000)).toMatch(/^Rp\s?15\.000$/);
  });

  it("builds query strings, skipping null and undefined", () => {
    expect(
      createUrlWithQueryParams("/orders", { status: ["A", "B"], page: 2, q: null, x: undefined })
    ).toBe("/orders?status=A&status=B&page=2");
    expect(createUrlWithQueryParams("/orders", {})).toBe("/orders");
  });

  it("capitalizes the first letter", () => {
    expect(capitalizeFirstLetter("nganteen")).toBe("Nganteen");
    expect(capitalizeFirstLetter("")).toBe("");
  });
});

describe("validation utils", () => {
  it("validates Indonesian phone numbers", () => {
    expect(isValidPhoneNumber("0812 3456 7890")).toBe(true);
    expect(isValidPhoneNumber("+6281234567890")).toBe(true);
    expect(isValidPhoneNumber("0712345678")).toBe(false);
  });

  it("validates 10-digit student IDs", () => {
    expect(isValidStudentId("2501234567")).toBe(true);
    expect(isValidStudentId("25012345")).toBe(false);
  });

  it("checks OTP completeness", () => {
    expect(isOTPComplete(["1", "2", "3", "4"], 4)).toBe(true);
    expect(isOTPComplete(["1", "2", " ", "4"], 4)).toBe(false);
    expect(isOTPComplete(["1", "2"], 4)).toBe(false);
  });
});

describe("cart store", () => {
  const item = {
    itemId: 1,
    kitchenId: 1,
    itemName: "Nasi Goreng",
    itemDescription: null,
    itemPrice: 15000,
    itemStock: 2,
  };
  const cart = () => useCartStore.getState();

  beforeEach(() => cart().clearCart());

  it("adds an item once and tracks its quantity", () => {
    cart().updateItemQuantity(item, 1);
    cart().updateItemQuantity(item, 1);
    expect(cart().cartItems).toEqual([item]);
    expect(cart().quantities[1]).toBe(2);
  });

  it("caps quantity at the item stock", () => {
    cart().updateItemQuantity(item, 5);
    expect(cart().quantities[1]).toBe(2);
  });

  it("removes the item when quantity drops to zero", () => {
    cart().updateItemQuantity(item, 1);
    cart().updateItemQuantity(item, -3);
    expect(cart().cartItems).toEqual([]);
    expect(cart().quantities[1]).toBe(0);
  });
});
