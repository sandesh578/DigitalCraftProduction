import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Layers, Moon, Sun } from 'lucide-react';
import { useTheme } from '../App';
import { useContent } from '../context/ContentContext';
import { getDriveDirectLink } from '../utils/driveHelper';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { config } = useContent();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Dynamic classes based on scroll state
  const isTransparent = !scrolled && location.pathname === '/';
  
  const textColorClass = isTransparent ? 'text-white' : 'text-slate-800 dark:text-slate-100';
  const hoverColorClass = isTransparent ? 'hover:text-indigo-300' : 'hover:text-indigo-600 dark:hover:text-indigo-400';
  const logoTextMain = isTransparent ? 'text-white' : 'text-slate-900 dark:text-white';
  const logoTextAccent = isTransparent ? 'text-indigo-400' : 'text-indigo-600 dark:text-indigo-400';
  const logoSubText = isTransparent ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400';

  const navClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-300 ${
      isActive 
        ? (isTransparent ? 'text-indigo-400' : 'text-indigo-600 dark:text-indigo-400') 
        : `${textColorClass} ${hoverColorClass}`
    }`;

  const mobileNavClasses = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800'
    }`;

  // Parse agency name for logo splitting to avoid redundancy
  const agencyName = config.agency.name || "Digital Craft Productions";
  const nameParts = agencyName.trim().split(' ');
  
  let subText = "PRODUCTIONS";
  let mainTextFirst = agencyName;
  let mainTextSecond = "";

  if (nameParts.length > 1) {
    // Use the last word as the subtitle
    subText = nameParts[nameParts.length - 1];
    
    // Use the rest as the main title
    const mainParts = nameParts.slice(0, -1);
    
    // Split main title into two parts for styling (First word vs Rest)
    mainTextFirst = mainParts[0];
    if (mainParts.length > 1) {
      mainTextSecond = mainParts.slice(1).join(' '); 
    }
  } else {
    // Single word name fallback
    subText = "AGENCY";
  }

  const logoUrl = getDriveDirectLink(config.agency.logo);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out border-b ${
        scrolled 
          ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-lg border-slate-200/50 dark:border-slate-800/50 py-3 translate-y-0 opacity-100' 
          : 'bg-transparent border-transparent py-5 translate-y-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2.5 group">
            {logoUrl ? (
              <img src={logoUrl} alt={agencyName} className="h-10 w-auto object-contain rounded-lg" />
            ) : (
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative p-2.5 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300 ring-1 ring-white/10">
                  <Layers className="h-6 w-6 text-white" />
                </div>
              </div>
            )}
            
            {!logoUrl && (
              <div className="flex flex-col">
                <span className={`text-xl font-extrabold tracking-tight leading-none ${logoTextMain} transition-colors duration-300`}>
                  {mainTextFirst}<span className={`${logoTextAccent} transition-colors duration-300`}>{mainTextSecond}</span>
                </span>
                <span className={`text-[0.65rem] font-bold tracking-[0.2em] uppercase ${logoSubText} transition-colors duration-300 mt-0.5`}>
                  {subText}
                </span>
              </div>
            )}
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink to="/" className={navClasses}>Home</NavLink>
            <NavLink to="/services" className={navClasses}>Services</NavLink>
            <NavLink to="/portfolio" className={navClasses}>Portfolio</NavLink>
            <NavLink to="/contact" className={({ isActive }) => 
              `px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-0.5 ${
                isActive 
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`
            }>
              Let's Talk
            </NavLink>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${isTransparent ? 'text-white hover:bg-white/10' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
             {/* Theme Toggle Mobile */}
             <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${isTransparent ? 'text-white hover:bg-white/10' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${textColorClass} hover:text-indigo-500 focus:outline-none p-2 transition-colors`}
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl border-t border-slate-100 dark:border-slate-800 animate-slide-down">
          <div className="px-4 pt-4 pb-8 space-y-2">
            <NavLink to="/" className={mobileNavClasses}>Home</NavLink>
            <NavLink to="/services" className={mobileNavClasses}>Services</NavLink>
            <NavLink to="/portfolio" className={mobileNavClasses}>Portfolio</NavLink>
            <NavLink to="/contact" className={mobileNavClasses}>Contact Us</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;