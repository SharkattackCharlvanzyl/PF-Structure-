import { NextRequest, NextResponse } from "next/server";

interface PropertyTransaction {
  address: string;
  price: number;
  date: string;
  propertyType: string;
  postcode: string;
  distance: number;
}

function extractPostcode(address: string): string | null {
  // UK postcode regex
  const postcodeRegex = /([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})/i;
  const match = address.match(postcodeRegex);
  return match ? match[1].toUpperCase().replace(/\s/g, '') : null;
}

async function fetchUKLandRegistryData(postcode: string): Promise<PropertyTransaction[]> {
  // For demo, return realistic sample data for Westminster/London area
  // In production, integrate with real UK Land Registry API
  const sampleData: PropertyTransaction[] = [
    {
      address: "12 Downing Street, London, SW1A 2AA",
      price: 4500000,
      date: "2024-03-15",
      propertyType: "D",
      postcode: "SW1A2AA",
      distance: 0
    },
    {
      address: "18 Downing Street, London, SW1A 2AA",
      price: 3800000,
      date: "2024-02-22",
      propertyType: "D",
      postcode: "SW1A2AA",
      distance: 0.1
    },
    {
      address: "25 Whitehall, London, SW1A 2BX",
      price: 2200000,
      date: "2024-01-18",
      propertyType: "F",
      postcode: "SW1A2BX",
      distance: 0.3
    },
    {
      address: "10 Great George Street, London, SW1P 3AD",
      price: 1850000,
      date: "2023-12-10",
      propertyType: "F",
      postcode: "SW1P3AD",
      distance: 0.5
    },
    {
      address: "45 Victoria Street, London, SW1H 0EU",
      price: 2650000,
      date: "2023-11-25",
      propertyType: "F",
      postcode: "SW1H0EU",
      distance: 0.7
    },
    {
      address: "55 Parliament Street, London, SW1A 2NE",
      price: 3100000,
      date: "2023-10-12",
      propertyType: "D",
      postcode: "SW1A2NE",
      distance: 0.2
    },
    {
      address: "3 Millbank, London, SW1P 4HR",
      price: 2900000,
      date: "2023-09-28",
      propertyType: "F",
      postcode: "SW1P4HR",
      distance: 1.2
    }
  ];

  // Filter by distance (3km) and return
  return sampleData.filter(p => p.distance <= 3);
}

async function getUKLandRegistryData(address: string): Promise<PropertyTransaction[]> {
  const postcode = extractPostcode(address);
  if (!postcode) return [];

  return await fetchUKLandRegistryData(postcode);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address, propertyType } = body;

    if (!address) {
      return NextResponse.json(
        { success: false, message: "Address is required" },
        { status: 400 }
      );
    }

    // Get property data from UK Land Registry
    const postcode = extractPostcode(address);
    const properties = await getUKLandRegistryData(address);

    if (properties.length === 0) {
      return NextResponse.json(
        { success: false, message: "No property sales found in this postcode area" },
        { status: 404 }
      );
    }

    // Calculate average price
    const totalPrice = properties.reduce((sum, prop) => sum + prop.price, 0);
    const averagePrice = Math.round(totalPrice / properties.length);

    // Simple trend analysis (comparing first half vs second half)
    const midPoint = Math.floor(properties.length / 2);
    const recentPrices = properties.slice(0, midPoint);
    const olderPrices = properties.slice(midPoint);
    const recentAvg = recentPrices.length > 0 ? recentPrices.reduce((sum, p) => sum + p.price, 0) / recentPrices.length : averagePrice;
    const olderAvg = olderPrices.length > 0 ? olderPrices.reduce((sum, p) => sum + p.price, 0) / olderPrices.length : averagePrice;
    const trend = recentAvg > olderAvg ? "increasing" : recentAvg < olderAvg ? "decreasing" : "stable";

    // Estimate value based on comparables (simple average for now)
    const estimatedValue = averagePrice;

    const data = {
      properties: properties.map(prop => ({
        address: prop.address,
        price: prop.price,
        date: prop.date,
        propertyType: prop.propertyType === 'D' ? 'Detached' :
                     prop.propertyType === 'S' ? 'Semi-Detached' :
                     prop.propertyType === 'T' ? 'Terraced' :
                     prop.propertyType === 'F' ? 'Flat' : 'Other',
        distance: Math.round(prop.distance * 10) / 10 // Round to 1 decimal
      })),
      averagePrice,
      trend,
      estimatedValue,
      postcode
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("UK valuation error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve valuation data" },
      { status: 500 }
    );
  }
}