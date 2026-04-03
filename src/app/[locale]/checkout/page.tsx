"use client";
import { useState } from "react";
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

const PLAN_NAMES: Record<PlanKey, string> = {
  starter: "Starter",
  professional: "Professional",
  enterprise: "Enterprise",
  premium: "Premium",
};

const PAYMENT_METHODS = ["creditCard", "payfast", "eft"] as const;
type PaymentMethod = typeof PAYMENT_METHODS[number];

const PAYFAST_SANDBOX_URL = "https://sandbox.payfast.co.za/eng/process";

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
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const basePrice = PLAN_PRICES[plan][billing];
  const vat = Math.round(basePrice * 0.15);
  const total = basePrice + vat;

  const formatZAR = (amount: number) =>
    "R " + amount.toLocaleString("en-ZA", { minimumFractionDigits: 2 });

  const handleCardChange = (field: string, value: string) => {
    setCardForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePayFastPayment = async () => {
    if (!customerName.trim() || !customerEmail.trim()) {
      alert("Please enter your name and email address.");
      return;
    }

    setProcessing(true);

    try {
      const nameParts = customerName.trim().split(/\s+/);
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ") || "";

      const planName = PLAN_NAMES[plan];
      const billingLabel = billing === "monthly" ? "Monthly" : "Annual";
      const paymentId = "PF-" + plan.toUpperCase() + "-" + Date.now();

      const fields: Record<string, string> = {
        merchant_id: "10000100",
        merchant_key: "46f0cd694581a",
        return_url: window.location.origin + "/payment-success",
        cancel_url: window.location.origin + "/checkout?plan=" + plan,
        notify_url: window.location.origin + "/api/payment-notify",
        name_first: firstName,
        name_last: lastName,
        email_address: customerEmail.trim(),
        m_payment_id: paymentId,
        amount: total.toFixed(2),
        item_name: "PropertyFinder " + planName + " Plan",
        item_description: billingLabel + " subscription",
      };

      // Get MD5 signature from server
      const sigResponse = await fetch("/api/payfast-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (!sigResponse.ok) {
        throw new Error("Failed to generate payment signature");
      }

      const { signature } = await sigResponse.json();

      // Create hidden form and submit to PayFast
      const form = document.createElement("form");
      form.method = "POST";
      form.action = PAYFAST_SANDBOX_URL;

      // Add all fields in order
      const orderedKeys = [
        "merchant_id",
        "merchant_key",
        "return_url",
        "cancel_url",
        "notify_url",
        "name_first",
        "name_last",
        "email_address",
        "m_payment_id",
        "amount",
        "item_name",
        "item_description",
      ];

      for (const key of orderedKeys) {
        if (fields[key]) {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = fields[key];
          form.appendChild(input);
        }
      }

      // Add signature
      const sigInput = document.createElement("input");
      sigInput.type = "hidden";
      sigInput.name = "signature";
      sigInput.value = signature;
      form.appendChild(sigInput);

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error("PayFast payment failed:", err);
      alert("Payment initiation failed. Please try again.");
      setProcessing(false);
    }
  };

  const handlePayment = async () => {
    // PayFast has its own handler
    if (paymentMethod === "payfast") {
      return handlePayFastPayment();
    }

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
                  {pt(`plans.${p}.name`)}
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
                  <span className="text-sm font-medium">{t(`methods.${m}`)}</span>
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
              <div className="space-y-4 border-t border-gold/10 pt-6">
                <p className="text-cream/50 text-sm mb-4">{t("payfastRedirect")}</p>
                <div>
                  <label className="block text-cream/70 text-sm mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    placeholder="John Smith"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 bg-navy border-2 border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-cream/70 text-sm mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-navy border-2 border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none transition-colors"
                    required
                  />
                </div>
                <p className="text-cream/30 text-xs">
                  You will be redirected to PayFast to complete your payment securely.
                </p>
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
                <span className="text-cream font-semibold">{pt(`plans.${plan}.name`)}</span>
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
