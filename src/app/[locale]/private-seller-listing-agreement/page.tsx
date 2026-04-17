import Link from "next/link";

export const metadata = {
  title: "Private Seller Listing Agreement — Propworths",
  description: "Propworths Private Seller Listing Agreement — for owners listing property directly without an estate agent or auctioneer. Covers ownership, disclosure, 5% commission, and responsibilities.",
};

export default function PrivateSellerAgreementPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-12 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Legal · Private Owners
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight">
            Private Seller{" "}
            <span className="italic font-normal text-gold">Listing Agreement</span>
          </h1>
          <p className="mt-4 text-cream/70 max-w-2xl mx-auto">For property owners listing directly on Propworths — without the involvement of an estate agent or auctioneer.</p>
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <Link href="/list-property" className="text-xs px-3 py-1.5 rounded border border-gold/25 bg-gold/5 text-cream/80 hover:border-gold/50">← List Your Property</Link>
            <Link href="/seller-agent-listing" className="text-xs px-3 py-1.5 rounded border border-gold/25 bg-gold/5 text-cream/80 hover:border-gold/50">Agent Agreement</Link>
            <Link href="/auction-seller-agreement" className="text-xs px-3 py-1.5 rounded border border-gold/25 bg-gold/5 text-cream/80 hover:border-gold/50">Auction Agreement</Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-24 space-y-10 text-cream/80 text-sm leading-relaxed">
        <Section n="1" title="Parties, Purpose & Scope">
          <p>This Private Seller Listing Agreement (&ldquo;Agreement&rdquo;) is between <strong className="text-cream">Propworths Head Office</strong> and the individual property owner or legal entity (&ldquo;Private Seller&rdquo;, &ldquo;Owner&rdquo;, &ldquo;you&rdquo;).</p>
          <p>This Agreement applies specifically to sellers listing their own property without a registered estate agent, auctioneer, or mandate holder. If you are an agent or auctioneer, please use the <Link href="/seller-agent-listing" className="text-gold underline">Seller / Agent Listing Agreement</Link> instead.</p>
          <Note tone="info">ℹ️ As a private seller, you take on the responsibilities an estate agent would ordinarily perform — viewings, buyer communications, negotiation, and compliance with disclosure obligations in your jurisdiction. Propworths provides the platform and technology only.</Note>
        </Section>

        <Section n="2" title="Ownership, Authority & Eligibility">
          <Sub title="2.1 Proof of Ownership">
            <p>You warrant that you are the registered owner or have legal authority to list and sell (executor, trustee, PoA holder). You must be able to provide proof:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Title deed or equivalent ownership document</li>
              <li>FICA / KYC identity documents (ID or passport)</li>
              <li>Rates clearance certificate (where applicable)</li>
              <li>For estate/trust sales: grant of probate, letters of administration, or trust deed</li>
            </ul>
          </Sub>
          <Sub title="2.2 No Outstanding Conflicts">
            <p>You confirm no other agent, auctioneer, or mandate holder has an existing exclusive mandate over this property. You indemnify Propworths against claims arising from mandate disputes.</p>
          </Sub>
          <Sub title="2.3 Eligibility">
            <p>You must be 18+, or a duly authorised representative of a legal entity. You must not be on any sanctions, fraud, or money-laundering watchlists.</p>
          </Sub>
        </Section>

        <Section n="3" title="Listing Content & Accuracy">
          <Sub title="3.1 Accuracy Obligation">
            <p>All listing content — photographs, descriptions, dimensions, zoning, title, price — must be accurate, complete, and not misleading. You are solely responsible. Propworths does not verify listing content.</p>
            <Note tone="warn">⚠️ <strong>Misrepresentation is a serious legal risk.</strong> As a private seller, you do not have the protection of a professional intermediary. Any misrepresentation may expose you to civil claims, regulatory penalties, or criminal liability.</Note>
          </Sub>
          <Sub title="3.2 Photographs & Media">
            <p>You must own the rights to all media or have permission. You grant Propworths a worldwide royalty-free licence to display and reproduce this content during the listing term and a reasonable period thereafter.</p>
          </Sub>
          <Sub title="3.3 Property Defects & Disclosure">
            <p>You must disclose all known material defects, latent defects, encumbrances, servitudes, bonds, or conditions. Failure to disclose may result in the sale being set aside or a damages claim against you.</p>
          </Sub>
          <Sub title="3.4 Content Moderation">
            <p>Propworths may remove, edit, or reject any listing content that violates policies, law, or advertising standards. Listings may not include external contact details (phone/email/social links) in descriptions or images.</p>
          </Sub>
        </Section>

        <Section n="4" title="Your Responsibilities as a Private Seller">
          <p>You assume full responsibility for all activities that would ordinarily be managed by a professional estate agent or auctioneer.</p>
          <Sub title="4.1 Viewings & Access">
            <p>You schedule, manage, and attend all viewings. Propworths does not arrange viewings.</p>
          </Sub>
          <Sub title="4.2 Buyer Communication & Negotiation">
            <p>All communications, offers, counter-offers, and negotiations are your sole responsibility. Propworths provides a platform messaging system for initial enquiries.</p>
            <Note tone="warn">⚠️ <strong>Never share banking details, OTPs, or personal financial information</strong> via unsecured channels. Propworths will never request this via chat or email.</Note>
          </Sub>
          <Sub title="4.3 Offer & Sale Agreement">
            <p>You review, accept, or decline offers. Propworths does not draft, review, or validate sale agreements. You are strongly advised to use a qualified conveyancer or property attorney.</p>
          </Sub>
          <Sub title="4.4 FICA & Anti-Money Laundering Compliance">
            <p>Transactions are subject to FICA (or equivalent AML legislation). You ensure buyers are properly identified and transactions comply. Your appointed conveyancer typically assists.</p>
          </Sub>
          <Sub title="4.5 Compliance Certificates">
            <p>You obtain and provide electrical, plumbing, gas, beetle, electric fence, or energy performance certificates as required. Propworths is not liable for transfer delays caused by outstanding certificates.</p>
          </Sub>
          <Sub title="4.6 Transfer & Conveyancing">
            <p>You appoint a registered conveyancer. Transfer costs, rates clearances, bond cancellation fees, taxes (CGT, transfer duty, VAT) are your responsibility, separate from Propworths&apos;s commission.</p>
          </Sub>
        </Section>

        <Section n="5" title="Commission, Fees & Payment">
          <Sub title="5.1 Private Seller Commission Structure">
            <p>On a successfully completed sale:</p>
            <div className="overflow-hidden rounded-xl border border-gold/20 my-4">
              <table className="w-full text-sm">
                <thead className="bg-navy-dark">
                  <tr>
                    <th className="p-3 text-left">Listing Type</th>
                    <th className="p-3 text-center">Propworths</th>
                    <th className="p-3 text-center">Agent</th>
                    <th className="p-3 text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gold/5">
                    <td className="p-3"><strong className="text-cream">Private / Owner Listed ✓ this agreement</strong></td>
                    <td className="p-3 text-center font-bold text-gold">5%</td>
                    <td className="p-3 text-center text-cream/50">None</td>
                    <td className="p-3 text-center font-bold text-gold">5%</td>
                  </tr>
                  <tr className="border-t border-gold/20">
                    <td className="p-3 text-cream/70">Agent / Auctioneer Listed (reference)</td>
                    <td className="p-3 text-center">5%</td>
                    <td className="p-3 text-center">5%</td>
                    <td className="p-3 text-center">10%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Note tone="info"><strong>Example:</strong> property sells for USD 400,000. Propworths commission (5%) = USD 20,000. You receive USD 380,000 net — before transfer costs, taxes, and conveyancing fees.</Note>
          </Sub>
          <Sub title="5.2 When Commission is Charged">
            <p>Commission is only charged on a successfully completed sale, deducted from proceeds at transfer/closing. No commission is due if the property does not sell, receives no accepted bid, or the sale falls through before transfer. A tax invoice is issued automatically.</p>
          </Sub>
          <Sub title="5.3 Listing Fees">
            <p>Separate listing and promotional fees may apply depending on tier and features. These are displayed at checkout and prepaid upfront. No listing is published until payment has cleared. Listing fees are non-refundable once live.</p>
          </Sub>
          <Sub title="5.4 Auction Listings — Additional Terms">
            <p>If you choose to list as an auction, the <Link href="/auction-seller-agreement" className="text-gold underline">Online Auction Seller Agreement</Link> also applies. The 5% private seller commission applies equally to auction sales. If a winning bidder defaults, Propworths charges the bidder (not you) a separate 5% Platform Commission, payable within 48 hours.</p>
          </Sub>
          <Note tone="warn">⚠️ <strong>Transfer costs are separate from commission.</strong> Transfer duty, stamp duty, conveyancing fees, FICA compliance costs, compliance certificates, bond cancellation, CGT, VAT, and other regulatory costs are your responsibility. See the <Link href="/auction-commission-breakdown" className="text-gold underline">Commission Breakdown</Link> calculator.</Note>
        </Section>

        <Section n="6" title="Listing Duration, Withdrawal & Cancellation">
          <Sub title="6.1 Listing Duration">
            <p>Your listing remains active for the duration selected at checkout (typically 30, 60, or 90 days), or until sold, withdrawn, or suspended. Listings may be renewed at the applicable rate.</p>
          </Sub>
          <Sub title="6.2 Withdrawal Before Sale">
            <p>You may withdraw at any time before an accepted offer or accepted auction bid. Prepaid listing fees are non-refundable. Withdrawal does not attract a commission charge.</p>
          </Sub>
          <Sub title="6.3 Withdrawal After Accepted Offer / Bid">
            <p>If you withdraw or refuse to complete after formal acceptance, you may be liable for a withdrawal fee and subject to legal action. Your listing may be suspended pending resolution.</p>
            <Note tone="danger">🚫 You may not withdraw an active auction listing once bids have been placed, except with Propworths&apos;s prior written approval.</Note>
          </Sub>
        </Section>

        <Section n="7" title="Anti-Fraud, Shill Bidding & Off-Platform Dealing">
          <Sub title="7.1 Prohibited Conduct">
            <ul className="list-disc ml-6 space-y-1">
              <li>Creating fake enquiries or bids to inflate demand (shill bidding)</li>
              <li>Instructing family, associates, or agents to bid on your listing</li>
              <li>Misrepresenting ownership, title, or mandate</li>
              <li>Listing a property you do not own or have authority to sell</li>
              <li>Soliciting buyers to transact off-platform to avoid commission</li>
              <li>Providing false identity or financial information during FICA/KYC</li>
            </ul>
          </Sub>
          <Sub title="7.2 Off-Platform Transactions">
            <p>If a buyer introduced through Propworths subsequently purchases outside the Platform — whether to avoid commission or otherwise — Propworths&apos;s 5% commission remains due. This obligation survives for <strong className="text-cream">12 months</strong> from first introduction.</p>
            <Note tone="info">All on-platform communications and bid/enquiry records are stored and may be used as evidence in a commission dispute.</Note>
          </Sub>
        </Section>

        <Section n="8" title="Data Protection & Privacy">
          <p>Propworths processes your personal data per the <Link href="/privacy-policy" className="text-gold underline">Privacy Policy</Link>. By signing, you consent to Propworths using your contact details, listing data, and transaction records for providing and improving Platform services, regulatory compliance, and dispute resolution.</p>
          <p>Buyer data passed to you must be handled in compliance with applicable data protection legislation. You may not use buyer contact information for any purpose other than completing the transaction.</p>
        </Section>

        <Section n="9" title="Platform Liability & Indemnity">
          <Sub title="9.1 Platform Role">
            <p>Propworths operates as a marketplace platform only. We are not a party to the sale agreement. We do not provide legal, financial, tax, or conveyancing advice and do not verify listing accuracy, buyer identity, or bidder financial capacity.</p>
          </Sub>
          <Sub title="9.2 Limitation of Liability">
            <p>Propworths&apos;s total liability is limited to listing fees paid in the preceding 12 months. We are not liable for: loss of sale, buyer default, market price movements, failed transfers, or consequential, indirect, or special losses.</p>
          </Sub>
          <Sub title="9.3 Your Indemnity to Propworths">
            <p>You indemnify Propworths from all claims, losses, fines, penalties, and costs arising from: (a) inaccurate content; (b) listing without authority; (c) IP infringement; (d) failure to complete a confirmed sale; (e) mandate disputes; or (f) breach of law or this Agreement.</p>
          </Sub>
        </Section>

        <Section n="10" title="Governing Law, Amendments & Entire Agreement">
          <p>This Agreement is governed by the laws applicable to Propworths&apos;s contracting entity, subject to mandatory provisions where the property is situated. Disputes are handled per the <Link href="/dispute-resolution" className="text-gold underline">Dispute Resolution Policy</Link>. Propworths may update with notice; continued use constitutes acceptance.</p>
        </Section>

        <div className="flex flex-wrap gap-4 pt-6">
          <Link href="/list-property" className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">List Your Property →</Link>
          <Link href="/auction-commission-breakdown" className="px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors">Net Proceeds Calculator</Link>
        </div>
      </main>
    </div>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl md:text-2xl font-bold text-cream mb-3">{n}. {title}</h2>
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

function Note({ tone, children }: { tone: "info" | "warn" | "danger"; children: React.ReactNode }) {
  const cls =
    tone === "danger" ? "border-red-400 bg-red-900/10" :
    tone === "warn" ? "border-amber-400 bg-amber-900/10" :
    "border-gold/40 bg-gold/5";
  return <div className={`p-3 rounded-lg border-l-4 text-xs ${cls}`}>{children}</div>;
}
