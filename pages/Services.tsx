import React, { useState } from 'react';
import { SERVICES } from '../constants';
import { NavLink } from 'react-router-dom';
import { Send, ChevronDown, X, Check, Star } from 'lucide-react';
import SEO from '../components/SEO';

const Services: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleToggle = (id: string) => {
    if (activeServiceId === id) {
      setActiveServiceId(null);
    } else {
      setActiveServiceId(id);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent, serviceTitle: string) => {
    e.preventDefault();
    
    // Construct Mailto Link
    const subject = encodeURIComponent(`Service Inquiry: ${serviceTitle} - ${formData.name}`);
    const body = encodeURIComponent(
`Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Service: ${serviceTitle}

Message:
${formData.message}`
    );

    window.location.href = `mailto:digitalcraftp@gmail.com?subject=${subject}&body=${body}`;
    setActiveServiceId(null);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300 relative overflow-hidden">
      <SEO 
        title="Our Services" 
        description="Explore DCP's services including Video Production, Web Development, SEO, Social Media Marketing, and 3D Animation."
        keywords="video editing, web design, digital marketing services, social media ads, kathmandu agency"
      />
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] animate-blob"></div>
          <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
          <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[80px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
             Solutions for Scale
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Services</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Digital Craft Productions offers a full suite of services to elevate your brand. From concept to execution, we handle it all with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const isExpanded = activeServiceId === service.id;
            
            return (
              <div 
                key={service.id} 
                className={`group bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800 flex flex-col ${isExpanded ? 'ring-2 ring-red-500 scale-[1.02] z-20 shadow-[0_0_30px_rgba(239,68,68,0.2)]' : 'hover:-translate-y-2 hover:border-red-500/50 hover:shadow-red-500/20'} animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6 text-white shadow-lg transform transition-all duration-500 ${isExpanded ? 'rotate-6 scale-110 shadow-xl' : 'group-hover:rotate-6 group-hover:scale-110 group-hover:shadow-red-500/30'}`}>
                  <service.icon className="h-8 w-8" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{service.title}</h3>
                
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Dynamic Features List */}
                <ul className="space-y-3 mb-8 bg-slate-50 dark:bg-slate-950/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 group-hover:border-red-500/20 transition-colors">
                  {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-slate-600 dark:text-slate-300">
                          <Check className="h-4 w-4 text-indigo-500 mr-3 mt-0.5 shrink-0" />
                          <span className="leading-tight">{feature}</span>
                      </li>
                  ))}
                </ul>
                
                {!isExpanded ? (
                  <div className="flex gap-3 mt-auto">
                    <button 
                      onClick={() => handleToggle(service.id)}
                      className="flex-1 py-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-bold text-sm hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors flex items-center justify-center group border border-indigo-100 dark:border-indigo-800/50 hover:border-red-500/30"
                    >
                      Get Quote <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                    </button>
                    <NavLink 
                      to="/contact" 
                      className="px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 transition-colors flex items-center justify-center bg-transparent"
                      title="Contact Page"
                    >
                      <Send className="h-5 w-5" />
                    </NavLink>
                  </div>
                ) : (
                  <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 animate-[slideDown_0.3s_ease-out]">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider flex items-center">
                          <Star className="w-4 h-4 text-amber-500 mr-2 fill-current" />
                          Start Project
                        </h4>
                        <button 
                          onClick={() => handleToggle(service.id)} 
                          className="text-slate-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                          aria-label="Close"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e, service.title)} className="space-y-3">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:text-white"
                        />
                         <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:text-white"
                        />
                         <input
                            type="tel"
                            name="phone"
                            placeholder="Phone (Optional)"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:text-white"
                        />
                         <textarea
                            name="message"
                            rows={2}
                            placeholder={`Tell us about your ${service.title} needs...`}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all placeholder:text-slate-400 dark:text-white"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5"
                        >
                            Send Inquiry <Send className="ml-2 h-4 w-4" />
                        </button>
                    </form>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;