"use client";

import { useState, useTransition, useEffect } from "react";
import { DoorOpen, DoorClosed } from "lucide-react";
import { KitchenStatus as StatusEnum } from "@/app/types/kitchen";

interface KitchenStatusProps {
  kitchenId: string;
  initialStatus: StatusEnum;
}

export default function Toggle({
  kitchenId,
  initialStatus,
}: KitchenStatusProps) {
  const [isOpen, setIsOpen] = useState(initialStatus === StatusEnum.ACTIVE);
  const [isPending, startTransition] = useTransition();

  // Sync state if initialStatus ever changes
  useEffect(() => {
    setIsOpen(initialStatus === StatusEnum.ACTIVE);
  }, [initialStatus]);

  const updateStatus = async (
    status: StatusEnum.ACTIVE | StatusEnum.INACTIVE
  ) => {
    try {
      const res = await fetch(`/api/kitchens/${kitchenId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      console.log("Status updated:", data);
    } catch (err) {
      console.error("Failed to update kitchen status", err);
    }
  };

  const handleSetOpen = (open: boolean) => {
    setIsOpen(open);
    startTransition(() =>
      updateStatus(open ? StatusEnum.ACTIVE : StatusEnum.INACTIVE)
    );
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex w-full min-w-[335px] items-center justify-between gap-3">
        {/* Open Button */}
        <button
          onClick={() => handleSetOpen(true)}
          disabled={isOpen || isPending}
          className={`flex flex-1 p-2 px-4 justify-center items-center gap-4 rounded-md border 
            ${
              isOpen
                ? "bg-tertiary-100 border-success-medium text-neutral-900"
                : "bg-neutral-100 border-neutral-700 text-neutral-900 hover:border-success-medium"
            }
          `}
        >
          <div className="flex flex-col justify-center items-center gap-1">
            <DoorOpen className="w-6 h-6 stroke-2 text-neutral-900" />
            <span className="text-xs font-bold text-center text-neutral-900">
              Open
            </span>
          </div>
        </button>

        {/* Closed Button */}
        <button
          onClick={() => handleSetOpen(false)}
          disabled={!isOpen || isPending}
          className={`flex flex-1 p-2 px-4 justify-center items-center gap-4 rounded-md border 
            ${
              !isOpen
                ? "bg-secondary-100 border-error-medium text-neutral-900"
                : "bg-neutral-100 border-neutral-700 text-neutral-900 hover:border-error-medium"
            }
          `}
        >
          <div className="flex flex-col justify-center items-center gap-1">
            <DoorClosed className="w-6 h-6 stroke-2 text-neutral-900" />
            <span className="text-xs font-bold text-center text-neutral-900">
              Closed
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
