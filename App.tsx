import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Proposal from './pages/Proposal';
import { ContentProvider } from './context/ContentContext';

// Theme Context
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

// Component to handle scrolling to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Custom Cursor Component
const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const posX = e.clientX;
      const posY = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${posX}px`;
        cursorDotRef.current.style.top = `${posY}px`;
      }

      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.animate({
          left: `${posX}px`,
          top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot bg-indigo-500 dark:bg-indigo-400"></div>
      <div ref={cursorOutlineRef} className="cursor-outline border-indigo-500 dark:border-indigo-400"></div>
    </>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Check local storage or system preference
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      return 'dark';
    }
    return 'light';
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ContentProvider>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Router>
          <ScrollToTop />
          <CustomCursor />
          <div className="flex flex-col min-h-screen transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/proposal" element={<Proposal />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
            <ChatWidget />
            
            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className={`fixed bottom-24 right-6 z-40 p-3 rounded-full bg-slate-900 dark:bg-slate-700 text-white shadow-xl border border-slate-700 dark:border-slate-600 transition-all duration-300 hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:-translate-y-1 ${
                showScrollTop ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
              }`}
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </Router>
      </ThemeContext.Provider>
    </ContentProvider>
  );
};

export default App;