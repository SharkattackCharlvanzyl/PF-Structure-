"use client";
import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import SignatureCanvas from "react-signature-canvas";
import { generateAgreementPDF, AgreementData } from "@/lib/generate-agreement-pdf";

const AGREEMENT_TYPES = ["agency", "private", "enterprise", "seller", "auction"];

export default function AgreementPage() {
  const t = useTranslations("agreement");
  const [step, setStep] = useState(0);
  const [agreementType, setAgreementType] = useState("");
  const [form, setForm] = useState({
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

  // Step 0: Select agreement type
  if (step === 0) {
    return (
      <section className="min-h-screen py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-gold mb-4 text-center">{t("title")}</h1>
          <p className="text-cream/70 text-center mb-12">{t("subtitle")}</p>
          <div className="grid gap-4">
            {AGREEMENT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => { setAgreementType(type); setStep(1); }}
                className="p-6 bg-navy-light border-2 border-gold/20 rounded-2xl hover:border-gold/60 transition-all text-left group"
              >
                <h3 className="text-xl font-display text-gold group-hover:text-gold-light mb-2">
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

  // Step 1: Fill form
  if (step === 1) {
    const fields = [
      { key: "fullName", type: "text" },
      { key: "email", type: "email" },
      { key: "phone", type: "tel" },
      { key: "idNumber", type: "text" },
      { key: "propertyAddress", type: "text" },
      { key: "askingPrice", type: "text" },
      { key: "commissionRate", type: "text" },
    ];

    return (
      <section className="min-h-screen py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setStep(0)} className="text-gold hover:text-gold-light mb-6 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            {t("back")}
          </button>
          <h2 className="text-3xl font-display font-bold text-gold mb-2">{t(`types.${agreementType}.name`)}</h2>
          <p className="text-cream/60 mb-8">{t("fillDetails")}</p>
          <div className="space-y-5">
            {fields.map((f) => (
              <div key={f.key}>
                <label className="block text-cream/80 text-sm mb-1.5">{t(`fields.${f.key}`)}</label>
                <input
                  type={f.type}
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => handleFormChange(f.key, e.target.value)}
                  className="w-full px-4 py-3 bg-navy-light border-2 border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none transition-colors"
                  placeholder={t(`fields.${f.key}`)}
                />
              </div>
            ))}
          </div>
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
              <div className="text-cream/50">{t("fields.commissionRate")}:</div>
              <div className="text-cream">{form.commissionRate}</div>
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
          <a href="/payment-success" className="py-3 px-4 bg-navy-light border-2 border-gold/30 text-gold font-semibold rounded-xl hover:border-gold transition-colors text-center">
            {t("proceedPayment")}
          </a>
        </div>
      </div>
    </section>
  );
}
