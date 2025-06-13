"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProfileCard from "@/components/buyers/personal-info";
import RecommendCard from "@/components/buyers/recommend";
import ProfileButton from "@/components/buyers/profile-button";
import { Header } from "@/components/input/header";

interface Buyer {
  firstName: string;
  lastName: string;
  universityEmail: string;
  studentId: string;
  phoneNumber: string;
}

export default function ProfilePage() {
  const [buyer, setBuyer] = useState<Buyer | null>(null);
  const router = useRouter();

  useEffect(() => {
    const buyerId = localStorage.getItem("buyer_id");
    if (buyerId) {
      fetch(`/api/buyers/${buyerId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched buyer:", data);
          if (data.success) setBuyer(data.data);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const buttons = [
    {
      label: "Order History",
      onClick: () => router.push("/buyers/order-history"),
    },
    {
      label: "Refund Form",
      onClick: () => router.push("/buyers/refund"),
    },
    {
      label: "Help Center",
      onClick: () => router.push("/buyers/help"),
    },
    {
      label: "Logout",
      onClick: handleLogout,
      isLogout: true,
    },
  ];

  return (
    <div className="w-full min-h-screen max-w-md justify-self-center">
      <Header leftIcon rightIcon="sidebar">
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

        {buyer && (
          <>
            <ProfileCard buyer={buyer} />
            <RecommendCard />

            <div className="bg-neutral-100 border border-neutral-400 rounded-xl px-4">
              {buttons.map((btn, idx) => (
                <div key={btn.label}>
                  <ProfileButton
                    label={btn.label}
                    onClick={btn.onClick}
                    isLogout={btn.isLogout}
                  />
                  {idx < buttons.length - 1 && (
                    <div className="h-[1px] bg-neutral-400" />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
