"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import KitchenStatus from "../input/toggle";
import { KitchenStatus as StatusEnum } from "@/app/types/kitchen";
import { SkeletonKitchenStatus } from "../buyers/skeleton";

export default function KitchenUpdateStatus() {
  const { data: session, status } = useSession();
  const [initialStatus, setInitialStatus] = useState<StatusEnum | null>(null);
  const [loading, setLoading] = useState(true);

  const kitchenId = session?.user?.kitchen_id;

  useEffect(() => {
    if (!kitchenId) return;

    const fetchKitchenStatus = async () => {
      try {
        const res = await fetch(`/api/kitchens/${kitchenId}`, {
          cache: "no-store",
        });
        const result = await res.json();
        if (res.ok && result?.data?.status) {
          setInitialStatus(result.data.status);
        }
      } catch (err) {
        console.error("Error fetching kitchen status:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchKitchenStatus();
    const interval = setInterval(fetchKitchenStatus, 5000);

    return () => clearInterval(interval);
  }, [kitchenId]);

  if (status === "loading" || loading) {
    return <SkeletonKitchenStatus />;
  }

  if (!kitchenId || initialStatus === null) {
    return <p className="text-red-500">Failed to load kitchen info</p>;
  }

  return (
    <div className="w-full flex gap-3 items-start">
      <KitchenStatus kitchenId={kitchenId} initialStatus={initialStatus} />
    </div>
  );
}
