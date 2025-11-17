import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, MapPin, Ruler, Square, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import overlayImage from "@/assets/property-1.jpg";

interface PropertyCardProps {
  id: number;
  image: string;
  title: string;
  price: string;
  description: string;
  totalLand?: string;
  plotSize?: string;
  rate?: string;
  location?: {
    city: string;
    state: string;
    address?: string;
  };
}

const PropertyCard = ({ id, image, title, price, description, totalLand, plotSize, rate, location }: PropertyCardProps) => {
  const navigate = useNavigate();
  const locationLabel = location
    ? [location.address, location.city, location.state].filter(Boolean).join(", ")
    : undefined;
  const displayRate = rate || price;
  
  const handleDetailsClick = () => {
    navigate(`/property/${id}`);
  };
  
  return (
    <Card className="glass-card overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <img 
            src={overlayImage} 
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        </div>
      </div>
      
      <CardHeader className="p-4 sm:p-6">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg sm:text-xl flex-1 min-w-0">{title}</CardTitle>
          <span className="text-lg sm:text-xl font-bold text-accent flex-shrink-0">{price}</span>
        </div>
        <CardDescription className="flex gap-2 sm:gap-3 mt-3 flex-wrap text-xs sm:text-sm">
          {locationLabel && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              <MapPin className="h-3.5 w-3.5" />
              {locationLabel}
            </span>
          )}
          {plotSize && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/40 text-foreground border border-border/40">
              <Ruler className="h-3.5 w-3.5" />
              Plot {plotSize}
            </span>
          )}
          {totalLand && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/40 text-foreground border border-border/40">
              <Square className="h-3.5 w-3.5" />
              Total {totalLand}
            </span>
          )}
          {displayRate && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
              <IndianRupee className="h-3.5 w-3.5" />
              {displayRate}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6 pt-0">
        <p className="text-sm sm:text-base text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
      
      <CardFooter className="p-4 sm:p-6 pt-0">
        <Button 
          variant="cta" 
          className="w-full text-sm sm:text-base"
          onClick={handleDetailsClick}
        >
          <Info className="mr-2 h-4 w-4" />
          Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
