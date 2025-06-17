"use client";

// import { Items } from "@/app/types/item";
// import { useState, useEffect } from "react";
// import SearchBar from "../input/search-bar";
// import ItemCard from "./items/item-card";
// import { useSession } from "next-auth/react";
// import Show from "../input/show";
import { TextField } from "../input/text-field";
import { SearchIcon } from "lucide-react";

export default function KitchenItemsView() {
  //   const { data: session } = useSession();
  //   const kitchenId = session?.user?.kitchen_id;
  //   const [items, setItems] = useState<Items[]>([]);
  //   const [filteredItems, setFilteredItems] = useState<Items[]>([]);
  //   useEffect(() => {
  //     if (!kitchenId) return;
  //     const fetchItems = async () => {
  //       const res = await fetch(`/api/kitchens/${kitchenId}/items`);
  //       const data = await res.json();
  //       if (data?.items) {
  //         setItems(data.items);
  //         setFilteredItems(data.items);
  //       }
  //     };
  //     fetchItems();
  //   }, [kitchenId]);
  //   return (
  //     <div className="space-y-4 p-4">
  //       <SearchBar
  //         data={items}
  //         keyword="itemName"
  //         onFilter={setFilteredItems}
  //         placeholder="Search item name..."
  //       />
  //       <Show
  //         when={filteredItems.length > 0}
  //         fallback={<p className="text-gray-500 italic">No items found.</p>}
  //       >
  //         <div className="space-y-4">
  //           {filteredItems.map((item) => (
  //             <ItemCard key={item.item_id} item={item} />
  //           ))}
  //         </div>
  //       </Show>
  //     </div>
  //   );
  return (
    <div className="space-y-4 px-3">
      {/* Search Bar */}
      <TextField
        className="w-full rounded-md bg-neutral-100 text-sm"
        placeholder="Search"
        endAdornment={<SearchIcon className="w-4" />}
      />
      {/* Items 1 */}
      <div className="flex flex-row justify-between border-b border-neutral-400 pb-4">
        <div className="flex flex-col w-full gap-2">
          <p className="font-semibold text-base">Ayam Geprek</p>
          <p className="text-xs font-light">Pedas rawit, bisa request level</p>
        </div>
        <div className="flex flex-col w-full gap-2 items-end">
          <p className="font-semibold text-base">20.000</p>
          <p className="text-xs font-light">Stock: 200</p>
        </div>
      </div>
      {/* Items 2 */}
      <div className="flex flex-row justify-between border-b border-neutral-400 pb-4">
        <div className="flex flex-col w-full gap-2">
          <p className="font-semibold text-base">Ayam Bakar</p>
          <p className="text-xs font-light">Bumbu manis kecap gurih</p>
        </div>
        <div className="flex flex-col w-full gap-2 items-end">
          <p className="font-semibold text-base">30.000</p>
          <p className="text-xs font-light">Stock: 100</p>
        </div>
      </div>
      {/* Items 3 */}
      <div className="flex flex-row justify-between border-b border-neutral-400 pb-4">
        <div className="flex flex-col w-full gap-2">
          <p className="font-semibold text-base">Sayur Asem</p>
          <p className="text-xs font-light">Dengan sambal terasi</p>
          <p className="font-medium text-error-medium text-sm">Not available</p>
        </div>
        <div className="flex flex-col w-full gap-2 items-end">
          <p className="font-semibold text-base">15.000</p>
          <p className="text-xs font-light">Stock: 0</p>
        </div>
      </div>
    </div>
  );
}
