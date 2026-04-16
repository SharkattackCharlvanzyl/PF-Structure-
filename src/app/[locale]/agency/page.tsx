"use client";
import Link from "next/link";

const HERO_STATS = [
  { val: "$3.00", lbl: "Per Listing / Month" },
  { val: "0%", lbl: "Commission" },
  { val: "185", lbl: "Countries" },
  { val: "20+", lbl: "Feed Systems" },
  { val: "24hr", lbl: "Auto-Sync" },
];

const FLOW_STEPS = [
  { n: 1, icon: "📝", title: "Apply Online", text: "Fill in the partnership application. Tell us about your agency, number of listings, and which CRM or feed system you use." },
  { n: 2, icon: "🤝", title: "Sign Agreement", text: "Review and digitally sign the partnership agreement online. The signed copy is automatically stored on Propworths and emailed to both parties." },
  { n: 3, icon: "🔗", title: "Connect Your Feed", text: "Connect your CRM, MLS, or property management system. We support 20+ feed systems with automated daily sync." },
  { n: 4, icon: "🌍", title: "Go Live Globally", text: "Preview and approve your imported listings. Once approved, they're live across 185 countries instantly." },
];

const BENEFITS = [
  { icon: "🌍", title: "185 Countries", text: "Your listings visible to buyers across every continent. International exposure that no local portal can match." },
  { icon: "💰", title: "Zero Commission", text: "We never take a cut of your sales. You keep 100% of your commission. No referral fees, no hidden charges." },
  { icon: "🔄", title: "Auto-Sync Daily", text: "Connect once, sync forever. New listings, price changes, and status updates flow automatically every 24 hours." },
  { icon: "📊", title: "Analytics Dashboard", text: "Track views, enquiries, click-through rates, and buyer demographics for every listing in real-time." },
  { icon: "📷", title: "30 Photos Per Listing", text: "Every listing gets up to 30 high-resolution photos, 1 video, and 1 virtual walkthrough — no upgrades needed." },
  { icon: "⭐", title: "Featured Badge", text: "Every listing gets a featured badge and priority ranking. No paid tiers — all agencies get the same visibility." },
  { icon: "📱", title: "WhatsApp Enquiries", text: "Buyers can WhatsApp your agents directly from the listing page. Instant communication, no middleman." },
  { icon: "🔨", title: "Auction Eligible", text: "All partner agency listings are eligible for online auctions. List in both sale and auction channels simultaneously." },
  { icon: "🏢", title: "Agency Profile Page", text: "Branded agency page with your logo, team, all listings, reviews, and contact details. SEO optimised." },
  { icon: "📞", title: "Dedicated Support", text: "Partner agencies get priority email support and a dedicated onboarding specialist during your first 30 days." },
  { icon: "🔒", title: "Data Security", text: "Your listing data is encrypted and never shared with competitors. Read-only API access — we never modify your source data." },
  { icon: "📄", title: "No Contracts", text: "Prepaid upfront — no credit extended. Automatic monthly invoice for your records. Cancel anytime with 30 days notice." },
];

const PRICING = [
  {
    plan: "Private Seller",
    range: "1 – 10 listings",
    price: "$7.50",
    features: [
      "30 photos, 1 video, 1 walkthrough",
      "Featured badge + priority ranking",
      "Analytics dashboard",
      "WhatsApp enquiries",
      "Auction eligible",
      "Cancel anytime",
    ],
    featured: false,
  },
  {
    plan: "Agency",
    range: "11 – 2,000 listings",
    price: "$3.00",
    features: [
      "Everything in Private, plus:",
      "Auto-sync from your CRM/feed",
      "Agency profile page",
      "Team member accounts",
      "Dedicated onboarding",
      "Priority support",
    ],
    featured: true,
  },
  {
    plan: "Enterprise",
    range: "2,000+ listings",
    price: "$2.00",
    features: [
      "Everything in Agency, plus:",
      "Custom API integration",
      "Dedicated account manager",
      "SLA guarantee (99.9% uptime)",
      "White-label options",
      "Bulk import tools",
    ],
    featured: false,
  },
];

