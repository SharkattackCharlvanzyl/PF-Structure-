import Link from "next/link";

export const metadata = {
  title: "Healthcare Businesses for Sale — Propworths",
  description: "Pharmacies, medical practices, clinics, and healthcare businesses for sale. Patient books, scripts, licences, and HPCSA compliance disclosed up front.",
};

const FEATURES = [
  { icon: "💊", title: "Pharmacies", text: "Independent and franchised pharmacies with monthly scripts, front-shop turnover, medical-aid mix, and SAPC licence." },
  { icon: "🩺", title: "Medical Practices", text: "GP, specialist, and group practices with active patient count, billing rates, HPCSA status, and BHF/ICD-10 coding maturity." },
  { icon: "🦷", title: "Dental Practices", text: "General and specialist dental practices with chair count, patient base, lab arrangements, and equipment register." },
  { icon: "👓", title: "Optometry", text: "Optometry practices with frame-brand agreements, contact-lens subscription revenue, and testing-equipment schedules." },
  { icon: "🏥", title: "Clinics & Day Hospitals", text: "Day hospitals, fertility clinics, rehabilitation centres, and aesthetic clinics with licensing and staff disclosure." },
  { icon: "📋", title: "Compliance", text: "HPCSA, SAPC, and DoH licensing, medical-aid contracts, POPIA compliance, and BEE rating all up front." },
];

const SAMPLE = [
  { icon: "💊", title: "Independent Pharmacy", loc: "Edenvale", price: "R 6,200,000", turnover: "T/O R 22M", extra: "4,800 scripts/mo" },
  { icon: "🩺", title: "GP Practice (Solo)", loc: "Parkmore", price: "R 2,400,000", turnover: "T/O R 4.8M", extra: "1,200 active pts" },
  { icon: "🦷", title: "Dental Practice, 2 Chairs", loc: "Durbanville", price: "R 4,800,000", turnover: "T/O R 6.4M", extra: "Assoc dentist incl" },
  { icon: "👓", title: "Optometry Practice", loc: "Hazeldean", price: "R 3,200,000", turnover: "T/O R 5.2M", extra: "Medical-aid panel" },
  { icon: "🏥", title: "Aesthetic Clinic", loc: "Sandton", price: "R 8,500,000", turnover: "T/O R 12M", extra: "Laser + injectables" },
  { icon: "🧠", title: "Physio & Rehab Centre", loc: "Bryanston", price: "R 2,800,000", turnover: "T/O R 4.4M", extra: "3 practitioners" },
];

export default function BusinessHealthcarePage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Business · Healthcare
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            Pharmacies, practices &amp;{" "}
            <span className="italic font-normal text-gold">healthcare</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
            Pharmacies, medical and dental practices, optometrists, and clinics — with patient
            books, scripts, licensing, and HPCSA/SAPC compliance disclosed up front.
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream">Healthcare businesses on the platform</h2>
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
                  <span>🩺 {s.extra}</span>
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
