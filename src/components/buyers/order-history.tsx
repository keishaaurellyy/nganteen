"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Header } from "@/components/input/header";
import Show from "@/components/input/show";
import NoOrderHistory from "@/components/input/no-order-history";
import HistoryCard from "@/components/input/history-card";
import { OrderData } from "@/app/types/order";
import Spinner from "@/components/input/spinner";
import { useRouter, useSearchParams } from "next/navigation";

export default function OrderHistory() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const from = searchParams.get("from");

  const handleBack = () => {
    if (from === "cancelled") {
      router.replace("/buyers");
    } else {
      window.history.back();
    }
  };

  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<OrderData[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const buyerId = session?.user?.buyer_id;

      if (!buyerId) return;

      try {
        const res = await fetch(
          `/api/buyers/${buyerId}/orders?status=COMPLETED&status=CANCELLED`,
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
    return <Spinner size="extraLarge" />;
  }

  return (
    <div className="w-full max-w-md min-h-screen bg-neutral-100 justify-self-center">
      {/* Header */}
      <Header leftIcon onLeftIconClick={handleBack} rightIcon="sidebar">
        Order History
      </Header>

      {/* Order History */}
      <main className="pt-4 px-5 pb-10 flex flex-col gap-5 items-center">
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
              status={order.status}
            />
          ))}
        </Show>
      </main>
    </div>
  );
}
