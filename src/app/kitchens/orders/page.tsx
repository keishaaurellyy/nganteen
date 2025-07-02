"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/input/header";
import AlertBox from "@/components/input/alert-box";
import { OrdersTab } from "@/components/kitchens/order-tab";
import { OrderCard } from "@/components/kitchens/order-card";
import { OrderData, OrderStatus } from "@/app/types/order";
import { useSession } from "next-auth/react";
import Show from "@/components/input/show";
import NoOngoingOrder from "@/components/input/no-ongoing-orders";
import { SkeletonOrderCard } from "@/components/buyers/skeleton";

type OrderType = "incoming" | "confirmed";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderType>("incoming");
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const kitchenId = session?.user?.kitchen_id;

  useEffect(() => {
    if (!kitchenId) return;

    setIsLoading(true);

    const status =
      activeTab === "incoming" ? OrderStatus.INCOMING : OrderStatus.COOKING;

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `/api/kitchens/${kitchenId}/orders?status=${status}`,
          {
            cache: "no-store",
          }
        );
        const result = await res.json();
        if (result.success) {
          setOrders(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();

    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [activeTab, kitchenId]);

  const handleConfirm = async (orderId?: number) => {
    if (!orderId) return;

    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "COOKING" }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setOrders((prev) => prev.filter((order) => order.orderId !== orderId));
      } else {
        console.error("Failed to confirm order:", data.error);
      }
    } catch (err) {
      console.error("Error confirming order:", err);
    }
  };

  const handleCancel = async (orderId?: number) => {
    if (!orderId) return;

    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setOrders((prev) => prev.filter((order) => order.orderId !== orderId));
      } else {
        console.error("Failed to cancel order:", data.error);
      }
    } catch (err) {
      console.error("Error cancelling order:", err);
    }
  };

  return (
    <div className="w-full min-h-screen max-w-md justify-self-center">
      <Header leftIcon variant="logo" />
      <main className="bg-neutral-100 px-5 pt-4 pb-10 flex flex-col items-center space-y-5">
        <OrdersTab activeTab={activeTab} setActiveTab={setActiveTab} />

        <AlertBox
          title="Warning!"
          description={
            activeTab === "incoming"
              ? "Please check if customer has paid then click the 'Confirm' button and start cooking the order."
              : "This order can no longer be canceled. The Buyer will collect the item within 5-10 minutes."
          }
        />

        {isLoading ? (
          <SkeletonOrderCard />
        ) : (
          <Show
            when={orders.length > 0}
            fallback={
              <div className="flex flex-1 justify-items-center w-full min-h-[calc(100vh-27vh)]">
                <NoOngoingOrder />
              </div>
            }
          >
            <div className="w-full">
              {orders.map((order) => (
                <OrderCard
                  key={order.orderId}
                  orders={order}
                  type={activeTab}
                  onConfirm={() => handleConfirm(order.orderId)}
                  onCancel={() => handleCancel(order.orderId)}
                />
              ))}
            </div>
          </Show>
        )}
      </main>
    </div>
  );
}
