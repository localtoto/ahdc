import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation, Search, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LocationSearchProps {
  onLocationChange: (location: { city: string; state: string }) => void;
  onClear: () => void;
}

const LocationSearch = ({ onLocationChange, onClear }: LocationSearchProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ city: string; state: string } | null>(null);

  // Get user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive",
      });
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocoding to get city and state
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await response.json();
          
          const location = {
            city: data.city || data.locality || "Unknown",
            state: data.principalSubdivision || data.administrativeArea || "Unknown"
          };
          
          setCurrentLocation(location);
          setSearchQuery(`${location.city}, ${location.state}`);
          onLocationChange(location);
          
          toast({
            title: "Location found!",
            description: `Showing properties near ${location.city}, ${location.state}`,
          });
        } catch (error) {
          console.error("Error getting location:", error);
          toast({
            title: "Error getting location",
            description: "Could not determine your location. Please try searching manually.",
            variant: "destructive",
          });
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        toast({
          title: "Location access denied",
          description: "Please allow location access or search manually.",
          variant: "destructive",
        });
        setIsGettingLocation(false);
      }
    );
  };

  // Handle manual search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a location",
        description: "Enter a city or area name to search.",
        variant: "destructive",
      });
      return;
    }

    // Simple location parsing (you can enhance this with a geocoding API)
    const parts = searchQuery.split(",").map(p => p.trim());
    const city = parts[0] || searchQuery;
    const state = parts[1] || "";

    const location = {
      city,
      state,
    };

    setCurrentLocation(location);
    onLocationChange(location);

    toast({
      title: "Location set!",
      description: `Showing properties in ${city}${state ? `, ${state}` : ""}`,
    });
  };

  // Clear location filter
  const handleClear = () => {
    setSearchQuery("");
    setCurrentLocation(null);
    onClear();
    toast({
      title: "Location filter cleared",
      description: "Showing all properties",
    });
  };

  return (
    <Card className="glass-card mb-6 sm:mb-8 shadow-card">
      <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-center">
          <div className="flex-1 w-full relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by city or area (e.g., Mumbai, Maharashtra)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              className="pl-9 sm:pl-10 pr-9 sm:pr-10 text-sm sm:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <Button
              onClick={handleSearch}
              variant="default"
              className="flex-1 md:flex-none text-sm sm:text-base"
            >
              <Search className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
              <span className="sm:hidden">Search</span>
            </Button>
            
            <Button
              onClick={getCurrentLocation}
              variant="outline"
              disabled={isGettingLocation}
              className="flex-1 md:flex-none text-sm sm:text-base"
            >
              <Navigation className={`mr-2 h-4 w-4 ${isGettingLocation ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">{isGettingLocation ? "Locating..." : "Use My Location"}</span>
              <span className="sm:hidden">{isGettingLocation ? "..." : "Location"}</span>
            </Button>
            
            {currentLocation && (
              <Button
                onClick={handleClear}
                variant="ghost"
                className="flex-1 md:flex-none text-sm sm:text-base"
              >
                <X className="h-4 w-4" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
            )}
          </div>
        </div>
        
        {currentLocation && (
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground animate-fade-in">
            <MapPin className="h-4 w-4 text-primary" />
            <span>
              Showing properties in <strong className="text-foreground">{currentLocation.city}</strong>
              {currentLocation.state && (
                <>, <strong className="text-foreground">{currentLocation.state}</strong></>
              )}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationSearch;

