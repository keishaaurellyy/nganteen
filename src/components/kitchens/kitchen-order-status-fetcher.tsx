"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import KitchenOrder from "./home-order";
import { SkeletonKitchenOrders } from "../buyers/skeleton";

export default function KitchenOrderStatusFetcher() {
  const { data: session, status } = useSession();
  const [onGoingCount, setOnGoingCount] = useState(0);
  const [historyCount, setHistoryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(true); // 👈 start loading
      const [incoming, cooking, completed, cancelled] = await Promise.all([
        fetchOrders("INCOMING"),
        fetchOrders("COOKING"),
        fetchOrders("COMPLETED"),
        fetchOrders("CANCELLED"),
      ]);
      setOnGoingCount(incoming + cooking);
      setHistoryCount(completed + cancelled);
      setIsLoading(false);
    };

    if (session?.user?.role === "kitchen") {
      fetchCounts();
    }
  }, [session]);

  if (status === "loading" || isLoading) return <SkeletonKitchenOrders />;

  return <KitchenOrder onGoing={onGoingCount} history={historyCount} />;
}
