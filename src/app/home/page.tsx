"use client";

import { Header } from "@/components/header";
import { Hero } from "@/app/home/components/hero";
import Show from "@/components/show";
import HistoryCard from "@/components/input/history-card";
import NoHistoryOrder from "@/components/input/no-history-order";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

// sementara hardcode pake mockData
const mockData = [
  { name: "Paket ayam dada", quantity: 1, price: 15000 },
  { name: "Paket ayam paha", quantity: 1, price: 12000 },
  { name: "Sayap", quantity: 1, price: 8200 },
];

export default function HomePage() {
  const hasOrder = mockData.length > 0;

  return (
    <div className="min-h-screen w-full max-w-md justify-self-center">
      {/* Header */}
      <Header leftIcon={false} variant="logo" rightIcon="sidebar" />

      <main className="space-y-4 px-5 pt-4 pb-10 flex flex-col">
        {/* Hero */}
        <Hero />

        <section className="pt-3 space-y-4">
          {/* History Order */}
          <Link
            href="/history-order"
            className="flex justify-between items-center"
          >
            <h2 className="text-lg-bold">
              History <span className="text-secondary-500">Order</span>
            </h2>
            <ChevronRight className="h-6 w-6 text-neutral-900" />
          </Link>

          <Show when={hasOrder} fallback={<NoHistoryOrder />}>
            <HistoryCard
              transactionId="TRX001"
              orderDate="August 25, 2024"
              items={mockData}
            />
          </Show>
        </section>
      </main>
    </div>
  );
}
