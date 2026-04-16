import Link from "next/link";

export const metadata = {
  title: "AI Support Assistant — Propworths",
  description:
    "24/7 AI-powered support assistant on Propworths. Instant answers in 9 languages — powered by Claude.",
};

const LANGUAGES = [
  { flag: "🇬🇧", code: "EN", name: "English" },
  { flag: "🇪🇸", code: "ES", name: "Español" },
  { flag: "🇫🇷", code: "FR", name: "Français" },
  { flag: "🇩🇪", code: "DE", name: "Deutsch" },
  { flag: "🇵🇹", code: "PT", name: "Português" },
  { flag: "🇳🇱", code: "NL", name: "Nederlands" },
  { flag: "🇮🇹", code: "IT", name: "Italiano" },
  { flag: "🇸🇦", code: "AR", name: "العربية" },
  { flag: "🇨🇳", code: "ZH", name: "中文" },
];

const FEATURES = [
  {
    icon: "🤖",
    title: "Powered by Claude",
    text: "Built on Anthropic's Claude model — the same AI that powers leading enterprise assistants. Natural, nuanced answers.",
  },
  {
    icon: "🌍",
    title: "9 Languages",
    text: "Auto-detects the language of your question and responds in kind. Manually switch languages any time from the chat header.",
  },
  {
    icon: "⚡",
    title: "Instant Answers",
    text: "No queue, no wait. Typical response time under 2 seconds. Works 24/7/365, including weekends and holidays.",
  },
  {
    icon: "🏠",
    title: "Platform-Aware",
    text: "Trained on Propworths pricing, listing flow, payments, auctions, and policies. Gives you real answers — not canned replies.",
  },
  {
    icon: "🔒",
    title: "Private by Default",
    text: "Conversations are not used to train the model. Your questions stay between you and the assistant.",
  },
  {
    icon: "📱",
    title: "Works Everywhere",
    text: "Floating chat button appears on every page of Propworths. Open it on desktop, tablet, or mobile — the UX adapts automatically.",
  },
];

const EXAMPLE_QUESTIONS = [
  { q: "How do I list my property for sale?", chip: "🏠 Listings" },
  { q: "What does the Agency pricing tier include?", chip: "💰 Pricing" },
  { q: "How do auction deposits work?", chip: "🔨 Auctions" },
  { q: "Which payment methods do you accept?", chip: "💳 Payments" },
  { q: "How do I reset my password?", chip: "🔑 Account" },
  { q: "What is ProVal and what does it cost?", chip: "📊 Valuation" },
  { q: "Can I auto-sync from my CRM?", chip: "🔗 Feeds" },
  { q: "How do I contact an agent directly?", chip: "💬 Contact" },
];

const CHIPS = ["💰 Pricing plans", "🏠 How to list", "🔨 Auctions", "💳 Payments", "🔑 My account"];

