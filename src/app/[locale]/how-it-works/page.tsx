"use client";
import { useTranslations } from "next-intl";

const STEPS = [
  { key: "register", icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" },
  { key: "list", icon: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { key: "market", icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" },
  { key: "connect", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
  { key: "negotiate", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
  { key: "close", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
];

const ROLES = ["sellers", "buyers", "agents", "developers"];

export default function HowItWorksPage() {
  const t = useTranslations("howItWorks");

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl text-gold font-bold mb-3">{t("title")}</h1>
        <p className="text-cream/60 text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
      </div>

      {/* Steps */}
      <div className="relative mb-20">
        <div className="hidden md:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-gold/10" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.key} className="text-center relative">
              <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4 relative z-10">
                <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                </svg>
              </div>
              <span className="text-gold/40 text-xs font-bold mb-1 block">{"0" + (i + 1)}</span>
              <h3 className="text-cream font-semibold text-sm mb-2">{t("steps." + step.key + ".title")}</h3>
              <p className="text-cream/40 text-xs leading-relaxed">{t("steps." + step.key + ".description")}</p>
            </div>
          ))}
        </div>
      </div>

      {/* For Each Role */}
      <h2 className="font-display text-2xl text-gold font-semibold mb-8 text-center">{t("forYou")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {ROLES.map((role) => (
          <div key={role} className="bg-navy-light border border-gold/10 rounded-2xl p-6">
            <h3 className="font-display text-xl text-gold font-semibold mb-3">{t("roles." + role + ".title")}</h3>
            <p className="text-cream/50 text-sm mb-4">{t("roles." + role + ".description")}</p>
            <ul className="space-y-2">
              {[0, 1, 2].map((i) => (
                <li key={i} className="flex items-center gap-2 text-cream/60 text-sm">
                  <svg className="w-4 h-4 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  {t("roles." + role + ".benefits." + i)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-navy-light border border-gold/10 rounded-2xl p-8 text-center">
        <h2 className="font-display text-2xl text-cream font-semibold mb-3">{t("ctaTitle")}</h2>
        <p className="text-cream/50 mb-6">{t("ctaDescription")}</p>
        <div className="flex gap-4 justify-center">
          <a href="/list-property" className="px-8 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">{t("listProperty")}</a>
          <a href="/buy" className="px-8 py-3 border border-gold/30 text-gold rounded-xl hover:border-gold transition-colors">{t("browseProperties")}</a>
        </div>
      </div>
    </div>
  );
}
