import Link from "next/link";

export const metadata = {
  title: "Propworths — How to Bid",
};

export default function AuctionHowToBidPage() {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-navy text-cream">
      <header className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0e1520 0%,#141c2b 55%,#1a2535 100%)" }}>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,21,32,0.92)_0%,rgba(196,164,124,0.55)_55%,rgba(196,164,124,0.35)_100%)] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">How to Bid on Propworths</h1>
          <p className="text-cream/75 text-sm sm:text-base max-w-2xl">Your step-by-step guide — from registration to winning your auction</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/auctions" className="text-xs sm:text-sm font-semibold text-white rounded-lg border border-white/15 bg-white/5 px-3 py-2 transition hover:bg-white/10">← All Auctions</Link>
            <Link href="/auctions/how-to-bid" className="text-xs sm:text-sm font-semibold text-cream rounded-lg border border-gold/20 bg-gold/10 px-3 py-2">How to Bid</Link>
            <Link href="/auctions/faq" className="text-xs sm:text-sm font-semibold text-white rounded-lg border border-white/15 bg-white/5 px-3 py-2 transition hover:bg-white/10">FAQ</Link>
            <Link href="/auctions/process-timeline" className="text-xs sm:text-sm font-semibold text-white rounded-lg border border-white/15 bg-white/5 px-3 py-2 transition hover:bg-white/10">Process Timeline</Link>
            <Link href="/auctions" className="text-xs sm:text-sm font-semibold text-white rounded-lg border border-white/15 bg-white/5 px-3 py-2 transition hover:bg-white/10">Auction Types</Link>
            <Link href="/auctions/register" className="text-xs sm:text-sm font-semibold text-white rounded-lg border border-white/15 bg-white/5 px-3 py-2 transition hover:bg-white/10">Register to Bid</Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-6">
        <section className="rounded-[28px] border border-gold/20 bg-[#1f2d3d] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
          <h2 className="font-display text-2xl text-gold font-bold mb-6">Quick Start — 4 Steps to Your First Bid</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-[#141c2b] border border-gold/10 p-6">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="text-base font-semibold text-gold mb-2">Step 1 — Register</h3>
              <p className="text-sm leading-7 text-muted">Create a free Propworths account. Complete the bidder registration form with your ID, proof of address, and proof of funds or bank pre-approval letter.</p>
            </div>
            <div className="rounded-2xl bg-[#141c2b] border border-gold/10 p-6">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-base font-semibold text-gold mb-2">Step 2 — Browse &amp; Research</h3>
              <p className="text-sm leading-7 text-muted">Find auctions that interest you. Download the auction legal pack, review inspection reports, title deeds, zoning, and any special conditions. Get professional advice before you bid.</p>
            </div>
            <div className="rounded-2xl bg-[#141c2b] border border-gold/10 p-6">
              <div className="text-3xl mb-4">🔨</div>
              <h3 className="text-base font-semibold text-gold mb-2">Step 3 — Place Your Bid</h3>
              <p className="text-sm leading-7 text-muted">When the auction opens, bid live online. You can set a maximum auto-bid or bid manually in real-time. Watch the countdown — auctions may auto-extend if bids arrive in the final minutes.</p>
            </div>
            <div className="rounded-2xl bg-[#141c2b] border border-gold/10 p-6">
              <div className="text-3xl mb-4">🎉</div>
              <h3 className="text-base font-semibold text-gold mb-2">Step 4 — Win &amp; Complete</h3>
              <p className="text-sm leading-7 text-muted">If you're the highest bidder and the seller accepts, you sign the sale agreement (usually within 24 hours), pay the deposit (typically 10%), and complete within the stipulated period (usually 28–42 days).</p>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-gold/20 bg-[#1f2d3d] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
          <h2 className="font-display text-2xl text-gold font-bold mb-6">Before You Bid — Checklist</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-[#141c2b] border border-gold/10 p-6">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="text-base font-semibold text-gold mb-2">ID &amp; Documents Ready</h3>
              <p className="text-sm leading-7 text-muted">Government ID (passport or national ID), proof of address (utility bill / bank statement within 3 months), and proof of funds or pre-approval letter.</p>
            </div>
            <div className="rounded-2xl bg-[#141c2b] border border-gold/10 p-6">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="text-base font-semibold text-gold mb-2">Legal Pack Reviewed</h3>
              <p className="text-sm leading-7 text-muted">Title deed, survey report, zoning certificate, compliance documents, and any special conditions from the auctioneer.</p>
            </div>
            <div className="rounded-2xl bg-[#141c2b] border border-gold/10 p-6">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="text-base font-semibold text-gold mb-2">Property Inspected</h3>
              <p className="text-sm leading-7 text-muted">Attended the open day or arranged a private inspection. Auction purchases are typically "as-is" and binding — don't skip this step.</p>
            </div>
            <div className="rounded-2xl bg-[#141c2b] border border-gold/10 p-6">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="text-base font-semibold text-gold mb-2">Budget &amp; Costs Calculated</h3>
              <p className="text-sm leading-7 text-muted">Hammer price + buyer's premium (5–10%) + transfer costs + stamp duty + legal fees. Know your total before you bid.</p>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-gold/20 bg-[#1f2d3d] p-6 text-sm text-muted">
          <p className="leading-7">
            <strong className="text-cream">Important:</strong> Bids placed on Propworths are intended to be legally binding. Do not bid unless you are ready, willing, and financially able to proceed. See{' '}
            <Link href="/auctions/bidding-terms" className="text-gold font-semibold underline">Auction Bidding Terms</Link>{' '}
            for full details.
          </p>
        </section>
      </main>

      <footer className="border-t border-gold/10 py-8 text-center text-sm text-muted">
        © {year} Propworths. All rights reserved. |{' '}
        <Link href="/auctions" className="text-gold underline">Back to Auctions</Link>{' '}
        |{' '}
        <Link href="/terms-of-use" className="text-gold underline">Terms</Link>
      </footer>
    </div>
  );
}
