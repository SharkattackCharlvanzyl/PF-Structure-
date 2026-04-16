"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const FEATURED = {
  title: "Luxury Penthouse, Clifton Beach",
  loc: "Clifton, Cape Town · South Africa",
  icon: "🌊",
  reserve: "R 12,500,000",
  current: "R 11,800,000",
  bids: 14,
  bidders: 9,
  highBidder: "Bidder #147 (🇦🇪)",
  viewers: 38,
};

const ACTIVITY = [
  { time: "just now", text: "Bidder #147 placed R 11,800,000", highlight: true },
  { time: "2 min ago", text: "Bidder #92 placed R 11,600,000" },
  { time: "4 min ago", text: "Bidder #147 placed R 11,400,000" },
  { time: "7 min ago", text: "Bidder #214 placed R 11,200,000" },
  { time: "12 min ago", text: "Bidder #92 joined the auction" },
  { time: "18 min ago", text: "Bidder #147 placed R 10,900,000" },
];

const UPCOMING = [
  { icon: "🏡", title: "Heritage Estate", loc: "Franschhoek", reserve: "R 18,500,000", starts: "Starts in 2h 14m" },
  { icon: "🏭", title: "Warehouse 14,000m²", loc: "City Deep, JHB", reserve: "R 185M", starts: "Starts in 6h 40m" },
  { icon: "🍇", title: "Wine Estate 88ha", loc: "Stellenbosch", reserve: "R 32M", starts: "Tomorrow 10:00" },
];

function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    const t = setInterval(() => setRemaining((r) => (r > 0 ? r - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function AuctionsLivePreviewPage() {
  const countdown = useCountdown(18 * 3600 + 23 * 60 + 5);

  return (
    <div className="bg-navy text-cream">
      <header className="pt-24 md:pt-32 pb-8 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/40 bg-red-500/10 text-red-300 text-xs font-semibold tracking-wider uppercase mb-4">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" /> Live Preview
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-cream">Watch an auction happen live</h1>
        <p className="mt-3 text-cream/60">Real-time countdown, live bids, and audit-level activity feed — identical to what bidders see.</p>
      </header>

      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main auction card */}
          <div className="lg:col-span-2 bg-navy-light border border-gold/30 rounded-2xl overflow-hidden">
            <div className="bg-gold/10 h-60 flex items-center justify-center text-8xl relative">
              <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded bg-red-500/80 text-white animate-pulse">● LIVE NOW</span>
              <span className="absolute top-4 right-4 text-xs text-cream/80 bg-navy-dark/80 px-3 py-1.5 rounded-lg">👁 {FEATURED.viewers} watching</span>
              {FEATURED.icon}
            </div>
            <div className="p-6">
              <h2 className="font-display text-2xl font-bold text-cream">{FEATURED.title}</h2>
              <div className="text-sm text-cream/60 mt-1">{FEATURED.loc}</div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <Stat label="Current Bid" value={FEATURED.current} gold />
                <Stat label="Reserve" value={FEATURED.reserve} />
                <Stat label="Bids" value={String(FEATURED.bids)} />
                <Stat label="Unique Bidders" value={String(FEATURED.bidders)} />
              </div>

              <div className="mt-6 bg-navy border border-red-500/40 rounded-xl p-5 text-center">
                <div className="text-xs uppercase tracking-wider text-red-300 mb-2">Auction ends in</div>
                <div className="font-display text-5xl font-bold text-gold font-mono">{countdown}</div>
                <div className="text-xs text-cream/55 mt-2">Anti-sniping: extends 2 min on any bid in last 2 min</div>
              </div>

              <div className="mt-6">
                <div className="text-xs text-cream/55 mb-2">High bidder</div>
                <div className="inline-block bg-gold/15 border border-gold/40 rounded-full px-4 py-1.5 text-sm font-semibold text-gold">
                  {FEATURED.highBidder}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button disabled className="px-6 py-3 bg-gold/40 text-navy-dark font-bold rounded-xl cursor-not-allowed">Preview — Bidding Disabled</button>
                <Link href="/auctions" className="px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors">Real Auctions →</Link>
              </div>
            </div>
          </div>

          {/* Activity feed */}
          <aside className="bg-navy-light border border-gold/15 rounded-2xl p-5">
            <h3 className="font-display text-lg font-semibold text-cream mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              Live Activity
            </h3>
            <div className="space-y-3">
              {ACTIVITY.map((a, i) => (
                <div key={i} className={`p-3 rounded-xl border ${a.highlight ? "bg-gold/10 border-gold/40" : "bg-navy border-gold/10"}`}>
                  <div className={`text-sm ${a.highlight ? "text-gold font-semibold" : "text-cream/85"}`}>{a.text}</div>
                  <div className="text-[11px] text-cream/45 mt-0.5">{a.time}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-cream mb-6">Upcoming auctions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {UPCOMING.map((u) => (
              <div key={u.title} className="bg-navy-light border border-gold/15 rounded-2xl overflow-hidden">
                <div className="bg-gold/10 h-36 flex items-center justify-center text-5xl">{u.icon}</div>
                <div className="p-5">
                  <div className="font-semibold text-cream">{u.title}</div>
                  <div className="text-xs text-cream/55">{u.loc}</div>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-cream/45">Reserve</div>
                      <div className="text-gold font-semibold">{u.reserve}</div>
                    </div>
                    <div className="text-xs font-semibold text-amber-300">{u.starts}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/auctions" className="inline-block px-8 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">Browse All Auctions →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, gold }: { label: string; value: string; gold?: boolean }) {
  return (
    <div className="bg-navy border border-gold/15 rounded-xl p-3">
      <div className="text-xs text-cream/55">{label}</div>
      <div className={`font-display text-lg font-bold ${gold ? "text-gold" : "text-cream"}`}>{value}</div>
    </div>
  );
}
