import Link from "next/link";

export const metadata = {
  title: "Platform Features — Propworths",
  description:
    "The world's most advanced real estate & business platform. 185 countries. AI-powered. From $2 per listing. No contracts.",
};

const HERO_STATS = [
  { num: "185", label: "Countries" },
  { num: "10", label: "Business Sectors" },
  { num: "85+", label: "Sub-Categories" },
  { num: "AI", label: "Powered Platform" },
  { num: "$2", label: "From / Listing" },
];

const TICKER_ITEMS = [
  ["AI Voice Search", "NEW"],
  ["ProVal AI Valuation", "NEW"],
  ["Live Online Auctions", "NEW"],
  ["185 Countries", "ONE PLATFORM"],
  ["Business Marketplace", "10 SECTORS"],
  ["From $2 / Listing", "NO CONTRACTS"],
  ["30 Photos + Video + Portal", "INCLUDED"],
  ["WhatsApp Direct Contact", "NO GATEKEEPERS"],
  ["Smart Neighbourhood Intelligence", "AUTO-POPULATED"],
];

const INDUSTRY_FIRSTS = [
  {
    title: "AI Voice Search",
    body: "Speak naturally in your own language. The first voice-native property search in the African market at international scale.",
  },
  {
    title: "ProVal AI Valuation",
    body: "The industry's first commercially available, payment-gated AI valuation tool. 24 data points, satellite mapping, delivered instantly in-browser.",
  },
  {
    title: "Smart Neighbourhood Intelligence",
    body: "Every listing auto-populates transport, schools, and lifestyle data per country. Zero manual input from agents.",
  },
  {
    title: "Live Online Auction Platform",
    body: "Real-time countdown bidding, verified bidders, digital auction agreements, and anti-fraud controls — all built in.",
  },
  {
    title: "Business-for-Sale Marketplace",
    body: "10 sectors, 85+ sub-categories on the same platform as property. One unified search, globally.",
  },
  {
    title: "Auto-Sync from Any CRM",
    body: "20+ property and 13+ business broker CRM systems. Listings update globally within 24 hours — automatically.",
  },
  {
    title: "Online Contracts & Digital Signatures",
    body: "Every sale, valuation, and auction agreement signed completely in-browser. No printing. No delays.",
  },
  {
    title: "185 Countries, One Search Bar",
    body: "Buy, rent, bid, or buy a business across 185 countries from a single unified platform. No other portal comes close.",
  },
];

const AI_FEATURES = [
  {
    icon: "🎙️",
    title: "AI Voice Search",
    text: "Speak naturally: \"3-bedroom house in Cape Town under 3 million.\" The platform interprets intent, extracts all filters, and returns results instantly — in any language.",
    tag: "First in Africa",
  },
  {
    icon: "📊",
    title: "ProVal Valuation Engine",
    text: "24-point AI property valuation covering comparable sales, flood risk, satellite mapping, neighbourhood intelligence, and rental yield — delivered instantly in-browser for $124.",
    tag: "Industry First",
  },
  {
    icon: "💬",
    title: "24/7 AI Chat Assistant",
    text: "Powered by Claude — instant expert answers in any language, any time of day. Answers platform questions, explains processes, guides buyers. 24/7/365, zero wait time.",
    tag: "Always On",
  },
  {
    icon: "🗺️",
    title: "Smart Neighbourhood Intelligence",
    text: "Transport, schools, healthcare, retail, and security — all auto-populated using AI and Google APIs, adapted per country. An agent in Dubai gets different data to one in Cape Town.",
    tag: "Country-Smart",
  },
  {
    icon: "⚖️",
    title: "4-Property Comparison Tool",
    text: "Compare up to four properties side-by-side across price, size, features, location, and financials simultaneously — no more browser tab juggling.",
    tag: "Built In",
  },
  {
    icon: "🔔",
    title: "Smart Alerts System",
    text: "Buyers save search criteria and receive instant notifications when matching properties go live — via email, WhatsApp, or push notification.",
    tag: "Instant",
  },
];

