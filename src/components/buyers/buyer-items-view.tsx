"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SearchBar from "../input/search-bar";
import { Items } from "@/app/types/item";
import { MinusCircle, PlusCircle, ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";

export default function KitchenItemsView() {
  const { data: session } = useSession();
  const kitchenId = session?.user?.kitchen_id;
  const router = useRouter();

  const [items, setItems] = useState<Items[]>([]);
  const [filteredItems, setFilteredItems] = useState<Items[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
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
        } else {
          console.error("Failed to fetch items:", result.error);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchItems();
  }, [kitchenId]);

  useEffect(() => {
  const cartDataToSave = cartItems.map((item) => ({
    id: item.itemId,
    name: item.itemName,
    price: item.itemPrice,
    quantity: quantities[item.itemId] || 0,
  }));

  localStorage.setItem("cartItems", JSON.stringify(cartDataToSave));
}, [cartItems, quantities]);



  const handleQuantityChange = (item: Items, delta: number) => {
    const currentQty = quantities[item.itemId] || 0;
    const newQty = Math.max(0, currentQty + delta);

    setQuantities((prev) => ({ ...prev, [item.itemId]: newQty }));

    if (newQty > 0) {
      if (!cartItems.find((i) => i.itemId === item.itemId)) {
        setCartItems((prev) => [...prev, item]);
      }
    } else {
      setCartItems((prev) => prev.filter((i) => i.itemId !== item.itemId));
    }
  };

  const totalItem = Object.values(quantities).reduce(
    (acc, qty) => acc + qty,
    0
  );

  const totalHarga = cartItems.reduce((acc, item) => {
    const qty = quantities[item.itemId] || 0;
    return acc + item.itemPrice * qty;
  }, 0);

  return (
    <div className="space-y-4 px-1 pb-20 relative">
      {/* Search Bar */}
      <SearchBar data={items} keyword="itemName" onFilter={setFilteredItems} />

      {/* Items List */}
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
            {item.itemStock === 0 ? (
              <p className="font-medium text-error-medium text-sm">
                Not available
              </p>
            ) : (
              <>
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
                    className="text-primary-500 hover:text-primary-600 cursor-pointer transition-colors"
                    onClick={() => handleQuantityChange(item, 1)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      {/* Floating Basket Button */}
      {cartItems.length > 0 && (
        <button
          onClick={() => router.push("/buyers/preview-order")}
          className="fixed bottom-4 left-4 right-4 z-50 bg-primary-500 hover:bg-primary-600 text-neutral-100 flex items-center justify-between px-5 py-3 rounded-xl shadow-md transition-colors"
        >
          <span className="text-base font-bold">
            {`Rp ${totalHarga.toLocaleString("id-ID")} | ${totalItem} Item`}
          </span>
          <ShoppingBasket size={20} />
        </button>
      )}
    </div>
  );
}
