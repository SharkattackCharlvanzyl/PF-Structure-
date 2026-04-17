import Link from "next/link";

export const metadata = {
  title: "Franchises for Sale — Propworths",
  description: "Food, retail, fitness, service, and automotive franchise opportunities. Royalty fees, territory rights, and franchisor support disclosed up front.",
};

const FEATURES = [
  { icon: "🍔", title: "Food & Beverage", text: "Quick-service, casual dining, and coffee franchises with unit economics, royalty %, and marketing fund disclosed." },
  { icon: "🛍️", title: "Retail Franchises", text: "Apparel, convenience, homeware, and speciality retail with fit-out costs, stock requirements, and territory size." },
  { icon: "💪", title: "Fitness & Wellness", text: "Gyms, studios, pilates, and wellness brands with member counts, equipment schedules, and fit-out age." },
  { icon: "🔧", title: "Services & Trade", text: "Cleaning, handyman, courier, print, and auto-service franchises with van count, contract book, and SLA data." },
  { icon: "🎓", title: "Education Franchises", text: "Tutoring, early learning, and skills-training brands with enrolment, staff qualifications, and curriculum licences." },
  { icon: "📋", title: "Full Disclosure", text: "Franchise agreement length, exit clauses, territory protection, and master-franchisor approval requirements — all up front." },
];

const SAMPLE = [
  { icon: "🍔", title: "Burger Franchise — Resale", loc: "Sandton City", price: "R 4,200,000", royalty: "Royalty 6%", extra: "Lease 4.5y remaining" },
  { icon: "☕", title: "Coffee Franchise", loc: "Cape Town Waterfront", price: "R 2,800,000", royalty: "Royalty 7%", extra: "Turnover R 6.2M" },
  { icon: "💪", title: "Boutique Fitness Studio", loc: "Rosebank", price: "R 1,650,000", royalty: "Royalty 8%", extra: "420 members" },
  { icon: "🚗", title: "Auto-Service Franchise", loc: "Pretoria East", price: "R 2,200,000", royalty: "Royalty 5%", extra: "4 bays" },
  { icon: "🎓", title: "Early-Learning Franchise", loc: "Umhlanga", price: "R 3,400,000", royalty: "Royalty 6%", extra: "85 enrolled" },
  { icon: "🧼", title: "Cleaning Services Franchise", loc: "East Rand", price: "R 950,000", royalty: "Royalty 6%", extra: "12 recurring contracts" },
];

export default function BusinessFranchisePage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Business · Franchises
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            Franchise opportunities,{" "}
            <span className="italic font-normal text-gold">fully disclosed</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
            Food, retail, fitness, service, and education franchises — with royalty fees, territory
            rights, franchisor support, and unit economics disclosed up front.
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream">Franchises on the platform</h2>
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
                  <span>💰 {s.royalty}</span>
                  <span>📊 {s.extra}</span>
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
