"use client";
import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";

interface BusinessListing {
  id: string;
  name: string;
  category: string;
  location: string;
  city: string;
  askingPrice: number;
  askingPriceFormatted: string;
  monthlyRevenue: string;
  monthlyProfit: string;
  employees: number;
  yearsEstablished: number;
  description: string;
  highlights: string[];
  status: "available" | "underNegotiation" | "newListing" | "priceReduced";
  franchise: boolean;
}

const DEMO_BUSINESSES: BusinessListing[] = [
  { id: "B001", name: "Artisan Coffee Roastery & Cafe", category: "hospitality", location: "44th Ave, Parkhurst, Johannesburg", city: "Johannesburg", askingPrice: 2200000, askingPriceFormatted: "R 2,200,000", monthlyRevenue: "R 380,000", monthlyProfit: "R 85,000", employees: 12, yearsEstablished: 6, description: "Well-established specialty coffee brand with roastery, two retail locations, and wholesale accounts.", highlights: ["loyal customer base", "own roasting facility", "wholesale contracts"], status: "available", franchise: false },
  { id: "B002", name: "Premium Car Wash Franchise", category: "franchise", location: "N1 Highway, Midrand", city: "Midrand", askingPrice: 950000, askingPriceFormatted: "R 950,000", monthlyRevenue: "R 220,000", monthlyProfit: "R 65,000", employees: 8, yearsEstablished: 3, description: "Turnkey franchise operation with established brand, high traffic location, and proven systems.", highlights: ["franchise support", "high-traffic location", "repeat customers"], status: "newListing", franchise: true },
  { id: "B003", name: "IT Solutions & Managed Services", category: "services", location: "Sandton CBD", city: "Johannesburg", askingPrice: 4800000, askingPriceFormatted: "R 4,800,000", monthlyRevenue: "R 650,000", monthlyProfit: "R 180,000", employees: 22, yearsEstablished: 10, description: "B2B managed IT services with 60+ recurring corporate clients and long-term contracts.", highlights: ["recurring revenue", "long-term contracts", "skilled team"], status: "available", franchise: false },
  { id: "B004", name: "Boutique Guest House", category: "hospitality", location: "Franschhoek Main Rd", city: "Franschhoek", askingPrice: 8500000, askingPriceFormatted: "R 8,500,000", monthlyRevenue: "R 520,000", monthlyProfit: "R 150,000", employees: 15, yearsEstablished: 12, description: "Award-winning 8-room guest house in the heart of wine country with restaurant and pool.", highlights: ["prime wine region", "TripAdvisor rated", "includes property"], status: "available", franchise: false },
  { id: "B005", name: "E-Commerce Fashion Brand", category: "online", location: "Remote / Cape Town HQ", city: "Cape Town", askingPrice: 1500000, askingPriceFormatted: "R 1,500,000", monthlyRevenue: "R 280,000", monthlyProfit: "R 95,000", employees: 4, yearsEstablished: 4, description: "Online fashion brand with 50K+ social followers, Shopify store, and strong brand identity.", highlights: ["50K social following", "low overheads", "scalable"], status: "priceReduced", franchise: false },
  { id: "B006", name: "Industrial Packaging Manufacturer", category: "manufacturing", location: "Prospecton Industrial, Durban", city: "Durban", askingPrice: 6200000, askingPriceFormatted: "R 6,200,000", monthlyRevenue: "R 890,000", monthlyProfit: "R 220,000", employees: 35, yearsEstablished: 18, description: "Established packaging business supplying FMCG sector with modern machinery and warehouse.", highlights: ["FMCG clients", "modern machinery", "export ready"], status: "underNegotiation", franchise: false },
  { id: "B007", name: "Retail Clothing Store Chain", category: "retail", location: "3 Locations, Gauteng", city: "Johannesburg", askingPrice: 3400000, askingPriceFormatted: "R 3,400,000", monthlyRevenue: "R 480,000", monthlyProfit: "R 110,000", employees: 20, yearsEstablished: 8, description: "Three trendy retail locations in major malls with established brand and loyal customer base.", highlights: ["3 retail locations", "mall presence", "own brand"], status: "available", franchise: false },
  { id: "B008", name: "Quick-Service Restaurant Franchise", category: "franchise", location: "Menlyn Park, Pretoria", city: "Pretoria", askingPrice: 1800000, askingPriceFormatted: "R 1,800,000", monthlyRevenue: "R 350,000", monthlyProfit: "R 75,000", employees: 14, yearsEstablished: 5, description: "Popular fast-food franchise in high-traffic mall with drive-through option.", highlights: ["mall location", "drive-through", "strong brand"], status: "newListing", franchise: true },
];

