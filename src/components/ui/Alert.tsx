import * as React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const alertIcons: Record<AlertVariant, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5 text-success-500" />,
  error: <XCircle className="h-5 w-5 text-error-500" />,
  warning: <AlertCircle className="h-5 w-5 text-amber-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
};

const alertStyles: Record<AlertVariant, string> = {
  success: 'bg-success-50 border-success-200 text-success-800',
  error: 'bg-error-50 border-error-200 text-error-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'info',
      title,
      dismissible,
      onDismiss,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative flex gap-3 rounded-xl border p-4',
          alertStyles[variant],
          className
        )}
        {...props}
      >
        <div className="flex-shrink-0">{alertIcons[variant]}</div>
        <div className="flex-1">
          {title && <h5 className="mb-1 font-medium">{title}</h5>}
          <div className="text-sm opacity-90">{children}</div>
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            className="flex-shrink-0 rounded-lg p-1 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert };
