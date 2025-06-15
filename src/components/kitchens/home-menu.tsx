'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function KitchenMenu() {
  return (
    <Link
      href="/kitchens/menu/edit"
      className="w-full flex gap-4 items-center p-5 rounded-xl shadow-sm border border-neutral-400 bg-neutral-100 active:bg-primary-100 transition"
    >
      <div className="flex-1">
        <p className="text-base font-bold mb-2">Set your MENU</p>
        <p className="text-sm">
          <span className="text-tertiary-600 font-semibold">Click here</span> to add, edit, and organize your kitchen menu.
        </p>
      </div>
      <Image
        src="/images/setup-menu.svg"
        alt="setup illustration"
        width={100}
        height={100}
        className="object-contain"
      />
    </Link>
  );
}
