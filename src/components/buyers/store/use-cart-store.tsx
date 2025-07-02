import { create } from "zustand";
import { Items } from "@/app/types/item";

type CartState = {
  cartItems: Items[];
  quantities: Record<number, number>;
  setCartItems: (items: Items[]) => void;
  setQuantities: (qty: Record<number, number>) => void;
  updateItemQuantity: (item: Items, delta: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  quantities: {},
  setCartItems: (items) => set({ cartItems: items }),
  setQuantities: (qty) => set({ quantities: qty }),
  updateItemQuantity: (item, delta) => {
    const quantities = { ...get().quantities };
    const cartItems = [...get().cartItems];
    const currentQty = quantities[item.itemId] || 0;
    const newQty = Math.max(0, Math.min(item.itemStock, currentQty + delta));
    quantities[item.itemId] = newQty;

    let updatedCart = cartItems;
    if (newQty > 0 && !cartItems.find(i => i.itemId === item.itemId)) {
      updatedCart = [...cartItems, item];
    }
    if (newQty === 0) {
      updatedCart = cartItems.filter(i => i.itemId !== item.itemId);
    }

    set({ quantities, cartItems: updatedCart });
  },
  clearCart: () => set({ cartItems: [], quantities: {} }),
}));
