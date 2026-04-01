"use client";

import { useTranslations } from "next-intl";
import { useState, useMemo } from "react";

export default function CalculatorsPage() {
  const t = useTranslations("calculators");
  const [price, setPrice] = useState(2000000);
  const [deposit, setDeposit] = useState(200000);
  const [rate, setRate] = useState(11.75);
  const [term, setTerm] = useState(20);

  const monthlyPayment = useMemo(() => {
    const principal = price - deposit;
    const monthlyRate = rate / 100 / 12;
    const numPayments = term * 12;
    if (monthlyRate === 0) return principal / numPayments;
    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)
    );
  }, [price, deposit, rate, term]);

  const totalCost = monthlyPayment * term * 12;
  const totalInterest = totalCost - (price - deposit);

  const formatCurrency = (n: number) =>
    `R ${Math.round(n).toLocaleString("en-ZA")}`;

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
      <h1 className="font-display text-4xl md:text-5xl text-gold font-bold text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-cream/60 text-center mb-12 text-lg">{t("subtitle")}</p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-3 pf-card space-y-6">
          <h2 className="font-display text-xl text-cream font-semibold">
            {t("bondCalculator")}
          </h2>

          {/* Purchase Price */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <label className="text-cream/60">{t("purchasePrice")}</label>
              <span className="text-gold font-semibold">{formatCurrency(price)}</span>
            </div>
            <input
              type="range"
              min={200000}
              max={20000000}
              step={50000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-gold"
            />
          </div>

          {/* Deposit */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <label className="text-cream/60">{t("deposit")}</label>
              <span className="text-gold font-semibold">{formatCurrency(deposit)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={price * 0.5}
              step={10000}
              value={deposit}
              onChange={(e) => setDeposit(Number(e.target.value))}
              className="w-full accent-gold"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <label className="text-cream/60">{t("interestRate")}</label>
              <span className="text-gold font-semibold">{rate.toFixed(2)}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={20}
              step={0.25}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-gold"
            />
          </div>

          {/* Loan Term */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <label className="text-cream/60">{t("loanTerm")}</label>
              <span className="text-gold font-semibold">
                {term} {t("years")}
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="w-full accent-gold"
            />
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-4">
          <div className="pf-card text-center">
            <p className="text-cream/40 text-sm mb-1">{t("monthlyPayment")}</p>
            <p className="text-3xl font-bold text-gold">
              {formatCurrency(monthlyPayment)}
            </p>
            <p className="text-cream/30 text-xs mt-1">{t("perMonth")}</p>
          </div>

          <div className="pf-card space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-cream/50">{t("loanAmount")}</span>
              <span className="text-cream font-medium">
                {formatCurrency(price - deposit)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-cream/50">{t("totalInterest")}</span>
              <span className="text-cream font-medium">
                {formatCurrency(totalInterest)}
              </span>
            </div>
            <div className="h-px bg-gold/20" />
            <div className="flex justify-between text-sm">
              <span className="text-cream/50">{t("totalCost")}</span>
              <span className="text-gold font-bold">
                {formatCurrency(totalCost)}
              </span>
            </div>
          </div>

          <button className="btn-gold w-full py-3">{t("applyNow")}</button>
        </div>
      </div>
    </div>
  );
}
