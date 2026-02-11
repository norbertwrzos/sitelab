import { NextRequest, NextResponse } from 'next/server';
import { verifyCaptcha } from '@/lib/captcha';
import { contactSchema } from '@/lib/validations';
import { sendEmail, ADMIN_EMAIL } from '@/lib/email';

export const dynamic = 'force-dynamic';

/**
 * POST /api/contact
 * Handle contact form submissions
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
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validationResult.data;

    // Send email notification to admin
    const adminHtml = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"></head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden;">
                  <tr>
                    <td style="background-color: #0f172a; padding: 30px 40px;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px;">📧 New Contact Message</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                            <strong style="color: #64748b;">From:</strong><br>
                            <span style="color: #0f172a;">${name}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                            <strong style="color: #64748b;">Email:</strong><br>
                            <a href="mailto:${email}" style="color: #0ea5e9;">${email}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                            <strong style="color: #64748b;">Subject:</strong><br>
                            <span style="color: #0f172a;">${subject}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0;">
                            <strong style="color: #64748b;">Message:</strong><br>
                            <div style="margin-top: 8px; padding: 16px; background-color: #f8fafc; border-radius: 8px; color: #0f172a; white-space: pre-wrap;">${message}</div>
                          </td>
                        </tr>
                      </table>
                      <div style="margin-top: 24px;">
                        <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background-color: #0ea5e9; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                          Reply to ${name}
                        </a>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    // Send notification to admin
    const adminResult = await sendEmail({
      to: ADMIN_EMAIL,
      subject: `Contact Form: ${subject}`,
      html: adminHtml,
      replyTo: email,
    });

    if (!adminResult.success) {
      console.error('Failed to send admin notification:', adminResult.error);
    }

    // Send auto-reply to user
    const userHtml = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"></head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden;">
                  <tr>
                    <td style="background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); padding: 40px 40px 30px;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">SiteLab</h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 40px;">
                      <h2 style="margin: 0 0 20px; color: #0f172a; font-size: 24px;">We Got Your Message! 👋</h2>
                      <p style="margin: 0 0 20px; color: #475569; font-size: 16px; line-height: 1.6;">
                        Hi ${name},
                      </p>
                      <p style="margin: 0 0 20px; color: #475569; font-size: 16px; line-height: 1.6;">
                        Thank you for reaching out to SiteLab! We've received your message and will get back to you as soon as possible, typically within 24 hours.
                      </p>
                      <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; margin: 24px 0;">
                        <p style="margin: 0 0 8px; color: #64748b; font-size: 14px;"><strong>Your message:</strong></p>
                        <p style="margin: 0; color: #0f172a; font-size: 14px; font-style: italic;">"${message.substring(0, 200)}${message.length > 200 ? '...' : ''}"</p>
                      </div>
                      <p style="margin: 0 0 20px; color: #475569; font-size: 16px; line-height: 1.6;">
                        In the meantime, you might want to check out our <a href="${process.env.NEXT_PUBLIC_APP_URL}/portfolio" style="color: #0ea5e9; text-decoration: none;">portfolio</a> to see examples of our work.
                      </p>
                      <p style="margin: 0; color: #475569; font-size: 16px; line-height: 1.6;">
                        Best,<br>
                        <strong>The SiteLab Team</strong>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #f8fafc; padding: 24px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
                      <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                        © ${new Date().getFullYear()} SiteLab. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    const userResult = await sendEmail({
      to: email,
      subject: 'Thanks for Contacting SiteLab!',
      html: userHtml,
    });

    if (!userResult.success) {
      console.error('Failed to send user auto-reply:', userResult.error);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
