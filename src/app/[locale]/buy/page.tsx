import { useTranslations } from "next-intl";

const categories = [
  { key: "residential", icon: "🏠" },
  { key: "commercial", icon: "🏢" },
  { key: "industrial", icon: "🏭" },
  { key: "farm", icon: "🌾" },
  { key: "newDevelopments", icon: "🏗️" },
];

const steps = [
  { number: "01", key: "search" },
  { number: "02", key: "enquire" },
  { number: "03", key: "finance" },
  { number: "04", key: "offer" },
  { number: "05", key: "close" },
];

export default function BuyPage() {
  const t = useTranslations("buy");

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <h1 className="font-display text-4xl md:text-5xl text-gold font-bold text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-cream/60 text-center mb-12 text-lg">{t("subtitle")}</p>

      {/* Property Categories */}
      <section className="mb-20">
        <h2 className="font-display text-2xl text-cream font-semibold mb-8 text-center">
          {t("categories")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="pf-card group hover:border-gold/40 transition-all duration-300 cursor-pointer"
            >
              <div className="text-4xl mb-4">{cat.icon}</div>
              <h3 className="font-display text-xl text-gold font-semibold mb-2">
                {t(`categoryList.${cat.key}.title`)}
              </h3>
              <p className="text-cream/50 text-sm leading-relaxed">
                {t(`categoryList.${cat.key}.description`)}
              </p>
              <div className="mt-4 text-gold/60 group-hover:text-gold transition-colors text-sm font-medium">
                {t("browseListings")} →
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How Buying Works */}
      <section>
        <h2 className="font-display text-2xl text-cream font-semibold mb-10 text-center">
          {t("howItWorks")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <div key={step.key} className="relative text-center">
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-3">
                <span className="text-gold font-bold text-sm">{step.number}</span>
              </div>
              <h4 className="text-cream font-semibold text-sm mb-1">
                {t(`steps.${step.key}.title`)}
              </h4>
              <p className="text-cream/40 text-xs leading-relaxed">
                {t(`steps.${step.key}.description`)}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-px bg-gold/20" />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
