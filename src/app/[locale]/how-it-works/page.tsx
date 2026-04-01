import { useTranslations } from "next-intl";

const steps = [
  { key: "list", icon: "📋", number: "01" },
  { key: "connect", icon: "🤝", number: "02" },
  { key: "close", icon: "🎉", number: "03" },
];

export default function HowItWorksPage() {
  const t = useTranslations("howItWorks");

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <h1 className="font-display text-4xl md:text-5xl text-gold font-bold text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-cream/60 text-center mb-16 text-lg max-w-2xl mx-auto">
        {t("subtitle")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {steps.map((step, i) => (
          <div key={step.key} className="relative text-center">
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-gold/40 to-gold/10" />
            )}
            <div className="w-24 h-24 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center mx-auto mb-6 relative">
              <span className="text-4xl">{step.icon}</span>
              <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold text-navy-dark text-xs font-bold flex items-center justify-center">
                {step.number}
              </span>
            </div>
            <h3 className="font-display text-xl text-gold font-semibold mb-3">
              {t(`steps.${step.key}.title`)}
            </h3>
            <p className="text-cream/50 leading-relaxed max-w-xs mx-auto">
              {t(`steps.${step.key}.description`)}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <button className="btn-gold text-lg px-8 py-3">{t("cta")}</button>
      </div>
    </div>
  );
}
