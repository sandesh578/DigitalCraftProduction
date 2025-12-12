/**
 * Converts a Google Drive share link into a direct download/view link 
 * that can be used in <img> tags.
 * 
 * Supports:
 * - https://drive.google.com/file/d/ID/view...
 * - https://drive.google.com/open?id=ID
 */
export const getDriveDirectLink = (url: string | undefined): string => {
  if (!url) return '';
  
  // Return as is if not a google drive link
  if (!url.includes('drive.google.com') && !url.includes('docs.google.com')) {
    return url;
  }

  // Extract ID
  let id = '';
  // Match /d/ID/ or id=ID
  const matchFileId = url.match(/[-\w]{25,}/);
  if (matchFileId) id = matchFileId[0];

  if (id) {
    // lh3.googleusercontent.com/d/ID is a reliable way to host drive images for web
    return `https://lh3.googleusercontent.com/d/${id}`;
  }

  return url;
};

/**
 * Converts video URLs (YouTube, Google Drive) into embeddable iframe URLs.
 */
export const getVideoEmbedUrl = (url: string | undefined): string => {
  if (!url) return '';

  // Handle Google Drive
  if (url.includes('drive.google.com')) {
    // Convert /view to /preview for embedding
    return url.replace(/\/view.*/, '/preview').replace(/\/usp=.*/, '/preview');
  }

  // Handle YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
     if (url.includes('/embed/')) return url;
     
     let videoId = '';
     if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
     } else if (url.includes('v=')) {
        videoId = url.split('v=')[1].split('&')[0];
     }
     
     if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`;
  }

  return url;
};