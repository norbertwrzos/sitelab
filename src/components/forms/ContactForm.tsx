'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Send, CheckCircle } from 'lucide-react';
import { contactSchema, type ContactFormData } from '@/lib/validations';
import { Button, Input, Textarea, Alert } from '@/components/ui';

const ContactForm: React.FC = () => {
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
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
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

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
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
          Message Sent!
        </h3>
        <p className="mt-2 text-slate-600">
          Thank you for reaching out! We'll get back to you within 24 hours.
        </p>
        <Button
          variant="primary"
          className="mt-6"
          onClick={() => setSubmitStatus('idle')}
        >
          Send Another Message
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
          label="Your Name"
          placeholder="John Smith"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="john@company.com"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <Input
        label="Subject"
        placeholder="What's this about?"
        error={errors.subject?.message}
        {...register('subject')}
      />

      <Textarea
        label="Message"
        placeholder="Tell us how we can help..."
        rows={5}
        error={errors.message?.message}
        {...register('message')}
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

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        rightIcon={<Send className="h-4 w-4" />}
      >
        Send Message
      </Button>
    </form>
  );
};

export { ContactForm };
