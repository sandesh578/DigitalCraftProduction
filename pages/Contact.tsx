import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.name.trim()) newErrors.name = 'Full Name is required';
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formState.phone.trim()) newErrors.phone = 'Phone Number is required';
    
    if (!formState.service) newErrors.service = 'Please select a service';
    
    if (!formState.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    // Construct Mailto Link
    const subject = encodeURIComponent(`New Inquiry from ${formState.name}: ${formState.service || 'General'}`);
    const body = encodeURIComponent(
`Name: ${formState.name}
Phone: ${formState.phone}
Email: ${formState.email}
Service: ${formState.service}

Message:
${formState.message}`
    );

    // Trigger mailto
    window.location.href = `mailto:digitalcraftp@gmail.com?subject=${subject}&body=${body}`;
    
    // Show success state
    setIsSuccess(true);
    setFormState({ name: '', email: '', phone: '', service: '', message: '' });
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
  };

  // FAQ Data
  const FAQs = [
      { q: "What is your typical pricing?", a: "Our pricing is customized based on your specific needs and project scope. We offer packages starting for small businesses up to full enterprise solutions. Contact us for a quote!" },
      { q: "How long does a website take to build?", a: "A standard informational website typically takes 2-4 weeks. E-commerce and complex custom applications may take 6-12 weeks depending on features." },
      { q: "Do you handle ad budgets?", a: "Yes, we manage ad spend for Meta (Facebook/Instagram) and Google Ads. We charge a management fee while you pay the platforms directly for transparency." },
      { q: "Can you shoot videos outside Kathmandu?", a: "Absolutely! Our production team is equipped to travel across Nepal to capture the perfect shots for your brand." }
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <SEO 
        title="Contact Us" 
        description="Get in touch with Digital Craft Productions. Visit our office in Sukhedhara, call us, or send an email to start your project."
        keywords="contact dcp, digital marketing agency phone number, sukhedhara kathmandu, quote"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div className="animate-fade-in-up">
            <div className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                Get in Touch
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Let's Create Magic</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              Whether you need a rebranding, a viral video, or a new website, DCP is here to make it happen. Reach out to us today.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex items-start space-x-5 group hover:transform hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm rounded-2xl flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Visit Our Office</h3>
                  <p className="text-slate-600 dark:text-slate-400">Sukhedhara, Kathmandu</p>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">We'd love to host you for coffee!</p>
                </div>
              </div>

              <div className="flex items-start space-x-5 group hover:transform hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm rounded-2xl flex items-center justify-center shrink-0 text-green-600 dark:text-green-500 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Call or WhatsApp</h3>
                  <p className="text-slate-600 dark:text-slate-400">Fastest way to reach us.</p>
                  <div className="flex flex-col mt-1">
                    <a href="tel:+9779844659531" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-bold text-lg inline-flex items-center">
                      <Phone className="h-4 w-4 mr-2" /> +977 9844659531
                    </a>
                    <a href="https://wa.me/9779844659531" target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-500 hover:text-green-700 text-sm font-semibold mt-1 inline-flex items-center">
                      Chat on WhatsApp <ArrowRight className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-5 group hover:transform hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm rounded-2xl flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Email Us</h3>
                  <p className="text-slate-600 dark:text-slate-400">Send us your requirements.</p>
                  <a href="mailto:digitalcraftp@gmail.com" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium block mt-1">digitalcraftp@gmail.com</a>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900 text-slate-300 rounded-2xl shadow-lg relative overflow-hidden group hover:shadow-indigo-500/20 transition-all duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600 rounded-full blur-[50px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="flex items-center space-x-3 mb-4">
                    <Clock className="h-5 w-5 text-indigo-400" />
                    <h4 className="font-bold text-white">Office Hours</h4>
                </div>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between border-b border-slate-700 pb-2">
                        <span>Sunday - Friday</span>
                        <span className="text-white">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between pt-2">
                        <span>Saturday</span>
                        <span className="text-green-400 font-bold">Open (10:00 AM - 4:00 PM)</span>
                    </div>
                </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 relative animate-fade-in-up delay-200 transition-colors duration-300 min-h-[600px] flex flex-col justify-center">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center animate-fade-in-up">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 ring-8 ring-green-50 dark:ring-green-900/20">
                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Message Ready!</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-sm mb-8">
                    Your email client has been opened with your message. Please hit "Send" in your mail app to complete the process.
                </p>
                <button 
                  onClick={handleReset}
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-indigo-500/30"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                    Send a Message <ArrowRight className="ml-2 h-5 w-5 text-indigo-500" />
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border focus:ring-2 outline-none transition-all placeholder:text-slate-400 dark:text-white ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500 focus:border-indigo-500'}`}
                        placeholder="Ram Sharma"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.name}</p>}
                    </div>
                    <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border focus:ring-2 outline-none transition-all placeholder:text-slate-400 dark:text-white ${errors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500 focus:border-indigo-500'}`}
                        placeholder="98XXXXXXXX"
                    />
                     {errors.phone && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.phone}</p>}
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                    <input
                    type="text"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border focus:ring-2 outline-none transition-all placeholder:text-slate-400 dark:text-white ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500 focus:border-indigo-500'}`}
                    placeholder="ram@example.com"
                    />
                     {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="service" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Interested Service</label>
                    <div className="relative">
                        <select
                        id="service"
                        name="service"
                        value={formState.service}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border focus:ring-2 outline-none transition-all dark:text-white appearance-none ${errors.service ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500 focus:border-indigo-500'}`}
                        >
                        <option value="">Select a service</option>
                        <option value="video">Video Production</option>
                        <option value="web">Web Development</option>
                        <option value="social">Social Media Marketing</option>
                        <option value="branding">Branding & Scriptwriting</option>
                        <option value="seo">SEO & Analytics</option>
                        <option value="other">Other Inquiry</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                             <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                     {errors.service && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.service}</p>}
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
                    <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 border focus:ring-2 outline-none transition-all placeholder:text-slate-400 dark:text-white ${errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500 focus:border-indigo-500'}`}
                    placeholder="Tell us about your project goals..."
                    ></textarea>
                     {errors.message && <p className="text-red-500 text-xs mt-1 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30 group hover:-translate-y-1"
                >
                    Send Message <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                </form>
              </>
            )}
          </div>
        </div>

         {/* FAQ Section */}
         <div className="mt-24 max-w-4xl mx-auto animate-fade-in-up delay-300">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {FAQs.map((faq, index) => (
                    <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300">
                        <details className="group">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                <span>{faq.q}</span>
                                <span className="transition group-open:rotate-180 bg-indigo-50 dark:bg-indigo-900/30 rounded-full p-1">
                                    <svg fill="none" height="20" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <div className="text-slate-600 dark:text-slate-400 px-6 pb-6 leading-relaxed bg-slate-50/50 dark:bg-slate-950/30">
                                {faq.a}
                            </div>
                        </details>
                    </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Contact;