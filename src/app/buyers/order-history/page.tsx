"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Header } from "@/components/input/header";
import Show from "@/components/input/show";
import NoOrderHistory from "@/components/buyers/no-order-history";
import HistoryCard from "@/components/buyers/history-card";
import { OrderData } from "@/app/types/order";

export default function OrderHistoryPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<OrderData[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const buyerId = session?.user?.buyer_id;

      if (!buyerId) return;

      try {
        const res = await fetch(
          `/api/buyers/${buyerId}/orders?status=COMPLETED`,
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

    if (session?.user?.role === "buyer") {
      fetchOrders();
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full max-w-md min-h-screen bg-neutral-100 justify-self-center">
      {/* Header */}
      <Header leftIcon rightIcon="sidebar">
        Order History
      </Header>

      {/* Order History */}
      <main className="px-5 pb-10 flex flex-col items-center">
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
            />
          ))}
        </Show>
      </main>
    </div>
  );
}
