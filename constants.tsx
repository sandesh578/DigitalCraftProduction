import { 
  Video, 
  Globe, 
  PenTool, 
  Megaphone, 
  BarChart, 
  Mic,
  Smartphone, 
  Palette,
  Target,
  Box
} from 'lucide-react';
import { Service, Testimonial, PortfolioItem, SiteConfig } from './types';

// --- Config ---

export const DEFAULT_CONFIG: SiteConfig = {
  agency: {
    name: "Digital Craft Productions",
    tagline: "Full-Spectrum Digital Marketing in Nepal",
    logo: "/jpeg/logo.jpeg", 
  },
  hero: {
    titlePrefix: "We Craft Digital",
    subtitle: "Fast, Creative, and Culturally Sharp. From cinematic video production to viral campaigns, Digital Craft Productions elevates your brand.",
    stats: {
      clients: 100,
      projects: 100,
      experience: 5,
      activeProjects: 15
    }
  },
  contact: {
    whatsapp: "https://wa.me/9779844659531",
    phone: "+977 9844659531",
    email: "digitalcraftp@gmail.com",
    address: "Sukhedhara, Kathmandu"
  },
  drive: {
    enabled: false, // Set to true once API key is added in Config Modal
    apiKey: "",     // User must provide this via Config Modal
    folderId: "1RKzpf0HFcceKiKx3T32xmznDuNbj4UdK" // Extracted from user's link
  }
};

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Video Production & Editing',
    description: 'High-quality storytelling through visuals. From corporate shoots to viral reels, we capture your brand\'s essence.',
    icon: Video,
    color: 'bg-red-500',
    features: [
      '4K/8K Cinema Quality Cameras',
      'Professional Lighting & Audio Setup',
      'Drone / Aerial Cinematography',
      'Advanced Color Grading & VFX'
    ]
  },
  {
    id: '2',
    title: 'Web Development',
    description: 'Custom websites that drive growth. Fast, secure, and SEO-optimized sites built on modern tech stacks.',
    icon: Globe,
    color: 'bg-blue-600',
    features: [
      'Mobile-First Responsive Design',
      'SEO-Optimized Structure',
      'Fast Loading Speed (Next.js/React)',
      'CMS & E-commerce Integration'
    ]
  },
  {
    id: '3',
    title: 'Branding & Scriptwriting',
    description: 'Crafting your brand voice with compelling copy, scripts, and visual identity that resonates with Nepali audiences.',
    icon: PenTool,
    color: 'bg-purple-600',
    features: [
      'Logo & Visual Identity Systems',
      'Brand Voice & Guidelines',
      'Compelling Ad Copywriting',
      'Video Scripting & Storyboarding'
    ]
  },
  {
    id: '4',
    title: 'Social Media Management',
    description: 'Full-spectrum management for Facebook, Instagram, and TikTok. We handle strategy, posting, and community engagement.',
    icon: Smartphone,
    color: 'bg-pink-500',
    features: [
      'Monthly Content Calendars',
      'Community Engagement & Reply',
      'Trend Analysis (TikTok/Reels)',
      'Performance Reporting'
    ]
  },
  {
    id: '5',
    title: 'Ad Campaign Strategy',
    description: 'Maximize ROI with targeted ads on Meta, Google, and TikTok. Data-driven performance marketing.',
    icon: Target,
    color: 'bg-orange-500',
    features: [
      'Precise Audience Targeting',
      'A/B Testing Creatives',
      'Pixel & Conversion Tracking',
      'ROAS (Return on Ad Spend) Optimization'
    ]
  },
  {
    id: '6',
    title: 'SEO & Analytics',
    description: 'Rank higher on Google and track every click. We optimize your digital presence for long-term visibility.',
    icon: BarChart,
    color: 'bg-green-500',
    features: [
      'Keyword Research & Strategy',
      'On-Page & Technical SEO',
      'Google Business Profile Optimization',
      'User Behavior Analytics'
    ]
  },
  {
    id: '7',
    title: 'Voiceovers & Multilingual',
    description: 'Professional voiceovers and content in English and Nepali to connect deeply with local customers.',
    icon: Mic,
    color: 'bg-indigo-500',
    features: [
      'Native Nepali & English Artists',
      'Professional Studio Recording',
      'Translation & Localization',
      'Audio Mixing & Mastering'
    ]
  },
  {
    id: '8',
    title: 'Festive & Cultural Campaigns',
    description: 'Culturally sharp campaigns for Dashain, Tihar, and other festivals that build emotional connections.',
    icon: Palette,
    color: 'bg-amber-500',
    features: [
      'Festival-Specific Storytelling',
      'Culturally Relevant Visuals',
      'Emotional Brand Connection',
      'Multi-channel Distribution'
    ]
  },
  {
    id: '9',
    title: 'Reels & Creative Content',
    description: 'Trend-focused short-form content designed to go viral and boost brand awareness instantly.',
    icon: Megaphone,
    color: 'bg-cyan-500',
    features: [
      'Viral Hook Scripting',
      'Fast Turnaround Editing',
      'Trending Audio Selection',
      'Platform-Specific Optimization'
    ]
  },
  {
    id: '10',
    title: '3D Animation & Modeling',
    description: 'High-fidelity 3D modeling, product visualization, and character animation to bring your most ambitious ideas to life.',
    icon: Box,
    color: 'bg-emerald-500',
    features: [
      'Product Visualization',
      'Character Animation',
      'Architectural Walkthroughs',
      'Motion Graphics'
    ]
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Basanta Adventure',
    role: 'Operations Team',
    company: 'Basanta Adventure Treks',
    content: 'DCP handled our trekking logistics content and digital presence flawlessly. Their understanding of the tourism industry in Nepal is exceptional.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  },
  {
    id: '2',
    name: 'Life Care Team',
    role: 'Management',
    company: 'Life Care Health Home',
    content: 'Our social media engagement skyrocketed after DCP took over. They create content that genuinely connects with patients and families.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea86b3f9?w=200&h=200&fit=crop',
  },
  {
    id: '3',
    name: 'KVEC Admin',
    role: 'Administrator',
    company: 'Kathmandu Valley Education Center',
    content: 'From student recruitment ads to educational reels, Digital Craft Productions has been a vital partner in our growth.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop',
  },
  {
    id: '4',
    name: 'Bajthala Homes',
    role: 'Owner',
    company: 'Bajthala Traditional Homes',
    content: 'They captured the essence of Nepali hospitality perfectly. Our bookings increased significantly thanks to their visual storytelling.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop', 
  },
];

