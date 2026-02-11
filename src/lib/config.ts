// Site-wide configuration
export const siteConfig = {
  name: 'SiteLab',
  description: 'Launch your business website in 24 hours — no complexity, no delays.',
  tagline: 'Your Website. Built in 24 Hours.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://sitelab.com',
  
  // Contact Information
  contact: {
    email: 'hello@sitelab.com',
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA',
  },
  
  // Social Links
  social: {
    twitter: 'https://twitter.com/sitelab',
    linkedin: 'https://linkedin.com/company/sitelab',
    instagram: 'https://instagram.com/sitelab',
  },
  
  // Navigation
  navigation: {
    main: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Contact', href: '/contact' },
    ],
    footer: {
      company: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Services', href: '/services' },
        { label: 'Portfolio', href: '/portfolio' },
        { label: 'Contact', href: '/contact' },
      ],
      services: [
        { label: 'Website Design', href: '/services#design' },
        { label: 'Website Development', href: '/services#development' },
        { label: 'Deployment', href: '/services#deployment' },
        { label: 'Optimization', href: '/services#optimization' },
      ],
      legal: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
  },
  
  // Default SEO
  seo: {
    defaultTitle: 'SiteLab - Your Website Built in 24 Hours',
    titleTemplate: '%s | SiteLab',
    defaultDescription: 'Get a professional, high-converting website for your business in just 24 hours. No complexity, no delays. See a free demo before you commit.',
    defaultKeywords: [
      'website design',
      'web development',
      'business website',
      '24 hour website',
      'fast website',
      'professional website',
      'small business website',
      'startup website',
    ],
    ogImage: '/images/og-default.jpg',
  },
  
  // Features for value proposition
  features: [
    {
      icon: 'Clock',
      title: '24-Hour Demo',
      description: 'See your custom website preview within 24 hours before committing.',
    },
    {
      icon: 'Palette',
      title: 'Unique Design',
      description: 'No templates. Every site is custom-designed for your brand.',
    },
    {
      icon: 'Zap',
      title: 'Fast & Optimized',
      description: 'Lightning-fast load times and SEO optimization built-in.',
    },
    {
      icon: 'Users',
      title: 'Lead Generation',
      description: 'Every site includes optimized lead capture systems.',
    },
  ],
  
  // Services
  services: [
    {
      id: 'design',
      title: 'Website Design',
      description: 'Custom, modern designs that capture your brand identity and convert visitors.',
      icon: 'Palette',
      features: [
        'Custom UI/UX design',
        'Brand-aligned aesthetics',
        'Mobile-first approach',
        'Conversion-optimized layouts',
      ],
    },
    {
      id: 'development',
      title: 'Website Development',
      description: 'Clean, performant code that brings your design to life.',
      icon: 'Code',
      features: [
        'Modern tech stack',
        'Fast load times',
        'SEO optimized',
        'Scalable architecture',
      ],
    },
    {
      id: 'deployment',
      title: 'Deployment & Hosting',
      description: 'Hassle-free deployment with reliable, fast hosting.',
      icon: 'Rocket',
      features: [
        'Domain setup',
        'SSL certificate',
        'CDN included',
        '99.9% uptime',
      ],
    },
    {
      id: 'optimization',
      title: 'Optimization',
      description: 'Continuous improvements to keep your site performing at its best.',
      icon: 'TrendingUp',
      features: [
        'Performance monitoring',
        'SEO improvements',
        'Analytics setup',
        'Ongoing support',
      ],
    },
  ],
  
  // Stats for social proof
  stats: [
    { label: 'Websites Launched', value: '150+' },
    { label: 'Happy Clients', value: '120+' },
    { label: 'Avg. Delivery Time', value: '24hrs' },
    { label: 'Client Satisfaction', value: '99%' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
