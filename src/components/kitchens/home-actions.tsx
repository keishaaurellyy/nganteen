"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { FileText, HelpCircle, HistoryIcon, LogOut } from "lucide-react";

const actions = [
  {
    label: "Order History",
    icon: <HistoryIcon size={24} />,
    href: "/kitchens/order-history",
    className: "bg-primary-500",
  },
  {
    label: "Contract",
    icon: <FileText size={24} />,
    href: "/kitchens/contract-policy",
    className: "bg-primary-500",
  },
  {
    label: "Help Center",
    icon: <HelpCircle size={24} />,
    href: "/kitchens/help",
    className: "bg-primary-500",
  },
  {
    label: "Logout",
    icon: <LogOut size={24} />,
    onClick: () => signOut({ callbackUrl: "/" }),
    className: "bg-error-medium",
  },
];

export default function KitchenActions() {
  const router = useRouter();

  return (
    <div className="border border-neutral-400 p-3 rounded-xl grid grid-cols-4 gap-2">
      {actions.map((action, index) => (
        <div key={index} className="flex flex-col items-center gap-2">
          <button
            className={`text-neutral-100 w-10 h-10 rounded-xl flex items-center justify-center ${action.className}`}
            onClick={() =>
              action.onClick ? action.onClick() : router.push(action.href)
            }
          >
            {action.icon}
          </button>
          <span className="text-xs font-semibold text-center">
            {action.label}
          </span>
        </div>
      ))}
    </div>
  );
}
