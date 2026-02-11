'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button, Avatar } from '@/components/ui';
import {
  Menu,
  X,
  LogOut,
  User,
  LayoutDashboard,
  Users,
  FileText,
  Settings,
} from 'lucide-react';

interface AdminHeaderProps {
  user: {
    name: string;
    email: string;
  };
}

const mobileNavItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Leads', href: '/admin/leads', icon: Users },
  { label: 'Demo Requests', href: '/admin/demo-requests', icon: FileText },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminHeader({ user }: AdminHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile logo */}
        <Link href="/admin" className="lg:hidden text-xl font-bold text-slate-900">
          Site<span className="text-primary-500">Lab</span>
        </Link>

        {/* Spacer for desktop */}
        <div className="hidden lg:block" />

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Avatar name={user.name} size="sm" />
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
          </button>

          {/* Dropdown */}
          {userMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setUserMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-20">
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <nav className="lg:hidden bg-white border-t border-slate-200 py-2 px-4">
          {mobileNavItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/admin' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium',
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-slate-600 hover:bg-slate-100'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
