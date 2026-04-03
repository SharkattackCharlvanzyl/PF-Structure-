const fs = require("fs");
const path = require("path");

const BT = "`";
const DS = "$";

// ─── Page 1: Checkout Page ───────────────────────────────────────────
const checkoutPage = `"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter } from "next/navigation";

const PLANS = ["starter", "professional", "enterprise", "premium"] as const;
type PlanKey = typeof PLANS[number];

const PLAN_PRICES: Record<PlanKey, { monthly: number; annual: number }> = {
  starter:      { monthly: 199,  annual: 1910  },
  professional: { monthly: 499,  annual: 4790  },
  enterprise:   { monthly: 1499, annual: 14390 },
  premium:      { monthly: 4999, annual: 47990 },
};

const PAYMENT_METHODS = ["creditCard", "payfast", "eft"] as const;
type PaymentMethod = typeof PAYMENT_METHODS[number];

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const pt = useTranslations("pricing");
  const router = useRouter();
  const searchParams = useSearchParams();

  const planParam = (searchParams.get("plan") || "professional") as PlanKey;
  const validPlan = PLANS.includes(planParam) ? planParam : "professional";

  const [plan, setPlan] = useState<PlanKey>(validPlan);
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("creditCard");
  const [cardForm, setCardForm] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [processing, setProcessing] = useState(false);

  const basePrice = PLAN_PRICES[plan][billing];
  const vat = Math.round(basePrice * 0.15);
  const total = basePrice + vat;

  const formatZAR = (amount: number) =>
    "R " + amount.toLocaleString("en-ZA", { minimumFractionDigits: 2 });

  const handleCardChange = (field: string, value: string) => {
    setCardForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePayment = async () => {
    setProcessing(true);
    try {
      await fetch("/api/payment-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          billing,
          paymentMethod,
          amount: total,
          currency: "ZAR",
          timestamp: new Date().toISOString(),
        }),
      });
      router.push("/payment-success");
    } catch (err) {
      console.error("Payment failed:", err);
      setProcessing(false);
    }
  };

  const paymentIcons: Record<PaymentMethod, string> = {
    creditCard: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    payfast: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
    eft: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-16">
      <h1 className="font-display text-4xl md:text-5xl text-gold font-bold mb-3 text-center">
        {t("title")}
      </h1>
      <p className="text-cream/60 text-lg mb-12 text-center">{t("subtitle")}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Plan + Payment */}
        <div className="lg:col-span-2 space-y-8">
          {/* Plan Selection */}
          <div className="bg-navy-light border border-gold/10 rounded-2xl p-6">
            <h2 className="text-cream font-display text-xl font-semibold mb-4">{t("selectedPlan")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {PLANS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPlan(p)}
                  className={"py-3 px-4 rounded-xl text-sm font-semibold transition-all border-2 " +
                    (plan === p
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-gold/10 text-cream/50 hover:border-gold/30")}
                >
                  {pt(${BT}plans.${DS}{p}.name${BT})}
                </button>
              ))}
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="bg-navy-light border border-gold/10 rounded-2xl p-6">
            <h2 className="text-cream font-display text-xl font-semibold mb-4">{t("billingCycle")}</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setBilling("monthly")}
                className={"flex-1 py-4 rounded-xl border-2 transition-all " +
                  (billing === "monthly"
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-gold/10 text-cream/50 hover:border-gold/30")}
              >
                <div className="font-semibold">{t("monthly")}</div>
                <div className="text-sm opacity-70">{formatZAR(PLAN_PRICES[plan].monthly)}/{t("perMonth")}</div>
              </button>
              <button
                onClick={() => setBilling("annual")}
                className={"flex-1 py-4 rounded-xl border-2 transition-all relative " +
                  (billing === "annual"
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-gold/10 text-cream/50 hover:border-gold/30")}
              >
                <span className="absolute -top-2.5 right-3 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {t("save20")}
                </span>
                <div className="font-semibold">{t("annual")}</div>
                <div className="text-sm opacity-70">{formatZAR(PLAN_PRICES[plan].annual)}/{t("perYear")}</div>
              </button>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-navy-light border border-gold/10 rounded-2xl p-6">
            <h2 className="text-cream font-display text-xl font-semibold mb-4">{t("paymentMethod")}</h2>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m}
                  onClick={() => setPaymentMethod(m)}
                  className={"py-4 px-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 " +
                    (paymentMethod === m
                      ? "border-gold bg-gold/10 text-gold"
                      : "border-gold/10 text-cream/50 hover:border-gold/30")}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={paymentIcons[m]} />
                  </svg>
                  <span className="text-sm font-medium">{t(${BT}methods.${DS}{m}${BT})}</span>
                </button>
              ))}
            </div>

            {/* Credit Card Form */}
            {paymentMethod === "creditCard" && (
              <div className="space-y-4 border-t border-gold/10 pt-6">
                <div>
                  <label className="block text-cream/70 text-sm mb-1.5">{t("cardNumber")}</label>
                  <input
                    type="text"
                    maxLength={19}
                    placeholder="0000 0000 0000 0000"
                    value={cardForm.number}
                    onChange={(e) => handleCardChange("number", e.target.value)}
                    className="w-full px-4 py-3 bg-navy border-2 border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-cream/70 text-sm mb-1.5">{t("expiry")}</label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="MM/YY"
                      value={cardForm.expiry}
                      onChange={(e) => handleCardChange("expiry", e.target.value)}
                      className="w-full px-4 py-3 bg-navy border-2 border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-cream/70 text-sm mb-1.5">{t("cvv")}</label>
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="123"
                      value={cardForm.cvv}
                      onChange={(e) => handleCardChange("cvv", e.target.value)}
                      className="w-full px-4 py-3 bg-navy border-2 border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-cream/70 text-sm mb-1.5">{t("nameOnCard")}</label>
                  <input
                    type="text"
                    placeholder={t("nameOnCardPlaceholder")}
                    value={cardForm.name}
                    onChange={(e) => handleCardChange("name", e.target.value)}
                    className="w-full px-4 py-3 bg-navy border-2 border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "payfast" && (
              <div className="border-t border-gold/10 pt-6 text-center text-cream/50 text-sm">
                <p>{t("payfastRedirect")}</p>
              </div>
            )}

            {paymentMethod === "eft" && (
              <div className="border-t border-gold/10 pt-6 text-cream/50 text-sm space-y-2">
                <p className="font-semibold text-cream/70">{t("eftDetails")}</p>
                <p>{t("eftBank")}: First National Bank</p>
                <p>{t("eftAccount")}: 62876543210</p>
                <p>{t("eftBranch")}: 250655</p>
                <p>{t("eftRef")}: PF-{plan.toUpperCase()}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-navy-light border border-gold/10 rounded-2xl p-6 sticky top-28">
            <h2 className="text-cream font-display text-xl font-semibold mb-6">{t("orderSummary")}</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-cream/50">{t("plan")}</span>
                <span className="text-cream font-semibold">{pt(${BT}plans.${DS}{plan}.name${BT})}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream/50">{t("billingLabel")}</span>
                <span className="text-cream">{t(billing)}</span>
              </div>
              <div className="border-t border-gold/10 pt-4 flex justify-between">
                <span className="text-cream/50">{t("subtotal")}</span>
                <span className="text-cream">{formatZAR(basePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cream/50">{t("vat")}</span>
                <span className="text-cream">{formatZAR(vat)}</span>
              </div>
              <div className="border-t border-gold/10 pt-4 flex justify-between">
                <span className="text-cream font-semibold">{t("total")}</span>
                <span className="text-gold font-bold text-lg">{formatZAR(total)}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              className="mt-8 w-full py-4 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? t("processing") : t("completePayment")}
            </button>

            <p className="text-cream/30 text-xs mt-4 text-center">{t("secureNote")}</p>

            <div className="mt-6 flex items-center justify-center gap-2 text-cream/20">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-xs">{t("encrypted")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

// ─── Page 2: Enhanced Agreement Page ─────────────────────────────────
const agreementPage = `"use client";
import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import SignatureCanvas from "react-signature-canvas";
import { generateAgreementPDF, AgreementData } from "@/lib/generate-agreement-pdf";

