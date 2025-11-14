import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Play, X, Bed, Bath, DollarSign, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Property } from "@/data/properties";

interface PropertyGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
}

const PropertyGalleryModal = ({ isOpen, onClose, property }: PropertyGalleryModalProps) => {

  if (!property) return null;

  // Combine images and videos into a single array for the carousel
  const galleryItems: Array<{ type: 'image' | 'video'; src?: string; videoUrl?: string }> = [];

  // Add all images (fallback to main image if images array is empty)
  if (property.images && property.images.length > 0) {
    property.images.forEach((image) => {
      galleryItems.push({ type: 'image', src: image });
    });
  } else if (property.image) {
    galleryItems.push({ type: 'image', src: property.image });
  }

  // Add all local videos (no YouTube videos)
  if (property.videos && property.videos.length > 0) {
    property.videos.forEach((video) => {
      if (video.type === 'local' && video.url) {
        galleryItems.push({
          type: 'video',
          videoUrl: video.url,
        });
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-strong max-w-6xl h-[85vh] max-h-[85vh] p-0 [&>button:last-child]:hidden overflow-hidden flex flex-col animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] duration-300 border-0">
        <DialogHeader className="glass px-6 pt-5 pb-4 border-b border-white/20 relative shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3 animate-in slide-in-from-left-4 duration-500">
              <DialogTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {property.title}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full text-accent font-semibold border border-accent/20">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-base font-bold">{property.price}</span>
                </div>
                {property.area ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-primary border border-primary/20">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">{property.area}</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-primary border border-primary/20">
                      <Bed className="h-4 w-4" />
                      <span className="font-medium">{property.beds} Bed{property.beds > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-primary border border-primary/20">
                      <Bath className="h-4 w-4" />
                      <span className="font-medium">{property.baths} Bath{property.baths > 1 ? 's' : ''}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-9 w-9 rounded-full hover:bg-destructive/10 hover:text-destructive transition-all duration-200 shrink-0 animate-in fade-in-0 zoom-in-95 duration-300 hover:rotate-90"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="px-6 py-5 flex-1 overflow-hidden flex flex-col">
            <div className="relative w-full flex-1 flex flex-col animate-in fade-in-0 zoom-in-95 duration-500 delay-150">
              <div className="flex-1 flex items-center">
                <Carousel className="w-full" opts={{ align: "start" }}>
                  <CarouselContent className="-ml-0">
                    {galleryItems.length > 0 ? (
                      galleryItems.map((item, index) => (
                        <CarouselItem key={index} className="pl-0 basis-full">
                          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-secondary group shadow-2xl border-2 border-border/50 hover:border-primary/50 transition-all duration-300">
                            {item.type === 'image' ? (
                              <img
                                src={item.src}
                                alt={`${property.title} - Image ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-black">
                                {item.videoUrl ? (
                                  <video
                                    controls
                                    className="w-full h-full object-contain"
                                    src={item.videoUrl}
                                  >
                                    Your browser does not support the video tag.
                                  </video>
                                ) : (
                                  <div className="flex flex-col items-center justify-center text-white">
                                    <Play className="h-16 w-16 mb-4" />
                                    <p>Video not available</p>
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </CarouselItem>
                      ))
                    ) : (
                      <CarouselItem className="pl-0 basis-full">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-secondary flex items-center justify-center border-2 border-border/50">
                          <p className="text-muted-foreground">No media available</p>
                        </div>
                      </CarouselItem>
                    )}
                  </CarouselContent>
                  {galleryItems.length > 1 && (
                    <>
                      <CarouselPrevious className="glass left-4 border-2 border-white/30 shadow-lg hover:scale-110 transition-all duration-200 z-10 hover:shadow-xl" />
                      <CarouselNext className="glass right-4 border-2 border-white/30 shadow-lg hover:scale-110 transition-all duration-200 z-10 hover:shadow-xl" />
                    </>
                  )}
                </Carousel>
              </div>
              {galleryItems.length > 1 && (
                <div className="text-center mt-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-300">
                  <span className="glass inline-block px-4 py-2 rounded-full border border-white/20 shadow-sm font-medium text-sm text-muted-foreground">
                    {galleryItems.length} {galleryItems.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="glass px-6 pb-5 pt-4 border-t border-white/20 shrink-0 animate-in slide-in-from-bottom-4 duration-500 delay-200">
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{property.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyGalleryModal;

