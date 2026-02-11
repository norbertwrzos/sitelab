import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Target,
  Lightbulb,
  Heart,
  Zap,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import {
  Section,
  SectionHeader,
  Container,
  Card,
  Button,
  Grid,
} from '@/components/ui';
import { CTASection } from '@/components/sections';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about SiteLab - the team behind the 24-hour website demo. We help entrepreneurs and businesses launch professional websites fast.',
};

const values = [
  {
    icon: Zap,
    title: 'Speed',
    description:
      'We believe in fast execution. Your time is valuable, and we respect that with our 24-hour demo promise.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'We stay ahead of design trends and technology to deliver modern, cutting-edge websites.',
  },
  {
    icon: Heart,
    title: 'Care',
    description:
      'Every project matters to us. We treat your business as if it were our own.',
  },
  {
    icon: Target,
    title: 'Results',
    description:
      'Beautiful design is just the start. We focus on websites that convert visitors into customers.',
  },
];

const team = [
  {
    name: 'Alex Rivera',
    role: 'Founder & Lead Designer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: '10+ years in web design. Previously led design at two YC startups.',
  },
  {
    name: 'Jordan Lee',
    role: 'Head of Development',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: 'Full-stack engineer passionate about performance and clean code.',
  },
  {
    name: 'Sam Patel',
    role: 'Client Success Lead',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    bio: 'Ensures every client has an exceptional experience from day one.',
  },
];

const milestones = [
  { year: '2023', event: 'SiteLab founded with a mission to simplify web design' },
  { year: '2023', event: 'Launched 24-hour demo preview system' },
  { year: '2024', event: 'Reached 100+ websites delivered' },
  { year: '2025', event: 'Expanded team and hit 150+ happy clients' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <Section background="gradient" padding="xl">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700">
            Our Story
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            We believe getting a website
            <br />
            <span className="gradient-text">shouldn't be complicated</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 md:text-xl">
            SiteLab was founded on a simple idea: entrepreneurs and businesses deserve
            professional websites without the usual headaches of cost, complexity, and delays.
          </p>
        </div>
      </Section>

      {/* Mission Section */}
      <Section background="white" padding="xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700">
              Our Mission
            </span>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
              Making web design accessible to everyone
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We saw too many great businesses struggling with outdated websites or no
              web presence at all. The traditional agency model was too slow and expensive.
              DIY builders were too complicated and time-consuming.
            </p>
            <p className="mt-4 text-lg text-slate-600">
              So we created SiteLab — a new approach that combines the quality of an agency
              with the speed of modern technology. Our 24-hour demo system lets you see
              exactly what you're getting before you commit.
            </p>
            <div className="mt-8 space-y-3">
              {[
                'Professional quality, startup speed',
                'See before you pay',
                'No technical knowledge required',
                'Ongoing support included',
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success-500" />
                  <span className="text-slate-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-3xl bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Team collaboration"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-6 shadow-xl">
              <div className="text-4xl font-bold text-primary-600">150+</div>
              <div className="text-sm text-slate-600">Websites Launched</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Values Section */}
      <Section background="gray" padding="xl">
        <SectionHeader
          badge="Our Values"
          title="What drives us every day"
          subtitle="These core values guide every decision we make and every website we build."
        />
        <Grid cols={4} gap="lg">
          {values.map((value) => (
            <Card key={value.title} variant="default" padding="lg" className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100">
                <value.icon className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{value.description}</p>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Team Section */}
      <Section background="white" padding="xl">
        <SectionHeader
          badge="Our Team"
          title="Meet the people behind SiteLab"
          subtitle="A small, dedicated team passionate about helping businesses succeed online."
        />
        <Grid cols={3} gap="lg">
          {team.map((member) => (
            <Card key={member.name} variant="default" padding="none" hover>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-primary-600">{member.role}</p>
                <p className="mt-2 text-sm text-slate-600">{member.bio}</p>
              </div>
            </Card>
          ))}
        </Grid>
      </Section>

      {/* Timeline Section */}
      <Section background="gray" padding="xl">
        <SectionHeader
          badge="Our Journey"
          title="How we got here"
          subtitle="Key milestones in the SiteLab story."
        />
        <div className="mx-auto max-w-2xl">
          <div className="relative border-l-2 border-primary-200 pl-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative mb-8 last:mb-0">
                <div className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-white">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
                <div className="rounded-xl bg-white p-4 shadow-sm">
                  <span className="text-sm font-semibold text-primary-600">
                    {milestone.year}
                  </span>
                  <p className="mt-1 text-slate-700">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <CTASection />
    </>
  );
}
