"use client";
import { useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";

type Step = 0 | 1 | 2 | 3 | 4;

interface PropertyImage {
  id: string;
  file: File;
  preview: string;
  isPrimary: boolean;
}

interface PropertyFormData {
  // Step 1: Property Type & Location
  listingType: "sale" | "rent" | "";
  propertyType: string;
  title: string;
  description: string;
  // Step 2: Location
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  // Step 3: Details
  bedrooms: string;
  bathrooms: string;
  garages: string;
  floorSize: string;
  erfSize: string;
  yearBuilt: string;
  // Step 3: Price
  price: string;
  priceNegotiable: boolean;
  // Step 3: Features
  features: string[];
}

const PROPERTY_TYPES = ["house", "apartment", "townhouse", "villa", "farm", "commercial", "land", "industrial"];
const PROVINCES = ["Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape", "Free State", "Limpopo", "Mpumalanga", "North West", "Northern Cape"];
const FEATURES = ["pool", "garden", "security", "petFriendly", "aircon", "fireplace", "balcony", "gym", "braaiArea", "staffQuarters", "solarPanels", "borehole", "fibre", "flatlet"];

const STEP_ICONS = [
  "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  "M5 13l4 4L19 7",
];

export default function ListPropertyPage() {
  const t = useTranslations("listProperty");
  const [step, setStep] = useState<Step>(0);
  const [images, setImages] = useState<PropertyImage[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [listingRef, setListingRef] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<PropertyFormData>({
    listingType: "",
    propertyType: "",
    title: "",
    description: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    country: "South Africa",
    bedrooms: "",
    bathrooms: "",
    garages: "",
    floorSize: "",
    erfSize: "",
    yearBuilt: "",
    price: "",
    priceNegotiable: false,
    features: [],
  });

  const updateForm = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (feature: string) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const newImages: PropertyImage[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 20 - images.length)
      .map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        preview: URL.createObjectURL(file),
        isPrimary: images.length === 0,
      }));
    setImages((prev) => [...prev, ...newImages]);
  }, [images.length]);

  const removeImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      if (filtered.length > 0 && !filtered.some((img) => img.isPrimary)) {
        filtered[0].isPrimary = true;
      }
      return filtered;
    });
  };

  const setPrimaryImage = (id: string) => {
    setImages((prev) => prev.map((img) => ({ ...img, isPrimary: img.id === id })));
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleSubmit = async () => {
    setSubmitting(true);
    const ref = "PF-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();
    await new Promise((r) => setTimeout(r, 1500));
    setListingRef(ref);
    setSubmitted(true);
    setSubmitting(false);
  };

  const canProceed = (s: Step): boolean => {
    switch (s) {
      case 0: return !!form.listingType && !!form.propertyType && !!form.title;
      case 1: return !!form.address && !!form.city && !!form.province;
      case 2: return !!form.price;
      case 3: return images.length >= 1;
      default: return true;
    }
  };

  const stepNames = ["type", "location", "details", "photos", "review"];

  // Success screen
  if (submitted) {
    return (
      <section className="min-h-screen py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-display font-bold text-gold mb-3">{t("success.title")}</h2>
          <p className="text-cream/70 mb-2">{t("success.message")}</p>
          <p className="text-gold font-mono text-lg mb-8">{listingRef}</p>
          <div className="flex gap-4 justify-center">
            <a href="/dashboard" className="px-6 py-3 bg-gold text-navy-dark font-semibold rounded-xl hover:bg-gold-light transition-colors">
              {t("success.goToDashboard")}
            </a>
            <button onClick={() => { setSubmitted(false); setStep(0); setImages([]); setForm({ listingType: "", propertyType: "", title: "", description: "", address: "", city: "", province: "", postalCode: "", country: "South Africa", bedrooms: "", bathrooms: "", garages: "", floorSize: "", erfSize: "", yearBuilt: "", price: "", priceNegotiable: false, features: [] }); }} className="px-6 py-3 border border-gold/30 text-gold rounded-xl hover:border-gold transition-colors">
              {t("success.listAnother")}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-display font-bold text-gold mb-2 text-center">{t("title")}</h1>
        <p className="text-cream/60 text-center mb-10">{t("subtitle")}</p>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-10 max-w-xl mx-auto">
          {stepNames.map((name, i) => (
            <div key={name} className="flex items-center">
              <button
                onClick={() => { if (i < step) setStep(i as Step); }}
                className={"w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all " + (i === step ? "bg-gold text-navy-dark" : i < step ? "bg-gold/30 text-gold cursor-pointer" : "bg-navy-light text-cream/30")}
              >
                {i < step ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                ) : i + 1}
              </button>
              {i < 4 && <div className={"w-8 sm:w-16 h-0.5 mx-1 " + (i < step ? "bg-gold/30" : "bg-navy-light")} />}
            </div>
          ))}
        </div>

        {/* Step 0: Property Type */}
        {step === 0 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-display text-cream font-semibold mb-4">{t("steps.type.listingType")}</h2>
              <div className="grid grid-cols-2 gap-4">
                {(["sale", "rent"] as const).map((lt) => (
                  <button
                    key={lt}
                    onClick={() => updateForm("listingType", lt)}
                    className={"p-5 rounded-2xl border-2 transition-all text-center " + (form.listingType === lt ? "border-gold bg-gold/10 text-gold" : "border-gold/20 text-cream/50 hover:border-gold/40")}
                  >
                    <div className="text-2xl mb-2">{lt === "sale" ? "🏷️" : "🔑"}</div>
                    <p className="font-semibold">{t("steps.type." + lt)}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-display text-cream font-semibold mb-4">{t("steps.type.propertyType")}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PROPERTY_TYPES.map((pt) => (
                  <button
                    key={pt}
                    onClick={() => updateForm("propertyType", pt)}
                    className={"px-4 py-3 rounded-xl border transition-all text-sm " + (form.propertyType === pt ? "border-gold bg-gold/10 text-gold" : "border-gold/20 text-cream/50 hover:border-gold/40")}
                  >
                    {t("propertyTypes." + pt)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-cream/70 text-sm mb-1.5">{t("fields.title")}</label>
              <input
                value={form.title}
                onChange={(e) => updateForm("title", e.target.value)}
                className="w-full px-4 py-3 bg-navy-light border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none"
                placeholder={t("fields.titlePlaceholder")}
              />
            </div>
            <div>
              <label className="block text-cream/70 text-sm mb-1.5">{t("fields.description")}</label>
              <textarea
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-navy-light border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none resize-none"
                placeholder={t("fields.descriptionPlaceholder")}
              />
            </div>
          </div>
        )}

        {/* Step 1: Location */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-xl font-display text-cream font-semibold mb-2">{t("steps.location.heading")}</h2>
            <div>
              <label className="block text-cream/70 text-sm mb-1.5">{t("fields.address")}</label>
              <input value={form.address} onChange={(e) => updateForm("address", e.target.value)} className="w-full px-4 py-3 bg-navy-light border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none" placeholder={t("fields.addressPlaceholder")} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-cream/70 text-sm mb-1.5">{t("fields.city")}</label>
                <input value={form.city} onChange={(e) => updateForm("city", e.target.value)} className="w-full px-4 py-3 bg-navy-light border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-cream/70 text-sm mb-1.5">{t("fields.province")}</label>
                <select value={form.province} onChange={(e) => updateForm("province", e.target.value)} className="w-full px-4 py-3 bg-navy-light border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none">
                  <option value="">{t("fields.selectProvince")}</option>
                  {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-cream/70 text-sm mb-1.5">{t("fields.postalCode")}</label>
                <input value={form.postalCode} onChange={(e) => updateForm("postalCode", e.target.value)} className="w-full px-4 py-3 bg-navy-light border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none" />
              </div>
              <div>
                <label className="block text-cream/70 text-sm mb-1.5">{t("fields.country")}</label>
                <input value={form.country} onChange={(e) => updateForm("country", e.target.value)} className="w-full px-4 py-3 bg-navy-light border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none" />
              </div>
            </div>
            {/* Map placeholder */}
            <div className="h-48 rounded-2xl bg-navy-light border border-gold/10 flex items-center justify-center text-cream/20">
              <div className="text-center">
                <svg className="w-10 h-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <p className="text-sm">{t("steps.location.mapPlaceholder")}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Details & Price */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-display text-cream font-semibold mb-4">{t("steps.details.heading")}</h2>
              <div className="grid grid-cols-3 gap-4">
                {["bedrooms", "bathrooms", "garages"].map((field) => (
                  <div key={field}>
                    <label className="block text-cream/70 text-sm mb-1.5">{t("fields." + field)}</label>
                    <input type="number" min="0" value={form[field as keyof PropertyFormData] as string} onChange={(e) => updateForm(field, e.target.value)} className="w-full px-4 py-3 bg-navy-light border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none text-center" />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {["floorSize", "erfSize", "yearBuilt"].map((field) => (
                <div key={field}>
                  <label className="block text-cream/70 text-sm mb-1.5">{t("fields." + field)}</label>
                  <input value={form[field as keyof PropertyFormData] as string} onChange={(e) => updateForm(field, e.target.value)} className="w-full px-4 py-3 bg-navy-light border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none" />
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-xl font-display text-cream font-semibold mb-4">{t("steps.details.pricing")}</h2>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-cream/70 text-sm mb-1.5">{t("fields.price")}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gold font-semibold">R</span>
                    <input value={form.price} onChange={(e) => updateForm("price", e.target.value)} className="w-full pl-10 pr-4 py-3 bg-navy-light border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none" placeholder="0" />
                  </div>
                </div>
                <label className="flex items-center gap-2 pb-3 cursor-pointer">
                  <input type="checkbox" checked={form.priceNegotiable} onChange={(e) => updateForm("priceNegotiable", e.target.checked)} className="w-5 h-5 rounded bg-navy-light border-gold/30 text-gold focus:ring-gold" />
                  <span className="text-cream/60 text-sm">{t("fields.negotiable")}</span>
                </label>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-display text-cream font-semibold mb-4">{t("steps.details.features")}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {FEATURES.map((f) => (
                  <button
                    key={f}
                    onClick={() => toggleFeature(f)}
                    className={"px-4 py-2.5 rounded-xl border text-sm transition-all " + (form.features.includes(f) ? "border-gold bg-gold/10 text-gold" : "border-gold/20 text-cream/50 hover:border-gold/40")}
                  >
                    {t("features." + f)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Photos */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-display text-cream font-semibold">{t("steps.photos.heading")}</h2>
            <p className="text-cream/50 text-sm">{t("steps.photos.hint")}</p>

            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={"border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all " + (dragOver ? "border-gold bg-gold/5" : "border-gold/20 hover:border-gold/40")}
            >
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={(e) => handleFiles(e.target.files)} className="hidden" />
              <svg className="w-12 h-12 mx-auto mb-3 text-gold/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gold font-semibold mb-1">{t("steps.photos.dropHere")}</p>
              <p className="text-cream/40 text-sm">{t("steps.photos.orClick")}</p>
              <p className="text-cream/30 text-xs mt-2">{t("steps.photos.maxFiles")}</p>
            </div>

            {/* Image grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((img) => (
                  <div key={img.id} className={"relative group rounded-xl overflow-hidden border-2 " + (img.isPrimary ? "border-gold" : "border-transparent")}>
                    <img src={img.preview} alt="" className="w-full h-32 object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      {!img.isPrimary && (
                        <button onClick={(e) => { e.stopPropagation(); setPrimaryImage(img.id); }} className="px-2 py-1 bg-gold text-navy-dark text-xs rounded-lg font-semibold">{t("steps.photos.setPrimary")}</button>
                      )}
                      <button onClick={(e) => { e.stopPropagation(); removeImage(img.id); }} className="px-2 py-1 bg-red-500 text-white text-xs rounded-lg font-semibold">{t("steps.photos.remove")}</button>
                    </div>
                    {img.isPrimary && <span className="absolute top-2 left-2 bg-gold text-navy-dark text-xs px-2 py-0.5 rounded-full font-semibold">{t("steps.photos.primary")}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-display text-cream font-semibold">{t("steps.review.heading")}</h2>

            <div className="bg-navy-light border border-gold/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gold font-semibold">{t("steps.review.propertyInfo")}</h3>
                <button onClick={() => setStep(0)} className="text-gold/60 text-sm hover:text-gold">{t("steps.review.edit")}</button>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-cream/50">{t("fields.title")}:</div><div className="text-cream">{form.title}</div>
                <div className="text-cream/50">{t("steps.type.listingType")}:</div><div className="text-cream">{t("steps.type." + form.listingType)}</div>
                <div className="text-cream/50">{t("steps.type.propertyType")}:</div><div className="text-cream">{t("propertyTypes." + form.propertyType)}</div>
              </div>
            </div>

            <div className="bg-navy-light border border-gold/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gold font-semibold">{t("steps.review.location")}</h3>
                <button onClick={() => setStep(1)} className="text-gold/60 text-sm hover:text-gold">{t("steps.review.edit")}</button>
              </div>
              <p className="text-cream text-sm">{form.address}, {form.city}, {form.province} {form.postalCode}</p>
            </div>

            <div className="bg-navy-light border border-gold/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gold font-semibold">{t("steps.review.details")}</h3>
                <button onClick={() => setStep(2)} className="text-gold/60 text-sm hover:text-gold">{t("steps.review.edit")}</button>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm text-center">
                {form.bedrooms && <div className="p-2 bg-navy rounded-xl"><p className="text-gold text-lg font-bold">{form.bedrooms}</p><p className="text-cream/40 text-xs">{t("fields.bedrooms")}</p></div>}
                {form.bathrooms && <div className="p-2 bg-navy rounded-xl"><p className="text-gold text-lg font-bold">{form.bathrooms}</p><p className="text-cream/40 text-xs">{t("fields.bathrooms")}</p></div>}
                {form.garages && <div className="p-2 bg-navy rounded-xl"><p className="text-gold text-lg font-bold">{form.garages}</p><p className="text-cream/40 text-xs">{t("fields.garages")}</p></div>}
              </div>
              <p className="text-gold text-2xl font-bold">R {form.price}{form.priceNegotiable ? " (NEG)" : ""}</p>
              {form.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.features.map((f) => <span key={f} className="px-3 py-1 bg-gold/10 text-gold text-xs rounded-full">{t("features." + f)}</span>)}
                </div>
              )}
            </div>

            <div className="bg-navy-light border border-gold/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gold font-semibold">{t("steps.review.photos")} ({images.length})</h3>
                <button onClick={() => setStep(3)} className="text-gold/60 text-sm hover:text-gold">{t("steps.review.edit")}</button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {images.slice(0, 8).map((img) => (
                  <img key={img.id} src={img.preview} alt="" className={"w-full h-20 object-cover rounded-lg " + (img.isPrimary ? "ring-2 ring-gold" : "")} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          {step > 0 ? (
            <button onClick={() => setStep((step - 1) as Step)} className="px-6 py-3 border border-gold/20 text-cream/60 rounded-xl hover:border-gold/40 transition-colors">
              {t("prev")}
            </button>
          ) : <div />}
          {step < 4 ? (
            <button
              onClick={() => setStep((step + 1) as Step)}
              disabled={!canProceed(step)}
              className="px-8 py-3 bg-gold text-navy-dark font-semibold rounded-xl hover:bg-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t("next")}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-8 py-3 bg-gold text-navy-dark font-semibold rounded-xl hover:bg-gold-light transition-colors disabled:opacity-70"
            >
              {submitting ? t("submitting") : t("submitListing")}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
