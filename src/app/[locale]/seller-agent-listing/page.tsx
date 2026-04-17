import Link from "next/link";

export const metadata = {
  title: "Seller / Agent Listing Agreement — Propworths",
  description: "General Propworths listing agreement for sellers, agents, brokers, and developers — covers listings, auctions, content standards, fees, and IP.",
};

export default function SellerAgentListingPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-12 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Legal · Sellers &amp; Agents
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight">
            Seller / Agent{" "}
            <span className="italic font-normal text-gold">Listing Agreement</span>
          </h1>
          <p className="mt-4 text-sm text-cream/60">Version 1.0 — general listing &amp; auction terms for sellers, agents, developers, and brokers</p>
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <Link href="/terms-of-use" className="text-xs px-3 py-1.5 rounded border border-gold/25 bg-gold/5 text-cream/80 hover:border-gold/50">Terms of Use</Link>
            <Link href="/auction-bidding-terms" className="text-xs px-3 py-1.5 rounded border border-gold/25 bg-gold/5 text-cream/80 hover:border-gold/50">Auction Terms</Link>
            <Link href="/commission-fees" className="text-xs px-3 py-1.5 rounded border border-gold/25 bg-gold/5 text-cream/80 hover:border-gold/50">Commission &amp; Fees</Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-24 space-y-10 text-cream/80 text-sm leading-relaxed">
        <Section n="1" title="Parties & Purpose">
          <p>This Seller / Agent Listing Agreement (&ldquo;Agreement&rdquo;) is between <strong className="text-cream">Propworths Head Office</strong> (&ldquo;Propworths&rdquo;, &ldquo;Platform&rdquo;) and the seller, property owner, developer, or authorised agent/broker (&ldquo;Seller&rdquo;, &ldquo;Agent&rdquo;, &ldquo;you&rdquo;) who uploads or manages listings and/or auctions on the Platform.</p>
          <p>You appoint Propworths to host your listings and (where selected) to provide online auction functionality, subject to this Agreement and the Platform policies.</p>
        </Section>

        <Section n="2" title="Authority, Mandate & Eligibility">
          <Sub title="2.1 Authority to List / Sell">
            <p>You warrant that you are the lawful owner of the asset or have a valid written mandate/authority to list and sell/auction it, and you can provide proof upon request.</p>
          </Sub>
          <Sub title="2.2 Compliance">
            <p>You warrant compliance with all applicable laws, licensing, property/real-estate regulations, advertising standards, and consumer disclosures in the relevant jurisdiction(s).</p>
          </Sub>
        </Section>

        <Section n="3" title="Listing Content Standards">
          <Sub title="3.1 Accuracy & Non-Misleading Content">
            <ul className="list-disc ml-6 space-y-1">
              <li>All pricing, location, sizes, features, zoning, approvals, and descriptive claims must be accurate and not misleading.</li>
              <li>Images, videos, floor plans, and documents must be owned by you or properly licensed for commercial use.</li>
              <li>Material defects or legally required disclosures must be included as required by local law.</li>
            </ul>
          </Sub>
          <Sub title="3.2 Content Moderation">
            <p>Propworths may edit, reject, suspend, or remove any listing that violates policy, creates legal risk, or harms platform integrity, at our discretion.</p>
          </Sub>
        </Section>

        <Section n="4" title="Auctions: Seller Controls & Responsibilities">
          <Sub title="4.1 Auction Setup">
            <p>You are responsible for confirming the auction settings shown on the auction page, including:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Reserve price and whether reserve status is displayed.</li>
              <li>Minimum bid increments and any buyer qualification requirements.</li>
              <li>Special conditions (deposit, proof of funds, inspection windows, required documents).</li>
              <li>Closing time and extension rules (soft close) as provided by the Platform.</li>
            </ul>
          </Sub>
          <Sub title="4.2 Acceptance / Rejection of Bids">
            <p>You control whether to accept a bid (subject to law and your mandate). If you accept a bid through the Platform, you agree to cooperate promptly to finalise the transaction with the winning bidder and the appointed conveyancer/closing professional.</p>
          </Sub>
          <div className="p-3 rounded-lg border-l-4 border-gold bg-gold/5">
            <strong className="text-gold">Important:</strong> you may not use the auction function to generate &ldquo;fake demand&rdquo; or to encourage shill bidding. Any manipulation may lead to immediate removal and account action.
          </div>
        </Section>

        <Section n="5" title="Fees, Commission & Invoicing">
          <p>Fees and commission (if any) are governed by the <Link href="/commission-fees" className="text-gold underline">Commission &amp; Fees Policy</Link> and any in-app checkout terms, plus any written commercial agreement with Propworths.</p>
          <Sub title="5.1 Platform Commission on Buyer Default">
            <div className="p-3 rounded-lg border border-dashed border-gold/25 bg-gold/5 text-xs">
              Where applicable, the Platform may charge the bidder a 5% Platform Commission on an Accepted Bid that the bidder fails to complete, as set out in the <Link href="/auction-bidding-terms" className="text-gold underline">Auction Terms</Link>. This is separate from any seller remedies under the sale agreement.
            </div>
          </Sub>
        </Section>

        <Section n="6" title="Data, Leads & Communications">
          <p>Enquiries and leads generated through the Platform may be routed to you. You agree to respond in a timely and professional manner and to comply with data protection laws when handling personal information of bidders/buyers.</p>
        </Section>

        <Section n="7" title="Intellectual Property Licence">
          <p>You grant Propworths a worldwide, royalty-free licence to host, display, reproduce, distribute, and promote your listing content on the Platform and in marketing channels for the purpose of providing the service, during the listing term and for a reasonable period thereafter for audit/record-keeping and dispute resolution.</p>
        </Section>

        <Section n="8" title="Indemnity">
          <p>To the maximum extent permitted by law, you agree to indemnify and hold Propworths harmless from claims, losses, penalties, and costs arising from: (a) inaccurate or misleading listings; (b) lack of authority/mandate; (c) IP infringement in your content; or (d) your breach of law or this Agreement.</p>
        </Section>

        <Section n="9" title="Suspension / Termination">
          <p>Propworths may suspend or terminate your listings and/or account where we reasonably believe there is fraud, manipulation, legal risk, or breach of policy/terms. You may remove listings subject to any outstanding fees and active transaction obligations.</p>
        </Section>

        <Section n="10" title="Governing Law & Disputes">
          <p>This Agreement is governed by the law stated in the Platform legal footer or contracting entity terms, subject to mandatory provisions in the relevant jurisdiction(s). Dispute handling is described in <Link href="/dispute-resolution" className="text-gold underline">Dispute Resolution &amp; Arbitration</Link>.</p>
        </Section>

        <Section n="11" title="Head Office Details">
          <p><strong className="text-cream">Contracting Entity:</strong> Propworths · <strong className="text-cream">Legal Notices:</strong> legal@propworths.com</p>
        </Section>

        <div className="flex flex-wrap gap-4 pt-6">
          <Link href="/list-property" className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">List a Property →</Link>
          <Link href="/pricing" className="px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors">View Pricing</Link>
        </div>
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
