import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords }) => {
  useEffect(() => {
    // Update Title
    document.title = `${title} | Digital Craft Productions`;

    // Helper to update or create meta tags
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update Description
    updateMeta('description', description);

    // Update Keywords
    if (keywords) {
      updateMeta('keywords', keywords);
    }

    // Cleanup function (optional, resets to default if needed, 
    // but usually next page overwrite is sufficient)
    return () => {
        // We leave the title as is until the next component mounts
    };
  }, [title, description, keywords]);

  return null;
};

export default SEO;