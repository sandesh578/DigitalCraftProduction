import React, { useState, useEffect } from 'react';
import { X, Save, Image as ImageIcon, Link as LinkIcon, RefreshCw, Eye, Database, Key } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { getDriveDirectLink } from '../utils/driveHelper';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfigModal: React.FC<ConfigModalProps> = ({ isOpen, onClose }) => {
  const { config, updateAgency, updateDriveConfig } = useContent();
  const [logoUrl, setLogoUrl] = useState('');
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  
  // Drive Config State
  const [driveApiKey, setDriveApiKey] = useState('');
  const [driveFolderId, setDriveFolderId] = useState('');
  const [driveEnabled, setDriveEnabled] = useState(false);

  // Sync local state with context when modal opens
  useEffect(() => {
    if (isOpen) {
      setLogoUrl(config.agency.logo || '');
      setName(config.agency.name);
      setTagline(config.agency.tagline);
      
      setDriveApiKey(config.drive?.apiKey || '');
      setDriveFolderId(config.drive?.folderId || '');
      setDriveEnabled(config.drive?.enabled || false);
    }
  }, [isOpen, config]);

  if (!isOpen) return null;

  const handleSave = () => {
    updateAgency({
      name,
      tagline,
      logo: logoUrl
    });
    
    updateDriveConfig({
        apiKey: driveApiKey,
        folderId: driveFolderId,
        enabled: driveEnabled
    });

    onClose();
  };

  const previewUrl = getDriveDirectLink(logoUrl);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in-up">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transform transition-all flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950 shrink-0">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center">
            <RefreshCw className="w-5 h-5 mr-2 text-indigo-500" />
            Customize Site Appearance
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8 overflow-y-auto custom-scrollbar flex-1">
           
           {/* General Settings */}
           <div className="space-y-4">
             <h4 className="text-sm uppercase tracking-wider font-bold text-indigo-500 border-b border-slate-100 dark:border-slate-800 pb-2">Branding</h4>
             
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

             <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Logo Source
                </label>
                <div className="relative">
                    <input 
                        type="text" 
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        placeholder="Paste Drive Link..."
                        className="w-full pl-3 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white placeholder:text-slate-400"
                    />
                </div>
             </div>
           </div>

           {/* Drive Integration */}
           <div className="space-y-4">
             <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <h4 className="text-sm uppercase tracking-wider font-bold text-indigo-500 flex items-center">
                    <Database className="w-4 h-4 mr-2" /> 
                    Automatic Portfolio Sync
                </h4>
                <div className="flex items-center">
                    <input 
                        type="checkbox" 
                        id="driveEnabled"
                        checked={driveEnabled}
                        onChange={(e) => setDriveEnabled(e.target.checked)}
                        className="mr-2 w-4 h-4 accent-indigo-600 rounded"
                    />
                    <label htmlFor="driveEnabled" className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">Enable</label>
                </div>
             </div>

             <div className={`space-y-4 transition-opacity ${driveEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                 <div className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-900 p-3 rounded">
                    Requires a Google Cloud API Key with <strong>Google Drive API</strong> enabled.
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Google API Key</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key className="h-4 w-4 text-slate-400" />
                        </div>
                        <input 
                            type="password" 
                            value={driveApiKey}
                            onChange={(e) => setDriveApiKey(e.target.value)}
                            className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                            placeholder="AIzaSy..."
                        />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Drive Folder ID</label>
                    <input 
                        type="text" 
                        value={driveFolderId}
                        onChange={(e) => setDriveFolderId(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                        placeholder="1RKzpf0HFcceKiKx3T32xmznDuNbj4UdK"
                    />
                 </div>
             </div>
           </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex justify-end space-x-3 shrink-0">
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
            <Save className="w-4 h-4 mr-2" /> Save Config
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigModal;