import React from 'react';
import { PORTFOLIO } from '../constants';
import { ArrowUpRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Portfolio: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-white dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase text-sm">Our Work</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2 mb-6">Recent Case Studies</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Check out some of our recent projects. We take pride in delivering quality work that helps our clients succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {PORTFOLIO.map((item, index) => (
            <div 
                key={item.id} 
                className="group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-video mb-6 shadow-md hover:shadow-2xl transition-all duration-500 ease-out border border-slate-100 dark:border-slate-700 group-hover:-translate-y-2">
                
                {/* Overlay that darkens on hover */}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-500 z-10"></div>
                
                {/* View Project Button appearing on hover */}
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-14 h-14 bg-white/95 backdrop-blur rounded-full flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                         <ArrowUpRight className="w-6 h-6 text-indigo-600" />
                    </div>
                </div>

                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-600 uppercase tracking-wider shadow-sm">
                        {item.category}
                    </span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 bg-slate-50 dark:bg-slate-800 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-700 animate-fade-in-up delay-300">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Want to see more?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">We have completed over 500+ projects. Contact us for a specialized portfolio relevant to your industry.</p>
            <NavLink to="/contact" className="inline-flex items-center justify-center px-8 py-3 border border-slate-200 dark:border-slate-600 shadow-lg shadow-indigo-100 dark:shadow-none text-base font-bold rounded-full text-indigo-700 dark:text-indigo-300 bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-950 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                Request Full Portfolio
            </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;