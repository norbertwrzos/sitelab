import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Seed Portfolio Items
  const portfolioItems = [
    {
      title: 'Modern E-Commerce Platform',
      clientName: 'TechGear Store',
      industry: 'ecommerce',
      problem: 'TechGear Store was struggling with an outdated website that had slow load times and poor mobile experience, resulting in high cart abandonment rates.',
      solution: 'We designed and built a modern, fast-loading e-commerce platform with intuitive navigation, streamlined checkout process, and mobile-first design.',
      outcome: 'Cart abandonment decreased by 45%, mobile conversions increased by 120%, and overall revenue grew by 65% within 3 months.',
      imageUrl: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80',
      beforeImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80',
      liveUrl: 'https://example.com',
      featured: true,
      order: 1,
    },
    {
      title: 'Professional Services Website',
      clientName: 'Martinez Law Firm',
      industry: 'service_provider',
      problem: 'Martinez Law Firm had no online presence and was losing potential clients to competitors with modern websites.',
      solution: 'Created a professional, trust-building website with clear service pages, client testimonials, and an easy-to-use contact system.',
      outcome: 'Online inquiries increased by 300%, and the firm acquired 25 new clients within the first month of launch.',
      imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
      liveUrl: 'https://example.com',
      featured: true,
      order: 2,
    },
    {
      title: 'Restaurant & Ordering System',
      clientName: 'Bella Italia',
      industry: 'restaurant',
      problem: 'Bella Italia relied solely on phone orders and walk-ins, missing out on the growing demand for online ordering.',
      solution: 'Built a beautiful restaurant website with integrated online ordering, menu management, and reservation system.',
      outcome: 'Online orders now account for 40% of total revenue, and table reservations increased by 85%.',
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      featured: true,
      order: 3,
    },
    {
      title: 'Healthcare Provider Portal',
      clientName: 'Wellness Medical Center',
      industry: 'healthcare',
      problem: 'Patients found it difficult to book appointments and access information, leading to high call volumes and frustrated staff.',
      solution: 'Developed a patient-friendly website with online appointment booking, service information, and a patient portal.',
      outcome: 'Administrative call volume decreased by 60%, and patient satisfaction scores improved significantly.',
      imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
      featured: false,
      order: 4,
    },
    {
      title: 'Startup Landing Page',
      clientName: 'InnovateTech',
      industry: 'startup',
      problem: 'InnovateTech needed a compelling online presence to attract investors and early adopters for their new SaaS product.',
      solution: 'Created a conversion-focused landing page with clear value proposition, product demos, and investor information.',
      outcome: 'Secured $500K in seed funding and acquired 1,000 beta users within 2 weeks of launch.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      featured: true,
      order: 5,
    },
    {
      title: 'Real Estate Showcase',
      clientName: 'Premier Properties',
      industry: 'real_estate',
      problem: 'Property listings were hard to browse, and potential buyers couldn\'t easily schedule viewings or get in touch.',
      solution: 'Built a modern real estate website with advanced search, virtual tours, and integrated booking for property viewings.',
      outcome: 'Property inquiry rate increased by 150%, and time-to-sale decreased by 25%.',
      imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
      featured: false,
      order: 6,
    },
  ];

  for (const item of portfolioItems) {
    await prisma.portfolioItem.upsert({
      where: { id: item.title.toLowerCase().replace(/\s+/g, '-') },
      update: item,
      create: {
        ...item,
        id: item.title.toLowerCase().replace(/\s+/g, '-'),
      },
    });
  }

  console.log(`✅ Seeded ${portfolioItems.length} portfolio items`);

  // Create default admin user (password should be changed in production)
  const bcrypt = await import('bcryptjs').catch(() => null);
  
  if (bcrypt) {
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    await prisma.adminUser.upsert({
      where: { email: 'admin@sitelab.com' },
      update: {},
      create: {
        email: 'admin@sitelab.com',
        password: hashedPassword,
        name: 'Admin User',
      },
    });
    
    console.log('✅ Created default admin user');
  } else {
    console.log('⚠️  Skipped admin user (bcryptjs not installed)');
  }

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
