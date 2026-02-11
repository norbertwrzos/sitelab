import { Resend } from 'resend';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
const EMAIL_FROM = process.env.EMAIL_FROM || 'SiteLab <hello@sitelab.com>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@sitelab.com';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

/**
 * Send an email using Resend
 */
export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      reply_to: options.replyTo,
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    console.error('Email service error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    };
  }
}

/**
 * Send demo request confirmation to user
 */
export async function sendDemoRequestConfirmation(data: {
  name: string;
  email: string;
  businessName: string;
}): Promise<{ success: boolean; error?: string }> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Demo Request Received</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); padding: 40px 40px 30px;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">SiteLab</h1>
                  </td>
                </tr>
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="margin: 0 0 20px; color: #0f172a; font-size: 24px;">Your Demo is on the Way! 🚀</h2>
                    <p style="margin: 0 0 20px; color: #475569; font-size: 16px; line-height: 1.6;">
                      Hi ${data.name},
                    </p>
                    <p style="margin: 0 0 20px; color: #475569; font-size: 16px; line-height: 1.6;">
                      Thank you for requesting a demo for <strong>${data.businessName}</strong>! We're excited to create something amazing for you.
                    </p>
                    <div style="background-color: #f0f9ff; border-radius: 12px; padding: 24px; margin: 24px 0;">
                      <h3 style="margin: 0 0 16px; color: #0369a1; font-size: 18px;">What happens next?</h3>
                      <ol style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px; line-height: 1.8;">
                        <li>Our team reviews your submission</li>
                        <li>We design a custom preview for your business</li>
                        <li>You'll receive your demo link within <strong>24 hours</strong></li>
                        <li>Review it and let us know what you think!</li>
                      </ol>
                    </div>
                    <p style="margin: 0 0 20px; color: #475569; font-size: 16px; line-height: 1.6;">
                      If you have any questions in the meantime, just reply to this email.
                    </p>
                    <p style="margin: 0; color: #475569; font-size: 16px; line-height: 1.6;">
                      Best,<br>
                      <strong>The SiteLab Team</strong>
                    </p>
                  </td>
                </tr>
                <!-- Footer -->
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

  const text = `
    Hi ${data.name},

    Thank you for requesting a demo for ${data.businessName}! We're excited to create something amazing for you.

    What happens next?
    1. Our team reviews your submission
    2. We design a custom preview for your business
    3. You'll receive your demo link within 24 hours
    4. Review it and let us know what you think!

    If you have any questions in the meantime, just reply to this email.

    Best,
    The SiteLab Team
  `;

  return sendEmail({
    to: data.email,
    subject: "🚀 Your SiteLab Demo is on the Way!",
    html,
    text,
  });
}

/**
 * Send lead confirmation to user
 */
export async function sendLeadConfirmation(data: {
  name: string;
  email: string;
}): Promise<{ success: boolean; error?: string }> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
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
                    <h2 style="margin: 0 0 20px; color: #0f172a; font-size: 24px;">Thanks for Reaching Out!</h2>
                    <p style="margin: 0 0 20px; color: #475569; font-size: 16px; line-height: 1.6;">
                      Hi ${data.name},
                    </p>
                    <p style="margin: 0 0 20px; color: #475569; font-size: 16px; line-height: 1.6;">
                      We've received your message and will get back to you within 24 hours.
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

  return sendEmail({
    to: data.email,
    subject: "Thanks for Contacting SiteLab!",
    html,
  });
}

/**
 * Send admin notification for new demo request
 */
export async function sendAdminDemoNotification(data: {
  id: string;
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  websiteGoals?: string | null;
  currentWebsite?: string | null;
  phone?: string | null;
}): Promise<{ success: boolean; error?: string }> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden;">
                <tr>
                  <td style="background-color: #0f172a; padding: 30px 40px;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px;">🎉 New Demo Request!</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                          <strong style="color: #64748b;">Request ID:</strong><br>
                          <span style="color: #0f172a;">${data.id}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                          <strong style="color: #64748b;">Name:</strong><br>
                          <span style="color: #0f172a;">${data.name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                          <strong style="color: #64748b;">Email:</strong><br>
                          <a href="mailto:${data.email}" style="color: #0ea5e9;">${data.email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                          <strong style="color: #64748b;">Business:</strong><br>
                          <span style="color: #0f172a;">${data.businessName}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                          <strong style="color: #64748b;">Industry:</strong><br>
                          <span style="color: #0f172a;">${data.businessType}</span>
                        </td>
                      </tr>
                      ${data.phone ? `
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                          <strong style="color: #64748b;">Phone:</strong><br>
                          <span style="color: #0f172a;">${data.phone}</span>
                        </td>
                      </tr>
                      ` : ''}
                      ${data.currentWebsite ? `
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                          <strong style="color: #64748b;">Current Website:</strong><br>
                          <a href="${data.currentWebsite}" style="color: #0ea5e9;">${data.currentWebsite}</a>
                        </td>
                      </tr>
                      ` : ''}
                      ${data.websiteGoals ? `
                      <tr>
                        <td style="padding: 12px 0;">
                          <strong style="color: #64748b;">Goals:</strong><br>
                          <span style="color: #0f172a;">${data.websiteGoals}</span>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                    <div style="margin-top: 24px;">
                      <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/demo-requests" style="display: inline-block; background-color: #0ea5e9; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                        View in Dashboard
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

  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `🎉 New Demo Request: ${data.businessName}`,
    html,
    replyTo: data.email,
  });
}

/**
 * Send admin notification for new lead
 */
export async function sendAdminLeadNotification(data: {
  id: string;
  name: string;
  email: string;
  businessType?: string | null;
  message?: string | null;
  source: string;
}): Promise<{ success: boolean; error?: string }> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden;">
                <tr>
                  <td style="background-color: #0f172a; padding: 30px 40px;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px;">📬 New Lead Captured!</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                          <strong style="color: #64748b;">Source:</strong><br>
                          <span style="color: #0f172a;">${data.source}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                          <strong style="color: #64748b;">Name:</strong><br>
                          <span style="color: #0f172a;">${data.name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                          <strong style="color: #64748b;">Email:</strong><br>
                          <a href="mailto:${data.email}" style="color: #0ea5e9;">${data.email}</a>
                        </td>
                      </tr>
                      ${data.businessType ? `
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                          <strong style="color: #64748b;">Industry:</strong><br>
                          <span style="color: #0f172a;">${data.businessType}</span>
                        </td>
                      </tr>
                      ` : ''}
                      ${data.message ? `
                      <tr>
                        <td style="padding: 12px 0;">
                          <strong style="color: #64748b;">Message:</strong><br>
                          <span style="color: #0f172a;">${data.message}</span>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                    <div style="margin-top: 24px;">
                      <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/leads" style="display: inline-block; background-color: #0ea5e9; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                        View in Dashboard
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

  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `📬 New Lead: ${data.name}`,
    html,
    replyTo: data.email,
  });
}

export { ADMIN_EMAIL, EMAIL_FROM };
