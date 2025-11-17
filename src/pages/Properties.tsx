import { useState, useMemo, useCallback, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import LocationSearch from "@/components/LocationSearch";
import { Property, PropertyCategory } from "@/data/properties";
import { loadProperties } from "@/lib/propertyLoader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Home, Key, MapPin } from "lucide-react";

const hasCategory = (property: Property, category: PropertyCategory) =>
  property.categories?.includes(category) ?? property.category === category;

const Properties = () => {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<PropertyCategory>('buy');
  const [selectedLocation, setSelectedLocation] = useState<{ city: string; state: string } | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const properties = await loadProperties();
        setAllProperties(properties);
      } catch (error) {
        console.error("Error loading properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties by location
  const filterByLocation = useCallback((propertyList: Property[]) => {
    if (!selectedLocation) return propertyList;

    return propertyList.filter(property => {
      const cityMatch = property.location.city.toLowerCase().includes(selectedLocation.city.toLowerCase());
      const stateMatch = property.location.state.toLowerCase().includes(selectedLocation.state.toLowerCase());
      return cityMatch || stateMatch;
    });
  }, [selectedLocation]);

  const buyProperties = useMemo(() => {
    const filtered = allProperties.filter(property => hasCategory(property, 'buy'));
    return filterByLocation(filtered);
  }, [allProperties, filterByLocation]);

  const rentProperties = useMemo(() => {
    const filtered = allProperties.filter(property => hasCategory(property, 'rent'));
    return filterByLocation(filtered);
  }, [allProperties, filterByLocation]);

  const landProperties = useMemo(() => {
    const filtered = allProperties.filter(property => hasCategory(property, 'land'));
    return filterByLocation(filtered);
  }, [allProperties, filterByLocation]);

  const renderPropertyGrid = (propertyList: Property[]) => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading properties...</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {propertyList.map((property, index) => (
          <div
            key={property.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
          >
            <PropertyCard
              id={property.id}
              image={property.image}
              title={property.title}
              price={property.price}
              description={property.description}
              totalLand={property.totalLand}
              plotSize={property.plotSize}
              rate={property.rate}
              location={property.location}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3 sm:mb-4 px-2">Our Properties</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Browse through our exclusive collection of luxury properties
          </p>
        </div>

        {/* Location Search Component */}
        <LocationSearch
          onLocationChange={(location) => setSelectedLocation(location)}
          onClear={() => setSelectedLocation(null)}
        />
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as PropertyCategory)} className="w-full">
          <TabsList className="glass-card grid w-full max-w-2xl mx-auto grid-cols-3 mb-6 sm:mb-8 h-10 sm:h-12 border-0 gap-1 sm:gap-2">
            <TabsTrigger value="buy" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all px-2 sm:px-4">
              <Home className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Buy Property</span>
              <span className="sm:hidden">Buy</span>
            </TabsTrigger>
            <TabsTrigger value="rent" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all px-2 sm:px-4">
              <Key className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Rent Property</span>
              <span className="sm:hidden">Rent</span>
            </TabsTrigger>
            <TabsTrigger value="land" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all px-2 sm:px-4">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Land</span>
              <span className="sm:hidden">Land</span>
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
    </div>
  );
};

export default Properties;
