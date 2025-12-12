import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Video, Zap, ChevronLeft, ChevronRight, Quote, Globe, Sparkles, Target, Heart, Users, Activity } from 'lucide-react';
import { SERVICES, TESTIMONIALS } from '../constants';
import SEO from '../components/SEO';
import { useContent } from '../context/ContentContext';

// Animated Counter Component
const CountUp: React.FC<{ end: number; duration?: number; suffix?: string }> = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Immediate check if IntersectionObserver is not supported or if element is already visible
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      
      setCount(Math.floor(end * easeOutQuart));

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(end); // Ensure it lands exactly on end value
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, end, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

// Typewriter Component
const TypewriterText: React.FC<{ words: string[] }> = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const timeout2 = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(timeout2);
  }, []);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      // Finished typing word, wait then reverse
      const timeout = setTimeout(() => {
        setReverse(true);
      }, 2000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      // Finished deleting, move to next word
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150); // Faster delete, slower type

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 drop-shadow-lg">
      {words[index].substring(0, subIndex)}
      <span className={`text-white ml-1 ${blink ? 'opacity-100' : 'opacity-0'}`}>|</span>
    </span>
  );
};

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const { config } = useContent();
  const [activeProjectsCount, setActiveProjectsCount] = useState(15);
  
  const typewriterWords = ["Masterpieces", "Growth", "Stories", "Experiences", "Brands"];
  const marqueeItems = [
    "VIDEO PRODUCTION", "WEB DEVELOPMENT", "SEO STRATEGY", "BRANDING", "SOCIAL MEDIA", "3D ANIMATION", 
    "CAMPAIGN MANAGEMENT", "GRAPHIC DESIGN", "CONTENT WRITING", "INFLUENCER MARKETING"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate dynamic project count based on Month/Year
  useEffect(() => {
    const date = new Date();
    // Use Month and Year to seed the count so it changes monthly but is consistent for that month
    const seed = date.getFullYear() * 12 + date.getMonth();
    // Simple pseudo-random logic:
    // (Seed * 7) % 11 gives a number between 0 and 10.
    // Adding 15 gives a range of 15 to 25.
    const variance = (seed * 7) % 11; 
    setActiveProjectsCount(15 + variance);
  }, []);

  // Testimonial Carousel Logic
  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (distance > minSwipeDistance) {
      nextTestimonial();
    } else if (distance < -minSwipeDistance) {
      prevTestimonial();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <SEO 
        title="Home" 
        description={`${config.agency.tagline}. We specialize in video production, web development, SEO, and branding strategies.`}
        keywords="digital marketing nepal, video production kathmandu, web development, branding agency, seo services nepal"
      />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 lg:pt-52 lg:pb-40 bg-[#020617] overflow-hidden">
        {/* Parallax Background Elements */}
        <div 
          className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none"
        >
            {/* Main Gradient Blobs */}
            <div 
              className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/30 blur-[120px] mix-blend-screen"
              style={{ transform: `translateY(${scrollY * 0.2}px)` }}
            ></div>
            <div 
              className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] rounded-full bg-violet-600/20 blur-[130px] mix-blend-screen"
              style={{ transform: `translateY(-${scrollY * 0.15}px)` }}
            ></div>
            <div 
              className="absolute top-[30%] left-[30%] w-[400px] h-[400px] rounded-full bg-fuchsia-500/20 blur-[100px] animate-pulse opacity-60 mix-blend-screen"
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            ></div>
             <div 
              className="absolute bottom-[20%] right-[20%] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[90px] opacity-40 mix-blend-screen"
            ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-sm font-semibold mb-8 backdrop-blur-md shadow-lg shadow-indigo-900/20 ring-1 ring-white/10 hover:scale-105 transition-transform cursor-default">
            <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-400 mr-2 animate-pulse shadow-[0_0_10px_rgba(129,140,248,0.8)]"></span>
            {config.agency.tagline}
          </div>
          
          <div className="mb-6 animate-fade-in-up">
             <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(34,197,94,0.2)]">
               <Activity className="w-3 h-3 mr-1.5 animate-pulse" />
               <CountUp end={activeProjectsCount} suffix="+" duration={1500} /> Projects Processing This Month
             </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-8 leading-[1.1] drop-shadow-sm min-h-[3em] md:min-h-[2.5em]">
            {config.hero.titlePrefix} <br/>
            <TypewriterText words={typewriterWords} />
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed animate-fade-in-up delay-100 font-light">
            {config.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 animate-fade-in-up delay-200">
            <a
              href={config.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-full hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1"
            >
              Let's Chat on WhatsApp <Zap className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            </a>
            <NavLink
              to="/portfolio"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/5 border border-white/10 text-base font-semibold rounded-full text-white hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1 backdrop-blur-sm"
            >
              View Our Work
            </NavLink>
          </div>

          {/* Stats */}
          <div className="mt-24 grid grid-cols-2 gap-8 md:grid-cols-4 border-t border-white/10 pt-12 animate-fade-in-up delay-300 bg-white/5 rounded-3xl backdrop-blur-sm p-8 mx-auto max-w-6xl">
            <div className="flex flex-col items-center group cursor-default">
              <span className="text-4xl md:text-5xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">
                <CountUp end={config.hero.stats.clients} suffix="+" />
              </span>
              <span className="text-xs md:text-sm text-slate-400 mt-2 font-bold uppercase tracking-widest">Happy Clients</span>
            </div>
            <div className="flex flex-col items-center group cursor-default">
              <span className="text-4xl md:text-5xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                <CountUp end={config.hero.stats.projects} suffix="+" />
              </span>
              <span className="text-xs md:text-sm text-slate-400 mt-2 font-bold uppercase tracking-widest">Projects Delivered</span>
            </div>
            <div className="flex flex-col items-center group cursor-default">
              <span className="text-4xl md:text-5xl font-bold text-white group-hover:text-pink-400 transition-colors duration-300">
                 7 Days
              </span>
              <span className="text-xs md:text-sm text-slate-400 mt-2 font-bold uppercase tracking-widest">Open</span>
            </div>
            <div className="flex flex-col items-center group cursor-default">
              <span className="text-4xl md:text-5xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">24/7</span>
              <span className="text-xs md:text-sm text-slate-400 mt-2 font-bold uppercase tracking-widest">Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Marquee Strip */}
      <div className="py-8 bg-indigo-900/10 dark:bg-indigo-900/20 border-y border-indigo-100 dark:border-indigo-900/30 overflow-hidden relative">
        <div className="flex animate-scroll w-[200%]">
           {/* Duplicate list for seamless loop */}
           <div className="flex space-x-12 min-w-full justify-around items-center px-6">
              {marqueeItems.map((item, idx) => (
                <span key={`1-${idx}`} className="text-lg md:text-xl font-bold text-indigo-900/40 dark:text-white/30 uppercase tracking-widest whitespace-nowrap flex items-center">
                   {item} <span className="mx-6 text-indigo-500">•</span>
                </span>
              ))}
           </div>
           <div className="flex space-x-12 min-w-full justify-around items-center px-6">
              {marqueeItems.map((item, idx) => (
                <span key={`2-${idx}`} className="text-lg md:text-xl font-bold text-indigo-900/40 dark:text-white/30 uppercase tracking-widest whitespace-nowrap flex items-center">
                   {item} <span className="mx-6 text-indigo-500">•</span>
                </span>
              ))}
           </div>
        </div>
      </div>

      {/* Services Preview */}
      <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">What We Do Best</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We don't just follow trends; we create them. Explore our core services designed for the modern Nepali market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.slice(0, 3).map((service, index) => (
              <div 
                key={service.id} 
                className={`group p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-100/50 dark:hover:shadow-none transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-8 text-white shadow-lg transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6 hover:!scale-125 hover:!rotate-0 hover:shadow-indigo-500/50 ring-4 ring-white dark:ring-slate-700`}>
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  {service.description}
                </p>
                <NavLink to="/services" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-wide group-hover:underline decoration-2 underline-offset-4">
                  Learn more <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </NavLink>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <NavLink to="/services" className="inline-flex px-8 py-3 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 transition-all hover:shadow-lg hover:-translate-y-1">
              Explore All Services
            </NavLink>
          </div>
        </div>
      </section>

      {/* Feature / About Snippet */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden relative">
         {/* Background decoration */}
         <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-20"></div>
         <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1 animate-fade-in-up">
              <div className="absolute -top-6 -left-6 w-72 h-72 bg-indigo-400 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-2xl opacity-30 animate-blob"></div>
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-fuchsia-400 dark:bg-fuchsia-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-[6px] border-white dark:border-slate-800 transform rotate-1 hover:rotate-0 transition-transform duration-500 group">
                 <img 
                    src="https://images.unsplash.com/photo-1585565804112-f201f68c48b4?q=80&w=800&auto=format&fit=crop" 
                    alt="Video Production" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-10">
                    <div className="text-white">
                        <div className="flex items-center space-x-2 mb-3">
                            <div className="p-1.5 bg-red-600 rounded-lg">
                                <Video className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-bold text-xs uppercase tracking-widest text-red-200">Production House</span>
                        </div>
                        <p className="text-xl font-bold leading-snug">Behind the scenes of our latest ad shoot.</p>
                    </div>
                 </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 animate-fade-in-up delay-100">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold tracking-wide uppercase text-sm mb-3 block">Why Choose DCP?</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                Creativity Meets <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">Strategy</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                We are more than just a marketing agency; we are your creative partners. 
                Based in <span className="font-semibold text-slate-900 dark:text-white">{config.contact.address}</span>, we understand the local heartbeat while delivering global-standard content.
              </p>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center border border-indigo-100 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 mr-5">
                     <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">High-End Video Production</h4>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Commercials, Music Videos, and Reels.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center border border-purple-100 dark:border-purple-800 text-purple-600 dark:text-purple-400 mr-5">
                     <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">Festive & Cultural Campaigns</h4>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Connecting with Nepali traditions.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-50 dark:bg-pink-900/30 flex items-center justify-center border border-pink-100 dark:border-pink-800 text-pink-600 dark:text-pink-400 mr-5">
                     <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">Result-Oriented Ads</h4>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Optimized for Meta, TikTok & Google.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - The DCP Advantage */}
      <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">The DCP Advantage</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We combine local insight with global standards to deliver results that matter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Cultural Understanding */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-300 group animate-fade-in-up delay-100">
              <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="h-7 w-7 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Deep Cultural Roots</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                We speak the language of Nepal—literally and culturally. From Dashain campaigns to local trends, we create content that feels authentic and resonates deeply with your audience.
              </p>
            </div>

            {/* Card 2: Speed */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-300 group animate-fade-in-up delay-200">
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Speed & Agility</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Trends move fast, and so do we. Our streamlined production workflow ensures high-quality delivery in record time, keeping your brand ahead of the curve.
              </p>
            </div>

            {/* Card 3: Creative Expertise */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all duration-300 group animate-fade-in-up delay-300">
              <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="h-7 w-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Creative Excellence</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                We don't use templates. Our team of filmmakers, designers, and strategists craft bespoke visual masterpieces that capture attention and drive action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Digital Craft Productions */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
            <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-100 dark:bg-indigo-900/10 blur-[80px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="animate-fade-in-up">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold tracking-wide uppercase text-sm mb-3 block">Our Story</span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6">
                        More Than Just An Agency
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                        Founded in 2020 in the vibrant neighborhood of Sukhedhara, Kathmandu, {config.agency.name} started with a singular mission: to bridge the gap between traditional Nepali business values and the fast-paced world of digital marketing.
                    </p>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                        We believe that every brand has a story waiting to be told. Our team of passionate creators, strategists, and tech enthusiasts work tirelessly to turn your vision into a digital reality that resonates with audiences locally and globally.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <NavLink to="/contact" className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30">
                            Get in Touch
                        </NavLink>
                         <NavLink to="/portfolio" className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                            See Our Journey
                        </NavLink>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 animate-fade-in-up delay-100">
                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex items-start space-x-4">
                        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400">
                            <Target className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Our Mission</h3>
                            <p className="text-slate-600 dark:text-slate-400">To empower 1,000+ Nepali businesses by 2030 with innovative digital solutions that drive measurable growth.</p>
                        </div>
                    </div>
                     <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex items-start space-x-4">
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                            <Heart className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Our Values</h3>
                            <p className="text-slate-600 dark:text-slate-400">We prioritize transparency, creativity, and results. We treat your business like our own.</p>
                        </div>
                    </div>
                     <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex items-start space-x-4">
                        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
                            <Users className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">The Team</h3>
                            <p className="text-slate-600 dark:text-slate-400">A diverse collective of filmmakers, coders, and marketers united by a passion for excellence.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Loved by Clients</h2>
            <div className="flex justify-center items-center space-x-1 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-6 w-6 text-amber-400 fill-current animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />)}
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Based on 100+ successful partnerships.</p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Navigation Buttons - Hidden on mobile, visible on tablet+ */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-20 p-3 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hidden md:flex"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-20 p-3 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hidden md:flex"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Carousel Viewport */}
            <div 
              className="overflow-hidden rounded-[2.5rem] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-2xl shadow-indigo-100/50 dark:shadow-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}
              >
                {TESTIMONIALS.map((t) => (
                  <div key={t.id} className="min-w-full p-8 md:p-16 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                     <div className="relative shrink-0">
                         <div className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-indigo-500 to-purple-500">
                             <img 
                               src={t.image} 
                               alt={t.name} 
                               className="w-full h-full rounded-full object-contain bg-white border-4 border-white dark:border-slate-800" 
                               onError={(e) => { e.currentTarget.style.display = 'none'; }}
                             />
                         </div>
                         <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-full shadow-lg">
                             <Quote className="h-4 w-4 fill-current" />
                         </div>
                     </div>
                     <div className="flex-1 text-center md:text-left">
                         <div className="mb-6">
                            <Star className="inline-block h-5 w-5 text-amber-400 fill-current" />
                            <Star className="inline-block h-5 w-5 text-amber-400 fill-current" />
                            <Star className="inline-block h-5 w-5 text-amber-400 fill-current" />
                            <Star className="inline-block h-5 w-5 text-amber-400 fill-current" />
                            <Star className="inline-block h-5 w-5 text-amber-400 fill-current" />
                         </div>
                         <p className="text-xl md:text-2xl font-light italic text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
                             "{t.content}"
                         </p>
                         <div>
                             <h4 className="text-xl font-bold text-slate-900 dark:text-white">{t.name}</h4>
                             <p className="text-indigo-600 dark:text-indigo-400 font-semibold">{t.role}, {t.company}</p>
                         </div>
                     </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-3">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonialIndex 
                      ? 'bg-indigo-600 w-8' 
                      : 'bg-slate-300 dark:bg-slate-700 hover:bg-indigo-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-indigo-500 blur-[100px] opacity-30"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-fuchsia-500 blur-[100px] opacity-30"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tight">Let's Build Something <br/> Amazing Together.</h2>
          <p className="text-indigo-200 text-xl mb-12 max-w-2xl mx-auto font-light">
            Ready to take your brand to the next level? Contact {config.agency.name} today for a free strategy session.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
             <NavLink
              to="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-indigo-900 font-bold rounded-full hover:bg-indigo-50 transition-all shadow-xl shadow-indigo-900/50 hover:-translate-y-1 transform"
            >
              Start a Project
            </NavLink>
             <a
              href={config.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 border border-indigo-400 bg-indigo-900/50 text-white font-bold rounded-full hover:bg-indigo-800 transition-all hover:-translate-y-1 transform backdrop-blur-sm"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;