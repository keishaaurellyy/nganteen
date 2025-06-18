"use client";

import { OrderData } from "@/app/types/order";
import dayjs from "dayjs";

interface OrderTableProps {
  orders: OrderData[];
}

export default function OrderTable({ orders }: OrderTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-300 text-sm">
      <table className="min-w-full table-fixed">
        <thead className="bg-neutral-100 text-neutral-700 font-semibold">
          <tr>
            <th className="px-3 py-2 text-left">Order Code</th>
            <th className="px-3 py-2 text-left">Buyer Name</th>
            <th className="px-3 py-2 text-left">Kitchen Name</th>
            <th className="px-3 py-2 text-left">Total Payment</th>
            <th className="px-3 py-2 text-left">Created Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId} className="border-t border-neutral-200">
              <td className="p-3 font-medium text-neutral-900">
                {order.orderCode.toUpperCase()}
              </td>
              <td className="p-3 text-neutral-800">{order.buyerId ?? "-"}</td>
              <td className="p-3 text-neutral-800">{order.kitchenId ?? "-"}</td>
              <td className="p-3 text-neutral-800">
                Rp {order?.totalPayment?.toLocaleString() ?? ""}
              </td>
              <td className="p-3 text-neutral-800">
                {dayjs(order.createdDate).format("DD MMM YYYY") ?? ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
