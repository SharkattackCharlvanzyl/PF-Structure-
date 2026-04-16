import Link from "next/link";

export const metadata = {
  title: "Rent Industrial Property — Propworths",
  description: "Warehouses, factories, and logistics space to lease across 185 countries. GLA, power supply, eaves height, and truck access all disclosed.",
};

const FEATURES = [
  { icon: "🏭", title: "Warehouses", text: "Distribution and storage warehouses with GLA, truck access, eaves height, and floor loading disclosed." },
  { icon: "⚙️", title: "Factories", text: "Light and heavy manufacturing space with power supply, 3-phase kVA, crane capacity, and effluent disposal." },
  { icon: "📦", title: "Logistics", text: "Cross-dock, last-mile, and cold-chain facilities with loading bay count, yard depth, and dock-door count." },
  { icon: "⚡", title: "Power Supply", text: "Full disclosure of transformer kVA, 3-phase vs single-phase, backup generators, and electricity costs." },
  { icon: "🚛", title: "Freight Access", text: "Highway proximity, port access, rail sidings, and airport distance auto-populated from location." },
  { icon: "📄", title: "Flexible Leases", text: "Short-term storage (6-month) through long-term manufacturing leases (10+ years) — filterable by term." },
];

const SAMPLE = [
  { icon: "🏭", title: "Warehouse — 4,200m²", loc: "City Deep, JHB", price: "R 62/sqm/mo", size: "GLA 4,200m²", extra: "3-ph 800kVA" },
  { icon: "📦", title: "Logistics Unit with Dock", loc: "Isipingo, Durban", price: "R 78/sqm/mo", size: "GLA 2,800m²", extra: "Dock × 6" },
  { icon: "⚙️", title: "Light Manufacturing", loc: "Epping, CT", price: "R 85/sqm/mo", size: "GLA 1,800m²", extra: "5T crane" },
  { icon: "❄️", title: "Cold Store — Trading", loc: "Montague Gardens", price: "R 145/sqm/mo", size: "GLA 1,400m²", extra: "–25°C" },
  { icon: "🏗️", title: "Mini Factory", loc: "Germiston", price: "R 68/sqm/mo", size: "GLA 850m²", extra: "3-ph 250kVA" },
  { icon: "🚛", title: "Depot with Yard", loc: "Spartan", price: "R 54/sqm/mo", size: "GLA 1,600m²", extra: "1.2ha yard" },
];

export default function RentIndustrialPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">Rent · Industrial</div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">Industrial leases,<br /><span className="italic font-normal text-gold">fully specced</span></h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">Warehouses, factories, and logistics space to let — with GLA, power, eaves, truck access, and freight connectivity disclosed on every listing.</p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/rent" className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">Browse All Industrial →</Link>
            <Link href="/how-it-works" className="px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors">How Leasing Works</Link>
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
        <div className="max-w-6xl mx-auto text-center mb-12"><div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">Sample Listings</div><h2 className="font-display text-3xl md:text-4xl font-bold text-cream">Industrial space on the platform</h2></div>
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
        <div className="text-center mt-10"><Link href="/rent" className="inline-block px-8 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">See all industrial space →</Link></div>
      </section>
    </div>
  );
}
