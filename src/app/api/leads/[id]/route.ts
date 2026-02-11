import { NextRequest, NextResponse } from 'next/server';
import { getLeadById, updateLead, deleteLead } from '@/services/leadService';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/leads/[id]
 * Get a single lead by ID
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const lead = await getLeadById(id);

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ lead });
  } catch (error) {
    console.error('Get lead error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lead' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/leads/[id]
 * Update a lead (e.g., change status)
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if lead exists
    const existingLead = await getLeadById(id);
    if (!existingLead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Update lead
    const lead = await updateLead(id, {
      status: body.status,
    });

    return NextResponse.json({ lead });
  } catch (error) {
    console.error('Update lead error:', error);
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/leads/[id]
 * Delete a lead
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Check if lead exists
    const existingLead = await getLeadById(id);
    if (!existingLead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    await deleteLead(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete lead error:', error);
    return NextResponse.json(
      { error: 'Failed to delete lead' },
      { status: 500 }
    );
  }
}
