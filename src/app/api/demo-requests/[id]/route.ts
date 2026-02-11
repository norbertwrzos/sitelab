import { NextRequest, NextResponse } from 'next/server';
import {
  getDemoRequestById,
  updateDemoRequest,
  deleteDemoRequest,
  markDemoDelivered,
} from '@/services/demoRequestService';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/demo-requests/[id]
 * Get a single demo request by ID
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const demoRequest = await getDemoRequestById(id);

    if (!demoRequest) {
      return NextResponse.json(
        { error: 'Demo request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ demoRequest });
  } catch (error) {
    console.error('Get demo request error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch demo request' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/demo-requests/[id]
 * Update a demo request (e.g., change status, add demo URL)
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if demo request exists
    const existingRequest = await getDemoRequestById(id);
    if (!existingRequest) {
      return NextResponse.json(
        { error: 'Demo request not found' },
        { status: 404 }
      );
    }

    // If marking as delivered with a demo URL, use special handler
    if (body.status === 'DELIVERED' && body.demoUrl) {
      const demoRequest = await markDemoDelivered(id, body.demoUrl);
      return NextResponse.json({ demoRequest });
    }

    // Regular update
    const demoRequest = await updateDemoRequest(id, {
      status: body.status,
      demoUrl: body.demoUrl,
    });

    return NextResponse.json({ demoRequest });
  } catch (error) {
    console.error('Update demo request error:', error);
    return NextResponse.json(
      { error: 'Failed to update demo request' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/demo-requests/[id]
 * Delete a demo request
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Check if demo request exists
    const existingRequest = await getDemoRequestById(id);
    if (!existingRequest) {
      return NextResponse.json(
        { error: 'Demo request not found' },
        { status: 404 }
      );
    }

    await deleteDemoRequest(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete demo request error:', error);
    return NextResponse.json(
      { error: 'Failed to delete demo request' },
      { status: 500 }
    );
  }
}
