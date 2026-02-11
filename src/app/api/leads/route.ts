import { NextRequest, NextResponse } from 'next/server';
import { verifyCaptcha } from '@/lib/captcha';
import { leadSchema } from '@/lib/validations';
import { createLead, getLeads } from '@/services/leadService';

/**
 * POST /api/leads
 * Create a new lead from form submission
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
    const validationResult = leadSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    // Determine source from request
    const referer = request.headers.get('referer') || '';
    let source = body.source || 'website';
    if (referer.includes('/contact')) source = 'contact_page';
    else if (referer.includes('/#')) source = 'homepage_cta';

    // Create lead
    const lead = await createLead({
      name: validationResult.data.name,
      email: validationResult.data.email,
      businessType: validationResult.data.businessType,
      message: validationResult.data.message,
      source,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your interest! We\'ll be in touch soon.',
        leadId: lead.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Lead creation error:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/leads
 * Get all leads (admin only - TODO: add auth)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as any;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const { leads, total } = await getLeads({
      status: status || undefined,
      limit,
      offset,
    });

    return NextResponse.json({ leads, total, limit, offset });
  } catch (error) {
    console.error('Get leads error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
