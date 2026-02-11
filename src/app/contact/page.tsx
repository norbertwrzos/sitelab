import { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import {
  Section,
  Container,
  Card,
  Grid,
} from '@/components/ui';
import { DemoRequestForm } from '@/components/forms/DemoRequestForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with SiteLab. Request your free 24-hour website demo or ask us any questions about our services.',
};

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@sitelab.com',
    href: 'mailto:hello@sitelab.com',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'San Francisco, CA',
    href: null,
  },
  {
    icon: Clock,
    title: 'Response Time',
    value: 'Within 24 hours',
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <Section background="gradient" padding="lg">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700">
            Get Started
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Request your free
            <br />
            <span className="gradient-text">24-hour demo</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            Fill out the form below and we'll create a custom website preview
            for your business within 24 hours. No commitment required.
          </p>
        </div>
      </Section>

      {/* Contact Form Section */}
      <Section background="white" padding="xl">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card variant="elevated" padding="lg">
              <h2 className="text-2xl font-bold text-slate-900">
                Tell us about your project
              </h2>
              <p className="mt-2 text-slate-600">
                The more details you provide, the better we can tailor your demo.
              </p>
              <div className="mt-8">
                <DemoRequestForm />
              </div>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <Card variant="default" padding="lg">
              <h3 className="text-lg font-semibold text-slate-900">
                Contact Information
              </h3>
              <div className="mt-6 space-y-5">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                      <item.icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">{item.title}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-medium text-slate-900 hover:text-primary-600"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium text-slate-900">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="gradient" padding="lg">
              <h3 className="text-lg font-semibold text-slate-900">
                What happens next?
              </h3>
              <ol className="mt-4 space-y-4 text-sm">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                    1
                  </span>
                  <span className="text-slate-600">
                    We review your submission and gather requirements
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                    2
                  </span>
                  <span className="text-slate-600">
                    Our team creates your custom website preview
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                    3
                  </span>
                  <span className="text-slate-600">
                    You receive your demo link within 24 hours
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                    4
                  </span>
                  <span className="text-slate-600">
                    Review, request changes, or approve to proceed
                  </span>
                </li>
              </ol>
            </Card>

            <Card variant="default" padding="lg" className="bg-slate-900 text-white">
              <h3 className="text-lg font-semibold">
                Prefer a quick call?
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Schedule a 15-minute discovery call to discuss your project in detail.
              </p>
              <a
                href="#"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-400 hover:text-primary-300"
              >
                Book a call
                <ArrowRight className="h-4 w-4" />
              </a>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
