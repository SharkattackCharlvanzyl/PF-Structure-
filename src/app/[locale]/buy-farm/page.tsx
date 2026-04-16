import Link from "next/link";

export const metadata = {
  title: "Buy Farms & Agricultural Property — Propworths",
  description: "Farms, smallholdings, wine estates, and agricultural land for sale. Hectares, water rights, irrigation, livestock capacity — all disclosed.",
};

const FEATURES = [
  { icon: "🌾", title: "Row-Crop Farms", text: "Grain, vegetable, and fodder farms with soil class, arable hectares, and yield history disclosed." },
  { icon: "🍇", title: "Wine & Fruit Estates", text: "Vineyards, orchards, and olive groves with varietals, rootstock age, yield per hectare, and cellar capacity." },
  { icon: "🐄", title: "Livestock Farms", text: "Cattle, sheep, dairy, and game farms with carrying capacity, grazing classification, and handling facilities." },
  { icon: "💧", title: "Water Rights", text: "Boreholes, dams, river frontage, irrigation licences, and rainfall data — essential disclosures up front." },
  { icon: "🏡", title: "Smallholdings", text: "Lifestyle smallholdings and equestrian estates with dwelling, outbuildings, and zoning for agri-use." },
  { icon: "🔭", title: "Development Farms", text: "Agri-land with township potential, mineral rights, eco-estate potential, or solar/wind farm suitability." },
];

const SAMPLE = [
  { icon: "🍇", title: "Wine Estate 88ha", loc: "Stellenbosch", price: "R 32,000,000", size: "88ha total · 42ha vines", extra: "Cellar 500t" },
  { icon: "🌾", title: "Grain Farm 1,200ha", loc: "Free State", price: "R 48,000,000", size: "1,200ha · 850ha arable", extra: "Centre pivot × 6" },
  { icon: "🐄", title: "Cattle Ranch 2,400ha", loc: "Eastern Cape", price: "R 38,000,000", size: "2,400ha · 400 LSU", extra: "4 camps" },
  { icon: "🌳", title: "Citrus Orchard 120ha", loc: "Citrusdal", price: "R 62,000,000", size: "120ha · 85ha citrus", extra: "Packing shed" },
  { icon: "🏡", title: "Smallholding 12ha", loc: "Paarl", price: "R 2,800,000", size: "12ha · equestrian", extra: "4 stables" },
  { icon: "☀️", title: "Solar Farm Land 250ha", loc: "Northern Cape", price: "R 18,000,000", size: "250ha · flat", extra: "Grid 5km" },
];

export default function BuyFarmPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Buy · Farms & Agricultural
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            Farms, wine estates &amp;{" "}
            <span className="italic font-normal text-gold">ag-land</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
            Row-crop farms, wine and citrus estates, livestock ranches, and smallholdings — with
            hectares, water rights, soil class, and carrying capacity all disclosed up front.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/buy" className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">Browse All Farms →</Link>
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream">Farms &amp; estates on the platform</h2>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAMPLE.map((s) => (
            <div key={s.title} className="bg-navy-light border border-gold/15 rounded-2xl overflow-hidden hover:border-gold/40 transition-colors">
              <div className="bg-gold/10 h-40 flex items-center justify-center text-6xl">{s.icon}</div>
              <div className="p-5">
                <div className="font-semibold text-cream truncate">{s.title}</div>
                <div className="text-xs text-cream/55 truncate">{s.loc}</div>
                <div className="font-display text-gold font-bold text-xl mt-2">{s.price}</div>
                <div className="flex gap-3 text-xs text-cream/60 mt-2"><span>📐 {s.size}</span><span>🏗️ {s.extra}</span></div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/buy" className="inline-block px-8 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">See all farms →</Link>
        </div>
      </section>
    </div>
  );
}
