'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/input/badge';

type Props = {
  kitchenId: number;
};

type KitchenData = {
  name: string;
  location: string;
  kitchenDescription: string;
  isOpen: boolean;
};

export default function KitchenInfo({ kitchenId }: Props) {
  const [data, setData] = useState<KitchenData | null>(null);

  useEffect(() => {
    fetch(`/api/kitchens/${kitchenId}`)
      .then(res => res.json())
      .then(res => {
        if (res.success) setData(res.data);
      });
  }, [kitchenId]);

  if (!data) return null;

  return (
    <div className="w-full p-3 rounded-xl border border-neutral-400 flex gap-3 items-start">
      <Image
        src="images/kitchen.svg"
        alt="kitchen profile"
        width={48}
        height={48}
        className="rounded-full border-2 border-primary-500"
      />
      <div className="flex-1 justify-between truncate">
        <div className="flex justify-between items-center">
          <h3 className="text-base-bold mb-1">{data.name}</h3>
          <Badge>Kitchen</Badge>
        </div>
        <p className="text-sm">{data.location} | {data.kitchenDescription}</p>
      </div>
    </div>
  );
}
