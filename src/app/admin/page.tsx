"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Kitchen } from "../types/kitchen";
import KitchenTable from "@/components/kitchen-table";
import { Header } from "@/components/input/header";
import { Button } from "@/components/input/button";

export default function AdminHomePage() {
  const router = useRouter();
  const [kitchens, setKitchens] = useState<Kitchen[]>([]);
  const [, setError] = useState("");

  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const res = await fetch("/api/kitchens");
        const data = await res.json();

        if (data.success) {
          setKitchens(data.data);
        } else {
          setError(data.error || "Failed to fetch data");
        }
      } catch (err) {
        console.log(err);
        setError("Server error while fetching kitchens");
      }
    };

    fetchKitchens();
  }, []);

  return (
    <div className="min-h-screen w-full max-w-md justify-self-center">
      {/* Header */}
      <Header
        leftIcon={false}
        variant="logo"
        rightIcon="logout"
        onRightIconClick={() => signOut({ callbackUrl: "/landing" })}
      />

      <main className="space-y-4 px-5 pt-4 pb-10 flex flex-col">
        {/* Tabel Kitchen */}
        <section className="pt-3 space-y-4">
          <h1 className="text-lg font-bold text-neutral-700">Kitchen</h1>
          <KitchenTable kitchens={kitchens} />
        </section>

        {/* Tabel Rekening */}
        <section className="pt-3 space-y-4"></section>
        {/* Button Create Kitchen */}
        <Button
          className="w-full"
          color="tertiary"
          onClick={() => router.push("/admin/create-kitchen")}
        >
          Create Kitchen
        </Button>
      </main>
    </div>
  );
}
