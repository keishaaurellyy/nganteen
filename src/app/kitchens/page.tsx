"use client";

import { Header } from "@/components/input/header";
import KitchenActions from "@/components/kitchens/home-actions";
import KitchenInfo from "@/components/kitchens/home-info";
import KitchenMenu from "@/components/kitchens/home-menu";
import KitchenUpdateStatus from "@/components/kitchens/home-status";
import KitchenOrderStatusFetcher from "@/components/kitchens/kitchen-order-status-fetcher";

export default function KitchenHomePage() {
  return (
    <div className="w-full max-w-md min-h-screen justify-self-center">
      <Header leftIcon={false} variant="logo"></Header>

      <div className="px-5 pt-4 flex flex-col gap-4">
        <KitchenInfo />
        <KitchenUpdateStatus />
        <KitchenOrderStatusFetcher />
        <KitchenActions />
        <KitchenMenu />
      </div>
    </div>
  );
}
