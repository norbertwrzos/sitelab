/**
 * hCaptcha Verification Service
 * Verifies captcha tokens server-side
 */

interface HCaptchaVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

export async function verifyCaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.HCAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error('HCAPTCHA_SECRET_KEY is not configured');
    // In development, allow bypass if no key configured
    if (process.env.NODE_ENV === 'development') {
      console.warn('Bypassing captcha verification in development');
      return true;
    }
    return false;
  }

  try {
    const response = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const data: HCaptchaVerifyResponse = await response.json();

    if (!data.success) {
      console.error('hCaptcha verification failed:', data['error-codes']);
      return false;
    }

    return true;
  } catch (error) {
    console.error('hCaptcha verification error:', error);
    return false;
  }
}
