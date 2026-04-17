import Link from "next/link";

export const metadata = {
  title: "Retail Businesses for Sale — Propworths",
  description: "Shops, boutiques, convenience stores, and retail businesses for sale. Stock values, lease terms, turnover, and supplier accounts disclosed up front.",
};

const FEATURES = [
  { icon: "🛍️", title: "Boutique & Speciality", text: "Fashion, lifestyle, and speciality retail with brand mix, stock turn, loyalty base, and GLA disclosed." },
  { icon: "🏪", title: "Convenience & FMCG", text: "Convenience stores, spaza, and superettes with supplier accounts, forecourt data, and daily takings." },
  { icon: "📚", title: "Books, Gifts & Hobby", text: "Bookshops, gift stores, and hobby retail with inventory valuation, events programme, and online channel mix." },
  { icon: "🏡", title: "Homeware & Décor", text: "Homeware, furniture, and décor stores with showroom size, warehouse stock, and delivery-fleet schedule." },
  { icon: "📋", title: "Lease & Shopfit", text: "Lease remaining, option periods, escalations, and shopfit condition disclosed — essential for retail resale." },
  { icon: "📈", title: "Turnover & Margin", text: "Audited takings, GP% by category, and add-back reconciliation — so buyers see real earnings, not headline turnover." },
];

const SAMPLE = [
  { icon: "🛍️", title: "Fashion Boutique", loc: "V&A Waterfront", price: "R 2,800,000", turnover: "T/O R 9M", extra: "Lease 3y left" },
  { icon: "🏪", title: "Convenience Store", loc: "Observatory", price: "R 1,950,000", turnover: "T/O R 14M", extra: "Daily R 38k" },
  { icon: "📚", title: "Independent Bookshop", loc: "Melville", price: "R 1,200,000", turnover: "T/O R 4.2M", extra: "Stock R 900k" },
  { icon: "🏡", title: "Homeware Showroom", loc: "Fourways", price: "R 3,600,000", turnover: "T/O R 11M", extra: "GLA 380m²" },
  { icon: "🎁", title: "Gift & Décor Store", loc: "Hermanus", price: "R 1,600,000", turnover: "T/O R 5.8M", extra: "Tourist strip" },
  { icon: "👟", title: "Sneaker & Streetwear", loc: "Rosebank Mall", price: "R 4,200,000", turnover: "T/O R 16M", extra: "Brand rights" },
];

export default function BusinessRetailPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Business · Retail
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            Retail businesses,{" "}
            <span className="italic font-normal text-gold">real earnings</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
            Boutiques, convenience stores, homeware showrooms, and speciality retail — with stock
            valuations, lease terms, audited takings, and supplier accounts disclosed up front.
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream">Retail businesses on the platform</h2>
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
                  <span>🏷️ {s.extra}</span>
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
