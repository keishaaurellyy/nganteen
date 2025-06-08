import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/config";
import Spinner from "./spinner";
import Show from "./show";
import { Color, ColorClasses } from "@/styles/color";


type ButtonVariant = "solid" | "outline";


type ButtonSize = "small" | "medium" | "large";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: Color;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}


const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "solid",
      size = "medium",
      color = "primary",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      "inline-flex py-3 items-center justify-center g-2 shrink-0 transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
      "disabled:opacity-100 disabled:bg-neutral-400 disabled:pointer-events-none",
      "whitespace-nowrap",
      className
    );


    const variantClasses = {
      solid: "text-neutral-100",
      outline: `border-2 text-${color} bg-neutral-100/0`,
    };


    const sizeClasses = {
      small: "h-8 p-3 gap-2 rounded-md text-xs font-bold",
      medium: "h-10 px-3 py-4 gap-2 rounded-lg text-sm font-bold",
      large: "h-12 px-3 py-5 gap-2 rounded-xl text-base font-bold",
    };


    const iconSizeMap = {
      small: "h-4 w-4",
      medium: "h-5 w-5",
      large: "h-6 w-6",
    };


    const iconSize = iconSizeMap[size];


    return (
      <button
        className={cn(
          baseClasses,
          variant === "outline"
            ? variantClasses.outline
            : variantClasses[variant],
          sizeClasses[size],
          variant === "solid"
            ? ColorClasses[color].solid
            : (ColorClasses[color].outline ?? ColorClasses[color].solid),
          {
            "pointer-events-none": isLoading,
          }
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        <Show
          when={!isLoading}
          fallback={
            <span className="flex items-center justify-center w-full">
              <Spinner size={size} color={color} variant={variant} />
            </span>
          }
        >
          <>
            {leftIcon && (
              <span className={`flex items-center justify-center ${iconSize}`}>
                {leftIcon}
              </span>
            )}
            <span className="flex-1 text-center">{children}</span>
            {rightIcon && (
              <span className={`flex items-center justify-center ${iconSize}`}>
                {rightIcon}
              </span>
            )}
          </>
        </Show>
      </button>
    );
  }
);


Button.displayName = "Button";


export { Button };