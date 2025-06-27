"use client";

import { Header } from "@/components/input/header";
import Show from "@/components/input/show";
import HistoryCard from "@/components/input/history-card";
import NoOrderHistory from "@/components/input/no-order-history";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Hero } from "@/components/buyers/hero";
import { Buyer } from "../types/buyer";
import { useRouter } from "next/navigation";
import { OrderData } from "../types/order";
import KitchenCard from "@/components/buyers/kitchen-card";
import Spinner from "@/components/input/spinner";
import { Kitchen } from "../types/kitchen";

const COLORS = ["primary", "secondary", "tertiary"] as const;

export default function HomePage() {
  const { data: session, status } = useSession();
  const [buyer, setBuyer] = useState<Buyer | null>(null);
  const [lastOrder, setLastOrder] = useState<OrderData | null>(null);
  const [kitchens, setKitchens] = useState<Kitchen[]>([]);
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

    const fetchKitchens = async () => {
      try {
        const res = await fetch("/api/kitchens");
        const data = await res.json();

        if (data.success) {
          setKitchens(data.data);
        } else {
          console.error("Failed to load kitchens:", data.error);
        }
      } catch (err) {
        console.error("Error fetching kitchens:", err);
      }
    };

    if (session?.user?.role === "buyer") {
      fetchBuyer();
      fetchLastOrder();
      fetchKitchens();
    }
  }, [session]);

  if (status === "loading") {
    return <Spinner size="extraLarge" />;
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
        {/* Greeting */}
        <h1 className="text-lg font-bold">Hi, {buyer?.firstName} 👋</h1>

        {/* Hero */}
        <Hero />

        {/* All The Kitchens */}
        <section className="space-y-4">
          <Link
            href="/buyers/explore-kitchens"
            className="flex justify-between items-center"
          >
            <h2 className="mt-3 text-lg font-bold">
              All The <span className="text-secondary-500">Kitchens</span>
            </h2>
            <ChevronRight className="h-6 w-6 text-neutral-900" />
          </Link>

          <div className="flex gap-3 overflow-x-auto pb-1">
            {kitchens?.map((kitchen, index) => {
              if (!kitchen?.kitchenId) return null;
              return (
                <Link
                  href={`/buyers/explore-kitchens/${kitchen.kitchenId}`}
                  key={kitchen.kitchenId}
                >
                  <KitchenCard
                    name={kitchen.kitchenName}
                    color={COLORS[index % COLORS.length]}
                    variant="home"
                  />
                </Link>
              );
            })}
          </div>
        </section>

        {/* History Order */}
        <section className="pt-3 space-y-4">
          <Link
            href="/buyers/order-history"
            className="flex justify-between items-center"
          >
            <h2 className="mt-3 text-lg font-bold">
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
