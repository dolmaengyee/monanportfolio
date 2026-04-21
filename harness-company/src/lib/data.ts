/* ================================================================
 *  lib/data.ts — ALL SITE CONTENT
 *  ----------------------------------------------------------------
 *  This is the SINGLE source of truth for every piece of text,
 *  link, and configuration displayed on the site.
 *
 *  HOW TO CUSTOMIZE:
 *    1. Replace placeholder text with your company info.
 *    2. Add / remove items in the arrays (services, portfolio, etc.)
 *    3. Icons use Lucide React names — see https://lucide.dev/icons
 * ================================================================ */

/* ── Site-wide metadata ────────────────────────────── */
export const siteConfig = {
  /** Shown in the navbar and browser tab */
  name: 'Company Name',
  /** Short slogan displayed in the hero */
  tagline: 'Building the Future, Together',
  /** SEO meta description */
  description:
    'We deliver innovative solutions that drive business growth. Our expert team combines cutting-edge technology with strategic thinking.',
  /** Copyright line in the footer */
  copyright: '2024 Company Name. All rights reserved.',
}

/* ── Navigation links ──────────────────────────────── */
export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
] as const

/* ── Hero section ──────────────────────────────────── */
export const heroData = {
  title: 'Innovative Solutions for\nModern Business',
  subtitle:
    'We help companies transform their digital presence with cutting-edge technology and strategic design.',
  ctaText: 'Get Started',
  ctaHref: '/contact',
  /** Optional background image path (public folder) */
  backgroundImage: undefined as string | undefined,
}

/* ── About section / page ──────────────────────────── */
export const aboutData = {
  title: 'About Our Company',
  description:
    'Founded with a passion for innovation, we have grown into a trusted partner for businesses worldwide. Our team of experts combines deep technical knowledge with creative problem-solving to deliver solutions that make a real difference.',
  /** Key statistics — add or remove items freely */
  stats: [
    { label: 'Years Experience', value: '10+' },
    { label: 'Projects Delivered', value: '500+' },
    { label: 'Team Members', value: '50+' },
    { label: 'Client Satisfaction', value: '98%' },
  ],
  /** Extended description shown on the dedicated about page */
  extendedDescription:
    'We believe in the power of technology to transform businesses. Our approach combines data-driven insights with creative innovation to build solutions that not only meet today\'s challenges but anticipate tomorrow\'s opportunities.',
  /** Mission statement on the about page */
  mission:
    'To empower businesses with technology solutions that drive sustainable growth and create lasting impact.',
  /** Vision statement on the about page */
  vision:
    'A world where every business, regardless of size, has access to world-class technology solutions.',
}

/* ── Services ──────────────────────────────────────── */
export const servicesData = [
  {
    /** Lucide icon name */
    icon: 'Code',
    title: 'Web Development',
    description:
      'Custom web applications built with the latest technologies for performance, scalability, and user experience.',
    features: [
      'React & Next.js Development',
      'E-commerce Solutions',
      'Progressive Web Apps',
      'API Integration',
    ],
  },
  {
    icon: 'Palette',
    title: 'UI/UX Design',
    description:
      'Beautiful, intuitive interfaces that delight users and drive engagement across all devices.',
    features: [
      'User Research & Testing',
      'Wireframing & Prototyping',
      'Design Systems',
      'Responsive Design',
    ],
  },
  {
    icon: 'BarChart3',
    title: 'Digital Marketing',
    description:
      'Data-driven marketing strategies that increase visibility, generate leads, and boost conversions.',
    features: [
      'SEO Optimization',
      'Content Strategy',
      'Social Media Management',
      'Analytics & Reporting',
    ],
  },
  {
    icon: 'Shield',
    title: 'Consulting',
    description:
      'Strategic technology consulting to help you make informed decisions and stay ahead of the competition.',
    features: [
      'Technology Audits',
      'Digital Transformation',
      'Process Optimization',
      'Growth Strategy',
    ],
  },
] as const

/* ── Portfolio / Projects ──────────────────────────── */
export const portfolioData = [
  {
    title: 'E-Commerce Platform',
    description:
      'A full-featured e-commerce solution with real-time inventory management and seamless checkout.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    image: undefined as string | undefined,
    link: undefined as string | undefined,
  },
  {
    title: 'Healthcare Dashboard',
    description:
      'An intuitive analytics dashboard for healthcare providers to track patient outcomes and operational metrics.',
    tags: ['React', 'D3.js', 'Node.js'],
    image: undefined as string | undefined,
    link: undefined as string | undefined,
  },
  {
    title: 'FinTech Mobile App',
    description:
      'A secure mobile banking application with biometric authentication and real-time transaction tracking.',
    tags: ['React Native', 'Firebase', 'Plaid'],
    image: undefined as string | undefined,
    link: undefined as string | undefined,
  },
  {
    title: 'SaaS Analytics Tool',
    description:
      'A powerful analytics platform helping businesses make data-driven decisions with AI-powered insights.',
    tags: ['TypeScript', 'Python', 'AWS'],
    image: undefined as string | undefined,
    link: undefined as string | undefined,
  },
  {
    title: 'Education Platform',
    description:
      'An interactive learning platform with video courses, quizzes, and progress tracking for students.',
    tags: ['Next.js', 'Supabase', 'Tailwind'],
    image: undefined as string | undefined,
    link: undefined as string | undefined,
  },
  {
    title: 'Real Estate Portal',
    description:
      'A comprehensive property listing platform with virtual tours and intelligent matching algorithms.',
    tags: ['Vue.js', 'Google Maps', 'MongoDB'],
    image: undefined as string | undefined,
    link: undefined as string | undefined,
  },
]

/* ── Testimonials ──────────────────────────────────── */
export const testimonialsData = [
  {
    quote:
      'Working with this team was a game-changer for our business. They delivered a solution that exceeded our expectations in every way.',
    author: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechVenture Inc.',
  },
  {
    quote:
      'Their attention to detail and commitment to quality is unmatched. The project was delivered on time and the results speak for themselves.',
    author: 'Michael Chen',
    role: 'CTO',
    company: 'InnovateCorp',
  },
  {
    quote:
      'From the initial consultation to the final delivery, the experience was seamless. I highly recommend their services to any business.',
    author: 'Emily Davis',
    role: 'Marketing Director',
    company: 'GrowthLab',
  },
]

/* ── Contact info ──────────────────────────────────── */
export const contactData = {
  email: 'hello@company.com',
  phone: '+1 (555) 123-4567',
  address: '123 Innovation Street, Tech City, TC 12345',
  formTitle: 'Send Us a Message',
  /** Social media links — set to undefined to hide */
  social: {
    twitter: 'https://twitter.com' as string | undefined,
    linkedin: 'https://linkedin.com' as string | undefined,
    github: 'https://github.com' as string | undefined,
  },
}

/* ── Footer links ──────────────────────────────────── */
export const footerLinks = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
}
