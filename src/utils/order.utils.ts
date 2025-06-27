import { Items } from "@/app/types/item";

export function restoreCartFromLocalStorage(allItems: Items[]) {
  const raw = localStorage.getItem("cartPreview");
  if (!raw) return { restoredItems: [], restoredQuantities: {} };

  try {
    const parsed = JSON.parse(raw);
    const restoredItems: Items[] = [];
    const restoredQuantities: Record<number, number> = {};

    parsed.items.forEach((savedItem: any) => {
      const match = allItems.find((i) => i.itemId === savedItem.item_id);
      if (match) {
        restoredItems.push(match);
        restoredQuantities[savedItem.item_id] = savedItem.item_qty;
      }
    });

    return { restoredItems, restoredQuantities };
  } catch (err) {
    console.error("Failed to restore cart from localStorage", err);
    return { restoredItems: [], restoredQuantities: {} };
  }
}
