"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Spinner from "../input/spinner";
import KitchenStatus from "../input/toggle";
import { KitchenStatus as StatusEnum } from "@/app/types/kitchen";

export default function KitchenUpdateStatus() {
  const { data: session, status } = useSession();
  const [initialStatus, setInitialStatus] = useState<StatusEnum | null>(null);
  const [loading, setLoading] = useState(true);

  const kitchenId = session?.user?.kitchen_id;

  useEffect(() => {
    const fetchKitchenStatus = async () => {
      if (!kitchenId) return;

      try {
        const res = await fetch(`/api/kitchens/${kitchenId}`);
        const result = await res.json();

        if (res.ok && result?.data?.status) {
          setInitialStatus(result.data.status);
        } else {
          console.error("Failed to fetch kitchen status:", result.error);
        }
      } catch (err) {
        console.error("Error fetching kitchen status:", err);
      } finally {
        setLoading(false);
      }
    };

    if (kitchenId) {
      fetchKitchenStatus();
    }
  }, [kitchenId]);

  if (status === "loading" || loading) {
    return <Spinner size="extraLarge" />;
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
