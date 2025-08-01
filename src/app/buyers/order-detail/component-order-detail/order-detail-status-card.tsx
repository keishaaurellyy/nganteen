"use client";

import { OrderData } from "@/app/types/order";
import Show from "@/components/input/show";
import { SoupIcon } from "lucide-react";
import { useEffect, useState } from "react";

const StatusCardBusy = () => (
  <div className="w-full max-w-md justify-self-center space-y-4">
    <div className="bg-secondary-100 border-secondary-400 rounded-lg p-3 flex items-center gap-3 border">
      <SoupIcon className="bg-secondary-500 rounded-xl p-3 w-10 h-10 text-neutral-100" />
      <div>
        <p className="text-neutral-800 text-xs font-normal">
          Your food takes a bit longer to prepare
        </p>
        <p className="font-bold text-sm text-neutral-800">
          Please pick up in 10&ndash;15 minutes 🏃
        </p>
      </div>
    </div>
  </div>
);

export default function OrderDetailStatusCard({
  orderId,
}: {
  orderId: string | null;
}) {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [isBusy, setIsBusy] = useState<boolean | null>(null);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) return;
      const resData = await res.json();
      setOrder(resData.data.order);
      console.log("Order data:", resData.data.order);
    };

    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    if (!order?.kitchenId) return;

    const fetchKitchen = async () => {
      const res = await fetch(`/api/kitchens/${order.kitchenId}`);
      if (!res.ok) return;
      const data = await res.json();
      setIsBusy(data.data.isBusy);
      console.log("Kitchen busy status:", data.data.isBusy);
    };

    fetchKitchen();
  }, [order?.kitchenId]);

  return (
    <div className="w-full max-w-md justify-self-center space-y-4">
      <Show when={!isBusy} fallback={StatusCardBusy()}>
        <div className="w-full max-w-md justify-self-center space-y-4">
          <div className="bg-primary-100 border-primary-500 rounded-lg p-3 flex items-center gap-3 border">
            <SoupIcon className="bg-primary-500 rounded-xl p-3 w-10 h-10 text-neutral-100" />
            <div>
              <p className="text-neutral-800 text-xs font-normal">
                Your food is being processed
              </p>
              <p className="font-bold text-sm text-neutral-800">
                Please pick up in 5&ndash;10 minutes 🏃
              </p>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}