// --- PORTFOLIO CONFIGURATION ---
// These are fallbacks. If API Key is provided, these will be overwritten/augmented.
export const PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: 'Basanta Adventure Treks',
    category: 'Trek Coordination & Social',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop',
    description: 'Logistics coordination and digital storytelling for international trekking expeditions.',
    type: 'video', 
    videoUrl: '', 
  },
  {
    id: '2',
    title: 'Epicenter Education',
    category: 'Web Dev & Marketing',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    description: 'Full website development, SEO, and student recruitment campaigns.',
    type: 'image',
  },
  {
    id: '3',
    title: 'Life Care Health Home',
    category: 'Content Creation',
    image: 'https://images.unsplash.com/photo-1516574187841-693083f69802?q=80&w=800&auto=format&fit=crop',
    description: 'Healthcare awareness campaigns and patient support content strategy.',
    type: 'image',
  },
  {
    id: '4',
    title: 'The Perch, Naxal',
    category: 'Social Media Growth',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop',
    description: 'Creative visuals and event promotion increasing footfall and engagement.',
    type: 'image',
  },
  {
    id: '5',
    title: 'Kathmandu Valley Education',
    category: 'Ads & Branding',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop',
    description: 'Targeted ad campaigns and monthly content strategy for student enrollment.',
    type: 'image',
  },
  {
    id: '6',
    title: 'Bajthala Traditional Homes',
    category: 'Hospitality Branding',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop', 
    description: 'Showcasing Nepali culture and lifestyle to attract domestic and international guests.',
    type: 'video',
    videoUrl: '', 
  },
  {
    id: '7',
    title: 'Best Loksewa Support',
    category: 'Video Production & SEO',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop',
    description: 'YouTube management, thumbnail design, and SEO for Loksewa preparation content.',
    type: 'video',
    videoUrl: '', 
  },
  {
    id: '8',
    title: 'Karobar Restaurant',
    category: 'Social Media & Menu',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
    description: 'Appetizing food photography and social media management.',
    type: 'image',
  },
  {
    id: '9',
    title: 'Plan Himalaya',
    category: 'Brand Identity',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop',
    description: 'Visual identity and digital content for adventure tourism.',
    type: 'image',
  },
  {
    id: '10',
    title: 'Natural Glow Beauty',
    category: 'Beauty Branding',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800&auto=format&fit=crop',
    description: 'Elegant visual identity and social media presence for beauty services.',
    type: 'image',
  }
];