import Link from "next/link";

export const metadata = {
  title: "Enterprise Listing Agreement — Propworths",
  description: "Enterprise listing agreement for 2,000+ listings at $2.00 per listing per month. Full platform features, auto-sync, and 185-country exposure.",
};

export default function EnterpriseAgreementPage() {
  return <ListingAgreement tier="Enterprise" rate="$2.00" bracket="2,000+ listings" />;
}

export function ListingAgreement({ tier, rate, bracket }: { tier: string; rate: string; bracket: string }) {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-12 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Listing · {tier} Tier
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight">
            Propworths{" "}
            <span className="italic font-normal text-gold">{tier} Listing Agreement</span>
          </h1>
          <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 text-gold font-semibold">
            💰 {rate} per listing / month · {bracket}
          </div>
          <p className="mt-6 text-cream/70 max-w-2xl mx-auto">Register, sign this agreement, connect your listing source, and go live across 185 countries.</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-24 space-y-10 text-cream/80 text-sm leading-relaxed">
        <Section n="1" title="Parties & Purpose">
          <p>This Listing Agreement (&ldquo;Agreement&rdquo;) is between <strong className="text-cream">Propworths Global</strong> (&ldquo;Propworths&rdquo;, &ldquo;Platform&rdquo;) and the listing party named in the registration form (&ldquo;Lister&rdquo;, &ldquo;you&rdquo;). By submitting this form and checking the acceptance boxes, you agree to be legally bound by these terms.</p>
        </Section>

        <Section n="2" title={`Listing Tier — ${tier}`}>
          <p>You are registering under the <strong className="text-cream">{tier} tier</strong> at <strong className="text-cream">{rate} per listing per month</strong> ({bracket}). Your tier adjusts automatically as your listing count changes. All tiers receive identical features: 30 photos, 1 video, 1 portal walkthrough, full analytics, WhatsApp contact, featured badge, priority search ranking, and 185-country exposure.</p>
          <ul className="list-disc ml-6 space-y-1 mt-3 text-xs">
            <li>Private tier: $7.50/listing/month (1–10 listings)</li>
            <li>Agency tier: $3.00/listing/month (11–2,000 listings)</li>
            <li>Enterprise tier: $2.00/listing/month (2,000+ listings)</li>
          </ul>
        </Section>

        <Section n="3" title="Listing Content & Accuracy">
          <p>You warrant that all listing content you provide — photographs, descriptions, dimensions, zoning, permitted use, legal title, and price — is accurate, complete, and not misleading. You are solely responsible for the accuracy of your listings. Propworths does not verify listing content.</p>
        </Section>

        <Section n="4" title="Auto-Sync Credentials (if applicable)">
          <p>Where you provide login credentials or API keys for auto-sync, you confirm that you have authority to grant Propworths read-only access to your listing system. Credentials are encrypted with AES-256. Propworths will never modify, delete, or alter data on your source system.</p>
        </Section>

        <Section n="5" title="Payment & Billing">
          <p>Listings are billed monthly at the rate for your tier. Billing begins when a listing is approved and published. Listings renew automatically each month. You may cancel at any time from your dashboard — your listing remains active until the end of the billing period. No refunds for partial months.</p>
        </Section>

        <Section n="6" title="Anti-Fraud & Off-Platform Dealing">
          <p>You agree not to use Propworths to identify buyers and then conduct the transaction off-platform to circumvent fees. Shill listings, fraudulent pricing, and fake contact details are strictly prohibited and will result in account suspension. See also our <Link href="/anti-fraud" className="text-gold underline">Anti-Fraud &amp; Bid Integrity Policy</Link>.</p>
        </Section>

        <Section n="7" title="Propworths's Rights">
          <p>Propworths may remove, edit, or decline to publish any listing that violates these terms, applicable law, or platform policies. Propworths is a technology platform and is not the seller, agent, conveyancer, or financial advisor for any transaction.</p>
        </Section>

        <Section n="8" title="Privacy & Data">
          <p>Your personal data is processed in accordance with the <Link href="/privacy-policy" className="text-gold underline">Privacy Policy</Link>. By submitting this form, you consent to Propworths contacting you about your account via email, WhatsApp, and phone.</p>
        </Section>

        <Section n="9" title="Governing Law">
          <p>This Agreement is governed by the laws stated in the Platform&apos;s <Link href="/terms-of-use" className="text-gold underline">Terms of Use</Link>. Disputes are handled per the <Link href="/dispute-resolution" className="text-gold underline">Dispute Resolution Policy</Link>.</p>
        </Section>

        <div className="flex flex-wrap gap-4 pt-6">
          <Link href="/list-property" className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">Register &amp; Sign →</Link>
          <Link href="/pricing" className="px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors">Compare Tiers</Link>
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
