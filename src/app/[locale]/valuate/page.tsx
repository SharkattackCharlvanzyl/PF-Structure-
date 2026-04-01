"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

const propertyTypes = ["house", "apartment", "townhouse", "land", "commercial"];

export default function ValuatePage() {
  const t = useTranslations("valuate");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    size: "",
    condition: "",
    extras: [] as string[],
  });

  const totalSteps = 3;

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pt-24 pb-16">
      <h1 className="font-display text-4xl md:text-5xl text-gold font-bold text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-cream/60 text-center mb-10 text-lg">{t("subtitle")}</p>

      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-10 max-w-md mx-auto">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex-1 flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i + 1 <= step
                  ? "bg-gold text-navy-dark"
                  : "bg-navy-light border border-gold/20 text-cream/40"
              }`}
            >
              {i + 1}
            </div>
            {i < totalSteps - 1 && (
              <div
                className={`flex-1 h-px ${
                  i + 1 < step ? "bg-gold" : "bg-gold/20"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="pf-card">
        {/* Step 1: Property Type & Address */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="font-display text-xl text-cream font-semibold">
              {t("step1.title")}
            </h2>
            <div>
              <label className="block text-cream/60 text-sm mb-2">{t("step1.propertyType")}</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => updateField("propertyType", type)}
                    className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all ${
                      formData.propertyType === type
                        ? "border-gold bg-gold/10 text-gold"
                        : "border-gold/20 text-cream/50 hover:border-gold/40"
                    }`}
                  >
                    {t(`step1.types.${type}`)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-cream/60 text-sm mb-1.5">{t("step1.address")}</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => updateField("address", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-navy-light border border-gold/20 text-cream placeholder-cream/30 focus:border-gold/50 focus:outline-none"
                placeholder={t("step1.addressPlaceholder")}
              />
            </div>
          </div>
        )}

        {/* Step 2: Property Details */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="font-display text-xl text-cream font-semibold">
              {t("step2.title")}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-cream/60 text-sm mb-1.5">{t("step2.bedrooms")}</label>
                <input
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => updateField("bedrooms", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-navy-light border border-gold/20 text-cream focus:border-gold/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-cream/60 text-sm mb-1.5">{t("step2.bathrooms")}</label>
                <input
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => updateField("bathrooms", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-navy-light border border-gold/20 text-cream focus:border-gold/50 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-cream/60 text-sm mb-1.5">{t("step2.size")}</label>
              <input
                type="text"
                value={formData.size}
                onChange={(e) => updateField("size", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-navy-light border border-gold/20 text-cream placeholder-cream/30 focus:border-gold/50 focus:outline-none"
                placeholder={t("step2.sizePlaceholder")}
              />
            </div>
            <div>
              <label className="block text-cream/60 text-sm mb-1.5">{t("step2.condition")}</label>
              <select
                value={formData.condition}
                onChange={(e) => updateField("condition", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-navy-light border border-gold/20 text-cream focus:border-gold/50 focus:outline-none"
              >
                <option value="">{t("step2.selectCondition")}</option>
                <option value="excellent">{t("step2.conditions.excellent")}</option>
                <option value="good">{t("step2.conditions.good")}</option>
                <option value="fair">{t("step2.conditions.fair")}</option>
                <option value="needsWork">{t("step2.conditions.needsWork")}</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 3: Contact & Submit */}
        {step === 3 && (
          <div className="space-y-6 text-center">
            <h2 className="font-display text-xl text-cream font-semibold">
              {t("step3.title")}
            </h2>
            <p className="text-cream/50 leading-relaxed">{t("step3.description")}</p>
            <div className="pf-card bg-gold/5 border-gold/30">
              <div className="text-4xl mb-3">🏠</div>
              <p className="text-cream/60 text-sm">{t("step3.summary")}</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gold/10">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-2.5 rounded-lg border border-gold/30 text-gold hover:bg-gold/10 transition-colors"
            >
              {t("back")}
            </button>
          ) : (
            <div />
          )}
          {step < totalSteps ? (
            <button onClick={() => setStep(step + 1)} className="btn-gold px-8">
              {t("next")}
            </button>
          ) : (
            <button className="btn-gold px-8">{t("getValuation")}</button>
          )}
        </div>
      </div>
    </div>
  );
}
