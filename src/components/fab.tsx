"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/config";
import Spinner from "./spinner";

type FABSize = "medium" | "large";
type FABVariant = "solid" | "outline";
type FABColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "neutral"
  | "error"
  | "success"
  | "warning";

interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: FABSize;
  variant?: FABVariant;
  color?: FABColor;
  isLoading?: boolean;
  icon: React.ReactNode;
}

const FAB = forwardRef<HTMLButtonElement, FABProps>(
  (
    {
      size = "large",
      variant = "solid",
      color = "primary",
      icon,
      isLoading = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

    const sizeClasses = {
      large: "w-14 h-14", // 56px
      medium: "w-10 h-10", // 40px
    };

    const iconSizeMap = {
      large: "w-6 h-6", // 24px
      medium: "w-4 h-4", // 16px
    };

    const colorClasses: Record<FABColor, Record<FABVariant, string>> = {
      primary: {
        solid: "bg-primary-500 hover:bg-primary-600 text-neutral-100",
        outline:
          "border-2 border-primary-500 hover:bg-primary-100 text-primary-500",
      },
      secondary: {
        solid: "bg-secondary-500 hover:bg-secondary-600 text-neutral-100",
        outline:
          "border-2 border-secondary-500 hover:bg-secondary-100 text-secondary-500",
      },
      tertiary: {
        solid: "bg-tertiary-600 hover:bg-tertiary-700 text-neutral-100",
        outline:
          "border-2 border-tertiary-600 hover:bg-tertiary-100 text-tertiary-600",
      },
      neutral: {
        solid: "bg-neutral-900 hover:bg-neutral-800 text-neutral-100",
        outline:
          "border-2 border-neutral-900 hover:bg-neutral-300 text-neutral-900",
      },
      error: {
        solid: "bg-error-medium hover:bg-error-dark text-neutral-100",
        outline:
          "border-2 border-error-medium hover:bg-secondary-100 text-error-medium",
      },
      success: {
        solid: "bg-success-medium hover:bg-success-dark text-neutral-100",
        outline:
          "border-2 border-success-medium hover:bg-tertiary-100 text-success-medium",
      },
      warning: {
        solid: "bg-warning-medium hover:bg-warning-dark text-neutral-100",
        outline:
          "border-2 border-warning-medium hover:bg-primary-100 text-warning-medium",
      },
    };

    const iconSize = iconSizeMap[size];

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseClasses,
          sizeClasses[size],
          colorClasses[color][variant],
          className,
          {
            "pointer-events-none": isLoading,
          }
        )}
        {...props}
      >
        {isLoading ? (
          <Spinner size={size} color={color} variant={variant} />
        ) : (
          <span className={cn("flex items-center justify-center", iconSize)}>
            {icon}
          </span>
        )}
      </button>
    );
  }
);

FAB.displayName = "FAB";

export { FAB };