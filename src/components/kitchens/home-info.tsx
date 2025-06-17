"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Badge } from "@/components/input/badge";
import { Kitchen } from "@/app/types/kitchen";

export default function KitchenInfo() {
  const { data: session, status } = useSession();
  const kitchenId = session?.user?.kitchen_id;
  const [data, setData] = useState<Kitchen | null>(null);

  useEffect(() => {
    if (!kitchenId) return;

    fetch(`/api/kitchens/${kitchenId}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setData(res.data);
      });
  }, [kitchenId]);

  if (status === "loading" || !kitchenId) return null;
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
