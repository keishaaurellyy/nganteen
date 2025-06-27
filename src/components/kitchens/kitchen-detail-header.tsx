"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Kitchen, KitchenStatus } from "@/app/types/kitchen";
import { cn } from "@/config";

interface Props {
  kitchenId?: string;
}

export default function KitchenDetailHeader({ kitchenId }: Props) {
  const { data: session } = useSession();
  const id = kitchenId ?? session?.user?.kitchen_id;

  const [kitchen, setKitchen] = useState<Kitchen | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchKitchen = async () => {
      try {
        const res = await fetch(`/api/kitchens/${id}`);
        const result = await res.json();

        if (res.ok) {
          setKitchen(result.data);
        } else {
          console.error("Failed to fetch kitchen:", result.error);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchKitchen();
  }, [id]);

  return (
    <div className="px-3 rounded-xl items-center flex flex-col gap-2">
      {!kitchen ? (
        <span className="text-sm font-medium text-muted">Loading...</span>
      ) : (
        <span
          className={cn(
            "text-sm font-semibold",
            kitchen.status === KitchenStatus.ACTIVE
              ? "text-success-medium"
              : "text-error-medium"
          )}
        >
          {kitchen.status === KitchenStatus.ACTIVE
            ? "Open now!"
            : "Sorry, we're closed :("}
        </span>
      )}

      <span className="text-2xl font-bold">
        {kitchen?.kitchenName || "Loading..."}
      </span>
      <span className="text-sm font-light">
        {kitchen
          ? `${kitchen.location}\u2003|\u2003${kitchen.kitchenDescription}`
          : ""}
      </span>
    </div>
  );
}
