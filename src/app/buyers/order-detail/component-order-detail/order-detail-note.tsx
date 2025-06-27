"use client";

import { OrderData } from "@/app/types/order";
import Show from "@/components/input/show";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetailNoteAndPayment() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) return;
      const resData = await res.json();
      setOrder(resData.data.order);
    };

    fetchOrder();
  }, [orderId]);

  return (
    <div className="w-full pb-4 max-w-md justify-self-center space-y-4">
      {/* Order Notes */}
      <div className="rounded-lg p-3 border border-neutral-400">
        <h3 className="font-bold text-sm mb-1">Order Notes</h3>
        <Show when={!!order?.notes} fallback="---">
          <p className="text-xs text-neutral-800">{order?.notes}</p>
        </Show>
      </div>

      {/* Payment Details */}
      <div className="rounded-lg p-3 border border-neutral-400">
        <h3 className="font-bold text-sm mb-1">Payment Details</h3>
        <div className="flex justify-between text-base font-bold text-green-600 mt-2">
          <span>TOTAL</span>
          <span className="text-tertiary-600">
            Rp {order?.totalPayment.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </div>
  );
}
