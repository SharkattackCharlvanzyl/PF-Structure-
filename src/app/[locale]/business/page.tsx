import { useTranslations } from "next-intl";

const categories = [
  { key: "retail", icon: "🛍️" },
  { key: "hospitality", icon: "🍽️" },
  { key: "manufacturing", icon: "⚙️" },
  { key: "services", icon: "💼" },
  { key: "franchise", icon: "🔗" },
  { key: "online", icon: "🌐" },
];

export default function BusinessPage() {
  const t = useTranslations("business");

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <h1 className="font-display text-4xl md:text-5xl text-gold font-bold text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-cream/60 text-center mb-12 text-lg">{t("subtitle")}</p>

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
              {t("viewListings")} →
            </div>
          </div>
        ))}
      </div>

      {/* Sell Your Business CTA */}
      <section className="mt-16 pf-card text-center">
        <h2 className="font-display text-2xl text-gold font-semibold mb-4">
          {t("sellCta.title")}
        </h2>
        <p className="text-cream/50 max-w-2xl mx-auto mb-6 leading-relaxed">
          {t("sellCta.description")}
        </p>
        <button className="btn-gold">{t("sellCta.button")}</button>
      </section>
    </div>
  );
}
