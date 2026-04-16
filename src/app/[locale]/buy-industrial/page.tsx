import Link from "next/link";

export const metadata = {
  title: "Buy Industrial Property — Propworths",
  description: "Warehouses, factories, logistics hubs, and industrial parks for sale across 185 countries. Zoning, GLA, power, and freight data on every listing.",
};

const FEATURES = [
  { icon: "🏭", title: "Warehouses & Logistics", text: "Distribution centres, cross-dock facilities, cold storage, and last-mile hubs with GLA and truck access." },
  { icon: "⚙️", title: "Manufacturing Plants", text: "Heavy and light manufacturing sites with power supply, floor loading, eaves height, and crane details." },
  { icon: "📦", title: "Industrial Parks", text: "Multi-unit industrial estates with shared yards, security, and flexible sub-division options." },
  { icon: "⚡", title: "Power & Utilities", text: "Transformer capacity, 3-phase supply, backup generators, water/effluent disclosed on every listing." },
  { icon: "🚛", title: "Freight Access", text: "Proximity to highways, ports, rail sidings, and airports — auto-populated from location." },
  { icon: "🏗️", title: "Zoning & Expansion", text: "Industrial zoning classes, bulk available, expansion potential, and building-line setbacks searchable." },
];

const SAMPLE = [
  { icon: "🏭", title: "Warehouse — 6,800m²", loc: "City Deep, Johannesburg", price: "R 72,000,000", size: "GLA 6,800m²", extra: "3-ph 1,000kVA" },
  { icon: "📦", title: "Logistics Hub with Yard", loc: "Isipingo, Durban", price: "R 48,000,000", size: "GLA 4,200m²", extra: "Dock × 8" },
  { icon: "⚙️", title: "Light Manufacturing Unit", loc: "Epping, Cape Town", price: "R 18,400,000", size: "GLA 1,800m²", extra: "Crane 5T" },
  { icon: "❄️", title: "Cold Storage Facility", loc: "Montague Gardens", price: "R 62,000,000", size: "GLA 3,400m²", extra: "–25°C" },
  { icon: "🏗️", title: "Industrial Park Unit", loc: "Pinetown, Durban", price: "R 12,800,000", size: "GLA 1,200m²", extra: "Secure estate" },
  { icon: "🚛", title: "Transport Depot with Yard", loc: "Spartan, Kempton Park", price: "R 34,000,000", size: "Erf 1.2ha", extra: "Rail siding" },
];

export default function BuyIndustrialPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Buy · Industrial
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            Industrial property,{" "}
            <span className="italic font-normal text-gold">specced in full</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
            Warehouses, factories, logistics hubs, and industrial estates with zoning, power, GLA, and
            freight access — all searchable, all disclosed up front.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/buy" className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">Browse All Industrial →</Link>
            <Link href="/valuate" className="px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors">Valuate a Property</Link>
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream">Industrial properties on the platform</h2>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAMPLE.map((s) => (
            <div key={s.title} className="bg-navy-light border border-gold/15 rounded-2xl overflow-hidden hover:border-gold/40 transition-colors">
              <div className="bg-gold/10 h-40 flex items-center justify-center text-6xl">{s.icon}</div>
              <div className="p-5">
                <div className="font-semibold text-cream truncate">{s.title}</div>
                <div className="text-xs text-cream/55 truncate">{s.loc}</div>
                <div className="font-display text-gold font-bold text-xl mt-2">{s.price}</div>
                <div className="flex gap-3 text-xs text-cream/60 mt-2"><span>📐 {s.size}</span><span>⚡ {s.extra}</span></div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/buy" className="inline-block px-8 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">See all industrial listings →</Link>
        </div>
      </section>
    </div>
  );
}
