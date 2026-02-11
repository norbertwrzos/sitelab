import { NextResponse } from 'next/server';
import { getLeadStats } from '@/services/leadService';
import { getDemoRequestStats } from '@/services/demoRequestService';

/**
 * GET /api/stats
 * Get dashboard statistics (admin only - TODO: add auth)
 */
export async function GET() {
  try {
    const [leadStats, demoStats] = await Promise.all([
      getLeadStats(),
      getDemoRequestStats(),
    ]);

    return NextResponse.json({
      leads: leadStats,
      demoRequests: demoStats,
      summary: {
        totalLeads: leadStats.total,
        totalDemoRequests: demoStats.total,
        pendingDemos: demoStats.pending,
        conversionRate: demoStats.conversionRate,
        newLeadsThisMonth: leadStats.thisMonth,
        demosThisMonth: demoStats.thisMonth,
      },
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
