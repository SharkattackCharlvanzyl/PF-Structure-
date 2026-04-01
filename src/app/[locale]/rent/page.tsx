"use client";
import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";

interface RentalProperty {
  id: string;
  title: string;
  address: string;
  rent: number;
  rentFormatted: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  garages: number;
  floorSize: number;
  features: string[];
  status: "available" | "taken" | "newListing";
  furnished: boolean;
  leaseType: "longTerm" | "shortTerm" | "monthToMonth";
  availableFrom: string;
  city: string;
  province: string;
  petFriendly: boolean;
}

const DEMO_RENTALS: RentalProperty[] = [
  { id: "R001", title: "Spacious 2-Bed in Sandton", address: "18 Rivonia Rd, Sandton", rent: 15000, rentFormatted: "R 15,000", type: "apartment", bedrooms: 2, bathrooms: 1, garages: 1, floorSize: 90, features: ["security", "fibre", "aircon"], status: "available", furnished: false, leaseType: "longTerm", availableFrom: "2026-05-01", city: "Johannesburg", province: "Gauteng", petFriendly: false },
  { id: "R002", title: "Furnished Studio in Sea Point", address: "5 Beach Rd, Sea Point", rent: 12500, rentFormatted: "R 12,500", type: "apartment", bedrooms: 1, bathrooms: 1, garages: 0, floorSize: 45, features: ["balcony", "security"], status: "newListing", furnished: true, leaseType: "shortTerm", availableFrom: "2026-04-15", city: "Cape Town", province: "Western Cape", petFriendly: false },
  { id: "R003", title: "Family Home with Garden", address: "42 Elm St, Bryanston", rent: 28000, rentFormatted: "R 28,000", type: "house", bedrooms: 4, bathrooms: 3, garages: 2, floorSize: 260, features: ["pool", "garden", "security", "staffQuarters"], status: "available", furnished: false, leaseType: "longTerm", availableFrom: "2026-06-01", city: "Johannesburg", province: "Gauteng", petFriendly: true },
  { id: "R004", title: "Modern Loft in Maboneng", address: "12 Fox St, Maboneng", rent: 8500, rentFormatted: "R 8,500", type: "apartment", bedrooms: 1, bathrooms: 1, garages: 0, floorSize: 55, features: ["fibre", "aircon"], status: "available", furnished: true, leaseType: "monthToMonth", availableFrom: "2026-04-01", city: "Johannesburg", province: "Gauteng", petFriendly: false },
  { id: "R005", title: "Secure Townhouse in Fourways", address: "8 Cedar Ln, Fourways", rent: 18500, rentFormatted: "R 18,500", type: "townhouse", bedrooms: 3, bathrooms: 2, garages: 1, floorSize: 150, features: ["garden", "security", "petFriendly"], status: "available", furnished: false, leaseType: "longTerm", availableFrom: "2026-05-15", city: "Johannesburg", province: "Gauteng", petFriendly: true },
  { id: "R006", title: "Office Space in Menlyn", address: "Floor 3, Menlyn Maine, Pretoria", rent: 35000, rentFormatted: "R 35,000", type: "commercial", bedrooms: 0, bathrooms: 2, garages: 4, floorSize: 200, features: ["aircon", "fibre", "security"], status: "available", furnished: false, leaseType: "longTerm", availableFrom: "2026-07-01", city: "Pretoria", province: "Gauteng", petFriendly: false },
  { id: "R007", title: "Beachfront Holiday Apartment", address: "Marine Parade, Umhlanga", rent: 22000, rentFormatted: "R 22,000", type: "apartment", bedrooms: 3, bathrooms: 2, garages: 1, floorSize: 120, features: ["balcony", "pool", "security"], status: "newListing", furnished: true, leaseType: "shortTerm", availableFrom: "2026-04-10", city: "Durban", province: "KwaZulu-Natal", petFriendly: false },
  { id: "R008", title: "Cottage in Stellenbosch", address: "25 Dorp St, Stellenbosch", rent: 9800, rentFormatted: "R 9,800", type: "house", bedrooms: 2, bathrooms: 1, garages: 1, floorSize: 85, features: ["garden", "fireplace"], status: "available", furnished: true, leaseType: "monthToMonth", availableFrom: "2026-04-20", city: "Stellenbosch", province: "Western Cape", petFriendly: true },
  { id: "R009", title: "Executive Suite in Rosebank", address: "The Zone, Rosebank", rent: 25000, rentFormatted: "R 25,000", type: "apartment", bedrooms: 2, bathrooms: 2, garages: 1, floorSize: 110, features: ["gym", "security", "aircon", "balcony"], status: "taken", furnished: true, leaseType: "longTerm", availableFrom: "2026-08-01", city: "Johannesburg", province: "Gauteng", petFriendly: false },
  { id: "R010", title: "Warehouse Studio in Woodstock", address: "Albert Rd, Woodstock", rent: 7500, rentFormatted: "R 7,500", type: "apartment", bedrooms: 1, bathrooms: 1, garages: 0, floorSize: 50, features: ["fibre"], status: "available", furnished: false, leaseType: "monthToMonth", availableFrom: "2026-04-01", city: "Cape Town", province: "Western Cape", petFriendly: true },
];

