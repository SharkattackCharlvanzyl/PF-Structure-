import Link from "next/link";

export const metadata = {
  title: "Buyer Obligations & Purchase Process — Propworths",
  description: "Typical buyer responsibilities when purchasing property or business listings on Propworths — due diligence, KYC, deposits, and post-auction steps.",
};

export default function BuyerObligationsPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-12 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Legal · Buyers
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight">
            Buyer obligations &amp;{" "}
            <span className="italic font-normal text-gold">purchase process</span>
          </h1>
          <p className="mt-4 text-sm text-cream/60">Version 1.0 — general policy guide</p>
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <Link href="/terms-of-use" className="text-xs px-3 py-1.5 rounded border border-gold/25 bg-gold/5 text-cream/80 hover:border-gold/50">← Terms of Use</Link>
            <Link href="/auction-bidding-terms" className="text-xs px-3 py-1.5 rounded border border-gold/25 bg-gold/5 text-cream/80 hover:border-gold/50">Auction Terms</Link>
            <Link href="/commission-fees" className="text-xs px-3 py-1.5 rounded border border-gold/25 bg-gold/5 text-cream/80 hover:border-gold/50">Commission &amp; Fees</Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-24 space-y-10 text-cream/80 text-sm leading-relaxed">
        <Section n="1" title="Overview">
          <p>This page explains typical buyer responsibilities when purchasing a property or business listing through the Propworths Platform, including purchases that start via online auctions. It is provided for transparency and does not replace the formal sale agreement, auction conditions, or local legal requirements.</p>
          <div className="p-3 rounded-lg border-l-4 border-gold bg-gold/5">
            <strong className="text-gold">You remain responsible for due diligence.</strong> Propworths is a technology platform and is not the seller, conveyancer, or your legal/financial advisor unless explicitly stated in writing.
          </div>
        </Section>

        <Section n="2" title="Buyer Due Diligence (Your Responsibility)">
          <p>You agree that before committing to a purchase (including bidding), you will conduct all due diligence reasonably required for the asset and jurisdiction, including:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Physical inspection of the property/business and verification of condition, boundaries, and improvements.</li>
            <li>Verification of ownership/authority to sell, mandates, and seller capacity through the relevant professionals.</li>
            <li>Title/encumbrance checks (bonds, liens, restrictions, servitudes, zoning, permits, compliance certificates).</li>
            <li>Financial and operational verification for businesses-for-sale (accounts, leases, staff, suppliers, licences).</li>
            <li>Independent legal, tax, and financing advice.</li>
          </ul>
          <div className="p-3 rounded-lg border border-dashed border-gold/25 bg-gold/5 text-xs">
            Any distances, maps, schools, amenities, investment figures, yields, or estimates shown on the Platform are indicative and must be independently verified.
          </div>
        </Section>

        <Section n="3" title="Identity & Funding Readiness">
          <Sub title="3.1 Verification">
            <p>You may be required to complete identity and payment verification (KYC/AML checks) before bidding, before acceptance, or prior to signing. Failure to complete verification may limit access or result in cancellation of bids/transactions.</p>
          </Sub>
          <Sub title="3.2 Proof of Funds / Pre-Approval">
            <p>For certain listings, you may be required to provide proof of funds, finance pre-approval, deposit confirmations, or other affordability evidence within a stated timeframe.</p>
          </Sub>
        </Section>

        <Section n="4" title="Auction Purchases: What Happens After an Accepted Bid">
          <p>Where a seller accepts your bid online (&ldquo;Accepted Bid&rdquo;), the following process typically applies (subject to the auction page rules and local law):</p>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong className="text-cream">Notification:</strong> in-app/email notice of acceptance and next steps.</li>
            <li><strong className="text-cream">Documentation:</strong> sign an offer-to-purchase / memorandum of sale / sale agreement within the stated deadline.</li>
            <li><strong className="text-cream">Deposit:</strong> pay any required deposit into the designated account/payment method shown in the transaction flow.</li>
            <li><strong className="text-cream">Conveyancing / Closing:</strong> a conveyancer/closing attorney manages transfer, compliance, and settlement.</li>
            <li><strong className="text-cream">Handover:</strong> possession/occupation occurs per the sale agreement.</li>
          </ul>
          <div className="p-3 rounded-lg border border-dashed border-gold/25 bg-gold/5 text-xs">
            Specific deadlines and documents are set by the seller/agent and the jurisdiction. Always read the auction page&apos;s special conditions.
          </div>
        </Section>

        <Section n="5" title="Buyer Default & Non-Completion">
          <p>If you fail to proceed after an Accepted Bid (or breach the post-acceptance steps), consequences may include:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Loss of deposit (where forfeiture applies by law/contract).</li>
            <li>Seller claims for damages and re-auction/relisting costs.</li>
            <li><strong className="text-cream">Propworths&apos;s 5% Platform Commission</strong> payable within <strong className="text-cream">48 hours</strong> as set out in the <Link href="/auction-bidding-terms" className="text-gold underline">Auction Terms</Link>.</li>
            <li>Account suspension/ban for integrity protection.</li>
          </ul>
        </Section>

        <Section n="6" title="Communications & Off-Platform Dealing">
          <p>You agree not to use the Platform to identify a seller/agent and then circumvent the Platform process to avoid fees/commission. Propworths may enforce its commission/fees and apply integrity remedies where circumvention is detected, to the maximum extent permitted by law.</p>
        </Section>

        <Section n="7" title="Buyer Support">
          <p><strong className="text-cream">Support:</strong> support@propworths.com · <strong className="text-cream">Legal:</strong> legal@propworths.com</p>
          <div className="p-3 rounded-lg border border-dashed border-gold/25 bg-gold/5 text-xs">
            This page is a general policy guide. It is adapted per country for mandatory consumer disclosures.
          </div>
        </Section>
      </main>
    </div>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl md:text-2xl font-bold text-cream mb-3">{n}) {title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <h3 className="font-semibold text-gold text-base mb-2">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
