import { useTranslations } from "next-intl";

export default function PaymentSuccessPage() {
  const t = useTranslations("paymentSuccess");

  return (
    <div className="max-w-lg mx-auto px-4 pt-24 pb-16">
      <div className="pf-card text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-display text-3xl text-gold font-bold mb-2">
          {t("title")}
        </h1>
        <p className="text-cream/50 mb-8">{t("subtitle")}</p>

        {/* Receipt */}
        <div className="bg-navy-light/50 border border-gold/10 rounded-xl p-6 text-left mb-8">
          <h2 className="font-display text-sm text-cream/40 uppercase tracking-wider mb-4">
            {t("receipt.title")}
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-cream/50">{t("receipt.orderId")}</span>
              <span className="text-cream font-mono">{t("receipt.orderIdValue")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-cream/50">{t("receipt.plan")}</span>
              <span className="text-cream">{t("receipt.planValue")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-cream/50">{t("receipt.date")}</span>
              <span className="text-cream">{t("receipt.dateValue")}</span>
            </div>
            <div className="h-px bg-gold/20 my-2" />
            <div className="flex justify-between">
              <span className="text-cream/50 text-sm">{t("receipt.total")}</span>
              <span className="text-gold font-bold text-lg">{t("receipt.totalValue")}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button className="btn-gold w-full py-3">{t("goToDashboard")}</button>
          <button className="w-full py-3 rounded-lg border border-gold/30 text-gold hover:bg-gold/10 transition-colors">
            {t("downloadReceipt")}
          </button>
        </div>
      </div>
    </div>
  );
}
