'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { Button, Container } from '@/components/ui';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.08),transparent_50%)]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-[10%] h-64 w-64 rounded-full bg-primary-400/10 blur-3xl"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-[15%] h-96 w-96 rounded-full bg-accent-400/10 blur-3xl"
          animate={{
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <Container>
        <div className="relative py-20 md:py-28 lg:py-36">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
                </span>
                See your website in 24 hours
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="mt-8 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your Website.{' '}
              <span className="gradient-text">Built in 24 Hours.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="mt-6 text-lg text-slate-600 md:text-xl lg:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Get a professional, high-converting website for your business.
              <br className="hidden sm:block" />
              No complexity. No delays. Just results.
            </motion.p>

            {/* Benefits List */}
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {[
                'Free 24-hour demo',
                'No upfront payment',
                'Custom design',
                'SEO optimized',
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success-500" />
                  <span>{benefit}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="xl"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                  className="shadow-xl shadow-primary-500/25"
                >
                  Get Your 24hr Demo
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  variant="outline"
                  size="xl"
                  leftIcon={<Play className="h-4 w-4" />}
                >
                  View Our Work
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="mt-16 border-t border-slate-200 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-sm text-slate-500">
                Trusted by 150+ businesses worldwide
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-8 opacity-50 grayscale">
                {/* Placeholder for client logos */}
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-24 rounded bg-slate-300"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export { Hero };
