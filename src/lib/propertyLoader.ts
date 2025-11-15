import type { Property } from "@/data/properties";

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
      if (propertyData.images && Array.isArray(propertyData.images)) {
        for (const imagePath of propertyData.images) {
          const imageFileName = imagePath.split('/').pop() || '';
          // Find matching image module for this property
          const matchedPath = Object.keys(allImageModules).find(key => 
            key.startsWith(propertyImagePath) && key.includes(imageFileName)
          );
          if (matchedPath && allImageModules[matchedPath]) {
            images.push(allImageModules[matchedPath] as string);
          }
        }
      } else {
        // Fallback: load all images for this property in order
        const propertyImagesList = Object.entries(allImageModules)
          .filter(([key]) => key.startsWith(propertyImagePath))
          .map(([, value]) => value as string);
        images.push(...propertyImagesList);
      }

      // Filter videos for this specific property
      const propertyVideoPath = `/src/properties/${propertyId}/videos/`;
      const videos = Object.entries(allVideoModules)
        .filter(([key]) => key.startsWith(propertyVideoPath))
        .map(([, url]) => ({
          type: 'local' as const,
          url: url as string
        }));

      // Filter PDFs for this specific property
      const propertyDocumentPath = `/src/properties/${propertyId}/documents/`;
      const pdfs = Object.entries(allPdfModules)
        .filter(([key]) => key.startsWith(propertyDocumentPath))
        .map(([key, url]) => {
          const fileName = key.split('/').pop() || 'document.pdf';
          return {
            name: fileName.replace('.pdf', '').replace(/-/g, ' '),
            url: url as string
          };
        });

      // Construct property object
      const property: Property = {
        id: parseInt(propertyData.id) || properties.length + 1,
        image: images[0] || '', // First image as main image
        title: propertyData.title,
        price: propertyData.price,
        beds: propertyData.beds || 0,
        baths: propertyData.baths || 0,
        description: propertyData.description,
        images: images,
        videos: videos.length > 0 ? videos : undefined,
        pdfs: pdfs.length > 0 ? pdfs : undefined,
        category: propertyData.category,
        area: propertyData.area,
        location: propertyData.location
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

