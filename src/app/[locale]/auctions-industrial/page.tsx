import Link from "next/link";

export const metadata = {
  title: "Industrial Auctions — Propworths",
  description: "Live online auctions for industrial property: warehouses, factories, logistics hubs. Bidder-pack financials and digital agreements included.",
};

const FEATURES = [
  { icon: "🏭", title: "Warehouses", text: "Distribution and cross-dock warehouses auctioned with tenant leases, GLA, and yield disclosed." },
  { icon: "⚙️", title: "Manufacturing Plants", text: "Factories with existing operations, plant & equipment schedules, and transfer options for going concerns." },
  { icon: "📦", title: "Logistics Hubs", text: "Cold storage, last-mile, and freight hubs with operational metrics, dock count, and leaseback potential." },
  { icon: "⚡", title: "Infrastructure Disclosed", text: "Power (kVA), backup gen, transformers, effluent, fire suppression — all in the bidder pack." },
  { icon: "👔", title: "Institutional Bidders", text: "Logistics REITs, industrial funds, and operator-buyers pre-vetted for participation." },
  { icon: "🤝", title: "Leaseback Options", text: "Seller-occupier arrangements with agreed post-sale leasebacks negotiable before auction close." },
];

const SAMPLE = [
  { icon: "🏭", title: "Distribution Warehouse — 14,000m²", loc: "City Deep, JHB", reserve: "R 185M", current: "R 172M", bids: 5, ends: "3d 14h" },
  { icon: "📦", title: "Cold Storage Hub", loc: "Atlantis, Cape Town", reserve: "R 92M", current: "R 84M", bids: 4, ends: "5d 8h" },
  { icon: "⚙️", title: "Light Manufacturing Park", loc: "Pinetown", reserve: "R 64M", current: "R 58M", bids: 6, ends: "2d 10h" },
  { icon: "🚛", title: "Transport Depot (Going Concern)", loc: "Spartan", reserve: "R 48M", current: "R 42M", bids: 3, ends: "7d 4h" },
  { icon: "❄️", title: "Cold Chain Facility", loc: "Montague Gardens", reserve: "R 120M", current: "R 108M", bids: 4, ends: "4d 2h" },
  { icon: "🏗️", title: "Industrial Park — 6 Units", loc: "Germiston", reserve: "R 82M", current: "R 76M", bids: 5, ends: "6d 18h" },
];

export default function AuctionsIndustrialPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/40 bg-red-500/10 text-red-300 text-xs font-semibold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" /> Live · Industrial Auctions
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">Industrial assets,<br /><span className="italic font-normal text-gold">under the hammer</span></h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">Warehouses, factories, and logistics hubs auctioned to qualified institutional and operator bidders — with full infrastructure disclosure.</p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/auctions" className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">Browse Live Auctions →</Link>
            <Link href="/auction-how-to-bid" className="px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors">How to Bid</Link>
          </div>
        </div>
      </header>
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-navy-light border border-gold/15 rounded-2xl p-6 hover:border-gold/40 transition-colors">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-cream mb-2">{f.title}</h3>
              <p className="text-sm text-cream/60 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12"><div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">Live Now</div><h2 className="font-display text-3xl md:text-4xl font-bold text-cream">Industrial auctions currently running</h2></div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAMPLE.map((s) => (
            <div key={s.title} className="bg-navy-light border border-gold/15 rounded-2xl overflow-hidden hover:border-gold/40 transition-colors">
              <div className="bg-gold/10 h-40 flex items-center justify-center text-6xl relative">
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-red-500/80 text-white animate-pulse">● LIVE</span>
                {s.icon}
              </div>
              <div className="p-5">
                <div className="font-semibold text-cream truncate">{s.title}</div>
                <div className="text-xs text-cream/55 truncate">{s.loc}</div>
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div><div className="text-cream/45">Reserve</div><div className="text-cream">{s.reserve}</div></div>
                  <div><div className="text-cream/45">Current Bid</div><div className="text-gold font-semibold">{s.current}</div></div>
                  <div><div className="text-cream/45">Bids</div><div className="text-cream">{s.bids}</div></div>
                  <div><div className="text-cream/45">Ends</div><div className="text-red-300">{s.ends}</div></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10"><Link href="/auctions" className="inline-block px-8 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">See all live auctions →</Link></div>
      </section>
    </div>
  );
}
