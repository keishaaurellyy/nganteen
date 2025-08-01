"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import KitchenOrder from "./home-order";
import { SkeletonKitchenOrders } from "../buyers/skeleton";

export default function KitchenOrderStatusFetcher() {
  const { data: session, status } = useSession();
  const [incomingCount, setIncomingCount] = useState(0);
  const [cookingCount, setCookingCount] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

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

    const fetchCounts = async (isInitial = false) => {
      if (isInitial) setIsInitialLoading(true);
      const [incoming, cooking] = await Promise.all([
        fetchOrders("INCOMING"),
        fetchOrders("COOKING"),
      ]);
      setIncomingCount(incoming);
      setCookingCount(cooking);
      if (isInitial) setIsInitialLoading(false);
    };

    fetchCounts(true);
    const interval = setInterval(() => {
      fetchCounts();
    }, 5000);

    return () => clearInterval(interval);
  }, [session]);

  if (status === "loading" || isInitialLoading)
    return <SkeletonKitchenOrders />;

  return <KitchenOrder incoming={incomingCount} cooking={cookingCount} />;
}
