"use client";

import { Ghost } from "lucide-react";

type NoOrderHistoryProps = {
  message?: string;
};

export default function NoOngoingOrder({
  message = "You don’t have any on-going order right now.",
}: NoOrderHistoryProps) {
  return (
    <div className="flex items-center justify-center w-full p-4 text-center text-sm font-semibold text-neutral-800">
      <div className="flex flex-col items-center gap-3">
        <Ghost className="w-6 h-6" />
        <p>{message}</p>
      </div>
    </div>
  );
}
