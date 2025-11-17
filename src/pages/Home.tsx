import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import { loadProperties } from "@/lib/propertyLoader";
import { Property } from "@/data/properties";
import heroImage from "@/assets/hero-bg.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const properties = await loadProperties();
        setFeaturedProperties(properties.slice(0, 3));
      } catch (error) {
        console.error("Error loading properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] opacity-70" />
        <div className="relative z-10 text-center text-white px-4 sm:px-6 md:px-8 animate-fade-in max-w-4xl mx-auto">
          <h1 className="hero-title-3d text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
            Find Your Dream Home
          </h1>
          <div className="relative w-full overflow-hidden mb-6 sm:mb-8 flex items-center justify-center" style={{ height: '3rem', minHeight: '3rem' }}>
            <p className="hero-subtitle-ad text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-white whitespace-nowrap px-2">
              Discover exceptional properties with AHDC - Your trusted partner in luxury real estate
            </p>
          </div>
          <Button 
            variant="hero"
            size="lg"
            className="text-sm sm:text-base px-6 sm:px-8"
            onClick={() => navigate("/properties")}
          >
            View Our Listings
          </Button>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 glass-section rounded-2xl sm:rounded-3xl my-4 sm:my-6 md:my-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-4 px-2">Featured Properties</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Explore our handpicked selection of premium properties
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading properties...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {featuredProperties.map((property, index) => (
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
        )}

        <div className="text-center mt-8 sm:mt-10 md:mt-12 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <Button 
            variant="cta" 
            size="lg"
            onClick={() => navigate("/properties")}
            className="hover:scale-110 transition-transform text-sm sm:text-base px-6 sm:px-8"
          >
            View All Properties
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
