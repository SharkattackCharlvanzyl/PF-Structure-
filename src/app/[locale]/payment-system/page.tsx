import Link from "next/link";

export const metadata = {
  title: "Payment System — Propworths",
  description: "How payments work on Propworths. Secure Stripe processing, payment badges, advertiser wallet, history, saved methods, and security.",
};

const PROCESSORS = [
  { icon: "💳", name: "Visa", detail: "Global" },
  { icon: "💳", name: "Mastercard", detail: "Global" },
  { icon: "💳", name: "American Express", detail: "Global" },
  { icon: "🅿️", name: "PayPal", detail: "Global" },
  { icon: "🇿🇦", name: "PayFast", detail: "South Africa" },
  { icon: "⚡", name: "Instant EFT", detail: "SA / EU" },
  { icon: "🏦", name: "Bank Transfer", detail: "All countries" },
  { icon: "📱", name: "Apple Pay / Google Pay", detail: "Supported regions" },
];

const BADGES = [
  { icon: "✅", label: "Verified Seller", detail: "Seller has passed identity and payment verification" },
  { icon: "⭐", label: "Featured Listing", detail: "Paid-for priority placement in search results" },
  { icon: "🔨", label: "Auction-Eligible", detail: "Listing is eligible for online auction format" },
  { icon: "📊", label: "ProVal Available", detail: "AI valuation report available for this property" },
];

const SECURITY = [
  "PCI-DSS Level 1 compliant (via Stripe)",
  "3D-Secure / Strong Customer Authentication for EU / UK",
  "Tokenised card storage — we never see your full card number",
  "Automatic fraud detection on every transaction",
  "Escrow for all auction deposits until auction close",
  "Encrypted in transit (TLS 1.3) and at rest (AES-256)",
];

const FAQ = [
  { q: "When does my card get charged?", a: "At the moment you click 'Pay' and confirm. Your listing goes live within 15 minutes of a successful charge." },
  { q: "Can I cancel a payment?", a: "Card payments can be cancelled before capture. Completed payments follow the refund policy — see Payment Terms." },
  { q: "What if my payment fails?", a: "You'll see an error immediately. No funds are taken. Common causes: expired card, insufficient funds, 3DS failed." },
  { q: "Do you store my card details?", a: "Only a tokenised reference (e.g. Visa ••4242). Full card numbers are held by Stripe, not Propworths." },
  { q: "How do I get a VAT invoice?", a: "An invoice is emailed automatically after every payment. All past invoices live in your dashboard under Billing." },
];

