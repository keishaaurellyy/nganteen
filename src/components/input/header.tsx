"use client";

import { ChevronLeft, LogOutIcon, PanelRight, PencilLine } from "lucide-react";
import { cn } from "@/config";
import { forwardRef, useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "../buyers/sidebar";
import { Buyer } from "@/app/types/buyer";
import { useSession } from "next-auth/react";

type HeaderVariant = "title" | "logo";
type HeaderRightIcon = "sidebar" | "edit" | "none" | "logout";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: HeaderVariant;
  leftIcon?: boolean;
  rightIcon?: HeaderRightIcon;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
}

const Header = forwardRef<HTMLDivElement, HeaderProps>(
  (
    {
      className,
      variant = "title",
      leftIcon = true,
      rightIcon = "none",
      children,
      onLeftIconClick,
      onRightIconClick,
      ...props
    },
    ref
  ) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [buyer, setBuyer] = useState<Buyer | null>(null);

    useEffect(() => {
      const handleScroll = () => setIsScrolled(window.scrollY > 0);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
      if (rightIcon === "sidebar") {
        fetch("/api/auth/me")
          .then((res) => res.json())
          .then((data) => setBuyer(data));
      }
    }, [rightIcon]);

    const { data: session } = useSession();

    useEffect(() => {
      if (!session?.user?.buyer_id) return;

      const fetchBuyer = async () => {
        try {
          const res = await fetch(`/api/buyers/${session.user.buyer_id}`);
          const json = await res.json();
          setBuyer(json.data);
        } catch (err) {
          console.error("Failed to fetch buyer:", err);
        }
      };

      fetchBuyer();
    }, [session]);

    const baseClasses = cn(
      "flex w-full h-[60px] px-5 py-3 items-center",
      "bg-neutral-100 sticky top-0 z-50 transition-all",
      {
        "border-b border-neutral-400": isScrolled,
      },
      className
    );

    return (
      <>
        <div ref={ref} className={baseClasses} {...props}>
          {/* Left Icon */}
          <div className="w-10 flex justify-start">
            {leftIcon && (
              <button
                onClick={onLeftIconClick ?? (() => window.history.back())}
                className="text-neutral-900"
                aria-label="Back"
              >
                <ChevronLeft size={24} />
              </button>
            )}
          </div>

          {/* Title or Logo */}
          <div className="flex-1 flex justify-center min-w-0">
            {variant === "title" ? (
              <h1 className="text-2xl font-bold text-neutral-900 text-center whitespace-nowrap overflow-hidden text-ellipsis px-4">
                {children}
              </h1>
            ) : (
              <Image
                src="/logo/main-logo.svg"
                alt="Logo"
                width={48}
                height={36}
              />
            )}
          </div>

          {/* Right Icon */}
          <div className="w-10 flex justify-end">
            {rightIcon !== "none" && (
              <button
                onClick={() => {
                  if (onRightIconClick) onRightIconClick();
                  if (rightIcon === "sidebar") setSidebarOpen(true);
                }}
                className="text-neutral-900"
                aria-label={
                  rightIcon === "sidebar"
                    ? "Menu"
                    : rightIcon === "logout"
                      ? "Logout"
                      : "Edit"
                }
              >
                {rightIcon === "sidebar" ? (
                  <PanelRight size={24} />
                ) : rightIcon === "logout" ? (
                  <LogOutIcon size={24} />
                ) : (
                  <PencilLine size={24} strokeWidth={1.5} />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Sidebar */}
        {rightIcon === "sidebar" && (
          <Sidebar
            open={sidebarOpen}
            onOpenChange={setSidebarOpen}
            buyer={buyer}
          />
        )}
      </>
    );
  }
);

Header.displayName = "Header";

export { Header };
