import { useTranslations } from "next-intl";

const benefits = [
  { icon: "📸", key: "photos" },
  { icon: "📊", key: "analytics" },
  { icon: "🌐", key: "reach" },
  { icon: "🤖", key: "ai" },
];

export default function ListPropertyPage() {
  const t = useTranslations("listProperty");

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl text-gold font-bold mb-4">
          {t("title")}
        </h1>
        <p className="text-cream/60 text-lg max-w-2xl mx-auto leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {benefits.map((b) => (
          <div key={b.key} className="pf-card flex items-start gap-4">
            <div className="text-3xl">{b.icon}</div>
            <div>
              <h3 className="font-display text-lg text-gold font-semibold mb-1">
                {t(`benefits.${b.key}.title`)}
              </h3>
              <p className="text-cream/50 text-sm leading-relaxed">
                {t(`benefits.${b.key}.description`)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="pf-card text-center">
        <h2 className="font-display text-2xl text-cream font-semibold mb-3">
          {t("cta.title")}
        </h2>
        <p className="text-cream/50 mb-8 max-w-lg mx-auto">{t("cta.description")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-gold px-8 py-3 text-lg">{t("cta.listNow")}</button>
          <button className="px-8 py-3 rounded-lg border border-gold/30 text-gold hover:bg-gold/10 transition-colors">
            {t("cta.learnMore")}
          </button>
        </div>
      </div>
    </div>
  );
}
