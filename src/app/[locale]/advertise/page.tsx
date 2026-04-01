import { useTranslations } from "next-intl";

export default function AdvertisePage() {
  const t = useTranslations("advertise");

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[0, 1, 2].map((i) => (
          <div key={i} className="pf-card text-center">
            <div className="text-3xl mb-4">{["📈", "🎯", "🌍"][i]}</div>
            <h3 className="font-display text-lg text-gold font-semibold mb-2">
              {t(`benefits.${i}.title`)}
            </h3>
            <p className="text-cream/50 text-sm leading-relaxed">
              {t(`benefits.${i}.description`)}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="pf-card text-center">
        <h2 className="font-display text-2xl text-cream font-semibold mb-4">
          {t("cta.title")}
        </h2>
        <p className="text-cream/50 max-w-lg mx-auto mb-8 leading-relaxed">
          {t("cta.description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-gold px-8 py-3">{t("cta.getStarted")}</button>
          <button className="px-8 py-3 rounded-lg border border-gold/30 text-gold hover:bg-gold/10 transition-colors">
            {t("cta.contactSales")}
          </button>
        </div>
      </div>
    </div>
  );
}
