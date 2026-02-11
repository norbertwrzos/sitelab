'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Section, SectionHeader, Card, Badge, Button } from '@/components/ui';

// Sample portfolio data (in production, this would come from the database)
const portfolioItems = [
  {
    id: '1',
    title: 'Modern E-Commerce Platform',
    clientName: 'TechGear Store',
    industry: 'E-Commerce',
    imageUrl: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80',
    outcome: '+65% revenue growth',
  },
  {
    id: '2',
    title: 'Professional Services Website',
    clientName: 'Martinez Law Firm',
    industry: 'Legal',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    outcome: '+300% inquiries',
  },
  {
    id: '3',
    title: 'Restaurant & Ordering System',
    clientName: 'Bella Italia',
    industry: 'Restaurant',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    outcome: '40% online orders',
  },
];

const PortfolioPreview: React.FC = () => {
  return (
    <Section background="gray" padding="xl">
      <SectionHeader
        badge="Our Work"
        title="Websites that deliver results"
        subtitle="See how we've helped businesses like yours achieve their goals with stunning, high-converting websites."
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {portfolioItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card variant="default" padding="none" hover className="group overflow-hidden">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 transition-opacity group-hover:opacity-100">
                  <Badge variant="primary">{item.outcome}</Badge>
                  <ExternalLink className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <Badge variant="outline" size="sm" className="mb-3">
                  {item.industry}
                </Badge>
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{item.clientName}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View All Link */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link href="/portfolio">
          <Button
            variant="outline"
            size="lg"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            View All Projects
          </Button>
        </Link>
      </motion.div>
    </Section>
  );
};

export { PortfolioPreview };
