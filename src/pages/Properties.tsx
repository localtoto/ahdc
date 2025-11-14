import { useState, useMemo, useCallback } from "react";
import PropertyCard from "@/components/PropertyCard";
import PropertyGalleryModal from "@/components/PropertyGalleryModal";
import LocationSearch from "@/components/LocationSearch";
import { properties, Property, PropertyCategory } from "@/data/properties";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Home, Key, MapPin } from "lucide-react";

// Helper function to calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const Properties = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeTab, setActiveTab] = useState<PropertyCategory>('buy');
  const [selectedLocation, setSelectedLocation] = useState<{ city: string; state: string; coordinates?: { lat: number; lng: number } } | null>(null);

  // Filter properties by location
  const filterByLocation = useCallback((propertyList: Property[]) => {
    if (!selectedLocation) return propertyList;

    return propertyList.filter(property => {
      // Match by city and state
      const cityMatch = property.location.city.toLowerCase().includes(selectedLocation.city.toLowerCase());
      const stateMatch = property.location.state.toLowerCase().includes(selectedLocation.state.toLowerCase());
      
      // If coordinates are available, also check distance (within 50km)
      if (selectedLocation.coordinates && property.location.coordinates) {
        const distance = calculateDistance(
          selectedLocation.coordinates.lat,
          selectedLocation.coordinates.lng,
          property.location.coordinates.lat,
          property.location.coordinates.lng
        );
        return distance <= 50; // Within 50km
      }
      
      return cityMatch || stateMatch;
    });
  }, [selectedLocation]);

  const buyProperties = useMemo(() => {
    const filtered = properties.filter(property => property.category === 'buy');
    return filterByLocation(filtered);
  }, [filterByLocation]);

  const rentProperties = useMemo(() => {
    const filtered = properties.filter(property => property.category === 'rent');
    return filterByLocation(filtered);
  }, [filterByLocation]);

  const landProperties = useMemo(() => {
    const filtered = properties.filter(property => property.category === 'land');
    return filterByLocation(filtered);
  }, [filterByLocation]);

  const renderPropertyGrid = (propertyList: Property[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {propertyList.map((property, index) => (
        <div
          key={property.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
        >
          <PropertyCard
            image={property.image}
            title={property.title}
            price={property.price}
            beds={property.beds}
            baths={property.baths}
            description={property.description}
            area={property.area}
            onVideoClick={() => setSelectedProperty(property)}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Properties</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through our exclusive collection of luxury properties
          </p>
        </div>

        {/* Location Search Component */}
        <LocationSearch
          onLocationChange={(location) => setSelectedLocation(location)}
          onClear={() => setSelectedLocation(null)}
        />
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as PropertyCategory)} className="w-full">
          <TabsList className="glass-card grid w-full max-w-2xl mx-auto grid-cols-3 mb-8 h-12 border-0">
            <TabsTrigger value="buy" className="flex items-center gap-2 text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
              <Home className="h-4 w-4" />
              Buy Property
            </TabsTrigger>
            <TabsTrigger value="rent" className="flex items-center gap-2 text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
              <Key className="h-4 w-4" />
              Rent Property
            </TabsTrigger>
            <TabsTrigger value="land" className="flex items-center gap-2 text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
              <MapPin className="h-4 w-4" />
              Land
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="mt-0 animate-in fade-in-0 duration-300">
            {buyProperties.length > 0 ? (
              renderPropertyGrid(buyProperties)
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No properties available for purchase at the moment.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="rent" className="mt-0 animate-in fade-in-0 duration-300">
            {rentProperties.length > 0 ? (
              renderPropertyGrid(rentProperties)
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No rental properties available at the moment.</p>
            </div>
            )}
          </TabsContent>

          <TabsContent value="land" className="mt-0 animate-in fade-in-0 duration-300">
            {landProperties.length > 0 ? (
              renderPropertyGrid(landProperties)
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No land properties available at the moment.</p>
        </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Property Gallery Modal */}
      {selectedProperty && (
        <PropertyGalleryModal
          isOpen={!!selectedProperty}
          onClose={() => setSelectedProperty(null)}
          property={selectedProperty}
        />
      )}
    </div>
  );
};

export default Properties;
