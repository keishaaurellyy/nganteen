"use client";

import KitchenCard from "../buyers/kitchen-card";

export default function KitchenDetailHeader() {
  return (
    <div className="px-3 rounded-xl flex flex-row gap-4 items-center">
      <KitchenCard variant="home" />
      <div className="flex flex-col gap-2">
        <span className="text-tertiary-600 text-xs">Open now!</span>
        <span className="text-2xl font-bold">Nara Kitchen</span>
        <span className="text-sm font-light">
          A09&nbsp;|&nbsp;Kitchen Serba Ada
        </span>
      </div>
    </div>
  );
}
