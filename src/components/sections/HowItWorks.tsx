'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Palette, Rocket, ThumbsUp } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui';

const steps = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Tell Us About Your Business',
    description:
      'Fill out our quick form with your business details, goals, and preferences. It takes less than 5 minutes.',
  },
  {
    number: '02',
    icon: Palette,
    title: 'We Design Your Demo',
    description:
      'Our team creates a custom website preview tailored to your brand. You\'ll receive it within 24 hours.',
  },
  {
    number: '03',
    icon: ThumbsUp,
    title: 'Review & Approve',
    description:
      'Love your demo? Great! We\'ll finalize the design. Want changes? We\'ll refine it until it\'s perfect.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch & Grow',
    description:
      'We deploy your website with hosting, SSL, and SEO. Start attracting clients and growing your business.',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <Section background="gray" padding="xl">
      <SectionHeader
        badge="How It Works"
        title="From idea to live website in 4 simple steps"
        subtitle="We've simplified the entire process so you can go from zero to a professional website without any technical hassle."
      />

      <div className="relative">
        {/* Connection Line (Desktop) */}
        <div className="absolute left-0 right-0 top-24 hidden h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 lg:block" />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Step Card */}
              <div className="relative rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/50">
                {/* Number Badge */}
                <div className="absolute -top-4 left-6 flex h-8 w-12 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50">
                  <step.icon className="h-8 w-8 text-primary-600" />
                </div>

                {/* Content */}
                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow (Mobile/Tablet) */}
              {index < steps.length - 1 && (
                <div className="my-4 flex justify-center lg:hidden">
                  <svg
                    className="h-8 w-8 text-primary-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export { HowItWorks };
