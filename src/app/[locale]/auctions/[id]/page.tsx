"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AUCTION_PROPERTIES } from "@/lib/auctions";

const FEATURE_ICONS: Record<string, string> = {
  pool: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
  garden: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  security: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  fibre: "M13 10V3L4 14h7v7l9-11h-7z",
  aircon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  balcony: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  fireplace: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z",
  gym: "M4 6h16M4 12h16M4 18h16",
  borehole: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  staffQuarters: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  braaiArea: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z",
};

function CountdownTimer({ endTime, large }: { endTime: string; large?: boolean }) {
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
  return <span className={large ? "text-2xl font-mono font-bold" : ""}>{timeLeft}</span>;
}

export default function AuctionDetailPage() {
  const t = useTranslations("auctionDetail");
  const params = useParams();
  const id = params.id as string;
  const auction = AUCTION_PROPERTIES.find((a) => a.id === id);
  const [bidAmount, setBidAmount] = useState("");
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidPlaced, setBidPlaced] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", phone: "", idNumber: "" });

  if (!auction) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16 text-center">
        <h1 className="text-2xl text-cream/40 mb-4">{t("notFound")}</h1>
        <Link href="/auctions" className="text-gold hover:text-gold-light">{t("backToAuctions")}</Link>
      </div>
    );
  }

  const statusColor: Record<string, string> = { live: "bg-red-500/20 text-red-400 border-red-500/30", upcoming: "bg-blue-500/20 text-blue-400 border-blue-500/30", ended: "bg-gray-500/20 text-gray-400 border-gray-500/30" };
  const typeLabel: Record<string, string> = { live: "Live Auction", online: "Online Auction", sealed: "Sealed Bid" };

  const handleBid = () => {
    setBidPlaced(true);
    setTimeout(() => { setBidPlaced(false); setShowBidModal(false); setBidAmount(""); }, 2000);
  };

  const handleRegister = () => {
    setShowRegister(false);
    setRegisterForm({ name: "", email: "", phone: "", idNumber: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-cream/40 mb-6">
        <Link href="/auctions" className="hover:text-gold transition-colors">{t("auctions")}</Link>
        <span>/</span>
        <span className="text-cream/60">{auction.title}</span>
      </div>

      {/* Status Banner */}
      {auction.status === "live" && (
        <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" /><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" /></span>
            <p className="text-red-400 font-semibold">{t("liveNow")}</p>
          </div>
          <div className="text-red-400 font-mono"><CountdownTimer endTime={auction.endTime} /></div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="bg-navy-light border border-gold/10 rounded-2xl overflow-hidden mb-6">
            <div className="h-72 md:h-96 bg-gradient-to-br from-gold/5 to-navy flex items-center justify-center relative">
              <svg className="w-24 h-24 text-gold/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={"text-sm px-4 py-1.5 rounded-full font-medium border flex items-center gap-2 " + (statusColor[auction.status] || "")}>{auction.status === "live" && <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" /></span>}{t("status." + auction.status)}</span>
                <span className="text-sm px-3 py-1.5 rounded-full bg-navy/70 text-cream/60">{typeLabel[auction.type]}</span>
              </div>
              <span className="absolute bottom-4 right-4 bg-navy/80 text-cream/60 text-xs px-3 py-1 rounded-full">{t("photosComingSoon")}</span>
            </div>
          </div>

          {/* Title & Location */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-display text-cream font-bold mb-2">{auction.title}</h1>
            <p className="text-cream/40 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {auction.address}, {auction.city}, {auction.province}
            </p>
          </div>

          {/* Bid Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-navy-light border border-gold/10 rounded-xl p-4 text-center">
              <p className="text-cream/40 text-xs mb-1">{t("reservePrice")}</p>
              <p className="text-cream font-bold text-lg">{auction.reserveFormatted}</p>
            </div>
            <div className={"rounded-xl p-4 text-center border " + (auction.status === "live" ? "bg-red-500/10 border-red-500/20" : "bg-navy-light border-gold/10")}>
              <p className="text-cream/40 text-xs mb-1">{auction.status === "ended" ? t("finalBid") : t("currentBid")}</p>
              <p className={"font-bold text-lg " + (auction.status === "live" ? "text-red-400" : "text-gold")}>{auction.currentBidFormatted}</p>
              {auction.bidCount > 0 && <p className="text-cream/30 text-xs mt-0.5">{auction.bidCount} {t("bids")}</p>}
            </div>
            <div className="bg-navy-light border border-gold/10 rounded-xl p-4 text-center">
              <p className="text-cream/40 text-xs mb-1">{auction.status === "ended" ? t("endedOn") : auction.status === "live" ? t("endsAt") : t("startsAt")}</p>
              <p className="text-cream font-bold text-sm">{new Date(auction.status === "ended" || auction.status === "live" ? auction.endTime : auction.startTime).toLocaleString()}</p>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {auction.bedrooms > 0 && <div className="bg-navy-light border border-gold/10 rounded-xl p-4 text-center"><p className="text-cream font-bold text-lg">{auction.bedrooms}</p><p className="text-cream/40 text-xs">{t("bedrooms")}</p></div>}
            {auction.bathrooms > 0 && <div className="bg-navy-light border border-gold/10 rounded-xl p-4 text-center"><p className="text-cream font-bold text-lg">{auction.bathrooms}</p><p className="text-cream/40 text-xs">{t("bathrooms")}</p></div>}
            <div className="bg-navy-light border border-gold/10 rounded-xl p-4 text-center"><p className="text-cream font-bold text-lg">{auction.floorSize} m\u00B2</p><p className="text-cream/40 text-xs">{t("floorSize")}</p></div>
            {auction.erfSize > 0 && <div className="bg-navy-light border border-gold/10 rounded-xl p-4 text-center"><p className="text-cream font-bold text-lg">{auction.erfSize} m\u00B2</p><p className="text-cream/40 text-xs">{t("erfSize")}</p></div>}
          </div>

          {/* Description */}
          <div className="bg-navy-light border border-gold/10 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-display text-gold font-semibold mb-3">{t("description")}</h2>
            <p className="text-cream/60 text-sm leading-relaxed">{auction.description}</p>
          </div>

          {/* Features */}
          <div className="bg-navy-light border border-gold/10 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-display text-gold font-semibold mb-4">{t("features")}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {auction.features.map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={FEATURE_ICONS[feat] || "M5 13l4 4L19 7"} /></svg>
                  <span className="text-cream/70">{t("featureLabels." + feat)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Auction Terms */}
          <div className="bg-navy-light border border-gold/10 rounded-2xl p-6">
            <h2 className="text-lg font-display text-gold font-semibold mb-4">{t("auctionTerms")}</h2>
            <ul className="space-y-2">
              {auction.terms.map((term, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  <span className="text-cream/60">{term}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Bid / Register Card */}
          <div className="bg-navy-light border border-gold/10 rounded-2xl p-6 sticky top-24">
            {auction.status === "live" && (
              <>
                <div className="text-center mb-4">
                  <p className="text-cream/40 text-xs mb-1">{t("timeRemaining")}</p>
                  <div className="text-red-400"><CountdownTimer endTime={auction.endTime} large /></div>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4 text-center">
                  <p className="text-cream/40 text-xs mb-1">{t("currentBid")}</p>
                  <p className="text-red-400 font-bold text-2xl">{auction.currentBidFormatted}</p>
                  <p className="text-cream/30 text-xs">{auction.bidCount} {t("bids")}</p>
                </div>
                <button onClick={() => setShowBidModal(true)} className="w-full py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2 mb-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  {t("placeBid")}
                </button>
              </>
            )}
            {auction.status === "upcoming" && (
              <>
                <div className="text-center mb-4">
                  <p className="text-cream/40 text-xs mb-1">{t("auctionStarts")}</p>
                  <p className="text-cream font-bold text-lg">{new Date(auction.startTime).toLocaleString()}</p>
                </div>
                <div className="bg-navy/50 rounded-xl p-4 mb-4 text-center">
                  <p className="text-cream/40 text-xs mb-1">{t("reservePrice")}</p>
                  <p className="text-gold font-bold text-2xl">{auction.reserveFormatted}</p>
                </div>
                <button onClick={() => setShowRegister(true)} className="w-full py-3 bg-gold text-navy-dark font-semibold rounded-xl hover:bg-gold-light transition-colors mb-3">{t("registerToBid")}</button>
              </>
            )}
            {auction.status === "ended" && (
              <>
                <div className="text-center mb-4">
                  <p className="text-cream/40 text-xs mb-1">{t("auctionEnded")}</p>
                  <p className="text-cream/50 text-sm">{new Date(auction.endTime).toLocaleDateString()}</p>
                </div>
                <div className="bg-navy/50 rounded-xl p-4 mb-4 text-center">
                  <p className="text-cream/40 text-xs mb-1">{t("finalBid")}</p>
                  <p className="text-gold font-bold text-2xl">{auction.currentBidFormatted}</p>
                  <p className="text-cream/30 text-xs">{auction.bidCount} {t("bids")}</p>
                </div>
              </>
            )}

            {/* Auctioneer Info */}
            <div className="border-t border-gold/10 pt-4 mt-4">
              <h3 className="text-gold font-semibold mb-3">{t("auctioneer")}</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" /></svg>
                </div>
                <div>
                  <p className="text-cream font-semibold text-sm">{auction.auctioneer}</p>
                </div>
              </div>
              <div className="space-y-2">
                <a href={"tel:" + auction.auctioneerPhone} className="flex items-center gap-2 text-cream/60 text-sm hover:text-gold transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  {auction.auctioneerPhone}
                </a>
                <a href={"mailto:" + auction.auctioneerEmail} className="flex items-center gap-2 text-cream/60 text-sm hover:text-gold transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  {auction.auctioneerEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bid Modal */}
      {showBidModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-navy-light border border-gold/20 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-display text-gold font-semibold">{t("placeBid")}</h3>
              <button onClick={() => setShowBidModal(false)} className="text-cream/30 hover:text-cream"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <p className="text-cream/50 text-sm mb-2">{auction.title}</p>
            <p className="text-cream/40 text-xs mb-4">{t("currentBid")}: {auction.currentBidFormatted}</p>
            {bidPlaced ? (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-green-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <p className="text-cream font-semibold">{t("bidPlaced")}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-cream/50 text-xs mb-1.5">{t("yourBid")} (ZAR)</label>
                  <input value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} type="number" placeholder={String(auction.currentBid + 50000)} className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none" />
                </div>
                <button onClick={handleBid} className="w-full py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors">{t("confirmBid")}</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-navy-light border border-gold/20 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-display text-gold font-semibold">{t("registerToBid")}</h3>
              <button onClick={() => setShowRegister(false)} className="text-cream/30 hover:text-cream"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <p className="text-cream/50 text-sm mb-4">{auction.title}</p>
            <div className="space-y-3">
              <input value={registerForm.name} onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})} placeholder={t("fullName")} className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none" />
              <input value={registerForm.email} onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})} placeholder={t("email")} type="email" className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none" />
              <input value={registerForm.phone} onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})} placeholder={t("phone")} type="tel" className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none" />
              <input value={registerForm.idNumber} onChange={(e) => setRegisterForm({...registerForm, idNumber: e.target.value})} placeholder={t("idNumber")} className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none" />
              <button onClick={handleRegister} className="w-full py-3 bg-gold text-navy-dark font-semibold rounded-xl hover:bg-gold-light transition-colors">{t("submitRegistration")}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}