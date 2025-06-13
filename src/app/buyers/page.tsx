"use client";

import { Header } from "@/components/input/header";
import Show from "@/components/input/show";
import HistoryCard from "@/components/buyers/history-card";
import NoOrderHistory from "@/components/buyers/no-order-history";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Hero } from "@/components/buyers/hero";
import { Buyer } from "../types/buyer";
import { useRouter } from "next/navigation";
import { OrderData } from "../types/order";

export default function HomePage() {
  const { data: session, status } = useSession();
  const [buyer, setBuyer] = useState<Buyer | null>(null);
  const [lastOrder, setLastOrder] = useState<OrderData | null>(null);
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

    const fetchLastOrder = async () => {
      const buyerId = session?.user?.buyer_id;

      if (!buyerId) return;

      try {
        const res = await fetch(
          `/api/buyers/${buyerId}/orders?status=COMPLETED&last=true`,
          { cache: "no-store" }
        );

        const result = await res.json();
        if (result.success && result.data.length > 0) {
          setLastOrder(result.data[0]);
        }
      } catch (err) {
        console.error("Error fetching last order:", err);
      }
    };

    if (session?.user?.role === "buyer") {
      fetchBuyer();
      fetchLastOrder();
    }
  }, [session]);

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

  return (
    <div className="min-h-screen w-full max-w-md justify-self-center">
      {/* Header */}
      <Header leftIcon={false} variant="logo" rightIcon="sidebar" />

      <main className="space-y-4 px-5 pt-4 pb-10 flex flex-col">
        <h1 className="text-lg font-bold">Hi, {buyer?.firstName} 👋</h1>

        {/* Hero */}
        <Hero />

        <section className="pt-3 space-y-4">
          {/* History Order */}
          <Link
            href="/buyers/order-history"
            className="flex justify-between items-center"
          >
            <h2 className="text-lg font-bold">
              Order <span className="text-secondary-500">History</span>
            </h2>
            <ChevronRight className="h-6 w-6 text-neutral-900" />
          </Link>

          <Show when={!!lastOrder} fallback={<NoOrderHistory />}>
            <HistoryCard {...lastOrder!} />
          </Show>
        </section>
      </main>
    </div>
  );
}