const FEED_SYSTEMS = [
  { icon: "🏠", name: "Fusion / Prop Data", type: "South Africa" },
  { icon: "📋", name: "Flex MLS", type: "USA / Canada" },
  { icon: "🦊", name: "Rex Software", type: "Australia / NZ" },
  { icon: "🏢", name: "Reapit", type: "UK / Europe" },
  { icon: "📦", name: "AgentBox", type: "Australia" },
  { icon: "☁️", name: "Salesforce Property", type: "Global" },
  { icon: "🏡", name: "Propertybase", type: "Global" },
  { icon: "🧡", name: "HubSpot CRM", type: "Global" },
  { icon: "🇿🇦", name: "Entegral", type: "South Africa" },
  { icon: "🔧", name: "PropCtrl", type: "South Africa" },
  { icon: "🇪🇸", name: "Kyero", type: "Spain / Portugal" },
  { icon: "🇬🇧", name: "Vebra Alto", type: "UK" },
  { icon: "📡", name: "BLM / RETS Feed", type: "USA / Canada" },
  { icon: "📄", name: "XML / JSON Feed", type: "Any custom feed" },
  { icon: "🌐", name: "WordPress + IDX", type: "Any WP site" },
  { icon: "🔲", name: "Wix / Squarespace", type: "Website builders" },
  { icon: "🇿🇦", name: "Property24 / PP", type: "South Africa" },
  { icon: "🇬🇧", name: "Rightmove / Zoopla", type: "UK" },
  { icon: "🇺🇸", name: "Zillow / Realtor", type: "USA" },
  { icon: "🔗", name: "Any Website URL", type: "We scrape & import" },
];

const IMPORT_OPTIONS = [
  {
    icon: "🔄",
    title: "Option 1: Auto-Sync (Recommended)",
    text: "Connect your CRM or feed system and we sync automatically every 24 hours. New listings appear, sold listings disappear, price changes update — all hands-free.",
    best: "Agencies with 50+ listings using a CRM",
    setup: "15–30 minutes",
    maint: "Zero — fully automated",
    highlight: true,
  },
  {
    icon: "📤",
    title: "Option 2: Bulk CSV Upload",
    text: "Download our CSV template, fill in your listings, and upload. We map your data to our fields automatically. Re-upload anytime to update.",
    best: "Agencies with 10–50 listings, no CRM",
    setup: "30–60 minutes (first upload)",
    maint: "Re-upload when listings change",
    highlight: false,
  },
  {
    icon: "✍️",
    title: "Option 3: Manual Entry",
    text: "Use our listing form to add properties one by one. Full control over every field, photo, and description. Ideal for boutique agencies.",
    best: "Small agencies with 1–10 listings",
    setup: "5–10 minutes per listing",
    maint: "Edit individual listings anytime",
    highlight: false,
  },
];

const OBLIGATIONS = [
  { title: "Accurate Listings", text: "All listing information must be accurate and up to date. Prices, availability, photos, and descriptions must reflect the actual property. Misleading or false listings will be removed." },
  { title: "Licensed & Registered", text: "Agency must hold a valid real estate licence or registration in their operating country. We verify credentials during onboarding and may re-verify annually." },
  { title: "Respond Within 48 Hours", text: "Buyer enquiries received through Propworths must be responded to within 48 hours. Persistent non-response may result in listing suspension." },
  { title: "Remove Sold Properties", text: "Sold, let, or withdrawn properties must be removed or marked as such within 7 days. Auto-sync agencies: ensure your CRM status updates are current." },
  { title: "Original Photos Only", text: "All photos must be original and owned by the agency or taken with the owner's permission. Stock photos, watermarked images, and AI-generated images are not permitted." },
  { title: "Fair Dealing", text: "Agencies must comply with local consumer protection and fair trading laws. No bait-and-switch pricing, undisclosed fees, or pressure selling tactics." },
  { title: "Data Privacy", text: "Buyer contact information received through Propworths must be handled in accordance with GDPR, POPIA, and applicable local privacy laws. No unsolicited bulk marketing." },
  { title: "Payment Upfront", text: "All listing fees are prepaid upfront before listings go live. No credit is extended. Choose a billing period (1, 3, 6, or 12 months) and pay in full." },
  { title: "No Duplicate Listings", text: "Each property may only be listed once per agency. Duplicate listings inflate search results and degrade the buyer experience. Duplicates will be merged or removed." },
  { title: "Maintain Feed Connection", text: "Auto-sync agencies must maintain a functioning feed connection. If your feed is down for more than 7 days, listings may be paused until reconnected." },
  { title: "Professional Conduct", text: "All communication with buyers must be professional. Agencies reported for harassment, discrimination, or unprofessional conduct will be reviewed and may be terminated." },
  { title: "Brand Guidelines", text: "When referencing Propworths in your marketing, use our official logo and naming. Do not imply Propworths endorses, values, or guarantees specific properties." },
];

