"use client";

import { Ghost } from "lucide-react";

type NoHistoryOrderProps = {
  message?: string;
};

export default function NoHistoryOrder({
  message = "You haven’t made any order.",
}: NoHistoryOrderProps) {
  return (
    <div className="flex items-center justify-center w-full p-4 text-center text-sm font-semibold text-neutral-800">
      <div className="flex flex-col items-center gap-3">
        <Ghost className="w-6 h-6" />
        <p>{message}</p>
      </div>
    </div>
  );
}
