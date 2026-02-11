import * as React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    const initials = fallback
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex items-center justify-center rounded-full bg-slate-200 font-medium text-slate-600',
          size === 'sm' && 'h-8 w-8 text-xs',
          size === 'md' && 'h-10 w-10 text-sm',
          size === 'lg' && 'h-12 w-12 text-base',
          size === 'xl' && 'h-16 w-16 text-lg',
          className
        )}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || fallback || 'Avatar'}
            className="h-full w-full rounded-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span>{initials || '?'}</span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
