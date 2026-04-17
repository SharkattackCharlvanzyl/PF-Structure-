import Link from "next/link";

export const metadata = {
  title: "Hospitality Businesses for Sale — Propworths",
  description: "Guesthouses, boutique hotels, lodges, and hospitality businesses for sale. Occupancy, ADR, RevPAR, and booking channels disclosed up front.",
};

const FEATURES = [
  { icon: "🏨", title: "Boutique Hotels", text: "3 to 5-star boutique hotels with room counts, ADR, occupancy, RevPAR history, and booking-channel mix." },
  { icon: "🌳", title: "Game Lodges", text: "Safari lodges with concession agreements, game census, traversing rights, and staff housing included." },
  { icon: "🏡", title: "Guesthouses & B&Bs", text: "Owner-run and management-agreement guesthouses with room yield, TripAdvisor rank, and seasonal breakdown." },
  { icon: "🏕️", title: "Eco-Lodges & Resorts", text: "Tented camps, eco-lodges, and beach resorts with activity revenue, F&B margin, and transfer fleet." },
  { icon: "🥂", title: "Conference Venues", text: "Wedding and conference venues with event calendar, catering kitchen, and seasonal bookings disclosed." },
  { icon: "📊", title: "Operating Data", text: "Full PMS export, channel mix, review scores, ADR trend, staff roster, and owner add-backs on every listing." },
];

const SAMPLE = [
  { icon: "🏨", title: "Boutique Hotel, 24 Rooms", loc: "Franschhoek", price: "R 38,000,000", occupancy: "Occ 71%", extra: "ADR R 2,800" },
  { icon: "🌳", title: "Safari Lodge, 12 Suites", loc: "Madikwe", price: "R 62,000,000", occupancy: "Occ 64%", extra: "Big 5 traversing" },
  { icon: "🏡", title: "Guesthouse, 8 Rooms", loc: "Stellenbosch", price: "R 14,500,000", occupancy: "Occ 68%", extra: "4.8★ TA" },
  { icon: "🏕️", title: "Eco-Lodge, 10 Tents", loc: "Tsitsikamma", price: "R 18,000,000", occupancy: "Occ 58%", extra: "25ha + sea" },
  { icon: "🥂", title: "Wedding Venue", loc: "Elgin Valley", price: "R 22,000,000", occupancy: "54 events/yr", extra: "200pax hall" },
  { icon: "🏖️", title: "Beach Resort, 18 Villas", loc: "Ballito", price: "R 46,000,000", occupancy: "Occ 66%", extra: "Beachfront" },
];

export default function BusinessHospitalityPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Business · Hospitality
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            Hotels, lodges &amp;{" "}
            <span className="italic font-normal text-gold">hospitality</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
            Boutique hotels, safari lodges, guesthouses, and eco-resorts — with occupancy, ADR,
            RevPAR, channel mix, and full operating data disclosed up front.
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream">Hospitality businesses on the platform</h2>
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
                  <span>📊 {s.occupancy}</span>
                  <span>💼 {s.extra}</span>
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
