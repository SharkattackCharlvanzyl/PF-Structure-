import Link from "next/link";

export const metadata = {
  title: "Automotive Businesses for Sale — Propworths",
  description: "Dealerships, panel shops, workshops, and tyre fitment centres for sale. Franchise agreements, stock values, and turnover disclosed up front.",
};

const FEATURES = [
  { icon: "🚗", title: "Vehicle Dealerships", text: "New and pre-owned franchised dealerships with manufacturer agreements, stock levels, and F&I income disclosed." },
  { icon: "🔧", title: "Workshops & Service", text: "Independent and franchised workshops with bay counts, hoist schedules, diagnostic equipment, and RMI accreditation." },
  { icon: "🛞", title: "Tyre & Fitment Centres", text: "Tyre, exhaust, battery, and alignment businesses with supplier agreements and recurring fleet contracts." },
  { icon: "🎨", title: "Panel & Paint Shops", text: "Accident-repair shops with insurance-panel listings, spray booths, and chassis-straightener assets." },
  { icon: "🛻", title: "Commercial Vehicle", text: "Truck and bus dealerships, parts distributors, and fleet-workshop businesses with contract book disclosed." },
  { icon: "🏍️", title: "Motorcycle & Powersports", text: "Bike dealers, quad and jet-ski resellers with brand rights, demo fleet, and parts inventory included." },
];

const SAMPLE = [
  { icon: "🚗", title: "Franchised Dealership", loc: "Bryanston", price: "R 28,000,000", turnover: "T/O R 180M", extra: "Stock R 45M" },
  { icon: "🔧", title: "RMI Workshop, 6 Bays", loc: "Boksburg", price: "R 4,800,000", turnover: "T/O R 12M", extra: "4 staff" },
  { icon: "🛞", title: "Tyre Fitment Centre", loc: "Centurion", price: "R 3,200,000", turnover: "T/O R 9M", extra: "3 bays" },
  { icon: "🎨", title: "Panel Shop — Insurance", loc: "Milnerton", price: "R 6,500,000", turnover: "T/O R 16M", extra: "2 booths" },
  { icon: "🛻", title: "Truck Parts Distributor", loc: "Isipingo", price: "R 11,000,000", turnover: "T/O R 38M", extra: "Stock R 8M" },
  { icon: "🏍️", title: "Motorcycle Dealership", loc: "Sea Point", price: "R 5,400,000", turnover: "T/O R 22M", extra: "2 brands" },
];

export default function BusinessAutomotivePage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Business · Automotive
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            Automotive businesses,{" "}
            <span className="italic font-normal text-gold">full books open</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
            Franchised and independent dealerships, workshops, panel shops, and fitment centres —
            with manufacturer agreements, stock values, and recurring revenue disclosed.
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream">Automotive businesses on the platform</h2>
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
