import Link from "next/link";

export const metadata = {
  title: "Short-Stay & Holiday Rentals — Propworths",
  description: "Nightly and weekly holiday rentals across 185 countries. Seasonal pricing, amenities, house rules, and instant-book — all on one platform.",
};

const FEATURES = [
  { icon: "🏖️", title: "Holiday Homes", text: "Beach houses, mountain cabins, lake cottages, and game-farm lodges — available by the night or week." },
  { icon: "🏙️", title: "City Apartments", text: "Central-city apartments for business travellers and city breaks — fully furnished with WiFi and housekeeping." },
  { icon: "🏡", title: "Villa & Estate Rentals", text: "Luxury villas and private estates for weddings, retreats, and family reunions — chef and concierge optional." },
  { icon: "📅", title: "Seasonal Pricing", text: "High-season and low-season rates clearly displayed. Minimum stay, change-over days, and event-week premiums up front." },
  { icon: "⚡", title: "Instant Book", text: "Calendar-aware instant booking where the host allows it — otherwise request-to-book with 24hr response." },
  { icon: "📜", title: "House Rules", text: "Pet policy, smoking policy, parties, check-in/out windows — explicit on every listing before you book." },
];

const SAMPLE = [
  { icon: "🏖️", title: "Beachfront Villa", loc: "Plettenberg Bay", price: "R 8,400/night", guests: "Sleeps 8", extra: "🏊 Pool" },
  { icon: "🏙️", title: "CBD Apartment", loc: "Cape Town CBD", price: "R 1,800/night", guests: "Sleeps 4", extra: "⚡ Instant book" },
  { icon: "🏔️", title: "Mountain Cabin", loc: "Hogsback", price: "R 2,200/night", guests: "Sleeps 6", extra: "🔥 Fireplace" },
  { icon: "🌊", title: "Lagoon Cottage", loc: "Knysna", price: "R 3,200/night", guests: "Sleeps 6", extra: "🐾 Pet-friendly" },
  { icon: "🦁", title: "Safari Lodge", loc: "Welgevonden", price: "R 12,800/night", guests: "Sleeps 10", extra: "🍽 Chef" },
  { icon: "🍷", title: "Wine Estate Villa", loc: "Franschhoek", price: "R 6,400/night", guests: "Sleeps 8", extra: "🍇 Cellar" },
];

export default function RentShortStayPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">Rent · Short-Stay &amp; Holiday</div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">Holiday homes,<br /><span className="italic font-normal text-gold">by the night</span></h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">Beach houses, city apartments, safari lodges, and villas — nightly and weekly pricing, amenities, and house rules all disclosed up front.</p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/rent" className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">Browse Holiday Rentals →</Link>
            <Link href="/how-it-works" className="px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors">How Booking Works</Link>
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
        <div className="max-w-6xl mx-auto text-center mb-12"><div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">Sample Stays</div><h2 className="font-display text-3xl md:text-4xl font-bold text-cream">Holiday rentals on the platform</h2></div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAMPLE.map((s) => (
            <div key={s.title} className="bg-navy-light border border-gold/15 rounded-2xl overflow-hidden hover:border-gold/40 transition-colors">
              <div className="bg-gold/10 h-40 flex items-center justify-center text-6xl">{s.icon}</div>
              <div className="p-5">
                <div className="font-semibold text-cream truncate">{s.title}</div>
                <div className="text-xs text-cream/55 truncate">{s.loc}</div>
                <div className="font-display text-gold font-bold text-xl mt-2">{s.price}</div>
                <div className="flex gap-3 text-xs text-cream/60 mt-2"><span>👥 {s.guests}</span><span>{s.extra}</span></div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10"><Link href="/rent" className="inline-block px-8 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">See all holiday rentals →</Link></div>
      </section>
    </div>
  );
}
