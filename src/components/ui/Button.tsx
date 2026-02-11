import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-600 text-white shadow-lg shadow-primary-500/25 hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-500/30 active:scale-[0.98]',
        secondary:
          'bg-slate-900 text-white shadow-lg hover:bg-slate-800 active:scale-[0.98]',
        outline:
          'border-2 border-slate-200 bg-white text-slate-900 hover:border-primary-500 hover:text-primary-600',
        ghost:
          'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
        link:
          'text-primary-600 underline-offset-4 hover:underline',
        destructive:
          'bg-error-500 text-white shadow-lg hover:bg-error-600 active:scale-[0.98]',
        success:
          'bg-success-500 text-white shadow-lg hover:bg-success-600 active:scale-[0.98]',
        gradient:
          'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg hover:shadow-xl hover:opacity-90 active:scale-[0.98]',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-13 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
