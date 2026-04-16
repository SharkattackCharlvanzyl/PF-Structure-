"use client";
import { useState } from "react";
import Link from "next/link";

type PanelId =
  | "overview"
  | "listings"
  | "add-listing"
  | "enquiries"
  | "saved"
  | "billing"
  | "wallet"
  | "auctions"
  | "proval"
  | "analytics"
  | "notifications"
  | "profile"
  | "help";

const PANELS: { id: PanelId; icon: string; label: string }[] = [
  { id: "overview", icon: "📊", label: "Overview" },
  { id: "listings", icon: "🏡", label: "My Listings" },
  { id: "add-listing", icon: "➕", label: "Add New Listing" },
  { id: "enquiries", icon: "📩", label: "Enquiries" },
  { id: "saved", icon: "❤️", label: "Saved by Buyers" },
  { id: "billing", icon: "💳", label: "Billing & Invoices" },
  { id: "wallet", icon: "💰", label: "Advertising Wallet" },
  { id: "auctions", icon: "🔨", label: "My Auctions" },
  { id: "proval", icon: "🏠", label: "ProVal Reports" },
  { id: "analytics", icon: "📈", label: "My Analytics" },
  { id: "notifications", icon: "🔔", label: "Notifications" },
  { id: "profile", icon: "👤", label: "My Profile" },
  { id: "help", icon: "❓", label: "Help & Support" },
];

const TITLES: Record<PanelId, string> = {
  overview: "📊 Dashboard Overview",
  listings: "🏡 My Listings",
  "add-listing": "➕ Add New Listing",
  enquiries: "📩 Buyer Enquiries",
  saved: "❤️ Saved by Buyers",
  billing: "💳 Billing & Invoices",
  wallet: "💰 Advertising Wallet",
  auctions: "🔨 My Auctions",
  proval: "🏠 ProVal Reports",
  analytics: "📈 My Analytics",
  notifications: "🔔 Notifications",
  profile: "👤 My Profile",
  help: "❓ Help & Support",
};

const MY_LISTINGS = [
  { id: "L01", title: "3 Bed Family Home with Pool", loc: "Constantia, Cape Town", price: "R 3,500,000", type: "For Sale", status: "active", views: 128, enq: 4, saves: 12, img: "🏠" },
  { id: "L02", title: "Modern Office Space — 450m²", loc: "Sandton, Johannesburg", price: "R 28,000/mo", type: "For Rent", status: "active", views: 94, enq: 2, saves: 7, img: "🏢" },
  { id: "L03", title: "Luxury Penthouse, Clifton Beach", loc: "Clifton, Cape Town", price: "R 12,500,000", type: "For Sale", status: "active", views: 312, enq: 8, saves: 28, img: "🌊" },
  { id: "L04", title: "Warehouse & Logistics Hub", loc: "Montague Gardens, Cape Town", price: "R 4,200,000", type: "For Sale", status: "active", views: 42, enq: 1, saves: 3, img: "🏭" },
  { id: "L05", title: "Smallholding 12ha with Irrigation", loc: "Paarl, Western Cape", price: "R 2,800,000", type: "For Sale", status: "pending", views: 0, enq: 0, saves: 0, img: "🌾" },
  { id: "L06", title: "Studio Apartment, City Bowl", loc: "Cape Town CBD", price: "R 1,200,000", type: "For Sale", status: "draft", views: 0, enq: 0, saves: 0, img: "🏙️" },
  { id: "L07", title: "3 Bed Townhouse, Woodstock", loc: "Woodstock, Cape Town", price: "R 2,100,000", type: "For Sale", status: "sold", views: 180, enq: 12, saves: 15, img: "🏡" },
  { id: "L08", title: "Retail Shop, Waterfront", loc: "V&A Waterfront, Cape Town", price: "R 18,000/mo", type: "For Rent", status: "active", views: 67, enq: 3, saves: 5, img: "🛍️" },
];