const PROPERTY_TYPES = ["all", "apartment", "house", "townhouse", "commercial"];
const RENT_RANGES = [
  { key: "any", min: 0, max: Infinity },
  { key: "under10k", min: 0, max: 10000 },
  { key: "10kTo20k", min: 10000, max: 20000 },
  { key: "20kTo30k", min: 20000, max: 30000 },
  { key: "over30k", min: 30000, max: Infinity },
];
const BED_OPTIONS = ["any", "1", "2", "3", "4+"];
const LEASE_OPTIONS = ["all", "longTerm", "shortTerm", "monthToMonth"];
const SORT_OPTIONS = ["newest", "rentLow", "rentHigh", "bedsHigh", "sizeHigh"];

export default function RentPage() {
  const t = useTranslations("rent");
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [rentRange, setRentRange] = useState("any");
  const [bedrooms, setBedrooms] = useState("any");
  const [leaseType, setLeaseType] = useState("all");
  const [furnishedOnly, setFurnishedOnly] = useState(false);
  const [petFriendlyOnly, setPetFriendlyOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [savedRentals, setSavedRentals] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSavedRentals((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  const filtered = useMemo(() => {
    let results = DEMO_RENTALS.filter((p) => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.address.toLowerCase().includes(search.toLowerCase()) && !p.city.toLowerCase().includes(search.toLowerCase())) return false;
      if (propertyType !== "all" && p.type !== propertyType) return false;
      const range = RENT_RANGES.find((r) => r.key === rentRange);
      if (range && (p.rent < range.min || p.rent > range.max)) return false;
      if (bedrooms !== "any") {
        const minBeds = bedrooms === "4+" ? 4 : parseInt(bedrooms);
        if (bedrooms === "4+" ? p.bedrooms < 4 : p.bedrooms !== minBeds) return false;
      }
      if (leaseType !== "all" && p.leaseType !== leaseType) return false;
      if (furnishedOnly && !p.furnished) return false;
      if (petFriendlyOnly && !p.petFriendly) return false;
      return true;
    });

    switch (sortBy) {
      case "rentLow": results.sort((a, b) => a.rent - b.rent); break;
      case "rentHigh": results.sort((a, b) => b.rent - a.rent); break;
      case "bedsHigh": results.sort((a, b) => b.bedrooms - a.bedrooms); break;
      case "sizeHigh": results.sort((a, b) => b.floorSize - a.floorSize); break;
    }
    return results;
  }, [search, propertyType, rentRange, bedrooms, leaseType, furnishedOnly, petFriendlyOnly, sortBy]);

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      available: "bg-green-500/20 text-green-400",
      taken: "bg-red-500/20 text-red-400",
      newListing: "bg-blue-500/20 text-blue-400",
    };
    return colors[status] || "";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
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
          <select value={rentRange} onChange={(e) => setRentRange(e.target.value)} className="px-4 py-3 bg-navy border border-gold/10 rounded-xl text-cream focus:border-gold focus:outline-none">
            {RENT_RANGES.map((rr) => <option key={rr.key} value={rr.key}>{t("rentRanges." + rr.key)}</option>)}
          </select>
          <button onClick={() => setShowFilters(!showFilters)} className="px-5 py-3 border border-gold/20 rounded-xl text-gold hover:bg-gold/10 transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            {t("filters")}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gold/10 grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-cream/50 text-xs mb-1.5">{t("bedroomsLabel")}</label>
              <div className="flex gap-1">
                {BED_OPTIONS.map((b) => (
                  <button key={b} onClick={() => setBedrooms(b)} className={"flex-1 py-2 rounded-lg text-xs font-medium transition-all " + (bedrooms === b ? "bg-gold text-navy-dark" : "bg-navy border border-gold/10 text-cream/50 hover:border-gold/30")}>{b === "any" ? t("any") : b}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-cream/50 text-xs mb-1.5">{t("leaseLabel")}</label>
              <select value={leaseType} onChange={(e) => setLeaseType(e.target.value)} className="w-full px-3 py-2 bg-navy border border-gold/10 rounded-lg text-cream text-sm focus:border-gold focus:outline-none">
                {LEASE_OPTIONS.map((l) => <option key={l} value={l}>{t("leaseTypes." + l)}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2 justify-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={furnishedOnly} onChange={(e) => setFurnishedOnly(e.target.checked)} className="w-4 h-4 rounded bg-navy-light border-gold/30 text-gold focus:ring-gold" />
                <span className="text-cream/60 text-sm">{t("furnishedOnly")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={petFriendlyOnly} onChange={(e) => setPetFriendlyOnly(e.target.checked)} className="w-4 h-4 rounded bg-navy-light border-gold/30 text-gold focus:ring-gold" />
                <span className="text-cream/60 text-sm">{t("petFriendlyOnly")}</span>
              </label>
            </div>
            <div>
              <label className="block text-cream/50 text-xs mb-1.5">{t("sortLabel")}</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-3 py-2 bg-navy border border-gold/10 rounded-lg text-cream text-sm focus:border-gold focus:outline-none">
                {SORT_OPTIONS.map((s) => <option key={s} value={s}>{t("sort." + s)}</option>)}
              </select>
            </div>
            <div className="flex items-end justify-between">
              <button onClick={() => { setSearch(""); setPropertyType("all"); setRentRange("any"); setBedrooms("any"); setLeaseType("all"); setFurnishedOnly(false); setPetFriendlyOnly(false); setSortBy("newest"); }} className="px-3 py-2 text-sm text-cream/40 hover:text-cream transition-colors">
                {t("clearFilters")}
              </button>
              <div className="flex gap-2">
                <button onClick={() => setViewMode("grid")} className={"p-2 rounded-lg transition-colors " + (viewMode === "grid" ? "bg-gold/20 text-gold" : "text-cream/30 hover:text-cream")}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                </button>
                <button onClick={() => setViewMode("list")} className={"p-2 rounded-lg transition-colors " + (viewMode === "list" ? "bg-gold/20 text-gold" : "text-cream/30 hover:text-cream")}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
              </div>
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
              <div className="relative h-48 bg-gradient-to-br from-gold/5 to-navy flex items-center justify-center">
                <svg className="w-16 h-16 text-gold/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                <span className={"absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-medium " + statusBadge(prop.status)}>{t("status." + prop.status)}</span>
                {prop.furnished && <span className="absolute top-3 right-12 text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 font-medium">{t("furnished")}</span>}
                <button onClick={() => toggleSave(prop.id)} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-navy/70 backdrop-blur flex items-center justify-center hover:bg-navy transition-colors">
                  <svg className={"w-5 h-5 " + (savedRentals.includes(prop.id) ? "text-red-400 fill-red-400" : "text-cream/50")} fill={savedRentals.includes(prop.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
              </div>
              <div className="p-5">
                <h3 className="text-cream font-semibold mb-1 group-hover:text-gold transition-colors">{prop.title}</h3>
                <p className="text-cream/40 text-sm mb-3 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {prop.address}
                </p>
                <div className="flex items-baseline gap-1 mb-3">
                  <p className="text-gold text-xl font-bold">{prop.rentFormatted}</p>
                  <span className="text-cream/30 text-sm">/ {t("perMonth")}</span>
                </div>
                <div className="flex items-center gap-4 text-cream/40 text-sm mb-3">
                  {prop.bedrooms > 0 && <span>{prop.bedrooms} {t("beds")}</span>}
                  {prop.bathrooms > 0 && <span>{prop.bathrooms} {t("baths")}</span>}
                  {prop.garages > 0 && <span>{prop.garages} {t("garage")}</span>}
                  <span>{prop.floorSize} m\u00B2</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 bg-gold/5 text-gold/60 text-xs rounded-full">{t("leaseTypes." + prop.leaseType)}</span>
                  {prop.petFriendly && <span className="px-2 py-0.5 bg-green-500/10 text-green-400/60 text-xs rounded-full">{t("petFriendly")}</span>}
                  <span className="text-cream/30 text-xs">{t("availableFrom")} {prop.availableFrom}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {prop.features.slice(0, 3).map((f) => (
                    <span key={f} className="px-2 py-0.5 bg-gold/5 text-gold/60 text-xs rounded-full">{t("featureLabels." + f)}</span>
                  ))}
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
                    <svg className={"w-5 h-5 " + (savedRentals.includes(prop.id) ? "text-red-400 fill-red-400" : "text-cream/30")} fill={savedRentals.includes(prop.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  </button>
                </div>
                <div className="flex items-center gap-6 mt-2">
                  <div className="flex items-baseline gap-1">
                    <p className="text-gold text-lg font-bold">{prop.rentFormatted}</p>
                    <span className="text-cream/30 text-sm">/ {t("perMonth")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-cream/40 text-sm">
                    {prop.bedrooms > 0 && <span>{prop.bedrooms} {t("beds")}</span>}
                    {prop.bathrooms > 0 && <span>{prop.bathrooms} {t("baths")}</span>}
                    <span>{prop.floorSize} m\u00B2</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <button className="px-4 py-2 bg-gold text-navy-dark font-semibold rounded-xl text-sm hover:bg-gold-light transition-colors">{t("enquire")}</button>
                  <button className="px-4 py-2 border border-gold/20 text-gold rounded-xl text-sm hover:border-gold/40 transition-colors">{t("viewDetails")}</button>
                  <span className="px-2 py-0.5 bg-gold/5 text-gold/60 text-xs rounded-full">{t("leaseTypes." + prop.leaseType)}</span>
                  {prop.furnished && <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 text-xs rounded-full">{t("furnished")}</span>}
                  {prop.petFriendly && <span className="hidden md:inline px-2 py-0.5 bg-green-500/10 text-green-400/60 text-xs rounded-full">{t("petFriendly")}</span>}
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
