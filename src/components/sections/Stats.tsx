'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';
import { Section } from '@/components/ui';

const Stats: React.FC = () => {
  return (
    <Section background="gradient" padding="lg">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {siteConfig.stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
          >
            <motion.div
              className="text-4xl font-bold text-primary-600 md:text-5xl lg:text-6xl"
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: 'spring' }}
            >
              {stat.value}
            </motion.div>
            <p className="mt-2 text-sm text-slate-600 md:text-base">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export { Stats };
