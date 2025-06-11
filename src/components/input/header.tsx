"use client";

import { ChevronLeft, PanelRight, PencilLine } from "lucide-react";
import { cn } from "@/config";
import { forwardRef, useState, useEffect } from "react";
import Image from "next/image";

type HeaderVariant = "title" | "logo";
type HeaderRightIcon = "sidebar" | "edit" | "none";

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

    useEffect(() => {
      const handleScroll = () => setIsScrolled(window.scrollY > 0);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const baseClasses = cn(
        "flex w-full h-[60px] px-5 py-3 items-center",
        "bg-neutral-100 sticky top-0 z-50 transition-all",
        {
          "border-b border-neutral-400": isScrolled,
        },
        className
      );

      return (
        <div ref={ref} className={baseClasses} {...props}>
          {/* Left Icon - Fixed width */}
          <div className="w-10 flex justify-start">
            {leftIcon && (
              <button onClick={onLeftIconClick} className="text-neutral-900" aria-label="Back">
                <ChevronLeft size={24} />
              </button>
            )}
          </div>
      
          {/* Children - Flexible center */}
          <div className="flex-1 flex justify-center min-w-0">
            {variant === "title" ? (
              <h1 className="text-2xl font-bold text-neutral-900 text-center whitespace-nowrap overflow-hidden text-ellipsis px-4">
                {children}
              </h1>
            ) : (
              <Image src="./logo/main-logo.svg" alt="Logo" width={48} height={36} />
            )}
          </div>
      
          {/* Right Icon - Fixed width */}
          <div className="w-10 flex justify-end">
            {rightIcon !== "none" && (
              <button 
                onClick={onRightIconClick} 
                className="text-neutral-900"
                aria-label={rightIcon === "sidebar" ? "Menu" : "Edit"}
              >
                {rightIcon === "sidebar" ? (
                  <PanelRight size={24} />
                ) : (
                  <PencilLine size={24} strokeWidth={1.5} />
                )}
              </button>
            )}
          </div>
        </div>
      );
  }
);

Header.displayName = "Header";

export { Header };