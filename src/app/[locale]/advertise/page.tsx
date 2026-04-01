"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

const AD_TYPES = ["banner", "featured", "spotlight", "newsletter", "social"];
const STATS = ["impressions", "clicks", "leads", "roi"];

export default function AdvertisePage() {
  const t = useTranslations("advertise");
  const [selectedAd, setSelectedAd] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl text-gold font-bold mb-3">{t("title")}</h1>
        <p className="text-cream/60 text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {STATS.map((stat) => (
          <div key={stat} className="bg-navy-light border border-gold/10 rounded-2xl p-5 text-center">
            <p className="text-3xl font-bold text-gold mb-1">{t("stats." + stat + ".value")}</p>
            <p className="text-cream/40 text-sm">{t("stats." + stat + ".label")}</p>
          </div>
        ))}
      </div>

      {/* Ad Types */}
      <h2 className="font-display text-2xl text-cream font-semibold mb-6 text-center">{t("adTypes")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {AD_TYPES.map((ad) => (
          <div key={ad} className={"bg-navy-light border rounded-2xl p-6 cursor-pointer transition-all " + (selectedAd === ad ? "border-gold bg-gold/5" : "border-gold/10 hover:border-gold/30")} onClick={() => setSelectedAd(ad)}>
            <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={ad === "banner" ? "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" : ad === "featured" ? "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" : ad === "spotlight" ? "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" : ad === "newsletter" ? "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" : "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"} />
              </svg>
            </div>
            <h3 className="text-cream font-semibold text-lg mb-2">{t("adOptions." + ad + ".name")}</h3>
            <p className="text-cream/50 text-sm mb-3">{t("adOptions." + ad + ".description")}</p>
            <p className="text-gold font-bold">{t("adOptions." + ad + ".price")}</p>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="bg-navy-light border border-gold/10 rounded-2xl p-8 mb-12">
        <h2 className="font-display text-2xl text-gold font-semibold mb-8 text-center">{t("howItWorks")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-3">
                <span className="text-gold font-bold">{"0" + (i + 1)}</span>
              </div>
              <h4 className="text-cream font-semibold text-sm mb-1">{t("steps." + i + ".title")}</h4>
              <p className="text-cream/40 text-xs">{t("steps." + i + ".description")}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="font-display text-2xl text-cream font-semibold mb-4">{t("ctaTitle")}</h2>
        <p className="text-cream/50 mb-6 max-w-xl mx-auto">{t("ctaDescription")}</p>
        <div className="flex gap-4 justify-center">
          <button className="px-8 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">{t("getStarted")}</button>
          <button className="px-8 py-3 border border-gold/30 text-gold rounded-xl hover:border-gold transition-colors">{t("contactSales")}</button>
        </div>
      </div>
    </div>
  );
}
