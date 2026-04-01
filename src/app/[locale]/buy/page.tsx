"use client";
import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";

interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  priceFormatted: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  garages: number;
  floorSize: number;
  erfSize: number;
  features: string[];
  status: "available" | "underOffer" | "newListing";
  image: string;
  city: string;
  province: string;
}

const DEMO_PROPERTIES: Property[] = [
  { id: "P001", title: "Modern Family Home", address: "24 Oak Avenue, Sandton", price: 3250000, priceFormatted: "R 3,250,000", type: "house", bedrooms: 4, bathrooms: 3, garages: 2, floorSize: 280, erfSize: 650, features: ["pool", "garden", "security"], status: "available", image: "", city: "Johannesburg", province: "Gauteng" },
  { id: "P002", title: "Luxury Penthouse Suite", address: "1 Waterfront Dr, V&A Waterfront", price: 8900000, priceFormatted: "R 8,900,000", type: "apartment", bedrooms: 3, bathrooms: 2, garages: 2, floorSize: 195, erfSize: 0, features: ["balcony", "gym", "security"], status: "newListing", image: "", city: "Cape Town", province: "Western Cape" },
  { id: "P003", title: "Cozy 2-Bed Apartment", address: "45 Rivonia Rd, Rivonia", price: 1450000, priceFormatted: "R 1,450,000", type: "apartment", bedrooms: 2, bathrooms: 1, garages: 1, floorSize: 85, erfSize: 0, features: ["security", "fibre"], status: "available", image: "", city: "Johannesburg", province: "Gauteng" },
  { id: "P004", title: "Seaside Villa with Pool", address: "8 Marine Dr, Camps Bay", price: 15500000, priceFormatted: "R 15,500,000", type: "villa", bedrooms: 5, bathrooms: 4, garages: 3, floorSize: 420, erfSize: 1200, features: ["pool", "garden", "security", "balcony"], status: "underOffer", image: "", city: "Cape Town", province: "Western Cape" },
  { id: "P005", title: "Secure Townhouse Complex", address: "12 Elm St, Menlo Park", price: 2800000, priceFormatted: "R 2,800,000", type: "townhouse", bedrooms: 3, bathrooms: 2, garages: 1, floorSize: 165, erfSize: 250, features: ["garden", "security", "petFriendly"], status: "available", image: "", city: "Pretoria", province: "Gauteng" },
  { id: "P006", title: "Smallholding with Stables", address: "Farm Rd 7, Midvaal", price: 4200000, priceFormatted: "R 4,200,000", type: "farm", bedrooms: 4, bathrooms: 2, garages: 2, floorSize: 220, erfSize: 20000, features: ["garden", "borehole", "solarPanels"], status: "available", image: "", city: "Midvaal", province: "Gauteng" },
  { id: "P007", title: "CBD Office Conversion Loft", address: "78 Commissioner St, CBD", price: 980000, priceFormatted: "R 980,000", type: "apartment", bedrooms: 1, bathrooms: 1, garages: 0, floorSize: 55, erfSize: 0, features: ["fibre", "aircon"], status: "newListing", image: "", city: "Johannesburg", province: "Gauteng" },
  { id: "P008", title: "Golf Estate Home", address: "3 Fairway Crescent, Dainfern", price: 6750000, priceFormatted: "R 6,750,000", type: "house", bedrooms: 5, bathrooms: 3, garages: 3, floorSize: 350, erfSize: 900, features: ["pool", "garden", "security", "gym", "fireplace"], status: "available", image: "", city: "Johannesburg", province: "Gauteng" },
  { id: "P009", title: "Beachfront Flat", address: "Marine Parade, Durban North", price: 1850000, priceFormatted: "R 1,850,000", type: "apartment", bedrooms: 2, bathrooms: 2, garages: 1, floorSize: 95, erfSize: 0, features: ["balcony", "security"], status: "available", image: "", city: "Durban", province: "KwaZulu-Natal" },
  { id: "P010", title: "Warehouse Conversion", address: "Industrial Rd 5, Montague Gardens", price: 3100000, priceFormatted: "R 3,100,000", type: "commercial", bedrooms: 0, bathrooms: 2, garages: 4, floorSize: 480, erfSize: 800, features: ["security", "solarPanels"], status: "available", image: "", city: "Cape Town", province: "Western Cape" },
  { id: "P011", title: "Student Investment Flat", address: "25 Lynnwood Rd, Hatfield", price: 750000, priceFormatted: "R 750,000", type: "apartment", bedrooms: 1, bathrooms: 1, garages: 0, floorSize: 40, erfSize: 0, features: ["fibre", "security"], status: "newListing", image: "", city: "Pretoria", province: "Gauteng" },
  { id: "P012", title: "Country Retreat on 5 Acres", address: "Old Main Rd, Hilton", price: 5400000, priceFormatted: "R 5,400,000", type: "house", bedrooms: 4, bathrooms: 3, garages: 2, floorSize: 310, erfSize: 20234, features: ["garden", "pool", "fireplace", "borehole", "staffQuarters"], status: "available", image: "", city: "Hilton", province: "KwaZulu-Natal" },
];

