import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Handshake, 
  TrendingUp, 
  Users, 
  Target, 
  FileText, 
  Banknote, 
  ListChecks, 
  Shield, 
  Briefcase, 
  Store, 
  Factory, 
  ChevronRight, 
  CheckCircle,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Download,
  Printer,
  Globe,
  Monitor,
  MapPin
} from 'lucide-react';
import SEO from '../components/SEO';
import { useContent } from '../context/ContentContext';

// --- Brand Icons Component ---
const BrandIcon: React.FC<{ brand: string; className?: string }> = ({ brand, className = "w-8 h-8" }) => {
  switch (brand) {
    case 'Facebook':
      return <svg viewBox="0 0 24 24" className={className} fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
    case 'Instagram':
      return <svg viewBox="0 0 24 24" className={className}><defs><linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f09433" /><stop offset="25%" stopColor="#e6683c" /><stop offset="50%" stopColor="#dc2743" /><stop offset="75%" stopColor="#cc2366" /><stop offset="100%" stopColor="#bc1888" /></linearGradient></defs><path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
    case 'TikTok':
      return <svg viewBox="0 0 24 24" className={className} fill="#000000"><path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/></svg>;
    case 'LinkedIn':
      return <svg viewBox="0 0 24 24" className={className} fill="#0077B5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
    case 'YouTube':
      return <svg viewBox="0 0 24 24" className={className} fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
    case 'Google':
      return <svg viewBox="0 0 24 24" className={className}><path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.96-2.91l-3.86-3c-1.08.72-2.43 1.16-4.1 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"/><path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"/><path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0 7.565 0 3.515 2.7 1.545 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>;
    case 'Meta':
      return <svg viewBox="0 0 24 24" className={className} fill="#0668E1"><path d="M16.969 5.567c-2.31 0-3.792 1.944-4.968 4.29-1.176-2.346-2.658-4.29-4.968-4.29C2.753 5.567 0 9.605 0 13.567c0 2.476 1.169 3.543 2.506 3.543 1.701 0 2.92-1.921 3.579-3.921.465-1.41.972-3.321 1.63-3.321.751 0 1.256 2.056 1.652 4.145.497 2.624 1.488 4.419 2.632 4.419 1.144 0 2.135-1.795 2.632-4.419.396-2.089.901-4.145 1.652-4.145.658 0 1.165 1.91 1.63 3.321.659 2 1.878 3.921 3.579 3.921 1.337 0 2.506-1.067 2.506-3.543 0-3.962-2.753-8-7.03-8z"/></svg>;
    default:
      return <Globe className={className} />;
  }
};

// --- Main Proposal Component ---

// 3D Tilt Card Component for high-performance hover effects
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 30; // Reduce rotation intensity
    const y = (e.clientY - top - height / 2) / 30; 
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.01)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out transform-gpu will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};

// Optimized Floating Navigation using IntersectionObserver
const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = ['hero', 'about', 'collaboration', 'goals', 'terms', 'process', 'why-us', 'services', 'industries', 'platforms', 'contact'];
    
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 }); // Trigger when 30% visible

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4 p-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl no-print">
      {['hero', 'about', 'collaboration', 'goals', 'terms', 'process', 'why-us', 'services', 'industries', 'platforms', 'contact'].map((section) => (
        <div key={section} className="group relative flex items-center justify-end">
           <span className="absolute right-8 text-xs font-bold text-slate-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-sm capitalize mr-2 pointer-events-none">
             {section.replace('-', ' ')}
           </span>
           <button
            onClick={() => scrollTo(section)}
            className={`w-3 h-3 rounded-full transition-all duration-300 shadow-sm border border-slate-300 dark:border-slate-600 ${
                activeSection === section 
                ? 'bg-indigo-600 scale-125 ring-2 ring-indigo-200 dark:ring-indigo-900 border-transparent' 
                : 'bg-slate-200 dark:bg-slate-700 hover:bg-indigo-400'
            }`}
            aria-label={`Scroll to ${section}`}
            />
        </div>
      ))}
    </div>
  );
};