export default function AIChatPage() {
  return (
    <div className="bg-navy text-cream">
      {/* HERO */}
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-16 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Always On
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            AI Support{" "}
            <span className="italic font-normal text-gold">Assistant</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
            24/7 expert answers about listings, pricing, auctions, payments, and your account. In 9
            languages. Powered by Claude.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <div className="bg-navy-light border border-gold/20 rounded-xl px-5 py-4 min-w-[130px]">
              <div className="font-display text-2xl md:text-3xl font-bold text-gold">24/7</div>
              <div className="text-[11px] uppercase tracking-wider text-cream/60 mt-1">Availability</div>
            </div>
            <div className="bg-navy-light border border-gold/20 rounded-xl px-5 py-4 min-w-[130px]">
              <div className="font-display text-2xl md:text-3xl font-bold text-gold">9</div>
              <div className="text-[11px] uppercase tracking-wider text-cream/60 mt-1">Languages</div>
            </div>
            <div className="bg-navy-light border border-gold/20 rounded-xl px-5 py-4 min-w-[130px]">
              <div className="font-display text-2xl md:text-3xl font-bold text-gold">&lt; 2s</div>
              <div className="text-[11px] uppercase tracking-wider text-cream/60 mt-1">Response</div>
            </div>
            <div className="bg-navy-light border border-gold/20 rounded-xl px-5 py-4 min-w-[130px]">
              <div className="font-display text-2xl md:text-3xl font-bold text-gold">Claude</div>
              <div className="text-[11px] uppercase tracking-wider text-cream/60 mt-1">AI Model</div>
            </div>
          </div>
          <p className="mt-10 text-sm text-cream/55">
            Look for the gold chat button in the bottom-right corner of any Propworths page ↘
          </p>
        </div>
      </header>

      {/* CHAT MOCKUP + FEATURES */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Mockup */}
          <div className="bg-navy-light border border-gold/25 rounded-3xl overflow-hidden shadow-2xl">
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-gold/15 bg-navy-dark/60">
              <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-lg">
                🤖
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-cream">Support Assistant</div>
                <div className="flex items-center gap-1.5 text-xs text-cream/55">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  Online — Ready to help
                </div>
              </div>
              <div className="text-xs text-cream/70 border border-gold/20 rounded-lg px-2 py-1">
                🇬🇧 EN
              </div>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 p-4 border-b border-gold/10">
              {CHIPS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="text-xs px-3 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-cream/80 hover:bg-gold/20 transition-colors"
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="p-5 space-y-3 bg-navy/50 min-h-[260px]">
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-gold/15 flex items-center justify-center text-sm shrink-0">🤖</div>
                <div className="max-w-[85%] bg-navy-light border border-gold/15 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-cream/85">
                  👋 Hi! I'm your support assistant. Ask me anything about listings, pricing, payments,
                  auctions, or your account!
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <div className="max-w-[85%] bg-gold/20 border border-gold/40 rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-cream">
                  How does ProVal valuation work?
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-gold/15 flex items-center justify-center text-sm shrink-0">🤖</div>
                <div className="max-w-[85%] bg-navy-light border border-gold/15 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-cream/85">
                  ProVal is our AI property valuation tool. You digitally sign an agreement, pay $124 via
                  Stripe or PayFast, and receive a 24-point valuation report instantly in-browser —
                  available across 185 countries.
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="flex gap-2 p-4 border-t border-gold/15 bg-navy-dark/60">
              <div className="flex-1 bg-navy border border-gold/20 rounded-xl px-3 py-2 text-sm text-cream/50">
                Ask me anything...
              </div>
              <button
                type="button"
                className="w-10 h-10 rounded-xl bg-gold text-navy-dark flex items-center justify-center"
                aria-label="Send"
              >
                ➤
              </button>
            </div>

            <div className="text-xs text-cream/45 text-center py-2 border-t border-gold/10">
              Powered by Claude AI · <Link href="/privacy-policy" className="text-gold hover:underline">Privacy</Link>
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">
              What It Does
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-6">
              Your personal{" "}
              <span className="italic text-gold/85">Propworths guide</span>
            </h2>
            <p className="text-cream/65 mb-8 leading-relaxed">
              Whether you're a first-time buyer, a seasoned agent, or an international investor, the
              assistant answers your question in the language you ask it. No login required. No forms.
              Just a conversation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map((f) => (
                <div key={f.title} className="bg-navy-light border border-gold/15 rounded-xl p-4">
                  <div className="text-2xl mb-2">{f.icon}</div>
                  <div className="font-semibold text-cream text-sm mb-1">{f.title}</div>
                  <p className="text-xs text-cream/60 leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto h-px bg-gold/20" />

      {/* LANGUAGES */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">
            Global Support
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
            9 Languages Supported
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">
            The assistant auto-detects the language of your question and responds in the same language.
            You can also switch manually from the dropdown in the chat header.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
          {LANGUAGES.map((l) => (
            <div
              key={l.code}
              className="bg-navy-light border border-gold/15 rounded-xl p-3 text-center hover:border-gold/40 transition-colors"
            >
              <div className="text-2xl mb-1">{l.flag}</div>
              <div className="text-[10px] font-bold tracking-wider text-gold">{l.code}</div>
              <div className="text-[11px] text-cream/55 mt-1">{l.name}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto h-px bg-gold/20" />

      {/* EXAMPLE QUESTIONS */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <div className="text-[11px] tracking-[0.15em] uppercase text-gold font-semibold mb-3">
            Example Questions
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
            What can I ask?
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto">
            Anything about Propworths — listings, pricing, payments, auctions, valuations, account
            management. Here are a few to get you started.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          {EXAMPLE_QUESTIONS.map((q) => (
            <div
              key={q.q}
              className="flex items-start gap-3 bg-navy-light border border-gold/15 rounded-xl p-4 hover:border-gold/40 transition-colors"
            >
              <span className="text-xs px-2 py-1 rounded-full bg-gold/15 text-gold font-semibold shrink-0">
                {q.chip}
              </span>
              <span className="text-sm text-cream/80">"{q.q}"</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center bg-navy-light border border-gold/25 rounded-3xl p-10 md:p-14">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-cream leading-tight mb-5">
            Ready to <span className="italic text-gold font-normal">chat?</span>
          </h2>
          <p className="text-cream/65 max-w-xl mx-auto mb-8">
            The assistant is available on every page of Propworths. Just tap the gold chat button in the
            bottom-right corner.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors"
            >
              Go to Home → Open Chat
            </Link>
            <Link
              href="/how-it-works"
              className="px-8 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors"
            >
              How Propworths Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
