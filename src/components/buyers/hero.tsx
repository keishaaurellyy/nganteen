"use client";

import { FAB } from "@/components/input/fab";
import { Globe } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section
      className="relative w-full h-[304px] rounded-xl overflow-hidden flex items-end px-4 pb-4"
      style={{
        backgroundImage: "url('/images/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-neutral-900/30" />

      <div className="relative z-10 flex justify-between items-center w-full">
        <div className="flex flex-col text-neutral-100">
          <h2 className="text-2xl font-bold shadow-2xl">Find your food 🍚</h2>
          <p className="text-sm font-semibold">
            All the canteen hits in one place!
          </p>
        </div>
        <Link href="/buyers/explore-kitchens">
          <FAB size="large" variant="solid" color="globe" icon={<Globe />} />
        </Link>
      </div>
    </section>
  );
};
