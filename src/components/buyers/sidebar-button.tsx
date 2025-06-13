"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarButtonProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  isLogout?: boolean;
}

export default function SidebarButton({
  icon,
  label,
  href,
  onClick,
  isLogout = false,
}: SidebarButtonProps) {
  const pathname = usePathname();

  const normalize = (path: string) => path.replace(/\/+$/, "");
  const current = normalize(pathname);
  const target = href ? normalize(href) : "";

  const isActive = current === target;

  const baseClass =
    "flex items-center w-full p-3 rounded-lg transition gap-2 font-sm font-bold";

  const className = isLogout
    ? `${baseClass} text-error-medium active:bg-secondary-100`
    : `${baseClass} text-neutral-800 ${
        isActive ? "bg-primary-300" : "active:bg-primary-100 active:bg-primary-100"
      }`;

  if (href) {
    return (
      <Link href={href} className={className}>
        <div className="mr-2">{icon}</div>
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      <div className="mr-2">{icon}</div>
      <span>{label}</span>
    </button>
  );
}
