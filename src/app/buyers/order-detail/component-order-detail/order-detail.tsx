"use client";

import RecommendCard from "@/components/buyers/recommend";
import { Header } from "@/components/input/header";
import OrderDetailKitchen from "@/app/buyers/order-detail/component-order-detail/order-detail-kitchen";
import { Button } from "@/components/input/button";
import { useRouter, useSearchParams } from "next/navigation";
import { OrderStatus } from "@/app/types/order";
import OrderDetailStatusCard from "./order-detail-status-card";
import OrderDetailItem from "./order-detail-item";
import OrderDetailNoteAndPayment from "./order-detail-note";

export default function OrderDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const handleSubmit = async () => {
    if (!orderId) return;

    const res = await fetch(`/api/orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: OrderStatus.COMPLETED }),
    });

    const result = await res.json();

    if (res.ok) {
      router.push("/buyers");
    } else {
      console.error("Failed to complete order:", result.error);
      alert("Failed to complete order.");
    }
  };

  return (
    <div className="w-full max-w-md min-h-screen bg-neutral-100 justify-self-center space-y-4">
      {/* Header */}
      <Header leftIcon={false}>Order Detail</Header>

      {/* Order Detail */}
      <main className="px-5 pb-10 flex flex-col items-center">
        <OrderDetailKitchen orderId={orderId} />
        <OrderDetailStatusCard />
        <OrderDetailItem orderId={orderId} />
        <OrderDetailNoteAndPayment orderId={orderId} />

        <Button
          type="button"
          size="medium"
          color="tertiary"
          className="w-full mb-4"
          onClick={handleSubmit}
        >
          Complete Order
        </Button>

        <RecommendCard />
      </main>
    </div>
  );
}