const PROVAL_STEPS = [
  "View the property listing — address auto-populated via Google Maps globally",
  "View a complete example valuation report before committing to purchase",
  "Sign the ProVal agreement digitally in-browser — unique reference auto-generated",
  "Secure payment of $124 USD via Stripe or PayFast — button unlocks instantly",
  "Full AI valuation report delivered immediately in-browser",
];

const PROVAL_POINTS = [
  "Comparable active sales",
  "Comparable sold prices",
  "Price per sqm trends",
  "Active market listings",
  "Flood risk zone",
  "School proximity",
  "Public transport access",
  "Shopping & retail",
  "Healthcare facilities",
  "Crime index data",
  "Zoning & planning",
  "Satellite map view",
  "Security features",
  "Smart home technology",
  "Pool & leisure features",
  "Interior finishes graded",
  "Energy & utility ratings",
  "Neighbourhood overview",
  "Legal & ownership status",
  "Costs & levies",
  "Outdoor features",
  "Parking & access",
  "Rental yield potential",
  "Comfort systems assessed",
];

const CATEGORIES = [
  {
    icon: "🏠",
    title: "Residential Sales",
    text: "Houses, apartments, estates — 30 photos, video, virtual tour, 25+ attributes per listing.",
    span: "md:col-span-4",
  },
  {
    icon: "🏢",
    title: "Commercial & Industrial",
    text: "Offices, warehouses, factories — with zoning, GLA, loading bays, power supply, and freight intelligence.",
    span: "md:col-span-4",
  },
  {
    icon: "🌾",
    title: "Farms & Agricultural",
    text: "Total hectares, water rights, dams, irrigation, livestock capacity, outbuildings — global farm listings.",
    span: "md:col-span-4",
  },
  {
    icon: "🏗️",
    title: "New Developments",
    text: "Phase releases, unit types, completion dates, off-plan pricing, deposit structures, and developer profiles all in one place.",
    span: "md:col-span-6",
  },
  {
    icon: "🏖️",
    title: "Short-Stay & Holiday Rentals",
    text: "Nightly and weekly pricing, amenities, house rules, instant book, and seasonal rate management built in.",
    span: "md:col-span-6",
  },
  {
    bigNum: "85+",
    title: "Business Sub-Categories",
    text: "The most granular business-for-sale platform in the world.",
    span: "md:col-span-4",
  },
  {
    icon: "🔨",
    title: "Live Online Auctions",
    text: "Residential, commercial, industrial, and farm auctions with real-time countdown bidding, verified bidders, digital auction agreements, buyer deposit management, and anti-fraud controls. Every property type is auction-eligible.",
    span: "md:col-span-8",
  },
];

const BUSINESS_SECTORS = [
  { num: "01", name: "Restaurants & Food Service", sub: "11 sub-categories incl. cloud kitchens & food trucks" },
  { num: "02", name: "Retail & Commerce", sub: "12 sub-categories incl. e-commerce & pharmacy" },
  { num: "03", name: "Technology Services", sub: "12 sub-categories incl. SaaS & cybersecurity" },
  { num: "04", name: "Hospitality & Tourism", sub: "11 sub-categories incl. lodges, safaris & glamping" },
  { num: "05", name: "Manufacturing & Industrial", sub: "15 sub-categories incl. cold storage & recycling" },
  { num: "06", name: "Franchises", sub: "15 sub-categories across food, retail, fitness & more" },
  { num: "07", name: "Healthcare & Medical", sub: "12 sub-categories incl. dental, veterinary & aesthetics" },
  { num: "08", name: "Automotive", sub: "12 sub-categories incl. EV specialist & fleet" },
  { num: "09", name: "Agriculture & Farming", sub: "15 sub-categories incl. hydroponics & aquaculture" },
  { num: "10", name: "Professional Services", sub: "12 sub-categories incl. law, accounting & engineering" },
];

