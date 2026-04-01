export interface PropertyDetail {
  id: string;
  title: string;
  address: string;
  city: string;
  province: string;
  price: number;
  priceFormatted: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  garages: number;
  floorSize: number;
  erfSize: number;
  yearBuilt: number;
  features: string[];
  status: string;
  description: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  images: string[];
  listingType: "sale" | "rent";
  rentPerMonth?: string;
  leaseType?: string;
  furnished?: boolean;
  petFriendly?: boolean;
  availableFrom?: string;
}

export const SALE_PROPERTIES: PropertyDetail[] = [
  { id: "P001", title: "Modern Family Home", address: "24 Oak Avenue, Sandton", city: "Johannesburg", province: "Gauteng", price: 3250000, priceFormatted: "R 3,250,000", type: "house", bedrooms: 4, bathrooms: 3, garages: 2, floorSize: 280, erfSize: 650, yearBuilt: 2018, features: ["pool", "garden", "security", "fibre", "solarPanels"], status: "available", description: "A stunning modern family home in the heart of Sandton. This property features an open-plan living area with floor-to-ceiling windows, a designer kitchen with granite countertops and Smeg appliances, and a spacious entertainment area leading to the pool. The master suite includes a walk-in closet and en-suite bathroom with double vanity. Set in a secure estate with 24-hour security, this home is perfect for families looking for luxury and convenience.", agentName: "Sarah Mitchell", agentPhone: "+27 82 123 4567", agentEmail: "sarah@propertyfinder.com", images: [], listingType: "sale" },
  { id: "P002", title: "Luxury Penthouse Suite", address: "1 Waterfront Dr, V&A Waterfront", city: "Cape Town", province: "Western Cape", price: 8900000, priceFormatted: "R 8,900,000", type: "apartment", bedrooms: 3, bathrooms: 2, garages: 2, floorSize: 195, erfSize: 0, yearBuilt: 2020, features: ["balcony", "gym", "security", "aircon", "fireplace"], status: "available", description: "Exquisite penthouse at the V&A Waterfront with panoramic views of Table Mountain and the Atlantic Ocean. This world-class apartment features imported Italian marble floors, a private rooftop terrace, and floor-to-ceiling glass walls. The building offers concierge services, a rooftop infinity pool, and underground parking. Walking distance to the finest restaurants, shopping, and the Two Oceans Aquarium.", agentName: "James van der Berg", agentPhone: "+27 83 987 6543", agentEmail: "james@propertyfinder.com", images: [], listingType: "sale" },
  { id: "P003", title: "Cozy 2-Bed Apartment", address: "45 Rivonia Rd, Rivonia", city: "Johannesburg", province: "Gauteng", price: 1450000, priceFormatted: "R 1,450,000", type: "apartment", bedrooms: 2, bathrooms: 1, garages: 1, floorSize: 85, erfSize: 0, yearBuilt: 2015, features: ["security", "fibre"], status: "available", description: "Well-maintained 2-bedroom apartment in the sought-after Rivonia area. Features an open-plan kitchen and living area, two spacious bedrooms with built-in cupboards, and a modern bathroom. The complex offers 24-hour security, a communal pool, and visitor parking. Close to Sandton City, Gautrain, and major highways.", agentName: "Thandi Nkosi", agentPhone: "+27 71 555 8888", agentEmail: "thandi@propertyfinder.com", images: [], listingType: "sale" },
  { id: "P004", title: "Seaside Villa with Pool", address: "8 Marine Dr, Camps Bay", city: "Cape Town", province: "Western Cape", price: 15500000, priceFormatted: "R 15,500,000", type: "villa", bedrooms: 5, bathrooms: 4, garages: 3, floorSize: 420, erfSize: 1200, yearBuilt: 2016, features: ["pool", "garden", "security", "balcony", "staffQuarters", "braaiArea"], status: "available", description: "Magnificent Camps Bay villa with uninterrupted ocean views. This architectural masterpiece spans three levels with an infinity pool, landscaped gardens, and multiple entertainment areas. Features include a wine cellar, home cinema, staff quarters, and a triple garage. The property enjoys the famous Camps Bay sunset views and is steps from the beach.", agentName: "Michael Adams", agentPhone: "+27 82 444 3333", agentEmail: "michael@propertyfinder.com", images: [], listingType: "sale" },
  { id: "P005", title: "Golf Estate Home", address: "3 Fairway Crescent, Dainfern", city: "Johannesburg", province: "Gauteng", price: 6750000, priceFormatted: "R 6,750,000", type: "house", bedrooms: 5, bathrooms: 3, garages: 3, floorSize: 350, erfSize: 900, yearBuilt: 2019, features: ["pool", "garden", "security", "gym", "fireplace", "solarPanels", "borehole"], status: "available", description: "Executive home on the prestigious Dainfern Golf Estate. This property offers sophisticated living with a gourmet kitchen, formal and informal living areas, home office, and a private gym. The outdoor area features a heated pool, covered patio with built-in braai, and manicured gardens overlooking the fairway. Solar panels and borehole for sustainability.", agentName: "Sarah Mitchell", agentPhone: "+27 82 123 4567", agentEmail: "sarah@propertyfinder.com", images: [], listingType: "sale" },
];

