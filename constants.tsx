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
import { Service, Testimonial, PortfolioItem } from './types';

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Video Production & Editing',
    description: 'High-quality storytelling through visuals. From corporate shoots to viral reels, we capture your brand\'s essence.',
    icon: Video,
    color: 'bg-red-500',
  },
  {
    id: '2',
    title: 'Web Development',
    description: 'Custom websites that drive growth. Fast, secure, and SEO-optimized sites built on modern tech stacks.',
    icon: Globe,
    color: 'bg-blue-600',
  },
  {
    id: '3',
    title: 'Branding & Scriptwriting',
    description: 'Crafting your brand voice with compelling copy, scripts, and visual identity that resonates with Nepali audiences.',
    icon: PenTool,
    color: 'bg-purple-600',
  },
  {
    id: '4',
    title: 'Social Media Management',
    description: 'Full-spectrum management for Facebook, Instagram, and TikTok. We handle strategy, posting, and community engagement.',
    icon: Smartphone,
    color: 'bg-pink-500',
  },
  {
    id: '5',
    title: 'Ad Campaign Strategy',
    description: 'Maximize ROI with targeted ads on Meta, Google, and TikTok. Data-driven performance marketing.',
    icon: Target,
    color: 'bg-orange-500',
  },
  {
    id: '6',
    title: 'SEO & Analytics',
    description: 'Rank higher on Google and track every click. We optimize your digital presence for long-term visibility.',
    icon: BarChart,
    color: 'bg-green-500',
  },
  {
    id: '7',
    title: 'Voiceovers & Multilingual',
    description: 'Professional voiceovers and content in English and Nepali to connect deeply with local customers.',
    icon: Mic,
    color: 'bg-indigo-500',
  },
  {
    id: '8',
    title: 'Festive & Cultural Campaigns',
    description: 'Culturally sharp campaigns for Dashain, Tihar, and other festivals that build emotional connections.',
    icon: Palette,
    color: 'bg-amber-500',
  },
  {
    id: '9',
    title: 'Reels & Creative Content',
    description: 'Trend-focused short-form content designed to go viral and boost brand awareness instantly.',
    icon: Megaphone,
    color: 'bg-cyan-500',
  },
  {
    id: '10',
    title: '3D Animation & Modeling',
    description: 'Immersive 3D visuals, product modeling, and character animation that bring your ideas to life in three dimensions.',
    icon: Box,
    color: 'bg-emerald-500',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sushil K.',
    role: 'Founder',
    company: 'Kathmandu Gears',
    content: 'DCP transformed our brand image. Their video production quality is unmatched in Kathmandu. Highly recommended!',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Anjali R.',
    role: 'Marketing Head',
    company: 'Urban Styles Nepal',
    content: 'The social media strategy was spot on. We saw a 50% increase in engagement within the first month of working with Digital Craft.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Ramesh T.',
    role: 'Director',
    company: 'Himalayan Education',
    content: 'Professional, creative, and timely. Their web development team built us a robust platform that our students love.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
  },
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: 'Dashain Festival Campaign',
    category: 'Video Production',
    // Reliable "Celebration/Lights" image
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop',
    description: 'A heartwarming video campaign that reached 500k+ views across platforms.',
  },
  {
    id: '2',
    title: 'TechHub Nepal Website',
    category: 'Web Development',
    // Reliable "Coding/Macbook" image
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
    description: 'Modern e-commerce platform with seamless payment integration.',
  },
  {
    id: '3',
    title: 'Organic Tea Branding',
    category: 'Branding',
    // Reliable "Tea/Nature" image
    image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?q=80&w=800&auto=format&fit=crop',
    description: 'Complete visual identity and packaging design for a local tea brand.',
  },
  {
    id: '4',
    title: 'Fashion Week Reels',
    category: 'Social Media',
    // Reliable "Fashion/Model" image
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop',
    description: 'High-energy event coverage and reel editing for Nepal Fashion Week.',
  },
];
