import Link from "next/link";

export const metadata = {
  title: "Tech Businesses for Sale — Propworths",
  description: "SaaS, IT services, e-commerce, and tech businesses for sale. MRR, churn, LTV:CAC, stack, and IP ownership disclosed up front.",
};

const FEATURES = [
  { icon: "☁️", title: "SaaS Platforms", text: "Recurring-revenue software with MRR/ARR, churn, LTV:CAC, NRR, and cohort retention disclosed." },
  { icon: "🛒", title: "E-commerce", text: "Shopify, Woo, and custom storefronts with SKU count, AOV, repeat rate, and traffic-source mix." },
  { icon: "🧑‍💻", title: "IT Services & MSP", text: "Managed-service, cyber, and DevOps consultancies with recurring contracts, utilisation, and staff roster." },
  { icon: "📱", title: "Mobile & Apps", text: "Consumer and B2B apps with DAU/MAU, session length, store rating, and monetisation model disclosed." },
  { icon: "🔒", title: "IP & Code", text: "Source-code escrow, patent/trademark ownership, open-source licensing audit, and assignability on every listing." },
  { icon: "📊", title: "Stack & Hosting", text: "Tech stack, hosting cost, uptime SLA, third-party dependencies, and key-person risk disclosed up front." },
];

const SAMPLE = [
  { icon: "☁️", title: "B2B SaaS — Logistics", loc: "Cape Town", price: "R 48,000,000", turnover: "ARR R 18M", extra: "Churn 3.2%" },
  { icon: "🛒", title: "DTC E-commerce Brand", loc: "Johannesburg", price: "R 12,000,000", turnover: "T/O R 28M", extra: "Repeat 42%" },
  { icon: "🧑‍💻", title: "Managed Service Provider", loc: "Pretoria", price: "R 22,000,000", turnover: "ARR R 14M", extra: "38 contracts" },
  { icon: "📱", title: "Mobile App + Userbase", loc: "Remote", price: "R 6,800,000", turnover: "ARR R 3.2M", extra: "48k MAU" },
  { icon: "🤖", title: "AI Tool (SaaS, Bootstrap)", loc: "Stellenbosch", price: "R 18,500,000", turnover: "ARR R 7.8M", extra: "Solo-founder exit" },
  { icon: "🔐", title: "Cyber Security Firm", loc: "Sandton", price: "R 34,000,000", turnover: "T/O R 42M", extra: "ISO 27001" },
];

export default function BusinessTechPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Business · Tech
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            SaaS, e-commerce &amp;{" "}
            <span className="italic font-normal text-gold">tech exits</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
            SaaS platforms, e-commerce brands, IT-services firms, and mobile apps — with MRR,
            churn, LTV:CAC, stack audit, and IP ownership disclosed up front.
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream">Tech businesses on the platform</h2>
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
