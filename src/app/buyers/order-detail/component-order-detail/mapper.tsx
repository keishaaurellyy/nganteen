"use client";

import { SoupIcon } from "lucide-react";

export default function OrderStatus() {
  return (
    <div className="w-full pb-4 max-w-md justify-self-center space-y-4">
      {/* Status */}
      <div className="bg-primary-100 border-primary-500 rounded-lg p-3 flex items-center gap-3 border">
        <SoupIcon className="bg-primary-500 rounded-xl p-3 w-10 h-10 text-neutral-100" />
        <div>
          <p className="text-neutral-800 text-xs font-normal">
            Your food is being processed
          </p>
          <p className="font-bold text-sm text-neutral-800">
            Please pick up in 5&ndash;10 minutes 🏃
          </p>
        </div>
      </div>
    </div>
  );
}
