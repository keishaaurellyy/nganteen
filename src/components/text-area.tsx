import {
  forwardRef,
  useState,
  type TextareaHTMLAttributes,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/config";

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textAreaVariants> {
  label?: ReactNode;
  error?: boolean;
  helperText?: string;
}

const textAreaVariants = cva(
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

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, helperText, onFocus, onBlur, ...props }, ref) => {
    const [focus, setFocus] = useState<boolean>(false);

    const status = error ? "error" : focus ? "focus" : "normal";

    return (
      <div className="flex flex-col space-y-1.5">
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
        <textarea
          ref={ref}
          className={cn(textAreaVariants({ status }), className)}
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
        {error && helperText && (
          <span className="text-error-medium text-xs">{helperText}</span>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export { TextArea };
