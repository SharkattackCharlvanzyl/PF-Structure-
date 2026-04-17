import Link from "next/link";

export const metadata = {
  title: "Popular Searches & Trending — Propworths",
  description: "The most-searched property categories and trending destinations on Propworths this month.",
};

const CATEGORIES = [
  { ico: "🏠", title: "Residential Sales", sub: "Houses, Apartments, Villas", change: "+18%", tone: "up" },
  { ico: "🔑", title: "Rentals", sub: "Long-term, Furnished, Student", change: "+24%", tone: "up" },
  { ico: "🏢", title: "Commercial", sub: "Offices, Retail, Mixed-Use", change: "Stable", tone: "stable" },
  { ico: "🏭", title: "Industrial", sub: "Warehouses, Factories, Logistics", change: "+31%", tone: "up" },
  { ico: "🌾", title: "Farms & Agricultural", sub: "Wine, Game, Crop, Livestock", change: "+15%", tone: "up" },
  { ico: "🏪", title: "Business for Sale", sub: "Restaurant, Retail, Tech, Services", change: "+22%", tone: "up" },
  { ico: "🔨", title: "Online Auctions", sub: "Live Bidding, No Reserve", change: "+42%", tone: "up" },
  { ico: "🏖️", title: "Holiday & Short-Term", sub: "Airbnb, Beach, Mountain, Eco", change: "+36%", tone: "up" },
  { ico: "💎", title: "Luxury & Premium", sub: "Estates, Penthouses, Villas", change: "Stable", tone: "stable" },
  { ico: "🏗️", title: "New Developments", sub: "Off-Plan, Pre-Launch, Turnkey", change: "+19%", tone: "up" },
];

const DESTS = [
  { flag: "🇿🇦", name: "Cape Town, South Africa", meta: "Camps Bay · Constantia · Hout Bay · Franschhoek", listings: "12,400+", badge: "🔥 #1 Trending" },
  { flag: "🇦🇪", name: "Dubai, UAE", meta: "Marina · Downtown · Palm Jumeirah", listings: "9,400+", badge: "🔥 Hot" },
  { flag: "🇵🇹", name: "Algarve, Portugal", meta: "Lagos · Vilamoura · Albufeira", listings: "8,600+", badge: "📈 Rising" },
  { flag: "🇬🇧", name: "London, UK", meta: "Chelsea · Mayfair · Canary Wharf", listings: "28,500+", badge: "⭐ Popular" },
  { flag: "🇪🇸", name: "Barcelona, Spain", meta: "Eixample · Gothic Quarter · Sitges", listings: "14,200+", badge: "⭐ Popular" },
  { flag: "🇮🇩", name: "Bali, Indonesia", meta: "Seminyak · Ubud · Canggu", listings: "2,800+", badge: "🆕 New" },
  { flag: "🇸🇬", name: "Singapore", meta: "Orchard · Marina Bay · Sentosa", listings: "5,600+", badge: "⭐ Popular" },
  { flag: "🇿🇦", name: "Stellenbosch, South Africa", meta: "Wine Farms · Franschhoek · Paarl", listings: "3,200+", badge: "📈 Rising" },
];

const PILLS = [
  { ico: "🏠", label: "3 Bed House — Cape Town", count: "12.4K" },
  { ico: "🏢", label: "Apartment — Dubai Marina", count: "9.8K" },
  { ico: "🏡", label: "Villa — Algarve, Portugal", count: "8.2K" },
  { ico: "🌾", label: "Wine Farm — Stellenbosch", count: "6.4K" },
  { ico: "🏪", label: "Coffee Shop — Cape Town", count: "4.1K" },
  { ico: "🏭", label: "Warehouse — Johannesburg", count: "3.8K" },
  { ico: "🔨", label: "Auction — No Reserve", count: "5.2K" },
  { ico: "🏖️", label: "Beachfront — Mauritius", count: "3.2K" },
  { ico: "🎯", label: "Under $500k — London", count: "6.1K" },
  { ico: "💎", label: "Penthouse — Singapore", count: "2.9K" },
];

const TICKER = [
  { flag: "🇵🇹", name: "Lisbon apartments", tag: "📈 +42%", tone: "up" },
  { flag: "🇿🇦", name: "Cape Town Camps Bay villas", tag: "🔥 Hot", tone: "hot" },
  { flag: "🇦🇪", name: "Dubai Marina penthouses", tag: "🔥 Hot", tone: "hot" },
  { flag: "🇹🇭", name: "Phuket beachfront", tag: "🔥 Hot", tone: "hot" },
  { flag: "🇿🇦", name: "Stellenbosch wine farms", tag: "📈 +22%", tone: "up" },
  { flag: "🇦🇺", name: "Sydney harbour view", tag: "🆕 New", tone: "new" },
  { flag: "🇮🇹", name: "Tuscany farmhouse", tag: "🔥 Hot", tone: "hot" },
  { flag: "🇸🇬", name: "Singapore penthouse", tag: "📈 +18%", tone: "up" },
];

export default function PopularSearchesPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-12 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Trending
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            Popular searches &amp;{" "}
            <span className="italic font-normal text-gold">trending destinations</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
            What buyers are searching for right now across Propworths in 185 countries.
          </p>
        </div>
      </header>

      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto overflow-hidden rounded-xl border border-gold/20 bg-navy-light">
          <div className="flex gap-6 py-4 px-4 overflow-x-auto text-sm whitespace-nowrap">
            {TICKER.map((t, i) => (
              <div key={i} className="flex items-center gap-2 text-cream/80">
                <span>{t.flag}</span>
                <span>{t.name}</span>
                <span className={`px-2 py-0.5 rounded text-xs ${t.tone === "hot" ? "bg-red-500/20 text-red-300" : t.tone === "up" ? "bg-emerald-500/20 text-emerald-300" : "bg-sky-500/20 text-sky-300"}`}>{t.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-cream mb-8">🔥 Trending destinations</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DESTS.map((d) => (
              <div key={d.name} className="bg-navy-light border border-gold/15 rounded-xl p-5 hover:border-gold/40 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{d.flag}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/10 border border-gold/25 text-gold">{d.badge}</span>
                </div>
                <div className="font-semibold text-cream mb-1">{d.name}</div>
                <div className="text-xs text-cream/60 mb-3">{d.meta}</div>
                <div className="text-xs text-gold font-semibold">📊 {d.listings} listings</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-cream mb-8">📊 Category trends this month</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((c) => (
              <div key={c.title} className="bg-navy-light border border-gold/15 rounded-xl p-5 hover:border-gold/40 transition-colors flex items-start gap-4">
                <div className="text-3xl">{c.ico}</div>
                <div className="flex-1">
                  <div className="font-semibold text-cream">{c.title}</div>
                  <div className="text-xs text-cream/60">{c.sub}</div>
                  <div className={`text-xs mt-1 font-semibold ${c.tone === "up" ? "text-emerald-400" : "text-cream/50"}`}>
                    {c.tone === "up" ? "📈 " : "→ "}{c.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-cream mb-8">🔍 Most popular searches</h2>
          <div className="flex flex-wrap gap-2">
            {PILLS.map((p, i) => (
              <Link key={i} href="/buy" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-light border border-gold/20 hover:border-gold/50 text-sm">
                <span>{p.ico}</span>
                <span>{p.label}</span>
                <span className="text-xs text-gold">{p.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
