"use client";

import { Header } from "@/components/input/header";
import Show from "@/components/input/show";
import HistoryCard from "@/components/buyers/history-card";
import NoHistoryOrder from "@/components/buyers/no-history-order";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Hero } from "@/components/buyers/hero";
import { Buyer } from "../types/buyer";
import { useRouter } from "next/navigation";

// sementara hardcode pake mockData
const mockData = [
  { name: "Paket ayam dada", quantity: 1, price: 15000 },
  { name: "Paket ayam paha", quantity: 1, price: 12000 },
  { name: "Sayap", quantity: 1, price: 8200 },
];

export default function HomePage() {
  const { data: session, status } = useSession();
  const [buyer, setBuyer] = useState<Buyer | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBuyer = async () => {
      const buyerId = session?.user?.buyer_id;

      if (!buyerId) {
        console.warn("No buyer_id found in session");
        return;
      }

      try {
        const res = await fetch(`/api/buyers/${buyerId}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (data?.success) {
          setBuyer(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch buyer:", error);
      }
    };

    if (session?.user?.role === "buyer") {
      fetchBuyer();
    }
  }, [session]);

  console.log("Session status:", status);
  console.log("Session data:", session);
  console.log("Session.user:", session?.user);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!session || session.user.role !== "buyer") {
    router.replace("/unauthorized");
    return;
  }

  if (!buyer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Buyer data not found.
      </div>
    );
  }

  const hasOrder = mockData.length > 0;

  return (
    <div className="min-h-screen w-full max-w-md justify-self-center">
      {/* Header */}
      <Header leftIcon={false} variant="logo" rightIcon="sidebar" />

      <main className="space-y-4 px-5 pt-4 pb-10 flex flex-col">
        <h1 className="text-2xl font-bold">Hi, {buyer?.firstName} 👋</h1>
        {/* Hero */}
        <Hero />

        <section className="pt-3 space-y-4">
          {/* History Order */}
          <Link
            href="/buyers/history-order"
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
