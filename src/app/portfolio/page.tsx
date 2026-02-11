'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight, Filter, X } from 'lucide-react';
import {
  Section,
  SectionHeader,
  Container,
  Card,
  Badge,
  Button,
} from '@/components/ui';

// Portfolio data - in production, this would come from the database
const portfolioItems = [
  {
    id: '1',
    title: 'Modern E-Commerce Platform',
    clientName: 'TechGear Store',
    industry: 'ecommerce',
    problem: 'TechGear Store was struggling with an outdated website that had slow load times and poor mobile experience.',
    solution: 'We designed and built a modern, fast-loading e-commerce platform with intuitive navigation and mobile-first design.',
    outcome: 'Cart abandonment decreased by 45%, mobile conversions increased by 120%.',
    imageUrl: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80',
    liveUrl: 'https://example.com',
    featured: true,
  },
  {
    id: '2',
    title: 'Professional Services Website',
    clientName: 'Martinez Law Firm',
    industry: 'service_provider',
    problem: 'Martinez Law Firm had no online presence and was losing potential clients to competitors.',
    solution: 'Created a professional, trust-building website with clear service pages and easy contact system.',
    outcome: 'Online inquiries increased by 300%, acquired 25 new clients in first month.',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    liveUrl: 'https://example.com',
    featured: true,
  },
  {
    id: '3',
    title: 'Restaurant & Ordering System',
    clientName: 'Bella Italia',
    industry: 'restaurant',
    problem: 'Bella Italia relied solely on phone orders and walk-ins, missing online ordering demand.',
    solution: 'Built a beautiful website with integrated online ordering and reservation system.',
    outcome: 'Online orders now account for 40% of total revenue.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    liveUrl: 'https://example.com',
    featured: true,
  },
  {
    id: '4',
    title: 'Healthcare Provider Portal',
    clientName: 'Wellness Medical Center',
    industry: 'healthcare',
    problem: 'Patients found it difficult to book appointments and access information online.',
    solution: 'Developed a patient-friendly website with online booking and patient portal.',
    outcome: 'Administrative call volume decreased by 60%.',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    liveUrl: 'https://example.com',
    featured: false,
  },
  {
    id: '5',
    title: 'Startup Landing Page',
    clientName: 'InnovateTech',
    industry: 'startup',
    problem: 'InnovateTech needed a compelling online presence to attract investors and users.',
    solution: 'Created a conversion-focused landing page with clear value proposition.',
    outcome: 'Secured $500K in seed funding and 1,000 beta users.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    liveUrl: 'https://example.com',
    featured: true,
  },
  {
    id: '6',
    title: 'Real Estate Showcase',
    clientName: 'Premier Properties',
    industry: 'real_estate',
    problem: 'Property listings were hard to browse and scheduling viewings was cumbersome.',
    solution: 'Built a modern website with advanced search and integrated booking.',
    outcome: 'Property inquiry rate increased by 150%.',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    liveUrl: 'https://example.com',
    featured: false,
  },
];

const industries = [
  { value: 'all', label: 'All Industries' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'service_provider', label: 'Services' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'startup', label: 'Startup' },
  { value: 'real_estate', label: 'Real Estate' },
];

export default function PortfolioPage() {
  const [selectedIndustry, setSelectedIndustry] = React.useState('all');
  const [selectedProject, setSelectedProject] = React.useState<typeof portfolioItems[0] | null>(null);

  const filteredItems = selectedIndustry === 'all'
    ? portfolioItems
    : portfolioItems.filter((item) => item.industry === selectedIndustry);

  return (
    <>
      {/* Hero Section */}
      <Section background="gradient" padding="xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700">
            Our Portfolio
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Websites that
            <br />
            <span className="gradient-text">deliver results</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 md:text-xl">
            Explore our collection of custom websites built for businesses like yours.
            Each project showcases our commitment to quality and results.
          </p>
        </div>
      </Section>

      {/* Portfolio Grid */}
      <Section background="white" padding="xl">
        {/* Filter */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          {industries.map((industry) => (
            <button
              key={industry.value}
              onClick={() => setSelectedIndustry(industry.value)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                selectedIndustry === industry.value
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {industry.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  variant="default"
                  padding="none"
                  hover
                  className="group cursor-pointer overflow-hidden"
                  onClick={() => setSelectedProject(item)}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button variant="primary" size="sm">
                        View Case Study
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <Badge variant="outline" size="sm" className="mb-3">
                      {industries.find((i) => i.value === item.industry)?.label}
                    </Badge>
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">{item.clientName}</p>
                    <p className="mt-3 text-sm text-primary-600 font-medium">
                      {item.outcome.split(',')[0]}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-slate-500">No projects found in this category.</p>
          </div>
        )}
      </Section>

      {/* CTA Section */}
      <Section background="gray" padding="xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Ready to join our portfolio?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Let's create something amazing together. Get your custom demo in 24 hours.
          </p>
          <div className="mt-8">
            <Link href="/contact">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Get Your 24hr Demo
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-lg backdrop-blur-sm hover:bg-white"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Image */}
              <div className="relative aspect-video">
                <Image
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <Badge variant="primary" className="mb-4">
                  {industries.find((i) => i.value === selectedProject.industry)?.label}
                </Badge>
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  {selectedProject.title}
                </h2>
                <p className="mt-1 text-lg text-slate-500">
                  {selectedProject.clientName}
                </p>

                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="font-semibold text-slate-900">The Challenge</h3>
                    <p className="mt-2 text-slate-600">{selectedProject.problem}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Our Solution</h3>
                    <p className="mt-2 text-slate-600">{selectedProject.solution}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">The Results</h3>
                    <p className="mt-2 text-lg font-medium text-primary-600">
                      {selectedProject.outcome}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        rightIcon={<ExternalLink className="h-4 w-4" />}
                      >
                        View Live Site
                      </Button>
                    </a>
                  )}
                  <Link href="/contact">
                    <Button variant="primary">
                      Start Your Project
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