const REGIONS = [
  { flag: "🌍", count: "40+", name: "African Countries" },
  { flag: "🌍", count: "40+", name: "European Countries" },
  { flag: "🌏", count: "33", name: "Asia & Middle East" },
  { flag: "🌎", count: "28", name: "The Americas" },
  { flag: "🌏", count: "8", name: "Oceania" },
  { flag: "💳", count: "8", name: "Payment Methods" },
];

const PRICING = [
  {
    plan: "Private Seller",
    amount: "7.50",
    period: "per listing / per month • 1–10 listings",
    featured: false,
    features: [
      "30 high-resolution photos",
      "1 video + 1 portal walkthrough",
      "Full property detail page",
      "WhatsApp, email & phone contact",
      "Featured badge & priority ranking",
      "Full analytics dashboard",
      "185-country exposure",
      "Auction eligibility included",
    ],
    audience: "Private sellers & landlords. Cancel anytime.",
  },
  {
    plan: "Agency",
    amount: "3.00",
    period: "per listing / per month • 11–2,000 listings",
    featured: true,
    features: [
      "30 high-resolution photos",
      "1 video + 1 portal walkthrough",
      "Full property detail page",
      "WhatsApp, email & phone contact",
      "Featured badge & priority ranking",
      "Full analytics dashboard",
      "185-country exposure",
      "Auto-sync & social promotion",
    ],
    audience: "Agents, brokers & developers. Cancel anytime.",
  },
  {
    plan: "Enterprise",
    amount: "2.00",
    period: "per listing / per month • 2,000+ listings",
    featured: false,
    features: [
      "30 high-resolution photos",
      "1 video + 1 portal walkthrough",
      "Full property detail page",
      "WhatsApp, email & phone contact",
      "Featured badge & priority ranking",
      "Full analytics dashboard",
      "185-country exposure",
      "White-label & dedicated manager",
    ],
    audience: "Portals, large developers & franchises. Cancel anytime.",
  },
];

type Cell = "yes" | "no" | "dash" | string;
const COMPARISON_ROWS: { feature: string; cells: [Cell, Cell, Cell, Cell] }[] = [
  { feature: "International reach (185 countries)", cells: ["✓ Included", "no", "no", "no"] },
  { feature: "Pay-per-listing (no contracts)", cells: ["✓ Always", "no", "no", "Sometimes"] },
  { feature: "Pricing from $2/month per listing", cells: ["✓", "no", "no", "dash"] },
  { feature: "Live online auction platform", cells: ["✓ Built in", "no", "dash", "no"] },
  { feature: "WhatsApp direct contact", cells: ["✓ All listings", "no", "dash", "dash"] },
  { feature: "AI voice search", cells: ["✓ Native", "no", "no", "no"] },
  { feature: "30 photos + video + portal walkthrough", cells: ["✓ Every listing", "dash", "Sometimes", "dash"] },
  { feature: "Auto-sync from your CRM / feed", cells: ["✓ 20+ systems", "no", "dash", "no"] },
  { feature: "Business-for-sale marketplace", cells: ["✓ 10 sectors", "no", "no", "dash"] },
  { feature: "5 professional financial calculators", cells: ["✓ Free", "dash", "no", "no"] },
  { feature: "Full analytics dashboard", cells: ["✓ Included", "Extra cost", "Extra cost", "no"] },
  { feature: "Native language interface", cells: ["✓ Auto-detect", "no", "no", "dash"] },
  { feature: "Open to private sellers", cells: ["✓ Everyone", "no", "no", "Sometimes"] },
];

const CALCULATORS = [
  { icon: "🏠", title: "Mortgage", desc: "Loan amount, rate, term → monthly instalment, total repayment, full amortisation schedule" },
  { icon: "💰", title: "Affordability", desc: "Net income, expenses, deposit → maximum qualifying bond, stress-tested against bank criteria" },
  { icon: "📋", title: "Transfer Cost", desc: "Country-specific transfer duty, conveyancing fees, bond registration — 6+ countries supported" },
  { icon: "📈", title: "Rental Yield", desc: "Purchase price, monthly rent → gross yield, net yield, cap rate, cash-on-cash return" },
  { icon: "🏦", title: "Bond Calculator", desc: "Bond amount, term, rate → full amortisation table, interest vs capital, early settlement savings" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-block text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">
      {children}
    </div>
  );
}

