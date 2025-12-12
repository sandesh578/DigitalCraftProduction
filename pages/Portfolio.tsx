import React, { useState, useEffect } from 'react';
import { PORTFOLIO } from '../constants';
import { PortfolioItem } from '../types';
import { 
  FolderOpen, 
  PlayCircle, 
  Image as ImageIcon, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2,
  ExternalLink,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import SEO from '../components/SEO';
import { getDriveDirectLink } from '../utils/driveHelper';
import VideoPlayer from '../components/VideoPlayer';
import { useContent } from '../context/ContentContext';
import { fetchDriveFiles } from '../services/driveService';

const Portfolio: React.FC = () => {
  const { config } = useContent();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'video' | 'image'>('all');
  
  // Loading & Error States for Dynamic Fetching
  const [isLoadingDrive, setIsLoadingDrive] = useState(false);
  const [driveError, setDriveError] = useState<string | null>(null);
  
  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Load data logic
  useEffect(() => {
    const loadContent = async () => {
        // If Drive API is enabled and configured, try to fetch
        if (config.drive?.enabled && config.drive.apiKey && config.drive.folderId) {
            setIsLoadingDrive(true);
            setDriveError(null);
            try {
                const driveItems = await fetchDriveFiles(config.drive.folderId, config.drive.apiKey);
                if (driveItems.length > 0) {
                    setItems(driveItems);
                } else {
                    // Fallback if folder empty
                    setItems(PORTFOLIO);
                    setDriveError("No public files found in the linked folder.");
                }
            } catch (err) {
                console.error(err);
                setItems(PORTFOLIO); // Fallback to hardcoded
                setDriveError("Failed to sync with Drive. Using cached portfolio. Check API Key/Permissions.");
            } finally {
                setIsLoadingDrive(false);
            }
        } else {
            // Default behavior
            setItems(PORTFOLIO);
        }
    };

    loadContent();
  }, [config.drive]);

  const filteredItems = items.filter(item => filter === 'all' || item.type === filter);

  // Robust Image Fallback Handler
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, title: string) => {
    const target = e.currentTarget;
    // Prevent infinite loop if the avatar API fails
    if (target.src.includes('ui-avatars.com')) {
       target.src = '/jpeg/logo.jpeg'; // Final local fallback
       target.onerror = null; // Prevent further error handling
    } else {
       // First fallback: Generated Avatar
       target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&background=random&size=400&font-size=0.33`;
    }
  };

  // Lightbox Logic
  const openLightbox = (index: number) => {
    // Find the original index in the full list
    const item = filteredItems[index];
    const originalIndex = items.findIndex(i => i.id === item.id);
    setLightboxIndex(originalIndex);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === items.length - 1 ? 0 : (prev || 0) + 1));
  };

  const prevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? items.length - 1 : (prev || 0) - 1));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev === items.length - 1 ? 0 : (prev || 0) + 1));
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev === 0 ? items.length - 1 : (prev || 0) - 1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, items.length]);

  return (
    <div className="pt-24 pb-20 bg-white dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <SEO 
        title="Our Portfolio" 
        description="Browse our latest video productions, websites, and branding projects. Digital Craft Productions - Excellence in every pixel."
        keywords="portfolio, gallery, video showcase, web design examples, dcp nepal work"
      />
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center animate-fade-in-up">
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase text-sm">Our Masterpieces</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-2 mb-6">Production Gallery</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
             Explore our curated collection of videos, designs, and digital experiences.
          </p>
          
          <div className="flex justify-center space-x-4">
             <a 
               href={`https://drive.google.com/drive/folders/${config.drive?.folderId || '1RKzpf0HFcceKiKx3T32xmznDuNbj4UdK'}`}
               target="_blank"
               rel="noopener noreferrer"
               className="inline-flex items-center px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm"
             >
               <FolderOpen className="mr-2 h-4 w-4" /> View Full Drive Folder
             </a>
          </div>

          {/* Drive Status Messages */}
          {isLoadingDrive && (
              <div className="mt-6 flex items-center justify-center text-indigo-500 animate-pulse">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Syncing with Google Drive...
              </div>
          )}
          {driveError && (
              <div className="mt-4 inline-flex items-center px-4 py-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-lg text-sm border border-amber-200 dark:border-amber-800">
                  <AlertTriangle className="w-4 h-4 mr-2" /> {driveError}
              </div>
          )}
        </div>
      </div>

      {/* Gallery Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sticky top-20 z-30">
        <div className="flex justify-center">
            <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full flex space-x-1 shadow-lg backdrop-blur-sm border border-slate-200 dark:border-slate-700/50">
                <button 
                  onClick={() => setFilter('all')}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${filter === 'all' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'}`}
                >
                    All Work
                </button>
                <button 
                  onClick={() => setFilter('video')}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center ${filter === 'video' ? 'bg-white dark:bg-slate-700 text-red-500 dark:text-red-400 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'}`}
                >
                   <PlayCircle className="w-4 h-4 mr-1.5" /> Videos
                </button>
                <button 
                  onClick={() => setFilter('image')}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center ${filter === 'image' ? 'bg-white dark:bg-slate-700 text-blue-500 dark:text-blue-400 shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'}`}
                >
                   <ImageIcon className="w-4 h-4 mr-1.5" /> Photos
                </button>
            </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                  <p className="text-slate-500 dark:text-slate-400">No items found in this category.</p>
                  <button onClick={() => setFilter('all')} className="mt-4 text-indigo-600 font-bold hover:underline">View All</button>
              </div>
          ) : (
              <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {filteredItems.map((item, index) => (
                  <div 
                      key={item.id} 
                      className="break-inside-avoid group cursor-pointer animate-fade-in-up"
                      style={{ animationDelay: `${(index % 10) * 50}ms` }}
                      onClick={() => openLightbox(index)}
                  >
                  <div className="relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md group-hover:shadow-xl transition-all duration-300">
                      
                      {/* Type Indicator Badge */}
                      <div className="absolute top-3 right-3 z-20">
                          {item.type === 'video' ? (
                              <div className="bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-md flex items-center shadow-sm">
                                  <PlayCircle className="w-3 h-3 mr-1" /> Video
                              </div>
                          ) : (
                              <div className="bg-slate-800/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-md flex items-center shadow-sm">
                                  <ImageIcon className="w-3 h-3 mr-1" /> Photo
                              </div>
                          )}
                      </div>

                      {/* Image Container */}
                      <div className="aspect-[4/3] w-full relative bg-white dark:bg-slate-950 flex items-center justify-center p-4">
                          <img 
                              src={getDriveDirectLink(item.image)} 
                              alt={item.title} 
                              className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out"
                              onError={(e) => handleImageError(e, item.title)}
                          />
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                  {item.type === 'video' && item.videoUrl ? <PlayCircle className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
                              </div>
                          </div>
                      </div>

                      {/* Info Block */}
                      <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                          <div className="mb-2">
                              <span className="text-xs font-bold tracking-wider text-indigo-500 uppercase">{item.category}</span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {item.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                              {item.description}
                          </p>
                      </div>
                  </div>
                  </div>
              ))}
              </div>
          )}
      </div>

      {/* Lightbox / Slideshow Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center animate-fade-in-up">
            {/* Close Button */}
            <button 
                onClick={closeLightbox}
                className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Nav Buttons */}
            <button 
                onClick={prevLightbox}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-50 hidden md:block"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
                onClick={nextLightbox}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-50 hidden md:block"
            >
                <ChevronRight className="w-8 h-8" />
            </button>

            {/* Content */}
            <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-12 relative" onClick={closeLightbox}>
                 <div className="relative max-w-5xl w-full max-h-[80vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                    
                    {/* Media Display */}
                    <div className="w-full h-full bg-black rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/20 relative flex items-center justify-center aspect-video group">
                        
                        {/* 
                          CHECK: Does this item have a valid video URL? 
                          If YES -> Show Video Player.
                          If NO -> Show Image + "View in Drive" fallback (Prevents black screen)
                        */}
                        {items[lightboxIndex].type === 'video' && items[lightboxIndex].videoUrl && items[lightboxIndex].videoUrl.trim() !== '' ? (
                             <VideoPlayer 
                                url={items[lightboxIndex].videoUrl} 
                                title={items[lightboxIndex].title}
                                poster={getDriveDirectLink(items[lightboxIndex].image)}
                             />
                        ) : (
                            <>
                              <img 
                                  src={getDriveDirectLink(items[lightboxIndex].image)} 
                                  alt={items[lightboxIndex].title}
                                  className="max-h-[80vh] max-w-full object-contain"
                                  onError={(e) => handleImageError(e, items[lightboxIndex].title)}
                              />
                              {/* Overlay for Missing Video */}
                              {items[lightboxIndex].type === 'video' && (
                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center backdrop-blur-sm">
                                  <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20 text-center">
                                    <PlayCircle className="w-12 h-12 text-white/80 mx-auto mb-3" />
                                    <h4 className="text-white font-bold text-lg mb-2">Video Preview</h4>
                                    <p className="text-white/70 text-sm mb-4">The full video is available in our Drive folder.</p>
                                    <a 
                                      href={`https://drive.google.com/drive/folders/${config.drive?.folderId || '1RKzpf0HFcceKiKx3T32xmznDuNbj4UdK'}`} 
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-bold transition-colors"
                                    >
                                      Open Folder <ExternalLink className="w-4 h-4 ml-2" />
                                    </a>
                                  </div>
                                </div>
                              )}
                            </>
                        )}
                    </div>

                    {/* Captions */}
                    <div className="mt-6 text-center max-w-2xl">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                            {items[lightboxIndex].type === 'video' ? <PlayCircle className="w-4 h-4 text-red-500" /> : <ImageIcon className="w-4 h-4 text-blue-500" />}
                            <span className="text-indigo-400 text-sm font-bold uppercase tracking-wider">{items[lightboxIndex].category}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">{items[lightboxIndex].title}</h2>
                        <p className="text-slate-400">{items[lightboxIndex].description}</p>
                    </div>

                    {/* Counter */}
                    <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full font-mono">
                        {lightboxIndex + 1} / {items.length}
                    </div>
                 </div>
            </div>
        </div>
      )}

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Want to see more?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
                We have hundreds of archived projects available upon request.
            </p>
            <NavLink to="/contact" className="inline-flex items-center justify-center px-8 py-3 border border-slate-200 dark:border-slate-600 shadow-lg shadow-indigo-100 dark:shadow-none text-base font-bold rounded-full text-indigo-700 dark:text-indigo-300 bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-950 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                Contact for Full Showreel
            </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;