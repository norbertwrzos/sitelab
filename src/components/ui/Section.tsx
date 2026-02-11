import * as React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  background?: 'white' | 'gray' | 'gradient' | 'dark';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      containerSize = 'lg',
      background = 'white',
      padding = 'lg',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          // Padding
          padding === 'sm' && 'py-8 md:py-12',
          padding === 'md' && 'py-12 md:py-16',
          padding === 'lg' && 'py-16 md:py-24',
          padding === 'xl' && 'py-20 md:py-32',
          // Background
          background === 'white' && 'bg-white',
          background === 'gray' && 'bg-slate-50',
          background === 'gradient' &&
            'bg-gradient-to-br from-primary-50 via-white to-accent-50',
          background === 'dark' && 'bg-slate-900 text-white',
          className
        )}
        {...props}
      >
        <Container size={containerSize}>{children}</Container>
      </section>
    );
  }
);

Section.displayName = 'Section';

// Section Header component for consistent section titles
interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center';
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, subtitle, badge, align = 'center', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mb-12 md:mb-16',
          align === 'center' && 'text-center',
          className
        )}
        {...props}
      >
        {badge && (
          <span className="mb-4 inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700">
            {badge}
          </span>
        )}
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              'mt-4 text-lg text-slate-600 md:text-xl',
              align === 'center' && 'mx-auto max-w-3xl'
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';

export { Section, SectionHeader };
