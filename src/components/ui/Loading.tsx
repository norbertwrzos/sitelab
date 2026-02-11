import * as React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

// Spinner Component
interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn('flex items-center justify-center', className)}
        {...props}
      >
        <Loader2
          className={cn(
            'animate-spin text-primary-600',
            size === 'sm' && 'h-4 w-4',
            size === 'md' && 'h-6 w-6',
            size === 'lg' && 'h-8 w-8'
          )}
        />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';

// Skeleton Component
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'rectangular', width, height, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'animate-pulse bg-slate-200',
          variant === 'text' && 'h-4 rounded',
          variant === 'circular' && 'rounded-full',
          variant === 'rectangular' && 'rounded-lg',
          className
        )}
        style={{
          width: width,
          height: height,
          ...style,
        }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

// Page Loading Component
interface PageLoadingProps {
  message?: string;
}

const PageLoading: React.FC<PageLoadingProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center">
      <Spinner size="lg" />
      <p className="mt-4 text-sm text-slate-500">{message}</p>
    </div>
  );
};

// Card Skeleton
const CardSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl border border-slate-200 p-6">
      <Skeleton variant="rectangular" height={200} className="mb-4" />
      <Skeleton variant="text" className="mb-2 w-3/4" />
      <Skeleton variant="text" className="mb-4 w-1/2" />
      <div className="flex gap-2">
        <Skeleton variant="rectangular" width={80} height={24} />
        <Skeleton variant="rectangular" width={80} height={24} />
      </div>
    </div>
  );
};

// Table Row Skeleton
const TableRowSkeleton: React.FC<{ columns?: number }> = ({ columns = 5 }) => {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton variant="text" className="w-full" />
        </td>
      ))}
    </tr>
  );
};

export {
  Spinner,
  Skeleton,
  PageLoading,
  CardSkeleton,
  TableRowSkeleton,
};
