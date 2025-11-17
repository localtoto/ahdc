import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

export type PropertyCategory = 'rent' | 'buy' | 'land';

export type LocalityDirection = {
  place: string;
  distance: string;
};

export type LocalityMap = {
  east?: LocalityDirection;
  west?: LocalityDirection;
  north?: LocalityDirection;
  south?: LocalityDirection;
};

export interface Property {
  id: number;
  image: string;
  title: string;
  price: string;
  description: string;
  images: string[];
  videos?: Array<{ type: 'local'; url: string }>;
  pdfs?: Array<{ name: string; url: string }>;
  categories: PropertyCategory[];
  category?: PropertyCategory; // legacy single category
  area?: string; // For land properties (in sq ft or acres)
  totalLand?: string;
  plotSize?: string;
  rate?: string;
  locality?: LocalityMap;
  location: {
    city: string;
    state: string;
    address?: string;
  };
}

export const properties: Property[] = [
  // Properties for Buy
  {
    id: 1,
    image: property1,
    title: "Modern Villa Estate",
    price: "₹9.96 Cr",
    description: "Stunning contemporary villa with pool, smart home features, and breathtaking views. Perfect for luxury living.",
    images: [property1, property2, property3, property4],
    totalLand: "12,000 sq ft",
    plotSize: "3,000 sq ft",
    rate: "₹83,000 / sq ft",
    locality: {
      east: { place: "Bandra Worli Sea Link", distance: "2 km" },
      west: { place: "Carter Road Promenade", distance: "1.2 km" },
      north: { place: "Bandra Station", distance: "3 km" },
      south: { place: "Worli Business District", distance: "4.5 km" },
    },
    categories: ['buy', 'land'],
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      address: "Bandra West, Mumbai"
    }
  },
  {
    id: 2,
    image: property2,
    title: "Downtown Penthouse",
    price: "₹7.06 Cr",
    description: "Elegant penthouse in the heart of downtown with panoramic city views and premium finishes throughout.",
    images: [property2, property1, property4, property5],
    totalLand: "8,400 sq ft",
    plotSize: "2,100 sq ft",
    rate: "₹68,000 / sq ft",
    locality: {
      east: { place: "India Gate", distance: "2.8 km" },
      west: { place: "Connaught Place Inner Circle", distance: "500 m" },
      north: { place: "Rajiv Chowk Metro Station", distance: "700 m" },
      south: { place: "Pragati Maidan", distance: "3.2 km" },
    },
    categories: ['buy', 'rent', 'land'],
    location: {
      city: "Delhi",
      state: "Delhi",
      address: "Connaught Place, New Delhi"
    }
  },
  {
    id: 3,
    image: property3,
    title: "Beachfront Paradise",
    price: "₹17.43 Cr",
    description: "Luxurious beachfront property with direct ocean access, private beach, and resort-style amenities.",
    images: [property3, property5, property6, property1],
    totalLand: "18,000 sq ft",
    plotSize: "4,500 sq ft",
    rate: "₹96,000 / sq ft",
    locality: {
      east: { place: "Calangute Beach", distance: "150 m" },
      west: { place: "Candolim Market", distance: "2.1 km" },
      north: { place: "Fort Aguada", distance: "4 km" },
      south: { place: "Baga Night Market", distance: "3 km" },
    },
    categories: ['buy', 'land'],
    location: {
      city: "Goa",
      state: "Goa",
      address: "Calangute Beach, Goa"
    }
  },
  {
    id: 4,
    image: property4,
    title: "Mountain Retreat",
    price: "₹7.89 Cr",
    description: "Secluded mountain retreat with stunning nature views, modern rustic design, and peaceful surroundings.",
    images: [property4, property2, property3, property6],
    totalLand: "22,500 sq ft",
    plotSize: "5,500 sq ft",
    rate: "₹35,000 / sq ft",
    locality: {
      east: { place: "Jakhoo Temple", distance: "3 km" },
      west: { place: "Mall Road", distance: "1.5 km" },
      north: { place: "Shimla Ridge", distance: "2.2 km" },
      south: { place: "Summer Hill Station", distance: "6 km" },
    },
    categories: ['buy', 'land'],
    location: {
      city: "Shimla",
      state: "Himachal Pradesh",
      address: "Mall Road, Shimla"
    }
  },
  
  // Properties for Rent
  {
    id: 5,
    image: property5,
    title: "Urban Luxury Condo",
    price: "₹85,000/month",
    description: "Sophisticated urban condo with designer finishes, building amenities, and excellent city location. Perfect for professionals.",
    images: [property5, property1, property6, property2],
    totalLand: "4,800 sq ft",
    plotSize: "1,200 sq ft",
    rate: "₹85,000 / month",
    locality: {
      east: { place: "Koramangala Forum Mall", distance: "1.8 km" },
      west: { place: "HSR Layout", distance: "2.5 km" },
      north: { place: "MG Road", distance: "6 km" },
      south: { place: "Electronic City", distance: "12 km" },
    },
    categories: ['rent', 'land'],
    location: {
      city: "Bangalore",
      state: "Karnataka",
      address: "Koramangala, Bangalore"
    }
  },
  {
    id: 6,
    image: property6,
    title: "Luxury Apartment",
    price: "₹1,20,000/month",
    description: "Spacious luxury apartment with modern amenities, concierge service, and prime location in the city center.",
    images: [property6, property4, property5, property3],
    totalLand: "5,600 sq ft",
    plotSize: "1,400 sq ft",
    rate: "₹1.2 Lakh / month",
    locality: {
      east: { place: "Powai Lake", distance: "1 km" },
      west: { place: "LBS Marg", distance: "2 km" },
      north: { place: "JVLR", distance: "3 km" },
      south: { place: "Andheri Business District", distance: "6 km" },
    },
    categories: ['rent', 'land'],
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      address: "Powai, Mumbai"
    }
  },
  {
    id: 7,
    image: property1,
    title: "Furnished Studio",
    price: "₹45,000/month",
    description: "Fully furnished studio apartment with modern amenities, perfect for students and young professionals.",
    images: [property1, property3, property5],
    totalLand: "2,200 sq ft",
    plotSize: "650 sq ft",
    rate: "₹45,000 / month",
    locality: {
      east: { place: "Hinjewadi IT Park", distance: "4 km" },
      west: { place: "Balewadi High Street", distance: "3 km" },
      north: { place: "Mumbai-Pune Expressway", distance: "5 km" },
      south: { place: "Aundh", distance: "6 km" },
    },
    categories: ['rent'],
    location: {
      city: "Pune",
      state: "Maharashtra",
      address: "Hinjewadi, Pune"
    }
  },
  {
    id: 8,
    image: property2,
    title: "Family Villa Rental",
    price: "₹2,50,000/month",
    description: "Elegant family villa available for rent with garden, parking, and all modern facilities. Ideal for families.",
    images: [property2, property4, property6],
    totalLand: "9,800 sq ft",
    plotSize: "2,800 sq ft",
    rate: "₹2.5 Lakh / month",
    locality: {
      east: { place: "Cyber Hub", distance: "3.5 km" },
      west: { place: "Golf Course Road", distance: "2 km" },
      north: { place: "NH-48", distance: "4 km" },
      south: { place: "Sikanderpur Metro", distance: "2.5 km" },
    },
    categories: ['rent'],
    location: {
      city: "Gurgaon",
      state: "Haryana",
      address: "DLF Phase 5, Gurgaon"
    }
  },
  
  // Land Properties
  {
    id: 9,
    image: property3,
    title: "Residential Plot",
    price: "₹4,500/sq ft",
    area: "2,400 sq ft",
    description: "Prime residential plot in a well-developed area with all utilities and clear title. Perfect for building your dream home.",
    images: [property3, property1, property5, property2, property4, property6],
    totalLand: "2,400 sq ft",
    plotSize: "40 ft x 60 ft",
    rate: "₹4,500 / sq ft",
    locality: {
      east: { place: "Sector 62 Metro", distance: "1.8 km" },
      west: { place: "Fortis Hospital", distance: "3 km" },
      north: { place: "NH-24", distance: "2.5 km" },
      south: { place: "IT Park", distance: "1.2 km" },
    },
    videos: [
      // Add your video URLs here when available
      // Example: { type: 'local', url: '/videos/residential-plot-tour.mp4' }
    ],
    categories: ['land'],
    location: {
      city: "Noida",
      state: "Uttar Pradesh",
      address: "Sector 62, Noida"
    }
  },
  {
    id: 10,
    image: property4,
    title: "Commercial Land",
    price: "₹8,000/sq ft",
    area: "5,000 sq ft",
    description: "Premium commercial land in prime location, ideal for business development, shops, or offices. High ROI potential.",
    images: [property4, property2, property6, property1, property3, property5],
    totalLand: "5,000 sq ft",
    plotSize: "50 ft x 100 ft",
    rate: "₹8,000 / sq ft",
    locality: {
      east: { place: "Mindspace IT Park", distance: "2 km" },
      west: { place: "Miyapur Metro", distance: "3.5 km" },
      north: { place: "Gachibowli", distance: "5 km" },
      south: { place: "HITEC City MMTS", distance: "2.8 km" },
    },
    videos: [
      // Add your video URLs here when available
      // Example: { type: 'local', url: '/videos/commercial-land-tour.mp4' }
    ],
    categories: ['land'],
    location: {
      city: "Hyderabad",
      state: "Telangana",
      address: "HITEC City, Hyderabad"
    }
  },
  {
    id: 11,
    image: property5,
    title: "Farmland",
    price: "₹25 Lakh/acre",
    area: "3 acres",
    description: "Agricultural land with fertile soil, water access, and road connectivity. Perfect for farming or investment.",
    images: [property5, property1, property3, property6, property2, property4],
    totalLand: "3 acres",
    plotSize: "1 acre parcels",
    rate: "₹25 Lakh / acre",
    locality: {
      east: { place: "Canal Road", distance: "1 km" },
      west: { place: "Village Market", distance: "2 km" },
      north: { place: "Railway Crossing", distance: "3.5 km" },
      south: { place: "State Highway", distance: "4 km" },
    },
    videos: [
      // Add your video URLs here when available
      // Example: { type: 'local', url: '/videos/farmland-tour.mp4' }
    ],
    categories: ['land'],
    location: {
      city: "Punjab",
      state: "Punjab",
      address: "Ludhiana District, Punjab"
    }
  },
  {
    id: 12,
    image: property6,
    title: "Industrial Plot",
    price: "₹6,500/sq ft",
    area: "10,000 sq ft",
    description: "Spacious industrial plot in industrial zone with all necessary approvals and infrastructure. Ready for development.",
    images: [property6, property4, property2, property3, property1, property5],
    totalLand: "10,000 sq ft",
    plotSize: "100 ft x 100 ft",
    rate: "₹6,500 / sq ft",
    locality: {
      east: { place: "Sanand GIDC", distance: "1 km" },
      west: { place: "Ahmedabad Ring Road", distance: "4 km" },
      north: { place: "Changodar", distance: "6 km" },
      south: { place: "Viramgam Road", distance: "5.5 km" },
    },
    videos: [
      // Add your video URLs here when available
      // Example: { type: 'local', url: '/videos/industrial-plot-tour.mp4' }
    ],
    categories: ['land'],
    location: {
      city: "Ahmedabad",
      state: "Gujarat",
      address: "Sanand Industrial Area, Ahmedabad"
    }
  }
];
