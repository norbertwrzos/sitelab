'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion';
import { Section, SectionHeader } from '@/components/ui';

const faqs = [
  {
    question: 'How does the 24-hour demo work?',
    answer:
      'Simply fill out our demo request form with your business details and preferences. Our team will create a custom website preview tailored to your brand and send it to you within 24 hours. You can review it, request changes, or approve it — no commitment required until you\'re 100% satisfied.',
  },
  {
    question: 'Do I have to pay anything upfront?',
    answer:
      'No! The 24-hour demo is completely free. You only pay once you\'ve seen your demo and decided to move forward. We believe in showing value first.',
  },
  {
    question: 'What if I don\'t like the demo?',
    answer:
      'That\'s totally fine! We offer unlimited revisions during the demo phase. If after revisions you\'re still not satisfied, you can walk away with no obligations. However, 95% of our clients love their first demo.',
  },
  {
    question: 'How long does it take to launch my website?',
    answer:
      'After demo approval, most websites are fully launched within 3-5 business days. This includes final design tweaks, development, testing, and deployment with hosting and SSL.',
  },
  {
    question: 'Do you provide hosting and maintenance?',
    answer:
      'Yes! All our packages include reliable hosting, SSL certificates, and basic maintenance. We also offer premium maintenance plans for ongoing updates and support.',
  },
  {
    question: 'Can I update my website myself after launch?',
    answer:
      'Absolutely! We provide a user-friendly content management system (CMS) that allows you to update text, images, and basic content. For more complex changes, our team is always here to help.',
  },
];

const FAQ: React.FC = () => {
  return (
    <Section background="white" padding="xl">
      <SectionHeader
        badge="FAQ"
        title="Frequently asked questions"
        subtitle="Everything you need to know about SiteLab and our 24-hour demo process."
      />

      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-2xl border border-slate-200 bg-white px-6 data-[state=open]:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="py-5 text-left text-lg font-medium text-slate-900 hover:text-primary-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-slate-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </Section>
  );
};

export { FAQ };
