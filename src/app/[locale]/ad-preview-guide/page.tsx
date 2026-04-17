import Link from "next/link";

export const metadata = {
  title: "Ad Preview Guide — Propworths Advertising",
  description: "See your ad on a real phone — 6 mobile ad formats, real prices, real advertisers. Pay-per-click only, $50 minimum to start.",
};

const FORMATS = [
  { name: "Mobile Leaderboard", dims: "320 × 50 px", cpc: "$0.08", best: "Legal · Finance · Services · Agents", note: "Lowest CPC — sticky top/bottom" },
  { name: "Leaderboard", dims: "728 × 90 px", cpc: "$0.10", best: "Desktop browsing · Brand awareness" },
  { name: "Medium Rectangle", dims: "300 × 250 px", cpc: "$0.12", best: "All advertisers · Standard IAB unit" },
  { name: "Large Rectangle", dims: "336 × 280 px", cpc: "$0.14", best: "Home services · Real estate agents" },
  { name: "Half-Page", dims: "300 × 600 px", cpc: "$0.15", best: "Premium brands · Luxury", featured: true },
  { name: "Wide Skyscraper", dims: "160 × 600 px", cpc: "$0.18", best: "High-intent campaigns" },
];

const STEPS = [
  { ico: "💰", title: "Deposit Budget", desc: "Load $50 minimum into your ad wallet. Unused balance never expires." },
  { ico: "📱", title: "Ad Goes Live", desc: "Your ad appears to buyers browsing listings in your target area." },
  { ico: "👆", title: "Someone Clicks", desc: "Only when a real buyer taps your ad does your balance decrease." },
  { ico: "📊", title: "Track Results", desc: "See every click, spend, and CTR in real-time in your dashboard." },
];

export default function AdPreviewGuidePage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-12 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            📱 Real Device Previews
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            See your ad on a{" "}
            <span className="italic font-normal text-gold">real phone</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
            Exactly how your Propworths ad appears on real mobile screens — 6 ad formats, real prices, showing exactly what buyers will see.
          </p>
          <Link href="/advertise" className="inline-block mt-8 px-8 py-3 bg-gold text-navy-dark font-bold rounded-full hover:bg-gold-light transition-colors">
            ← Back to Advertise
          </Link>
        </div>
      </header>

      <section className="py-16 px-4 bg-gradient-to-br from-gold/15 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-display text-4xl md:text-5xl font-bold text-gold mb-3" style={{ textShadow: "0 0 30px rgba(196,164,124,0.4)" }}>
            YOU ONLY PAY PER CLICK
          </div>
          <p className="text-cream/80 text-lg mb-4">Not per impression. Not per day. Only when someone taps your ad.</p>
          <p className="text-cream/60 max-w-2xl mx-auto leading-relaxed">
            Every dollar you spend goes directly towards real people clicking your ad and landing on your website. No wasted budget on people who scroll past. If nobody clicks — you pay nothing. Zero.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            {[
              ["✅", "Zero impression charge"],
              ["💰", "$50 minimum to start"],
              ["📊", "Real-time click tracking"],
              ["⏹️", "Pause or stop anytime"],
              ["🔒", "No contracts"],
            ].map(([ico, t]) => (
              <div key={t} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-navy-light text-sm">
                <span>{ico}</span>
                <span className="text-cream/80">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs uppercase tracking-wider text-gold font-semibold mb-2">All 6 Ad Formats</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream">Every format. Every price. One platform.</h2>
            <p className="text-cream/60 max-w-2xl mx-auto mt-3 text-sm">Real ads shown on real mobile screens — exactly as buyers see them when browsing Propworths listings across 185 countries.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FORMATS.map((f) => (
              <div key={f.name} className={`rounded-2xl p-6 text-center relative ${f.featured ? "border-gold bg-gold/5" : "border-gold/15 bg-navy-light"} border hover:border-gold/40 transition-colors`}>
                {f.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-gold text-navy-dark text-[10px] font-bold uppercase tracking-wider">Most Popular</div>}
                <div className="text-xs uppercase tracking-wider text-cream/60 mb-1">{f.name}</div>
                <div className="text-xs text-cream/40 mb-3">{f.dims}</div>
                <div className="font-display text-4xl font-bold text-gold mb-1">{f.cpc}</div>
                <div className="text-xs text-cream/60 mb-4">per click</div>
                <div className="text-xs text-cream/70 mb-4">Best for: {f.best}</div>
                <Link href="/advertise" className="block w-full px-4 py-2 rounded-lg border border-gold/30 text-gold text-sm font-semibold hover:bg-gold hover:text-navy-dark transition-colors">
                  Book this format →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-navy-dark/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="font-display text-3xl md:text-4xl font-bold text-gold mb-3">How PPC works</div>
            <p className="text-cream/60 max-w-xl mx-auto text-sm">No impression fees. No daily rates. No wasted budget. Every cent = a real person who clicked your ad.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((s) => (
              <div key={s.title} className="bg-navy-light border border-gold/15 rounded-xl p-5 text-center">
                <div className="text-3xl mb-2">{s.ico}</div>
                <div className="font-semibold text-cream mb-1">{s.title}</div>
                <div className="text-xs text-cream/60 leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-gold/20 to-gold/5 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
            Ready to <span className="text-gold">advertise on Propworths?</span>
          </h2>
          <p className="text-cream/75 mb-8">Get your ad live on mobile screens in 185 countries. $50 minimum. Zero contracts. Pay only when someone clicks.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/advertise" className="px-8 py-3 bg-gold text-navy-dark font-bold rounded-full hover:bg-gold-light">🚀 Start Advertising</Link>
            <Link href="/pricing" className="px-8 py-3 border-2 border-gold/40 text-gold rounded-full hover:bg-gold/10">View Pricing</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
