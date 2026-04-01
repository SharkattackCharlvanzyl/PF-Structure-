"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function PaymentSuccessPage() {
  const t = useTranslations("paymentSuccess");
  const [confetti, setConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const ref = "PF-" + Date.now().toString(36).toUpperCase().slice(0, 6);

  return (
    <div className="max-w-2xl mx-auto px-4 pt-24 pb-16 text-center">
      {/* Success Animation */}
      <div className="relative mb-8">
        <div className={"w-24 h-24 mx-auto rounded-full bg-green-500/20 flex items-center justify-center transition-all duration-500 " + (confetti ? "scale-110" : "scale-100")}>
          <svg className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <h1 className="font-display text-3xl md:text-4xl text-gold font-bold mb-3">{t("title")}</h1>
      <p className="text-cream/60 text-lg mb-2">{t("subtitle")}</p>
      <p className="text-gold font-mono text-lg mb-8">{ref}</p>

      {/* Order Summary */}
      <div className="bg-navy-light border border-gold/10 rounded-2xl p-6 mb-8 text-left">
        <h3 className="text-cream font-semibold mb-4">{t("orderSummary")}</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-cream/50">{t("plan")}</span><span className="text-cream">{t("professionalPlan")}</span></div>
          <div className="flex justify-between"><span className="text-cream/50">{t("billing")}</span><span className="text-cream">{t("monthlyBilling")}</span></div>
          <div className="flex justify-between"><span className="text-cream/50">{t("amount")}</span><span className="text-gold font-bold">R 499.00</span></div>
          <div className="border-t border-gold/10 pt-3 flex justify-between"><span className="text-cream/50">{t("status")}</span><span className="text-green-400 font-semibold">{t("paid")}</span></div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-navy-light border border-gold/10 rounded-2xl p-6 mb-8 text-left">
        <h3 className="text-cream font-semibold mb-4">{t("nextSteps")}</h3>
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-gold text-xs font-bold">{i + 1}</span>
              </div>
              <p className="text-cream/60 text-sm">{t("step" + i)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/dashboard" className="px-8 py-3 bg-gold text-navy-dark font-semibold rounded-xl hover:bg-gold-light transition-colors">{t("goToDashboard")}</a>
        <a href="/list-property" className="px-8 py-3 border border-gold/30 text-gold rounded-xl hover:border-gold transition-colors">{t("listProperty")}</a>
      </div>

      <p className="text-cream/30 text-xs mt-8">{t("receiptNote")}</p>
    </div>
  );
}
