"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BUSINESS_LISTINGS } from "@/lib/businesses";

export default function BusinessDetailPage() {
  const t = useTranslations("businessDetail");
  const params = useParams();
  const id = params.id as string;
  const biz = BUSINESS_LISTINGS.find((b) => b.id === id);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showFinancials, setShowFinancials] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [enquirySent, setEnquirySent] = useState(false);
  const [financialsRequested, setFinancialsRequested] = useState(false);

  if (!biz) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16 text-center">
        <h1 className="text-2xl text-cream/40 mb-4">{t("notFound")}</h1>
        <Link href="/business" className="text-gold hover:text-gold-light">{t("backToListings")}</Link>
      </div>
    );
  }

  const statusColor: Record<string, string> = { available: "bg-green-500/20 text-green-400", underNegotiation: "bg-yellow-500/20 text-yellow-400", newListing: "bg-blue-500/20 text-blue-400", priceReduced: "bg-red-500/20 text-red-400" };

  const handleEnquiry = () => {
    setEnquirySent(true);
    setTimeout(() => { setEnquirySent(false); setShowEnquiry(false); }, 2000);
  };

  const handleFinancials = () => {
    setFinancialsRequested(true);
    setTimeout(() => { setFinancialsRequested(false); setShowFinancials(false); }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-cream/40 mb-6">
        <Link href="/business" className="hover:text-gold transition-colors">{t("businesses")}</Link>
        <span>/</span>
        <span className="text-cream/60">{biz.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Hero Image */}
          <div className="bg-navy-light border border-gold/10 rounded-2xl overflow-hidden mb-6">
            <div className="h-64 md:h-80 bg-gradient-to-br from-gold/5 to-navy flex items-center justify-center relative">
              <svg className="w-24 h-24 text-gold/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={"text-sm px-3 py-1 rounded-full font-medium " + (statusColor[biz.status] || "")}>{t("status." + biz.status)}</span>
                {biz.franchise && <span className="text-sm px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 font-medium">{t("franchise")}</span>}
              </div>
              <span className="absolute bottom-4 right-4 bg-navy/80 text-cream/60 text-xs px-3 py-1 rounded-full">{t("photosComingSoon")}</span>
            </div>
          </div>

          {/* Title & Price */}
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-display text-cream font-bold mb-2">{biz.name}</h1>
                <p className="text-cream/40 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {biz.location}, {biz.city}, {biz.province}
                </p>
              </div>
              <p className="text-gold text-2xl md:text-3xl font-bold whitespace-nowrap">{biz.askingPriceFormatted}</p>
            </div>
          </div>

          {/* Financial Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-navy-light border border-gold/10 rounded-xl p-4 text-center">
              <p className="text-gold font-bold text-lg">{biz.monthlyRevenue}</p>
              <p className="text-cream/40 text-xs">{t("monthlyRevenue")}</p>
            </div>
            <div className="bg-navy-light border border-gold/10 rounded-xl p-4 text-center">
              <p className="text-green-400 font-bold text-lg">{biz.monthlyProfit}</p>
              <p className="text-cream/40 text-xs">{t("monthlyProfit")}</p>
            </div>
            <div className="bg-navy-light border border-gold/10 rounded-xl p-4 text-center">
              <p className="text-cream font-bold text-lg">{biz.employees}</p>
              <p className="text-cream/40 text-xs">{t("employees")}</p>
            </div>
            <div className="bg-navy-light border border-gold/10 rounded-xl p-4 text-center">
              <p className="text-cream font-bold text-lg">{biz.yearsEstablished} {t("yrs")}</p>
              <p className="text-cream/40 text-xs">{t("established")}</p>
            </div>
          </div>

          {/* Annual Financials */}
          <div className="bg-navy-light border border-gold/10 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-display text-gold font-semibold mb-4">{t("financialSummary")}</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between"><span className="text-cream/40">{t("annualRevenue")}</span><span className="text-cream font-semibold">{biz.annualRevenue}</span></div>
              <div className="flex justify-between"><span className="text-cream/40">{t("annualProfit")}</span><span className="text-green-400 font-semibold">{biz.annualProfit}</span></div>
              <div className="flex justify-between"><span className="text-cream/40">{t("askingPrice")}</span><span className="text-gold font-semibold">{biz.askingPriceFormatted}</span></div>
              <div className="flex justify-between"><span className="text-cream/40">{t("priceToProfit")}</span><span className="text-cream font-semibold">{(biz.askingPrice / (parseInt(biz.annualProfit.replace(/\D/g, "")))).toFixed(1)}x</span></div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-navy-light border border-gold/10 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-display text-gold font-semibold mb-3">{t("aboutBusiness")}</h2>
            <p className="text-cream/60 text-sm leading-relaxed">{biz.description}</p>
          </div>

          {/* Business Details */}
          <div className="bg-navy-light border border-gold/10 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-display text-gold font-semibold mb-4">{t("businessDetails")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between"><span className="text-cream/40">{t("category")}</span><span className="text-cream capitalize">{biz.category}</span></div>
              <div className="flex justify-between"><span className="text-cream/40">{t("operatingHours")}</span><span className="text-cream">{biz.operatingHours}</span></div>
              <div className="flex justify-between"><span className="text-cream/40">{t("reasonForSale")}</span><span className="text-cream">{biz.reasonForSale}</span></div>
              <div className="flex justify-between"><span className="text-cream/40">{t("franchiseLabel")}</span><span className="text-cream">{biz.franchise ? t("yes") : t("no")}</span></div>
            </div>
          </div>

          {/* Assets Included */}
          <div className="bg-navy-light border border-gold/10 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-display text-gold font-semibold mb-4">{t("assetsIncluded")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {biz.assets.map((asset, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span className="text-cream/70">{asset}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-navy-light border border-gold/10 rounded-2xl p-6">
            <h2 className="text-lg font-display text-gold font-semibold mb-4">{t("keyHighlights")}</h2>
            <div className="flex flex-wrap gap-2">
              {biz.highlights.map((h, i) => (
                <span key={i} className="px-3 py-1.5 bg-gold/10 text-gold text-sm rounded-full">{h}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Agent Card */}
          <div className="bg-navy-light border border-gold/10 rounded-2xl p-6 sticky top-24">
            <h3 className="text-gold font-semibold mb-4">{t("listedBy")}</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <div>
                <p className="text-cream font-semibold">{biz.agentName}</p>
                <p className="text-cream/40 text-sm">Business Broker</p>
              </div>
            </div>
            <div className="space-y-2 mb-5">
              <a href={"tel:" + biz.agentPhone} className="flex items-center gap-2 text-cream/60 text-sm hover:text-gold transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {biz.agentPhone}
              </a>
              <a href={"mailto:" + biz.agentEmail} className="flex items-center gap-2 text-cream/60 text-sm hover:text-gold transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {biz.agentEmail}
              </a>
            </div>

            <button onClick={() => setShowEnquiry(true)} className="w-full py-3 bg-gold text-navy-dark font-semibold rounded-xl hover:bg-gold-light transition-colors mb-3">{t("sendEnquiry")}</button>
            <button onClick={() => setShowFinancials(true)} className="w-full py-3 border border-gold/30 text-gold font-semibold rounded-xl hover:border-gold transition-colors mb-3">{t("requestFinancials")}</button>
            <a href={"https://wa.me/27821234567?text=Hi, I am interested in " + biz.name} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              WhatsApp
            </a>
          </div>

          {/* Quick Stats */}
          <div className="bg-navy-light border border-gold/10 rounded-2xl p-6">
            <h3 className="text-gold font-semibold mb-3">{t("investmentSnapshot")}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-cream/50">{t("askingPrice")}</span><span className="text-cream">{biz.askingPriceFormatted}</span></div>
              <div className="flex justify-between"><span className="text-cream/50">{t("annualProfit")}</span><span className="text-green-400">{biz.annualProfit}</span></div>
              <div className="flex justify-between"><span className="text-cream/50">{t("roi")}</span><span className="text-gold font-bold">{((parseInt(biz.annualProfit.replace(/\D/g, "")) / biz.askingPrice) * 100).toFixed(1)}%</span></div>
              <div className="flex justify-between"><span className="text-cream/50">{t("paybackPeriod")}</span><span className="text-cream">{(biz.askingPrice / parseInt(biz.annualProfit.replace(/\D/g, ""))).toFixed(1)} {t("yrs")}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      {showEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-navy-light border border-gold/20 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-display text-gold font-semibold">{t("enquireAbout")}</h3>
              <button onClick={() => setShowEnquiry(false)} className="text-cream/30 hover:text-cream"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <p className="text-cream/50 text-sm mb-4">{biz.name} - {biz.askingPriceFormatted}</p>
            {enquirySent ? (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-green-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <p className="text-cream font-semibold">{t("enquirySent")}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <input value={enquiryForm.name} onChange={(e) => setEnquiryForm({...enquiryForm, name: e.target.value})} placeholder={t("yourName")} className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none" />
                <input value={enquiryForm.email} onChange={(e) => setEnquiryForm({...enquiryForm, email: e.target.value})} placeholder={t("yourEmail")} type="email" className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none" />
                <input value={enquiryForm.phone} onChange={(e) => setEnquiryForm({...enquiryForm, phone: e.target.value})} placeholder={t("yourPhone")} type="tel" className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none" />
                <textarea value={enquiryForm.message} onChange={(e) => setEnquiryForm({...enquiryForm, message: e.target.value})} placeholder={t("yourMessage")} rows={3} className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none resize-none" />
                <button onClick={handleEnquiry} className="w-full py-3 bg-gold text-navy-dark font-semibold rounded-xl hover:bg-gold-light transition-colors">{t("send")}</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Financials Modal */}
      {showFinancials && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-navy-light border border-gold/20 rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-display text-gold font-semibold">{t("requestFinancials")}</h3>
              <button onClick={() => setShowFinancials(false)} className="text-cream/30 hover:text-cream"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <p className="text-cream/50 text-sm mb-4">{t("financialsNote")}</p>
            {financialsRequested ? (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-green-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <p className="text-cream font-semibold">{t("financialsSent")}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <input placeholder={t("yourName")} className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none" />
                <input placeholder={t("yourEmail")} type="email" className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none" />
                <input placeholder={t("yourPhone")} type="tel" className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none" />
                <label className="flex items-start gap-2 text-cream/50 text-xs">
                  <input type="checkbox" className="mt-0.5 rounded bg-navy-light border-gold/30 text-gold focus:ring-gold" />
                  {t("ndaAgreement")}
                </label>
                <button onClick={handleFinancials} className="w-full py-3 bg-gold text-navy-dark font-semibold rounded-xl hover:bg-gold-light transition-colors">{t("requestAccess")}</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}