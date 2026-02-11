import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-slate-100 text-slate-700',
        primary: 'bg-primary-100 text-primary-700',
        secondary: 'bg-slate-900 text-white',
        success: 'bg-success-50 text-success-600',
        error: 'bg-error-50 text-error-600',
        warning: 'bg-amber-50 text-amber-600',
        info: 'bg-blue-50 text-blue-600',
        outline: 'border border-slate-200 text-slate-700',
      },
      size: {
        sm: 'px-2 py-0.5 text-2xs',
        md: 'px-3 py-1 text-xs',
        lg: 'px-4 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'mr-1.5 h-1.5 w-1.5 rounded-full',
              variant === 'success' && 'bg-success-500',
              variant === 'error' && 'bg-error-500',
              variant === 'warning' && 'bg-amber-500',
              variant === 'info' && 'bg-blue-500',
              variant === 'primary' && 'bg-primary-500',
              (!variant || variant === 'default' || variant === 'outline') &&
                'bg-slate-500'
            )}
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
