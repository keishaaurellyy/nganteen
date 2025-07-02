"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/input/header";
import RecommendCard from "@/components/buyers/recommend";
import ProfileCard from "@/components/buyers/profile-card";
import ProfileButton from "@/components/buyers/profile-button";

export default function ProfileDetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const from = searchParams.get("from");

  const handleBack = () => {
    if (from === "cancelled") {
      router.replace("/buyers");
    } else {
      window.history.back();
    }
  };

  return (
    <div className="w-full min-h-screen max-w-md justify-self-center">
      <Header onLeftIconClick={handleBack} rightIcon="sidebar">
        Profile
      </Header>

      <main className="space-y-5 px-5 pt-4 pb-8 flex flex-col">
        <div className="flex justify-center">
          <Image
            src="/images/buyer.svg"
            alt="Profile"
            width={90}
            height={90}
            className="rounded-full border-2 border-primary-500"
          />
        </div>

        <ProfileCard />
        <RecommendCard />

        <div className="bg-neutral-100 border border-neutral-400 rounded-xl px-4">
          <ProfileButton />
        </div>
      </main>
    </div>
  );
}
