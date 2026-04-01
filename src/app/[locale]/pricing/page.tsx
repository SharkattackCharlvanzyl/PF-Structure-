"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

const PLANS = ["starter", "professional", "enterprise", "premium"];
const FEATURES = ["listings", "photos", "analytics", "support", "featured", "virtualTours", "socialMedia", "dedicatedAgent", "customBranding", "apiAccess"];

export default function PricingPage() {
  const t = useTranslations("pricing");
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [selectedPlan, setSelectedPlan] = useState("");

  const planColors: Record<string, string> = {
    starter: "border-cream/20",
    professional: "border-gold",
    enterprise: "border-purple-400",
    premium: "border-blue-400",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl text-gold font-bold mb-3">{t("title")}</h1>
        <p className="text-cream/60 text-lg mb-8">{t("subtitle")}</p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center bg-navy-light rounded-xl p-1 gap-1">
          <button onClick={() => setBilling("monthly")} className={"px-5 py-2.5 rounded-lg text-sm font-medium transition-all " + (billing === "monthly" ? "bg-gold text-navy-dark" : "text-cream/50")}>{t("monthly")}</button>
          <button onClick={() => setBilling("annual")} className={"px-5 py-2.5 rounded-lg text-sm font-medium transition-all " + (billing === "annual" ? "bg-gold text-navy-dark" : "text-cream/50")}>
            {t("annual")} <span className="text-green-400 text-xs ml-1">{t("save20")}</span>
          </button>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {PLANS.map((plan) => (
          <div key={plan} className={"bg-navy-light rounded-2xl p-6 border-2 transition-all hover:scale-[1.02] " + (plan === "professional" ? "border-gold relative" : planColors[plan])}>
            {plan === "professional" && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-navy-dark text-xs font-bold px-3 py-1 rounded-full">{t("popular")}</span>}
            <h3 className="font-display text-xl text-cream font-semibold mb-1">{t("plans." + plan + ".name")}</h3>
            <p className="text-cream/40 text-sm mb-4">{t("plans." + plan + ".tagline")}</p>
            <div className="mb-6">
              <span className="text-3xl font-bold text-gold">{t("plans." + plan + "." + billing + "Price")}</span>
              <span className="text-cream/30 text-sm ml-1">/ {t(billing === "monthly" ? "mo" : "yr")}</span>
            </div>
            <ul className="space-y-3 mb-6">
              {FEATURES.map((feat) => {
                const included = t("plans." + plan + ".features." + feat) !== "-";
                return (
                  <li key={feat} className={"flex items-center gap-2 text-sm " + (included ? "text-cream/70" : "text-cream/20")}>
                    {included ? (
                      <svg className="w-4 h-4 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <svg className="w-4 h-4 text-cream/20 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    )}
                    <span>{included ? t("plans." + plan + ".features." + feat) : t("featureNames." + feat)}</span>
                  </li>
                );
              })}
            </ul>
            <button
              onClick={() => setSelectedPlan(plan)}
              className={"w-full py-3 rounded-xl font-semibold text-sm transition-colors " + (plan === "professional" ? "bg-gold text-navy-dark hover:bg-gold-light" : "border border-gold/30 text-gold hover:border-gold")}
            >
              {t("choosePlan")}
            </button>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="bg-navy-light border border-gold/10 rounded-2xl p-6 overflow-x-auto">
        <h2 className="font-display text-2xl text-gold font-semibold mb-6 text-center">{t("compareTitle")}</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gold/10">
              <th className="text-left py-3 text-cream/40 font-normal">{t("feature")}</th>
              {PLANS.map((p) => <th key={p} className="text-center py-3 text-cream font-semibold">{t("plans." + p + ".name")}</th>)}
            </tr>
          </thead>
          <tbody>
            {FEATURES.map((feat) => (
              <tr key={feat} className="border-b border-gold/5">
                <td className="py-3 text-cream/60">{t("featureNames." + feat)}</td>
                {PLANS.map((p) => {
                  const val = t("plans." + p + ".features." + feat);
                  return <td key={p} className="text-center py-3">{val === "-" ? <span className="text-cream/20">—</span> : <span className="text-cream/70">{val}</span>}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FAQ */}
      <section className="mt-16 max-w-3xl mx-auto">
        <h2 className="font-display text-2xl text-gold font-semibold mb-8 text-center">{t("faqTitle")}</h2>
        <div className="space-y-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="bg-navy-light border border-gold/10 rounded-xl p-5">
              <h3 className="text-cream font-semibold mb-2">{t("faq." + i + ".q")}</h3>
              <p className="text-cream/50 text-sm">{t("faq." + i + ".a")}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
