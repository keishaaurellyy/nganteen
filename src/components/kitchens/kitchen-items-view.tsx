"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SearchBar from "../input/search-bar";
import { Items } from "@/app/types/item";
import { PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";

export default function KitchenItemsView() {
  const { data: session } = useSession();
  const kitchenId = session?.user?.kitchen_id;
  const router = useRouter();

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
    <div className="space-y-4 px-3">
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
            {item.itemStock === 0 && (
              <p className="font-medium text-error-medium text-sm">
                Not available
              </p>
            )}
          </div>
          <div className="flex flex-row items-center gap-4">
            <div className="flex flex-col w-full gap-2 items-end">
              <p className="font-semibold text-base">
                {item.itemPrice.toLocaleString("id-ID")}
              </p>
              <p className="text-xs font-light w-full">
                Stock: {item.itemStock}
              </p>
            </div>
            <div>
              <PencilLine
                className="text-neutral-800 w-4"
                onClick={() =>
                  router.push(`/kitchens/menu/${item.itemId}/edit`)
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
