"use client";

// import { Items } from "@/app/types/item";
// import { useState, useEffect } from "react";
// import SearchBar from "../input/search-bar";
// import ItemCard from "./items/item-card";
// import { useSession } from "next-auth/react";
// import Show from "../input/show";
import Image from "next/image";
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
    <div className="space-y-3 px-3">
      {/* Search Bar */}
      <TextField
        className="w-full rounded-md bg-neutral-100 text-sm"
        placeholder="Search"
        endAdornment={<SearchIcon className="w-4" />}
      />
      {/* Items 1 */}
      <div className="flex flex-row items-center gap-4 border-b border-neutral-400 pb-4">
        <div className="w-24 h-24 flex-shrink-0 relative rounded-md overflow-hidden">
          <Image
            src={"/images/foodie-home.svg"}
            alt={"items"}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-between gap-2 w-full">
          <p className="font-semibold text-base">Ayam Geprek</p>
          <p className="text-xs font-light">
            Dengan bumbu bawang bawang yang wangi
          </p>
          <div className="flex flex-row justify-between items-end">
            <span className="font-semibold text-sm">30.000</span>
            <span className="font-semibold text-sm">Stock:&nbsp;100</span>
          </div>
        </div>
      </div>
      {/* Items 2 */}
      <div className="flex flex-row items-center gap-4 border-b border-neutral-400 pb-4">
        <div className="w-24 h-24 flex-shrink-0 relative rounded-md overflow-hidden">
          <Image
            src={"/images/foodie-home.svg"}
            alt={"items"}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 w-full justify-between">
          <p className="font-semibold text-base">Ayam Bakar</p>
          <p className="text-xs font-light">Bumbu manis kecap gurih</p>
          <div className="flex flex-row justify-between items-end">
            <span className="font-semibold text-sm">30.000</span>
            <span className="font-semibold text-sm">Stock:&nbsp;100</span>
          </div>
        </div>
      </div>
      {/* Items 3 */}
      <div className="flex flex-row items-center gap-4 border-b border-neutral-400 pb-4">
        <div className="w-24 h-24 flex-shrink-0 relative rounded-md overflow-hidden">
          <Image
            src={"/images/foodie-home.svg"}
            alt={"items"}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 w-full justify-between">
          <p className="font-semibold text-base">Sayur Asem</p>
          <p className="text-xs font-light">Pedas gurih pakai sambal terasi</p>
          <div className="flex flex-row justify-between items-end">
            <span className="font-semibold text-error-medium text-sm">
              Not Available
            </span>
            <span className="font-semibold text-sm">Stock:&nbsp;60</span>
          </div>
        </div>
      </div>
    </div>
  );
}
