'use client';

import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { Card, Button, Input, Alert } from '@/components/ui';
import { User, Lock, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">
          Manage your account and preferences
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {message && (
          <Alert variant={message.type}>
            {message.text}
          </Alert>
        )}

        {/* Profile Section */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary-100 rounded-lg">
              <User className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Profile</h2>
              <p className="text-sm text-slate-500">Your account information</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Name
              </label>
              <p className="text-slate-900">{session?.user?.name || 'Admin'}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <p className="text-slate-900">{session?.user?.email || 'admin@sitelab.com'}</p>
            </div>
          </div>
        </Card>

        {/* Security Section */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Lock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Security</h2>
              <p className="text-sm text-slate-500">Account security settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600">
                Password changes are currently managed through the database.
                Contact your system administrator to update your password.
              </p>
            </div>
          </div>
        </Card>

        {/* Sign Out */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-100 rounded-lg">
              <LogOut className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Sign Out</h2>
              <p className="text-sm text-slate-500">End your current session</p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleSignOut}
            loading={isLoading}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </Card>
      </div>
    </div>
  );
}
