"use client";

import Link from "next/link";

type Props = {
  incoming: number;
  cooking: number;
};

const orders = [
  {
    href: "/kitchens/orders?status=incoming",
    label: "Waiting confirmation",
    countKey: "incoming" as const,
  },
  {
    href: "/kitchens/orders?status=cooking",
    label: "Orders",
    countKey: "cooking" as const,
  },
];

export default function KitchenOrder({ incoming, cooking }: Props) {
  const baseClass =
    "bg-primary-100 active:bg-neutral-100 rounded-md shadow-sm py-2 px-1 space-y-2 flex flex-col items-center";

  const countMap = { incoming, cooking };

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      {orders.map((order) => (
        <Link href={order.href} key={order.href} className={baseClass}>
          <p className="text-secondary-500 text-2xl-bold">
            {countMap[order.countKey]}
          </p>
          <p className="text-sm-semibold">{order.label}</p>
        </Link>
      ))}
    </div>
  );
}
