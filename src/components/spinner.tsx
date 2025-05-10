// Spinner.tsx
import React, { forwardRef } from 'react';
import { Loader2Icon } from 'lucide-react';
import { cn } from '@/config';

type Size = 'small' | 'medium' | 'large' | 'extraLarge';
type Variant = 'solid' | 'outline';
type Color =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'neutral'
  | 'success'
  | 'error'
  | 'warning'
  | 'form';

interface SpinnerProps extends React.ComponentPropsWithoutRef<'div'> {
  size?: Size;
  color?: Color;
  variant?: Variant;
}

const sizeMap: Record<Size, number> = {
  small: 16,
  medium: 20,
  large: 24,
  extraLarge: 32,
};

const colorMap: Record<Color, Record<Variant, string>> = {
  primary: {
    solid: 'text-neutral-100',
    outline: 'text-primary-500',
  },
  secondary: {
    solid: 'text-neutral-100',
    outline: 'text-secondary-500',
  },
  tertiary: {
    solid: 'text-neutral-100',
    outline: 'text-tertiary-600',
  },
  neutral: {
    solid: 'text-neutral-100',
    outline: 'text-neutral-900',
  },
  success: {
    solid: 'text-neutral-100',
    outline: 'text-success-medium',
  },
  error: {
    solid: 'text-neutral-100',
    outline: 'text-error-medium',
  },
  warning: {
    solid: 'text-neutral-100',
    outline: 'text-warning-medium',
  },
  form: {
    solid: 'text-neutral-900',
    outline: 'text-primary-500',
  },
};

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'extraLarge', color = 'primary', variant = 'solid', ...props }, ref) => {
    const spinnerColor =
      size === 'extraLarge' ? 'text-primary-500' : colorMap[color][variant];

    return (
      <div ref={ref} className="flex justify-center items-center" {...props}>
        <Loader2Icon
          className={cn(spinnerColor, 'animate-spin [animation-duration:1s]')}
          size={sizeMap[size]}
        />
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';

export default Spinner;