'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Send, CheckCircle } from 'lucide-react';
import {
  demoRequestSchema,
  type DemoRequestFormData,
  businessTypes,
} from '@/lib/validations';
import { Button, Input, Textarea, Select, Alert } from '@/components/ui';

const DemoRequestForm: React.FC = () => {
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
  } = useForm<DemoRequestFormData>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      businessName: '',
      businessType: '',
      websiteGoals: '',
      currentWebsite: '',
      phone: '',
      captchaToken: '',
    },
  });

  const onCaptchaVerify = (token: string) => {
    setValue('captchaToken', token);
  };

  const onCaptchaExpire = () => {
    setValue('captchaToken', '');
  };

  const onSubmit = async (data: DemoRequestFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/demo-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
      <div className="rounded-2xl bg-success-50 p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-100">
          <CheckCircle className="h-8 w-8 text-success-600" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-slate-900">
          Request Submitted!
        </h3>
        <p className="mt-2 text-slate-600">
          Thank you for your interest! We've received your demo request and will
          have your custom preview ready within 24 hours. Check your email for
          confirmation.
        </p>
        <Button
          variant="primary"
          className="mt-6"
          onClick={() => setSubmitStatus('idle')}
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitStatus === 'error' && (
        <Alert
          variant="error"
          title="Submission Failed"
          dismissible
          onDismiss={() => setSubmitStatus('idle')}
        >
          {errorMessage}
        </Alert>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Your Name *"
          placeholder="John Smith"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Email Address *"
          type="email"
          placeholder="john@company.com"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Business Name *"
          placeholder="Your Company Inc."
          error={errors.businessName?.message}
          {...register('businessName')}
        />
        <Select
          label="Business Type *"
          placeholder="Select your industry"
          options={businessTypes.map((bt) => ({
            value: bt.value,
            label: bt.label,
          }))}
          error={errors.businessType?.message}
          {...register('businessType')}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
          hint="Optional - for faster communication"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <Input
          label="Current Website"
          type="url"
          placeholder="https://yoursite.com"
          hint="If you have an existing site"
          error={errors.currentWebsite?.message}
          {...register('currentWebsite')}
        />
      </div>

      <Textarea
        label="Website Goals"
        placeholder="Tell us about your business, target audience, and what you'd like your website to achieve..."
        hint="The more details you provide, the better we can tailor your demo"
        rows={4}
        error={errors.websiteGoals?.message}
        {...register('websiteGoals')}
      />

      {/* hCaptcha */}
      <div>
        <HCaptcha
          ref={captchaRef}
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || '10000000-ffff-ffff-ffff-000000000001'}
          onVerify={onCaptchaVerify}
          onExpire={onCaptchaExpire}
        />
        {errors.captchaToken && (
          <p className="mt-2 text-sm text-error-500">
            {errors.captchaToken.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          * Required fields. We'll never share your information.
        </p>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          rightIcon={<Send className="h-4 w-4" />}
        >
          Request My Demo
        </Button>
      </div>
    </form>
  );
};

export { DemoRequestForm };
