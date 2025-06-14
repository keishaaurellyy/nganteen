"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/config";

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

  const className = cn(
    "flex items-center w-full p-3 rounded-lg transition gap-2 font-sm font-bold",
    variant === "danger"
      ? "text-error-medium active:bg-secondary-100"
      : "text-neutral-800",
    variant !== "danger" &&
      (isActive ? "bg-primary-300" : "active:bg-primary-100")
  );

  const content = (
    <>
      <div className="mr-2">{icon}</div>
      <span>{label}</span>
    </>
  );

  return href ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <button onClick={onClick} className={className}>
      {content}
    </button>
  );
}
