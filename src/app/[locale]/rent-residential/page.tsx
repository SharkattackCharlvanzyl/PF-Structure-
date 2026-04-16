import Link from "next/link";

export const metadata = {
  title: "Rent Residential Property — Propworths",
  description: "Houses and apartments to rent across 185 countries. Full property details, monthly rent, deposit, and lease terms disclosed up front.",
};

const FEATURES = [
  { icon: "🏠", title: "Houses to Rent", text: "Family homes and townhouses with garden size, pet policy, parking, and lease length clearly disclosed." },
  { icon: "🏙️", title: "Apartments", text: "Studios through penthouses — with HOA, utilities included/excluded, and building amenities searchable." },
  { icon: "🔑", title: "Lease Terms", text: "12-month, 24-month, month-to-month, and corporate lets — filter by term and deposit structure." },
  { icon: "🐾", title: "Pet-Friendly Filter", text: "Every listing declares pet policy. Filter instantly for properties that welcome your dog, cat, or aquarium." },
  { icon: "🛋️", title: "Furnished / Unfurnished", text: "Clear disclosure of furnished, semi-furnished, and unfurnished — with inventory lists on furnished properties." },
  { icon: "💼", title: "Corporate Relocation", text: "Agency-managed corporate leases with utilities, housekeeping, and concierge options for relocating staff." },
];

const SAMPLE = [
  { icon: "🏡", title: "3 Bed Family Home", loc: "Constantia, Cape Town", price: "R 28,000/mo", beds: 3, extra: "🐾 Pets OK" },
  { icon: "🏙️", title: "2 Bed Seaview Apartment", loc: "Sea Point", price: "R 18,500/mo", beds: 2, extra: "🛋️ Furnished" },
  { icon: "🌊", title: "Beachfront Penthouse", loc: "Umhlanga", price: "R 42,000/mo", beds: 4, extra: "🏊 Pool" },
  { icon: "🏘️", title: "Gated Townhouse", loc: "Fourways", price: "R 14,200/mo", beds: 3, extra: "🔒 Secure" },
  { icon: "🏢", title: "Studio Apartment", loc: "Cape Town CBD", price: "R 8,400/mo", beds: 0, extra: "💼 Corp-ready" },
  { icon: "🌳", title: "4 Bed Garden Home", loc: "Bryanston", price: "R 32,000/mo", beds: 4, extra: "🌳 Big garden" },
];

export default function RentResidentialPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">Rent · Residential</div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">Rent a <span className="italic font-normal text-gold">home</span></h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">Houses and apartments to rent across 185 countries. Lease terms, deposits, pet policy, and included utilities all disclosed on every listing.</p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/rent" className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">Browse All Rentals →</Link>
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
        <div className="max-w-6xl mx-auto text-center mb-12"><div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">Sample Listings</div><h2 className="font-display text-3xl md:text-4xl font-bold text-cream">Rentals on the platform</h2></div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAMPLE.map((s) => (
            <div key={s.title} className="bg-navy-light border border-gold/15 rounded-2xl overflow-hidden hover:border-gold/40 transition-colors">
              <div className="bg-gold/10 h-40 flex items-center justify-center text-6xl">{s.icon}</div>
              <div className="p-5">
                <div className="font-semibold text-cream truncate">{s.title}</div>
                <div className="text-xs text-cream/55 truncate">{s.loc}</div>
                <div className="font-display text-gold font-bold text-xl mt-2">{s.price}</div>
                <div className="flex gap-3 text-xs text-cream/60 mt-2"><span>🛏 {s.beds} bed</span><span>{s.extra}</span></div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10"><Link href="/rent" className="inline-block px-8 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">See all rentals →</Link></div>
      </section>
    </div>
  );
}
