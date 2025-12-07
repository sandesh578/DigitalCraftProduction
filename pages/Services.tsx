import React, { useEffect, useState } from 'react';
import { SERVICES } from '../constants';
import { NavLink } from 'react-router-dom';
import { Send, ChevronDown, X, Check } from 'lucide-react';

const Services: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="pt-24 pb-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Our Core Services</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Digital Craft Productions offers a full suite of services to elevate your brand. From concept to execution, we handle it all.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const isExpanded = activeServiceId === service.id;
            
            return (
              <div 
                key={service.id} 
                className={`bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 flex flex-col ${isExpanded ? 'ring-2 ring-indigo-500 scale-[1.02] z-10' : ''} animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6 text-white shadow-lg transform -translate-y-2`}>
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {[1, 2, 3].map((i) => (
                      <li key={i} className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                          <Check className="h-4 w-4 text-indigo-500 mr-2" />
                          <span>Professional quality assurance</span>
                      </li>
                  ))}
                </ul>
                
                {!isExpanded ? (
                  <div className="flex gap-3 mt-auto">
                    <button 
                      onClick={() => handleToggle(service.id)}
                      className="flex-1 py-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors flex items-center justify-center group"
                    >
                      Quick Inquiry <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                    </button>
                    <NavLink 
                      to="/contact" 
                      className="px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 transition-colors flex items-center justify-center"
                      title="Contact Page"
                    >
                      <Send className="h-5 w-5" />
                    </NavLink>
                  </div>
                ) : (
                  <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 animate-[fadeIn_0.3s_ease-in-out]">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wider">Get a Quote</h4>
                        <button 
                          onClick={() => handleToggle(service.id)} 
                          className="text-slate-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
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
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:text-white"
                        />
                         <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:text-white"
                        />
                         <input
                            type="tel"
                            name="phone"
                            placeholder="Phone (Optional)"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400 dark:text-white"
                        />
                         <textarea
                            name="message"
                            rows={2}
                            placeholder={`Tell us about your ${service.title} needs...`}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all placeholder:text-slate-400 dark:text-white"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-sm transition-colors flex items-center justify-center shadow-lg hover:shadow-indigo-500/30"
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