"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/input/badge";
import { Kitchen } from "@/app/types/kitchen";
import { SkeletonKitchenInfo } from "../buyers/skeleton";

export default function KitchenInfo() {
  const { data: session, status } = useSession();
  const kitchenId = session?.user?.kitchen_id;
  const [data, setData] = useState<Kitchen | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (!kitchenId) return;

    const fetchKitchenInfo = async (isInitial = false) => {
      if (isInitial) setIsInitialLoading(true);

      try {
        const res = await fetch(`/api/kitchens/${kitchenId}`, {
          cache: "no-store",
        });
        const result = await res.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch kitchen info:", error);
      } finally {
        if (isInitial) setIsInitialLoading(false);
      }
    };

    fetchKitchenInfo(true);

    const interval = setInterval(() => {
      fetchKitchenInfo();
    }, 5000);

    return () => clearInterval(interval);
  }, [kitchenId]);

  if (status === "loading" || !kitchenId || isInitialLoading) {
    return <SkeletonKitchenInfo />;
  }

  if (!data) return null;

  return (
    <div className="w-full p-3 rounded-xl border border-neutral-400 flex gap-3 items-start">
      <Image
        src="/images/kitchen.svg"
        alt="kitchen profile"
        width={48}
        height={48}
        className="rounded-full border-2 border-primary-500"
      />
      <div className="flex-1 justify-between truncate">
        <div className="flex justify-between items-center">
          <h3 className="text-base-bold mb-1">{data.kitchenName}</h3>
          <Badge>Kitchen</Badge>
        </div>
        <p className="text-sm">
          {data.location}&ensp;|&ensp;{data.kitchenDescription}
        </p>
      </div>
    </div>
  );
}
