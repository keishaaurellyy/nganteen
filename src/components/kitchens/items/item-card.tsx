"use client";

import Image from "next/image";
import { Items } from "@/app/types/item";
import Show from "@/components/input/show";

export default function ItemCard({ item }: { item: Items }) {
  const isAvailable = item.item_stock > 0;

  return (
    <div className="flex items-start gap-4 border-b pb-4">
      <div className="w-24 h-24 flex-shrink-0 relative rounded-md overflow-hidden">
        <Image
          src={item.item_url || "/fallback.png"}
          alt={item.item_name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-between">
        <p>{item.item_name}</p>
        <p className="text-sm text-neutral-300">{item.item_description}</p>
        <div className="flex flex-row justify-between">
          <Show
            when={isAvailable}
            fallback={
              <span className="text-error-medium font-semibold mt-1">
                Not Available
              </span>
            }
          >
            <span>{item.item_price}</span>
          </Show>
          <span>{item.item_stock}</span>
        </div>
      </div>
    </div>
  );
}
