import { useTranslations } from "next-intl";

const auctionTypes = [
  { key: "live", icon: "🔨" },
  { key: "online", icon: "💻" },
  { key: "sealed", icon: "📨" },
];

const bidSteps = [
  { number: "01", key: "register" },
  { number: "02", key: "inspect" },
  { number: "03", key: "bid" },
  { number: "04", key: "win" },
];

export default function AuctionsPage() {
  const t = useTranslations("auctions");

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <h1 className="font-display text-4xl md:text-5xl text-gold font-bold text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-cream/60 text-center mb-12 text-lg">{t("subtitle")}</p>

      {/* Auction Types */}
      <section className="mb-20">
        <h2 className="font-display text-2xl text-cream font-semibold mb-8 text-center">
          {t("types")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {auctionTypes.map((type) => (
            <div
              key={type.key}
              className="pf-card text-center hover:border-gold/40 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{type.icon}</div>
              <h3 className="font-display text-xl text-gold font-semibold mb-2">
                {t(`typeList.${type.key}.title`)}
              </h3>
              <p className="text-cream/50 text-sm leading-relaxed">
                {t(`typeList.${type.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Bid */}
      <section className="pf-card">
        <h2 className="font-display text-2xl text-gold font-semibold mb-8 text-center">
          {t("howToBid")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {bidSteps.map((step) => (
            <div key={step.key} className="text-center">
              <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-gold font-bold">{step.number}</span>
              </div>
              <h4 className="text-cream font-semibold mb-1">
                {t(`bidSteps.${step.key}.title`)}
              </h4>
              <p className="text-cream/40 text-sm leading-relaxed">
                {t(`bidSteps.${step.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Auctions CTA */}
      <section className="mt-12 text-center">
        <button className="btn-gold">{t("viewUpcoming")}</button>
      </section>
    </div>
  );
}
