import Link from "next/link";

export const metadata = {
  title: "How to Bid — Propworths Auctions",
  description: "Step-by-step guide from registration to winning your auction on Propworths — register, research, bid, and complete.",
};

const STEPS = [
  { ico: "📋", title: "Step 1 — Register", desc: "Create a free Propworths account. Complete the bidder registration form with your ID, proof of address, and proof of funds or bank pre-approval letter." },
  { ico: "🔍", title: "Step 2 — Browse & Research", desc: "Find auctions that interest you. Download the auction legal pack, review inspection reports, title deeds, zoning, and any special conditions. Get professional advice before you bid." },
  { ico: "🔨", title: "Step 3 — Place Your Bid", desc: "When the auction opens, bid live online. You can set a maximum auto-bid or bid manually in real-time. Watch the countdown — auctions may auto-extend if bids arrive in the final minutes." },
  { ico: "🎉", title: "Step 4 — Win & Complete", desc: "If you're the highest bidder and the seller accepts, you sign the sale agreement (usually within 24 hours), pay the deposit (typically 10%), and complete within the stipulated period (usually 28–42 days)." },
];

const CHECKLIST = [
  { ico: "✅", title: "ID & Documents Ready", desc: "Government ID (passport or national ID), proof of address (utility bill / bank statement within 3 months), and proof of funds or pre-approval letter." },
  { ico: "✅", title: "Legal Pack Reviewed", desc: "Title deed, survey report, zoning certificate, compliance documents, and any special conditions from the auctioneer." },
  { ico: "✅", title: "Property Inspected", desc: "Attended the open day or arranged a private inspection. Auction purchases are typically \"as-is\" and binding — don't skip this step." },
  { ico: "✅", title: "Budget & Costs Calculated", desc: "Hammer price + buyer's premium (5–10%) + transfer costs + stamp duty + legal fees. Know your total before you bid." },
];

const NAV = [
  { href: "/auctions", label: "← All Auctions" },
  { href: "/auction-how-to-bid", label: "How to Bid" },
  { href: "/auction-faq", label: "FAQ" },
  { href: "/auction-process-timeline", label: "Process Timeline" },
  { href: "/auction-registration-form", label: "Register to Bid" },
];

export default function AuctionHowToBidPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Auctions · Guide
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            How to bid on{" "}
            <span className="italic font-normal text-gold">Propworths</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
            Your step-by-step guide — from registration to winning your auction.
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
          <h2 className="font-display text-2xl md:text-3xl font-bold text-cream mb-6">Quick start — 4 steps to your first bid</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {STEPS.map((s) => (
              <div key={s.title} className="bg-navy-light border border-gold/15 rounded-2xl p-6 hover:border-gold/40 transition-colors">
                <div className="text-3xl mb-3">{s.ico}</div>
                <h3 className="font-semibold text-gold mb-2">{s.title}</h3>
                <p className="text-sm text-cream/70 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-cream mb-6">Before you bid — checklist</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CHECKLIST.map((c) => (
              <div key={c.title} className="bg-navy-light border border-gold/15 rounded-2xl p-6">
                <div className="text-2xl mb-2">{c.ico}</div>
                <h3 className="font-semibold text-gold mb-2">{c.title}</h3>
                <p className="text-sm text-cream/70 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="p-5 rounded-xl border border-dashed border-gold/25 bg-gold/5 text-sm text-cream/80">
            <strong className="text-gold">Important:</strong> Bids placed on Propworths are intended to be legally binding. Do not bid unless you are ready, willing, and financially able to proceed. See the{" "}
            <Link href="/auction-bidding-terms" className="text-gold underline">Auction Bidding Terms</Link> for full details.
          </div>
          <div className="text-center mt-10">
            <Link href="/auction-registration-form" className="inline-block px-8 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">
              Register to Bid →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