const MY_ENQUIRIES = [
  { id: "E01", from: "Priya Naidoo", phone: "+27 82 111 2222", prop: "Luxury Penthouse, Clifton Beach", msg: "Hello, I'm very interested in this property. Could we arrange a viewing this weekend? I'm a cash buyer looking to move within 3 months.", time: "2h ago", status: "unread", flag: "🇿🇦" },
  { id: "E02", from: "David Chen", phone: "+852 9000 1234", prop: "3 Bed Family Home with Pool", msg: "We are relocating from Hong Kong and are interested in this property. What is the levy? Is the area safe?", time: "4h ago", status: "unread", flag: "🇭🇰" },
  { id: "E03", from: "Sarah Williams", phone: "+44 7700 000000", prop: "Modern Office Space — 450m²", msg: "We're looking for office space for our SA branch. Is this property still available? Are there parking bays included?", time: "6h ago", status: "unread", flag: "🇬🇧" },
  { id: "E04", from: "Ahmed Al-Farsi", phone: "+971 50 000 0000", prop: "Luxury Penthouse, Clifton Beach", msg: "Looking for investment properties in South Africa. What is the rental yield on this property?", time: "Yesterday", status: "replied", flag: "🇦🇪" },
  { id: "E05", from: "Lisa van Zyl", phone: "+27 84 333 4444", prop: "3 Bed Family Home with Pool", msg: "Is this property still available? I saw it last week and would like to make an offer.", time: "2 days ago", status: "replied", flag: "🇿🇦" },
];

const ACTIVITY = [
  { dot: "b", text: "New enquiry from Priya Naidoo — Clifton Penthouse", time: "2h ago" },
  { dot: "b", text: "New enquiry from David Chen — 3 Bed Family Home", time: "4h ago" },
  { dot: "g", text: "Your listing 'Luxury Penthouse' was saved 3 times today", time: "5h ago" },
  { dot: "y", text: "Monthly invoice issued: $135 — due 1 April", time: "1 day ago" },
  { dot: "g", text: "Listing 'Retail Shop, Waterfront' approved & live", time: "2 days ago" },
  { dot: "b", text: "Your listing '3 Bed Townhouse, Woodstock' marked as sold", time: "5 days ago" },
];

const OVERVIEW_STATS = [
  { icon: "🏡", val: "45", lbl: "Active Listings", trend: "+3", trendKind: "up" },
  { icon: "👁️", val: "1,284", lbl: "Views This Month", trend: "+18%", trendKind: "up" },
  { icon: "📩", val: "18", lbl: "Enquiries This Month", trend: "+5", trendKind: "up" },
  { icon: "❤️", val: "72", lbl: "Times Saved", trend: "+8", trendKind: "up" },
  { icon: "💰", val: "$135", lbl: "Monthly Fee", trend: "Due 1 Apr", trendKind: "flat" },
  { icon: "💳", val: "$79", lbl: "Ad Wallet Balance", trend: "Low", trendKind: "down" },
];

const INVOICES = [
  { id: "INV-2026-0041", date: "1 Mar 2026", period: "Feb 2026", listings: 45, total: "$135.00", status: "paid" },
  { id: "INV-2026-0029", date: "1 Feb 2026", period: "Jan 2026", listings: 42, total: "$126.00", status: "paid" },
  { id: "INV-2026-0017", date: "1 Jan 2026", period: "Dec 2025", listings: 39, total: "$117.00", status: "paid" },
];

const MY_AUCTIONS = [
  { id: "A01", title: "Luxury Penthouse, Clifton Beach", reserve: "R 12,500,000", currentBid: "R 11,800,000", bids: 14, ends: "18h 23m", status: "live" },
  { id: "A02", title: "Smallholding 12ha with Irrigation", reserve: "R 2,800,000", currentBid: "R 2,650,000", bids: 8, ends: "2d 4h", status: "live" },
  { id: "A03", title: "3 Bed Townhouse, Woodstock", reserve: "R 2,100,000", currentBid: "R 2,200,000", bids: 22, ends: "Sold", status: "completed" },
];

const PROVAL_REPORTS = [
  { id: "PV-1042", prop: "Luxury Penthouse, Clifton Beach", date: "12 Mar 2026", value: "R 12,850,000", status: "delivered" },
  { id: "PV-1031", prop: "3 Bed Family Home with Pool", date: "28 Feb 2026", value: "R 3,620,000", status: "delivered" },
  { id: "PV-1018", prop: "Warehouse & Logistics Hub", date: "10 Feb 2026", value: "R 4,400,000", status: "delivered" },
];