const AGREEMENT_SECTIONS = [
  { title: "📄 Term & Cancellation", body: "The partnership runs for the prepaid billing period you choose (1, 3, 6, or 12 months). Either party may cancel with 30 days written notice. Upon cancellation, listings remain active until the end of the prepaid period. No exit fees, no penalties. Unused prepaid balance is non-refundable but may be used for future listings within 12 months." },
  { title: "💰 Fees & Payment", body: "All fees are prepaid upfront. No credit is extended. Private: $7.50/listing/month (1–10). Agency: $3.00/listing/month (11–2,000). Enterprise: $2.00/listing/month (2,000+). Choose a billing period (1, 3, 6, or 12 months) and pay in full before listings go live. Payment by card, PayPal, EFT, or bank transfer." },
  { title: "🧾 Automatic Monthly Invoice", body: "Propworths automatically issues an invoice on the 2nd of every month for the previous month's actual listing usage. The invoice serves as a tax invoice, a reconciliation of actual listings used vs. prepaid balance, and a statement of remaining prepaid balance carried forward." },
  { title: "🔒 Data Ownership & Privacy", body: "You retain full ownership of all listing data, photos, and content you provide. Propworths has a licence to display this content on our platform and syndication partners only. We never sell your data to competitors. Buyer enquiry data is shared with you exclusively. We comply with GDPR, POPIA, and applicable privacy laws." },
  { title: "📊 Service Level", body: "Propworths commits to 99.5% platform uptime (Enterprise: 99.9% with SLA). Feed syncs run every 24 hours. Enquiries are forwarded within 60 seconds of submission. Support response within 24 hours (Agency) or 4 hours (Enterprise)." },
  { title: "⚖️ Dispute Resolution", body: "All disputes are resolved directly with Propworths head office. Propworths will investigate and provide a resolution within 30 days. Both parties commit to good-faith negotiation. If unresolved within 30 days, the matter may be escalated to independent mediation." },
  { title: "🛡️ Liability & Indemnity", body: "Propworths is a marketplace platform, not a party to any property transaction. We are not liable for the accuracy of listings, the conduct of agents, or the outcome of any sale or rental. Agencies indemnify Propworths against claims arising from their listing content or conduct." },
  { title: "📜 Intellectual Property", body: "Your brand, logos, and content remain your intellectual property. The Propworths name, logo, and platform design are our intellectual property. Neither party may use the other's IP without written consent, except as required to display listings." },
];

const COUNTRIES = ["South Africa", "United Kingdom", "United Arab Emirates", "Portugal", "Spain", "Australia", "USA", "Canada", "Germany", "France", "Other"];
const LISTING_RANGES = ["1 – 10", "11 – 50", "51 – 200", "201 – 500", "501 – 1,000", "1,001 – 2,000", "2,000+"];
const CRM_OPTIONS = ["Fusion / Prop Data", "Flex MLS", "Rex Software", "Reapit", "AgentBox", "Salesforce", "Propertybase", "HubSpot", "Entegral", "PropCtrl", "Kyero", "Vebra Alto", "XML / JSON feed", "WordPress + IDX", "Spreadsheet / Manual", "None", "Other"];