const AGREEMENT_TYPES = ["agency", "private", "enterprise", "seller", "auction", "buyer"];

interface TypeSpecificFields {
  [key: string]: { key: string; type: string }[];
}

const TYPE_SPECIFIC_FIELDS: TypeSpecificFields = {
  agency: [
    { key: "commissionRate", type: "text" },
    { key: "exclusivePeriod", type: "text" },
    { key: "marketingBudget", type: "text" },
  ],
  private: [
    { key: "reasonForSelling", type: "text" },
    { key: "propertyCondition", type: "text" },
  ],
  enterprise: [
    { key: "companyName", type: "text" },
    { key: "registrationNumber", type: "text" },
    { key: "portfolioSize", type: "text" },
  ],
  seller: [
    { key: "agentLicenseNumber", type: "text" },
    { key: "agencyName", type: "text" },
    { key: "regionCoverage", type: "text" },
  ],
  auction: [
    { key: "reservePrice", type: "text" },
    { key: "auctionDatePreference", type: "text" },
    { key: "auctioneerPreference", type: "text" },
  ],
  buyer: [
    { key: "preApprovalStatus", type: "text" },
    { key: "budgetRange", type: "text" },
    { key: "preferredAreas", type: "text" },
    { key: "moveInTimeline", type: "text" },
  ],
};

