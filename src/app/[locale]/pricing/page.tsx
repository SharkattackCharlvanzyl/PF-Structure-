import { useTranslations } from "next-intl";

const tiers = [
  {
    key: "basic",
    popular: false,
  },
  {
    key: "standard",
    popular: true,
  },
  {
    key: "premium",
    popular: false,
  },
];

const featureCounts = { basic: 4, standard: 6, premium: 8 };

export default function PricingPage() {
  const t = useTranslations("pricing");

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <h1 className="font-display text-4xl md:text-5xl text-gold font-bold text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-cream/60 text-center mb-12 text-lg">{t("subtitle")}</p>

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {tiers.map((tier) => (
          <div
            key={tier.key}
            className={`pf-card relative ${
              tier.popular ? "border-gold/60 ring-1 ring-gold/30" : ""
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-navy-dark text-xs font-bold px-4 py-1 rounded-full">
                {t("mostPopular")}
              </div>
            )}
            <h3 className="font-display text-2xl text-gold font-semibold mb-2">
              {t(`tiers.${tier.key}.name`)}
            </h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-cream">
                {t(`tiers.${tier.key}.price`)}
              </span>
              <span className="text-cream/40 text-sm ml-1">
                {t(`tiers.${tier.key}.period`)}
              </span>
            </div>
            <p className="text-cream/50 text-sm mb-6">
              {t(`tiers.${tier.key}.description`)}
            </p>
            <ul className="space-y-3 mb-8">
              {Array.from(
                { length: featureCounts[tier.key as keyof typeof featureCounts] },
                (_, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-cream/70">
                    <span className="text-gold mt-0.5">✓</span>
                    {t(`tiers.${tier.key}.features.${i}`)}
                  </li>
                )
              )}
            </ul>
            <button
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                tier.popular
                  ? "btn-gold"
                  : "border border-gold/30 text-gold hover:bg-gold/10"
              }`}
            >
              {t(`tiers.${tier.key}.cta`)}
            </button>
          </div>
        ))}
      </div>

      {/* ProVal AI Section */}
      <section className="pf-card text-center">
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-6">
          <span className="text-gold text-sm font-semibold">{t("proval.badge")}</span>
        </div>
        <h2 className="font-display text-3xl text-gold font-bold mb-4">
          {t("proval.title")}
        </h2>
        <p className="text-cream/50 max-w-2xl mx-auto mb-8 leading-relaxed">
          {t("proval.description")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold text-gold mb-1">
                {t(`proval.stats.${i}.value`)}
              </div>
              <div className="text-cream/40 text-sm">{t(`proval.stats.${i}.label`)}</div>
            </div>
          ))}
        </div>
        <button className="btn-gold">{t("proval.cta")}</button>
      </section>
    </div>
  );
}
