/**
 * Converts a Google Drive share link into a direct download/view link 
 * that can be used in <img> tags.
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
 * Converts Google Drive video URLs into embeddable iframe URLs.
 * Strictly formats for Google Drive /preview mode.
 */
export const getVideoEmbedUrl = (url: string | undefined): string => {
  if (!url) return '';

  // Handle Google Drive
  if (url.includes('drive.google.com')) {
    // We need the ID to construct a clean preview URL
    const matchFileId = url.match(/[-\w]{25,}/);
    const id = matchFileId ? matchFileId[0] : null;

    if (id) {
      return `https://drive.google.com/file/d/${id}/preview`;
    }
  }

  // Fallback: Return URL as is, but we prioritize Drive above.
  return url;
};