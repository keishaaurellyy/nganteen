"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Header } from "@/components/input/header";
import Show from "@/components/input/show";
import NoOrderHistory from "@/components/input/no-order-history";
import HistoryCard from "@/components/input/history-card";
import { OrderData } from "@/app/types/order";
import Spinner from "@/components/input/spinner";

export default function OrderHistoryPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<OrderData[]>([]);
  console.log(orders);

  useEffect(() => {
    const fetchOrders = async () => {
      const kitchenId = session?.user?.kitchen_id;

      if (!kitchenId) return;

      try {
        const res = await fetch(
          `/api/kitchens/${kitchenId}/orders?status=COMPLETED`,
          {
            cache: "no-store",
          }
        );
        const result = await res.json();

        if (result.success && result.data) {
          setOrders(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    if (session?.user?.role === "kitchen") {
      fetchOrders();
    }
  }, [session]);

  if (status === "loading") {
    return <Spinner size="extraLarge" />;
  }

  return (
    <div className="w-full max-w-md min-h-screen bg-neutral-100 justify-self-center">
      {/* Header */}
      <Header leftIcon rightIcon="none">
        Order History
      </Header>

      {/* Order History */}
      <main className="pt-4 px-5 pb-10 flex flex-col gap-6 items-center">
        <Show
          when={orders.length > 0}
          fallback={
            <div className="flex flex-1 justify-items-center w-full min-h-[calc(100vh-27vh)]">
              <NoOrderHistory />
            </div>
          }
        >
          {orders.map((order, index) => (
            <HistoryCard
              key={index}
              orderCode={order.orderCode}
              createdDate={order.createdDate}
              items={order.items}
              totalPayment={order.totalPayment}
            />
          ))}
        </Show>
      </main>
    </div>
  );
}
