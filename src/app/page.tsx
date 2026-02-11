import { Metadata } from 'next';
import {
  Hero,
  ValueProposition,
  HowItWorks,
  Stats,
  Testimonials,
  PortfolioPreview,
  CTASection,
  FAQ,
} from '@/components/sections';

export const metadata: Metadata = {
  title: 'SiteLab - Your Website Built in 24 Hours',
  description:
    'Get a professional, high-converting website for your business in just 24 hours. See a free demo before you commit. No complexity, no delays, just results.',
  openGraph: {
    title: 'SiteLab - Your Website Built in 24 Hours',
    description:
      'Get a professional, high-converting website for your business in just 24 hours. See a free demo before you commit.',
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Main CTA above the fold */}
      <Hero />

      {/* Value Proposition - Why choose SiteLab */}
      <ValueProposition />

      {/* Stats - Social proof numbers */}
      <Stats />

      {/* How It Works - 4 step process */}
      <HowItWorks />

      {/* Testimonials - Client reviews */}
      <Testimonials />

      {/* Portfolio Preview - Showcase work */}
      <PortfolioPreview />

      {/* FAQ - Common questions */}
      <FAQ />

      {/* Final CTA - Conversion push */}
      <CTASection />
    </>
  );
}
