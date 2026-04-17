"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { RENTAL_PROPERTIES } from "@/lib/properties";

const FEATURE_ICONS: Record<string, string> = {
  pool: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
  garden: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  security: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  fibre: "M13 10V3L4 14h7v7l9-11h-7z",
  aircon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  balcony: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  fireplace: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z",
  gym: "M4 6h16M4 12h16M4 18h16",
  solarPanels: "M12 3v1m4.22 1.78l-.707.707M20 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  borehole: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  staffQuarters: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  braaiArea: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z",
  petFriendly: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  flatlet: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
};

export default function RentDetailPage() {
  const t = useTranslations("propertyDetail");
  const params = useParams();
  const id = params.id as string;
  const property = RENTAL_PROPERTIES.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [enquirySent, setEnquirySent] = useState(false);

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16 text-center">
        <h1 className="text-2xl text-cream/40 mb-4">{t("notFound")}</h1>
        <Link href="/rent" className="text-gold hover:text-gold-light">{t("backToListings")}</Link>
      </div>
    );
  }

  const handleEnquiry = () => {
    setEnquirySent(true);
    setTimeout(() => { setEnquirySent(false); setShowEnquiry(false); }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-cream/40 mb-6">
        <Link href="/buy" className="hover:text-gold transition-colors">{t("rent")}</Link>
        <span>/</span>
        <span className="text-cream/60">{property.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="bg-navy-light border border-gold/10 rounded-2xl overflow-hidden mb-6">
            <div className="h-72 md:h-96 bg-gradient-to-br from-gold/5 to-navy flex items-center justify-center relative">
              <svg className="w-24 h-24 text-gold/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span className="absolute bottom-4 right-4 bg-navy/80 text-cream/60 text-xs px-3 py-1 rounded-full">{t("photosComingSoon")}</span>
            </div>
            <div className="flex gap-2 p-3 overflow-x-auto">
              {[0, 1, 2, 3, 4].map((i) => (
                <button key={i} onClick={() => setActiveImage(i)} className={"w-16 h-16 rounded-lg bg-gold/5 border-2 transition-all shrink-0 " + (activeImage === i ? "border-gold" : "border-transparent")}>
                  <div className="w-full h-full rounded-md bg-gradient-to-br from-gold/5 to-navy" />
                </button>
              ))}
            </div>
          </div>

          {/* Title & Price */}
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-display text-cream font-bold mb-2">{property.title}</h1>
                <p className="text-cream/40 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {property.address}, {property.city}, {property.province}
                </p>
              </div>
              <p className="text-gold text-2xl md:text-3xl font-bold whitespace-nowrap">{property.priceFormatted}</p>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: t("bedrooms"), value: property.bedrooms, icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
              { label: t("bathrooms"), value: property.bathrooms, icon: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" },
              { label: t("garages"), value: property.garages, icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" },
              { label: t("floorSize"), value: property.floorSize + " m\u00B2", icon: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" },
            ].map((stat, i) => (
              <div key={i} className="bg-navy-light border border-gold/10 rounded-xl p-4 text-center">
                <svg className="w-5 h-5 text-gold mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} /></svg>
                <p className="text-cream font-bold text-lg">{stat.value}</p>
                <p className="text-cream/40 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="bg-navy-light border border-gold/10 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-display text-gold font-semibold mb-3">{t("description")}</h2>
            <p className="text-cream/60 text-sm leading-relaxed">{property.description}</p>
          </div>

          {/* Property Details */}
          <div className="bg-navy-light border border-gold/10 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-display text-gold font-semibold mb-4">{t("propertyDetails")}</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between"><span className="text-cream/40">{t("propertyType")}</span><span className="text-cream capitalize">{property.type}</span></div>
              <div className="flex justify-between"><span className="text-cream/40">{t("erfSize")}</span><span className="text-cream">{property.erfSize > 0 ? property.erfSize + " m\u00B2" : "N/A"}</span></div>
              <div className="flex justify-between"><span className="text-cream/40">{t("yearBuilt")}</span><span className="text-cream">{property.yearBuilt}</span></div>
              <div className="flex justify-between"><span className="text-cream/40">{t("status")}</span><span className="text-green-400">{t("available")}</span></div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-navy-light border border-gold/10 rounded-2xl p-6">
            <h2 className="text-lg font-display text-gold font-semibold mb-4">{t("features")}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.features.map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={FEATURE_ICONS[feat] || "M5 13l4 4L19 7"} />
                  </svg>
                  <span className="text-cream/70">{t("featureLabels." + feat)}</span>
                </div>
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
                <p className="text-cream font-semibold">{property.agentName}</p>
                <p className="text-cream/40 text-sm">Propworths Agent</p>
              </div>
            </div>

            <div className="space-y-2 mb-5">
              <a href={"tel:" + property.agentPhone} className="flex items-center gap-2 text-cream/60 text-sm hover:text-gold transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {property.agentPhone}
              </a>
              <a href={"mailto:" + property.agentEmail} className="flex items-center gap-2 text-cream/60 text-sm hover:text-gold transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {property.agentEmail}
              </a>
            </div>

            <button onClick={() => setShowEnquiry(true)} className="w-full py-3 bg-gold text-navy-dark font-semibold rounded-xl hover:bg-gold-light transition-colors mb-3">{t("sendEnquiry")}</button>
            <a href={"https://wa.me/27821234567?text=Hi, I am interested in " + property.title} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              WhatsApp
            </a>
          </div>

          {/* Calculator Widget */}
          <div className="bg-navy-light border border-gold/10 rounded-2xl p-6">
            <h3 className="text-gold font-semibold mb-3">{t("bondEstimate")}</h3>
            <p className="text-cream/40 text-xs mb-3">{t("bondNote")}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-cream/50">{t("loanAmount")}</span><span className="text-cream">{property.priceFormatted}</span></div>
              <div className="flex justify-between"><span className="text-cream/50">{t("interestRate")}</span><span className="text-cream">11.75%</span></div>
              <div className="flex justify-between"><span className="text-cream/50">{t("term")}</span><span className="text-cream">20 {t("years")}</span></div>
              <div className="border-t border-gold/10 pt-2 flex justify-between"><span className="text-cream/50 font-semibold">{t("monthlyPayment")}</span><span className="text-gold font-bold">R {Math.round(property.price * 0.01175 / 12 / (1 - Math.pow(1 + 0.01175/12, -240))).toLocaleString()}</span></div>
            </div>
            <Link href="/calculators" className="block mt-4 text-center text-gold text-sm hover:text-gold-light transition-colors">{t("fullCalculator")}</Link>
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
            <p className="text-cream/50 text-sm mb-4">{property.title} - {property.priceFormatted}</p>
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
    </div>
  );
}
