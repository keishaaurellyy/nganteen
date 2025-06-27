"use client";

import type { OrderData } from "@/app/types/order";
import dayjs from "dayjs";

export default function HistoryCard({
  orderCode,
  totalPayment,
  createdDate,
  items,
}: OrderData) {
  const safeItems = items ?? [];

  return (
    <div className="rounded-xl overflow-hidden text-sm w-full">
      {/* Card Header */}
      <div className="bg-neutral-200 flex justify-between items-center px-4 py-2 text-neutral-700 font-bold">
        <span>{orderCode}</span>
        <span>{dayjs(createdDate).format("MMMM DD, YYYY")}</span>
      </div>

      {/* List Items */}
      <div className="text-neutral-900 border-x border-b rounded-b-xl border-neutral-200 divide-y divide-neutral-400 divide-dashed">
        <ul className="px-4 py-3 space-y-1">
          {safeItems.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span className="flex-1">{item.itemName}</span>
              <span className="w-8 text-center">x{item.itemQty}</span>
              <span className="w-20 text-right">
                Rp {item.itemPrice.toLocaleString("id-ID")}
              </span>
            </li>
          ))}
        </ul>

        {/* Total Paid */}
        <div className="flex justify-between items-center bg-tertiary-100 font-bold px-4 py-2">
          <span>Total Paid</span>
          <span>Rp {totalPayment.toLocaleString("id-ID")}</span>
        </div>
      </div>
    </div>
  );
}
