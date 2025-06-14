"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarButtonProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "danger";
}

export default function SidebarButton({
  icon,
  label,
  href,
  onClick,
  variant = "default",
}: SidebarButtonProps) {
  const pathname = usePathname();

  const normalize = (path: string) => path.replace(/\/+$/, "");
  const current = normalize(pathname);
  const target = href ? normalize(href) : "";

  const isActive = current === target;

  const baseClass =
    "flex items-center w-full p-3 rounded-lg transition gap-2 font-sm font-bold";

  let className = "";

  if (variant === "danger") {
    className = `${baseClass} text-error-medium active:bg-secondary-100`;
  } else {
    className = `${baseClass} text-neutral-800 ${
      isActive ? "bg-primary-300" : "active:bg-primary-100"
    }`;
  }

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
