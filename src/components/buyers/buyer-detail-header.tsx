"use client";

import { cn } from "@/config";

export default function KitchenDetailHeader() {
  const kitchen = {
    status: "ACTIVE", // atau "INACTIVE"
    kitchenName: "Nara Kitchen",
    location: "A09",
    kitchenDescription: "Warteg Modern",
  };

  return (
    <div className="px-3 rounded-xl items-center flex flex-col gap-2">
      <span
        className={cn(
          "text-sm font-semibold",
          kitchen.status === "ACTIVE"
            ? "text-success-medium"
            : "text-error-medium"
        )}
      >
        {kitchen.status === "ACTIVE"
          ? "Open now!"
          : "Sorry, we're closed :("}
      </span>

      <span className="text-2xl font-bold">Nara Kitchen</span>
      <span className="text-sm font-light">
        A09 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Warteg Modern
      </span>
    </div>
  );
}
