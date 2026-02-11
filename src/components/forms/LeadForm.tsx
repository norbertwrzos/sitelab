'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Send, CheckCircle } from 'lucide-react';
import { leadSchema, type LeadFormData, businessTypes } from '@/lib/validations';
import { Button, Input, Textarea, Select, Alert } from '@/components/ui';

interface LeadFormProps {
  source?: string;
  showBusinessType?: boolean;
  showMessage?: boolean;
  buttonText?: string;
  compact?: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({
  source = 'lead_form',
  showBusinessType = true,
  showMessage = true,
  buttonText = 'Get Started',
  compact = false,
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const captchaRef = React.useRef<HCaptcha>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: '',
      email: '',
      businessType: '',
      message: '',
      captchaToken: '',
    },
  });

  const onCaptchaVerify = (token: string) => {
    setValue('captchaToken', token);
  };

  const onCaptchaExpire = () => {
    setValue('captchaToken', '');
  };

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, source }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      setSubmitStatus('success');
      reset();
      captchaRef.current?.resetCaptcha();
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Failed to submit form'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className={`rounded-2xl bg-success-50 p-6 text-center ${compact ? '' : 'p-8'}`}>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success-100">
          <CheckCircle className="h-6 w-6 text-success-600" />
        </div>
        <h3 className="mt-3 text-lg font-semibold text-slate-900">
          Thank You!
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          We've received your message and will be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {submitStatus === 'error' && (
        <Alert
          variant="error"
          dismissible
          onDismiss={() => setSubmitStatus('idle')}
        >
          {errorMessage}
        </Alert>
      )}

      <div className={compact ? 'space-y-4' : 'grid gap-4 sm:grid-cols-2'}>
        <Input
          label={compact ? undefined : 'Name'}
          placeholder="Your name"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label={compact ? undefined : 'Email'}
          type="email"
          placeholder="you@email.com"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      {showBusinessType && (
        <Select
          label={compact ? undefined : 'Business Type'}
          placeholder="Select your industry"
          options={businessTypes.map((bt) => ({
            value: bt.value,
            label: bt.label,
          }))}
          error={errors.businessType?.message}
          {...register('businessType')}
        />
      )}

      {showMessage && (
        <Textarea
          label={compact ? undefined : 'Message'}
          placeholder="Tell us about your project..."
          rows={compact ? 3 : 4}
          error={errors.message?.message}
          {...register('message')}
        />
      )}

      {/* hCaptcha */}
      <div>
        <HCaptcha
          ref={captchaRef}
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || '10000000-ffff-ffff-ffff-000000000001'}
          onVerify={onCaptchaVerify}
          onExpire={onCaptchaExpire}
          size={compact ? 'compact' : 'normal'}
        />
        {errors.captchaToken && (
          <p className="mt-2 text-sm text-error-500">
            {errors.captchaToken.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size={compact ? 'md' : 'lg'}
        fullWidth
        isLoading={isSubmitting}
        rightIcon={<Send className="h-4 w-4" />}
      >
        {buttonText}
      </Button>
    </form>
  );
};

export { LeadForm };
