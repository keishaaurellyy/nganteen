'use client';

import Link from 'next/link';

type Props = {
  onGoing: number;
  history: number;
};

const orders = [
  {
    href: '/kitchens/orders',
    label: 'On-going orders',
    countKey: 'onGoing' as const,
  },
  {
    href: '/kitchens/order-history',
    label: 'Order history',
    countKey: 'history' as const,
  },
];

export default function KitchenOrder({ onGoing, history }: Props) {
  const baseClass =
    'bg-primary-100 active:bg-neutral-100 rounded-xl shadow-sm py-2 px-1 space-y-2 flex flex-col items-center';

  const countMap = { onGoing, history };

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
