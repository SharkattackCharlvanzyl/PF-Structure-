import Link from "next/link";

export const metadata = {
  title: "Rent Commercial Property — Propworths",
  description: "Offices, retail, and hospitality spaces for lease across 185 countries. Rent per sqm, lease term, escalation, and fit-out terms disclosed up front.",
};

const FEATURES = [
  { icon: "🏢", title: "Offices to Let", text: "Class A, B, and serviced offices — with rent per sqm, lease length, escalations, and parking ratio disclosed." },
  { icon: "🛍️", title: "Retail Lettings", text: "High-street shops, mall units, and strip-centre spaces with anchor tenants and footfall data on every listing." },
  { icon: "🏨", title: "Hospitality Leases", text: "Hotels, guesthouses, and F&B venues available for operational lease with licence and trading history disclosed." },
  { icon: "📐", title: "Lease Terms", text: "Short-term (1–3 years) and long-term (5–10+ years) leases — filterable by duration and break clauses." },
  { icon: "💼", title: "Fit-Out Options", text: "White-box, shell-only, plug-and-play, and fully furnished — every listing declares its fit-out status." },
  { icon: "📊", title: "Escalations", text: "CPI-linked, fixed-percentage, or step-up escalations clearly disclosed — no surprises mid-lease." },
];

const SAMPLE = [
  { icon: "🏢", title: "Prime CBD Office", loc: "Sandton", price: "R 185/sqm/mo", size: "GLA 450m²", term: "5-year lease" },
  { icon: "🛍️", title: "Retail Unit — Mall", loc: "V&A Waterfront", price: "R 480/sqm/mo", size: "GLA 120m²", term: "3-year lease" },
  { icon: "☕", title: "F&B Space — Trading", loc: "Rosebank", price: "R 320/sqm/mo", size: "GLA 85m²", term: "5+5 yr" },
  { icon: "🏗️", title: "Office Floor — Class A", loc: "Menlyn, Pretoria", price: "R 165/sqm/mo", size: "GLA 1,200m²", term: "7-year lease" },
  { icon: "🏨", title: "Boutique Hotel Lease", loc: "Franschhoek", price: "R 280,000/mo", size: "28 rooms", term: "10-year lease" },
  { icon: "🏬", title: "Strip Centre Anchor", loc: "Durbanville", price: "R 140/sqm/mo", size: "GLA 850m²", term: "5-year lease" },
];

export default function RentCommercialPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">Rent · Commercial</div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">Commercial space,<br /><span className="italic font-normal text-gold">ready to lease</span></h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">Offices, retail, and hospitality venues to let across 185 countries — with rent per sqm, lease terms, escalations, and fit-out all disclosed.</p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/rent" className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">Browse All Commercial →</Link>
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
        <div className="max-w-6xl mx-auto text-center mb-12"><div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">Sample Listings</div><h2 className="font-display text-3xl md:text-4xl font-bold text-cream">Commercial rentals on the platform</h2></div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAMPLE.map((s) => (
            <div key={s.title} className="bg-navy-light border border-gold/15 rounded-2xl overflow-hidden hover:border-gold/40 transition-colors">
              <div className="bg-gold/10 h-40 flex items-center justify-center text-6xl">{s.icon}</div>
              <div className="p-5">
                <div className="font-semibold text-cream truncate">{s.title}</div>
                <div className="text-xs text-cream/55 truncate">{s.loc}</div>
                <div className="font-display text-gold font-bold text-xl mt-2">{s.price}</div>
                <div className="flex gap-3 text-xs text-cream/60 mt-2"><span>📐 {s.size}</span><span>📅 {s.term}</span></div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10"><Link href="/rent" className="inline-block px-8 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">See all commercial rentals →</Link></div>
      </section>
    </div>
  );
}
