import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Bed, Bath, DollarSign, MapPin, ArrowLeft, FileText, Download, ExternalLink } from "lucide-react";
import { loadPropertyById } from "@/lib/propertyLoader";
import { Property } from "@/data/properties";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const propertyData = await loadPropertyById(parseInt(id));
        setProperty(propertyData);
      } catch (error) {
        console.error("Error loading property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <p className="text-muted-foreground mb-6">The property you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/properties")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  const isLand = property.area !== undefined;
  const galleryItems = [
    ...property.images.map(img => ({ type: 'image' as const, src: img })),
    ...(property.videos || []).map(video => ({ type: 'video' as const, url: video.url }))
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/properties")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Properties
        </Button>

        {/* Property Header */}
        <Card className="glass-card mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
                  {property.title}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent font-semibold border border-accent/20">
                    <DollarSign className="h-5 w-5" />
                    <span className="text-xl font-bold">{property.price}</span>
                  </div>
                  {isLand ? (
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary border border-primary/20">
                      <MapPin className="h-5 w-5" />
                      <span className="font-medium">{property.area}</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary border border-primary/20">
                        <Bed className="h-5 w-5" />
                        <span className="font-medium">{property.beds} Bed{property.beds > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary border border-primary/20">
                        <Bath className="h-5 w-5" />
                        <span className="font-medium">{property.baths} Bath{property.baths > 1 ? 's' : ''}</span>
                      </div>
                    </>
                  )}
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary border border-primary/20">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">{property.location.address || `${property.location.city}, ${property.location.state}`}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Gallery Section */}
        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            {galleryItems.length > 0 ? (
              <Carousel className="w-full" opts={{ align: "start" }}>
                <CarouselContent className="-ml-0">
                  {galleryItems.map((item, index) => (
                    <CarouselItem key={index} className="pl-0 basis-full">
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-secondary group shadow-2xl border-2 border-border/50 hover:border-primary/50 transition-all duration-300">
                        {item.type === 'image' ? (
                          <img
                            src={item.src}
                            alt={`${property.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-black relative">
                            {item.url ? (
                              <video
                                controls
                                preload="metadata"
                                className="w-full h-full object-contain z-10"
                                src={item.url}
                                playsInline
                              >
                                Your browser does not support the video tag.
                              </video>
                            ) : null}
                          </div>
                        )}
                        {item.type === 'image' && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {galleryItems.length > 1 && (
                  <>
                    <CarouselPrevious className="glass left-4 border-2 border-white/30 shadow-lg hover:scale-110 transition-all duration-200 z-10 hover:shadow-xl" />
                    <CarouselNext className="glass right-4 border-2 border-white/30 shadow-lg hover:scale-110 transition-all duration-200 z-10 hover:shadow-xl" />
                  </>
                )}
              </Carousel>
            ) : (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-secondary flex items-center justify-center border-2 border-border/50">
                <p className="text-muted-foreground">No media available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Documents/PDFs Section */}
        {property.pdfs && property.pdfs.length > 0 && (
          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Property Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.pdfs.map((pdf, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex-shrink-0 w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-destructive" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{pdf.name}</p>
                        <p className="text-xs text-muted-foreground">PDF Document</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(pdf.url, '_blank')}
                        className="hover:bg-primary/10"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = pdf.url;
                          link.download = pdf.name + '.pdf';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="hover:bg-primary/10"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Description Section */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">About This Property</CardTitle>
              {property.pdfs && property.pdfs.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    // Open the first PDF in a new tab
                    if (property.pdfs && property.pdfs[0]) {
                      window.open(property.pdfs[0].url, '_blank');
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  View Brochure
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              {property.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PropertyDetail;

