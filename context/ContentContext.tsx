import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_CONFIG } from '../constants';
import { SiteConfig } from '../types';

interface ContentContextType {
  config: SiteConfig;
  updateAgency: (data: Partial<SiteConfig['agency']>) => void;
  isLoading: boolean;
  error: string | null;
}

const ContentContext = createContext<ContentContextType>({
  config: DEFAULT_CONFIG,
  updateAgency: () => {},
  isLoading: false,
  error: null,
});

export const useContent = () => useContext(ContentContext);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available, otherwise use DEFAULT_CONFIG
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem('dcp_site_config');
      return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
    } catch (e) {
      console.error("Failed to load config from storage", e);
      return DEFAULT_CONFIG;
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Persist configuration changes to localStorage
  useEffect(() => {
    localStorage.setItem('dcp_site_config', JSON.stringify(config));
  }, [config]);

  const updateAgency = (data: Partial<SiteConfig['agency']>) => {
    setConfig(prev => ({
      ...prev,
      agency: { ...prev.agency, ...data }
    }));
  };

  useEffect(() => {
    // Optional: Keep the external fetch logic if you plan to use a JSON file later,
    // but ensure it doesn't overwrite user's local changes unexpectedly.
    const fetchContent = async () => {
      const contentUrl = (import.meta as any).env?.VITE_CONTENT_URL;
      if (!contentUrl) return;

      setIsLoading(true);
      try {
        const response = await fetch(contentUrl);
        if (!response.ok) throw new Error('Failed to fetch content');
        const data = await response.json();
        
        // Only merge if we haven't modified locally (simplistic check)
        // or just use this to hydrate defaults. 
        // For now, we prioritize the localStorage state initialized above.
        // If you want remote to override, you'd logic here.
      } catch (err) {
        console.error("Content fetch failed:", err);
        setError("Failed to load dynamic content.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <ContentContext.Provider value={{ config, updateAgency, isLoading, error }}>
      {children}
    </ContentContext.Provider>
  );
};