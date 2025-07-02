"use client";

import { OrderData } from "@/app/types/order";
import {
  SkeletonOrderNote,
  SkeletonOrderPayment,
} from "@/components/buyers/skeleton";
import { useEffect, useState } from "react";

export default function OrderDetailNoteAndPayment({
  orderId,
}: {
  orderId: string | null;
}) {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (!res.ok) return;

        const resData = await res.json();
        setOrder(resData.data.order);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const renderNote = () => {
    if (isLoading) return <SkeletonOrderNote />;

    return (
      <div className="rounded-lg p-3 border border-neutral-400">
        <h3 className="font-bold text-sm mb-1">Order Notes</h3>
        <p className="text-xs text-neutral-800">
          {order?.notes?.trim() ? order.notes : "-"}
        </p>
      </div>
    );
  };

  return (
    <div className="w-full max-w-md justify-self-center space-y-4">
      {/* Order Notes */}
      {renderNote()}

      {/* Payment Details */}
      {isLoading || !order?.totalPayment ? (
        <SkeletonOrderPayment />
      ) : (
        <div className="rounded-lg p-3 border border-neutral-400">
          <h3 className="font-bold text-sm mb-1">Payment Details</h3>
          <div className="flex justify-between text-base font-bold text-green-600 mt-2">
            <span>TOTAL</span>
            <span className="text-tertiary-600">
              Rp {order.totalPayment.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
