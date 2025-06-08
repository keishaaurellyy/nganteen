import { forwardRef } from "react";
import { cn } from "@/config";

const Badge = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center",
          "border-2 border-primary-500",
          "rounded-md",
          "text-neutral-900",
          "px-2 py-[2px]",
          "text-xs-semibold",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };