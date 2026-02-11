// Lead Types
export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'CLOSED';

export interface Lead {
  id: string;
  name: string;
  email: string;
  businessType?: string | null;
  message?: string | null;
  source: string;
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Demo Request Types
export type DemoStatus = 'PENDING' | 'IN_PROGRESS' | 'DELIVERED' | 'CONVERTED' | 'EXPIRED';

export interface DemoRequest {
  id: string;
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  websiteGoals?: string | null;
  currentWebsite?: string | null;
  phone?: string | null;
  status: DemoStatus;
  demoUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  followUpSentAt?: Date | null;
}

// Portfolio Types
export interface PortfolioItem {
  id: string;
  title: string;
  clientName: string;
  industry: string;
  problem: string;
  solution: string;
  outcome: string;
  imageUrl: string;
  beforeImage?: string | null;
  afterImage?: string | null;
  liveUrl?: string | null;
  featured: boolean;
  createdAt: Date;
}

// Admin User Types
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Submission Result
export interface FormSubmissionResult {
  success: boolean;
  message: string;
  id?: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  totalDemoRequests: number;
  pendingDemos: number;
  conversionRate: number;
  leadsThisMonth: number;
  demosThisMonth: number;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

// Service Types
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl?: string;
  rating: number;
}

// SEO Types
export interface SeoMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}
