"use client";

import KitchenCard from "@/components/buyers/kitchen-card";
import { Header } from "@/components/input/header";
import Spinner from "@/components/input/spinner";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Kitchen {
  id: number;
  kitchenName: string;
  kitchenDescription: string;
}

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

  return (
    <div className="w-full min-h-screen max-w-md justify-self-center">
      <Header leftIcon rightIcon="sidebar">
        Explore Kitchen
      </Header>

      <main className="px-5 pt-4 pb-10">
        {loading ? (
          <Spinner size="extraLarge" />
        ) : (
          <div
            className="grid justify-items-center gap-3"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            }}
          >
            {kitchens.map((kitchen, index) => (
              <Link href={`/kitchens/${kitchen.id}`} key={kitchen.id}>
                <KitchenCard
                  name={kitchen.kitchenName}
                  description={kitchen.kitchenDescription}
                  color={COLORS[index % COLORS.length]}
                />
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
