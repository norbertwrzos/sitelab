'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Section, SectionHeader, Card, Avatar } from '@/components/ui';

const testimonials = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'Founder',
    company: 'Bloom Boutique',
    content:
      'I was blown away when I received my demo in less than 24 hours. The design perfectly captured my brand aesthetic. My online sales have tripled since launching!',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    rating: 5,
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    role: 'CEO',
    company: 'TechStart Solutions',
    content:
      'As a startup founder, I needed a professional website fast. SiteLab delivered beyond expectations. The demo convinced me instantly, and the final result is stunning.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5,
  },
  {
    id: '3',
    name: 'Emily Chen',
    role: 'Owner',
    company: 'Golden Gate Law',
    content:
      'Other agencies quoted weeks and thousands more. SiteLab gave me a demo overnight and the quality was exceptional. My firm now gets 3x more inquiries online.',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  return (
    <Section background="white" padding="xl">
      <SectionHeader
        badge="Testimonials"
        title="Loved by businesses everywhere"
        subtitle="Don't just take our word for it. Here's what our clients have to say about working with SiteLab."
      />

      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card variant="elevated" padding="lg" className="h-full relative">
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary-100" />

              {/* Rating */}
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="mt-4 text-slate-600 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-6">
                <Avatar
                  src={testimonial.avatarUrl}
                  fallback={testimonial.name}
                  size="lg"
                />
                <div>
                  <p className="font-semibold text-slate-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export { Testimonials };
