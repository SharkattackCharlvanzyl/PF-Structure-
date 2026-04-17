import Link from "next/link";

export const metadata = {
  title: "Auction Process Timeline — Propworths",
  description: "From listing to completion — the full Propworths auction process day-by-day, from announcement to transfer.",
};

const OVERVIEW = [
  { ico: "📣", day: "Days 1–3", desc: "Auction announced & marketed" },
  { ico: "📋", day: "Days 3–7", desc: "Bidder registration opens" },
  { ico: "🏠", day: "Days 4–8", desc: "Inspections & legal review" },
  { ico: "🔨", day: "Day 10", desc: "Live bidding" },
  { ico: "✍️", day: "Day 10+", desc: "Sale agreement signed" },
  { ico: "🏡", day: "Day 14–42", desc: "Transfer & completion" },
];

const TIMELINE = [
  { day: "Day 1–3", title: "Auction Announced", desc: "Property listed on Propworths with full legal pack, professional photos, inspection dates, reserve status, and special conditions. Marketing begins across the platform, email alerts, and partner channels." },
  { day: "Day 3–7", title: "Bidder Registration Opens", desc: "Interested buyers submit their registration: government ID, proof of address, proof of funds or bank pre-approval, and registration deposit (if required). Approved bidders receive auction access credentials via email." },
  { day: "Day 4–8", title: "Inspections & Legal Review", desc: "Scheduled open days for property viewing. Buyers review the legal pack: title deeds, survey reports, zoning certificates, compliance documents, and any encumbrances. Professional inspections and legal advice are strongly recommended." },
  { day: "Day 7–9", title: "Pre-Auction Enquiries", desc: "Q&A period. Registered bidders submit questions via the platform. The auctioneer publishes answers visible to all registered bidders for transparency. Any addenda or changes to conditions are communicated here." },
  { day: "Day 10", title: "🔴 Auction Day — Live Online Bidding", desc: "Online bidding opens at the scheduled time. Place bids in real-time from any device. Minimum bid increments may apply. If a bid is placed in the final 2 minutes, the auction auto-extends to prevent sniping. The highest bidder when the clock stops wins (subject to reserve and seller acceptance)." },
  { day: "Day 10 (post-auction)", title: "Sale Agreement Signed", desc: "The winning bidder signs the agreement of sale / memorandum of sale within 24 hours. A deposit of typically 10% of the hammer price is payable immediately into the designated trust account. The buyer's premium (5–10%) is invoiced separately." },
  { day: "Day 11–14", title: "Legal & Transfer Process Begins", desc: "Conveyancing or closing attorneys are appointed. Due diligence is formalised, FICA/AML compliance checks are completed, and bond/mortgage applications are submitted (if applicable). The seller provides transfer documents." },
  { day: "Day 14–42", title: "Completion & Transfer", desc: "Balance of the purchase price is paid. Title is transferred at the deeds office (or local equivalent). Keys are handed over. Congratulations — you are the new owner! The exact timeline varies by country and complexity." },
];

const NAV = [
  { href: "/auctions", label: "← All Auctions" },
  { href: "/auction-how-to-bid", label: "How to Bid" },
  { href: "/auction-faq", label: "FAQ" },
  { href: "/auction-registration-form", label: "Register to Bid" },
];

export default function AuctionProcessTimelinePage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Auctions · Process
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            The complete{" "}
            <span className="italic font-normal text-gold">auction process</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
            From listing to completion — here's what happens at every stage on Propworths.
          </p>
          <div className="mt-8 flex flex-wrap gap-2 justify-center">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="text-xs px-3 py-1.5 rounded border border-gold/25 bg-gold/5 text-cream/80 hover:border-gold/50 hover:text-cream transition-colors">
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-cream mb-6">Overview at a glance</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {OVERVIEW.map((o) => (
              <div key={o.day} className="bg-navy-light border border-gold/15 rounded-xl p-5 hover:border-gold/40 transition-colors">
                <div className="text-2xl mb-2">{o.ico}</div>
                <div className="text-xs font-bold text-gold tracking-wide mb-1">{o.day}</div>
                <div className="text-sm text-cream/70">{o.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-cream mb-8">Detailed timeline — Day 1 to completion</h2>
          <div className="relative pl-8 border-l-2 border-gold/30">
            {TIMELINE.map((t, idx) => (
              <div key={idx} className="relative mb-10 last:mb-0">
                <div className="absolute -left-[42px] top-1 w-4 h-4 rounded-full bg-gold border-2 border-navy-light shadow-[0_0_0_2px_rgba(196,164,124,0.3)]" />
                <div className="text-[11px] font-bold text-gold uppercase tracking-wider mb-1">{t.day}</div>
                <h3 className="font-semibold text-cream text-lg mb-2">{t.title}</h3>
                <p className="text-sm text-cream/70 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="p-5 rounded-xl border border-dashed border-gold/25 bg-gold/5 text-sm text-cream/80">
            <strong className="text-gold">Note:</strong> Timelines are indicative and vary by country, property type, and complexity. Some jurisdictions may have mandatory cooling-off periods or additional regulatory steps. Always consult with the auctioneer and your legal advisor for the specific process in your country.
          </div>
        </div>
      </section>
    </div>
  );
}
