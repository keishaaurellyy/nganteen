"use client";

import {
  ChevronRight,
  LogOut,
  HelpCircle,
  History,
  HandCoins,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

type ButtonVariant = "default" | "danger";

const buttons = [
  {
    label: "Order History",
    icon: <History className="w-5 h-5 text-neutral-100" />,
    onClick: (router: any) => router.push("/buyers/order-history"),
    variant: "default" as ButtonVariant,
  },
  {
    label: "Refund Form",
    icon: <HandCoins className="w-5 h-5 text-neutral-100" />,
    onClick: (router: any) => router.push("/buyers/profile/account"),
    variant: "default" as ButtonVariant,
  },
  {
    label: "Help Center",
    icon: <HelpCircle className="w-5 h-5 text-neutral-100" />,
    onClick: (router: any) => router.push("/buyers/help"),
    variant: "default" as ButtonVariant,
  },
  {
    label: "Logout",
    icon: <LogOut className="w-5 h-5 text-neutral-100" />,
    onClick: () => signOut({ callbackUrl: "/" }),
    variant: "danger" as ButtonVariant,
  },
];

export default function ProfileButton() {
  const router = useRouter();

  return (
    <>
      {buttons.map((btn, idx) => (
        <div key={btn.label}>
          <button
            onClick={() => btn.onClick(router)}
            className={`flex items-center justify-between w-full py-4 ${
              btn.variant === "danger" ? "text-error-medium" : "text-neutral-800"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-md ${
                  btn.variant === "danger" ? "bg-error-medium" : "bg-warning-dark"
                }`}
              >
                {btn.icon}
              </div>
              <span className="text-sm-bold">{btn.label}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-neutral-800" />
          </button>
          {idx < buttons.length - 1 && (
            <div className="h-[1px] bg-neutral-400" />
          )}
        </div>
      ))}
    </>
  );
}
