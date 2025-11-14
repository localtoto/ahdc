import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Play, MapPin } from "lucide-react";
import overlayImage from "@/assets/property-1.jpg";

interface PropertyCardProps {
  image: string;
  title: string;
  price: string;
  beds: number;
  baths: number;
  description: string;
  area?: string;
  onVideoClick: () => void;
}

const PropertyCard = ({ image, title, price, beds, baths, description, area, onVideoClick }: PropertyCardProps) => {
  const isLand = area !== undefined;
  
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
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          <span className="text-xl font-bold text-accent">{price}</span>
        </div>
        <CardDescription className="flex gap-4 mt-2 flex-wrap">
          {isLand ? (
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {area}
            </span>
          ) : (
            <>
          <span className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
                {beds} Bed{beds !== 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
                {baths} Bath{baths !== 1 ? 's' : ''}
          </span>
            </>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="cta" 
          className="w-full"
          onClick={onVideoClick}
        >
          <Play className="mr-2 h-4 w-4" />
          {isLand ? 'View Land' : 'Watch Property'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
