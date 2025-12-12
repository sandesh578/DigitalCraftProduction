import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Layers, Mail, MapPin, Phone, Settings } from 'lucide-react';
import ConfigModal from './ConfigModal';
import { useContent } from '../context/ContentContext';
import { getDriveDirectLink } from '../utils/driveHelper';

const Footer: React.FC = () => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const { config } = useContent();

  // Parse agency name for consistent logo display
  const agencyName = config.agency.name || "Digital Craft Productions";
  const nameParts = agencyName.trim().split(' ');
  
  let subText = "PRODUCTIONS";
  let mainTextFirst = agencyName;
  let mainTextSecond = "";

  if (nameParts.length > 1) {
    subText = nameParts[nameParts.length - 1];
    const mainParts = nameParts.slice(0, -1);
    mainTextFirst = mainParts[0];
    if (mainParts.length > 1) {
      mainTextSecond = mainParts.slice(1).join(' '); 
    }
  } else {
    subText = "AGENCY";
  }

  const logoUrl = getDriveDirectLink(config.agency.logo);

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-900 relative overflow-hidden">
       {/* Background Glow */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-indigo-900 to-transparent opacity-50"></div>
      
      {/* Config Modal */}
      <ConfigModal isOpen={isConfigOpen} onClose={() => setIsConfigOpen(false)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6 animate-fade-in-up">
             <NavLink to="/" className="flex items-center space-x-3 group w-fit">
                {logoUrl ? (
                   <img src={logoUrl} alt={agencyName} className="h-10 w-10 object-contain drop-shadow-[0_0_10px_rgba(251,113,133,0.5)]" />
                ) : (
                  <div className="relative p-2 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-lg shadow-lg shadow-indigo-900/50">
                      <Layers className="h-5 w-5 text-white" />
                  </div>
                )}
                <div className="flex flex-col">
                <span className="text-xl font-bold text-white leading-none">
                    {mainTextFirst}<span className="text-indigo-400">{mainTextSecond}</span>
                </span>
                <span className="text-[0.6rem] font-bold text-slate-500 uppercase tracking-[0.15em] mt-0.5">{subText}</span>
                </div>
            </NavLink>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              {config.agency.tagline || "From bold visuals to smart strategy, we craft campaigns that connect, convert, and captivate."}
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
                <a href={`https://maps.google.com/?q=${encodeURIComponent(config.contact.address)}`} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 group-hover:text-white transition-colors leading-relaxed">
                  {config.contact.address}
                </a>
              </li>
              <li className="flex items-center space-x-3 group">
                <Phone className="h-5 w-5 text-indigo-500 shrink-0 group-hover:text-white transition-colors" />
                <a href={`tel:${config.contact.phone.replace(/\s+/g, '')}`} className="text-sm text-slate-400 group-hover:text-white transition-colors font-medium">
                  {config.contact.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3 group">
                <Mail className="h-5 w-5 text-indigo-500 shrink-0 group-hover:text-white transition-colors" />
                <a href={`mailto:${config.contact.email}`} className="text-sm text-slate-400 group-hover:text-white transition-colors break-all">
                  {config.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center animate-fade-in-up delay-300">
          <p className="text-sm text-slate-600 text-center md:text-left">© {new Date().getFullYear()} {config.agency.name}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 items-center">
            <a href="#" className="text-xs text-slate-600 hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-600 hover:text-indigo-400 transition-colors">Terms of Service</a>
            
            {/* Customize Site Button */}
            <button 
              onClick={() => setIsConfigOpen(true)}
              className="flex items-center text-xs text-slate-700 hover:text-indigo-400 transition-colors ml-4 border border-slate-800 px-2 py-1 rounded hover:border-indigo-500"
              title="Customize Site Settings"
            >
              <Settings className="w-3 h-3 mr-1" /> Customize
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;