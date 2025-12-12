import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  features: string[]; // Added specific features list
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  type: 'image' | 'video'; 
  videoUrl?: string;       
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface SiteConfig {
  agency: {
    name: string;
    tagline: string;
    logo?: string;
  };
  hero: {
    titlePrefix: string;
    subtitle: string;
    stats: {
      clients: number;
      projects: number;
      experience: number;
      activeProjects: number;
    };
  };
  contact: {
    whatsapp: string;
    phone: string;
    email: string;
    address: string;
  };
}