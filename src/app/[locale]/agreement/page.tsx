"use client";
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
    a.download = `PropertyFinder-Agreement-${reference}.pdf`;
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
                  {t(`types.${type}.name`)}
                </h3>
                <p className="text-cream/60 text-sm">{t(`types.${type}.description`)}</p>
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
          <h2 className="text-3xl font-display font-bold text-gold mb-2">{t(`types.${agreementType}.name`)}</h2>
          <p className="text-cream/60 mb-8">{t("fillDetails")}</p>

          {/* Shared Fields */}
          <div className="space-y-5">
            {sharedFields.map((f) => (
              <div key={f.key}>
                <label className="block text-cream/80 text-sm mb-1.5">{t(`fields.${f.key}`)}</label>
                <input
                  type={f.type}
                  value={form[f.key] || ""}
                  onChange={(e) => handleFormChange(f.key, e.target.value)}
                  className="w-full px-4 py-3 bg-navy-light border-2 border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none transition-colors"
                  placeholder={t(`fields.${f.key}`)}
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
                    <label className="block text-cream/80 text-sm mb-1.5">{t(`fields.${f.key}`)}</label>
                    <input
                      type={f.type}
                      value={form[f.key] || ""}
                      onChange={(e) => handleFormChange(f.key, e.target.value)}
                      className="w-full px-4 py-3 bg-navy-light border-2 border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none transition-colors"
                      placeholder={t(`fields.${f.key}`)}
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
