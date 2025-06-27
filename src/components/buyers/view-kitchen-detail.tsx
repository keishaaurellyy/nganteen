"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import SearchBar from "../input/search-bar";
import { Items } from "@/app/types/item";
import { MinusCircle, PlusCircle, ShoppingBasket } from "lucide-react";
import Show from "../input/show";
import { restoreCartFromLocalStorage } from "@/utils/order.utils";

function calculateOrderSummary(
  cartItems: Items[],
  quantities: Record<number, number>
) {
  return cartItems.reduce(
    (acc, item) => {
      const qty = quantities[item.itemId] || 0;
      acc.total += qty * item.itemPrice;
      acc.count += qty;
      return acc;
    },
    { total: 0, count: 0 }
  );
}

export default function ViewKitchenDetail() {
  const router = useRouter();
  const { kitchenId } = useParams() as { kitchenId: string };

  const [items, setItems] = useState<Items[]>([]);
  const [filteredItems, setFilteredItems] = useState<Items[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [cartItems, setCartItems] = useState<Items[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      if (!kitchenId) return;

      try {
        const res = await fetch(`/api/kitchens/${kitchenId}/items`);
        const result = await res.json();

        if (res.ok) {
          setItems(result || []);
          setFilteredItems(result || []);

          const { restoredItems, restoredQuantities } =
            restoreCartFromLocalStorage(result);
          setCartItems(restoredItems);
          setQuantities(restoredQuantities);
        } else {
          console.error("Failed to fetch items:", result.error);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchItems();
  }, [kitchenId]);

  const handleQuantityChange = (item: Items, delta: number) => {
    const currentQty = quantities[item.itemId] || 0;
    const newQty = Math.max(0, Math.min(item.itemStock, currentQty + delta));

    setQuantities((prev) => ({ ...prev, [item.itemId]: newQty }));

    if (newQty > 0) {
      setCartItems((prev) => {
        const exists = prev.find((i) => i.itemId === item.itemId);
        return exists ? prev : [...prev, item];
      });
    } else {
      setCartItems((prev) => prev.filter((i) => i.itemId !== item.itemId));
    }
  };

  const { total, count } = useMemo(
    () => calculateOrderSummary(cartItems, quantities),
    [cartItems, quantities]
  );

  useEffect(() => {
    if (cartItems.length === 0) {
      localStorage.removeItem("cartPreview");
      return;
    }

    const orderPayload = cartItems.map((item) => ({
      item_id: item.itemId,
      item_name: item.itemName,
      item_price: item.itemPrice,
      item_qty: quantities[item.itemId] || 0,
      total_item_price: (quantities[item.itemId] || 0) * item.itemPrice,
    }));

    const payload = {
      kitchen_id: Number(kitchenId),
      items: orderPayload,
    };

    localStorage.setItem("cartPreview", JSON.stringify(payload));
  }, [cartItems, kitchenId, quantities]);

  return (
    <div className="space-y-4 px-1 pb-20 relative">
      <SearchBar data={items} keyword="itemName" onFilter={setFilteredItems} />

      {filteredItems.map((item) => (
        <div
          key={item.itemId}
          className="flex flex-row justify-between border-b border-neutral-400 pb-4"
        >
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-base">{item.itemName}</p>
            <p className="text-xs font-light">{item.itemDescription}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="font-semibold text-base">
              {item.itemPrice.toLocaleString("id-ID")}
            </p>
            <Show
              when={item.itemStock > 0}
              fallback={
                <p className="font-medium text-error-medium text-sm">
                  Not available
                </p>
              }
            >
              <p className="text-xs font-light">Stock: {item.itemStock}</p>
              <div className="flex items-center gap-3 mt-1">
                <MinusCircle
                  size={26}
                  className={`cursor-pointer transition-colors ${
                    (quantities[item.itemId] || 0) > 0
                      ? "text-primary-500 hover:text-primary-600"
                      : "text-neutral-500"
                  }`}
                  onClick={() => handleQuantityChange(item, -1)}
                />
                <span className="text-sm font-bold">
                  {quantities[item.itemId] || 0}
                </span>
                <PlusCircle
                  size={26}
                  className={`cursor-pointer transition-colors ${
                    (quantities[item.itemId] || 0) < item.itemStock
                      ? "text-primary-500 hover:text-primary-600"
                      : "text-neutral-500"
                  }`}
                  onClick={() => handleQuantityChange(item, 1)}
                />
              </div>
            </Show>
          </div>
        </div>
      ))}

      <Show when={cartItems.length > 0}>
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50">
          <button
            onClick={() => router.push("/buyers/preview-order")}
            className="w-full bg-primary-500 hover:bg-primary-600 text-neutral-100 flex items-center justify-between px-5 py-3 rounded-xl shadow-md transition-colors"
          >
            <span className="text-base font-bold">
              {`Rp ${total.toLocaleString("id-ID")} | ${count} Item`}
            </span>
            <ShoppingBasket size={20} />
          </button>
        </div>
      </Show>
    </div>
  );
}
