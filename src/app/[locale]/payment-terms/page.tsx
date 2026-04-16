import Link from "next/link";

export const metadata = {
  title: "Payment Terms — Propworths",
  description: "Payment methods, authorisations, non-payment / late payment, refunds and chargebacks for the Propworths platform.",
};

export default function PaymentTermsPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="pt-24 md:pt-32 pb-10 px-4 border-b border-gold/15">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">Payment Terms</h1>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-navy-light text-cream/70 border border-gold/20">Version 1.0</span>
            <span className="px-3 py-1 rounded-full bg-navy-light text-cream/70 border border-gold/20">Effective: [Insert Date]</span>
          </div>
          <div className="flex flex-wrap gap-4 mt-6 text-sm">
            <Link href="/commission-fees" className="text-gold hover:text-gold-light">Commission &amp; Fees</Link>
            <Link href="/auction-bidding-terms" className="text-gold hover:text-gold-light">Auction Terms</Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <Section n="1" title="Payment Methods">
          <p>Payments may be made via methods enabled in your region, including:</p>
          <List>
            <li>Card payments (via approved payment gateway, including Stripe and PayFast)</li>
            <li>Instant EFT / bank transfer options (where available)</li>
            <li>Standard EFT to Propworths Head Office bank account (details displayed on invoice)</li>
            <li>PayPal and regional wallets where supported</li>
          </List>
        </Section>

        <Section n="2" title="Authorisations & Risk Controls">
          <p>
            To protect Platform integrity, Propworths may require additional verification,
            pre-authorisation, or payment confirmation for certain users or high-value auctions,
            subject to law and payment provider rules.
          </p>
          <Note>
            If you fail verification or a payment is reversed/charged back, we may suspend your
            account and seek recovery of any outstanding amounts.
          </Note>
        </Section>

        <Section n="3" title="Non-Payment / Late Payment">
          <p>
            If an amount becomes due (including the 5% Platform Commission under Auction Terms) and is
            not paid by the deadline, Propworths may suspend access, block bidding, refer the matter
            for collection, and recover lawful interest and costs.
          </p>
        </Section>

        <Section n="4" title="Refunds & Chargebacks">
          <p>
            Chargebacks and reversals harm marketplace trust. Where lawful, we may dispute chargebacks
            and share evidence with payment providers, including bidding logs, acceptance
            notifications, and platform records.
          </p>
          <p>
            Legitimate refund requests (e.g. duplicate charges, processing errors) will be handled in
            good faith within 10 business days.
          </p>
        </Section>

        <Section n="5" title="Billing Contact">
          <p>
            <strong className="text-cream">Billing:</strong>{" "}
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