const TYPE_ICONS: Record<string, string> = {
  agency: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  private: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1",
  enterprise: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  seller: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0",
  auction: "M15.536 8.464a5 5 0 010 7.072M12 9.88l.01-.01M18.364 5.636a9 9 0 010 12.728M5.636 18.364a9 9 0 010-12.728",
  buyer: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
};

export default function AgreementPage() {
  const t = useTranslations("agreement");
  const [step, setStep] = useState(0);
  const [agreementType, setAgreementType] = useState("");
  const [form, setForm] = useState<Record<string, string>>({
    fullName: "",
    email: "",
    phone: "",
    idNumber: "",
    propertyAddress: "",
    askingPrice: "",
    commissionRate: "5%",
  });
  const [reference, setReference] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const sigRef = useRef<SignatureCanvas>(null);

  const generateRef = () =>
    "PF-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();

  const handleFormChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSign = async () => {
    if (!sigRef.current || sigRef.current.isEmpty()) return;
    const signature = sigRef.current.toDataURL("image/png");
    const ref = generateRef();
    setReference(ref);

    const agreementData: AgreementData = {
      type: agreementType,
      reference: ref,
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      idNumber: form.idNumber,
      propertyAddress: form.propertyAddress,
      askingPrice: form.askingPrice,
      commissionRate: form.commissionRate,
      date: new Date().toLocaleDateString("en-ZA"),
      listerSignature: signature,
    };

    try {
      const doc = generateAgreementPDF(agreementData);
      const blob = doc.output("blob");
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

      await fetch("/api/submit-agreement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...agreementData, listerSignature: "[signature]" }),
      });

      setStep(3);
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
  };

  const handleDownload = () => {
    if (!pdfUrl) return;
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = ${BT}PropertyFinder-Agreement-${DS}{reference}.pdf${BT};
    a.click();
  };

  const handlePrint = () => {
    if (!pdfUrl) return;
    const win = window.open(pdfUrl, "_blank");
    win?.addEventListener("load", () => win.print());
  };

  // Step 0: Select agreement type (2x3 grid)
  if (step === 0) {
    return (
      <section className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-gold mb-4 text-center">{t("title")}</h1>
          <p className="text-cream/70 text-center mb-12">{t("subtitle")}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AGREEMENT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => { setAgreementType(type); setStep(1); }}
                className="p-6 bg-navy-light border-2 border-gold/20 rounded-2xl hover:border-gold/60 transition-all text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={TYPE_ICONS[type]} />
                  </svg>
                </div>
                <h3 className="text-lg font-display text-gold group-hover:text-gold-light mb-2">
                  {t(${BT}types.${DS}{type}.name${BT})}
                </h3>
                <p className="text-cream/60 text-sm">{t(${BT}types.${DS}{type}.description${BT})}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Step 1: Fill form (shared + type-specific fields)
  if (step === 1) {
    const sharedFields = [
      { key: "fullName", type: "text" },
      { key: "email", type: "email" },
      { key: "phone", type: "tel" },
      { key: "idNumber", type: "text" },
      { key: "propertyAddress", type: "text" },
      { key: "askingPrice", type: "text" },
    ];
    const specificFields = TYPE_SPECIFIC_FIELDS[agreementType] || [];

    return (
      <section className="min-h-screen py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setStep(0)} className="text-gold hover:text-gold-light mb-6 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            {t("back")}
          </button>
          <h2 className="text-3xl font-display font-bold text-gold mb-2">{t(${BT}types.${DS}{agreementType}.name${BT})}</h2>
          <p className="text-cream/60 mb-8">{t("fillDetails")}</p>

          {/* Shared Fields */}
          <div className="space-y-5">
            {sharedFields.map((f) => (
              <div key={f.key}>
                <label className="block text-cream/80 text-sm mb-1.5">{t(${BT}fields.${DS}{f.key}${BT})}</label>
                <input
                  type={f.type}
                  value={form[f.key] || ""}
                  onChange={(e) => handleFormChange(f.key, e.target.value)}
                  className="w-full px-4 py-3 bg-navy-light border-2 border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none transition-colors"
                  placeholder={t(${BT}fields.${DS}{f.key}${BT})}
                />
              </div>
            ))}
          </div>

          {/* Type-specific Fields */}
          {specificFields.length > 0 && (
            <div className="mt-8">
              <h3 className="text-gold font-display text-lg font-semibold mb-4">{t("typeSpecificTitle")}</h3>
              <div className="space-y-5">
                {specificFields.map((f) => (
                  <div key={f.key}>
                    <label className="block text-cream/80 text-sm mb-1.5">{t(${BT}fields.${DS}{f.key}${BT})}</label>
                    <input
                      type={f.type}
                      value={form[f.key] || ""}
                      onChange={(e) => handleFormChange(f.key, e.target.value)}
                      className="w-full px-4 py-3 bg-navy-light border-2 border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none transition-colors"
                      placeholder={t(${BT}fields.${DS}{f.key}${BT})}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-navy-light/50 border border-gold/10 rounded-xl">
            <h4 className="text-gold text-sm font-semibold mb-2">{t("legalPreview")}</h4>
            <p className="text-cream/50 text-xs leading-relaxed">{t("legalText")}</p>
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={!form.fullName || !form.email || !form.propertyAddress}
            className="mt-6 w-full py-4 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t("proceedToSign")}
          </button>
        </div>
      </section>
    );
  }

  // Step 2: Signature
  if (step === 2) {
    return (
      <section className="min-h-screen py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setStep(1)} className="text-gold hover:text-gold-light mb-6 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            {t("back")}
          </button>
          <h2 className="text-3xl font-display font-bold text-gold mb-6">{t("signTitle")}</h2>

          <div className="bg-navy-light border-2 border-gold/20 rounded-2xl p-6 mb-6">
            <h3 className="text-gold font-semibold mb-4">{t("summary")}</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-cream/50">{t("fields.fullName")}:</div>
              <div className="text-cream">{form.fullName}</div>
              <div className="text-cream/50">{t("fields.email")}:</div>
              <div className="text-cream">{form.email}</div>
              <div className="text-cream/50">{t("fields.phone")}:</div>
              <div className="text-cream">{form.phone}</div>
              <div className="text-cream/50">{t("fields.propertyAddress")}:</div>
              <div className="text-cream">{form.propertyAddress}</div>
              <div className="text-cream/50">{t("fields.askingPrice")}:</div>
              <div className="text-cream">{form.askingPrice}</div>
            </div>
          </div>

          <div className="bg-navy-light border-2 border-gold/20 rounded-2xl p-6 mb-6">
            <h3 className="text-gold font-semibold mb-3">{t("drawSignature")}</h3>
            <div className="bg-white rounded-xl overflow-hidden">
              <SignatureCanvas
                ref={sigRef}
                penColor="#141c2b"
                canvasProps={{ width: 600, height: 200, className: "w-full" }}
              />
            </div>
            <button
              onClick={() => sigRef.current?.clear()}
              className="mt-3 text-sm text-cream/50 hover:text-cream transition-colors"
            >
              {t("clearSignature")}
            </button>
          </div>

          <button
            onClick={handleSign}
            className="w-full py-4 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors"
          >
            {t("signAndGenerate")}
          </button>
        </div>
      </section>
    );
  }

  // Step 3: Success
  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-display font-bold text-gold mb-3">{t("successTitle")}</h2>
        <p className="text-cream/70 mb-2">{t("successMessage")}</p>
        <p className="text-gold font-mono text-lg mb-8">{reference}</p>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
          <button onClick={handleDownload} className="py-3 px-4 bg-gold text-navy-dark font-semibold rounded-xl hover:bg-gold-light transition-colors">
            {t("download")}
          </button>
          <button onClick={handlePrint} className="py-3 px-4 bg-navy-light border-2 border-gold/30 text-gold font-semibold rounded-xl hover:border-gold transition-colors">
            {t("print")}
          </button>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="py-3 px-4 bg-navy-light border-2 border-gold/30 text-gold font-semibold rounded-xl hover:border-gold transition-colors text-center">
            {t("viewPdf")}
          </a>
          <a href="/checkout" className="py-3 px-4 bg-navy-light border-2 border-gold/30 text-gold font-semibold rounded-xl hover:border-gold transition-colors text-center">
            {t("proceedPayment")}
          </a>
        </div>
      </div>
    </section>
  );
}
`;

// ─── Write files ─────────────────────────────────────────────────────
const base = path.resolve(__dirname, "..");

const checkoutDir = path.join(base, "src", "app", "[locale]", "checkout");
const agreementDir = path.join(base, "src", "app", "[locale]", "agreement");

fs.mkdirSync(checkoutDir, { recursive: true });
fs.mkdirSync(agreementDir, { recursive: true });

fs.writeFileSync(path.join(checkoutDir, "page.tsx"), checkoutPage, "utf-8");
console.log("Wrote:", path.join(checkoutDir, "page.tsx"));

fs.writeFileSync(path.join(agreementDir, "page.tsx"), agreementPage, "utf-8");
console.log("Wrote:", path.join(agreementDir, "page.tsx"));

console.log("Done! Both pages generated.");
