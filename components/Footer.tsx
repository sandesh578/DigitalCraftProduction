import React from 'react';
import { NavLink } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Layers, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-900 relative overflow-hidden">
       {/* Background Glow */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-indigo-900 to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6 animate-fade-in-up">
             <NavLink to="/" className="flex items-center space-x-2.5 group w-fit">
                <div className="relative p-2 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-lg shadow-lg shadow-indigo-900/50">
                    <Layers className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col">
                <span className="text-xl font-bold text-white leading-none">
                    Digital<span className="text-indigo-400">Craft</span>
                </span>
                <span className="text-[0.6rem] font-bold text-slate-500 uppercase tracking-[0.15em] mt-0.5">Productions</span>
                </div>
            </NavLink>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              From bold visuals to smart strategy, we craft campaigns that connect, convert, and captivate. Your full-spectrum digital partner in Nepal.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm border border-slate-800 hover:border-indigo-500"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all duration-300 shadow-sm border border-slate-800 hover:border-pink-500"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm border border-slate-800 hover:border-blue-500"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up delay-100">
            <h3 className="text-white font-bold mb-6 text-lg tracking-tight">Company</h3>
            <ul className="space-y-3">
              <li><NavLink to="/" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>Home</NavLink></li>
              <li><NavLink to="/services" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>Services</NavLink></li>
              <li><NavLink to="/portfolio" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>Our Work</NavLink></li>
              <li><NavLink to="/contact" className="text-sm text-slate-400 hover:text-indigo-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>Contact</NavLink></li>
            </ul>
          </div>

          {/* Services */}
          <div className="animate-fade-in-up delay-200">
            <h3 className="text-white font-bold mb-6 text-lg tracking-tight">Services</h3>
            <ul className="space-y-3">
              <li className="text-sm text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer">Video Production</li>
              <li className="text-sm text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer">Web Development</li>
              <li className="text-sm text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer">Social Media Marketing</li>
              <li className="text-sm text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer">SEO & Branding</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-fade-in-up delay-300">
            <h3 className="text-white font-bold mb-6 text-lg tracking-tight">Get in Touch</h3>
            <ul className="space-y-5">
              <li className="flex items-start space-x-3 group cursor-pointer">
                <MapPin className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5 group-hover:text-white transition-colors" />
                <a href="https://maps.google.com/?q=Sukhedhara,Kathmandu" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 group-hover:text-white transition-colors leading-relaxed">
                  Sukhedhara, Kathmandu, Nepal
                </a>
              </li>
              <li className="flex items-center space-x-3 group">
                <Phone className="h-5 w-5 text-indigo-500 shrink-0 group-hover:text-white transition-colors" />
                <a href="tel:+9779844659531" className="text-sm text-slate-400 group-hover:text-white transition-colors font-medium">
                  +977 9844659531
                </a>
              </li>
              <li className="flex items-center space-x-3 group">
                <Mail className="h-5 w-5 text-indigo-500 shrink-0 group-hover:text-white transition-colors" />
                <a href="mailto:digitalcraftp@gmail.com" className="text-sm text-slate-400 group-hover:text-white transition-colors break-all">
                  digitalcraftp@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center animate-fade-in-up delay-300">
          <p className="text-sm text-slate-600 text-center md:text-left">© 2024 Digital Craft Productions (DCP). All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-xs text-slate-600 hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-600 hover:text-indigo-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;