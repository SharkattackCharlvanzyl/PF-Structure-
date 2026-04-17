import Link from "next/link";

export const metadata = {
  title: "Manufacturing Businesses for Sale — Propworths",
  description: "Factories, production facilities, and manufacturing businesses for sale. Plant schedules, BEE rating, order book, and turnover disclosed up front.",
};

const FEATURES = [
  { icon: "🏭", title: "Production Facilities", text: "Food, chemical, plastics, textile, and metal-fabrication plants with floorspace, loading bays, and plant register." },
  { icon: "⚙️", title: "Plant & Machinery", text: "Full asset registers — CNC machines, injection moulding, packaging lines — with age, service history, and residual value." },
  { icon: "📦", title: "Order Book", text: "Signed supply contracts, recurring customers, and forward order visibility — transferred with the business." },
  { icon: "👷", title: "Staff & Skills", text: "Skilled artisan roster, SETA certifications, union status, and skills-transfer obligations all disclosed." },
  { icon: "🌱", title: "Compliance", text: "Environmental licences, effluent permits, waste handling, and ISO certifications current and transferable." },
  { icon: "🚛", title: "Logistics", text: "Road, rail, and port access; cold-chain or hazmat handling; distribution network included in sale." },
];

const SAMPLE = [
  { icon: "🏭", title: "Food Packaging Plant", loc: "Isando, Gauteng", price: "R 62,000,000", turnover: "T/O R 78M", extra: "28 staff" },
  { icon: "🔩", title: "Metal Fabrication Workshop", loc: "Germiston", price: "R 18,500,000", turnover: "T/O R 24M", extra: "CNC × 6" },
  { icon: "🧴", title: "Plastics Injection Moulder", loc: "Pinetown", price: "R 34,000,000", turnover: "T/O R 42M", extra: "12 moulds" },
  { icon: "👕", title: "Textile Manufacturer", loc: "Epping, Cape Town", price: "R 14,000,000", turnover: "T/O R 19M", extra: "CMT + print" },
  { icon: "🧪", title: "Chemical Blending Plant", loc: "Vanderbijlpark", price: "R 48,000,000", turnover: "T/O R 55M", extra: "ISO 9001" },
  { icon: "🪵", title: "Timber Processing Mill", loc: "Mpumalanga", price: "R 28,000,000", turnover: "T/O R 31M", extra: "40ha timber" },
];

export default function BusinessManufacturingPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Business · Manufacturing
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            Factories &amp; production{" "}
            <span className="italic font-normal text-gold">going concerns</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
            Food, plastics, chemical, textile, and metal-fab manufacturers — with full plant
            registers, order books, staff schedules, and compliance all disclosed up front.
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream">Manufacturers on the platform</h2>
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
                  <span>⚙️ {s.extra}</span>
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
