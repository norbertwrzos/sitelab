'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { Button, Container } from '@/components/ui';

const CTASection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-20 md:py-28">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(14,165,233,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
      </div>

      {/* Animated Gradient Border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

      <Container>
        <div className="relative mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-400 ring-1 ring-primary-500/20">
              <Sparkles className="h-4 w-4" />
              Limited availability this month
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="mt-8 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Ready to see your website
            <br />
            <span className="gradient-text">come to life?</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="mt-6 text-lg text-slate-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Get a custom demo of your website in 24 hours. No commitment, no payment
            required. Love it? We'll build it. Not convinced? No hard feelings.
          </motion.p>

          {/* Timer Badge */}
          <motion.div
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-white ring-1 ring-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Clock className="h-5 w-5 text-primary-400" />
            <span className="text-sm">
              Average demo delivery: <strong>18 hours</strong>
            </span>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/contact">
              <Button
                variant="primary"
                size="xl"
                rightIcon={<ArrowRight className="h-5 w-5" />}
                className="shadow-xl shadow-primary-500/30"
              >
                Get Your Free 24hr Demo
              </Button>
            </Link>
          </motion.div>

          {/* Trust Text */}
          <motion.p
            className="mt-6 text-sm text-slate-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Join 150+ businesses that launched with SiteLab
          </motion.p>
        </div>
      </Container>
    </section>
  );
};

export { CTASection };
