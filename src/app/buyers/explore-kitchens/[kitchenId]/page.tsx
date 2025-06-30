"use client";

import { KitchenStatus } from "@/app/types/kitchen";
import KitchenClosed from "@/components/buyers/kitchen-closed";
import ViewKitchenDetail from "@/components/buyers/view-kitchen-detail";
import { Header } from "@/components/input/header";
import Show from "@/components/input/show";
import KitchenDetailHeader from "@/components/kitchens/kitchen-detail-header";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function KitchenDetail() {
  const { kitchenId } = useParams() as { kitchenId: string };
  const [status, setStatus] = useState<KitchenStatus | null>(null);

  return (
    <div className="w-full max-w-md min-h-screen justify-self-center">
      <Header variant="logo" />
      <div className="px-5 pt-4 flex flex-col gap-3">
        <KitchenDetailHeader
          kitchenId={kitchenId}
          onStatusChange={(s) => setStatus(s)}
        />
        <Show
          when={status === KitchenStatus.ACTIVE}
          fallback={<KitchenClosed />}
        >
          <ViewKitchenDetail />
        </Show>
      </div>
    </div>
  );
}
