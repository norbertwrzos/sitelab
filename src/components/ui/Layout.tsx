import * as React from 'react';
import { cn } from '@/lib/utils';

// Divider Component
interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', label, ...props }, ref) => {
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          className={cn('h-full w-px bg-slate-200', className)}
          {...props}
        />
      );
    }

    if (label) {
      return (
        <div
          ref={ref}
          className={cn('flex items-center', className)}
          {...props}
        >
          <div className="flex-1 border-t border-slate-200" />
          <span className="px-4 text-sm text-slate-500">{label}</span>
          <div className="flex-1 border-t border-slate-200" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('h-px w-full bg-slate-200', className)}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';

// Spacer Component
interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          size === 'xs' && 'h-2',
          size === 'sm' && 'h-4',
          size === 'md' && 'h-8',
          size === 'lg' && 'h-12',
          size === 'xl' && 'h-16',
          size === '2xl' && 'h-24',
          className
        )}
        {...props}
      />
    );
  }
);

Spacer.displayName = 'Spacer';

// Flex Component
interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      direction = 'row',
      align = 'start',
      justify = 'start',
      gap = 'md',
      wrap = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          direction === 'column' && 'flex-col',
          // Align
          align === 'start' && 'items-start',
          align === 'center' && 'items-center',
          align === 'end' && 'items-end',
          align === 'stretch' && 'items-stretch',
          // Justify
          justify === 'start' && 'justify-start',
          justify === 'center' && 'justify-center',
          justify === 'end' && 'justify-end',
          justify === 'between' && 'justify-between',
          justify === 'around' && 'justify-around',
          // Gap
          gap === 'none' && 'gap-0',
          gap === 'xs' && 'gap-1',
          gap === 'sm' && 'gap-2',
          gap === 'md' && 'gap-4',
          gap === 'lg' && 'gap-6',
          gap === 'xl' && 'gap-8',
          // Wrap
          wrap && 'flex-wrap',
          className
        )}
        {...props}
      />
    );
  }
);

Flex.displayName = 'Flex';

// Grid Component
interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 3, gap = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          cols === 1 && 'grid-cols-1',
          cols === 2 && 'grid-cols-1 md:grid-cols-2',
          cols === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          cols === 4 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
          cols === 5 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
          cols === 6 && 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
          // Gap
          gap === 'none' && 'gap-0',
          gap === 'xs' && 'gap-2',
          gap === 'sm' && 'gap-4',
          gap === 'md' && 'gap-6',
          gap === 'lg' && 'gap-8',
          gap === 'xl' && 'gap-10',
          className
        )}
        {...props}
      />
    );
  }
);

Grid.displayName = 'Grid';

export { Divider, Spacer, Flex, Grid };
