import { PortfolioItem } from '../types';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webContentLink?: string; // Download/Stream link
  webViewLink?: string;    // Open in Drive link
  description?: string;
}

interface DriveResponse {
  files: DriveFile[];
  nextPageToken?: string;
}

export const fetchDriveFiles = async (folderId: string, apiKey: string): Promise<PortfolioItem[]> => {
  if (!apiKey || !folderId) {
    throw new Error("Missing API Key or Folder ID");
  }

  // Google Drive API v3 endpoint
  const url = new URL('https://www.googleapis.com/drive/v3/files');
  
  // Query to get files inside the folder, excluding trashed ones
  const query = `'${folderId}' in parents and trashed = false`;
  
  // Fields we want to retrieve
  // webContentLink is crucial for direct access
  // thumbnailLink gives us a preview
  const fields = 'files(id, name, mimeType, thumbnailLink, webContentLink, webViewLink, description)';

  url.searchParams.append('q', query);
  url.searchParams.append('key', apiKey);
  url.searchParams.append('fields', fields);
  url.searchParams.append('pageSize', '100'); // Fetch up to 100 items

  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || 'Failed to fetch Drive files');
    }

    const data: DriveResponse = await response.json();
    
    // Transform Drive files into PortfolioItems
    const items = data.files.map((file) => {
      // Determine type
      const isVideo = file.mimeType.startsWith('video/');
      const isImage = file.mimeType.startsWith('image/');

      if (!isVideo && !isImage) {
        return null;
      }

      // Use thumbnailLink for images (remove size limit for higher quality)
      // Default drive thumbnails often have =s220, we replace with =s1600 for HD
      const highResImage = file.thumbnailLink 
        ? file.thumbnailLink.replace(/=s\d+$/, '=s1600') 
        : '';

      // For direct video playback, webContentLink is used (but may require auth for some files, 
      // public folders usually allow it). 
      // NOTE: Google Drive webContentLink often forces download for large files.
      // Ideally, we use the embed link logic.
      const embedUrl = `https://drive.google.com/file/d/${file.id}/preview`;

      const item: PortfolioItem = {
        id: file.id,
        title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
        category: isVideo ? 'Video Production' : 'Photography', // Simplified category
        // If it's a video, use thumbnail as cover, else use image itself
        image: highResImage || '/jpeg/logo.jpeg', 
        description: file.description || (isVideo ? 'Cinematic Video Production' : 'Professional Photography'),
        type: isVideo ? 'video' : 'image',
        videoUrl: isVideo ? embedUrl : undefined
      };
      
      return item;
    });

    return items.filter((item): item is PortfolioItem => item !== null);

  } catch (error) {
    console.error("Drive Fetch Error:", error);
    throw error;
  }
};