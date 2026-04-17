import Link from "next/link";

export const metadata = {
  title: "Buy Commercial Property — Propworths",
  description: "Offices, retail, mixed-use, and hospitality properties for sale across 185 countries. GLA, zoning, and yield data on every listing.",
};

const FEATURES = [
  { icon: "🏢", title: "Office Buildings", text: "Class A, B, and serviced offices with GLA, tenant schedules, WALE, and parking ratio disclosed up front." },
  { icon: "🛍️", title: "Retail Spaces", text: "Shopping centres, high-street retail, strip malls, and single-tenant stores with footfall and anchor data." },
  { icon: "🏨", title: "Hospitality", text: "Hotels, guesthouses, boutique resorts, and conference venues with ADR, occupancy, and RevPAR history." },
  { icon: "📊", title: "Financials", text: "Net operating income, cap rate, gross rental yield, lease expiries, and escalation schedules — all searchable." },
  { icon: "📐", title: "Zoning & Use", text: "Filter by zoning classification, permitted uses, density, height restrictions, and development potential." },
  { icon: "🏗️", title: "Mixed-Use", text: "Buildings combining retail, office, and residential components with component-level financials." },
];

const SAMPLE = [
  { icon: "🏢", title: "Prime CBD Office — 1,200m²", loc: "Sandton, Johannesburg", price: "R 45,000,000", yield: "8.4% yield", class: "Class A" },
  { icon: "🛍️", title: "Neighbourhood Shopping Centre", loc: "Stellenbosch", price: "R 82,000,000", yield: "9.1% yield", class: "GLA 6,200m²" },
  { icon: "🏨", title: "Boutique Hotel, 28 Rooms", loc: "Franschhoek", price: "R 42,000,000", yield: "68% occupancy", class: "4★" },
  { icon: "🏛️", title: "Heritage Retail Building", loc: "Cape Town CBD", price: "R 18,000,000", yield: "7.8% yield", class: "Fully let" },
  { icon: "🏬", title: "Mixed-Use Development", loc: "Umhlanga Ridge", price: "R 125,000,000", yield: "8.6% yield", class: "14,000m²" },
  { icon: "☕", title: "F&B Strip, 6 Tenants", loc: "Green Point", price: "R 28,000,000", yield: "9.4% yield", class: "WALE 4.2y" },
];

type SampleItem = { icon: string; title: string; loc: string; price: string; [k: string]: string };

export default function BuyCommercialPage() {
  return <CategoryPage
    label="Buy · Commercial"
    titleMain="Commercial property,"
    titleEm="built for investors"
    sub="Offices, retail, hospitality, and mixed-use buildings for sale across 185 countries — with GLA, yield, zoning, and tenant data on every listing."
    features={FEATURES}
    sampleTitle="Commercial properties on the platform"
    sample={SAMPLE}
    parentHref="/buy"
    parentLabel="Browse All Commercial →"
    listingPill={(s) => <><span>📐 {s.class}</span><span>📈 {s.yield}</span></>}
  />;
}

function CategoryPage({
  label, titleMain, titleEm, sub, features, sampleTitle, sample, parentHref, parentLabel, listingPill,
}: {
  label: string;
  titleMain: string;
  titleEm: string;
  sub: string;
  features: { icon: string; title: string; text: string }[];
  sampleTitle: string;
  sample: SampleItem[];
  parentHref: string;
  parentLabel: string;
  listingPill: (s: SampleItem) => React.ReactNode;
}) {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            {label}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            {titleMain}{" "}
            <span className="italic font-normal text-gold">{titleEm}</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">{sub}</p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href={parentHref} className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">
              {parentLabel}
            </Link>
            <Link href="/valuate" className="px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors">
              Valuate a Property
            </Link>
          </div>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream">{sampleTitle}</h2>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sample.map((s) => (
            <div key={s.title} className="bg-navy-light border border-gold/15 rounded-2xl overflow-hidden hover:border-gold/40 transition-colors">
              <div className="bg-gold/10 h-40 flex items-center justify-center text-6xl">{s.icon}</div>
              <div className="p-5">
                <div className="font-semibold text-cream truncate">{s.title}</div>
                <div className="text-xs text-cream/55 truncate">{s.loc}</div>
                <div className="font-display text-gold font-bold text-xl mt-2">{s.price}</div>
                <div className="flex gap-3 text-xs text-cream/60 mt-2">{listingPill(s)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href={parentHref} className="inline-block px-8 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">
            {parentLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
