import Link from "next/link";

export const metadata = {
  title: "Agricultural Businesses for Sale — Propworths",
  description: "Agribusinesses, packhouses, processors, and ag-services for sale. Yield history, offtake agreements, water rights, and equipment disclosed up front.",
};

const FEATURES = [
  { icon: "🌾", title: "Crop Production", text: "Grain, fruit, vegetable, and specialty crop operations with yield history, cultivar mix, and offtake agreements." },
  { icon: "🐄", title: "Livestock & Dairy", text: "Dairy, beef, poultry, and sheep operations with LSU count, carrying capacity, milk quotas, and processing contracts." },
  { icon: "🍇", title: "Wine & Viticulture", text: "Vineyards with cellar, brand, export register, cultivar age, terroir profile, and wine-industry trading stock." },
  { icon: "📦", title: "Packhouses & Processors", text: "Fruit packhouses, abattoirs, dairy processors, and feed mills with plant schedule, certification, and export status." },
  { icon: "💧", title: "Water & Irrigation", text: "Boreholes, dams, rivers, and irrigation licences — with volume allocations, pump schedules, and infrastructure audit." },
  { icon: "🚜", title: "Equipment & Plant", text: "Full asset register — tractors, harvesters, irrigation systems, cold stores — with service records and residual value." },
];

const SAMPLE = [
  { icon: "🍇", title: "Wine Farm + Cellar", loc: "Paarl", price: "R 58,000,000", turnover: "T/O R 24M", extra: "Export brand" },
  { icon: "🍊", title: "Citrus Packhouse", loc: "Sundays River", price: "R 42,000,000", turnover: "T/O R 88M", extra: "GlobalGAP" },
  { icon: "🐄", title: "Dairy Operation 480 LSU", loc: "Tsitsikamma", price: "R 32,000,000", turnover: "T/O R 38M", extra: "Milk quota secured" },
  { icon: "🌾", title: "Grain Silo Complex", loc: "Free State", price: "R 24,000,000", turnover: "T/O R 18M", extra: "14,000t capacity" },
  { icon: "🐓", title: "Broiler Operation", loc: "Mpumalanga", price: "R 18,500,000", turnover: "T/O R 32M", extra: "6 houses, 80k birds" },
  { icon: "🥬", title: "Hydroponic Greenhouses", loc: "Tarlton", price: "R 14,000,000", turnover: "T/O R 22M", extra: "2.4ha tunnels" },
];

export default function BusinessAgriculturePage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Business · Agriculture
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            Agribusinesses &amp;{" "}
            <span className="italic font-normal text-gold">processors</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
            Crop operations, dairies, packhouses, vineyards, and ag-processors — with yield history,
            offtake agreements, water rights, and equipment all disclosed up front.
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream">Agri-businesses on the platform</h2>
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
                  <span>🌱 {s.extra}</span>
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
