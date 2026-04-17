import Link from "next/link";

export const metadata = {
  title: "Auction FAQ — Propworths",
  description: "Frequently asked questions about bidding, fees, inspections, deposits, commission, and winning on Propworths auctions.",
};

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "What types of auctions are available?",
    a: (
      <>
        <p><strong className="text-cream">Absolute (No Reserve)</strong> — The property sells to the highest bidder regardless of price. Creates urgency and often attracts more bidders.</p>
        <p><strong className="text-cream">Reserve</strong> — The seller sets a confidential minimum. If bidding does not reach the reserve, the property may not sell. &ldquo;Reserve met&rdquo; status may be shown during the auction.</p>
        <p><strong className="text-cream">Sealed Bid</strong> — All bids are submitted privately before a deadline. The highest bid wins. Bidders do not see other bids.</p>
        <p><strong className="text-cream">Online Timed</strong> — Bidding opens and closes at scheduled times. If a bid is placed in the final 5 minutes, the auction automatically extends by 5 minutes to prevent sniping (soft close).</p>
      </>
    ),
  },
  {
    q: "What documents do I need to register as a bidder?",
    a: (
      <>
        <p><strong className="text-cream">Individual buyers:</strong></p>
        <ul className="list-disc ml-6 space-y-1">
          <li>Valid government-issued ID (passport or national ID)</li>
          <li>Proof of address (utility bill or bank statement within 3 months)</li>
          <li>Proof of funds or pre-approval letter from your bank</li>
          <li>Signed auction terms &amp; conditions agreement</li>
        </ul>
        <p><strong className="text-cream">Corporate buyers additionally need:</strong></p>
        <ul className="list-disc ml-6 space-y-1">
          <li>Company registration documents (certificate of incorporation)</li>
          <li>Board resolution authorising the bidder</li>
          <li>Director ID and proof of authority</li>
        </ul>
      </>
    ),
  },
  {
    q: "What is the USD 10,000 Bidder Security Deposit and how does it work?",
    a: (
      <>
        <p><strong className="text-cream">Before you can bid, you must complete a mandatory security deposit process.</strong> This ensures only serious, financially capable bidders participate and protects sellers from non-genuine bids.</p>
        <p><strong className="text-cream">Step 1 — Pay the deposit:</strong> Transfer USD 10,000 into your own attorney&apos;s trust account (or equivalent regulated client trust / escrow account in your jurisdiction). Propworths does not hold these funds — they remain with your attorney.</p>
        <p><strong className="text-cream">Step 2 — Obtain proof:</strong> Ask your attorney to issue a Proof of Funds / Trust Account Confirmation letter on their letterhead, confirming that USD 10,000 is held in trust for the specified Propworths listing.</p>
        <p><strong className="text-cream">Step 3 — Upload the document</strong> directly on the auction listing page. It must include the Auction Listing Reference Number. A copy is automatically forwarded to Propworths for verification. Bank statements alone are not accepted.</p>
        <p><strong className="text-cream">Step 4 — Verification</strong> typically takes 24 hours during business hours. Complete this well before the auction opens.</p>
        <p><strong className="text-cream">If you WIN:</strong> USD 10,000 is deducted from your final purchase price at closing.</p>
        <p><strong className="text-cream">If you DO NOT WIN:</strong> fully refunded directly by your own attorney — no action needed from Propworths. A Release Confirmation is issued within 3 business days of close.</p>
        <p><strong className="text-cream">If you DEFAULT after winning:</strong> deposit may be withheld pending resolution. The separate 5% Platform Commission on the accepted bid also remains payable within 48 hours.</p>
      </>
    ),
  },
  {
    q: "How does the commission structure work for sellers?",
    a: (
      <>
        <p><strong className="text-cream">Commission is only charged on a successfully completed sale — never on unsold or withdrawn listings.</strong></p>
        <p><strong className="text-cream">Agent / Auctioneer listed:</strong> Total 10% of final sale price (5% Propworths + 5% agent). Deducted from sale proceeds at closing.</p>
        <p><strong className="text-cream">Private / Owner listed:</strong> Total 5% of final sale price (5% Propworths only). Seller keeps 95% before transfer costs.</p>
        <p><strong className="text-cream">Example — Agent listed, sold at USD 500,000:</strong> Propworths R 25,000 + Agent 25,000 = seller receives USD 450,000 net (before transfer costs).</p>
        <p><strong className="text-cream">Example — Private listing, sold at USD 500,000:</strong> Propworths 25,000 = seller receives USD 475,000 net. Full terms in the <Link href="/auction-seller-agreement" className="text-gold underline">Seller Agreement</Link>.</p>
      </>
    ),
  },
  {
    q: "What fees and costs apply when buying at auction?",
    a: (
      <>
        <p><strong className="text-cream">Bidder Security Deposit (refundable):</strong> USD 10,000 into your attorney&apos;s trust account with proof uploaded. Credited to your purchase price if you win; refunded by your attorney if you don&apos;t.</p>
        <p><strong className="text-cream">Commission — paid by seller, not buyer:</strong> The 10% (agent-listed) or 5% (private) is seller-side, deducted from seller&apos;s proceeds. Not an additional charge on top of your bid.</p>
        <p><strong className="text-cream">Sale deposit on winning:</strong> Typically 10% of hammer price within 24 hours. Your USD 10,000 pre-bid deposit is credited.</p>
        <p><strong className="text-cream">Transfer costs:</strong> Legal/conveyancing fees, stamp duty, registration fees as required by local law. Check listing&apos;s special conditions.</p>
        <p>Propworths does not charge buyers a listing or platform access fee.</p>
      </>
    ),
  },
  {
    q: "Can I inspect the property before bidding?",
    a: (
      <>
        <p><strong className="text-cream">Yes — and we strongly recommend it.</strong> Most auctions schedule open inspection days listed on the auction detail page. Private viewings can be arranged with the auctioneer.</p>
        <p>Before bidding, you should:</p>
        <ul className="list-disc ml-6 space-y-1">
          <li>Physically visit and verify condition</li>
          <li>Review the full legal pack (title deed, survey, zoning, compliance)</li>
          <li>Get independent legal advice — auction purchases are typically binding</li>
          <li>Arrange a building inspection if warranted</li>
        </ul>
        <p><strong className="text-cream">Remember:</strong> Properties are often sold &ldquo;voetstoots&rdquo; (as-is). You cannot claim for defects discovered after sale unless fraud applies.</p>
      </>
    ),
  },
  {
    q: "What happens if I win the auction?",
    a: (
      <>
        <p><strong className="text-cream">Immediately after auction closes:</strong> in-app and email notification confirming winning bid. Seller/auctioneer confirms acceptance (reserve auctions may take up to 24 hours).</p>
        <p><strong className="text-cream">Within 24 hours:</strong> sign agreement of sale, pay 10% sale deposit (your USD 10,000 pre-bid deposit is credited), commission deducted from seller at closing (not an extra buyer charge).</p>
        <p><strong className="text-cream">Within 28–42 days:</strong> conveyancing handled, FICA/AML checks, bond processing (if applicable), balance paid, title transferred, keys handed over.</p>
      </>
    ),
  },
  {
    q: "What if I can't complete the purchase after winning?",
    a: (
      <>
        <p><strong className="text-cream">This is serious.</strong> An accepted bid is legally binding. If you fail to complete:</p>
        <ul className="list-disc ml-6 space-y-1">
          <li>You lose your sale deposit (forfeiture under the sale agreement)</li>
          <li>The seller may claim damages and re-auction costs</li>
          <li>Propworths charges a 5% Platform Commission on the accepted bid amount, payable within 48 hours of default notice — separate from the sale deposit</li>
          <li>Your USD 10,000 security deposit may be withheld pending resolution</li>
          <li>Your account will be suspended or banned from future auctions</li>
        </ul>
        <p>See <Link href="/auction-bidding-terms" className="text-gold underline">Auction Bidding Terms — Section 5</Link> for the full default policy.</p>
      </>
    ),
  },
  {
    q: "Is online bidding safe and secure?",
    a: (
      <>
        <p><strong className="text-cream">Yes.</strong> Propworths uses:</p>
        <ul className="list-disc ml-6 space-y-1">
          <li>Encrypted connections (SSL/TLS) for all bidding activity</li>
          <li>Identity verification (KYC) before bidding is enabled</li>
          <li>Anti-manipulation monitoring (shill detection, multi-account analysis)</li>
          <li>Auto-extend (&ldquo;soft close&rdquo;) to prevent last-second sniping</li>
          <li>Full audit trail — every bid logged with timestamp, IP, and device</li>
        </ul>
        <p>See <Link href="/anti-fraud-bid-integrity" className="text-gold underline">Anti-Fraud &amp; Bid Integrity</Link> for our full policy.</p>
      </>
    ),
  },
];

const NAV = [
  { href: "/auctions", label: "← All Auctions" },
  { href: "/auction-how-to-bid", label: "How to Bid" },
  { href: "/auction-process-timeline", label: "Process Timeline" },
  { href: "/auction-registration-form", label: "Register to Bid" },
];

export default function AuctionFAQPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-12 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Auctions · FAQ
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            Auction{" "}
            <span className="italic font-normal text-gold">questions answered</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
            Frequently asked questions about bidding, fees, inspections, and winning on Propworths.
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

      <main className="max-w-4xl mx-auto px-4 pb-24 space-y-3">
        {FAQS.map((f, idx) => (
          <details key={idx} className="group bg-navy-light border border-gold/15 rounded-xl overflow-hidden" open={idx === 0}>
            <summary className="cursor-pointer px-5 py-4 font-semibold text-cream flex justify-between items-center hover:bg-gold/5 transition-colors">
              <span>{f.q}</span>
              <span className="text-gold transition-transform group-open:rotate-90">▸</span>
            </summary>
            <div className="px-5 py-4 border-t border-gold/10 text-sm text-cream/75 leading-relaxed space-y-3">
              {f.a}
            </div>
          </details>
        ))}
      </main>
    </div>
  );
}
