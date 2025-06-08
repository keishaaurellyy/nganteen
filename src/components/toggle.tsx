"use client";

import { useState } from "react";
import { DoorOpen, DoorClosed } from "lucide-react";

export default function KitchenStatus() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full flex justify-center">
      <div className="flex w-full min-w-[335px] items-center justify-between gap-3">
        {/* Open Button */}
        <button
          onClick={() => setIsOpen(true)}
          disabled={isOpen}
          className={`flex flex-1 p-2 px-4 justify-center items-center gap-4 rounded-md border 
            ${isOpen
              ? "bg-tertiary-100 border-success-medium text-neutral-900"
              : "bg-neutral-100 border-neutral-700 text-neutral-900 hover:border-success-medium"
            }
          `}
        >
          <div className="flex flex-col justify-center items-center gap-1">
            <DoorOpen className="w-6 h-6 stroke-2 text-neutral-900" />
            <span className="text-xs font-bold text-center text-neutral-900">Open</span>
          </div>
        </button>

        {/* Closed Button */}
        <button
          onClick={() => setIsOpen(false)}
          disabled={!isOpen}
          className={`flex flex-1 p-2 px-4 justify-center items-center gap-4 rounded-md border 
            ${!isOpen
              ? "bg-secondary-100 border-error-medium text-neutral-900"
              : "bg-neutral-100 border-neutral-700 text-neutral-900 hover:border-error-medium"
            }
          `}
        >
          <div className="flex flex-col justify-center items-center gap-1">
            <DoorClosed className="w-6 h-6 stroke-2 text-neutral-900" />
            <span className="text-xs font-bold text-center text-neutral-900">Closed</span>
          </div>
        </button>
      </div>
    </div>
  );
}
