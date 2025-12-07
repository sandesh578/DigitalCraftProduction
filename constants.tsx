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
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
  },
  {
    id: '2',
    name: 'Anjali R.',
    role: 'Marketing Head',
    company: 'Urban Styles Nepal',
    content: 'The social media strategy was spot on. We saw a 50% increase in engagement within the first month of working with Digital Craft.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
  },
  {
    id: '3',
    name: 'Ramesh T.',
    role: 'Director',
    company: 'Himalayan Education',
    content: 'Professional, creative, and timely. Their web development team built us a robust platform that our students love.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
  },
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: 'Dashain Festival Campaign',
    category: 'Video Production',
    image: 'https://images.unsplash.com/photo-1605218427368-35b80ce82b6b?w=800&h=600&fit=crop',
    description: 'A heartwarming video campaign that reached 500k+ views across platforms.',
  },
  {
    id: '2',
    title: 'TechHub Nepal Website',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    description: 'Modern e-commerce platform with seamless payment integration.',
  },
  {
    id: '3',
    title: 'Organic Tea Branding',
    category: 'Branding',
    image: 'https://images.unsplash.com/photo-1635352720367-17210e74136e?w=800&h=600&fit=crop',
    description: 'Complete visual identity and packaging design for a local tea brand.',
  },
  {
    id: '4',
    title: 'Fashion Week Reels',
    category: 'Social Media',
    image: 'https://images.unsplash.com/photo-1533649693952-47535b42df3f?w=800&h=600&fit=crop',
    description: 'High-energy event coverage and reel editing for Nepal Fashion Week.',
  },
];