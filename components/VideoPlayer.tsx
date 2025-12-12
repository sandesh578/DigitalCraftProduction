import React, { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { getVideoEmbedUrl } from '../utils/driveHelper';

interface VideoPlayerProps {
  url: string;
  title: string;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title, poster }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Normalize URL for embed
  let src = url;
  let isFrame = false;

  // Handle Google Drive
  if (url.includes('drive.google.com')) {
     src = getVideoEmbedUrl(url);
     isFrame = true;
  } 
  // Handle YouTube (Fallback support)
  else if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('v=') ? url.split('v=')[1]?.split('&')[0] : url.split('/').pop();
      if (videoId) {
        src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        isFrame = true;
      }
  }

  if (hasError) {
      return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
              <AlertCircle className="w-10 h-10 text-red-500 mb-2" />
              <p>Video failed to load.</p>
          </div>
      );
  }

  if (isFrame) {
    return (
      <div className="w-full h-full relative bg-black flex items-center justify-center group">
         {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-0">
                <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
            </div>
         )}
         <iframe 
            src={src} 
            title={title}
            className={`w-full h-full absolute inset-0 z-10 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            onError={() => setHasError(true)}
         />
      </div>
    );
  }

  // Native Video (direct link)
  return (
    <div className="w-full h-full bg-black relative flex items-center justify-center">
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-0">
                <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
            </div>
         )}
        <video 
            src={src} 
            controls 
            autoPlay
            poster={poster}
            className="w-full h-full object-contain relative z-10"
            playsInline
            onLoadedData={() => setIsLoading(false)}
            onError={() => setHasError(true)}
        >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </div>
  );
};

export default VideoPlayer;