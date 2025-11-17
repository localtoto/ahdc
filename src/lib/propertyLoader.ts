import type { Property, PropertyCategory } from "@/data/properties";

// Dynamic property loader using Vite's import.meta.glob
// This automatically discovers all property directories
export async function loadProperties(): Promise<Property[]> {
  // Get all data.json files from property directories (excluding _template)
  const propertyModules = import.meta.glob('/src/properties/*/data.json', { 
    eager: true,
    import: 'default'
  });

  // Pre-load all images and videos with static glob patterns (Vite requires static patterns)
  const allImageModules = import.meta.glob('/src/properties/*/images/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default'
  });

  const allVideoModules = import.meta.glob('/src/properties/*/videos/*.{mp4,webm,mov}', {
    eager: true,
    import: 'default'
  });

  const allPdfModules = import.meta.glob('/src/properties/*/documents/*.pdf', {
    eager: true,
    import: 'default'
  });

  const properties: Property[] = [];

  for (const [path, data] of Object.entries(propertyModules)) {
    // Skip template directory
    if (path.includes('/_template/')) continue;

    try {
      const propertyData = data as any;
      const propertyDir = path.replace('/data.json', '');
      const propertyId = propertyDir.split('/').pop() || '';

      // Filter images for this specific property
      const propertyImagePath = `/src/properties/${propertyId}/images/`;
      const images: string[] = [];
      
      // If images array is specified in data.json, use those paths
      if (propertyData.images && Array.isArray(propertyData.images) && propertyData.images.length > 0) {
        for (const imagePath of propertyData.images) {
          const imageFileName = String(imagePath).split('/').pop() || '';
          // Find matching image module for this property
          const matchedPath = Object.keys(allImageModules).find(key => 
            key.startsWith(propertyImagePath) && key.endsWith(imageFileName)
          );
          if (matchedPath && allImageModules[matchedPath]) {
            images.push(allImageModules[matchedPath] as string);
          }
        }
      }
      
      if (images.length === 0) {
        // Fallback: load all images for this property in order
        const propertyImagesList = Object.entries(allImageModules)
          .filter(([key]) => key.startsWith(propertyImagePath))
          .map(([, value]) => value as string);
        images.push(...propertyImagesList);
      }

      // Filter videos for this specific property
      const propertyVideoPath = `/src/properties/${propertyId}/videos/`;
      const videos: Array<{ type: 'local'; url: string }> = [];
      
      if (propertyData.videos && Array.isArray(propertyData.videos) && propertyData.videos.length > 0) {
        for (const videoEntry of propertyData.videos) {
          const videoPath = typeof videoEntry === 'string' ? videoEntry : videoEntry?.file || '';
          const videoFileName = videoPath.split('/').pop() || '';
          const matchedPath = Object.keys(allVideoModules).find(key =>
            key.startsWith(propertyVideoPath) && key.endsWith(videoFileName)
          );
          if (matchedPath && allVideoModules[matchedPath]) {
            videos.push({ type: 'local', url: allVideoModules[matchedPath] as string });
          }
        }
      }
      
      if (videos.length === 0) {
        const fallbackVideos = Object.entries(allVideoModules)
          .filter(([key]) => key.startsWith(propertyVideoPath))
          .map(([, url]) => ({
            type: 'local' as const,
            url: url as string
          }));
        videos.push(...fallbackVideos);
      }

      // Filter PDFs for this specific property
      const propertyDocumentPath = `/src/properties/${propertyId}/documents/`;
      const pdfs: Array<{ name: string; url: string }> = [];
      
      if (propertyData.documents && Array.isArray(propertyData.documents) && propertyData.documents.length > 0) {
        for (const docEntry of propertyData.documents) {
          const docPath = typeof docEntry === 'string' ? docEntry : docEntry?.file || '';
          const docFileName = docPath.split('/').pop() || '';
          const matchedEntry = Object.entries(allPdfModules).find(([key]) =>
            key.startsWith(propertyDocumentPath) && key.endsWith(docFileName)
          );
          if (matchedEntry) {
            const [key, url] = matchedEntry;
            const fallbackName = docFileName.replace('.pdf', '').replace(/-/g, ' ');
            pdfs.push({
              name: (typeof docEntry === 'object' && docEntry?.name) || fallbackName,
              url: url as string
            });
          }
        }
      }
      
      if (pdfs.length === 0) {
        const fallbackPdfs = Object.entries(allPdfModules)
          .filter(([key]) => key.startsWith(propertyDocumentPath))
          .map(([key, url]) => {
            const fileName = key.split('/').pop() || 'document.pdf';
            return {
              name: fileName.replace('.pdf', '').replace(/-/g, ' '),
              url: url as string
            };
          });
        pdfs.push(...fallbackPdfs);
      }

      // Construct property object
      const price = propertyData.price || propertyData.rate || '';
      const categories: PropertyCategory[] =
        Array.isArray(propertyData.categories) && propertyData.categories.length > 0
          ? propertyData.categories
          : propertyData.category
          ? [propertyData.category]
          : ["buy"];
      const location = propertyData.location
        ? {
            city: propertyData.location.city || "",
            state: propertyData.location.state || "",
            address: propertyData.location.address,
          }
        : { city: "", state: "" };

      const property: Property = {
        id: parseInt(propertyData.id) || properties.length + 1,
        image: images[0] || '', // First image as main image
        title: propertyData.title || `Property ${propertyId}`,
        price,
        description: propertyData.description || "",
        images: images,
        videos: videos.length > 0 ? videos : undefined,
        pdfs: pdfs.length > 0 ? pdfs : undefined,
        categories,
        category: categories[0],
        area: propertyData.area,
        totalLand: propertyData.totalLand,
        plotSize: propertyData.plotSize,
        rate: propertyData.rate || price,
        locality: propertyData.locality,
        location,
      };

      properties.push(property);
    } catch (error) {
      console.error(`Error loading property from ${path}:`, error);
    }
  }

  // Sort by ID to maintain order
  return properties.sort((a, b) => a.id - b.id);
}

// Load a single property by ID
export async function loadPropertyById(id: number): Promise<Property | null> {
  const properties = await loadProperties();
  return properties.find(p => p.id === id) || null;
}