const CATEGORIES = ["all", "hospitality", "franchise", "services", "online", "manufacturing", "retail"];
const PRICE_RANGES = [
  { key: "any", min: 0, max: Infinity },
  { key: "under1m", min: 0, max: 1000000 },
  { key: "1mTo3m", min: 1000000, max: 3000000 },
  { key: "3mTo5m", min: 3000000, max: 5000000 },
  { key: "over5m", min: 5000000, max: Infinity },
];
const SORT_OPTIONS = ["newest", "priceLow", "priceHigh", "profitHigh", "established"];

export default function BusinessPage() {
  const t = useTranslations("business");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("any");
  const [sortBy, setSortBy] = useState("newest");
  const [franchiseOnly, setFranchiseOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [savedBusinesses, setSavedBusinesses] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    setSavedBusinesses((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]);
  };

  const filtered = useMemo(() => {
    let results = DEMO_BUSINESSES.filter((b) => {
      if (search && !b.name.toLowerCase().includes(search.toLowerCase()) && !b.location.toLowerCase().includes(search.toLowerCase()) && !b.city.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== "all" && b.category !== category) return false;
      const range = PRICE_RANGES.find((r) => r.key === priceRange);
      if (range && (b.askingPrice < range.min || b.askingPrice > range.max)) return false;
      if (franchiseOnly && !b.franchise) return false;
      return true;
    });

    switch (sortBy) {
      case "priceLow": results.sort((a, b) => a.askingPrice - b.askingPrice); break;
      case "priceHigh": results.sort((a, b) => b.askingPrice - a.askingPrice); break;
      case "profitHigh": results.sort((a, b) => parseInt(b.monthlyProfit.replace(/\D/g, "")) - parseInt(a.monthlyProfit.replace(/\D/g, ""))); break;
      case "established": results.sort((a, b) => b.yearsEstablished - a.yearsEstablished); break;
    }
    return results;
  }, [search, category, priceRange, sortBy, franchiseOnly]);

  const statusColor = (status: string) => {
    const m: Record<string, string> = { available: "bg-green-500/20 text-green-400", underNegotiation: "bg-yellow-500/20 text-yellow-400", newListing: "bg-blue-500/20 text-blue-400", priceReduced: "bg-red-500/20 text-red-400" };
    return m[status] || "";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl md:text-5xl text-gold font-bold mb-3">{t("title")}</h1>
        <p className="text-cream/60 text-lg">{t("subtitle")}</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-navy-light border border-gold/20 rounded-2xl p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("searchPlaceholder")} className="w-full pl-12 pr-4 py-3 bg-navy border border-gold/10 rounded-xl text-cream focus:border-gold focus:outline-none" />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-3 bg-navy border border-gold/10 rounded-xl text-cream focus:border-gold focus:outline-none">
            {CATEGORIES.map((c) => <option key={c} value={c}>{t("categories." + c)}</option>)}
          </select>
          <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="px-4 py-3 bg-navy border border-gold/10 rounded-xl text-cream focus:border-gold focus:outline-none">
            {PRICE_RANGES.map((pr) => <option key={pr.key} value={pr.key}>{t("priceRanges." + pr.key)}</option>)}
          </select>
          <button onClick={() => setShowFilters(!showFilters)} className="px-5 py-3 border border-gold/20 rounded-xl text-gold hover:bg-gold/10 transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            {t("filters")}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gold/10 flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-cream/50 text-xs mb-1.5">{t("sortLabel")}</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 bg-navy border border-gold/10 rounded-lg text-cream text-sm focus:border-gold focus:outline-none">
                {SORT_OPTIONS.map((s) => <option key={s} value={s}>{t("sort." + s)}</option>)}
              </select>
            </div>
            <label className="flex items-center gap-2 cursor-pointer pb-2">
              <input type="checkbox" checked={franchiseOnly} onChange={(e) => setFranchiseOnly(e.target.checked)} className="w-4 h-4 rounded bg-navy-light border-gold/30 text-gold focus:ring-gold" />
              <span className="text-cream/60 text-sm">{t("franchiseOnly")}</span>
            </label>
            <button onClick={() => { setSearch(""); setCategory("all"); setPriceRange("any"); setSortBy("newest"); setFranchiseOnly(false); }} className="px-3 py-2 text-sm text-cream/40 hover:text-cream transition-colors">{t("clearFilters")}</button>
          </div>
        )}
      </div>

      <p className="text-cream/40 text-sm mb-6">{t("resultsCount", { count: String(filtered.length) })}</p>

      {/* Business Cards */}
      <div className="space-y-6">
        {filtered.map((biz) => (
          <div key={biz.id} className="bg-navy-light border border-gold/10 rounded-2xl overflow-hidden hover:border-gold/30 transition-all">
            <div className="flex flex-col lg:flex-row">
              {/* Left image area */}
              <div className="w-full lg:w-56 h-48 lg:h-auto bg-gradient-to-br from-gold/5 to-navy flex items-center justify-center shrink-0 relative">
                <svg className="w-16 h-16 text-gold/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className={"text-xs px-2.5 py-0.5 rounded-full font-medium " + statusColor(biz.status)}>{t("status." + biz.status)}</span>
                  {biz.franchise && <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 font-medium">{t("franchiseBadge")}</span>}
                </div>
                <button onClick={() => toggleSave(biz.id)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-navy/70 backdrop-blur flex items-center justify-center">
                  <svg className={"w-4 h-4 " + (savedBusinesses.includes(biz.id) ? "text-red-400 fill-red-400" : "text-cream/50")} fill={savedBusinesses.includes(biz.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 p-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="text-cream font-semibold text-lg">{biz.name}</h3>
                    <p className="text-cream/40 text-sm flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {biz.location}
                    </p>
                  </div>
                  <p className="text-gold text-xl font-bold whitespace-nowrap">{biz.askingPriceFormatted}</p>
                </div>

                <p className="text-cream/50 text-sm mb-4 line-clamp-2">{biz.description}</p>

                {/* Key metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div className="bg-navy/50 rounded-lg p-2.5 text-center">
                    <p className="text-gold font-bold text-sm">{biz.monthlyRevenue}</p>
                    <p className="text-cream/30 text-xs">{t("revenue")}</p>
                  </div>
                  <div className="bg-navy/50 rounded-lg p-2.5 text-center">
                    <p className="text-green-400 font-bold text-sm">{biz.monthlyProfit}</p>
                    <p className="text-cream/30 text-xs">{t("profit")}</p>
                  </div>
                  <div className="bg-navy/50 rounded-lg p-2.5 text-center">
                    <p className="text-cream font-bold text-sm">{biz.employees}</p>
                    <p className="text-cream/30 text-xs">{t("employees")}</p>
                  </div>
                  <div className="bg-navy/50 rounded-lg p-2.5 text-center">
                    <p className="text-cream font-bold text-sm">{biz.yearsEstablished} {t("years")}</p>
                    <p className="text-cream/30 text-xs">{t("established")}</p>
                  </div>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {biz.highlights.map((h, i) => (
                    <span key={i} className="px-2.5 py-0.5 bg-gold/5 text-gold/60 text-xs rounded-full">{h}</span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button className="px-5 py-2.5 bg-gold text-navy-dark font-semibold rounded-xl text-sm hover:bg-gold-light transition-colors">{t("enquire")}</button>
                  <button className="px-5 py-2.5 border border-gold/20 text-gold rounded-xl text-sm hover:border-gold/40 transition-colors">{t("viewDetails")}</button>
                  <button className="px-5 py-2.5 border border-gold/20 text-gold rounded-xl text-sm hover:border-gold/40 transition-colors">{t("requestFinancials")}</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <svg className="w-16 h-16 mx-auto mb-4 text-cream/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <h3 className="text-cream/40 text-lg mb-2">{t("noResults")}</h3>
          <p className="text-cream/20 text-sm">{t("noResultsHint")}</p>
        </div>
      )}

      {/* Sell CTA */}
      <section className="mt-16 bg-navy-light border border-gold/10 rounded-2xl p-8 text-center">
        <h2 className="font-display text-2xl text-gold font-semibold mb-3">{t("sellCta.title")}</h2>
        <p className="text-cream/50 max-w-2xl mx-auto mb-6">{t("sellCta.description")}</p>
        <div className="flex gap-4 justify-center">
          <a href="/list-property" className="px-6 py-3 bg-gold text-navy-dark font-semibold rounded-xl hover:bg-gold-light transition-colors">{t("sellCta.button")}</a>
          <a href="/pricing" className="px-6 py-3 border border-gold/30 text-gold rounded-xl hover:border-gold transition-colors">{t("sellCta.viewPricing")}</a>
        </div>
      </section>
    </div>
  );
}
