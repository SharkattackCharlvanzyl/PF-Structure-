"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

type Tab = "overview" | "properties" | "enquiries" | "agreements" | "settings";

interface Property {
  id: string;
  title: string;
  address: string;
  price: string;
  type: string;
  status: "active" | "pending" | "sold" | "rented" | "draft";
  views: number;
  enquiries: number;
  listed: string;
  image: string;
}

const DEMO_PROPERTIES: Property[] = [
  {
    id: "PF-001",
    title: "Modern 3-Bed Apartment",
    address: "24 Oak Avenue, Sandton, Johannesburg",
    price: "R 2,450,000",
    type: "apartment",
    status: "active",
    views: 342,
    enquiries: 8,
    listed: "2026-03-15",
    image: "",
  },
  {
    id: "PF-002",
    title: "Luxury Villa with Pool",
    address: "8 Marine Drive, Camps Bay, Cape Town",
    price: "R 12,800,000",
    type: "house",
    status: "active",
    views: 891,
    enquiries: 14,
    listed: "2026-02-28",
    image: "",
  },
  {
    id: "PF-003",
    title: "Commercial Office Space",
    address: "Floor 5, Menlyn Maine, Pretoria",
    price: "R 45,000 /mo",
    type: "commercial",
    status: "rented",
    views: 156,
    enquiries: 3,
    listed: "2026-01-10",
    image: "",
  },
  {
    id: "PF-004",
    title: "Vacant Land - 2,000 sqm",
    address: "Plot 42, Ballito, KwaZulu-Natal",
    price: "R 1,100,000",
    type: "land",
    status: "pending",
    views: 67,
    enquiries: 2,
    listed: "2026-03-22",
    image: "",
  },
  {
    id: "PF-005",
    title: "Cozy Studio in City Centre",
    address: "Unit 12B, The Point, Durban",
    price: "R 890,000",
    type: "apartment",
    status: "sold",
    views: 423,
    enquiries: 11,
    listed: "2025-12-05",
    image: "",
  },
];

interface Enquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: "new" | "read" | "replied";
}

const DEMO_ENQUIRIES: Enquiry[] = [
  {
    id: "ENQ-001",
    propertyId: "PF-001",
    propertyTitle: "Modern 3-Bed Apartment",
    name: "John Smith",
    email: "john@example.com",
    phone: "+27 82 123 4567",
    message: "I am interested in viewing this property. Is it still available?",
    date: "2026-03-30",
    status: "new",
  },
  {
    id: "ENQ-002",
    propertyId: "PF-002",
    propertyTitle: "Luxury Villa with Pool",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+27 83 987 6543",
    message: "Could you provide more details about the security features and levies?",
    date: "2026-03-29",
    status: "new",
  },
  {
    id: "ENQ-003",
    propertyId: "PF-002",
    propertyTitle: "Luxury Villa with Pool",
    name: "David Lee",
    email: "david@example.com",
    phone: "+27 71 555 8888",
    message: "Would the owner consider a rental option instead?",
    date: "2026-03-28",
    status: "read",
  },
  {
    id: "ENQ-004",
    propertyId: "PF-001",
    propertyTitle: "Modern 3-Bed Apartment",
    name: "Maria Garcia",
    email: "maria@example.com",
    phone: "+27 84 222 3333",
    message: "What are the monthly levies and rates for this property?",
    date: "2026-03-27",
    status: "replied",
  },
  {
    id: "ENQ-005",
    propertyId: "PF-004",
    propertyTitle: "Vacant Land - 2,000 sqm",
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    phone: "+27 72 444 9999",
    message: "Is the land zoned for residential development?",
    date: "2026-03-26",
    status: "read",
  },
];

interface Agreement {
  id: string;
  type: string;
  propertyTitle: string;
  date: string;
  status: "signed" | "pending" | "expired";
}

