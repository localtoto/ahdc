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
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] opacity-70" />
        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <h1 className="hero-title-3d text-5xl md:text-6xl font-bold mb-6">
            Find Your Dream Home
          </h1>
          <div className="relative w-full overflow-hidden mb-8 flex items-center justify-center" style={{ height: '4rem', minHeight: '4rem' }}>
            <p className="hero-subtitle-ad text-xl md:text-2xl font-medium text-white whitespace-nowrap">
              Discover exceptional properties with AHDC - Your trusted partner in luxury real estate
            </p>
          </div>
          <Button 
            variant="hero"
            onClick={() => navigate("/properties")}
          >
            View Our Listings
          </Button>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="container mx-auto px-4 py-16 glass-section rounded-3xl my-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Featured Properties</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked selection of premium properties
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading properties...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  beds={property.beds}
                  baths={property.baths}
                  description={property.description}
                  area={property.area}
                />
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <Button 
            variant="cta" 
            size="lg"
            onClick={() => navigate("/properties")}
            className="hover:scale-110 transition-transform"
          >
            View All Properties
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
