import Link from "next/link";

export const metadata = {
  title: "New Developments for Sale — Propworths",
  description: "New residential and commercial developments, off-plan units, and phased releases across 185 countries. Unit types, completion dates, and deposits all disclosed.",
};

const FEATURES = [
  { icon: "🏗️", title: "Phased Releases", text: "Track unit availability across phases with live count of sold, reserved, and available units per block." },
  { icon: "📐", title: "Unit Types", text: "Floor plans, sizes, orientations, and pricing for every unit type in the development — comparable side-by-side." },
  { icon: "📅", title: "Completion Dates", text: "Target occupation, phase completion schedule, and historical delivery track record of the developer." },
  { icon: "💰", title: "Deposit Structures", text: "10% / 90%, milestone payments, bank guarantees — each development's deposit structure clearly laid out." },
  { icon: "🏢", title: "Developer Profiles", text: "Full developer page with past projects, financials (where disclosed), and buyer reviews on delivered developments." },
  { icon: "🎁", title: "Off-Plan Incentives", text: "Early-bird pricing, transfer duty waivers, finance packages, and fit-out upgrades — all filtered and searchable." },
];

const SAMPLE = [
  { icon: "🏙️", title: "Harbour Edge — Phase 2", loc: "V&A Waterfront, Cape Town", price: "From R 4.2M", units: "Studio – 3 Bed", complete: "Q3 2027" },
  { icon: "🌊", title: "Clifton Reserve", loc: "Clifton, Cape Town", price: "From R 18M", units: "3 – 4 Bed Penthouses", complete: "Q1 2027" },
  { icon: "🏘️", title: "Steyn City — The Crest", loc: "Steyn City, Joburg", price: "From R 2.8M", units: "2 – 4 Bed Estates", complete: "Q4 2026" },
  { icon: "🌴", title: "Umhlanga Pearls", loc: "Umhlanga, Durban", price: "From R 3.4M", units: "1 – 3 Bed Apartments", complete: "Q2 2027" },
  { icon: "🍇", title: "Stellenbosch Heights", loc: "Stellenbosch", price: "From R 6.8M", units: "3 – 5 Bed Homes", complete: "Q3 2027" },
  { icon: "🏢", title: "Sandton Towers — Block B", loc: "Sandton CBD", price: "From R 2.4M", units: "Studio – 2 Bed", complete: "Q4 2026" },
];

export default function BuyDevelopmentsPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Buy · New Developments
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            Off-plan developments,{" "}
            <span className="italic font-normal text-gold">fully transparent</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
            Residential and commercial developments with phased releases, unit types, completion dates,
            deposit structures, and full developer profiles — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/buy" className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">Browse All Developments →</Link>
            <Link href="/how-it-works" className="px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors">How Off-Plan Works</Link>
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
          <div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">Featured Developments</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream">Developments on the platform</h2>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAMPLE.map((s) => (
            <div key={s.title} className="bg-navy-light border border-gold/15 rounded-2xl overflow-hidden hover:border-gold/40 transition-colors">
              <div className="bg-gold/10 h-40 flex items-center justify-center text-6xl">{s.icon}</div>
              <div className="p-5">
                <div className="font-semibold text-cream truncate">{s.title}</div>
                <div className="text-xs text-cream/55 truncate">{s.loc}</div>
                <div className="font-display text-gold font-bold text-xl mt-2">{s.price}</div>
                <div className="flex gap-3 text-xs text-cream/60 mt-2"><span>🏠 {s.units}</span><span>📅 {s.complete}</span></div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/buy" className="inline-block px-8 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">See all developments →</Link>
        </div>
      </section>
    </div>
  );
}
