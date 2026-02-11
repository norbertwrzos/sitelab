import { z } from 'zod';

/**
 * Lead Form Schema
 * Used for contact forms and general lead capture
 */
export const leadSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  businessType: z
    .string()
    .optional(),
  message: z
    .string()
    .max(1000, 'Message must be less than 1000 characters')
    .optional(),
  captchaToken: z
    .string()
    .min(1, 'Please complete the captcha'),
});

export type LeadFormData = z.infer<typeof leadSchema>;

/**
 * Demo Request Schema
 * Used for 24-hour demo request form
 */
export const demoRequestSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  businessName: z
    .string()
    .min(2, 'Business name must be at least 2 characters')
    .max(200, 'Business name must be less than 200 characters'),
  businessType: z
    .string()
    .min(1, 'Please select your business type'),
  websiteGoals: z
    .string()
    .max(500, 'Website goals must be less than 500 characters')
    .optional(),
  currentWebsite: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  phone: z
    .string()
    .regex(/^[\d\s\-+()]*$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  captchaToken: z
    .string()
    .min(1, 'Please complete the captcha'),
});

export type DemoRequestFormData = z.infer<typeof demoRequestSchema>;

/**
 * Contact Form Schema
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
  captchaToken: z
    .string()
    .min(1, 'Please complete the captcha'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Admin Login Schema
 */
export const adminLoginSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),
});

export type AdminLoginData = z.infer<typeof adminLoginSchema>;

/**
 * Lead Status Update Schema
 */
export const leadStatusSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'CLOSED']),
});

export type LeadStatusData = z.infer<typeof leadStatusSchema>;

/**
 * Demo Status Update Schema
 */
export const demoStatusSchema = z.object({
  status: z.enum(['PENDING', 'IN_PROGRESS', 'DELIVERED', 'CONVERTED', 'EXPIRED']),
  demoUrl: z.string().url().optional(),
});

export type DemoStatusData = z.infer<typeof demoStatusSchema>;

/**
 * Business Type Options
 */
export const businessTypes = [
  { value: 'startup', label: 'Startup' },
  { value: 'small_business', label: 'Small Business' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'service_provider', label: 'Service Provider' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'agency', label: 'Agency' },
  { value: 'restaurant', label: 'Restaurant / Food' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'education', label: 'Education' },
  { value: 'nonprofit', label: 'Non-Profit' },
  { value: 'other', label: 'Other' },
] as const;

export type BusinessType = typeof businessTypes[number]['value'];
