import Link from "next/link";

export const metadata = {
  title: "Online Auction Seller Agreement — Propworths",
  description: "The legally binding agreement between Propworths and sellers listing property or businesses on the auction platform. 18 sections covering fees, deposits, obligations.",
};

export default function AuctionSellerAgreementPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-12 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            🔨 Legal · Sellers
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight">
            Online Auction{" "}
            <span className="italic font-normal text-gold">Seller Agreement</span>
          </h1>
          <p className="mt-4 text-sm text-cream/60">International Property &amp; Business Auction Platform — 185 Countries · Version 1.0</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-24 space-y-10 text-cream/80 leading-relaxed">
        <div className="p-5 rounded-xl border border-dashed border-gold/25 bg-gold/5 text-sm">
          <strong className="text-gold">Required before listing or payment:</strong> This agreement must be read, completed, and digitally signed before you can upload your auction listing or proceed to payment. Your listing form and payment options unlock automatically once this agreement is signed.
        </div>

        <Section title="1. Parties &amp; Purpose">
          <p>This Online Auction Seller Agreement (&ldquo;Agreement&rdquo;) is between <strong className="text-cream">Propworths Head Office</strong> (&ldquo;Propworths&rdquo;, &ldquo;Platform&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) and the seller, property owner, developer, or authorised agent/broker identified below (&ldquo;Seller&rdquo;, &ldquo;Agent&rdquo;, &ldquo;you&rdquo;).</p>
          <p>You appoint Propworths to host your auction listing and to provide online auction functionality, subject to this Agreement, the <Link href="/auction-bidding-terms" className="text-gold underline">Online Auction Bidding Terms</Link>, the <Link href="/commission-fees" className="text-gold underline">Commission &amp; Fees Policy</Link>, and all other applicable Platform policies.</p>
        </Section>

        <Section title="2. Seller Details">
          <p>Sellers must provide full legal name, ID or registration number, capacity (private, agent, auctioneer, developer, liquidator, business owner, legal representative), licence or accreditation number, email, phone, physical address, country, VAT/tax number, and mandate authority. This information forms part of the legally binding agreement and appears on confirmation emails and invoices.</p>
          <p className="text-sm text-cream/60">📋 Proof of authority (ownership title, mandate, PoA, or court order) must be uploaded when the auction listing is submitted. Listings without verified authority will not go live.</p>
        </Section>

        <Section title="3. Bidder Security Deposit &amp; Proof of Funds">
          <p>To ensure only serious, financially capable bidders can participate, Propworths requires every prospective bidder to complete a mandatory security deposit process <strong className="text-cream">before any bid can be placed</strong>.</p>
          <Sub title="3.1 Security Deposit Amount">
            <p>Every bidder must deposit <strong className="text-cream">USD 10,000</strong> into their own <strong className="text-cream">attorney&apos;s trust account</strong> (or equivalent client trust / escrow account held by a qualified legal professional in their jurisdiction). The deposit is held by the bidder&apos;s own attorney — not by Propworths.</p>
          </Sub>
          <Sub title="3.2 Proof of Deposit — Upload Requirement">
            <p>The bidder must obtain a Proof of Funds / Trust Account Confirmation letter from their attorney on letterhead, confirming that USD 10,000 is held in trust for the purpose of bidding on the specified Propworths listing. This document is uploaded through the Propworths webapp on the specific auction listing page before bidding opens and must quote the Auction Listing Reference Number.</p>
          </Sub>
          <Sub title="3.3 Verification &amp; Bid Activation">
            <p>Propworths verifies the uploaded proof of deposit before activating the bidder&apos;s ability to bid. Verification typically occurs within 24 hours of upload during business hours. Propworths reserves the right to reject documents that are incomplete, unverifiable, or not on the required attorney letterhead.</p>
          </Sub>
          <Sub title="3.4 Application of Deposit to Purchase Price">
            <p>If a bidder wins the auction and the sale proceeds to completion, the USD 10,000 Security Deposit is deducted from the final purchase price at transfer/closing. The bidder&apos;s attorney releases the held funds as directed by the conveyancer.</p>
          </Sub>
          <Sub title="3.5 Refund of Deposit — Unsuccessful Bidders">
            <p>If a bidder does not win the auction, or if the auction does not result in an Accepted Bid, the USD 10,000 Security Deposit is fully refundable to the bidder. The refund is processed directly by the bidder&apos;s own attorney from trust — no action is required from Propworths. Propworths issues a Release Confirmation to the bidder&apos;s attorney within 3 business days of the auction close.</p>
          </Sub>
          <Sub title="3.6 Forfeiture in Case of Buyer Default">
            <p>If a bidder wins, their bid is accepted, and they subsequently fail to complete, the Security Deposit may not be refunded until the default matter is resolved. The Seller may pursue a claim against the defaulting buyer. Propworths&apos;s 5% Platform Commission on the Accepted Bid remains due and payable by the defaulting bidder within 48 hours of the default notice, separately from the Security Deposit.</p>
          </Sub>
          <Sub title="3.7 Seller Acknowledgement">
            <p>The Seller confirms awareness that all bidders must complete the USD 10,000 Security Deposit process, and that Propworths does not hold, manage, or guarantee those funds — they are held exclusively by the bidder&apos;s own attorney in trust.</p>
          </Sub>
        </Section>

        <Section title="4. Asset Being Auctioned">
          <Sub title="4.1 Asset Type">
            <p>Residential property, commercial property, land / farm, business (going concern / franchise), industrial property, or other assets (vehicle, vessel, equipment).</p>
          </Sub>
          <Sub title="4.2 Auction Configuration">
            <p>Sellers configure: reserve price toggle, display reserve status to bidders, soft-close (anti-sniping 5-minute extension — recommended), buyer pre-qualification requirement, NDA requirement before viewing details (for confidential business sales).</p>
          </Sub>
          <Sub title="4.3 Listing Details">
            <p>Auction duration (7/14/21/30 days), estimated value (USD), starting bid, reserve price, minimum bid increment, buyer deposit (5%/10%/fixed/none), asset location, and any special conditions. Accuracy is the Seller&apos;s responsibility.</p>
          </Sub>
        </Section>

        <Section title="5. Fees, Commission &amp; Invoicing">
          <Sub title="5.1 Success Commission on Completed Sales">
            <p>Total commission payable on a successfully completed auction sale is <strong className="text-cream">10% of the final sale price</strong> when agent-listed (5% to Propworths + 5% to agent/auctioneer), or <strong className="text-cream">5% to Propworths only</strong> on private listings. Commission is charged on the final accepted sale price and deducted at transfer/closing. No commission is due until the sale is successfully concluded.</p>
            <div className="overflow-hidden rounded-xl border border-gold/20 my-4">
              <table className="w-full text-sm">
                <thead className="bg-navy-dark text-cream">
                  <tr>
                    <th className="p-3 text-left">Listing Type</th>
                    <th className="p-3 text-center">Propworths</th>
                    <th className="p-3 text-center">Agent</th>
                    <th className="p-3 text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gold/20">
                    <td className="p-3">Agent / Auctioneer Listed</td>
                    <td className="p-3 text-center font-bold">5%</td>
                    <td className="p-3 text-center font-bold">5%</td>
                    <td className="p-3 text-center font-bold bg-gold/5">10%</td>
                  </tr>
                  <tr className="border-t border-gold/20">
                    <td className="p-3">Private / Owner Listed</td>
                    <td className="p-3 text-center font-bold">5%</td>
                    <td className="p-3 text-center text-cream/50">—</td>
                    <td className="p-3 text-center font-bold bg-gold/5">5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Sub>
          <Sub title="5.2 Platform Commission on Buyer Default — 5% (Separate)">
            <p>If a bidder&apos;s bid is accepted online and they subsequently fail or refuse to complete, Propworths charges the <strong className="text-cream">defaulting bidder</strong> (not the Seller) a Platform Commission equal to 5% of the Accepted Bid amount, payable within 48 hours of default. No success commission is owed by the Seller on a defaulted sale.</p>
          </Sub>
          <Sub title="5.3 Payment Timeline After a Successful Sale">
            <ol className="list-decimal ml-6 space-y-1 text-sm">
              <li>Auction closes — winning bid confirmed; both parties notified.</li>
              <li>Within 24 hours — purchase agreement issued; Seller countersigns within 48 hours.</li>
              <li>Within 7 days — transfer/closing initiated; conveyancer appointed; buyer pays balance.</li>
              <li>On transfer — commission deducted; net paid to seller within 3 business days; invoice issued.</li>
            </ol>
          </Sub>
          <Sub title="5.4 Local Transfer Costs &amp; Taxes">
            <p>Transfer costs, conveyancing fees, local taxes, stamp duty, capital gains tax, VAT, and notary fees are the Seller&apos;s sole responsibility and separate from Propworths&apos;s fees. Propworths is not a legal or financial advisor.</p>
          </Sub>
        </Section>

        <Section title="6. Authority, Mandate &amp; Eligibility">
          <p>Sellers warrant that they are the lawful owner or hold a valid written mandate/authority to list and auction the asset, and can provide documentary proof on request. Sellers warrant compliance with all applicable laws, licensing requirements, property and real-estate regulations, advertising standards, and consumer disclosure obligations.</p>
        </Section>

        <Section title="7. Listing Content Standards">
          <p>All pricing, location, sizes, features, zoning, approvals, and descriptive claims must be accurate and not misleading. Images, videos, floor plans, and documents must be owned or properly licensed for commercial use — no stock photos, watermarked images, or AI-generated property images. Material defects or legally required disclosures must be included. Financial information for business sales must be accurate. Propworths may edit, reject, suspend, or remove any listing that violates policy.</p>
        </Section>

        <Section title="8. Auction Controls &amp; Seller Responsibilities">
          <p>Sellers are responsible for confirming all auction settings before going live. Once active bids are placed, a listing may not be withdrawn except with Propworths&apos;s written approval. Sellers must respond to buyer enquiries and document requests within 48 hours during the auction and make the asset available for inspection during any advertised inspection window.</p>
          <p className="text-sm text-red-300/80 p-3 rounded-lg border border-red-400/20 bg-red-900/10"><strong>Anti-Shill Bidding — Zero Tolerance:</strong> Sellers may not use the auction function to generate artificial demand or encourage shill bidding, bid manipulation, or artificial inflation of bid prices. Any such activity may lead to immediate removal, account suspension, and legal action.</p>
        </Section>

        <Section title="9. Acceptance of Bids &amp; Sale Obligations">
          <p>The highest bid at close is not automatically an Accepted Bid unless the Seller confirms acceptance through the Platform. Once you accept a bid through the Platform, you are legally obligated to cooperate promptly to finalise the transaction, countersign the purchase agreement within 48 hours, and proceed to transfer. Failure to proceed may result in legal action, forfeiture of applicable fees, and permanent account suspension. No-reserve auctions are unconditionally binding on the Seller regardless of final price.</p>
        </Section>

        <Section title="10. Data, Leads &amp; Communications">
          <p>Enquiries and leads generated through the Platform may be routed to you. You agree to respond professionally and comply with applicable data protection laws (GDPR, POPIA, and relevant privacy legislation) when handling buyer and bidder information.</p>
        </Section>

        <Section title="11. Intellectual Property Licence">
          <p>You grant Propworths a worldwide, royalty-free licence to host, display, reproduce, distribute, and promote your listing content on the Platform and in marketing channels for the duration of the listing and a reasonable period thereafter for audit and dispute resolution purposes.</p>
        </Section>

        <Section title="12. Propworths's Role &amp; Limitation of Liability">
          <p>Propworths operates as a marketplace platform only and is not a party to the sale agreement between Seller and buyer. To the maximum extent permitted by law, Propworths accepts no liability for listing accuracy, seller or buyer conduct, financial representations, or transaction outcomes. Maximum platform liability is limited to fees paid by the Seller in the previous 12 months.</p>
        </Section>

        <Section title="13. Indemnity">
          <p>You agree to indemnify and hold Propworths harmless from all claims, losses, penalties, and costs arising from: (a) inaccurate or misleading listing content; (b) lack of valid ownership or mandate; (c) IP infringement in your uploaded content; (d) failure to complete a confirmed sale; or (e) any breach of applicable law or this Agreement.</p>
        </Section>

        <Section title="14. Suspension &amp; Termination">
          <p>Propworths may suspend or terminate your listings and/or account where we reasonably believe there is fraud, bid manipulation, legal risk, or breach of policy. You may remove listings subject to outstanding fees and active transaction obligations.</p>
        </Section>

        <Section title="15. Governing Law &amp; Disputes">
          <p>This Agreement is governed by the law applicable in your country of registration, subject to mandatory consumer and property legislation where the asset is located. All disputes must first be referred to Propworths Head Office for a 30-day resolution attempt before external legal proceedings. See also <Link href="/dispute-resolution" className="text-gold underline">Dispute Resolution &amp; Arbitration</Link>.</p>
        </Section>

        <Section title="16. Amendments">
          <p>Propworths may amend these terms with 30 days written notice. Listings already live at the time of an amendment are governed by the version of this Agreement signed at listing time. Updated terms are published on the Platform.</p>
        </Section>

        <Section title="17. Digital Signature &amp; Acceptance">
          <p>By signing, you confirm you have read, understood, and agree to all terms of this Online Auction Seller Agreement, including the <Link href="/commission-fees" className="text-gold underline">Commission &amp; Fees Policy</Link> and the <Link href="/auction-bidding-terms" className="text-gold underline">Online Auction Bidding Terms</Link>. Your digital signature carries the same legal force as a handwritten signature. On signing, a PDF copy is emailed and stored on your Seller Dashboard, and your listing form unlocks automatically.</p>
        </Section>

        <Section title="18. Head Office Details">
          <p><strong className="text-cream">Contracting Entity:</strong> Propworths · <strong className="text-cream">Legal Notices:</strong> legal@propworths.com</p>
          <p className="text-sm mt-3">Related documents: <Link href="/auction-bidding-terms" className="text-gold underline">Auction Bidding Terms</Link> · <Link href="/commission-fees" className="text-gold underline">Commission &amp; Fees</Link> · <Link href="/anti-fraud-bid-integrity" className="text-gold underline">Bid Integrity Policy</Link> · <Link href="/dispute-resolution" className="text-gold underline">Dispute Resolution</Link> · <Link href="/privacy-policy" className="text-gold underline">Privacy Policy</Link></p>
        </Section>

        <div className="flex flex-wrap gap-4 pt-6">
          <Link href="/list-property" className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">List an Auction Property →</Link>
          <Link href="/auctions" className="px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors">Back to Auctions</Link>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl md:text-2xl font-bold text-cream mb-3" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="space-y-3 text-sm">{children}</div>
    </section>
  );
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <h3 className="font-semibold text-gold text-base mb-2" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="space-y-2">{children}</div>
    </div>
  );
}
