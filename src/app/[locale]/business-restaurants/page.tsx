import Link from "next/link";

export const metadata = {
  title: "Restaurants for Sale — Propworths",
  description: "Restaurants, cafes, bars, and eateries for sale. Liquor licences, lease terms, covers, and average spend disclosed up front.",
};

const FEATURES = [
  { icon: "🍽️", title: "Full-Service Restaurants", text: "Dinner, bistro, and fine-dining restaurants with cover counts, average spend, wine list, and chef arrangements." },
  { icon: "☕", title: "Cafes & Coffee Shops", text: "Coffee shops and day cafes with daily covers, wet/dry split, roaster supply, and breakfast-lunch ratio." },
  { icon: "🍺", title: "Bars & Taprooms", text: "Bars, taprooms, and sports bars with liquor licence status, tap count, supplier accounts, and events calendar." },
  { icon: "🍕", title: "QSR & Takeaway", text: "Pizza, burger, and takeaway outlets with delivery-platform revenue, kitchen throughput, and equipment schedules." },
  { icon: "🥂", title: "Liquor Licences", text: "On/off consumption status, trading hours, transfer risk, and SAPS compliance — disclosed on every listing." },
  { icon: "📋", title: "Lease & Equipment", text: "Lease remaining, rent-to-turnover %, kitchen extraction, cold-room condition, and POS age all audited." },
];

const SAMPLE = [
  { icon: "🍽️", title: "Bistro, 60 Seats", loc: "Tamboerskloof", price: "R 3,200,000", turnover: "T/O R 12M", extra: "Liquor · 4y lease" },
  { icon: "☕", title: "Coffee Shop", loc: "Parkhurst", price: "R 1,800,000", turnover: "T/O R 5.8M", extra: "Daily 180 covers" },
  { icon: "🍺", title: "Craft Beer Taproom", loc: "Woodstock", price: "R 2,400,000", turnover: "T/O R 7.2M", extra: "12 taps · licence" },
  { icon: "🍕", title: "Pizza Delivery QSR", loc: "Fourways", price: "R 1,450,000", turnover: "T/O R 6.4M", extra: "Uber + Mr D" },
  { icon: "🥂", title: "Fine Dining 40 Seats", loc: "Franschhoek", price: "R 5,800,000", turnover: "T/O R 14M", extra: "2 hats · wine list" },
  { icon: "🌮", title: "Casual Diner, 90 Seats", loc: "Umhlanga", price: "R 3,900,000", turnover: "T/O R 16M", extra: "Mall-anchor site" },
];

export default function BusinessRestaurantsPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Business · Restaurants
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            Restaurants, cafes &amp;{" "}
            <span className="italic font-normal text-gold">bars</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
            Full-service restaurants, coffee shops, taprooms, and QSR outlets — with liquor
            licences, lease terms, covers, and average spend disclosed up front.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/business" className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">Browse All Businesses →</Link>
            <Link href="/valuate" className="px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors">Valuate a Business</Link>
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
        <div className="max-w-6xl mx-auto text-center mb-12">
          <div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">Sample Listings</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream">Restaurants on the platform</h2>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAMPLE.map((s) => (
            <div key={s.title} className="bg-navy-light border border-gold/15 rounded-2xl overflow-hidden hover:border-gold/40 transition-colors">
              <div className="bg-gold/10 h-40 flex items-center justify-center text-6xl">{s.icon}</div>
              <div className="p-5">
                <div className="font-semibold text-cream truncate">{s.title}</div>
                <div className="text-xs text-cream/55 truncate">{s.loc}</div>
                <div className="font-display text-gold font-bold text-xl mt-2">{s.price}</div>
                <div className="flex gap-3 text-xs text-cream/60 mt-2">
                  <span>📈 {s.turnover}</span>
                  <span>🍴 {s.extra}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/business" className="inline-block px-8 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">Browse All Businesses →</Link>
        </div>
      </section>
    </div>
  );
}
