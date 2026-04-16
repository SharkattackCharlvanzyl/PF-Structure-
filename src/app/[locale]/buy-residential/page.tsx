import Link from "next/link";

export const metadata = {
  title: "Buy Residential Property — Propworths",
  description: "Find houses, apartments, and estates for sale across 185 countries. 30 photos per listing, video tour, and full property detail pages.",
};

const FEATURES = [
  { icon: "🏠", title: "Houses & Estates", text: "Freehold houses, family homes, townhouses, and luxury estates — all with 30 photos and detailed floor plans." },
  { icon: "🏙️", title: "Apartments & Condos", text: "City apartments, penthouses, and gated condos with full amenities, HOA details, and building info." },
  { icon: "🏖️", title: "Holiday Homes", text: "Beachfront, mountain, and lake properties with seasonal rental yield data built into every listing." },
  { icon: "🔑", title: "Ownership Types", text: "Freehold, leasehold, share block, sectional title — filterable per country with compliant disclosures." },
  { icon: "📐", title: "25+ Attributes", text: "Bedrooms, bathrooms, erf size, building size, parking, pools, garages, utilities, finishes — all searchable." },
  { icon: "🌍", title: "185 Countries", text: "Native-language listings with currency auto-detection. South Africa, UK, UAE, Portugal, US — one platform." },
];

const SAMPLE = [
  { icon: "🌊", title: "Luxury Penthouse, Clifton Beach", loc: "Clifton, Cape Town", price: "R 12,500,000", beds: 4, baths: 3, size: "380m²" },
  { icon: "🏡", title: "3 Bed Family Home with Pool", loc: "Constantia, Cape Town", price: "R 3,500,000", beds: 3, baths: 2, size: "280m²" },
  { icon: "🏙️", title: "Modern 2-Bed Apartment", loc: "Sea Point, Cape Town", price: "R 4,800,000", beds: 2, baths: 2, size: "110m²" },
  { icon: "🏠", title: "Heritage Villa with Gardens", loc: "Stellenbosch", price: "R 8,200,000", beds: 5, baths: 4, size: "520m²" },
  { icon: "🌴", title: "Beachfront Bungalow", loc: "Umhlanga, Durban", price: "R 6,400,000", beds: 3, baths: 3, size: "240m²" },
  { icon: "🏗️", title: "Off-Plan Townhouse", loc: "Paarl, Western Cape", price: "R 2,100,000", beds: 3, baths: 2, size: "160m²" },
];

export default function BuyResidentialPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Buy · Residential
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            Find your next{" "}
            <span className="italic font-normal text-gold">home</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
            Houses, apartments, and estates for sale across 185 countries. Every listing includes 30
            photos, a video tour, and 25+ searchable attributes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/buy" className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">
              Browse All Residential →
            </Link>
            <Link href="/valuate" className="px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors">
              Valuate a Property
            </Link>
          </div>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">What's Included</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">Every residential listing, fully detailed</h2>
        </div>
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">Residential properties on the platform</h2>
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
                  <span>🛏 {s.beds} bed</span>
                  <span>🛁 {s.baths} bath</span>
                  <span>📐 {s.size}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/buy" className="inline-block px-8 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">
            See all residential listings →
          </Link>
        </div>
      </section>
    </div>
  );
}
