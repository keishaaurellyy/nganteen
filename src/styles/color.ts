type ColorStyle = {
  solid?: string;
  outline?: string;
  icon?: string;
};

export type ColorVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "neutral"
  | "error"
  | "success"
  | "warning"
  | "form";

export const ColorClasses: Record<ColorVariant, ColorStyle> = {
  primary: {
    solid: "bg-primary-500 active:bg-primary-600 text-neutral-100",
    outline: "border-primary-500 active:bg-primary-100 text-primary-500",
    icon: "text-primary-500",
  },
  secondary: {
    solid: "bg-secondary-500 active:bg-secondary-600 text-neutral-100",
    outline: "border-secondary-500 active:bg-secondary-100 text-secondary-500",
    icon: "text-secondary-500",
  },
  tertiary: {
    solid: "bg-tertiary-600 active:bg-tertiary-700 text-neutral-100",
    outline: "border-tertiary-600 active:bg-tertiary-100 text-tertiary-600",
    icon: "text-tertiary-600",
  },
  neutral: {
    solid: "bg-neutral-900 active:bg-neutral-800 text-neutral-100",
    outline: "border-neutral-900 text-neutral-900 active:bg-neutral-900/10",
    icon: "text-neutral-900",
  },

  error: {
    solid: "bg-error-medium active:bg-error-dark text-neutral-100",
    outline: "border-error-medium active:bg-secondary-100 text-error-medium",
    icon: "text-error-medium",
  },
  success: {
    solid: "bg-success-medium active:bg-success-dark text-neutral-100",
    outline: "border-success-medium active:bg-tertiary-100 text-success-medium",
    icon: "text-success-medium",
  },
  warning: {
    solid: "bg-warning-medium active:bg-warning-dark text-neutral-100",
    outline: "border-warning-medium active:bg-primary-100 text-warning-medium",
    icon: "text-warning-medium",
  },
  form: {
    solid: "bg-primary-300 active:bg-primary-400 text-neutral-900",
    outline: "border-neutral-900 active:bg-neutral-300 text-primary-500",
    icon: "text-primary-300",
  },
};

export type Color = keyof typeof ColorClasses;