export default function PaymentSystemPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-12 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Payments
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream">
            💳 Secure <span className="italic font-normal text-gold">Payments</span>
          </h1>
          <p className="mt-4 text-cream/70 max-w-2xl mx-auto">
            Stripe-powered card processing, regional wallets, bank transfer, and an advertiser wallet —
            all PCI-DSS compliant and encrypted end-to-end.
          </p>
        </div>
      </header>

      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle label="Accepted Methods" title="Pay any way that works for you" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PROCESSORS.map((p) => (
              <div key={p.name} className="bg-navy-light border border-gold/15 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">{p.icon}</div>
                <div className="font-semibold text-cream text-sm">{p.name}</div>
                <div className="text-xs text-cream/55">{p.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle label="Try It" title="Select a Plan &amp; Pay" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { plan: "Private Seller", price: "$7.50", sub: "per listing / month" },
              { plan: "Agency", price: "$3.00", sub: "per listing / month", featured: true },
              { plan: "Enterprise", price: "$2.00", sub: "per listing / month" },
            ].map((p) => (
              <div key={p.plan} className={`bg-navy-light rounded-2xl p-6 border ${p.featured ? "border-gold" : "border-gold/15"}`}>
                <div className="font-display text-lg font-semibold text-cream mb-1">{p.plan}</div>
                <div className="font-display text-4xl font-bold text-gold">{p.price}</div>
                <div className="text-xs text-cream/55 mb-4">{p.sub}</div>
                <button className="w-full py-2.5 rounded-lg bg-gold text-navy-dark text-sm font-bold hover:bg-gold-light transition-colors">
                  Checkout →
                </button>
              </div>
            ))}
          </div>
          <div className="text-center text-xs text-cream/45 mt-4">This is a demo checkout — real payments flow through Stripe.</div>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle label="Listing Badges" title="Payment Badges for Listings" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BADGES.map((b) => (
              <div key={b.label} className="bg-navy-light border border-gold/15 rounded-xl p-5 text-center">
                <div className="text-3xl mb-2">{b.icon}</div>
                <div className="font-semibold text-cream text-sm mb-1">{b.label}</div>
                <div className="text-xs text-cream/55 leading-relaxed">{b.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-navy-light border border-gold/30 rounded-2xl p-8 text-center">
            <div className="text-xs uppercase tracking-wider text-gold mb-2">💰 Advertiser Wallet</div>
            <div className="font-display text-5xl font-bold text-gold mb-2">$79.00</div>
            <div className="text-sm text-cream/55 mb-6">Used for featured placements, top-of-search boosts, and banner ads.</div>
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="px-5 py-2.5 bg-gold text-navy-dark font-bold rounded-lg text-sm hover:bg-gold-light">+ Top Up</button>
              <button className="px-5 py-2.5 border border-gold/30 text-cream rounded-lg text-sm hover:bg-gold/10">Boost a Listing</button>
            </div>
          </div>
          <div className="bg-navy-light border border-gold/15 rounded-2xl p-6">
            <div className="text-xs uppercase tracking-wider text-gold mb-3">📋 Payment History</div>
            <div className="divide-y divide-gold/10 text-sm">
              {[
                { d: "Today", t: "Listing Fee (Agency)", a: "$852.00" },
                { d: "12 Mar", t: "Featured placement", a: "$25.00" },
                { d: "08 Mar", t: "Wallet top-up", a: "$100.00" },
                { d: "01 Mar", t: "Monthly invoice", a: "$135.00" },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-cream/85">{r.t}</div>
                    <div className="text-xs text-cream/45">{r.d}</div>
                  </div>
                  <div className="font-semibold text-cream">{r.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle label="Saved Methods" title="💳 Saved Payment Methods" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: "💳", name: "Visa •• 4242", exp: "Exp 08/2028", default: true },
              { icon: "💳", name: "Mastercard •• 1847", exp: "Exp 11/2027" },
              { icon: "🅿️", name: "PayPal", exp: "charl@example.com" },
            ].map((m) => (
              <div key={m.name} className={`bg-navy-light rounded-xl p-5 border ${m.default ? "border-gold" : "border-gold/15"}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl">{m.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-cream text-sm">{m.name}</div>
                    <div className="text-xs text-cream/55">{m.exp}</div>
                  </div>
                  {m.default && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-gold text-navy-dark">Default</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle label="Security" title="🔒 Security &amp; Trust" />
          <div className="bg-navy-light border border-gold/15 rounded-2xl p-6">
            <ul className="space-y-3">
              {SECURITY.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm text-cream/75">
                  <span className="text-emerald-400 shrink-0 mt-0.5">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <SectionTitle label="FAQ" title="Payment FAQ" />
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <details
                key={f.q}
                className="bg-navy-light border border-gold/15 rounded-xl group"
                open={i === 0}
              >
                <summary className="cursor-pointer list-none p-4 flex items-center justify-between font-semibold text-cream">
                  <span>{f.q}</span>
                  <span className="text-gold group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-4 pb-4 text-sm text-cream/70 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center bg-navy-light border border-gold/25 rounded-3xl p-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-cream mb-3">Ready to Get Started?</h2>
          <p className="text-cream/65 mb-6">List a property in minutes — pay securely, go live within 15 minutes.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/list-property" className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">List Your Property</Link>
            <Link href="/pricing" className="px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors">View Pricing</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center mb-8">
      <div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-2">{label}</div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-cream" dangerouslySetInnerHTML={{ __html: title }} />
    </div>
  );
}