export default function AgencyPage() {
  return (
    <div className="bg-navy text-cream">
      {/* HERO */}
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Agency Partnership
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            Agency Partnership{" "}
            <span className="italic font-normal text-gold">Program</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
            Connect your agency to Propworths. Auto-sync your listings, reach 185 countries, and grow
            your business with zero commission and no contracts.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {HERO_STATS.map((s) => (
              <div key={s.lbl} className="bg-navy-light border border-gold/20 rounded-xl px-5 py-4 min-w-[130px]">
                <div className="font-display text-2xl md:text-3xl font-bold text-gold">{s.val}</div>
                <div className="text-[11px] uppercase tracking-wider text-cream/60 mt-1">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* HOW IT WORKS */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">Getting Started</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
            How Agency Partnership Works
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">
            From sign-up to live listings in 4 simple steps. No lock-in, no commission, cancel anytime.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FLOW_STEPS.map((s) => (
            <div key={s.n} className="bg-navy-light border border-gold/15 rounded-2xl p-6 relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gold text-navy-dark font-bold text-sm flex items-center justify-center">
                {s.n}
              </div>
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-display text-lg font-semibold text-cream mb-2">{s.title}</h3>
              <p className="text-sm text-cream/60 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto h-px bg-gold/20" />

      {/* BENEFITS */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">Benefits</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
            Why Partner With Propworths
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">
            Everything your agency needs to reach a global audience — with the simplest pricing in the industry.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-navy-light border border-gold/15 rounded-2xl p-5 hover:border-gold/40 transition-colors">
              <div className="text-3xl mb-3">{b.icon}</div>
              <h4 className="font-semibold text-cream mb-2">{b.title}</h4>
              <p className="text-sm text-cream/60 leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto h-px bg-gold/20" />

      {/* PRICING */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">Pricing</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">
            Every listing gets the same features. The only difference is volume. No hidden fees, no
            commission, no contracts.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {PRICING.map((p) => (
            <div
              key={p.plan}
              className={`bg-navy-light rounded-2xl p-8 border transition-colors ${
                p.featured
                  ? "border-gold shadow-[0_0_0_1px_rgba(196,164,124,0.4)] md:-translate-y-2"
                  : "border-gold/15"
              }`}
            >
              {p.featured && (
                <div className="inline-block text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded bg-gold text-navy-dark mb-3">
                  Most Popular
                </div>
              )}
              <div className="font-display text-xl font-semibold text-cream mb-1">{p.plan}</div>
              <div className="text-xs text-cream/55 mb-4">{p.range}</div>
              <div className="font-display text-5xl font-bold text-gold mb-1">{p.price}</div>
              <div className="text-xs text-cream/55 mb-6">per listing / month</div>
              <ul className="space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-cream/70">
                    <span className="text-gold shrink-0">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-3xl mx-auto mt-8 p-5 rounded-xl bg-navy-light border border-gold/15 text-center text-sm text-cream/70">
          <strong className="text-cream">All payments are upfront. No credit extended. Automatic invoice on the 2nd of every month.</strong>
          <div className="mt-2 text-xs text-cream/55">
            50 listings × 1 month = $150 · 200 listings × 1 month = $600 · 500 × 3 months = $4,500 ·
            1,000 × 6 months = $18,000 · 2,000 × 12 months = $48,000
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto h-px bg-gold/20" />

      {/* FEED SYSTEMS */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">Integrations</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
            Compatible Feed Systems
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">
            Connect your existing CRM, MLS, or property management system. We support 20+ platforms with
            automated daily sync.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {FEED_SYSTEMS.map((f) => (
            <div key={f.name} className="flex items-center gap-3 bg-navy-light border border-gold/15 rounded-xl p-3 hover:border-gold/40 transition-colors">
              <span className="text-2xl shrink-0">{f.icon}</span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-cream truncate">{f.name}</div>
                <div className="text-[11px] text-cream/55">{f.type}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="max-w-3xl mx-auto mt-8 text-center text-sm text-cream/60">
          <strong className="text-gold">Don't see your system?</strong> Contact us — we build custom
          integrations for Enterprise partners at no extra cost.
        </p>
      </section>

      <div className="max-w-6xl mx-auto h-px bg-gold/20" />

      {/* IMPORT SYSTEM */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">Import Options</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
            Agency Import System
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">
            Three ways to get your listings onto Propworths — choose what works best for your agency.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {IMPORT_OPTIONS.map((o) => (
            <div
              key={o.title}
              className={`bg-navy-light rounded-2xl p-6 border ${
                o.highlight ? "border-gold/60" : "border-gold/15"
              }`}
            >
              <div className="text-3xl mb-3">{o.icon}</div>
              <h3 className="font-semibold text-cream text-sm mb-3">{o.title}</h3>
              <p className="text-sm text-cream/65 leading-relaxed mb-4">{o.text}</p>
              <div className="text-xs text-cream/55 space-y-1">
                <div>
                  <strong className="text-cream/75">Best for:</strong> {o.best}
                </div>
                <div>
                  <strong className="text-cream/75">Setup time:</strong> {o.setup}
                </div>
                <div>
                  <strong className="text-cream/75">Maintenance:</strong> {o.maint}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto h-px bg-gold/20" />

      {/* OBLIGATIONS */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">Partner Standards</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
            Partner Agency Obligations
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">
            To maintain a trusted marketplace for buyers, all partner agencies agree to these standards.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {OBLIGATIONS.map((o) => (
            <div key={o.title} className="bg-navy-light border border-gold/15 rounded-xl p-5">
              <h4 className="font-semibold text-cream mb-2 flex items-center gap-2">
                <span className="text-emerald-400">✓</span> {o.title}
              </h4>
              <p className="text-sm text-cream/60 leading-relaxed">{o.text}</p>
            </div>
          ))}
        </div>
        <p className="max-w-3xl mx-auto mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center text-sm text-cream/75">
          <strong className="text-amber-300">⚠️ Breach of obligations</strong> may result in a warning
          (first offence), listing suspension (second offence), or partnership termination (persistent
          breach). We work with agencies to resolve issues before escalating.
        </p>
      </section>

      <div className="max-w-6xl mx-auto h-px bg-gold/20" />

      {/* AGREEMENT SUMMARY */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">Legal</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
            Partnership Agreement Summary
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">
            Key terms of the agency partnership. Full legal agreement is presented during sign-up.
          </p>
        </div>
        <div className="max-w-4xl mx-auto space-y-3">
          {AGREEMENT_SECTIONS.map((a, i) => (
            <details
              key={a.title}
              className="bg-navy-light border border-gold/15 rounded-xl group"
              open={i === 0}
            >
              <summary className="cursor-pointer list-none p-4 flex items-center justify-between gap-4 font-semibold text-cream">
                <span>{a.title}</span>
                <span className="text-gold group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-4 pb-4 text-sm text-cream/70 leading-relaxed">{a.body}</div>
            </details>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto h-px bg-gold/20" />

      {/* APPLICATION FORM */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">Apply</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
            Apply to Become a Partner
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">
            Fill in the form below and our partnerships team will contact you within 24 hours.
          </p>
        </div>
        <form
          className="max-w-3xl mx-auto bg-navy-light border border-gold/15 rounded-2xl overflow-hidden"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="px-6 py-3 bg-navy-dark/60 border-b border-gold/15 text-xs uppercase tracking-wider font-bold text-gold">
            Agency Details
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Agency Name" required placeholder="e.g. Smith & Partners Real Estate" />
              <Field label="Contact Person" required placeholder="Full name" />
              <Field label="Email" required type="email" placeholder="you@agency.com" />
              <Field label="Phone" required type="tel" placeholder="+27 82 000 0000" />
              <SelectField label="Country" required options={COUNTRIES} />
              <Field label="City / Region" required placeholder="e.g. Cape Town, Western Cape" />
              <SelectField label="Number of Active Listings" required options={LISTING_RANGES} />
              <SelectField label="Current CRM / Feed System" options={CRM_OPTIONS} />
            </div>
            <Field label="Agency Website" type="url" placeholder="https://youragency.com" />
            <Field label="Licence / Registration Number" placeholder="e.g. EAAB FFC 12345 (South Africa)" />
            <div>
              <label className="block text-xs font-semibold text-cream/80 mb-2">
                Property Types You List <span className="text-red-400">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  "🏠 Residential Sale",
                  "🔑 Residential Rental",
                  "🏢 Commercial",
                  "🏭 Industrial",
                  "🌾 Farms",
                  "🏪 Business Sales",
                ].map((t) => (
                  <label key={t} className="flex items-center gap-2 text-sm text-cream/75 bg-navy border border-gold/15 rounded-lg px-3 py-2 cursor-pointer">
                    <input type="checkbox" className="accent-gold" />
                    {t}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-cream/80 mb-2">Additional Notes</label>
              <textarea
                rows={3}
                placeholder="Tell us anything else about your agency, special requirements, or questions..."
                className="w-full bg-navy border border-gold/20 rounded-lg px-3 py-2 text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-gold/60"
              />
            </div>
            <label className="flex items-start gap-3 text-sm text-cream/75">
              <input type="checkbox" className="accent-gold mt-1" />
              <span>
                I confirm this agency is licensed and registered. I agree to the{" "}
                <Link href="/terms-of-use" className="text-gold underline">
                  Terms of Use
                </Link>
                , Listing Agreement, and Partner Obligations.
              </span>
            </label>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gold text-navy-dark font-bold hover:bg-gold-light transition-colors"
            >
              ✍️ Proceed to Sign Agreement
            </button>
            <div className="text-xs text-cream/55 text-center">
              Our partnerships team reviews applications within 24 hours. You'll receive an email with
              next steps.
            </div>
          </div>
        </form>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center bg-navy-light border border-gold/25 rounded-3xl p-10 md:p-14">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-cream leading-tight mb-5">
            Ready to <span className="italic text-gold font-normal">Partner?</span>
          </h2>
          <p className="text-cream/65 max-w-xl mx-auto mb-8">
            Join agencies across 185 countries. Auto-sync your listings, reach global buyers, and grow
            your business with zero commission.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/list-property"
              className="px-8 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors"
            >
              ✍️ Sign Agreement Online
            </Link>
            <a
              href="mailto:agencies@propworths.com"
              className="px-8 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors"
            >
              📧 agencies@propworths.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-cream/80 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-navy border border-gold/20 rounded-lg px-3 py-2 text-sm text-cream placeholder-cream/30 focus:outline-none focus:border-gold/60"
      />
    </div>
  );
}

function SelectField({
  label,
  required,
  options,
}: {
  label: string;
  required?: boolean;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-cream/80 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <select className="w-full bg-navy border border-gold/20 rounded-lg px-3 py-2 text-sm text-cream focus:outline-none focus:border-gold/60">
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
