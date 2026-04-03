"use client";
import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { countries, regions } from "@/lib/countries";

export default function CountriesPage() {
  const t = useTranslations("countries");
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const filtered = useMemo(() => {
    return countries.filter((c) => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedRegion !== "all" && c.region !== selectedRegion) return false;
      return true;
    });
  }, [search, selectedRegion]);

  const uniqueRegions = ["all", ...regions.filter((r) => r !== "All")];

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl md:text-5xl text-gold font-bold mb-3">{t("title")}</h1>
        <p className="text-cream/60 text-lg">{t("subtitle")}</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-2xl mx-auto">
        <div className="flex-1 relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("searchPlaceholder")} className="w-full pl-12 pr-4 py-3 bg-navy-light border border-gold/10 rounded-xl text-cream focus:border-gold focus:outline-none" />
        </div>
        <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="px-4 py-3 bg-navy-light border border-gold/10 rounded-xl text-cream focus:border-gold focus:outline-none">
          {uniqueRegions.map((r) => <option key={r} value={r}>{r === "all" ? t("allRegions") : r}</option>)}
        </select>
      </div>

      <p className="text-cream/40 text-sm text-center mb-8">{t("count", { count: String(filtered.length) })}</p>

      {/* Country Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((country) => (
          <a key={country.code} href={"/buy?country=" + country.code} className="bg-navy-light border border-gold/10 rounded-2xl p-4 text-center hover:border-gold/30 hover:bg-gold/5 transition-all group cursor-pointer">
            <div className="text-4xl mb-2">{country.code === "ZA" ? "\u{1F1FF}\u{1F1E6}" : country.code === "NA" ? "\u{1F1F3}\u{1F1E6}" : country.code === "BW" ? "\u{1F1E7}\u{1F1FC}" : country.code === "MZ" ? "\u{1F1F2}\u{1F1FF}" : country.code === "KE" ? "\u{1F1F0}\u{1F1EA}" : country.code === "NG" ? "\u{1F1F3}\u{1F1EC}" : country.code === "GB" ? "\u{1F1EC}\u{1F1E7}" : country.code === "US" ? "\u{1F1FA}\u{1F1F8}" : country.code === "AE" ? "\u{1F1E6}\u{1F1EA}" : country.code === "AU" ? "\u{1F1E6}\u{1F1FA}" : "\u{1F30D}"}</div>
            <h3 className="text-cream font-medium text-sm group-hover:text-gold transition-colors">{country.name}</h3>
            <p className="text-cream/30 text-xs mt-1">{country.currency}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
