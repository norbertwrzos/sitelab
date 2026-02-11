import { Metadata } from 'next';
import Link from 'next/link';
import {
  Palette,
  Code,
  Rocket,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  Section,
  SectionHeader,
  Container,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
} from '@/components/ui';
import { CTASection, FAQ } from '@/components/sections';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Professional website design, development, deployment, and optimization services. Get your business online with SiteLab.',
};

const services = [
  {
    id: 'design',
    icon: Palette,
    title: 'Website Design',
    description:
      'Custom, conversion-focused designs that capture your brand identity and engage your target audience.',
    features: [
      'Custom UI/UX design tailored to your brand',
      'Mobile-first responsive layouts',
      'Conversion-optimized user flows',
      'Modern, professional aesthetics',
      'Unlimited design revisions',
      'Brand consistency across all pages',
    ],
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 'development',
    icon: Code,
    title: 'Website Development',
    description:
      'Clean, performant code that brings your design to life with lightning-fast load times.',
    features: [
      'Modern tech stack (Next.js, React)',
      'Lightning-fast page load speeds',
      'SEO-optimized structure',
      'Secure, scalable architecture',
      'Cross-browser compatibility',
      'Accessibility compliance (WCAG)',
    ],
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'deployment',
    icon: Rocket,
    title: 'Deployment & Hosting',
    description:
      'Hassle-free deployment with reliable, fast hosting and complete domain setup.',
    features: [
      'Custom domain configuration',
      'SSL certificate included (HTTPS)',
      'Global CDN for fast loading',
      '99.9% uptime guarantee',
      'Automatic backups',
      'DDoS protection',
    ],
    color: 'bg-amber-100 text-amber-600',
  },
  {
    id: 'optimization',
    icon: TrendingUp,
    title: 'Optimization & Support',
    description:
      'Continuous improvements and ongoing support to keep your site performing at its best.',
    features: [
      'Performance monitoring',
      'SEO improvements & reporting',
      'Google Analytics setup',
      'Content updates (on request)',
      'Security patches & updates',
      'Priority email support',
    ],
    color: 'bg-green-100 text-green-600',
  },
];

const packages = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses and freelancers',
    price: '$999',
    period: 'one-time',
    features: [
      'Up to 5 pages',
      'Mobile responsive design',
      'Contact form',
      'Basic SEO setup',
      'SSL certificate',
      '30 days support',
    ],
    popular: false,
  },
  {
    name: 'Professional',
    description: 'For growing businesses that need more',
    price: '$1,999',
    period: 'one-time',
    features: [
      'Up to 10 pages',
      'Custom design',
      'Lead capture forms',
      'Advanced SEO',
      'Analytics dashboard',
      'Blog integration',
      '90 days support',
      'Priority response',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'Full-featured solution for established businesses',
    price: '$3,999',
    period: 'one-time',
    features: [
      'Unlimited pages',
      'Premium custom design',
      'E-commerce ready',
      'CMS integration',
      'Advanced analytics',
      'A/B testing setup',
      '1 year support',
      'Dedicated manager',
    ],
    popular: false,
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <Section background="gradient" padding="xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700">
            Our Services
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Everything you need to
            <br />
            <span className="gradient-text">launch and grow online</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 md:text-xl">
            From design to deployment and beyond, we handle every aspect of your
            web presence so you can focus on running your business.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Get Your 24hr Demo
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" size="lg">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Services Detail Section */}
      <Section background="white" padding="xl">
        <SectionHeader
          badge="What We Offer"
          title="Comprehensive web services"
          subtitle="We provide end-to-end solutions for your online presence."
        />

        <div className="space-y-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`grid items-center gap-12 lg:grid-cols-2 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${service.color}`}
                >
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 text-lg text-slate-600">{service.description}</p>
                <ul className="mt-6 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-success-500" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 p-8">
                  <div className="flex h-full items-center justify-center">
                    <service.icon className="h-32 w-32 text-slate-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing Section */}
      <Section background="gray" padding="xl">
        <SectionHeader
          badge="Pricing"
          title="Simple, transparent pricing"
          subtitle="Choose the package that fits your needs. All packages include our 24-hour demo guarantee."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              variant={pkg.popular ? 'elevated' : 'default'}
              padding="none"
              className={`relative overflow-hidden ${
                pkg.popular ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute right-4 top-4">
                  <Badge variant="primary">
                    <Sparkles className="mr-1 h-3 w-3" />
                    Most Popular
                  </Badge>
                </div>
              )}
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{pkg.description}</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-slate-900">
                    {pkg.price}
                  </span>
                  <span className="text-slate-500"> / {pkg.period}</span>
                </div>
                <ul className="mt-8 space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="h-4 w-4 text-success-500" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/contact">
                    <Button
                      variant={pkg.popular ? 'primary' : 'outline'}
                      fullWidth
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          All prices are in USD. Custom packages available for specific needs.{' '}
          <Link href="/contact" className="text-primary-600 hover:underline">
            Contact us
          </Link>{' '}
          for a quote.
        </p>
      </Section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <CTASection />
    </>
  );
}
