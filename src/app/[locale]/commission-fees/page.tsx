import Link from "next/link";

export const metadata = {
  title: "Commission & Fees Policy — Propworths",
  description: "How Propworths commissions and fees work. Auction buyer default commission, listing fees, taxes, invoicing, and refunds.",
};

export default function CommissionFeesPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="pt-24 md:pt-32 pb-10 px-4 border-b border-gold/15">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
            Commission &amp; Fees Policy
          </h1>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-navy-light text-cream/70 border border-gold/20">Version 1.0</span>
            <span className="px-3 py-1 rounded-full bg-navy-light text-cream/70 border border-gold/20">Effective: [Insert Date]</span>
          </div>
          <div className="flex flex-wrap gap-4 mt-6 text-sm">
            <Link href="/terms-of-use" className="text-gold hover:text-gold-light">← Terms of Use</Link>
            <Link href="/auction-bidding-terms" className="text-gold hover:text-gold-light">Auction Terms</Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <Section n="1" title="General">
          <p>
            This page explains fees and commissions that may apply when you use Propworths (the
            "Platform"). Fees may vary by country, category (residential / commercial /
            business-for-sale), and plan, and will be displayed before you commit.
          </p>
          <Note>
            If there is a conflict between this Policy and a specific invoice or written agreement,
            the invoice/agreement prevails.
          </Note>
        </Section>

        <Section n="2" title="Auction Platform Commission (Buyer Default)">
          <div className="bg-gold/10 border border-gold/40 rounded-2xl p-5 text-cream/85">
            <p>
              If your bid is accepted online and you do not proceed to complete the transaction
              (buyer default), you must pay Propworths{" "}
              <strong className="text-gold">5% of the Accepted Bid amount</strong> within{" "}
              <strong className="text-gold">48 hours</strong>, as set out in the{" "}
              <Link href="/auction-bidding-terms" className="text-gold underline">Auction Terms</Link>
              .
            </p>
          </div>
        </Section>

        <Section n="3" title="Listing / Advertising Fees (If Applicable)">
          <SubHeading>3.1 Pay-Per-Listing / Subscription</SubHeading>
          <p>
            Propworths may offer pay-per-listing and/or subscription options. The applicable cost is
            shown in-app at checkout. See{" "}
            <Link href="/pricing" className="text-gold underline">Pricing</Link> for current tiers.
          </p>
          <SubHeading>3.2 Featured Upgrades</SubHeading>
          <List>
            <li>Featured / Boosted listings</li>
            <li>Homepage or category spotlight</li>
            <li>Premium branding / agency profile enhancements</li>
            <li>Priority leads routing</li>
          </List>
        </Section>

        <Section n="4" title="Taxes, Currency, and Invoicing">
          <List>
            <li>Fees may be exclusive of VAT / GST / sales tax unless stated otherwise.</li>
            <li>Currency is shown at checkout; exchange rates may apply for cross-border payments.</li>
            <li>Invoices are issued by Propworths Head Office or its regional contracting entity as shown on the invoice.</li>
          </List>
        </Section>

        <Section n="5" title="Refunds">
          <p>
            Unless required by law, fees for services delivered (e.g. listing publication, featured
            placement) are generally non-refundable. Refund rules for payment processing errors or
            duplicate charges are handled in{" "}
            <Link href="/payment-terms" className="text-gold underline">Payment Terms</Link>
            .
          </p>
        </Section>

        <Section n="6" title="Contact">
          <p>
            <strong className="text-cream">Billing Support:</strong>{" "}
            <a href="mailto:billing@propworths.com" className="text-gold underline">billing@propworths.com</a>
            {" "}|{" "}
            <strong className="text-cream">Head Office:</strong> [Entity + Address]
          </p>
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

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-semibold text-cream mt-4 mb-1">{children}</h3>;
}

function List({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 space-y-1.5 marker:text-gold/60">{children}</ul>;
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-navy-light border border-dashed border-gold/25 rounded-xl p-4 text-sm text-cream/70">
      {children}
    </div>
  );
}
