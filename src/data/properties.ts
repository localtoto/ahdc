import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

export type PropertyCategory = 'rent' | 'buy' | 'land';

export interface Property {
  id: number;
  image: string;
  title: string;
  price: string;
  beds: number;
  baths: number;
  description: string;
  images: string[];
  videos?: Array<{ type: 'local'; url: string }>;
  pdfs?: Array<{ name: string; url: string }>;
  category: PropertyCategory;
  area?: string; // For land properties (in sq ft or acres)
  location: {
    city: string;
    state: string;
    address?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
}

export const properties: Property[] = [
  // Properties for Buy
  {
    id: 1,
    image: property1,
    title: "Modern Villa Estate",
    price: "₹9.96 Cr",
    beds: 4,
    baths: 3,
    description: "Stunning contemporary villa with pool, smart home features, and breathtaking views. Perfect for luxury living.",
    images: [property1, property2, property3, property4],
    category: 'buy',
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      address: "Bandra West, Mumbai",
      coordinates: { lat: 19.0596, lng: 72.8295 }
    }
  },
  {
    id: 2,
    image: property2,
    title: "Downtown Penthouse",
    price: "₹7.06 Cr",
    beds: 3,
    baths: 2,
    description: "Elegant penthouse in the heart of downtown with panoramic city views and premium finishes throughout.",
    images: [property2, property1, property4, property5],
    category: 'buy',
    location: {
      city: "Delhi",
      state: "Delhi",
      address: "Connaught Place, New Delhi",
      coordinates: { lat: 28.6304, lng: 77.2177 }
    }
  },
  {
    id: 3,
    image: property3,
    title: "Beachfront Paradise",
    price: "₹17.43 Cr",
    beds: 5,
    baths: 4,
    description: "Luxurious beachfront property with direct ocean access, private beach, and resort-style amenities.",
    images: [property3, property5, property6, property1],
    category: 'buy',
    location: {
      city: "Goa",
      state: "Goa",
      address: "Calangute Beach, Goa",
      coordinates: { lat: 15.5439, lng: 73.7553 }
    }
  },
  {
    id: 4,
    image: property4,
    title: "Mountain Retreat",
    price: "₹7.89 Cr",
    beds: 4,
    baths: 3,
    description: "Secluded mountain retreat with stunning nature views, modern rustic design, and peaceful surroundings.",
    images: [property4, property2, property3, property6],
    category: 'buy',
    location: {
      city: "Shimla",
      state: "Himachal Pradesh",
      address: "Mall Road, Shimla",
      coordinates: { lat: 31.1048, lng: 77.1734 }
    }
  },
  
  // Properties for Rent
  {
    id: 5,
    image: property5,
    title: "Urban Luxury Condo",
    price: "₹85,000/month",
    beds: 2,
    baths: 2,
    description: "Sophisticated urban condo with designer finishes, building amenities, and excellent city location. Perfect for professionals.",
    images: [property5, property1, property6, property2],
    category: 'rent',
    location: {
      city: "Bangalore",
      state: "Karnataka",
      address: "Koramangala, Bangalore",
      coordinates: { lat: 12.9352, lng: 77.6245 }
    }
  },
  {
    id: 6,
    image: property6,
    title: "Luxury Apartment",
    price: "₹1,20,000/month",
    beds: 3,
    baths: 2,
    description: "Spacious luxury apartment with modern amenities, concierge service, and prime location in the city center.",
    images: [property6, property4, property5, property3],
    category: 'rent',
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      address: "Powai, Mumbai",
      coordinates: { lat: 19.1197, lng: 72.9051 }
    }
  },
  {
    id: 7,
    image: property1,
    title: "Furnished Studio",
    price: "₹45,000/month",
    beds: 1,
    baths: 1,
    description: "Fully furnished studio apartment with modern amenities, perfect for students and young professionals.",
    images: [property1, property3, property5],
    category: 'rent',
    location: {
      city: "Pune",
      state: "Maharashtra",
      address: "Hinjewadi, Pune",
      coordinates: { lat: 18.5912, lng: 73.7389 }
    }
  },
  {
    id: 8,
    image: property2,
    title: "Family Villa Rental",
    price: "₹2,50,000/month",
    beds: 4,
    baths: 3,
    description: "Elegant family villa available for rent with garden, parking, and all modern facilities. Ideal for families.",
    images: [property2, property4, property6],
    category: 'rent',
    location: {
      city: "Gurgaon",
      state: "Haryana",
      address: "DLF Phase 5, Gurgaon",
      coordinates: { lat: 28.4089, lng: 77.0918 }
    }
  },
  
  // Land Properties
  {
    id: 9,
    image: property3,
    title: "Residential Plot",
    price: "₹4,500/sq ft",
    area: "2,400 sq ft",
    beds: 0,
    baths: 0,
    description: "Prime residential plot in a well-developed area with all utilities and clear title. Perfect for building your dream home.",
    images: [property3, property1, property5, property2, property4, property6],
    videos: [
      // Add your video URLs here when available
      // Example: { type: 'local', url: '/videos/residential-plot-tour.mp4' }
    ],
    category: 'land',
    location: {
      city: "Noida",
      state: "Uttar Pradesh",
      address: "Sector 62, Noida",
      coordinates: { lat: 28.6274, lng: 77.3730 }
    }
  },
  {
    id: 10,
    image: property4,
    title: "Commercial Land",
    price: "₹8,000/sq ft",
    area: "5,000 sq ft",
    beds: 0,
    baths: 0,
    description: "Premium commercial land in prime location, ideal for business development, shops, or offices. High ROI potential.",
    images: [property4, property2, property6, property1, property3, property5],
    videos: [
      // Add your video URLs here when available
      // Example: { type: 'local', url: '/videos/commercial-land-tour.mp4' }
    ],
    category: 'land',
    location: {
      city: "Hyderabad",
      state: "Telangana",
      address: "HITEC City, Hyderabad",
      coordinates: { lat: 17.4486, lng: 78.3908 }
    }
  },
  {
    id: 11,
    image: property5,
    title: "Farmland",
    price: "₹25 Lakh/acre",
    area: "3 acres",
    beds: 0,
    baths: 0,
    description: "Agricultural land with fertile soil, water access, and road connectivity. Perfect for farming or investment.",
    images: [property5, property1, property3, property6, property2, property4],
    videos: [
      // Add your video URLs here when available
      // Example: { type: 'local', url: '/videos/farmland-tour.mp4' }
    ],
    category: 'land',
    location: {
      city: "Punjab",
      state: "Punjab",
      address: "Ludhiana District, Punjab",
      coordinates: { lat: 30.9010, lng: 75.8573 }
    }
  },
  {
    id: 12,
    image: property6,
    title: "Industrial Plot",
    price: "₹6,500/sq ft",
    area: "10,000 sq ft",
    beds: 0,
    baths: 0,
    description: "Spacious industrial plot in industrial zone with all necessary approvals and infrastructure. Ready for development.",
    images: [property6, property4, property2, property3, property1, property5],
    videos: [
      // Add your video URLs here when available
      // Example: { type: 'local', url: '/videos/industrial-plot-tour.mp4' }
    ],
    category: 'land',
    location: {
      city: "Ahmedabad",
      state: "Gujarat",
      address: "Sanand Industrial Area, Ahmedabad",
      coordinates: { lat: 22.9734, lng: 72.5011 }
    }
  }
];