function SectionHeading({ main, em }: { main: React.ReactNode; em: string }) {
  return (
    <h2 className="font-display text-3xl md:text-4xl font-bold text-cream leading-tight mb-4">
      {main}
      <span className="block italic font-normal text-gold/85 mt-1">{em}</span>
    </h2>
  );
}

function renderCell(cell: Cell, highlight = false) {
  if (cell === "no") return <span className="text-red-400/70">✗</span>;
  if (cell === "dash") return <span className="text-cream/30">—</span>;
  const isCheck = typeof cell === "string" && cell.startsWith("✓");
  return (
    <span className={isCheck ? (highlight ? "text-gold font-semibold" : "text-emerald-400") : "text-cream/70"}>
      {cell}
    </span>
  );
}

export default function FeaturesPage() {
  return (
    <div className="bg-navy text-cream">
      {/* local keyframes for marquee + globe ring rotation */}
      <style>{`
        @keyframes pf-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes pf-spin-slow { from { transform: rotate(0); } to { transform: rotate(360deg); } }
        @keyframes pf-spin-rev { from { transform: rotate(0); } to { transform: rotate(-360deg); } }
        .pf-marquee { animation: pf-marquee 40s linear infinite; }
        .pf-spin-slow { animation: pf-spin-slow 60s linear infinite; transform-origin: 50% 50%; }
        .pf-spin-rev { animation: pf-spin-rev 45s linear infinite; transform-origin: 50% 50%; }
      `}</style>

      {/* HERO */}
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-20 text-center px-4">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            New to the Property Industry
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-tight">
            Property{" "}
            <span className="italic font-normal text-gold">Redefined</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-cream/70 max-w-2xl mx-auto">
            The world's most advanced real estate &amp; business platform
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-6">
            {HERO_STATS.map((s) => (
              <div
                key={s.label}
                className="bg-navy-light border border-gold/20 rounded-xl px-5 py-4 min-w-[120px]"
              >
                <div className="font-display text-2xl md:text-3xl font-bold text-gold">{s.num}</div>
                <div className="text-[11px] uppercase tracking-wider text-cream/60 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-16 h-px w-24 bg-gold/40" />
        </div>
      </header>

      {/* TICKER */}
      <div className="overflow-hidden border-y border-gold/15 bg-navy-dark/50 py-4">
        <div className="pf-marquee flex whitespace-nowrap gap-10 w-max">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map(([label, tag], i) => (
            <span key={i} className="flex items-center gap-2 text-sm text-cream/70">
              <span>{label}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gold/15 text-gold">
                {tag}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* INDUSTRY FIRSTS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <SectionLabel>Industry Firsts</SectionLabel>
          <SectionHeading main="Features Never Seen" em="in Property Before" />
          <p className="text-cream/60 max-w-2xl mx-auto">
            Propworths introduces technology that simply doesn't exist anywhere else in the
            property industry — at this scale, at this price.
          </p>
        </div>
        <div className="max-w-6xl mx-auto bg-navy-light border border-gold/15 rounded-2xl p-6 md:p-10">
          <div className="text-center mb-8">
            <SectionLabel>Groundbreaking</SectionLabel>
            <div className="font-display text-2xl md:text-3xl font-bold text-cream">
              What Propworths <span className="italic text-gold/85">brings to the world</span>
            </div>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {INDUSTRY_FIRSTS.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="text-gold shrink-0 mt-1">✦</span>
                <p className="text-sm md:text-base text-cream/75 leading-relaxed">
                  <strong className="text-gold font-semibold">{item.title}</strong> — {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="max-w-6xl mx-auto h-px bg-gold/20" />

      {/* AI FEATURES */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <SectionLabel>Technology</SectionLabel>
          <SectionHeading main="Built on" em="Artificial Intelligence" />
          <p className="text-cream/60 max-w-2xl mx-auto">
            Six AI-powered features work seamlessly together — from the moment a buyer arrives to the
            moment contracts are signed.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AI_FEATURES.map((card) => (
            <div
              key={card.title}
              className="bg-navy-light border border-gold/15 rounded-2xl p-6 hover:border-gold/40 transition-colors"
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <div className="font-display text-lg font-semibold text-cream mb-2">{card.title}</div>
              <p className="text-sm text-cream/60 leading-relaxed mb-4">{card.text}</p>
              <span className="inline-block text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded bg-gold/15 text-gold">
                {card.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto h-px bg-gold/20" />

      {/* PROVAL */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <SectionLabel>ProVal</SectionLabel>
          <SectionHeading main="The World's First" em="AI Valuation Platform" />
          <p className="text-cream/60 max-w-2xl mx-auto">
            Payment-gated. Digitally signed. Instantly delivered. 24 research points. Available across
            185 countries.
          </p>
        </div>
        <div className="max-w-6xl mx-auto bg-navy-light border border-gold/20 rounded-2xl p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <SectionLabel>How It Works</SectionLabel>
            <div className="font-display text-xl md:text-2xl font-bold text-cream mb-6">
              Five steps from <span className="italic text-gold/85">listing to valuation</span>
            </div>
            <ol className="space-y-3 list-none">
              {PROVAL_STEPS.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-cream/75 leading-relaxed">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-gold text-navy-dark font-bold flex items-center justify-center text-xs">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <Link
              href="/valuate"
              className="inline-block mt-8 px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors"
            >
              Try ProVal — $124
            </Link>
          </div>
          <div>
            <SectionLabel>24 Data Points Analysed</SectionLabel>
            <div className="grid grid-cols-2 gap-2">
              {PROVAL_POINTS.map((p) => (
                <div
                  key={p}
                  className="text-xs text-cream/70 bg-navy/60 border border-gold/10 rounded-md px-3 py-2"
                >
                  ✓ {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto h-px bg-gold/20" />

      {/* CATEGORIES BENTO */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <SectionLabel>What You Can List</SectionLabel>
          <SectionHeading main="Every Property Type," em="One Platform" />
          <p className="text-cream/60 max-w-2xl mx-auto">
            From a holiday apartment in Bali to a 5,000-hectare farm in South Africa — and every business
            type in between.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
          {CATEGORIES.map((c) => (
            <div
              key={c.title}
              className={`${c.span} col-span-1 bg-navy-light border border-gold/15 rounded-2xl p-6 hover:border-gold/40 transition-colors`}
            >
              {c.bigNum ? (
                <div className="font-display text-5xl font-bold text-gold mb-2">{c.bigNum}</div>
              ) : (
                <div className="text-3xl mb-3">{c.icon}</div>
              )}
              <div className="font-display text-lg font-semibold text-cream mb-2">{c.title}</div>
              <p className="text-sm text-cream/60 leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto h-px bg-gold/20" />

      {/* BUSINESS SECTORS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <SectionLabel>Business Marketplace</SectionLabel>
          <SectionHeading main="10 Sectors," em="85+ Sub-Categories" />
          <p className="text-cream/60 max-w-2xl mx-auto">
            One of the most granular business-for-sale platforms on earth. Every listing gets 30 photos,
            video, full detail page, WhatsApp contact, and 185-country exposure.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BUSINESS_SECTORS.map((s) => (
            <div
              key={s.num}
              className="flex gap-4 bg-navy-light border border-gold/15 rounded-xl p-5 hover:border-gold/40 transition-colors"
            >
              <div className="font-display text-2xl font-bold text-gold/50 shrink-0 w-10">{s.num}</div>
              <div>
                <div className="font-semibold text-cream">{s.name}</div>
                <div className="text-xs text-cream/55 mt-1">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto text-center mt-10">
          <Link
            href="/business"
            className="inline-block px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors"
          >
            Explore Business Marketplace →
          </Link>
        </div>
      </section>

      <div className="max-w-6xl mx-auto h-px bg-gold/20" />

      {/* GLOBAL COVERAGE */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel>Global Reach</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream leading-tight mb-4">
              <span className="italic font-normal text-gold">185 Countries</span>
              <span className="block">One Platform</span>
            </h2>
            <p className="text-cream/60 mb-8">
              Auto-detecting language, currency, and region the moment a buyer lands — Propworths is
              already speaking their language before they type a word.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {REGIONS.map((r) => (
                <li
                  key={r.name}
                  className="flex items-center gap-3 bg-navy-light border border-gold/15 rounded-xl p-3"
                >
                  <span className="text-2xl">{r.flag}</span>
                  <div>
                    <div className="font-display text-lg font-bold text-gold">{r.count}</div>
                    <div className="text-xs text-cream/60">{r.name}</div>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/countries"
              className="inline-block mt-8 px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors"
            >
              Browse all 185 countries →
            </Link>
          </div>

          {/* Globe SVG */}
          <div className="relative flex items-center justify-center min-h-[360px]">
            <div className="relative w-[320px] h-[320px] md:w-[380px] md:h-[380px]">
              <svg viewBox="0 0 380 380" className="absolute inset-0 pf-spin-slow">
                <circle cx="190" cy="190" r="178" fill="none" stroke="rgba(196,164,124,0.12)" strokeWidth="1" />
                <circle cx="190" cy="190" r="178" fill="none" stroke="rgba(196,164,124,0.35)" strokeWidth="1" strokeDasharray="8 22" strokeLinecap="round" />
              </svg>
              <svg viewBox="0 0 380 380" className="absolute inset-0 pf-spin-rev">
                <circle cx="190" cy="190" r="148" fill="none" stroke="rgba(196,164,124,0.08)" strokeWidth="1" />
                <circle cx="190" cy="190" r="148" fill="none" stroke="rgba(196,164,124,0.25)" strokeWidth="1" strokeDasharray="4 14" strokeLinecap="round" />
              </svg>
              <svg viewBox="0 0 380 380" className="absolute inset-0 pf-spin-slow">
                <circle cx="190" cy="190" r="110" fill="none" stroke="rgba(196,164,124,0.15)" strokeWidth="1" strokeDasharray="40 8" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="font-display text-6xl md:text-7xl font-bold text-gold leading-none">185</div>
                <div className="text-sm uppercase tracking-widest text-cream/60 mt-2">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto h-px bg-gold/20" />

      {/* PRICING */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <SectionLabel>Transparent Pricing</SectionLabel>
          <SectionHeading main="No Hidden Fees." em="No Lock-in. Ever." />
          <p className="text-cream/60 max-w-2xl mx-auto">
            Every listing type — sales, rentals, business, auctions — gets identical features. Cancel
            anytime. No commission deducted at listing stage.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {PRICING.map((p) => (
            <div
              key={p.plan}
              className={`bg-navy-light rounded-2xl p-8 border transition-colors ${
                p.featured
                  ? "border-gold shadow-[0_0_0_1px_rgba(196,164,124,0.4)] md:-translate-y-2"
                  : "border-gold/15 hover:border-gold/40"
              }`}
            >
              {p.featured && (
                <div className="inline-block text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded bg-gold text-navy-dark mb-3">
                  Most Popular
                </div>
              )}
              <div className="font-display text-xl font-semibold text-cream mb-2">{p.plan}</div>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-gold text-2xl font-bold">$</span>
                <span className="font-display text-5xl font-bold text-gold">{p.amount}</span>
              </div>
              <div className="text-xs text-cream/55 mb-6">{p.period}</div>
              <ul className="space-y-2 mb-6">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-cream/70">
                    <span className="text-gold shrink-0">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="text-xs text-cream/50 italic">{p.audience}</div>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto text-center mt-10">
          <Link
            href="/pricing"
            className="inline-block px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors"
          >
            View full pricing →
          </Link>
        </div>
      </section>

      <div className="max-w-6xl mx-auto h-px bg-gold/20" />

      {/* COMPARISON */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <SectionLabel>The Old Way vs The New Way</SectionLabel>
          <SectionHeading main="How We Compare to" em="Traditional Portals" />
          <p className="text-cream/60 max-w-2xl mx-auto">
            For too long, agents and sellers have been overcharged, locked in, and underserved. That
            changes now.
          </p>
        </div>
        <div className="max-w-6xl mx-auto bg-navy-light border border-gold/15 rounded-2xl overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-gold/20">
                <th className="text-left px-4 py-4 text-cream/80 font-semibold">Feature</th>
                <th className="px-3 py-4 text-gold font-display text-base bg-gold/10">Propworths</th>
                <th className="px-3 py-4 text-cream/60 font-medium">Traditional Portals</th>
                <th className="px-3 py-4 text-cream/60 font-medium">Agency Platforms</th>
                <th className="px-3 py-4 text-cream/60 font-medium">Classified Sites</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} className="border-b border-gold/10 last:border-0">
                  <td className="px-4 py-3 text-cream/80">{row.feature}</td>
                  <td className="px-3 py-3 text-center bg-gold/5">{renderCell(row.cells[0], true)}</td>
                  <td className="px-3 py-3 text-center">{renderCell(row.cells[1])}</td>
                  <td className="px-3 py-3 text-center">{renderCell(row.cells[2])}</td>
                  <td className="px-3 py-3 text-center">{renderCell(row.cells[3])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="max-w-6xl mx-auto h-px bg-gold/20" />

      {/* CALCULATORS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <SectionLabel>Financial Tools</SectionLabel>
          <SectionHeading main="5 Professional" em="Calculators — All Free" />
          <p className="text-cream/60 max-w-2xl mx-auto">
            Built directly into the platform. No third-party tools. No upsells. Available to every buyer
            and seller at no extra cost.
          </p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CALCULATORS.map((c) => (
            <div
              key={c.title}
              className="bg-navy-light border border-gold/15 rounded-2xl p-5 hover:border-gold/40 transition-colors text-center"
            >
              <div className="text-3xl mb-3">{c.icon}</div>
              <div className="font-display text-base font-semibold text-cream mb-2">{c.title}</div>
              <p className="text-xs text-cream/55 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto text-center mt-10">
          <Link
            href="/calculators"
            className="inline-block px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors"
          >
            Open Calculators →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-navy-light border border-gold/25 rounded-3xl p-10 md:p-14">
          <SectionLabel>Join the Platform</SectionLabel>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-cream leading-tight mb-5">
            The Future of Property
            <span className="block italic font-normal text-gold/85 mt-1">Starts Here</span>
          </h2>
          <p className="text-cream/65 max-w-xl mx-auto mb-8">
            185 countries. AI-powered. From $2 a listing. No contracts. No hidden fees. Built for agents,
            sellers, buyers, and businesses worldwide.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/list-property"
              className="px-8 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors"
            >
              List Your Property
            </Link>
            <Link
              href="/auctions"
              className="px-8 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors"
            >
              Explore the Platform
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER TICKER */}
      <div className="overflow-hidden border-t border-gold/15 bg-navy-dark/50 py-4">
        <div className="pf-marquee flex whitespace-nowrap gap-10 w-max">
          {[
            ["Propworths", "2026"],
            ["185 Countries", "✦"],
            ["10 Business Sectors", "✦"],
            ["AI Powered", "✦"],
            ["From $2 / Listing", "✦"],
            ["No Contracts", "✦"],
            ["Cancel Anytime", "✦"],
            ["Propworths", "2026"],
            ["185 Countries", "✦"],
            ["10 Business Sectors", "✦"],
            ["AI Powered", "✦"],
            ["From $2 / Listing", "✦"],
            ["No Contracts", "✦"],
            ["Cancel Anytime", "✦"],
          ].map(([label, tag], i) => (
            <span key={i} className="flex items-center gap-2 text-sm text-cream/70">
              <span>{label}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gold/15 text-gold">
                {tag}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
