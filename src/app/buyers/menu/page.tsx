"use client";

import { Header } from "@/components/input/header";
import KitchenDetailHeader from "@/components/buyers/buyer-detail-header";
import KitchenItemsView from "@/components/buyers/buyer-items-view";
import { useRouter } from "next/navigation";

export default function KitchenDetail() {
  const router = useRouter();
  return (
    <div className="w-full max-w-md min-h-screen justify-self-center">
      <Header
        variant="logo"
        rightIcon="create"
        onRightIconClick={() => {
          router.replace("/kitchens/menu/create");
        }}
      />
      <div className="px-5 pt-4 flex flex-col gap-3">
        <KitchenDetailHeader />
        <KitchenItemsView />
      </div>
    </div>
  );
}
