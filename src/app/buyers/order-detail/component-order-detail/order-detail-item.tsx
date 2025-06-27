"use client";

import { OrderItems } from "@/app/types/order-item";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetailItem() {
  const [items, setItems] = useState<OrderItems[]>([]);
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!orderId) return;

    const fetchOrderItems = async () => {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) return;
      const resData = await res.json();
      setItems(resData.data.items);
    };

    fetchOrderItems();
  }, [orderId]);

  return (
    <div className="w-full pb-4 max-w-md justify-self-center space-y-4">
      <div className="rounded-lg p-3 border border-neutral-400">
        <h3 className="font-bold text-sm mb-1">Item Details</h3>

        {items?.map((item, index) => (
          <div key={index} className="flex justify-between items-center py-1">
            <span className="flex-1 text-sm">{item.itemName}</span>
            <span className="w-8 text-center text-sm">x{item.itemQty}</span>
            <span className="w-20 text-right text-sm">
              Rp {item.totalItemPrice.toLocaleString("id-ID")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
