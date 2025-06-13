"use client";

import {
  PanelRightClose,
  Home,
  LogOut,
  LifeBuoy,
  History,
  HandPlatter,
} from "lucide-react";
import Image from "next/image";
import SidebarButton from "./sidebar-button";
import { useEffect, useState } from "react";
import { Buyer } from "@/app/types/buyer";
import Link from "next/link";

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  buyer: Buyer | null;
}

export default function Sidebar({ open, onOpenChange }: SidebarProps) {
  const [buyer, setBuyer] = useState<Buyer | null>(null);

  useEffect(() => {
    const buyerId = localStorage.getItem("buyer_id");

    if (buyerId) {
      fetch(`/api/buyers/${buyerId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setBuyer(data.data);
          } else {
            console.error("Buyer fetch error:", data.error);
          }
        })
        .catch((err) => {
          console.error("Error fetching buyer:", err);
        });
    }
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-neutral-900/40"
        onClick={() => onOpenChange(false)}
      />

      {/* Sidebar Panel */}
      <div
        className={`ml-auto px-5 py-14 h-full w-[320px] gap-y-3 bg-neutral-100 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Top Section */}
          <div className="flex items-center justify-between pb-4">
            <Link href="/buyers/profile" className="cursor-pointer">
              <Image
                src="/images/buyer.svg"
                alt="Profile"
                width={64}
                height={64}
                className="rounded-full border-2 border-primary-500"
              />
            </Link>

            {/* Close Sidebar Button */}
            <button onClick={() => onOpenChange(false)}>
              <PanelRightClose className="text-neutral-800" size={24} />
            </button>
          </div>

          {/* Name & Email */}
          <Link href="/buyers/profile" className="flex flex-col mb-2 cursor-pointer">
            <p className="text-base font-bold text-neutral-800">
              {buyer ? `${buyer.firstName} ${buyer.lastName}` : "Loading..."}
            </p>
            <p className="text-sm text-neutral-700">
              {buyer?.universityEmail || "Loading email..."}
            </p>
          </Link>

          {/* Divider */}
          <div className="border-t border-neutral-400 my-5" />

          {/* Sidebar Buttons */}
          <div className="flex flex-col gap-1">
            <SidebarButton
              icon={<Home size={24} />}
              label="Home"
              href="/buyers"
            />
            <SidebarButton
              icon={<HandPlatter size={24} />}
              label="Explore Kitchen"
              href="/buyers/view-all-kitchen"
            />
            <SidebarButton
              icon={<History size={24} />}
              label="Order History"
              href="/buyers/order-history"
            />
            <SidebarButton
              icon={<LifeBuoy size={24} />}
              label="Help Center"
              href="/buyers/help"
            />
          </div>
        </div>

        {/* Logout */}
        <div className="flex flex-col gap-5">
          <div className="border-t border-neutral-400" />
          <SidebarButton
            icon={<LogOut size={24} />}
            label="Logout"
            onClick={() => {
              localStorage.removeItem("buyer_id");
              window.location.href = "/buyers/login";
            }}
            isLogout
          />
        </div>
      </div>
    </div>
  );
}
