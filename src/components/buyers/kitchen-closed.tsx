"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SearchBar from "../input/search-bar";
import { Items } from "@/app/types/item";
import Show from "../input/show";

export default function KitchenClosed() {
  const { kitchenId } = useParams() as { kitchenId: string };

  const [items, setItems] = useState<Items[]>([]);
  const [filteredItems, setFilteredItems] = useState<Items[]>([]);

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
            </Show>
          </div>
        </div>
      ))}
    </div>
  );
}
