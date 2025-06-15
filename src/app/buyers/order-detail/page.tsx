"use client";

import RecommendCard from "@/components/buyers/recommend";
import { Header } from "@/components/input/header";
import OrderDetailKitchen from "@/app/buyers/order-detail/component-order-detail/order-detail-kitchen";
import OrderStatus from "./component-order-detail/mapper";
import OrderDetailItem from "./component-order-detail/order-detail-item";
import OrderDetailNote from "./component-order-detail/order-detail-note";
import { Button } from "@/components/input/button";
import { useRouter } from "next/navigation";

export default function OrderDetailPage() {
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/buyers");
  };

  return (
    <div className="w-full max-w-md min-h-screen bg-neutral-100 justify-self-center space-y-4">
      {/* Header */}
      <Header leftIcon rightIcon="sidebar">Order Detail</Header>

      {/* Order Detail */}
      <main className="px-5 pb-10 flex flex-col items-center">
        <OrderDetailKitchen />
        <OrderStatus />
        <OrderDetailItem />
        <OrderDetailNote />

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
