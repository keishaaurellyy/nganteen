import { beforeEach, describe, expect, it } from "@jest/globals";
import { formatToRupiah } from "@/utils";
import { useCartStore } from "@/components/buyers/store/use-cart-store";

describe("formatter utils", () => {
  it("formats numbers as Rupiah", () => {
    expect(formatToRupiah(15000)).toMatch(/^Rp\s?15\.000$/);
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