export const RENTAL_PROPERTIES: PropertyDetail[] = [
  { id: "R001", title: "Spacious 2-Bed in Sandton", address: "18 Rivonia Rd, Sandton", city: "Johannesburg", province: "Gauteng", price: 15000, priceFormatted: "R 15,000", type: "apartment", bedrooms: 2, bathrooms: 1, garages: 1, floorSize: 90, erfSize: 0, yearBuilt: 2017, features: ["security", "fibre", "aircon"], status: "available", description: "Modern 2-bedroom apartment in the heart of Sandton. Open-plan living with balcony views, fully fitted kitchen, and secure underground parking. Walking distance to Sandton City and Gautrain station. The complex features 24-hour security, a communal gym, and swimming pool.", agentName: "Thandi Nkosi", agentPhone: "+27 71 555 8888", agentEmail: "thandi@propertyfinder.com", images: [], listingType: "rent", rentPerMonth: "R 15,000", leaseType: "longTerm", furnished: false, petFriendly: false, availableFrom: "2026-05-01" },
  { id: "R002", title: "Furnished Studio in Sea Point", address: "5 Beach Rd, Sea Point", city: "Cape Town", province: "Western Cape", price: 12500, priceFormatted: "R 12,500", type: "apartment", bedrooms: 1, bathrooms: 1, garages: 0, floorSize: 45, erfSize: 0, yearBuilt: 2019, features: ["balcony", "security"], status: "available", description: "Stylish fully furnished studio in Sea Point with ocean views. Features a modern kitchenette, built-in desk area, and private balcony. The building has secure access, a rooftop terrace, and is steps from the Sea Point promenade, restaurants, and Virgin Active gym.", agentName: "James van der Berg", agentPhone: "+27 83 987 6543", agentEmail: "james@propertyfinder.com", images: [], listingType: "rent", rentPerMonth: "R 12,500", leaseType: "shortTerm", furnished: true, petFriendly: false, availableFrom: "2026-04-15" },
  { id: "R003", title: "Family Home with Garden", address: "42 Elm St, Bryanston", city: "Johannesburg", province: "Gauteng", price: 28000, priceFormatted: "R 28,000", type: "house", bedrooms: 4, bathrooms: 3, garages: 2, floorSize: 260, erfSize: 800, yearBuilt: 2014, features: ["pool", "garden", "security", "staffQuarters", "braaiArea"], status: "available", description: "Spacious family home in leafy Bryanston. This property offers four large bedrooms, three bathrooms, a formal lounge, family room, and a study. The garden features a swimming pool, covered patio with built-in braai, and a separate staff quarters. Located in a quiet cul-de-sac close to top schools and shopping centres.", agentName: "Sarah Mitchell", agentPhone: "+27 82 123 4567", agentEmail: "sarah@propertyfinder.com", images: [], listingType: "rent", rentPerMonth: "R 28,000", leaseType: "longTerm", furnished: false, petFriendly: true, availableFrom: "2026-06-01" },
  { id: "R004", title: "Beachfront Holiday Apartment", address: "Marine Parade, Umhlanga", city: "Durban", province: "KwaZulu-Natal", price: 22000, priceFormatted: "R 22,000", type: "apartment", bedrooms: 3, bathrooms: 2, garages: 1, floorSize: 120, erfSize: 0, yearBuilt: 2021, features: ["balcony", "pool", "security", "aircon"], status: "available", description: "Stunning beachfront apartment in Umhlanga with direct ocean views from every room. Fully furnished to a high standard with a modern open-plan kitchen, spacious lounge opening to a large balcony, and three bedrooms. The complex features a tropical pool deck, 24-hour concierge, and direct beach access.", agentName: "David Pillay", agentPhone: "+27 84 222 3333", agentEmail: "david@propertyfinder.com", images: [], listingType: "rent", rentPerMonth: "R 22,000", leaseType: "shortTerm", furnished: true, petFriendly: false, availableFrom: "2026-04-10" },
];

export function getPropertyById(id: string): PropertyDetail | undefined {
  return [...SALE_PROPERTIES, ...RENTAL_PROPERTIES].find((p) => p.id === id);
}
