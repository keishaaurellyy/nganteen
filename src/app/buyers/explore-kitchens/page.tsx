"use client";

import { Kitchen } from "@/app/types/kitchen";
import KitchenCard from "@/components/buyers/kitchen-card";
import { SkeletonKitchenCard } from "@/components/buyers/skeleton";
import { Header } from "@/components/input/header";
import Link from "next/link";
import { useEffect, useState } from "react";

const COLORS = ["primary", "secondary", "tertiary"] as const;

export default function ExploreKitchenPage() {
  const [kitchens, setKitchens] = useState<Kitchen[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchKitchens();
  }, []);

  const kitchensToRender = loading ? Array(8).fill(null) : kitchens;

  return (
    <div className="w-full min-h-screen max-w-md justify-self-center">
      <Header leftIcon rightIcon="sidebar">
        Explore Kitchen
      </Header>

      <main className="px-5 pt-4 pb-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
          {kitchensToRender.map((kitchen, index) => {
            if (loading) {
              return (
                <SkeletonKitchenCard
                  key={index}
                  variant="explore"
                  color={COLORS[index % COLORS.length]}
                />
              );
            }

            return (
              <Link
                key={kitchen.kitchenId}
                href={`/buyers/explore-kitchens/${kitchen.kitchenId}`}
              >
                <KitchenCard
                  name={kitchen.kitchenName}
                  description={kitchen.kitchenDescription}
                  color={COLORS[index % COLORS.length]}
                  variant="explore"
                />
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
