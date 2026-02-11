import { cn } from '@/lib/utils';
import type { LeadStatus, DemoStatus } from '@/types';

type Status = LeadStatus | DemoStatus;

const statusConfig: Record<Status, { label: string; className: string }> = {
  // Lead statuses
  NEW: {
    label: 'New',
    className: 'bg-blue-100 text-blue-700',
  },
  CONTACTED: {
    label: 'Contacted',
    className: 'bg-yellow-100 text-yellow-700',
  },
  QUALIFIED: {
    label: 'Qualified',
    className: 'bg-purple-100 text-purple-700',
  },
  CONVERTED: {
    label: 'Converted',
    className: 'bg-green-100 text-green-700',
  },
  CLOSED: {
    label: 'Closed',
    className: 'bg-slate-100 text-slate-700',
  },
  // Demo statuses
  PENDING: {
    label: 'Pending',
    className: 'bg-orange-100 text-orange-700',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    className: 'bg-blue-100 text-blue-700',
  },
  DELIVERED: {
    label: 'Delivered',
    className: 'bg-green-100 text-green-700',
  },
  EXPIRED: {
    label: 'Expired',
    className: 'bg-red-100 text-red-700',
  },
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || {
    label: status,
    className: 'bg-slate-100 text-slate-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