const PROPERTY_TYPES = ["all", "house", "apartment", "townhouse", "villa", "farm", "commercial"];
const PRICE_RANGES = [
  { key: "any", min: 0, max: Infinity },
  { key: "under1m", min: 0, max: 1000000 },
  { key: "1mTo3m", min: 1000000, max: 3000000 },
  { key: "3mTo5m", min: 3000000, max: 5000000 },
  { key: "5mTo10m", min: 5000000, max: 10000000 },
  { key: "over10m", min: 10000000, max: Infinity },
];
const BED_OPTIONS = ["any", "1", "2", "3", "4", "5+"];
const SORT_OPTIONS = ["newest", "priceLow", "priceHigh", "bedsHigh", "sizeHigh"];

export default function BuyPage() {
  const t = useTranslations("buy");
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("any");
  const [bedrooms, setBedrooms] = useState("any");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [savedProperties, setSavedProperties] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSavedProperties((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  const filtered = useMemo(() => {
    let results = DEMO_PROPERTIES.filter((p) => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.address.toLowerCase().includes(search.toLowerCase()) && !p.city.toLowerCase().includes(search.toLowerCase())) return false;
      if (propertyType !== "all" && p.type !== propertyType) return false;
      const range = PRICE_RANGES.find((r) => r.key === priceRange);
      if (range && (p.price < range.min || p.price > range.max)) return false;
      if (bedrooms !== "any") {
        const minBeds = bedrooms === "5+" ? 5 : parseInt(bedrooms);
        if (bedrooms === "5+" ? p.bedrooms < 5 : p.bedrooms !== minBeds) return false;
      }
      return true;
    });

    switch (sortBy) {
      case "priceLow": results.sort((a, b) => a.price - b.price); break;
      case "priceHigh": results.sort((a, b) => b.price - a.price); break;
      case "bedsHigh": results.sort((a, b) => b.bedrooms - a.bedrooms); break;
      case "sizeHigh": results.sort((a, b) => b.floorSize - a.floorSize); break;
    }
    return results;
  }, [search, propertyType, priceRange, bedrooms, sortBy]);

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      available: "bg-green-500/20 text-green-400",
      underOffer: "bg-yellow-500/20 text-yellow-400",
      newListing: "bg-blue-500/20 text-blue-400",
    };
    return colors[status] || "";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl md:text-5xl text-gold font-bold mb-3">{t("title")}</h1>
        <p className="text-cream/60 text-lg">{t("subtitle")}</p>
      </div>

      {/* Search Bar */}
      <div className="bg-navy-light border border-gold/20 rounded-2xl p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full pl-12 pr-4 py-3 bg-navy border border-gold/10 rounded-xl text-cream focus:border-gold focus:outline-none"
            />
          </div>
          <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="px-4 py-3 bg-navy border border-gold/10 rounded-xl text-cream focus:border-gold focus:outline-none">
            {PROPERTY_TYPES.map((pt) => <option key={pt} value={pt}>{t("types." + pt)}</option>)}
          </select>
          <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="px-4 py-3 bg-navy border border-gold/10 rounded-xl text-cream focus:border-gold focus:outline-none">
            {PRICE_RANGES.map((pr) => <option key={pr.key} value={pr.key}>{t("priceRanges." + pr.key)}</option>)}
          </select>
          <button onClick={() => setShowFilters(!showFilters)} className="px-5 py-3 border border-gold/20 rounded-xl text-gold hover:bg-gold/10 transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            {t("filters")}
          </button>
        </div>

        {/* Expanded filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gold/10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-cream/50 text-xs mb-1.5">{t("bedroomsLabel")}</label>
              <div className="flex gap-1">
                {BED_OPTIONS.map((b) => (
                  <button key={b} onClick={() => setBedrooms(b)} className={"flex-1 py-2 rounded-lg text-xs font-medium transition-all " + (bedrooms === b ? "bg-gold text-navy-dark" : "bg-navy border border-gold/10 text-cream/50 hover:border-gold/30")}>{b === "any" ? t("any") : b}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-cream/50 text-xs mb-1.5">{t("sortLabel")}</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-3 py-2 bg-navy border border-gold/10 rounded-lg text-cream text-sm focus:border-gold focus:outline-none">
                {SORT_OPTIONS.map((s) => <option key={s} value={s}>{t("sort." + s)}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={() => { setSearch(""); setPropertyType("all"); setPriceRange("any"); setBedrooms("any"); setSortBy("newest"); }} className="px-4 py-2 text-sm text-cream/40 hover:text-cream transition-colors">
                {t("clearFilters")}
              </button>
            </div>
            <div className="flex items-end justify-end gap-2">
              <button onClick={() => setViewMode("grid")} className={"p-2 rounded-lg transition-colors " + (viewMode === "grid" ? "bg-gold/20 text-gold" : "text-cream/30 hover:text-cream")}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </button>
              <button onClick={() => setViewMode("list")} className={"p-2 rounded-lg transition-colors " + (viewMode === "list" ? "bg-gold/20 text-gold" : "text-cream/30 hover:text-cream")}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-cream/40 text-sm">{t("resultsCount", { count: String(filtered.length) })}</p>
      </div>

      {/* Property Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((prop) => (
            <div key={prop.id} className="bg-navy-light border border-gold/10 rounded-2xl overflow-hidden hover:border-gold/30 transition-all group">
              {/* Image placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-gold/5 to-navy flex items-center justify-center">
                <svg className="w-16 h-16 text-gold/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                <span className={"absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-medium " + statusBadge(prop.status)}>{t("status." + prop.status)}</span>
                <button onClick={() => toggleSave(prop.id)} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-navy/70 backdrop-blur flex items-center justify-center hover:bg-navy transition-colors">
                  <svg className={"w-5 h-5 " + (savedProperties.includes(prop.id) ? "text-red-400 fill-red-400" : "text-cream/50")} fill={savedProperties.includes(prop.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
              </div>
              <div className="p-5">
                <h3 className="text-cream font-semibold mb-1 group-hover:text-gold transition-colors">{prop.title}</h3>
                <p className="text-cream/40 text-sm mb-3 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {prop.address}
                </p>
                <p className="text-gold text-xl font-bold mb-3">{prop.priceFormatted}</p>
                <div className="flex items-center gap-4 text-cream/40 text-sm mb-4">
                  {prop.bedrooms > 0 && <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>{prop.bedrooms} {t("beds")}</span>}
                  {prop.bathrooms > 0 && <span>{prop.bathrooms} {t("baths")}</span>}
                  {prop.garages > 0 && <span>{prop.garages} {t("garage")}</span>}
                  <span>{prop.floorSize} m²</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {prop.features.slice(0, 3).map((f) => (
                    <span key={f} className="px-2 py-0.5 bg-gold/5 text-gold/60 text-xs rounded-full">{t("featureLabels." + f)}</span>
                  ))}
                  {prop.features.length > 3 && <span className="px-2 py-0.5 text-cream/30 text-xs">+{prop.features.length - 3}</span>}
                </div>
              </div>
              <div className="px-5 pb-5 flex gap-2">
                <button className="flex-1 py-2.5 bg-gold text-navy-dark font-semibold rounded-xl text-sm hover:bg-gold-light transition-colors">{t("enquire")}</button>
                <button className="px-4 py-2.5 border border-gold/20 text-gold rounded-xl text-sm hover:border-gold/40 transition-colors">{t("viewDetails")}</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filtered.map((prop) => (
            <div key={prop.id} className="bg-navy-light border border-gold/10 rounded-2xl p-5 hover:border-gold/30 transition-all flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-40 h-28 rounded-xl bg-gradient-to-br from-gold/5 to-navy flex items-center justify-center shrink-0 relative">
                <svg className="w-10 h-10 text-gold/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                <span className={"absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full font-medium " + statusBadge(prop.status)}>{t("status." + prop.status)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-cream font-semibold">{prop.title}</h3>
                    <p className="text-cream/40 text-sm">{prop.address}</p>
                  </div>
                  <button onClick={() => toggleSave(prop.id)}>
                    <svg className={"w-5 h-5 " + (savedProperties.includes(prop.id) ? "text-red-400 fill-red-400" : "text-cream/30")} fill={savedProperties.includes(prop.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  </button>
                </div>
                <div className="flex items-center gap-6 mt-2">
                  <p className="text-gold text-lg font-bold">{prop.priceFormatted}</p>
                  <div className="flex items-center gap-3 text-cream/40 text-sm">
                    {prop.bedrooms > 0 && <span>{prop.bedrooms} {t("beds")}</span>}
                    {prop.bathrooms > 0 && <span>{prop.bathrooms} {t("baths")}</span>}
                    {prop.garages > 0 && <span>{prop.garages} {t("garage")}</span>}
                    <span>{prop.floorSize} m²</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <button className="px-4 py-2 bg-gold text-navy-dark font-semibold rounded-xl text-sm hover:bg-gold-light transition-colors">{t("enquire")}</button>
                  <button className="px-4 py-2 border border-gold/20 text-gold rounded-xl text-sm hover:border-gold/40 transition-colors">{t("viewDetails")}</button>
                  {prop.features.slice(0, 3).map((f) => (
                    <span key={f} className="hidden md:inline px-2 py-0.5 bg-gold/5 text-gold/60 text-xs rounded-full">{t("featureLabels." + f)}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <svg className="w-16 h-16 mx-auto mb-4 text-cream/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <h3 className="text-cream/40 text-lg mb-2">{t("noResults")}</h3>
          <p className="text-cream/20 text-sm">{t("noResultsHint")}</p>
        </div>
      )}
    </div>
  );
}