const DEMO_AGREEMENTS: Agreement[] = [
  { id: "AGR-001", type: "agency", propertyTitle: "Modern 3-Bed Apartment", date: "2026-03-15", status: "signed" },
  { id: "AGR-002", type: "private", propertyTitle: "Luxury Villa with Pool", date: "2026-02-28", status: "signed" },
  { id: "AGR-003", type: "enterprise", propertyTitle: "Commercial Office Space", date: "2026-01-10", status: "expired" },
  { id: "AGR-004", type: "auction", propertyTitle: "Vacant Land - 2,000 sqm", date: "2026-03-22", status: "pending" },
];

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-500/20 text-green-400",
  pending: "bg-yellow-500/20 text-yellow-400",
  sold: "bg-blue-500/20 text-blue-400",
  rented: "bg-purple-500/20 text-purple-400",
  draft: "bg-gray-500/20 text-gray-400",
  new: "bg-red-500/20 text-red-400",
  read: "bg-yellow-500/20 text-yellow-400",
  replied: "bg-green-500/20 text-green-400",
  signed: "bg-green-500/20 text-green-400",
  expired: "bg-red-500/20 text-red-400",
};

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [properties, setProperties] = useState(DEMO_PROPERTIES);
  const [enquiries, setEnquiries] = useState(DEMO_ENQUIRIES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs: { key: Tab; icon: string }[] = [
    { key: "overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { key: "properties", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
    { key: "enquiries", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { key: "agreements", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { key: "settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  ];

  const totalViews = properties.reduce((sum, p) => sum + p.views, 0);
  const totalEnquiries = properties.reduce((sum, p) => sum + p.enquiries, 0);
  const activeCount = properties.filter((p) => p.status === "active").length;
  const newEnquiryCount = enquiries.filter((e) => e.status === "new").length;

  const filteredProperties = properties.filter((p) => {
    const matchesFilter = propertyFilter === "all" || p.status === propertyFilter;
    const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDeleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEnquiryStatusChange = (id: string, status: "read" | "replied") => {
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  const renderOverview = () => (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: t("stats.listings.label"), value: activeCount, icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", color: "text-green-400" },
          { label: t("stats.views.label"), value: totalViews.toLocaleString(), icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z", color: "text-blue-400" },
          { label: t("stats.enquiries.label"), value: totalEnquiries, icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: "text-yellow-400" },
          { label: t("stats.saved.label"), value: "42", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", color: "text-red-400" },
        ].map((stat, i) => (
          <div key={i} className="bg-navy-light border border-gold/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <svg className={"w-6 h-6 " + stat.color} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
              </svg>
            </div>
            <p className="text-2xl font-bold text-cream">{stat.value}</p>
            <p className="text-cream/40 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Properties */}
        <div className="lg:col-span-2 bg-navy-light border border-gold/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-lg text-cream font-semibold">{t("recentProperties")}</h3>
            <button onClick={() => setActiveTab("properties")} className="text-gold text-sm hover:text-gold-light">{t("viewAll")}</button>
          </div>
          <div className="space-y-3">
            {properties.slice(0, 3).map((prop) => (
              <div key={prop.id} className="flex items-center gap-4 p-3 rounded-xl bg-navy/50 border border-gold/5">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-cream text-sm font-medium truncate">{prop.title}</p>
                  <p className="text-cream/40 text-xs truncate">{prop.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-gold text-sm font-semibold">{prop.price}</p>
                  <span className={"text-xs px-2 py-0.5 rounded-full " + STATUS_COLORS[prop.status]}>{t("status." + prop.status)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="bg-navy-light border border-gold/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-lg text-cream font-semibold">{t("recentEnquiries")}</h3>
            {newEnquiryCount > 0 && <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">{newEnquiryCount} {t("newLabel")}</span>}
          </div>
          <div className="space-y-3">
            {enquiries.slice(0, 4).map((enq) => (
              <button
                key={enq.id}
                onClick={() => { setSelectedEnquiry(enq); setActiveTab("enquiries"); }}
                className="w-full text-left p-3 rounded-xl bg-navy/50 border border-gold/5 hover:border-gold/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-cream text-sm font-medium">{enq.name}</p>
                  <span className={"text-xs px-2 py-0.5 rounded-full " + STATUS_COLORS[enq.status]}>{t("enquiryStatus." + enq.status)}</span>
                </div>
                <p className="text-cream/40 text-xs truncate">{enq.message}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="mt-6 bg-navy-light border border-gold/10 rounded-2xl p-6">
        <h3 className="font-display text-lg text-cream font-semibold mb-4">{t("performance")}</h3>
        <div className="grid grid-cols-7 gap-2 h-40 items-end">
          {[65, 40, 80, 55, 90, 70, 45].map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-full bg-gold/20 rounded-t-lg transition-all hover:bg-gold/40" style={{ height: h + "%" }} />
              <span className="text-cream/30 text-xs">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderProperties = () => (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("searchProperties")}
            className="w-full pl-10 pr-4 py-3 bg-navy-light border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none"
          />
        </div>
        <select
          value={propertyFilter}
          onChange={(e) => setPropertyFilter(e.target.value)}
          className="px-4 py-3 bg-navy-light border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none"
        >
          <option value="all">{t("filterAll")}</option>
          <option value="active">{t("status.active")}</option>
          <option value="pending">{t("status.pending")}</option>
          <option value="sold">{t("status.sold")}</option>
          <option value="rented">{t("status.rented")}</option>
          <option value="draft">{t("status.draft")}</option>
        </select>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-gold text-navy-dark font-semibold rounded-xl hover:bg-gold-light transition-colors whitespace-nowrap"
        >
          + {t("addListing")}
        </button>
      </div>

      <div className="space-y-4">
        {filteredProperties.map((prop) => (
          <div key={prop.id} className="bg-navy-light border border-gold/10 rounded-2xl p-5 hover:border-gold/30 transition-colors">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-32 h-24 rounded-xl bg-gold/5 flex items-center justify-center">
                <svg className="w-10 h-10 text-gold/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-cream font-semibold">{prop.title}</h3>
                    <p className="text-cream/40 text-sm">{prop.address}</p>
                  </div>
                  <span className={"text-xs px-3 py-1 rounded-full whitespace-nowrap " + STATUS_COLORS[prop.status]}>{t("status." + prop.status)}</span>
                </div>
                <div className="flex items-center gap-6 mt-3">
                  <p className="text-gold font-bold text-lg">{prop.price}</p>
                  <div className="flex items-center gap-4 text-cream/40 text-sm">
                    <span>{prop.views} {t("viewsLabel")}</span>
                    <span>{prop.enquiries} {t("enquiriesLabel")}</span>
                    <span>{t("listedOn")} {prop.listed}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setEditingProperty(prop)}
                    className="px-3 py-1.5 text-xs bg-gold/10 text-gold rounded-lg hover:bg-gold/20 transition-colors"
                  >
                    {t("edit")}
                  </button>
                  <button className="px-3 py-1.5 text-xs bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors">
                    {t("viewDetails")}
                  </button>
                  <button
                    onClick={() => handleDeleteProperty(prop.id)}
                    className="px-3 py-1.5 text-xs bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    {t("delete")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12 text-cream/30">
            <svg className="w-12 h-12 mx-auto mb-3 text-cream/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p>{t("noProperties")}</p>
          </div>
        )}
      </div>
    </>
  );

  const renderEnquiries = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className={"space-y-3 " + (selectedEnquiry ? "hidden lg:block" : "")}>
        {enquiries.map((enq) => (
          <button
            key={enq.id}
            onClick={() => { setSelectedEnquiry(enq); if (enq.status === "new") handleEnquiryStatusChange(enq.id, "read"); }}
            className={"w-full text-left p-4 rounded-2xl border transition-colors " + (selectedEnquiry?.id === enq.id ? "bg-navy-light border-gold/40" : "bg-navy-light/50 border-gold/10 hover:border-gold/20")}
          >
            <div className="flex items-center justify-between mb-1">
              <p className={"text-sm font-medium " + (enq.status === "new" ? "text-gold" : "text-cream")}>{enq.name}</p>
              <span className={"text-xs px-2 py-0.5 rounded-full " + STATUS_COLORS[enq.status]}>{t("enquiryStatus." + enq.status)}</span>
            </div>
            <p className="text-cream/60 text-xs mb-1">{enq.propertyTitle}</p>
            <p className="text-cream/30 text-xs truncate">{enq.message}</p>
            <p className="text-cream/20 text-xs mt-2">{enq.date}</p>
          </button>
        ))}
      </div>
      <div className="lg:col-span-2">
        {selectedEnquiry ? (
          <div className="bg-navy-light border border-gold/10 rounded-2xl p-6">
            <button onClick={() => setSelectedEnquiry(null)} className="lg:hidden text-gold text-sm mb-4 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              {t("back")}
            </button>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl text-cream font-semibold">{selectedEnquiry.name}</h3>
                <p className="text-cream/40 text-sm">{selectedEnquiry.email} | {selectedEnquiry.phone}</p>
              </div>
              <span className={"text-xs px-3 py-1 rounded-full " + STATUS_COLORS[selectedEnquiry.status]}>{t("enquiryStatus." + selectedEnquiry.status)}</span>
            </div>
            <div className="mb-4 p-3 bg-navy/50 rounded-xl border border-gold/5">
              <p className="text-cream/40 text-xs mb-1">{t("regarding")}</p>
              <p className="text-gold text-sm font-medium">{selectedEnquiry.propertyTitle}</p>
            </div>
            <div className="mb-6">
              <p className="text-cream/40 text-xs mb-2">{t("message")}</p>
              <p className="text-cream text-sm leading-relaxed">{selectedEnquiry.message}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEnquiryStatusChange(selectedEnquiry.id, "replied")}
                className="px-4 py-2 bg-gold text-navy-dark font-semibold rounded-xl hover:bg-gold-light transition-colors text-sm"
              >
                {t("markReplied")}
              </button>
              <a
                href={"mailto:" + selectedEnquiry.email}
                className="px-4 py-2 bg-navy border border-gold/20 text-gold rounded-xl hover:border-gold/40 transition-colors text-sm"
              >
                {t("sendEmail")}
              </a>
              <a
                href={"tel:" + selectedEnquiry.phone}
                className="px-4 py-2 bg-navy border border-gold/20 text-gold rounded-xl hover:border-gold/40 transition-colors text-sm"
              >
                {t("call")}
              </a>
            </div>
          </div>
        ) : (
          <div className="bg-navy-light border border-gold/10 rounded-2xl p-12 text-center text-cream/30">
            <svg className="w-12 h-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p>{t("selectEnquiry")}</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderAgreements = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-cream font-semibold">{t("agreementsTitle")}</h3>
        <a href="/agreement" className="px-4 py-2 bg-gold text-navy-dark font-semibold rounded-xl hover:bg-gold-light transition-colors text-sm">
          + {t("newAgreement")}
        </a>
      </div>
      {DEMO_AGREEMENTS.map((agr) => (
        <div key={agr.id} className="bg-navy-light border border-gold/10 rounded-2xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-cream font-medium">{agr.propertyTitle}</p>
              <p className="text-cream/40 text-sm">{agr.id} | {t("agreementType." + agr.type)} | {agr.date}</p>
            </div>
          </div>
          <span className={"text-xs px-3 py-1 rounded-full " + STATUS_COLORS[agr.status]}>{t("agreementStatus." + agr.status)}</span>
        </div>
      ))}
    </div>
  );

  const renderSettings = () => (
    <div className="max-w-2xl">
      <div className="bg-navy-light border border-gold/10 rounded-2xl p-6 mb-6">
        <h3 className="text-cream font-semibold mb-5">{t("profileSettings")}</h3>
        <div className="space-y-4">
          {["displayName", "emailAddress", "phoneNumber", "company"].map((field) => (
            <div key={field}>
              <label className="block text-cream/60 text-sm mb-1.5">{t("settingsFields." + field)}</label>
              <input className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none" placeholder={t("settingsFields." + field)} />
            </div>
          ))}
        </div>
        <button className="mt-6 px-6 py-3 bg-gold text-navy-dark font-semibold rounded-xl hover:bg-gold-light transition-colors">
          {t("saveChanges")}
        </button>
      </div>
      <div className="bg-navy-light border border-gold/10 rounded-2xl p-6">
        <h3 className="text-cream font-semibold mb-5">{t("notifications")}</h3>
        <div className="space-y-4">
          {["emailNotify", "smsNotify", "enquiryAlerts", "weeklyReport"].map((setting) => (
            <label key={setting} className="flex items-center justify-between p-3 rounded-xl hover:bg-navy/50 cursor-pointer">
              <span className="text-cream/70 text-sm">{t("notificationSettings." + setting)}</span>
              <div className="w-11 h-6 bg-gold/20 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-gold rounded-full" />
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-gold font-bold">{t("title")}</h1>
          <p className="text-cream/50 mt-1">{t("welcome")}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-navy-light/50 rounded-2xl p-1.5 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={"flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap " + (activeTab === tab.key ? "bg-gold text-navy-dark" : "text-cream/50 hover:text-cream hover:bg-navy-light")}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
            </svg>
            {t("tabs." + tab.key)}
            {tab.key === "enquiries" && newEnquiryCount > 0 && (
              <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{newEnquiryCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && renderOverview()}
      {activeTab === "properties" && renderProperties()}
      {activeTab === "enquiries" && renderEnquiries()}
      {activeTab === "agreements" && renderAgreements()}
      {activeTab === "settings" && renderSettings()}

      {/* Add/Edit Property Modal */}
      {(showAddModal || editingProperty) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-navy-light border border-gold/20 rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display text-gold font-semibold">{editingProperty ? t("editProperty") : t("addProperty")}</h3>
              <button onClick={() => { setShowAddModal(false); setEditingProperty(null); }} className="text-cream/30 hover:text-cream">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-4">
              {["title", "address", "price", "type"].map((field) => (
                <div key={field}>
                  <label className="block text-cream/60 text-sm mb-1.5">{t("propertyFields." + field)}</label>
                  <input
                    defaultValue={editingProperty ? (editingProperty as any)[field] : ""}
                    className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none"
                    placeholder={t("propertyFields." + field)}
                  />
                </div>
              ))}
              <div>
                <label className="block text-cream/60 text-sm mb-1.5">{t("propertyFields.status")}</label>
                <select defaultValue={editingProperty?.status || "draft"} className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-xl text-cream focus:border-gold focus:outline-none">
                  <option value="draft">{t("status.draft")}</option>
                  <option value="active">{t("status.active")}</option>
                  <option value="pending">{t("status.pending")}</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setShowAddModal(false); setEditingProperty(null); }}
                className="flex-1 py-3 bg-gold text-navy-dark font-semibold rounded-xl hover:bg-gold-light transition-colors"
              >
                {editingProperty ? t("saveChanges") : t("addListing")}
              </button>
              <button
                onClick={() => { setShowAddModal(false); setEditingProperty(null); }}
                className="px-6 py-3 border border-gold/20 text-cream/50 rounded-xl hover:border-gold/40 transition-colors"
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
