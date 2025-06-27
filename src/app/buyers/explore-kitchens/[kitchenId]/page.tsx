"use client";

import ViewKitchenDetail from "@/components/buyers/view-kitchen-detail";
import { Header } from "@/components/input/header";
import KitchenDetailHeader from "@/components/kitchens/kitchen-detail-header";
import { useParams } from "next/navigation";

export default function KitchenDetail() {
  const { kitchenId } = useParams() as { kitchenId: string };

  return (
    <div className="w-full max-w-md min-h-screen justify-self-center">
      <Header variant="logo" />
      <div className="px-5 pt-4 flex flex-col gap-3">
        <KitchenDetailHeader kitchenId={kitchenId} />
        <ViewKitchenDetail />
      </div>
    </div>
  );
}
