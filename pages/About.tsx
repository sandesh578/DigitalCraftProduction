import React from 'react';
import { 
  Target, 
  Heart, 
  Users, 
  Zap, 
  Award, 
  MapPin, 
  Calendar, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import SEO from '../components/SEO';
import { useContent } from '../context/ContentContext';
import { NavLink } from 'react-router-dom';

const About: React.FC = () => {
  const { config } = useContent();

  const stats = [
    { label: "Years Experience", value: config.hero.stats.experience + "+" },
    { label: "Projects Completed", value: config.hero.stats.projects + "+" },
    { label: "Happy Clients", value: config.hero.stats.clients + "+" },
    { label: "Team Members", value: "12+" },
  ];

  const values = [
    {
      icon: Target,
      title: "Results First",
      desc: "We don't chase vanity metrics. We focus on leads, sales, and tangible growth for your business."
    },
    {
      icon: Heart,
      title: "Passion Driven",
      desc: "We love what we do. This energy translates into creative campaigns that capture attention."
    },
    {
      icon: Zap,
      title: "Speed & Agility",
      desc: "The digital world moves fast. We move faster, ensuring your brand is always ahead of the trend."
    },
    {
      icon: Users,
      title: "Client Partnership",
      desc: "We view ourselves as an extension of your team, not just an outsourced vendor."
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300 relative overflow-hidden">
      <SEO 
        title="About Us" 
        description={`Learn about ${config.agency.name}, our mission, our team, and why we are Nepal's leading digital agency.`}
        keywords="about digital craft productions, marketing team nepal, agency story, kathmandu digital agency"
      />

      {/* Animated Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] animate-blob"></div>
          <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 mb-24 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6">
              Who We Are
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
              Bridging Tradition with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Digital Innovation</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              We are a team of storytellers, strategists, and technologists based in Sukhedhara, Kathmandu. We exist to help Nepali businesses thrive in the global digital economy.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Image Grid */}
      <section className="px-4 sm:px-6 lg:px-8 mb-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative animate-fade-in-up delay-100">
               {/* Abstract decorative elements */}
               <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
               
               <div className="grid grid-cols-2 gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop" 
                    alt="Office Culture" 
                    className="rounded-2xl shadow-lg w-full h-64 object-cover transform translate-y-8 border-4 border-white dark:border-slate-800"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop" 
                    alt="Team Meeting" 
                    className="rounded-2xl shadow-lg w-full h-64 object-cover border-4 border-white dark:border-slate-800"
                  />
               </div>
            </div>

            <div className="animate-fade-in-up delay-200">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Our Journey</h2>
              <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400">
                <p>
                  Founded in 2020, {config.agency.name} started as a small video production unit. We noticed a gap in the market: businesses had great products but struggled to tell their stories online.
                </p>
                <p>
                  We expanded rapidly, integrating web development, SEO, and branding into our core offerings. Today, we are proud to be a "Full-Spectrum" agency, handling everything from the first line of code to the final cut of a commercial.
                </p>
                <p>
                  Located in the heart of Kathmandu at Sukhedhara, we combine local cultural insights with international design standards.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3 group hover:translate-x-1 transition-transform">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-500 transition-colors">Local Expertise</span>
                </div>
                <div className="flex items-center space-x-3 group hover:translate-x-1 transition-transform">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-500 transition-colors">Global Standards</span>
                </div>
                <div className="flex items-center space-x-3 group hover:translate-x-1 transition-transform">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-500 transition-colors">Data-Driven</span>
                </div>
                <div className="flex items-center space-x-3 group hover:translate-x-1 transition-transform">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                    <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-500 transition-colors">Creative Freedom</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-indigo-900 mb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center p-6 border-r border-indigo-800 last:border-0 hover:bg-white/5 transition-colors duration-300 rounded-lg">
                   <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
                   <div className="text-indigo-200 text-sm uppercase tracking-widest font-bold">{stat.label}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 sm:px-6 lg:px-8 mb-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Core Values</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">The principles that guide every pixel we design and every strategy we plan.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-red-500/10 hover:border-red-500/30 transition-all hover:-translate-y-2 group">
                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                  <val.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-red-500 transition-colors">{val.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 relative z-10">
         <div className="max-w-5xl mx-auto bg-slate-900 dark:bg-slate-800 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden border border-slate-700 hover:border-red-500/50 transition-colors duration-500">
            <div className="absolute top-0 left-0 w-full h-full">
               <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px] opacity-30"></div>
               <div className="absolute bottom-[-50%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full blur-[120px] opacity-30"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to work with us?</h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                Join 100+ businesses who have transformed their digital presence with DCP.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <NavLink to="/contact" className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-colors shadow-lg shadow-white/10 hover:scale-105 transform duration-200">
                    Get In Touch
                 </NavLink>
                 <NavLink to="/proposal" className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-all flex items-center justify-center hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transform duration-200">
                    View Partnership Proposal <ArrowRight className="ml-2 w-5 h-5" />
                 </NavLink>
              </div>
            </div>
         </div>
      </section>

    </div>
  );
};

export default About;