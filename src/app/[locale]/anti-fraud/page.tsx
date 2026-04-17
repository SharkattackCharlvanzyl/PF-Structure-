import Link from "next/link";

export const metadata = {
  title: "Anti-Fraud & Bid Integrity Policy — Propworths",
  description: "Propworths's zero-tolerance policy on shill bidding, spoofing, multi-accounting, collusion, off-platform circumvention, and identity fraud.",
};

export default function AntiFraudPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-12 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Legal · Integrity
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight">
            Anti-Fraud &amp;{" "}
            <span className="italic font-normal text-gold">Bid Integrity</span>
          </h1>
          <p className="mt-4 text-sm text-cream/60">Version 1.0 — applies platform-wide</p>
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <Link href="/auction-bidding-terms" className="text-xs px-3 py-1.5 rounded border border-gold/25 bg-gold/5 text-cream/80 hover:border-gold/50">Auction Terms</Link>
            <Link href="/terms-of-use" className="text-xs px-3 py-1.5 rounded border border-gold/25 bg-gold/5 text-cream/80 hover:border-gold/50">Terms of Use</Link>
            <Link href="/privacy-policy" className="text-xs px-3 py-1.5 rounded border border-gold/25 bg-gold/5 text-cream/80 hover:border-gold/50">Privacy</Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-24 space-y-10 text-cream/80 leading-relaxed text-sm">
        <section>
          <h2 className="font-display text-xl md:text-2xl font-bold text-cream mb-3">1) Purpose</h2>
          <p>Propworths operates an international marketplace with online bidding. This Policy sets the standards required to keep auctions fair, protect buyers and sellers, and prevent fraud, manipulation, and platform abuse.</p>
        </section>

        <section>
          <h2 className="font-display text-xl md:text-2xl font-bold text-cream mb-3">2) Prohibited Activities</h2>
          <div className="p-4 rounded-lg border-l-4 border-red-400 bg-red-900/10 mb-4">
            <strong className="text-red-300">Zero tolerance:</strong> any manipulation, shill bidding, spoofing, coordinated bidding, false identities, or fee circumvention may result in immediate suspension and legal action.
          </div>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong className="text-cream">Shill bidding:</strong> bidding to artificially increase price (by seller, agent, associate, or linked accounts).</li>
            <li><strong className="text-cream">Spoof bidding / bid withdrawal manipulation:</strong> inflating bids with no intent to complete.</li>
            <li><strong className="text-cream">Multi-accounting:</strong> operating multiple accounts to influence outcomes.</li>
            <li><strong className="text-cream">Collusion:</strong> coordinating to suppress competition or fix price.</li>
            <li><strong className="text-cream">Off-platform circumvention:</strong> attempting to avoid platform fees/commission by moving the deal off-platform.</li>
            <li><strong className="text-cream">Identity fraud:</strong> fake IDs, stolen cards, or incorrect verification data.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl md:text-2xl font-bold text-cream mb-3">3) Verification &amp; Controls</h2>
          <h3 className="font-semibold text-gold mt-4 mb-2">3.1 Identity / KYC</h3>
          <p>We may require proof of identity, address, and payment ownership before bidding, during bidding, or before seller acceptance.</p>
          <h3 className="font-semibold text-gold mt-4 mb-2">3.2 Technical Controls</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Risk scoring (behavioural and transactional)</li>
            <li>Device and account linkage analysis</li>
            <li>Payment verification and fraud screening</li>
            <li>Manual review for high-risk events</li>
          </ul>
          <div className="mt-4 p-3 rounded-lg border border-dashed border-gold/25 bg-gold/5 text-xs">
            All processing is governed by the <Link href="/privacy-policy" className="text-gold underline">Privacy Policy</Link> and applicable law.
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl md:text-2xl font-bold text-cream mb-3">4) Enforcement Actions</h2>
          <p>If we reasonably suspect a breach, we may (subject to law):</p>
          <ul className="list-disc ml-6 space-y-1 mt-2">
            <li>Cancel bids, freeze auctions, extend closing time, or relist.</li>
            <li>Suspend/terminate accounts and block related accounts/devices/payment methods.</li>
            <li>Require additional verification or deposits (where permitted).</li>
            <li>Recover losses and costs caused by manipulation and enforce the 5% commission where applicable.</li>
            <li>Report suspected fraud to payment providers, verification partners, and authorities.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl md:text-2xl font-bold text-cream mb-3">5) Reporting Abuse</h2>
          <p>To report suspicious behaviour, email <strong className="text-cream">integrity@propworths.com</strong>. Reports are treated confidentially.</p>
        </section>
      </main>
    </div>
  );
}
