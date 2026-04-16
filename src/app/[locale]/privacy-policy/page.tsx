import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Propworths",
  description: "How Propworths collects, uses, shares, and protects personal data when you use the Platform.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="pt-24 md:pt-32 pb-10 px-4 border-b border-gold/15">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">Privacy Policy</h1>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-navy-light text-cream/70 border border-gold/20">Version 1.0</span>
            <span className="px-3 py-1 rounded-full bg-navy-light text-cream/70 border border-gold/20">Effective: [Insert Date]</span>
          </div>
          <div className="flex flex-wrap gap-4 mt-6 text-sm">
            <Link href="/terms-of-use" className="text-gold hover:text-gold-light">← Terms of Use</Link>
            <Link href="/anti-fraud-bid-integrity" className="text-gold hover:text-gold-light">Bid Integrity</Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <Section n="1" title="Who We Are">
          <p>
            This Privacy Policy explains how <strong className="text-cream">Propworths Head Office</strong>{" "}
            ("Propworths", "we", "us") collects, uses, shares, and protects personal data when you use
            the Platform.
          </p>
        </Section>

        <Section n="2" title="Data We Collect">
          <List>
            <li>Account data (name, email, phone, password hash, preferences)</li>
            <li>Verification data (identity and address documents, where required)</li>
            <li>Transaction data (bids, accepted bids, fees/commission events, invoices)</li>
            <li>Technical data (IP address, device/browser identifiers, logs, cookies)</li>
            <li>Communications (support messages, dispute communications)</li>
          </List>
        </Section>

        <Section n="3" title="Why We Use Data (Purposes)">
          <List>
            <li>Provide and secure the Platform and auctions</li>
            <li>Verify identity and prevent fraud/manipulation</li>
            <li>Process payments and enforce fees/commission</li>
            <li>Comply with legal obligations (AML/KYC where applicable)</li>
            <li>Improve platform performance and user experience</li>
          </List>
        </Section>

        <Section n="4" title="Sharing & International Transfers">
          <p>
            We may share data with service providers (hosting, analytics, verification, payment
            processors) and with authorities where required by law. As an international platform, data
            may be transferred cross-border with appropriate safeguards as required by applicable law.
          </p>
        </Section>

        <Section n="5" title="Retention">
          <p>
            We retain data for as long as needed to provide services, comply with legal obligations,
            and resolve disputes, including maintaining audit logs for bidding integrity and payment
            enforcement.
          </p>
        </Section>

        <Section n="6" title="Your Rights">
          <p>
            Depending on your jurisdiction, you may have rights to access, correct, delete, restrict,
            or object to processing. Contact{" "}
            <a href="mailto:privacy@propworths.com" className="text-gold underline">privacy@propworths.com</a>
            .
          </p>
        </Section>

        <Section n="7" title="Cookies">
          <p>
            We use cookies and similar technologies for security, session management, analytics, and
            preferences. A cookie banner may be used where required.
          </p>
        </Section>

        <Section n="8" title="Contact">
          <p>
            <strong className="text-cream">Privacy:</strong>{" "}
            <a href="mailto:privacy@propworths.com" className="text-gold underline">privacy@propworths.com</a>
            {" "}|{" "}
            <strong className="text-cream">Head Office:</strong> [Entity + Address]
          </p>
          <div className="bg-navy-light border border-dashed border-gold/25 rounded-xl p-4 text-sm text-cream/70">
            This policy should be adapted for GDPR / UK GDPR / POPIA / CCPA and other applicable
            jurisdictions. Local counsel should confirm data-subject rights, lawful bases, and
            cross-border transfer mechanics.
          </div>
        </Section>
      </main>
    </div>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl md:text-2xl font-bold text-cream mb-4 flex items-center gap-3">
        <span className="w-1 h-6 bg-gold rounded" />
        <span>
          <span className="text-gold/70 mr-2">{n})</span>
          {title}
        </span>
      </h2>
      <div className="space-y-3 text-cream/75 leading-relaxed text-[15px]">{children}</div>
    </section>
  );
}

function List({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 space-y-1.5 marker:text-gold/60">{children}</ul>;
}
