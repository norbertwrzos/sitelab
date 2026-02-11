'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  ExternalLink,
} from 'lucide-react';

const navItems = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Leads',
    href: '/admin/leads',
    icon: Users,
  },
  {
    label: 'Demo Requests',
    href: '/admin/demo-requests',
    icon: FileText,
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 hidden lg:block">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Link href="/admin" className="text-xl font-bold text-white">
          Site<span className="text-primary-400">Lab</span>
        </Link>
        <span className="ml-2 text-xs bg-primary-500/20 text-primary-400 px-2 py-0.5 rounded">
          Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/admin' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-500 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* View Site Link */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          View Website
        </Link>
      </div>
    </aside>
  );
}
