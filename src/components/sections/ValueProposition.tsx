'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Clock, Palette, Zap, Users, ArrowRight } from 'lucide-react';
import { Section, SectionHeader, Card } from '@/components/ui';

const features = [
  {
    icon: Clock,
    title: '24-Hour Demo Preview',
    description:
      'See a working preview of your custom website within 24 hours. No commitment required — only pay if you love it.',
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
  },
  {
    icon: Palette,
    title: 'Unique Custom Design',
    description:
      'No generic templates. Every website is custom-designed to capture your brand identity and stand out from competitors.',
    color: 'text-accent-600',
    bgColor: 'bg-accent-100',
  },
  {
    icon: Zap,
    title: 'Fast & Optimized',
    description:
      'Lightning-fast load times under 2 seconds. SEO optimized from day one to help you rank higher on Google.',
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
  },
  {
    icon: Users,
    title: 'Lead Generation Built-In',
    description:
      'Every website includes optimized lead capture forms and conversion-focused layouts to grow your client base.',
    color: 'text-success-600',
    bgColor: 'bg-success-50',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const ValueProposition: React.FC = () => {
  return (
    <Section background="white" padding="xl">
      <SectionHeader
        badge="Why Choose SiteLab"
        title="Everything you need to launch fast"
        subtitle="We handle the complexity so you can focus on growing your business. Here's what makes us different."
      />

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {features.map((feature) => (
          <motion.div key={feature.title} variants={itemVariants}>
            <Card
              variant="gradient"
              padding="lg"
              hover
              className="h-full group"
            >
              <div className="flex items-start gap-5">
                <div
                  className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl ${feature.bgColor} transition-transform group-hover:scale-110`}
                >
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export { ValueProposition };
