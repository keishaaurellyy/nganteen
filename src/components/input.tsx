import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/config";
import Show from "./show";

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: ReactNode;
  error?: boolean;
  helperText?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  withAsterisk?: boolean;
}

const inputVariants = cva(
  "w-full px-3 py-2 rounded-md border transition-all placeholder:text-sm placeholder:text-neutral-500 text-neutral-900",
  {
    variants: {
      status: {
        normal: "border-neutral-400 text-neutral-900",
        focus: "border-primary-500 text-neutral-900",
        error:
          "border-error-medium text-error-medium placeholder:text-error-medium",
      },
    },
    defaultVariants: {
      status: "normal",
    },
  }
);

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      startAdornment,
      endAdornment,
      withAsterisk,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [focus, setFocus] = useState<boolean>(false);

    const status = error ? "error" : focus ? "focus" : "normal";

    return (
      <div className="flex flex-col space-y-1.5">
        <div className="flex flex-row">
        {label && (
          <label
            className={cn(
              "text-sm font-bold",
              error ? "text-error-medium" : "text-neutral-700"
            )}
          >
            {label}
          </label>
        )}
        <Show when={!!withAsterisk && !!label}>
          <span className="text-error-medium">&nbsp;*</span>
        </Show>
        </div>
        <div className="relative w-full">
          {startAdornment && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center text-neutral-500 ">
              {startAdornment}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              inputVariants({ status }),
              startAdornment && "pl-10",
              endAdornment && "pr-10",
              className
            )}
            onFocus={(e) => {
              setFocus(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocus(false);
              onBlur?.(e);
            }}
            {...props}
          />
          {endAdornment && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-neutral-600 focus:text-neutral-700">
              {endAdornment}
            </div>
          )}
        </div>

        {helperText && (
          <span
            className={cn(
              "text-xs",
              error ? "text-error-medium" : "text-neutral-500"
            )}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
