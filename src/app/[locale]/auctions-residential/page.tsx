import Link from "next/link";

export const metadata = {
  title: "Residential Auctions — Propworths",
  description: "Bid live on houses, apartments, and estates. 7/14/30-day countdowns, verified bidders, digital auction agreements, and anti-fraud controls.",
};

const FEATURES = [
  { icon: "🏠", title: "Houses & Estates", text: "Freehold houses and luxury estates with full property detail, reserve price, and 30-photo galleries." },
  { icon: "🏙️", title: "Apartments & Condos", text: "Apartments and gated-community homes — with HOA, levies, and building info disclosed before bidding." },
  { icon: "⏰", title: "7 / 14 / 30-Day Auctions", text: "Seller chooses the auction length. Extended bidding windows give international buyers time to participate." },
  { icon: "🔒", title: "Verified Bidders", text: "ID verification, refundable deposit, and fraud checks before a single bid can be placed. Protects sellers and buyers." },
  { icon: "📄", title: "Digital Auction Agreement", text: "Winning bidder receives a digitally-signed purchase agreement within 24 hours — no printing, no posting." },
  { icon: "🛡️", title: "Anti-Fraud Controls", text: "Shill-bidding detection, bidder velocity monitoring, and manual review on suspicious bids." },
];

const SAMPLE = [
  { icon: "🌊", title: "Clifton Penthouse", loc: "Clifton, Cape Town", reserve: "R 12,500,000", current: "R 11,800,000", bids: 14, ends: "18h 23m" },
  { icon: "🏡", title: "Heritage Estate", loc: "Franschhoek", reserve: "R 18,500,000", current: "R 16,200,000", bids: 8, ends: "2d 4h" },
  { icon: "🏙️", title: "CBD Loft Apartment", loc: "Cape Town CBD", reserve: "R 3,200,000", current: "R 2,850,000", bids: 22, ends: "5h 10m" },
  { icon: "🏘️", title: "Gated Family Home", loc: "Bryanston", reserve: "R 8,400,000", current: "R 7,900,000", bids: 11, ends: "Tomorrow" },
  { icon: "🌴", title: "Umhlanga Villa", loc: "Umhlanga, Durban", reserve: "R 6,800,000", current: "R 6,200,000", bids: 9, ends: "3d 8h" },
  { icon: "🏔️", title: "Hoedspruit Lodge", loc: "Hoedspruit", reserve: "R 11,200,000", current: "R 10,400,000", bids: 7, ends: "6d 2h" },
];

export default function AuctionsResidentialPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/40 bg-red-500/10 text-red-300 text-xs font-semibold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" /> Live · Residential Auctions
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">Bid live on <span className="italic font-normal text-gold">homes</span></h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">Houses, apartments, and estates — online auctions with verified bidders, digital agreements, and anti-fraud controls built in.</p>
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
        <div className="max-w-6xl mx-auto text-center mb-12"><div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">Live Now</div><h2 className="font-display text-3xl md:text-4xl font-bold text-cream">Residential auctions currently running</h2></div>
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
