"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import KitchenOrder from "./home-order";

export default function KitchenOrderStatusFetcher() {
  const { data: session, status } = useSession();
  const [onGoingCount, setOnGoingCount] = useState(0);
  const [historyCount, setHistoryCount] = useState(0);

  useEffect(() => {
    const kitchenId = session?.user?.kitchen_id;
    if (!kitchenId) return;

    const fetchOrders = async (status: string) => {
      const res = await fetch(
        `/api/kitchens/${kitchenId}/orders?status=${status}`,
        { cache: "no-store" }
      );
      const result = await res.json();
      return result.success ? result.data.length : 0;
    };

    const fetchCounts = async () => {
      const [incoming, cooking, completed, cancelled] = await Promise.all([
        fetchOrders("INCOMING"),
        fetchOrders("COOKING"),
        fetchOrders("COMPLETED"),
        fetchOrders("CANCELLED"),
      ]);
      setOnGoingCount(incoming);
      setOnGoingCount((prev) => prev + cooking);
      setHistoryCount(completed);
      setHistoryCount((prev) => prev + cancelled);
    };

    if (session?.user?.role === "kitchen") {
      fetchCounts();
    }
  }, [session]);

  if (status === "loading") return null;

  return <KitchenOrder onGoing={onGoingCount} history={historyCount} />;
}
