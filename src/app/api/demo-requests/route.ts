import { NextRequest, NextResponse } from 'next/server';
import { verifyCaptcha } from '@/lib/captcha';
import { demoRequestSchema } from '@/lib/validations';
import { createDemoRequest, getDemoRequests } from '@/services/demoRequestService';

/**
 * POST /api/demo-requests
 * Create a new demo request
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Verify captcha token
    const captchaToken = body.captchaToken;
    if (!captchaToken) {
      return NextResponse.json(
        { error: 'Captcha verification required' },
        { status: 400 }
      );
    }

    const captchaValid = await verifyCaptcha(captchaToken);
    if (!captchaValid) {
      return NextResponse.json(
        { error: 'Captcha verification failed' },
        { status: 400 }
      );
    }

    // Validate input
    const validationResult = demoRequestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    // Create demo request
    const demoRequest = await createDemoRequest({
      name: validationResult.data.name,
      email: validationResult.data.email,
      businessName: validationResult.data.businessName,
      businessType: validationResult.data.businessType,
      websiteGoals: validationResult.data.websiteGoals,
      currentWebsite: validationResult.data.currentWebsite,
      phone: validationResult.data.phone,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your demo request has been received! Check your email for confirmation. We\'ll have your preview ready within 24 hours.',
        requestId: demoRequest.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Demo request creation error:', error);
    return NextResponse.json(
      { error: 'Failed to submit demo request. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/demo-requests
 * Get all demo requests (admin only - TODO: add auth)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as any;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const { demoRequests, total } = await getDemoRequests({
      status: status || undefined,
      limit,
      offset,
    });

    return NextResponse.json({ demoRequests, total, limit, offset });
  } catch (error) {
    console.error('Get demo requests error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch demo requests' },
      { status: 500 }
    );
  }
}
