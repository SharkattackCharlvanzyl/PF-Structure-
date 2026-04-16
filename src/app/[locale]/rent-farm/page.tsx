import Link from "next/link";

export const metadata = {
  title: "Rent Farms & Agricultural Land — Propworths",
  description: "Farms, smallholdings, and agricultural land for long-term lease or share-cropping agreements. Hectares, water rights, and fencing disclosed up front.",
};

const FEATURES = [
  { icon: "🌾", title: "Row-Crop Leases", text: "Grain and vegetable farms available on annual or multi-year leases — with soil class and arable hectares." },
  { icon: "🐄", title: "Grazing Leases", text: "Livestock grazing leases with carrying capacity (LSU), water points, and camp infrastructure disclosed." },
  { icon: "🍇", title: "Vineyard / Orchard Leases", text: "Operating wine farms and orchards available for lease — includes cellar access and existing contracts." },
  { icon: "💧", title: "Water Rights", text: "Irrigation licences, boreholes, dam allocations, and river frontage explicitly disclosed on every lease." },
  { icon: "🏡", title: "Homestead Included", text: "Many farm leases include a homestead, staff housing, and agricultural infrastructure (sheds, pens, cellars)." },
  { icon: "🤝", title: "Share-Cropping", text: "Non-cash leases: share of yield or revenue arrangements with farm-owner partnerships available too." },
];

const SAMPLE = [
  { icon: "🌾", title: "Grain Farm — 850ha Arable", loc: "Free State", price: "R 1,200/ha/yr", size: "850ha arable", extra: "Centre pivot" },
  { icon: "🐄", title: "Grazing Lease — 1,800ha", loc: "Karoo", price: "R 380/ha/yr", size: "1,800ha", extra: "220 LSU" },
  { icon: "🍇", title: "Wine Farm — 40ha Vines", loc: "Stellenbosch", price: "R 2.8M/year", size: "40ha vines", extra: "Cellar access" },
  { icon: "🌳", title: "Citrus Lease — 60ha", loc: "Citrusdal", price: "Share 25%", size: "60ha orchard", extra: "Pack shed" },
  { icon: "🏡", title: "Smallholding Lease", loc: "Stanford", price: "R 18,000/mo", size: "8ha", extra: "+ homestead" },
  { icon: "☀️", title: "Land for Solar Farm", loc: "Northern Cape", price: "R 4,200/ha/yr", size: "250ha", extra: "Grid 3km" },
];

export default function RentFarmPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">Rent · Farms</div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">Farm leases &amp;<br /><span className="italic font-normal text-gold">share-cropping</span></h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">Annual, multi-year, and share-yield leases on farms and agri-land. Soil, water rights, carrying capacity, and infrastructure all disclosed.</p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/rent" className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">Browse All Farm Leases →</Link>
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
        <div className="max-w-6xl mx-auto text-center mb-12"><div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">Sample Leases</div><h2 className="font-display text-3xl md:text-4xl font-bold text-cream">Farm leases on the platform</h2></div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAMPLE.map((s) => (
            <div key={s.title} className="bg-navy-light border border-gold/15 rounded-2xl overflow-hidden hover:border-gold/40 transition-colors">
              <div className="bg-gold/10 h-40 flex items-center justify-center text-6xl">{s.icon}</div>
              <div className="p-5">
                <div className="font-semibold text-cream truncate">{s.title}</div>
                <div className="text-xs text-cream/55 truncate">{s.loc}</div>
                <div className="font-display text-gold font-bold text-xl mt-2">{s.price}</div>
                <div className="flex gap-3 text-xs text-cream/60 mt-2"><span>📐 {s.size}</span><span>💧 {s.extra}</span></div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10"><Link href="/rent" className="inline-block px-8 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">See all farm leases →</Link></div>
      </section>
    </div>
  );
}
