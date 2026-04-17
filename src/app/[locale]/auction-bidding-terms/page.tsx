import Link from "next/link";

export const metadata = {
  title: "Online Auction Bidding Terms — Propworths",
  description: "Legally binding bidding terms for Propworths auctions — covering bid obligations, seller acceptance, 5% platform commission, 48-hour default, and anti-manipulation policy.",
};

export default function AuctionBiddingTermsPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-12 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Legal · Bidders
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight">
            Online Auction{" "}
            <span className="italic font-normal text-gold">Bidding Terms</span>
          </h1>
          <p className="mt-4 text-sm text-cream/60">Version 1.0 · Applies to all auctions hosted on Propworths</p>
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <Link href="/terms-of-use" className="text-xs px-3 py-1.5 rounded border border-gold/25 bg-gold/5 text-cream/80 hover:border-gold/50">← Terms of Use</Link>
            <Link href="/commission-fees" className="text-xs px-3 py-1.5 rounded border border-gold/25 bg-gold/5 text-cream/80 hover:border-gold/50">Fees &amp; Commission</Link>
            <Link href="/anti-fraud-bid-integrity" className="text-xs px-3 py-1.5 rounded border border-gold/25 bg-gold/5 text-cream/80 hover:border-gold/50">Bid Integrity</Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-24 space-y-10 text-cream/80 leading-relaxed text-sm">
        <Section n="0" title="Agreement & Priority">
          <p>These Online Auction Bidding Terms (&ldquo;Auction Terms&rdquo;) form a binding agreement between you (&ldquo;Bidder&rdquo;) and <strong className="text-cream">Propworths Head Office</strong>. They apply when you place, increase, or confirm any bid on the Platform.</p>
          <Note>You must also comply with the <Link href="/terms-of-use" className="text-gold underline">Terms of Use</Link> and all auction-specific rules shown on the auction page (reserve price, bid increments, closing time, deposits, special conditions). If there is a conflict, these Auction Terms prevail for auction activity.</Note>
        </Section>

        <Section n="1" title="Binding Nature of Online Bids">
          <Callout tone="warn">
            <strong className="text-gold">Important:</strong> Bids placed on the Platform are intended to be legally binding offers. Do not bid unless you are ready, willing, and able to proceed on the stated terms.
          </Callout>
          <Sub title="1.1 Your Warranties">
            <ul className="list-disc ml-6 space-y-1">
              <li>You have legal capacity and authority to bid and enter contracts.</li>
              <li>Your identity and payment details are accurate and verifiable.</li>
              <li>You have performed your own due diligence and will not rely on Propworths as a financial/legal advisor.</li>
              <li>You understand properties may be sold &ldquo;voetstoots / as-is&rdquo; where applicable, subject to seller conditions and local law.</li>
            </ul>
          </Sub>
        </Section>

        <Section n="2" title="How Auctions Work">
          <Sub title="2.1 Auction Mechanics">
            <ul className="list-disc ml-6 space-y-1">
              <li><strong className="text-cream">Start/End Times:</strong> each auction shows its opening and scheduled closing time.</li>
              <li><strong className="text-cream">Bid Increments:</strong> minimum increments may apply and are shown on the auction page.</li>
              <li><strong className="text-cream">Soft Close / Extension:</strong> if a bid is placed near the end, we may extend the auction to prevent last-second sniping.</li>
              <li><strong className="text-cream">Reserve:</strong> listings may have a reserve. &ldquo;Reserve met&rdquo; status may be shown where permitted.</li>
            </ul>
          </Sub>
          <Sub title="2.2 Technical Events">
            <Note>You are responsible for your own internet/device access. We may pause, extend, or restart an auction where there is a verified technical issue, fraud risk, or system integrity concern.</Note>
          </Sub>
        </Section>

        <Section n="3" title="Seller Acceptance & Winning Bid">
          <Sub title="3.1 Highest Bid vs. Accepted Bid">
            <p>The highest bid at the scheduled close is not automatically an &ldquo;Accepted Bid&rdquo; unless the seller confirms acceptance through the Platform or as otherwise stated in auction-specific terms.</p>
          </Sub>
          <Sub title="3.2 Acceptance Process">
            <ul className="list-disc ml-6 space-y-1">
              <li>Seller/agent may accept, reject, or counter a bid, subject to local law and the seller&apos;s mandate.</li>
              <li>When your bid is accepted online, the Platform notifies you electronically (in-app + email/SMS where enabled).</li>
              <li>Upon acceptance, you must promptly comply with the post-auction steps shown (signing, deposits, KYC, providing documents).</li>
            </ul>
          </Sub>
        </Section>

        <Section n="4" title="Bid Withdrawal, Default & Non-Completion">
          <Sub title="4.1 No Withdrawal After Acceptance">
            <p>After an Accepted Bid occurs, you may not withdraw without the seller&apos;s written consent. Any failure to proceed may be treated as a default.</p>
          </Sub>
          <Sub title="4.2 Buyer Default Includes (non-exhaustive)">
            <ul className="list-disc ml-6 space-y-1">
              <li>Refusing or failing to sign required documents within stated timelines.</li>
              <li>Failing to pay deposits/amounts due (where applicable).</li>
              <li>Failing verification/KYC checks due to inaccurate information.</li>
              <li>Attempting to renegotiate material terms after acceptance outside a lawful process.</li>
              <li>Indicating you &ldquo;changed your mind&rdquo; after acceptance.</li>
            </ul>
          </Sub>
        </Section>

        <Section n="5" title="Propworths Commission (5%) & 48-Hour Payment Obligation">
          <Callout tone="danger">
            <strong className="text-red-300">Commission on Accepted Bid — Payable even if you walk away:</strong> If your bid is accepted online and you do not proceed to complete for any reason not caused by Propworths, you agree to pay Propworths a commission equal to <strong className="text-cream">5% of the Accepted Bid amount</strong> (&ldquo;Platform Commission&rdquo;).
          </Callout>
          <Sub title="5.1 When the 5% becomes due">
            <p>The Platform Commission is immediately due when (a) your bid is accepted online; and (b) you subsequently fail or refuse to proceed, withdraw, or default, unless a mandatory legal cooling-off right applies in your jurisdiction and is properly exercised.</p>
          </Sub>
          <Sub title="5.2 48-Hour Payment Clause">
            <p>You must pay the Platform Commission <strong className="text-cream">within 48 hours</strong> of the earliest of:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Propworths issuing an in-app invoice/notice of default; or</li>
              <li>Propworths emailing the default notice to your registered email address; or</li>
              <li>Propworths sending an SMS/notification to your registered number.</li>
            </ul>
          </Sub>
          <Sub title="5.3 Payment Methods">
            <ul className="list-disc ml-6 space-y-1">
              <li><strong className="text-cream">EFT:</strong> pay to the bank account shown on the Platform invoice.</li>
              <li><strong className="text-cream">Online Payment:</strong> via the Platform&apos;s payment gateway (card/instant EFT/other supported methods).</li>
            </ul>
          </Sub>
          <Sub title="5.4 Late Payment, Recovery Costs">
            <p>If the Platform Commission is not paid within 48 hours, Propworths may (subject to law): (a) suspend/terminate your account and block further bidding; (b) refer the matter for collection; and/or (c) recover reasonable legal fees and collection costs, plus interest at the maximum lawful rate from due date until paid.</p>
          </Sub>
          <Note>This Platform Commission is separate from any deposit forfeiture or damages payable to the seller under the sale agreement or local auction rules.</Note>
        </Section>

        <Section n="6" title="&quot;Bid Withdrawal Manipulation&quot; Protection Clause">
          <Callout tone="danger">
            <strong className="text-red-300">Zero-Tolerance for Bid Manipulation:</strong> You may not place bids (including high &ldquo;spoof&rdquo; bids) with the purpose or effect of inflating price, testing market appetite, blocking other bidders, shill bidding, creating false demand, or later withdrawing to avoid completion.
          </Callout>
          <Sub title="6.1 Integrity Monitoring & Digital Evidence">
            <p>To protect auction integrity, you consent to reasonable monitoring and analysis to detect manipulation: device/browser identifiers, IP/geolocation signals, behavioural bidding patterns, account link analysis, payment verification outcomes, and other technical indicators permitted by law and our <Link href="/privacy-policy" className="text-gold underline">Privacy Policy</Link>.</p>
          </Sub>
          <Sub title="6.2 Manipulation Events (Examples)">
            <ul className="list-disc ml-6 space-y-1">
              <li>Repeatedly placing high bids and then refusing to proceed after acceptance or near closing.</li>
              <li>Creating or controlling multiple accounts to influence auction outcomes.</li>
              <li>Coordinating with others to suppress competition or inflate prices.</li>
              <li>Attempting to move negotiations off-platform to avoid commission or to &ldquo;reset&rdquo; the auction.</li>
            </ul>
          </Sub>
          <Sub title="6.3 Contractual Remedies (In addition to the 5% Commission)">
            <p>If Propworths reasonably determines you engaged in bid withdrawal manipulation or attempted circumvention, we may, subject to law:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li><strong className="text-cream">Immediately cancel</strong> bids, revoke a win, or rerun/relist the auction to restore fairness.</li>
              <li><strong className="text-cream">Suspend/ban</strong> your account and any related accounts, devices, payment methods, or entities.</li>
              <li><strong className="text-cream">Recover losses</strong> caused by the manipulation, including re-auction costs, seller claims passed to Propworths, investigation costs, and platform disruption losses.</li>
              <li><strong className="text-cream">Report suspected fraud</strong> to payment providers, verification partners, and/or relevant authorities.</li>
            </ul>
          </Sub>
          <Sub title="6.4 Anti-Circumvention (Off-Platform Deal Blocking)">
            <p>If you contact a seller/agent introduced through the Platform and attempt to conclude the transaction off-platform to avoid fees/commission, Propworths may treat this as circumvention and enforce its fees/commission and remedies to the maximum extent permitted by law.</p>
          </Sub>
        </Section>

        <Section n="7" title="Sanctions, AML/KYC & Eligibility">
          <p>You may not bid if you are subject to sanctions or prohibited by law from participating. We may block users and transactions where required by sanctions laws, AML rules, or platform risk policies.</p>
        </Section>

        <Section n="8" title="Governing Law & Disputes">
          <p>Governing law, jurisdiction, and dispute process are described in <Link href="/dispute-resolution" className="text-gold underline">Dispute Resolution &amp; Arbitration</Link>, subject to mandatory consumer protections in your jurisdiction.</p>
        </Section>

        <Section n="9" title="Contact & Notices">
          <p>Official notices will be delivered via in-app notification and/or the registered email address on your account. You must keep contact details current.</p>
          <p><strong className="text-cream">Legal Notices:</strong> legal@propworths.com</p>
        </Section>

        <div className="flex flex-wrap gap-4 pt-6">
          <Link href="/auction-registration-form" className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">Register to Bid →</Link>
          <Link href="/auctions" className="px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors">Back to Auctions</Link>
        </div>
      </main>
    </div>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl md:text-2xl font-bold text-cream mb-3" dangerouslySetInnerHTML={{ __html: `${n}) ${title}` }} />
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

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-3 rounded-lg border border-dashed border-gold/25 bg-gold/5 text-xs text-cream/75">
      {children}
    </div>
  );
}

function Callout({ children, tone }: { children: React.ReactNode; tone: "warn" | "danger" }) {
  const cls = tone === "danger"
    ? "border-l-4 border-red-400 bg-red-900/10"
    : "border-l-4 border-gold bg-gold/5";
  return <div className={`p-3 rounded-r-lg ${cls}`}>{children}</div>;
}