const NOTIFICATIONS = [
  { icon: "📩", text: "New enquiry from Priya Naidoo on 'Luxury Penthouse, Clifton'", time: "2h ago", unread: true },
  { icon: "❤️", text: "Your listing 'Luxury Penthouse' was saved 3 times today", time: "5h ago", unread: true },
  { icon: "🔨", text: "Your auction 'Clifton Penthouse' currently has 14 bids", time: "8h ago", unread: true },
  { icon: "💰", text: "Invoice INV-2026-0041 issued: $135 due 1 April", time: "1 day ago", unread: false },
  { icon: "✅", text: "Listing 'Retail Shop, Waterfront' approved & live", time: "2 days ago", unread: false },
];

function StatCard({ icon, val, lbl, trend, trendKind }: { icon: string; val: string; lbl: string; trend?: string; trendKind?: string }) {
  const trendCls =
    trendKind === "up"
      ? "bg-emerald-500/15 text-emerald-300"
      : trendKind === "down"
      ? "bg-red-500/15 text-red-300"
      : trendKind === "live"
      ? "bg-red-500/20 text-red-300 animate-pulse"
      : "bg-gold/15 text-gold";
  return (
    <div className="bg-navy-light border border-gold/15 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-xl">
          {icon}
        </div>
        {trend && <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${trendCls}`}>{trend}</span>}
      </div>
      <div className="font-display text-2xl font-bold text-cream">{val}</div>
      <div className="text-xs text-cream/55 mt-1">{lbl}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    pending: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    draft: "bg-cream/10 text-cream/60 border-cream/20",
    sold: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    live: "bg-red-500/15 text-red-300 border-red-500/30 animate-pulse",
    completed: "bg-gold/15 text-gold border-gold/30",
    unread: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    replied: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    paid: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    delivered: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  };
  return (
    <span className={`inline-block text-[10px] font-bold uppercase tracking-wider border rounded px-2 py-0.5 ${map[status] || "bg-cream/10 text-cream/60 border-cream/20"}`}>
      {status}
    </span>
  );
}

export default function UserDashboardPage() {
  const [panel, setPanel] = useState<PanelId>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-navy text-cream min-h-screen">
      <div className="max-w-7xl mx-auto flex pt-20">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } md:block fixed md:sticky inset-0 md:inset-auto md:top-20 top-16 h-[calc(100vh-5rem)] w-64 bg-navy-dark/95 md:bg-navy-light border-r border-gold/15 z-40 md:z-0 overflow-y-auto p-4`}
        >
          <div className="mb-6 px-3 py-3 bg-navy rounded-xl border border-gold/15">
            <div className="text-xs text-cream/55">Signed in as</div>
            <div className="font-semibold text-cream truncate">Charl van Zyl</div>
            <div className="text-xs text-gold">Private Seller · 45 listings</div>
          </div>
          <nav className="flex flex-col gap-1">
            {PANELS.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setPanel(p.id);
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${
                  panel === p.id
                    ? "bg-gold/15 text-gold border border-gold/30"
                    : "text-cream/70 hover:bg-gold/5 hover:text-cream"
                }`}
              >
                <span className="text-lg">{p.icon}</span>
                <span>{p.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 px-4 md:px-8 py-6 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-cream">{TITLES[panel]}</h1>
            <button
              className="md:hidden p-2 rounded-lg border border-gold/25 text-cream"
              onClick={() => setSidebarOpen((s) => !s)}
            >
              ☰ Menu
            </button>
          </div>

          {panel === "overview" && <OverviewPanel />}
          {panel === "listings" && <ListingsPanel />}
          {panel === "add-listing" && <AddListingPanel />}
          {panel === "enquiries" && <EnquiriesPanel />}
          {panel === "saved" && <SavedPanel />}
          {panel === "billing" && <BillingPanel />}
          {panel === "wallet" && <WalletPanel />}
          {panel === "auctions" && <AuctionsPanel />}
          {panel === "proval" && <ProValPanel />}
          {panel === "analytics" && <AnalyticsPanel />}
          {panel === "notifications" && <NotificationsPanel />}
          {panel === "profile" && <ProfilePanel />}
          {panel === "help" && <HelpPanel />}
        </main>
      </div>
    </div>
  );
}

function OverviewPanel() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {OVERVIEW_STATS.map((s) => (
          <StatCard key={s.lbl} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-navy-light border border-gold/15 rounded-2xl p-6">
          <h3 className="font-display text-lg font-semibold text-cream mb-4">Recent Enquiries</h3>
          <div className="space-y-3">
            {MY_ENQUIRIES.slice(0, 3).map((e) => (
              <div key={e.id} className="flex gap-3 p-3 rounded-xl bg-navy border border-gold/10">
                <div className="text-2xl shrink-0">{e.flag}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-cream text-sm">{e.from}</span>
                    <StatusBadge status={e.status} />
                  </div>
                  <div className="text-xs text-gold mt-0.5 truncate">Re: {e.prop}</div>
                  <div className="text-xs text-cream/65 mt-1 line-clamp-2">{e.msg}</div>
                  <div className="text-[11px] text-cream/45 mt-1">{e.time} · {e.phone}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-navy-light border border-gold/15 rounded-2xl p-6">
          <h3 className="font-display text-lg font-semibold text-cream mb-4">Activity Feed</h3>
          <div className="space-y-3">
            {ACTIVITY.map((a, i) => {
              const dotCls = a.dot === "g" ? "bg-emerald-400" : a.dot === "y" ? "bg-amber-400" : "bg-blue-400";
              return (
                <div key={i} className="flex gap-3 items-start">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dotCls}`} />
                  <div className="flex-1">
                    <div className="text-sm text-cream/85">{a.text}</div>
                    <div className="text-[11px] text-cream/45">{a.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListingsPanel() {
  const stats = [
    { icon: "✅", val: "38", lbl: "Active" },
    { icon: "⏳", val: "4", lbl: "Pending Approval" },
    { icon: "📝", val: "2", lbl: "Draft" },
    { icon: "🏆", val: "1", lbl: "Sold" },
    { icon: "💰", val: "$135", lbl: "Monthly Cost" },
    { icon: "👁️", val: "843", lbl: "Views This Week" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((s) => (
          <StatCard key={s.lbl} {...s} />
        ))}
      </div>
      <div className="bg-navy-light border border-gold/15 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gold/10">
          <h3 className="font-display text-lg font-semibold text-cream">All Listings</h3>
          <Link href="/list-property" className="px-4 py-2 bg-gold text-navy-dark font-bold text-sm rounded-lg hover:bg-gold-light transition-colors">
            + Add New Listing
          </Link>
        </div>
        <div className="divide-y divide-gold/10">
          {MY_LISTINGS.map((l) => (
            <div key={l.id} className="flex items-center gap-4 p-5 hover:bg-navy/50 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-3xl shrink-0">
                {l.img}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-cream truncate">{l.title}</div>
                <div className="text-xs text-cream/55 truncate">{l.loc}</div>
                <div className="flex gap-3 mt-1 text-xs text-cream/55">
                  <span>{l.type}</span>
                  <span>👁 {l.views}</span>
                  <span>📩 {l.enq}</span>
                  <span>❤️ {l.saves}</span>
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
                <div className="font-display text-gold font-semibold">{l.price}</div>
                <StatusBadge status={l.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AddListingPanel() {
  return (
    <div className="bg-navy-light border border-gold/15 rounded-2xl p-8 text-center">
      <div className="text-5xl mb-4">➕</div>
      <h3 className="font-display text-xl font-semibold text-cream mb-2">Start a new listing</h3>
      <p className="text-cream/60 mb-6 max-w-md mx-auto">
        Use the full listing wizard to add property details, photos, video, and pricing. Goes live
        within 15 minutes of payment confirmation.
      </p>
      <Link
        href="/list-property"
        className="inline-block px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors"
      >
        Open Listing Wizard →
      </Link>
    </div>
  );
}

function EnquiriesPanel() {
  const stats = [
    { icon: "📩", val: "3", lbl: "Unread", trend: "3 unread", trendKind: "down" },
    { icon: "✅", val: "2", lbl: "Replied" },
    { icon: "📅", val: "18", lbl: "Total This Month", trend: "+5", trendKind: "up" },
    { icon: "⏱️", val: "2.4h", lbl: "Your Avg Response" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <StatCard key={s.lbl} {...s} />
        ))}
      </div>
      <div className="space-y-3">
        {MY_ENQUIRIES.map((e) => (
          <div key={e.id} className={`flex gap-4 p-5 rounded-2xl border ${e.status === "unread" ? "bg-blue-500/5 border-blue-500/30" : "bg-navy-light border-gold/15"}`}>
            <div className="text-3xl shrink-0">{e.flag}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-cream">{e.from}</span>
                <StatusBadge status={e.status} />
                <span className="text-xs text-cream/45 ml-auto">{e.time}</span>
              </div>
              <div className="text-sm text-gold mt-0.5">Re: {e.prop}</div>
              <p className="text-sm text-cream/70 mt-2 leading-relaxed">{e.msg}</p>
              <div className="flex gap-2 mt-3">
                <button className="px-3 py-1.5 bg-gold text-navy-dark font-bold text-xs rounded-lg hover:bg-gold-light transition-colors">
                  Reply
                </button>
                <a href={`tel:${e.phone}`} className="px-3 py-1.5 border border-gold/30 text-cream/85 text-xs rounded-lg hover:bg-gold/10 transition-colors">
                  📞 {e.phone}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SavedPanel() {
  const stats = [
    { icon: "❤️", val: "72", lbl: "Total Saves", trend: "+8", trendKind: "up" },
    { icon: "🏡", val: "12", lbl: "Listings Saved" },
    { icon: "📈", val: "28", lbl: "Top Listing Saves", trend: "+15%", trendKind: "up" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {stats.map((s) => (
          <StatCard key={s.lbl} {...s} />
        ))}
      </div>
      <div className="bg-navy-light border border-gold/15 rounded-2xl p-6">
        <h3 className="font-display text-lg font-semibold text-cream mb-4">Most Saved Listings</h3>
        <div className="divide-y divide-gold/10">
          {MY_LISTINGS.filter((l) => l.saves > 0).slice(0, 5).map((l) => (
            <div key={l.id} className="flex items-center gap-4 py-3">
              <div className="text-2xl">{l.img}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-cream truncate">{l.title}</div>
                <div className="text-xs text-cream/55">{l.loc}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gold">❤️ {l.saves}</div>
                <div className="text-xs text-cream/55">saves</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BillingPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon="💰" val="$135" lbl="Next Invoice" trend="Due 1 Apr" trendKind="flat" />
        <StatCard icon="📅" val="12" lbl="Paid Invoices (All Time)" />
        <StatCard icon="💳" val="Visa ••4242" lbl="Default Payment Method" />
      </div>
      <div className="bg-navy-light border border-gold/15 rounded-2xl overflow-hidden">
        <h3 className="font-display text-lg font-semibold text-cream p-5 border-b border-gold/10">
          Invoice History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-navy-dark/50 text-xs uppercase tracking-wider text-cream/55">
              <tr>
                <th className="text-left px-5 py-3">Invoice</th>
                <th className="text-left px-5 py-3">Date</th>
                <th className="text-left px-5 py-3">Period</th>
                <th className="text-left px-5 py-3">Listings</th>
                <th className="text-right px-5 py-3">Total</th>
                <th className="text-center px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10">
              {INVOICES.map((i) => (
                <tr key={i.id} className="hover:bg-navy/50">
                  <td className="px-5 py-3 font-mono text-gold">{i.id}</td>
                  <td className="px-5 py-3 text-cream/75">{i.date}</td>
                  <td className="px-5 py-3 text-cream/75">{i.period}</td>
                  <td className="px-5 py-3 text-cream/75">{i.listings}</td>
                  <td className="px-5 py-3 text-right font-semibold text-cream">{i.total}</td>
                  <td className="px-5 py-3 text-center"><StatusBadge status={i.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function WalletPanel() {
  return (
    <div className="space-y-6">
      <div className="bg-navy-light border border-gold/30 rounded-2xl p-8 text-center">
        <div className="text-xs uppercase tracking-wider text-gold mb-2">Current Balance</div>
        <div className="font-display text-5xl font-bold text-gold mb-2">$79.00</div>
        <div className="text-sm text-cream/55 mb-6">Used for featured placements, top-of-search boosts, and banner ads.</div>
        <div className="flex flex-wrap gap-3 justify-center">
          <button className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors">
            + Top Up
          </button>
          <button className="px-6 py-3 border border-gold/30 text-cream rounded-xl hover:bg-gold/10 transition-colors">
            Boost a Listing
          </button>
        </div>
      </div>
      <div className="bg-navy-light border border-gold/15 rounded-2xl p-6">
        <h3 className="font-display text-lg font-semibold text-cream mb-4">Recent Ad Spend</h3>
        <div className="space-y-2 text-sm">
          {[
            { d: "12 Mar", t: "Featured placement — Clifton Penthouse", a: "-$25.00" },
            { d: "08 Mar", t: "Top-of-search boost — 3 Bed Family Home", a: "-$15.00" },
            { d: "01 Mar", t: "Wallet top-up", a: "+$100.00" },
            { d: "22 Feb", t: "Banner ad — Cape Town regional", a: "-$40.00" },
          ].map((r, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gold/10 last:border-0">
              <div>
                <div className="text-cream/80">{r.t}</div>
                <div className="text-xs text-cream/45">{r.d}</div>
              </div>
              <div className={`font-bold ${r.a.startsWith("+") ? "text-emerald-400" : "text-cream/75"}`}>{r.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AuctionsPanel() {
  const stats = [
    { icon: "🔴", val: "2", lbl: "Live Auctions", trend: "LIVE", trendKind: "live" },
    { icon: "✅", val: "3", lbl: "Completed" },
    { icon: "💰", val: "$135K", lbl: "Commission Owing", trend: "PENDING", trendKind: "down" },
    { icon: "💵", val: "5%", lbl: "Your Commission Rate" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <StatCard key={s.lbl} {...s} />
        ))}
      </div>
      <div className="bg-navy-light border border-gold/15 rounded-2xl overflow-hidden">
        <h3 className="font-display text-lg font-semibold text-cream p-5 border-b border-gold/10">
          My Auctions
        </h3>
        <div className="divide-y divide-gold/10">
          {MY_AUCTIONS.map((a) => (
            <div key={a.id} className="p-5 hover:bg-navy/50">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <span className="font-semibold text-cream">{a.title}</span>
                <StatusBadge status={a.status} />
                <span className="text-xs text-cream/55 ml-auto">Ends: {a.ends}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-xs text-cream/45">Reserve</div>
                  <div className="text-cream">{a.reserve}</div>
                </div>
                <div>
                  <div className="text-xs text-cream/45">Current Bid</div>
                  <div className="text-gold font-semibold">{a.currentBid}</div>
                </div>
                <div>
                  <div className="text-xs text-cream/45">Bids</div>
                  <div className="text-cream">{a.bids}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProValPanel() {
  return (
    <div className="space-y-6">
      <div className="bg-navy-light border border-gold/30 rounded-2xl p-6 flex flex-col md:flex-row gap-4 md:items-center">
        <div className="flex-1">
          <div className="font-display text-xl font-semibold text-cream mb-1">Need a new valuation?</div>
          <div className="text-sm text-cream/60">24-point AI valuation delivered in-browser. $124 USD per property.</div>
        </div>
        <Link href="/valuate" className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors text-center">
          Start New ProVal →
        </Link>
      </div>
      <div className="bg-navy-light border border-gold/15 rounded-2xl overflow-hidden">
        <h3 className="font-display text-lg font-semibold text-cream p-5 border-b border-gold/10">
          My ProVal Reports
        </h3>
        <div className="divide-y divide-gold/10">
          {PROVAL_REPORTS.map((r) => (
            <div key={r.id} className="flex items-center gap-4 p-5">
              <div className="font-mono text-gold text-sm shrink-0">{r.id}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-cream truncate">{r.prop}</div>
                <div className="text-xs text-cream/55">{r.date}</div>
              </div>
              <div className="text-right hidden sm:block">
                <div className="font-display text-gold font-semibold">{r.value}</div>
                <StatusBadge status={r.status} />
              </div>
              <button className="px-3 py-1.5 border border-gold/30 text-cream/85 text-xs rounded-lg hover:bg-gold/10">
                View PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyticsPanel() {
  const stats = [
    { icon: "👁️", val: "1,284", lbl: "Views This Month", trend: "+18%", trendKind: "up" },
    { icon: "📩", val: "18", lbl: "Enquiries", trend: "+5", trendKind: "up" },
    { icon: "📊", val: "1.4%", lbl: "Enquiry Rate" },
    { icon: "⏱️", val: "3m 24s", lbl: "Avg View Time" },
    { icon: "🌍", val: "14", lbl: "Countries Reached" },
    { icon: "📱", val: "62%", lbl: "Mobile Traffic" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {stats.map((s) => (
          <StatCard key={s.lbl} {...s} />
        ))}
      </div>
      <div className="bg-navy-light border border-gold/15 rounded-2xl p-6">
        <h3 className="font-display text-lg font-semibold text-cream mb-4">Top-Performing Listings</h3>
        <div className="divide-y divide-gold/10">
          {MY_LISTINGS.filter((l) => l.views > 0).sort((a, b) => b.views - a.views).slice(0, 5).map((l) => (
            <div key={l.id} className="flex items-center gap-4 py-3">
              <div className="text-2xl">{l.img}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-cream truncate">{l.title}</div>
                <div className="text-xs text-cream/55">{l.loc}</div>
              </div>
              <div className="text-right text-sm">
                <div className="text-gold font-semibold">👁 {l.views}</div>
                <div className="text-xs text-cream/55">{l.enq} enq · {l.saves} saves</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationsPanel() {
  return (
    <div className="space-y-3">
      {NOTIFICATIONS.map((n, i) => (
        <div
          key={i}
          className={`flex items-start gap-4 p-4 rounded-xl border ${
            n.unread ? "bg-blue-500/5 border-blue-500/30" : "bg-navy-light border-gold/15"
          }`}
        >
          <div className="text-2xl shrink-0">{n.icon}</div>
          <div className="flex-1">
            <div className="text-sm text-cream/90">{n.text}</div>
            <div className="text-xs text-cream/45 mt-1">{n.time}</div>
          </div>
          {n.unread && <span className="w-2 h-2 rounded-full bg-blue-400 mt-2 shrink-0" />}
        </div>
      ))}
    </div>
  );
}

function ProfilePanel() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-navy-light border border-gold/15 rounded-2xl p-6">
        <h3 className="font-display text-lg font-semibold text-cream mb-4">Account Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-xs text-cream/55 mb-1">Full Name</div>
            <div className="text-cream font-medium">Charl van Zyl</div>
          </div>
          <div>
            <div className="text-xs text-cream/55 mb-1">Email</div>
            <div className="text-cream font-medium">charl@example.com</div>
          </div>
          <div>
            <div className="text-xs text-cream/55 mb-1">Phone</div>
            <div className="text-cream font-medium">+27 82 000 0000</div>
          </div>
          <div>
            <div className="text-xs text-cream/55 mb-1">Country</div>
            <div className="text-cream font-medium">🇿🇦 South Africa</div>
          </div>
          <div>
            <div className="text-xs text-cream/55 mb-1">Account Type</div>
            <div className="text-cream font-medium">Private Seller</div>
          </div>
          <div>
            <div className="text-xs text-cream/55 mb-1">Member Since</div>
            <div className="text-cream font-medium">March 2025</div>
          </div>
        </div>
        <button className="mt-6 px-5 py-2.5 border border-gold/30 text-gold rounded-lg text-sm hover:bg-gold/10">
          Edit Profile
        </button>
      </div>
      <div className="bg-navy-light border border-gold/15 rounded-2xl p-6">
        <h3 className="font-display text-lg font-semibold text-cream mb-4">Security</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between py-2">
            <span className="text-cream/85">Password</span>
            <button className="text-gold hover:underline">Change</button>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-cream/85">Two-factor authentication</span>
            <span className="text-emerald-400 text-xs font-bold">ENABLED</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-cream/85">Active sessions</span>
            <button className="text-gold hover:underline">View (2)</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HelpPanel() {
  const topics = [
    { icon: "🏠", title: "How to list your first property", href: "/how-it-works" },
    { icon: "💰", title: "Pricing & billing explained", href: "/pricing" },
    { icon: "🔨", title: "How auctions work", href: "/auctions" },
    { icon: "📊", title: "Understanding ProVal reports", href: "/valuate" },
    { icon: "💳", title: "Payment methods & refunds", href: "/commission-fees" },
    { icon: "🔒", title: "Privacy & data protection", href: "/privacy-policy" },
  ];
  return (
    <div className="space-y-6">
      <div className="bg-navy-light border border-gold/25 rounded-2xl p-6">
        <h3 className="font-display text-lg font-semibold text-cream mb-2">Need help?</h3>
        <p className="text-sm text-cream/65 mb-4">
          Most questions are answered instantly by our AI assistant. For account-specific issues, our
          support team replies within 24 hours.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/ai-chat" className="px-5 py-2.5 bg-gold text-navy-dark font-bold text-sm rounded-lg">
            💬 Ask AI Assistant
          </Link>
          <a href="mailto:support@propworths.com" className="px-5 py-2.5 border border-gold/30 text-cream rounded-lg text-sm">
            📧 support@propworths.com
          </a>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {topics.map((t) => (
          <Link
            key={t.title}
            href={t.href}
            className="flex items-center gap-4 bg-navy-light border border-gold/15 rounded-xl p-4 hover:border-gold/40 transition-colors"
          >
            <div className="text-2xl">{t.icon}</div>
            <div className="flex-1 text-sm text-cream/85">{t.title}</div>
            <span className="text-gold">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
