import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Video, Zap } from 'lucide-react';
import { SERVICES, TESTIMONIALS } from '../constants';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <SEO 
        title="Home" 
        description="Digital Craft Productions (DCP) is Nepal's premier digital marketing agency. We specialize in video production, web development, SEO, and branding strategies."
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
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-sm font-semibold mb-8 backdrop-blur-md shadow-lg shadow-indigo-900/20 ring-1 ring-white/10">
            <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-400 mr-2 animate-pulse shadow-[0_0_10px_rgba(129,140,248,0.8)]"></span>
            Full-Spectrum Digital Marketing in Nepal
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-8 leading-[1.1] drop-shadow-sm">
            We Craft Digital <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 drop-shadow-lg">
              Masterpieces
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed animate-fade-in-up delay-100 font-light">
            Fast, Creative, and Culturally Sharp. From cinematic video production to viral campaigns, 
            <span className="text-white font-medium"> Digital Craft Productions</span> elevates your brand.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 animate-fade-in-up delay-200">
            <a
              href="https://wa.me/9779844659531"
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
              <span className="text-4xl md:text-5xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">10+</span>
              <span className="text-xs md:text-sm text-slate-400 mt-2 font-bold uppercase tracking-widest">Happy Clients</span>
            </div>
            <div className="flex flex-col items-center group cursor-default">
              <span className="text-4xl md:text-5xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">20+</span>
              <span className="text-xs md:text-sm text-slate-400 mt-2 font-bold uppercase tracking-widest">Projects Delivered</span>
            </div>
            <div className="flex flex-col items-center group cursor-default">
              <span className="text-4xl md:text-5xl font-bold text-white group-hover:text-pink-400 transition-colors duration-300">7</span>
              <span className="text-xs md:text-sm text-slate-400 mt-2 font-bold uppercase tracking-widest">Days Open</span>
            </div>
            <div className="flex flex-col items-center group cursor-default">
              <span className="text-4xl md:text-5xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">24/7</span>
              <span className="text-xs md:text-sm text-slate-400 mt-2 font-bold uppercase tracking-widest">Support</span>
            </div>
          </div>
        </div>
      </section>

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
                <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-8 text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ring-4 ring-white dark:ring-slate-700`}>
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
                Based in <span className="font-semibold text-slate-900 dark:text-white">Sukhedhara, Kathmandu</span>, we understand the local heartbeat while delivering global-standard content.
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

      {/* Testimonials Preview */}
      <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Loved by Clients</h2>
            <div className="flex justify-center items-center space-x-1 mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-6 w-6 text-amber-400 fill-current animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />)}
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Based on 10+ successful partnerships.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, index) => (
              <div key={t.id} className="bg-slate-50 dark:bg-slate-800 p-10 rounded-[2rem] relative hover:shadow-2xl hover:shadow-slate-200 dark:hover:shadow-slate-900 transition-all duration-300 animate-fade-in-up border border-slate-100 dark:border-slate-700 hover:border-indigo-100 dark:hover:border-indigo-500/30" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="absolute top-10 right-10 text-indigo-100 dark:text-indigo-900/50 opacity-50">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                    </svg>
                </div>
                <div className="flex items-center space-x-4 mb-8 relative z-10">
                  <div className="p-1 rounded-full bg-white dark:bg-slate-700 shadow-sm">
                     <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg">{t.name}</h4>
                    <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">{t.company}</p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 italic leading-relaxed relative z-10 text-lg">"{t.content}"</p>
              </div>
            ))}
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
            Ready to take your brand to the next level? Contact DCP today for a free strategy session.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
             <NavLink
              to="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-indigo-900 font-bold rounded-full hover:bg-indigo-50 transition-all shadow-xl shadow-indigo-900/50 hover:-translate-y-1 transform"
            >
              Start a Project
            </NavLink>
             <a
              href="https://wa.me/9779844659531"
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