const Proposal: React.FC = () => {
  const { config } = useContent();

  const detailedServices = [
      "Brand Strategy & Development",
      "Digital Campaign Management",
      "SEO & Search Marketing",
      "Social Media Growth",
      "Content Creation & Marketing",
      "E-commerce Solutions",
      "Web Design & Development",
      "Performance Analytics",
      "Marketing Automation",
      "Lead Generation",
      "Customer Retention",
      "Market Research",
      "Competitor Analysis",
      "Growth Strategy"
  ];

  const roadmapSteps = [
    { 
        title: "Discovery & Audit", 
        desc: "We perform a deep-dive analysis of your current digital footprint, competitor landscape, and audience behavior to identify untapped opportunities and quick wins." 
    },
    { 
        title: "Strategy Formulation", 
        desc: "We co-create a bespoke marketing roadmap that aligns creative storytelling with your specific financial goals and KPIs, ensuring every dollar spent works for you." 
    },
    { 
        title: "Execution & Production", 
        desc: "Our creative team takes over—producing high-fidelity videos, stunning graphics, and compelling copy that captures your brand voice and demands attention." 
    },
    { 
        title: "Launch & Optimize", 
        desc: "We deploy campaigns across chosen channels, monitoring real-time data to tweak performance, adjust bidding, and refine targeting for maximum ROI." 
    },
    { 
        title: "Scale & Dominate", 
        desc: "Once the winning formula is identified, we aggressively scale ad spend and content volume to secure market leadership and exponential growth." 
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300 overflow-x-hidden font-sans print:bg-white print:text-black">
      <SEO 
        title="Partnership Proposal" 
        description={`Partner with ${config.agency.name} for comprehensive digital growth.`}
        keywords="partnership, digital marketing proposal, collaboration, business growth nepal"
      />
      
      <FloatingNav />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden print:min-h-0 print:pt-10 print:pb-10">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 pointer-events-none no-print">
           <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px] animate-blob"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 text-indigo-700 dark:text-indigo-300 text-sm font-bold mb-8 animate-fade-in-up print:border-black print:text-black">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse print:hidden"></span>
            2025 Partnership Program
          </div>

          <div className="mb-8 transform transition-transform duration-500 hover:scale-105 inline-block print:transform-none">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 dark:from-white dark:via-indigo-200 dark:to-slate-400 mb-2 drop-shadow-2xl print:text-black print:bg-none print:drop-shadow-none">
              {config.agency.name.split(' ')[0].toUpperCase()}
            </h1>
             <span className="text-xl md:text-3xl font-bold tracking-[0.6em] text-indigo-600 dark:text-indigo-400 uppercase block mt-2 print:text-black">
                PRODUCTIONS
             </span>
          </div>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-100 font-light print:text-black">
            We don't just act as a service provider; we operate as your <span className="font-bold text-indigo-600 dark:text-indigo-400 print:text-black">Strategic Growth Partner</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-200 no-print">
            <button 
                onClick={() => document.getElementById('collaboration')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-lg font-bold rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] hover:-translate-y-1 hover:ring-2 hover:ring-red-500/50"
            >
                <span className="relative z-10 flex items-center">
                Start Collaboration <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative print:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TiltCard className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[2.5rem] p-8 md:p-20 text-center text-white shadow-2xl relative overflow-hidden group border border-white/10 print:bg-white print:text-black print:border-black print:shadow-none print:p-0 print:rounded-none">
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay no-print"></div>
            
            <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-8">Why This Proposal?</h2>
                <p className="text-xl text-indigo-100/90 max-w-4xl mx-auto mb-16 leading-relaxed font-light print:text-black">
                Digital marketing in Nepal is evolving. Static posts and generic ads no longer work. 
                You need a partner who understands <span className="text-white font-bold print:text-black">cultural nuances</span>, <span className="text-white font-bold print:text-black">viral trends</span>, and <span className="text-white font-bold print:text-black">data-driven ROI</span>.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] print:border-black print:text-black print:bg-transparent">
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-indigo-300 to-indigo-600 mb-2 print:text-black">
                        {config.hero.stats.clients}+
                    </div>
                    <div className="text-xs uppercase tracking-[0.2em] font-bold text-indigo-200 print:text-black">Successful Collaborations</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] print:border-black print:text-black print:bg-transparent">
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-purple-300 to-purple-600 mb-2 print:text-black">
                        {config.hero.stats.projects}+
                    </div>
                    <div className="text-xs uppercase tracking-[0.2em] font-bold text-purple-200 print:text-black">Projects Completed</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] print:border-black print:text-black print:bg-transparent">
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-red-600 mb-2 print:text-black">
                        98%
                    </div>
                    <div className="text-xs uppercase tracking-[0.2em] font-bold text-red-300 print:text-black">Partner Retention</div>
                </div>
                </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* Collaboration Offer */}
      <section id="collaboration" className="py-24 bg-white dark:bg-slate-950 transition-colors print:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-600 dark:text-indigo-400 font-bold tracking-wider uppercase text-sm print:text-black">The Offer</span>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mt-2 print:text-black">Three Pillars of Partnership</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:block print:space-y-6">
            {[
              { icon: Handshake, title: "Strategic Ally", desc: "We act as your internal marketing department, not just an external vendor.", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
              { icon: TrendingUp, title: "Performance First", desc: "Every campaign is optimized for ROI, Leads, and Brand Equity.", color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
              { icon: Users, title: "Full-Stack Team", desc: "Access to Designers, Editors, Developers, and Strategists for one monthly fee.", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" }
            ].map((item, idx) => (
              <TiltCard key={idx} className="h-full print:break-inside-avoid">
                <div className="h-full p-10 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-red-500/20 hover:border-red-500/50 transition-all duration-300 print:border-black print:bg-white">
                    <div className={`w-16 h-16 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-8 print:border print:border-black print:bg-white print:text-black`}>
                        <item.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 print:text-black">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg print:text-black">{item.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Shared Goals */}
      <section id="goals" className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden print:bg-white print:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-bold mb-6 print:border print:border-black print:text-black">
                <Target className="w-4 h-4 mr-2" /> Shared Vision
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 print:text-black">We Don't Win Unless <br/> <span className="text-indigo-600 dark:text-indigo-400 print:text-black">You Win.</span></h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed print:text-black">
                Our business model is built on retention. We aim to provide such undeniable value that we become indispensable to your growth.
              </p>
              <div className="space-y-4">
                {[
                  "Maximize Brand Visibility across Digital Channels",
                  "Generate High-Quality Leads utilizing Meta & Google Ads",
                  "Build a Loyal Community via engaging content",
                  "Establish Digital Infrastructure (Web/SEO) for long-term equity"
                ].map((goal, idx) => (
                  <div key={idx} className="flex items-start p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm print:border-black print:shadow-none hover:border-red-500/30 transition-colors">
                    <CheckCircle className="w-6 h-6 text-indigo-500 mr-4 shrink-0 mt-0.5 print:text-black" />
                    <span className="text-slate-800 dark:text-slate-200 font-medium print:text-black">{goal}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative no-print">
                {/* Abstract Visual - Hidden in Print */}
               <div className="absolute -inset-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-[100px] opacity-20"></div>
               <TiltCard className="relative z-10">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 hover:border-red-500/50 transition-colors duration-500">
                    <img 
                      src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop" 
                      alt="Team Collaboration" 
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex items-end p-8">
                       <div className="text-white">
                          <p className="font-bold text-lg">"Growth is never by mere chance; it is the result of forces working together."</p>
                       </div>
                    </div>
                  </div>
               </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* Terms & Conditions (Grid Layout) */}
      <section id="terms" className="py-24 bg-white dark:bg-slate-950 print:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-16 print:text-black">The Agreement Framework</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:block print:space-y-4">
             {/* Card 1 */}
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-indigo-500/10 transition-all print:border-black print:break-inside-avoid print:bg-white">
               <h4 className="flex items-center text-xl font-bold text-slate-900 dark:text-white mb-6 print:text-black">
                 <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4 text-blue-600 dark:text-blue-400 print:text-black print:bg-white print:border print:border-black"><FileText className="w-6 h-6" /></div>
                 Engagement Model
               </h4>
               <ul className="space-y-3 pl-16">
                  <li className="list-disc text-slate-600 dark:text-slate-400 print:text-black">Initial consultation and strategy session are <span className="text-indigo-600 dark:text-indigo-400 font-bold print:text-black">Complimentary</span></li>
                  <li className="list-disc text-slate-600 dark:text-slate-400 print:text-black">Customized proposal based on your specific business needs</li>
                  <li className="list-disc text-slate-600 dark:text-slate-400 print:text-black">Minimum 3-month commitment recommended for SEO/Social</li>
               </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-green-500/50 hover:shadow-green-500/10 transition-all print:border-black print:break-inside-avoid print:bg-white">
               <h4 className="flex items-center text-xl font-bold text-slate-900 dark:text-white mb-6 print:text-black">
                 <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-4 text-green-600 dark:text-green-400 print:text-black print:bg-white print:border print:border-black"><Banknote className="w-6 h-6" /></div>
                 Financials
               </h4>
               <ul className="space-y-3 pl-16">
                  <li className="list-disc text-slate-600 dark:text-slate-400 print:text-black">50% mobilization advance for project starts</li>
                  <li className="list-disc text-slate-600 dark:text-slate-400 print:text-black">Ad Spends (Meta/Google) billed directly to client card</li>
                  <li className="list-disc text-slate-600 dark:text-slate-400 print:text-black">Balance payment upon project milestones</li>
               </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-purple-500/50 hover:shadow-purple-500/10 transition-all print:border-black print:break-inside-avoid print:bg-white">
               <h4 className="flex items-center text-xl font-bold text-slate-900 dark:text-white mb-6 print:text-black">
                 <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-4 text-purple-600 dark:text-purple-400 print:text-black print:bg-white print:border print:border-black"><ListChecks className="w-6 h-6" /></div>
                 Deliverables & Accountability
               </h4>
               <ul className="space-y-3 pl-16">
                  <li className="list-disc text-slate-600 dark:text-slate-400 print:text-black">Weekly status updates via WhatsApp/Email</li>
                  <li className="list-disc text-slate-600 dark:text-slate-400 print:text-black">Monthly Performance Report with Analytics</li>
                  <li className="list-disc text-slate-600 dark:text-slate-400 print:text-black">Dedicated Account Manager assigned</li>
               </ul>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-red-500/50 hover:shadow-red-500/10 transition-all print:border-black print:break-inside-avoid print:bg-white">
               <h4 className="flex items-center text-xl font-bold text-slate-900 dark:text-white mb-6 print:text-black">
                 <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg mr-4 text-red-600 dark:text-red-400 print:text-black print:bg-white print:border print:border-black"><Shield className="w-6 h-6" /></div>
                 Partnership Values
               </h4>
               <ul className="space-y-3 pl-16">
                  <li className="list-disc text-slate-600 dark:text-slate-400 print:text-black">Complete transparency in all operations</li>
                  <li className="list-disc text-slate-600 dark:text-slate-400 print:text-black">Strict confidentiality of business information</li>
                  <li className="list-disc text-slate-600 dark:text-slate-400 print:text-black">Win-win approach to all collaborations</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section (Timeline) */}
      <section id="process" className="py-24 bg-slate-50 dark:bg-slate-900 print:py-10 print:bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-16 print:text-black">Roadmap to Success</h2>
            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-indigo-200 dark:bg-indigo-900/50 md:-translate-x-1/2 print:bg-black"></div>
                
                <div className="space-y-12">
                    {roadmapSteps.map((step, idx) => (
                        <div key={idx} className={`flex flex-col md:flex-row items-start md:items-center ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'} gap-8 relative print:break-inside-avoid`}>
                             {/* Mobile Node */}
                             <div className="absolute left-8 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white dark:border-slate-900 -translate-x-1/2 md:hidden print:border-black print:bg-black"></div>
                             
                             {/* Desktop Node */}
                             <div className="absolute left-1/2 w-5 h-5 rounded-full bg-indigo-600 border-4 border-white dark:border-slate-900 -translate-x-1/2 hidden md:block z-10 shadow-lg print:border-black print:bg-black"></div>

                            <div className="flex-1 md:text-right pl-16 md:pl-0">
                                {idx % 2 === 0 && (
                                   <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-red-500/50 transition-all print:border-black print:text-black">
                                       <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2 print:text-black">{step.title}</h4>
                                       <p className="text-slate-600 dark:text-slate-400 text-sm print:text-black leading-relaxed">{step.desc}</p>
                                   </div>
                                )}
                            </div>
                            
                            <div className="flex-1 md:text-left pl-16 md:pl-0">
                                {idx % 2 !== 0 && (
                                   <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-red-500/50 transition-all print:border-black print:text-black">
                                       <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2 print:text-black">{step.title}</h4>
                                       <p className="text-slate-600 dark:text-slate-400 text-sm print:text-black leading-relaxed">{step.desc}</p>
                                   </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Services Grid (Detailed from HTML) */}
      <section id="services" className="py-24 bg-slate-50 dark:bg-slate-900 print:py-10 print:bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-16 print:text-black">Services Offered</h2>
            <div className="flex flex-wrap justify-center gap-4">
                {detailedServices.map((service, idx) => (
                    <div key={idx} className="group px-6 py-3 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold shadow-sm hover:border-red-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all cursor-default flex items-center print:border-black print:text-black print:bg-transparent">
                        <CheckCircle className="w-4 h-4 mr-2 text-indigo-500 print:text-black" />
                        {service}
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* Industries */}
      <section id="industries" className="py-24 bg-white dark:bg-slate-950 print:py-10">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-16 print:text-black">Industries We Partner With</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:block print:space-y-4">
                <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow print:border-black print:break-inside-avoid print:bg-white">
                    <h3 className="flex items-center text-xl font-bold text-slate-900 dark:text-white mb-6 print:text-black">
                        <Briefcase className="w-6 h-6 text-indigo-500 mr-3 print:text-black" /> Service Businesses
                    </h3>
                    <ul className="space-y-3">
                        {["Education & Consultancy", "Recruitment Agencies", "Travel & Hospitality", "Real Estate", "Professional Services"].map((item, i) => (
                            <li key={i} className="flex items-center text-slate-600 dark:text-slate-400 print:text-black">
                                <ChevronRight className="w-4 h-4 text-indigo-400 mr-2 print:text-black" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow print:border-black print:break-inside-avoid print:bg-white">
                    <h3 className="flex items-center text-xl font-bold text-slate-900 dark:text-white mb-6 print:text-black">
                        <Store className="w-6 h-6 text-purple-500 mr-3 print:text-black" /> Retail & E-commerce
                    </h3>
                    <ul className="space-y-3">
                        {["Online Stores", "Fashion & Apparel", "Electronics", "Home & Lifestyle", "Health & Beauty"].map((item, i) => (
                            <li key={i} className="flex items-center text-slate-600 dark:text-slate-400 print:text-black">
                                <ChevronRight className="w-4 h-4 text-purple-400 mr-2 print:text-black" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-shadow print:border-black print:break-inside-avoid print:bg-white">
                    <h3 className="flex items-center text-xl font-bold text-slate-900 dark:text-white mb-6 print:text-black">
                        <Factory className="w-6 h-6 text-cyan-500 mr-3 print:text-black" /> B2B & Industrial
                    </h3>
                    <ul className="space-y-3">
                        {["Manufacturing", "Construction", "Import/Export", "Technology Solutions", "Professional Services"].map((item, i) => (
                            <li key={i} className="flex items-center text-slate-600 dark:text-slate-400 print:text-black">
                                <ChevronRight className="w-4 h-4 text-cyan-400 mr-2 print:text-black" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
         </div>
      </section>

      {/* Platforms */}
      <section id="platforms" className="py-24 bg-slate-50 dark:bg-slate-900 print:py-10 print:bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-16 print:text-black">Platforms We Master</h2>
            <div className="flex flex-wrap justify-center gap-8">
                {[
                   { name: "Meta", brand: "Meta" },
                   { name: "Facebook", brand: "Facebook" },
                   { name: "Instagram", brand: "Instagram" },
                   { name: "YouTube", brand: "YouTube" },
                   { name: "Google", brand: "Google" },
                   { name: "LinkedIn", brand: "LinkedIn" },
                   { name: "TikTok", brand: "TikTok" },
                   { name: "Websites", brand: "Websites", icon: Globe },
                ].map((p, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 w-32 h-32 hover:scale-105 transition-transform print:border-black print:text-black print:shadow-none">
                        {p.icon ? (
                            <p.icon className="w-8 h-8 mb-3 text-blue-500 print:text-black" />
                        ) : (
                            <div className="mb-3">
                                <BrandIcon brand={p.brand} className="w-10 h-10" />
                            </div>
                        )}
                        <span className="font-bold text-sm text-slate-700 dark:text-slate-300 print:text-black">{p.name}</span>
                    </div>
                ))}
            </div>
          </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-24 relative overflow-hidden bg-slate-900 print:bg-white print:text-black print:border-t print:border-black">
         {/* Background Glows - Hidden in print */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 no-print">
             <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[100px]"></div>
             <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[100px]"></div>
         </div>

         <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 print:text-black">Ready to Scale?</h2>
            <p className="text-xl text-slate-300 mb-12 print:text-black">
                Let's discuss how {config.agency.name} can transform your business trajectory.
            </p>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl print:shadow-none print:border-black print:text-left print:text-black">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-indigo-500 rounded-xl text-white print:text-black print:bg-transparent print:border print:border-black"><Phone className="w-6 h-6" /></div>
                        <div>
                            <div className="text-xs text-indigo-200 uppercase font-bold print:text-black">Direct Line</div>
                            <div className="text-white font-medium print:text-black">{config.contact.phone}</div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-purple-500 rounded-xl text-white print:text-black print:bg-transparent print:border print:border-black"><Mail className="w-6 h-6" /></div>
                        <div>
                            <div className="text-xs text-purple-200 uppercase font-bold print:text-black">Email Requirements</div>
                            <div className="text-white font-medium print:text-black">{config.contact.email}</div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-pink-500 rounded-xl text-white print:text-black print:bg-transparent print:border print:border-black"><MapPin className="w-6 h-6" /></div>
                        <div>
                            <div className="text-xs text-pink-200 uppercase font-bold print:text-black">HQ Location</div>
                            <div className="text-white font-medium print:text-black">{config.contact.address}</div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-cyan-500 rounded-xl text-white print:text-black print:bg-transparent print:border print:border-black"><Clock className="w-6 h-6" /></div>
                        <div>
                            <div className="text-xs text-cyan-200 uppercase font-bold print:text-black">Response Time</div>
                            <div className="text-white font-medium print:text-black">Within 24 Hours</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 no-print">
                    <NavLink to="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-colors">
                        <Phone className="w-5 h-5 mr-2" /> Book Strategy Call
                    </NavLink>
                    <a href={`mailto:${config.contact.email}?subject=Partnership Proposal Inquiry`} className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30">
                        <Mail className="w-5 h-5 mr-2" /> Email Requirements
                    </a>
                </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Proposal;