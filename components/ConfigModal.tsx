import React, { useState, useEffect } from 'react';
import { X, Save, Image as ImageIcon, Link as LinkIcon, RefreshCw, Eye } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { getDriveDirectLink } from '../utils/driveHelper';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfigModal: React.FC<ConfigModalProps> = ({ isOpen, onClose }) => {
  const { config, updateAgency } = useContent();
  const [logoUrl, setLogoUrl] = useState('');
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');

  // Sync local state with context when modal opens
  useEffect(() => {
    if (isOpen) {
      setLogoUrl(config.agency.logo || '');
      setName(config.agency.name);
      setTagline(config.agency.tagline);
    }
  }, [isOpen, config]);

  if (!isOpen) return null;

  const handleSave = () => {
    updateAgency({
      name,
      tagline,
      logo: logoUrl
    });
    onClose();
  };

  const previewUrl = getDriveDirectLink(logoUrl);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in-up">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center">
            <RefreshCw className="w-5 h-5 mr-2 text-indigo-500" />
            Customize Site Appearance
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
           
           {/* Info Banner */}
           <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-lg p-4 text-sm text-indigo-800 dark:text-indigo-300">
              Updates made here are saved instantly to your browser. You can use a Google Drive share link for the logo.
           </div>

           {/* Logo Section */}
           <div>
             <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
               Agency Logo Source
             </label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <LinkIcon className="h-4 w-4 text-slate-400" />
               </div>
               <input 
                 type="text" 
                 value={logoUrl}
                 onChange={(e) => setLogoUrl(e.target.value)}
                 placeholder="Paste Google Drive Link (e.g. drive.google.com/file/d/...)"
                 className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white placeholder:text-slate-400"
               />
             </div>
             
             {/* Logo Preview */}
             <div className="mt-4 p-6 bg-slate-100 dark:bg-slate-950/50 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center min-h-[120px] relative group">
                <span className="absolute top-2 left-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center"><Eye className="w-3 h-3 mr-1"/> Preview</span>
                {previewUrl ? (
                  <img src={previewUrl} alt="Logo Preview" className="h-16 w-auto object-contain shadow-sm" onError={(e) => (e.currentTarget.style.display = 'none')} />
                ) : (
                  <div className="text-slate-400 text-sm flex flex-col items-center">
                    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                    No Logo URL provided
                  </div>
                )}
             </div>
           </div>

           {/* Text Details */}
           <div className="space-y-4">
             <div>
               <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Agency Name</label>
               <input 
                 type="text" 
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                 placeholder="Digital Craft Productions"
               />
             </div>
             <div>
               <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Tagline</label>
               <input 
                 type="text" 
                 value={tagline}
                 onChange={(e) => setTagline(e.target.value)}
                 className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                 placeholder="Full-Spectrum Digital Marketing"
               />
             </div>
           </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5"
          >
            <Save className="w-4 h-4 mr-2" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigModal;