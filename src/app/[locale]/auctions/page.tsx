"use client";
import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";

type AuctionStatus = "live" | "upcoming" | "ended";
type AuctionType = "live" | "online" | "sealed";
type Tab = "all" | "live" | "upcoming" | "ended";

interface AuctionProperty {
  id: string;
  title: string;
  address: string;
  type: AuctionType;
  status: AuctionStatus;
  reservePrice: number;
  reserveFormatted: string;
  currentBid: number;
  currentBidFormatted: string;
  bidCount: number;
  bedrooms: number;
  bathrooms: number;
  floorSize: number;
  startTime: string;
  endTime: string;
  city: string;
  province: string;
  features: string[];
}

const DEMO_AUCTIONS: AuctionProperty[] = [
  { id: "A001", title: "Executor Sale - Sandton Estate", address: "15 Rivonia Rd, Sandton", type: "live", status: "live", reservePrice: 4500000, reserveFormatted: "R 4,500,000", currentBid: 5200000, currentBidFormatted: "R 5,200,000", bidCount: 23, bedrooms: 5, bathrooms: 3, floorSize: 380, startTime: "2026-04-01T10:00", endTime: "2026-04-01T14:00", city: "Johannesburg", province: "Gauteng", features: ["pool", "garden", "security"] },
  { id: "A002", title: "Bank Repossession - Sea Point Flat", address: "3 Beach Rd, Sea Point", type: "online", status: "live", reservePrice: 1800000, reserveFormatted: "R 1,800,000", currentBid: 2100000, currentBidFormatted: "R 2,100,000", bidCount: 15, bedrooms: 2, bathrooms: 1, floorSize: 75, startTime: "2026-03-31T08:00", endTime: "2026-04-02T17:00", city: "Cape Town", province: "Western Cape", features: ["security", "balcony"] },
  { id: "A003", title: "Commercial Unit - Menlyn", address: "Menlyn Maine, Pretoria", type: "sealed", status: "upcoming", reservePrice: 6200000, reserveFormatted: "R 6,200,000", currentBid: 0, currentBidFormatted: "-", bidCount: 0, bedrooms: 0, bathrooms: 2, floorSize: 250, startTime: "2026-04-10T09:00", endTime: "2026-04-10T16:00", city: "Pretoria", province: "Gauteng", features: ["aircon", "fibre", "security"] },
  { id: "A004", title: "Luxury Villa - Umhlanga", address: "12 Lighthouse Rd, Umhlanga", type: "live", status: "upcoming", reservePrice: 9800000, reserveFormatted: "R 9,800,000", currentBid: 0, currentBidFormatted: "-", bidCount: 0, bedrooms: 4, bathrooms: 4, floorSize: 350, startTime: "2026-04-15T10:00", endTime: "2026-04-15T13:00", city: "Durban", province: "KwaZulu-Natal", features: ["pool", "garden", "security", "balcony"] },
  { id: "A005", title: "Farm Property - Stellenbosch", address: "Wine Route Rd, Stellenbosch", type: "online", status: "upcoming", reservePrice: 7500000, reserveFormatted: "R 7,500,000", currentBid: 0, currentBidFormatted: "-", bidCount: 0, bedrooms: 3, bathrooms: 2, floorSize: 280, startTime: "2026-04-20T08:00", endTime: "2026-04-22T17:00", city: "Stellenbosch", province: "Western Cape", features: ["garden", "borehole", "staffQuarters"] },
  { id: "A006", title: "Townhouse - Midrand Complex", address: "44 Waterfall Dr, Midrand", type: "online", status: "ended", reservePrice: 1600000, reserveFormatted: "R 1,600,000", currentBid: 1950000, currentBidFormatted: "R 1,950,000", bidCount: 31, bedrooms: 3, bathrooms: 2, floorSize: 140, startTime: "2026-03-20T08:00", endTime: "2026-03-22T17:00", city: "Midrand", province: "Gauteng", features: ["garden", "security"] },
  { id: "A007", title: "Industrial Warehouse - Montague", address: "Industrial Park, Montague Gardens", type: "sealed", status: "ended", reservePrice: 3200000, reserveFormatted: "R 3,200,000", currentBid: 3600000, currentBidFormatted: "R 3,600,000", bidCount: 8, bedrooms: 0, bathrooms: 1, floorSize: 600, startTime: "2026-03-15T09:00", endTime: "2026-03-15T15:00", city: "Cape Town", province: "Western Cape", features: ["security"] },
  { id: "A008", title: "Penthouse - Rosebank", address: "The Firs, Rosebank", type: "live", status: "upcoming", reservePrice: 5500000, reserveFormatted: "R 5,500,000", currentBid: 0, currentBidFormatted: "-", bidCount: 0, bedrooms: 3, bathrooms: 2, floorSize: 200, startTime: "2026-04-25T10:00", endTime: "2026-04-25T13:00", city: "Johannesburg", province: "Gauteng", features: ["gym", "security", "balcony", "aircon"] },
];

function CountdownTimer({ endTime }: { endTime: string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calc = () => {
      const diff = new Date(endTime).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft("Ended"); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft((h > 0 ? h + "h " : "") + m + "m " + s + "s");
    };
    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return <span>{timeLeft}</span>;
}

export default function AuctionsPage() {
  const t = useTranslations("auctions");
  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const [auctionType, setAuctionType] = useState("all");
  const [sortBy, setSortBy] = useState("soonest");

  const filtered = useMemo(() => {
    let results = DEMO_AUCTIONS.filter((a) => {
      if (tab !== "all" && a.status !== tab) return false;
      if (auctionType !== "all" && a.type !== auctionType) return false;
      if (search && !a.title.toLowerCase().includes(search.toLowerCase()) && !a.address.toLowerCase().includes(search.toLowerCase()) && !a.city.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    switch (sortBy) {
      case "soonest": results.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()); break;
      case "priceLow": results.sort((a, b) => a.reservePrice - b.reservePrice); break;
      case "priceHigh": results.sort((a, b) => b.reservePrice - a.reservePrice); break;
      case "mostBids": results.sort((a, b) => b.bidCount - a.bidCount); break;
    }
    return results;
  }, [tab, search, auctionType, sortBy]);

  const statusColor = (status: AuctionStatus) => {
    const m: Record<string, string> = { live: "bg-red-500/20 text-red-400", upcoming: "bg-blue-500/20 text-blue-400", ended: "bg-gray-500/20 text-gray-400" };
    return m[status] || "";
  };

  const typeIcon = (type: AuctionType) => {
    const m: Record<string, string> = { live: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z", online: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", sealed: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" };
    return m[type] || "";
  };

  const liveCount = DEMO_AUCTIONS.filter((a) => a.status === "live").length;
  const upcomingCount = DEMO_AUCTIONS.filter((a) => a.status === "upcoming").length;

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl md:text-5xl text-gold font-bold mb-3">{t("title")}</h1>
        <p className="text-cream/60 text-lg">{t("subtitle")}</p>
      </div>

      {/* Live Banner */}
      {liveCount > 0 && (
        <div className="mb-8 bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
            <p className="text-red-400 font-semibold">{t("liveNow", { count: String(liveCount) })}</p>
          </div>
          <button onClick={() => setTab("live")} className="px-4 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors">{t("viewLive")}</button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {(["all", "live", "upcoming", "ended"] as Tab[]).map((t2) => (
          <button
            key={t2}
            onClick={() => setTab(t2)}
            className={"px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap " + (tab === t2 ? "bg-gold text-navy-dark" : "bg-navy-light text-cream/50 hover:text-cream")}
          >
            {t("tabs." + t2)}
            {t2 === "live" && liveCount > 0 && <span className="ml-1.5 w-5 h-5 inline-flex items-center justify-center bg-red-500 text-white text-xs rounded-full">{liveCount}</span>}
            {t2 === "upcoming" && <span className="ml-1.5 text-cream/30">({upcomingCount})</span>}
          </button>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("searchPlaceholder")} className="w-full pl-12 pr-4 py-3 bg-navy-light border border-gold/10 rounded-xl text-cream focus:border-gold focus:outline-none" />
        </div>
        <select value={auctionType} onChange={(e) => setAuctionType(e.target.value)} className="px-4 py-3 bg-navy-light border border-gold/10 rounded-xl text-cream focus:border-gold focus:outline-none">
          <option value="all">{t("auctionTypes.all")}</option>
          <option value="live">{t("auctionTypes.live")}</option>
          <option value="online">{t("auctionTypes.online")}</option>
          <option value="sealed">{t("auctionTypes.sealed")}</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-3 bg-navy-light border border-gold/10 rounded-xl text-cream focus:border-gold focus:outline-none">
          <option value="soonest">{t("sort.soonest")}</option>
          <option value="priceLow">{t("sort.priceLow")}</option>
          <option value="priceHigh">{t("sort.priceHigh")}</option>
          <option value="mostBids">{t("sort.mostBids")}</option>
        </select>
      </div>

      <p className="text-cream/40 text-sm mb-6">{t("resultsCount", { count: String(filtered.length) })}</p>

      {/* Auction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((auction) => (
          <div key={auction.id} className={"bg-navy-light border rounded-2xl overflow-hidden hover:border-gold/30 transition-all " + (auction.status === "live" ? "border-red-500/30" : "border-gold/10")}>
            {/* Image area */}
            <div className="relative h-44 bg-gradient-to-br from-gold/5 to-navy flex items-center justify-center">
              <svg className="w-16 h-16 text-gold/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              <div className="absolute top-3 left-3 flex gap-2">
                <span className={"text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5 " + statusColor(auction.status)}>
                  {auction.status === "live" && <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" /></span>}
                  {t("statusLabels." + auction.status)}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-navy/70 text-cream/60 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={typeIcon(auction.type)} /></svg>
                  {t("auctionTypes." + auction.type)}
                </span>
              </div>
              {auction.status === "live" && (
                <div className="absolute bottom-3 right-3 bg-red-500/90 text-white px-3 py-1.5 rounded-lg text-sm font-mono font-bold">
                  <CountdownTimer endTime={auction.endTime} />
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="text-cream font-semibold text-lg mb-1">{auction.title}</h3>
              <p className="text-cream/40 text-sm mb-4 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {auction.address}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-navy/50 rounded-xl p-3">
                  <p className="text-cream/40 text-xs mb-1">{t("reservePrice")}</p>
                  <p className="text-cream font-bold">{auction.reserveFormatted}</p>
                </div>
                <div className={"rounded-xl p-3 " + (auction.status === "live" ? "bg-red-500/10" : "bg-navy/50")}>
                  <p className="text-cream/40 text-xs mb-1">{auction.status === "ended" ? t("finalBid") : t("currentBid")}</p>
                  <p className={"font-bold " + (auction.status === "live" ? "text-red-400" : "text-gold")}>{auction.currentBidFormatted}</p>
                  {auction.bidCount > 0 && <p className="text-cream/30 text-xs mt-0.5">{auction.bidCount} {t("bids")}</p>}
                </div>
              </div>

              <div className="flex items-center gap-4 text-cream/40 text-sm mb-4">
                {auction.bedrooms > 0 && <span>{auction.bedrooms} {t("beds")}</span>}
                {auction.bathrooms > 0 && <span>{auction.bathrooms} {t("baths")}</span>}
                <span>{auction.floorSize} m\u00B2</span>
              </div>

              <div className="flex items-center gap-2 text-cream/30 text-xs mb-4">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {auction.status === "ended" ? t("endedOn") + " " + new Date(auction.endTime).toLocaleDateString() : (auction.status === "live" ? t("endsAt") : t("startsAt")) + " " + new Date(auction.startTime).toLocaleString()}
              </div>

              <div className="flex gap-2">
                {auction.status === "live" ? (
                  <button className="flex-1 py-2.5 bg-red-500 text-white font-semibold rounded-xl text-sm hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    {t("placeBid")}
                  </button>
                ) : auction.status === "upcoming" ? (
                  <button className="flex-1 py-2.5 bg-gold text-navy-dark font-semibold rounded-xl text-sm hover:bg-gold-light transition-colors">{t("registerToBid")}</button>
                ) : (
                  <button className="flex-1 py-2.5 bg-navy border border-gold/20 text-cream/50 font-semibold rounded-xl text-sm" disabled>{t("auctionEnded")}</button>
                )}
                <button className="px-4 py-2.5 border border-gold/20 text-gold rounded-xl text-sm hover:border-gold/40 transition-colors">{t("details")}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <svg className="w-16 h-16 mx-auto mb-4 text-cream/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" /></svg>
          <h3 className="text-cream/40 text-lg mb-2">{t("noResults")}</h3>
          <p className="text-cream/20 text-sm">{t("noResultsHint")}</p>
        </div>
      )}

      {/* How to Bid Section */}
      <section className="mt-16 bg-navy-light border border-gold/10 rounded-2xl p-8">
        <h2 className="font-display text-2xl text-gold font-semibold mb-8 text-center">{t("howToBid")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {["register", "inspect", "bid", "win"].map((step, i) => (
            <div key={step} className="text-center relative">
              <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-gold font-bold">{"0" + (i + 1)}</span>
              </div>
              <h4 className="text-cream font-semibold mb-1">{t("bidSteps." + step + ".title")}</h4>
              <p className="text-cream/40 text-sm">{t("bidSteps." + step + ".description")}</p>
              {i < 3 && <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-px bg-gold/20" />}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
