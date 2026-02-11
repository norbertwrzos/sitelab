import { Suspense } from 'react';
import Link from 'next/link';
import { getLeadStats } from '@/services/leadService';
import { getDemoRequestStats } from '@/services/demoRequestService';
import { StatsCard } from '@/components/admin';
import { Card, Button } from '@/components/ui';
import {
  Users,
  FileText,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

async function DashboardStats() {
  const [leadStats, demoStats] = await Promise.all([
    getLeadStats(),
    getDemoRequestStats(),
  ]);

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Leads"
          value={leadStats.total}
          subtitle={`${leadStats.thisMonth} this month`}
          icon={Users}
        />
        <StatsCard
          title="New Leads"
          value={leadStats.new}
          subtitle="Awaiting contact"
          icon={Clock}
        />
        <StatsCard
          title="Demo Requests"
          value={demoStats.total}
          subtitle={`${demoStats.pending} pending`}
          icon={FileText}
        />
        <StatsCard
          title="Conversion Rate"
          value={`${demoStats.conversionRate}%`}
          subtitle="From demos"
          icon={TrendingUp}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Demos */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Pending Demos
            </h3>
            <Link href="/admin/demo-requests?status=PENDING">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="space-y-3">
            {demoStats.pending > 0 ? (
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    {demoStats.pending} demo{demoStats.pending !== 1 ? 's' : ''} pending
                  </p>
                  <p className="text-sm text-slate-500">
                    Need to be completed within 24 hours
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">All caught up!</p>
                  <p className="text-sm text-slate-500">
                    No pending demo requests
                  </p>
                </div>
              </div>
            )}

            {demoStats.inProgress > 0 && (
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-full">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    {demoStats.inProgress} in progress
                  </p>
                  <p className="text-sm text-slate-500">Currently being built</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* New Leads */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">
              New Leads
            </h3>
            <Link href="/admin/leads?status=NEW">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="space-y-3">
            {leadStats.new > 0 ? (
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">
                    {leadStats.new} new lead{leadStats.new !== 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-slate-500">
                    Awaiting first contact
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">All leads contacted!</p>
                  <p className="text-sm text-slate-500">
                    Great job staying on top of leads
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <p className="text-2xl font-bold text-slate-900">
                  {leadStats.qualified}
                </p>
                <p className="text-sm text-slate-500">Qualified</p>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {leadStats.converted}
                </p>
                <p className="text-sm text-slate-500">Converted</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

function DashboardSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-24 mb-4" />
            <div className="h-8 bg-slate-200 rounded w-16" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-32 mb-4" />
            <div className="h-20 bg-slate-100 rounded" />
          </div>
        ))}
      </div>
    </>
  );
}

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Welcome back! Here's an overview of your business.
        </p>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardStats />
      </Suspense>
    </div>
  );
}
