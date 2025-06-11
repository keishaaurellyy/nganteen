"use client";

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type HistoryCardProps = {
  transactionId: string;
  orderDate: string;
  items: OrderItem[];
};

export default function HistoryCard({
  transactionId,
  orderDate,
  items,
}: HistoryCardProps) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="rounded-xl overflow-hidden text-sm w-full">
      {/* Card Header */}
      <div className="bg-primary-500 flex justify-between items-center px-4 py-2 text-neutral-100 font-bold">
        <span>{transactionId}</span>
        <span>{orderDate}</span>
      </div>

      {/* List Items */}
      <div className="text-neutral-900 border-x border-b rounded-b-xl border-neutral-400 divide-y divide-neutral-400 divide-dashed">
        <ul className="px-4 py-3 space-y-1">
          {items.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span className="flex-1">{item.name}</span>
              <span className="w-8 text-center">x{item.quantity}</span>
              <span className="w-20 text-right">
                Rp {item.price.toLocaleString("id-ID")}
              </span>
            </li>
          ))}
        </ul>

        {/* Total Paid */}
        <div className="flex justify-between items-center bg-primary-100 font-bold px-4 py-2">
          <span>Total Paid</span>
          <span>Rp {total.toLocaleString("id-ID")}</span>
        </div>
      </div>
    </div>
  );
}
