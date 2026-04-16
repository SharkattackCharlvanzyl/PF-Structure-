import Link from "next/link";

export const metadata = {
  title: "Commercial Auctions — Propworths",
  description: "Live online auctions for commercial property: offices, retail, and hospitality. Verified institutional bidders, reserve prices, and digital agreements.",
};

const FEATURES = [
  { icon: "🏢", title: "Office Buildings", text: "Class A, B, and serviced offices with full financials, tenant schedules, WALE, and NOI in the bidder pack." },
  { icon: "🛍️", title: "Retail Centres", text: "Shopping centres and strip retail with anchor tenants, footfall data, and lease expiry schedules." },
  { icon: "🏨", title: "Hospitality", text: "Hotels and guesthouses auctioned with ADR, occupancy, RevPAR, and operational assets included." },
  { icon: "👔", title: "Institutional Bidders", text: "REIT, PE, and family-office bidders pre-vetted through our enhanced KYC. Reserve-level bids only." },
  { icon: "📊", title: "Full Bidder Pack", text: "Financials, leases, title deeds, and valuation reports available to verified bidders before auction opens." },
  { icon: "🤝", title: "Off-Market Option", text: "Seller can choose 'invite-only' auctions for sensitive commercial assets — no public listing." },
];

const SAMPLE = [
  { icon: "🏢", title: "Sandton Office Tower", loc: "Sandton, JHB", reserve: "R 285M", current: "R 268M", bids: 6, ends: "4d 12h" },
  { icon: "🛍️", title: "Waterfront Retail Centre", loc: "V&A Waterfront", reserve: "R 180M", current: "R 165M", bids: 4, ends: "2d 6h" },
  { icon: "🏨", title: "Boutique Hotel — 48 rooms", loc: "Franschhoek", reserve: "R 92M", current: "R 84M", bids: 8, ends: "1d 4h" },
  { icon: "🏛️", title: "Heritage Office Building", loc: "Cape Town CBD", reserve: "R 54M", current: "R 48M", bids: 5, ends: "6d 10h" },
  { icon: "🏬", title: "Regional Shopping Centre", loc: "Durbanville", reserve: "R 420M", current: "R 398M", bids: 3, ends: "8d 2h" },
  { icon: "☕", title: "Mixed-Use F&B Block", loc: "Rosebank", reserve: "R 68M", current: "R 62M", bids: 7, ends: "3d 18h" },
];

export default function AuctionsCommercialPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/40 bg-red-500/10 text-red-300 text-xs font-semibold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" /> Live · Commercial Auctions
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">Commercial assets,<br /><span className="italic font-normal text-gold">sold by tender</span></h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">Offices, retail centres, and hospitality assets auctioned to verified institutional bidders — with full financial disclosure and reserve pricing.</p>
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
        <div className="max-w-6xl mx-auto text-center mb-12"><div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">Live Now</div><h2 className="font-display text-3xl md:text-4xl font-bold text-cream">Commercial auctions currently running</h2></div>
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
