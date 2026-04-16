"use client";
import { useState } from "react";

type PanelId =
  | "overview" | "analytics" | "liverevenue" | "listings" | "auctions" | "approvals"
  | "proval" | "revenue" | "payments" | "ads" | "users" | "partnerships" | "support"
  | "countries" | "moderation" | "settings";

const PANEL_GROUPS: { heading: string; items: { id: PanelId; icon: string; label: string; badge?: string; badgeKind?: string }[] }[] = [
  {
    heading: "Analytics",
    items: [
      { id: "overview", icon: "📊", label: "Overview" },
      { id: "analytics", icon: "📈", label: "Analytics" },
      { id: "liverevenue", icon: "⚡", label: "Live Revenue", badge: "LIVE", badgeKind: "live" },
    ],
  },
  {
    heading: "Marketplace",
    items: [
      { id: "listings", icon: "🏡", label: "Listings", badge: "4" },
      { id: "auctions", icon: "🔨", label: "Auctions", badge: "3", badgeKind: "warn" },
      { id: "approvals", icon: "✅", label: "Approvals", badge: "4" },
      { id: "proval", icon: "🏠", label: "ProVal" },
    ],
  },
  {
    heading: "Revenue",
    items: [
      { id: "revenue", icon: "💰", label: "Revenue" },
      { id: "payments", icon: "💳", label: "Payments" },
      { id: "ads", icon: "📢", label: "Advertising" },
    ],
  },
  {
    heading: "People",
    items: [
      { id: "users", icon: "👥", label: "Users" },
      { id: "partnerships", icon: "🤝", label: "Partnerships" },
      { id: "support", icon: "🎧", label: "Support", badge: "3" },
    ],
  },
  {
    heading: "Operations",
    items: [
      { id: "countries", icon: "🌍", label: "Countries" },
      { id: "moderation", icon: "🚨", label: "Moderation" },
      { id: "settings", icon: "⚙️", label: "Settings" },
    ],
  },
];

const TITLES: Record<PanelId, string> = {
  overview: "📊 Overview",
  analytics: "📈 Analytics",
  liverevenue: "⚡ Live Revenue",
  listings: "🏡 Listings",
  auctions: "🔨 Auctions",
  approvals: "✅ Approvals",
  proval: "🏠 ProVal Reports",
  revenue: "💰 Revenue",
  payments: "💳 Payments",
  ads: "📢 Advertising",
  users: "👥 Users",
  partnerships: "🤝 Partnerships",
  support: "🎧 Support",
  countries: "🌍 Countries",
  moderation: "🚨 Moderation",
  settings: "⚙️ Settings",
};

const USERS = [
  { id: "U001", name: "Charl van Zyl", email: "charl@example.com", country: "🇿🇦 SA", type: "Private Seller", listings: 45, joined: "Mar 2025", status: "active" },
  { id: "U002", name: "Smith & Partners", email: "admin@smithpartners.co.za", country: "🇿🇦 SA", type: "Agency", listings: 284, joined: "Jan 2025", status: "active" },
  { id: "U003", name: "David Chen", email: "david.chen@hk.com", country: "🇭🇰 HK", type: "Buyer", listings: 0, joined: "Feb 2026", status: "active" },
  { id: "U004", name: "Keller Williams", email: "ops@kw.com", country: "🇺🇸 US", type: "Enterprise", listings: 3482, joined: "Jul 2024", status: "active" },
  { id: "U005", name: "Priya Naidoo", email: "priya@email.com", country: "🇿🇦 SA", type: "Buyer", listings: 0, joined: "Mar 2026", status: "pending" },
];

const LISTINGS_APPROVAL = [
  { id: "L99", title: "Smallholding 12ha with Irrigation", user: "Charl van Zyl", country: "🇿🇦 SA", type: "Farm", price: "R 2,800,000", submitted: "2h ago" },
  { id: "L98", title: "4 Bed Villa, Marbella", user: "Iberia Estates", country: "🇪🇸 ES", type: "Residential", price: "€ 1,450,000", submitted: "5h ago" },
  { id: "L97", title: "Industrial Park — 8,000m²", user: "Prop Brokers UK", country: "🇬🇧 GB", type: "Industrial", price: "£ 3,800,000", submitted: "Yesterday" },
  { id: "L96", title: "Beachfront Apartment, Dubai Marina", user: "Gulf Realty", country: "🇦🇪 AE", type: "Residential", price: "AED 4,200,000", submitted: "1 day ago" },
];

const AUCTIONS_PENDING = [
  { id: "A04", title: "Heritage Estate, Franschhoek", reserve: "R 18,500,000", seller: "Boutique Brokers", ends: "in 5d", status: "pending" },
  { id: "A05", title: "Office Tower, Sandton CBD", reserve: "R 45,000,000", seller: "Commercial Partners", ends: "in 7d", status: "pending" },
  { id: "A06", title: "Wine Farm 88ha, Stellenbosch", reserve: "R 32,000,000", seller: "Cape Farms Co.", ends: "in 14d", status: "pending" },
];

const TRANSACTIONS = [
  { id: "TXN-2026-1042", date: "Today 14:32", type: "Listing Fee (Agency)", user: "Smith & Partners", amount: "$852.00", status: "paid" },
  { id: "TXN-2026-1041", date: "Today 12:18", type: "ProVal Report", user: "David Chen", amount: "$124.00", status: "paid" },
  { id: "TXN-2026-1040", date: "Today 11:03", type: "Ad Wallet Top-up", user: "Charl van Zyl", amount: "$100.00", status: "paid" },
  { id: "TXN-2026-1039", date: "Today 09:47", type: "Listing Fee (Private)", user: "Priya Naidoo", amount: "$7.50", status: "paid" },
  { id: "TXN-2026-1038", date: "Yesterday", type: "Enterprise Plan", user: "Keller Williams", amount: "$6,964.00", status: "paid" },
];

const SUPPORT_TICKETS = [
  { id: "T-0042", subject: "Payment not received for ProVal", from: "David Chen", priority: "high", time: "2h ago", status: "open" },
  { id: "T-0041", subject: "Can I change my plan mid-cycle?", from: "Smith & Partners", priority: "normal", time: "4h ago", status: "open" },
  { id: "T-0040", subject: "Listings not syncing from Fusion", from: "Cape Brokers", priority: "high", time: "Yesterday", status: "open" },
  { id: "T-0039", subject: "How do I enable 2FA?", from: "Lisa van Zyl", priority: "low", time: "2 days ago", status: "closed" },
];

const PARTNERSHIPS = [
  { id: "P01", agency: "Smith & Partners Real Estate", country: "🇿🇦 SA", listings: 284, tier: "Agency", monthly: "$852.00", status: "active" },
  { id: "P02", agency: "Iberia Estates", country: "🇪🇸 ES", listings: 156, tier: "Agency", monthly: "$468.00", status: "active" },
  { id: "P03", agency: "Keller Williams Global", country: "🇺🇸 US", listings: 3482, tier: "Enterprise", monthly: "$6,964.00", status: "active" },
  { id: "P04", agency: "Gulf Realty", country: "🇦🇪 AE", listings: 89, tier: "Agency", monthly: "$267.00", status: "onboarding" },
];

const COUNTRIES_ACTIVE = [
  { flag: "🇿🇦", name: "South Africa", listings: 1248, users: 842, revenue: "$12.8K" },
  { flag: "🇬🇧", name: "United Kingdom", listings: 892, users: 634, revenue: "$9.2K" },
  { flag: "🇦🇪", name: "United Arab Emirates", listings: 456, users: 318, revenue: "$6.4K" },
  { flag: "🇺🇸", name: "United States", listings: 3482, users: 1247, revenue: "$28.1K" },
  { flag: "🇵🇹", name: "Portugal", listings: 234, users: 156, revenue: "$3.1K" },
  { flag: "🇪🇸", name: "Spain", listings: 378, users: 241, revenue: "$4.8K" },
  { flag: "🇦🇺", name: "Australia", listings: 512, users: 389, revenue: "$5.7K" },
  { flag: "🇩🇪", name: "Germany", listings: 267, users: 184, revenue: "$3.4K" },
];

const MODERATION = [
  { id: "M01", type: "Duplicate listing", listing: "L045 — 3 Bed House, Stellenbosch", reporter: "Auto-detect", severity: "medium", time: "3h ago" },
  { id: "M02", type: "Stock photo detected", listing: "L088 — Waterfront Villa", reporter: "Auto-detect", severity: "low", time: "6h ago" },
  { id: "M03", type: "Price manipulation", listing: "L034 — Penthouse, Clifton", reporter: "User report", severity: "high", time: "Yesterday" },
];

function StatCard({ icon, val, lbl, trend, trendKind }: { icon: string; val: string; lbl: string; trend?: string; trendKind?: string }) {
  const trendCls =
    trendKind === "up" ? "bg-emerald-500/15 text-emerald-300"
    : trendKind === "down" ? "bg-red-500/15 text-red-300"
    : trendKind === "live" ? "bg-red-500/20 text-red-300 animate-pulse"
    : "bg-gold/15 text-gold";
  return (
    <div className="bg-navy-light border border-gold/15 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-xl">{icon}</div>
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
    paid: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    open: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    closed: "bg-cream/10 text-cream/50 border-cream/20",
    onboarding: "bg-gold/15 text-gold border-gold/30",
    high: "bg-red-500/15 text-red-300 border-red-500/30",
    normal: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    low: "bg-cream/10 text-cream/60 border-cream/20",
    medium: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  };
  return (
    <span className={`inline-block text-[10px] font-bold uppercase tracking-wider border rounded px-2 py-0.5 ${map[status] || "bg-cream/10 text-cream/60 border-cream/20"}`}>
      {status}
    </span>
  );
}

export default function AdminDashboardPage() {
  const [panel, setPanel] = useState<PanelId>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-navy text-cream min-h-screen">
      <div className="max-w-7xl mx-auto flex pt-20">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? "block" : "hidden"} md:block fixed md:sticky inset-0 md:inset-auto md:top-20 top-16 h-[calc(100vh-5rem)] w-72 bg-navy-dark/95 md:bg-navy-light border-r border-gold/15 z-40 md:z-0 overflow-y-auto p-4`}
        >
          <div className="mb-6 px-3 py-3 bg-gold/10 rounded-xl border border-gold/30">
            <div className="text-xs text-gold/80 uppercase tracking-wider font-bold">Admin Portal</div>
            <div className="font-semibold text-cream">Propworths Head Office</div>
            <div className="text-xs text-cream/55 mt-0.5">Full access · Logged in</div>
          </div>
          {PANEL_GROUPS.map((g) => (
            <div key={g.heading} className="mb-5">
              <div className="text-[10px] tracking-wider uppercase text-cream/45 font-bold px-3 mb-2">{g.heading}</div>
              <nav className="flex flex-col gap-1">
                {g.items.map((p) => {
                  const badgeCls = p.badgeKind === "live" ? "bg-emerald-400 text-navy-dark animate-pulse" : p.badgeKind === "warn" ? "bg-amber-500 text-navy-dark" : "bg-gold text-navy-dark";
                  return (
                    <button
                      key={p.id}
                      onClick={() => { setPanel(p.id); setSidebarOpen(false); }}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                        panel === p.id ? "bg-gold/15 text-gold border border-gold/30" : "text-cream/70 hover:bg-gold/5 hover:text-cream"
                      }`}
                    >
                      <span>{p.icon}</span>
                      <span className="flex-1">{p.label}</span>
                      {p.badge && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${badgeCls}`}>{p.badge}</span>}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 px-4 md:px-8 py-6 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-cream">{TITLES[panel]}</h1>
            <button className="md:hidden p-2 rounded-lg border border-gold/25 text-cream" onClick={() => setSidebarOpen((s) => !s)}>☰ Menu</button>
          </div>

          {panel === "overview" && <OverviewPanel />}
          {panel === "analytics" && <AnalyticsPanel />}
          {panel === "liverevenue" && <LiveRevenuePanel />}
          {panel === "listings" && <ListingsPanel />}
          {panel === "auctions" && <AuctionsPanel />}
          {panel === "approvals" && <ApprovalsPanel />}
          {panel === "proval" && <ProValPanel />}
          {panel === "revenue" && <RevenuePanel />}
          {panel === "payments" && <PaymentsPanel />}
          {panel === "ads" && <AdsPanel />}
          {panel === "users" && <UsersPanel />}
          {panel === "partnerships" && <PartnershipsPanel />}
          {panel === "support" && <SupportPanel />}
          {panel === "countries" && <CountriesPanel />}
          {panel === "moderation" && <ModerationPanel />}
          {panel === "settings" && <SettingsPanel />}
        </main>
      </div>
    </div>
  );
}

function OverviewPanel() {
  const stats = [
    { icon: "🏡", val: "6,128", lbl: "Total Active Listings", trend: "+12%", trendKind: "up" },
    { icon: "💰", val: "$68.4K", lbl: "Revenue This Month", trend: "+8.2%", trendKind: "up" },
    { icon: "👥", val: "3,842", lbl: "Registered Users", trend: "+3", trendKind: "up" },
    { icon: "🔨", val: "24", lbl: "Active Auctions", trend: "LIVE", trendKind: "live" },
    { icon: "📩", val: "187", lbl: "Enquiries (24h)", trend: "+22%", trendKind: "up" },
    { icon: "🌍", val: "42", lbl: "Active Countries" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((s) => <StatCard key={s.lbl} {...s} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-navy-light border border-gold/15 rounded-2xl p-5">
          <h3 className="font-display text-lg font-semibold text-cream mb-4">Pending Approvals</h3>
          <div className="divide-y divide-gold/10">
            {LISTINGS_APPROVAL.slice(0, 3).map((l) => (
              <div key={l.id} className="py-3">
                <div className="font-semibold text-cream text-sm">{l.title}</div>
                <div className="text-xs text-cream/55">{l.user} · {l.country} · {l.price} · {l.submitted}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-navy-light border border-gold/15 rounded-2xl p-5">
          <h3 className="font-display text-lg font-semibold text-cream mb-4">Recent Transactions</h3>
          <div className="divide-y divide-gold/10">
            {TRANSACTIONS.slice(0, 4).map((t) => (
              <div key={t.id} className="py-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-cream text-sm truncate">{t.type}</div>
                  <div className="text-xs text-cream/55 truncate">{t.user} · {t.date}</div>
                </div>
                <div className="font-display text-gold font-semibold">{t.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsPanel() {
  const stats = [
    { icon: "👁️", val: "1.2M", lbl: "Views (30d)", trend: "+18%", trendKind: "up" },
    { icon: "🔍", val: "284K", lbl: "Searches (30d)", trend: "+24%", trendKind: "up" },
    { icon: "📩", val: "4,821", lbl: "Enquiries (30d)", trend: "+11%", trendKind: "up" },
    { icon: "📊", val: "1.7%", lbl: "Enquiry Rate" },
    { icon: "📱", val: "68%", lbl: "Mobile Traffic" },
    { icon: "⏱️", val: "4m 12s", lbl: "Avg Session" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{stats.map((s) => <StatCard key={s.lbl} {...s} />)}</div>
      <div className="bg-navy-light border border-gold/15 rounded-2xl p-6">
        <h3 className="font-display text-lg font-semibold text-cream mb-4">Top Search Terms (last 7 days)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {["3 bedroom house cape town", "apartment dubai marina", "farm western cape", "office space sandton", "beachfront property portugal", "warehouse johannesburg", "penthouse clifton", "villa spain"].map((q, i) => (
            <div key={q} className="flex items-center justify-between py-2 border-b border-gold/10 last:border-0">
              <div className="flex items-center gap-3"><span className="text-cream/45 text-xs w-6">#{i + 1}</span><span className="text-cream/85">{q}</span></div>
              <span className="text-xs text-gold">{(5000 - i * 420).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LiveRevenuePanel() {
  return (
    <div className="space-y-6">
      <div className="bg-navy-light border border-emerald-500/40 rounded-2xl p-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Live — streaming</span>
        </div>
        <div className="font-display text-6xl font-bold text-gold mb-2">$68,432</div>
        <div className="text-sm text-cream/60">Revenue today · updates every 30s</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon="🕐" val="$2,847" lbl="Last Hour" trend="+12%" trendKind="up" />
        <StatCard icon="📅" val="$68.4K" lbl="Today" trend="+8.2%" trendKind="up" />
        <StatCard icon="📆" val="$1.2M" lbl="This Month" trend="+14%" trendKind="up" />
      </div>
    </div>
  );
}

function ListingsPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon="🏡" val="6,128" lbl="Active" />
        <StatCard icon="⏳" val="4" lbl="Pending" />
        <StatCard icon="📝" val="142" lbl="Draft" />
        <StatCard icon="🏆" val="387" lbl="Sold/Let" />
      </div>
      <div className="bg-navy-light border border-gold/15 rounded-2xl overflow-hidden">
        <h3 className="font-display text-lg font-semibold text-cream p-5 border-b border-gold/10">Pending Approval Queue</h3>
        <div className="divide-y divide-gold/10">
          {LISTINGS_APPROVAL.map((l) => (
            <div key={l.id} className="p-4 flex items-center gap-4">
              <div className="font-mono text-gold text-xs shrink-0">{l.id}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-cream truncate">{l.title}</div>
                <div className="text-xs text-cream/55">{l.user} · {l.country} · {l.type} · {l.price}</div>
              </div>
              <div className="text-xs text-cream/45 hidden sm:block">{l.submitted}</div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs rounded-lg font-semibold hover:bg-emerald-500/30">✓ Approve</button>
                <button className="px-3 py-1.5 bg-red-500/20 text-red-300 border border-red-500/40 text-xs rounded-lg font-semibold hover:bg-red-500/30">✗ Reject</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AuctionsPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon="🔴" val="24" lbl="Live Now" trend="LIVE" trendKind="live" />
        <StatCard icon="⏳" val="3" lbl="Pending" />
        <StatCard icon="✅" val="142" lbl="Completed" />
        <StatCard icon="💰" val="$128K" lbl="Commission (30d)" trend="+18%" trendKind="up" />
      </div>
      <div className="bg-navy-light border border-gold/15 rounded-2xl overflow-hidden">
        <h3 className="font-display text-lg font-semibold text-cream p-5 border-b border-gold/10">Pending Auction Approvals</h3>
        <div className="divide-y divide-gold/10">
          {AUCTIONS_PENDING.map((a) => (
            <div key={a.id} className="p-4 flex items-center gap-4">
              <div className="font-mono text-gold text-xs shrink-0">{a.id}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-cream truncate">{a.title}</div>
                <div className="text-xs text-cream/55">{a.seller} · Reserve {a.reserve} · Ends {a.ends}</div>
              </div>
              <StatusBadge status={a.status} />
              <button className="px-3 py-1.5 bg-gold text-navy-dark text-xs rounded-lg font-bold">Review</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ApprovalsPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon="🏡" val="4" lbl="Listings" />
        <StatCard icon="🔨" val="3" lbl="Auctions" />
        <StatCard icon="🤝" val="2" lbl="Agencies" />
        <StatCard icon="🚨" val="3" lbl="Moderation" />
      </div>
      <div className="bg-navy-light border border-gold/15 rounded-2xl p-5">
        <h3 className="font-display text-lg font-semibold text-cream mb-4">Combined Approval Queue</h3>
        <div className="divide-y divide-gold/10">
          {[...LISTINGS_APPROVAL.slice(0, 3).map((l) => ({ kind: "Listing", id: l.id, title: l.title, meta: `${l.user} · ${l.price}` })),
            ...AUCTIONS_PENDING.map((a) => ({ kind: "Auction", id: a.id, title: a.title, meta: `${a.seller} · Reserve ${a.reserve}` }))].map((item) => (
            <div key={item.id} className="py-3 flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gold/15 text-gold">{item.kind}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-cream text-sm truncate">{item.title}</div>
                <div className="text-xs text-cream/55">{item.meta}</div>
              </div>
              <button className="px-3 py-1.5 bg-gold text-navy-dark text-xs rounded-lg font-bold">Review</button>
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon="📊" val="182" lbl="Reports (30d)" trend="+28%" trendKind="up" />
        <StatCard icon="💰" val="$22,568" lbl="Revenue" trend="+28%" trendKind="up" />
        <StatCard icon="✅" val="97%" lbl="Delivery Success" />
        <StatCard icon="⏱️" val="1m 42s" lbl="Avg Generation" />
      </div>
      <div className="bg-navy-light border border-gold/15 rounded-2xl p-5">
        <h3 className="font-display text-lg font-semibold text-cream mb-4">Recent ProVal Reports</h3>
        <div className="text-sm text-cream/60">
          182 reports delivered in the last 30 days across 14 countries. Top countries: South Africa
          (68), United Kingdom (32), UAE (21), Portugal (17), Spain (12).
        </div>
      </div>
    </div>
  );
}

function RevenuePanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon="💰" val="$1.2M" lbl="This Month" trend="+14%" trendKind="up" />
        <StatCard icon="📆" val="$14.8M" lbl="Year to Date" trend="+42%" trendKind="up" />
        <StatCard icon="🏡" val="$842K" lbl="Listing Fees" />
        <StatCard icon="🔨" val="$128K" lbl="Auction Commission" />
      </div>
      <div className="bg-navy-light border border-gold/15 rounded-2xl p-6">
        <h3 className="font-display text-lg font-semibold text-cream mb-4">Revenue by Stream (Last 30 Days)</h3>
        <div className="space-y-3">
          {[
            { label: "Listing Fees (Agency + Private)", amount: "$842,680", pct: 68 },
            { label: "Auction Commission", amount: "$128,420", pct: 10 },
            { label: "Advertising Wallet", amount: "$96,240", pct: 8 },
            { label: "ProVal Reports", amount: "$22,568", pct: 2 },
            { label: "Enterprise Contracts", amount: "$142,000", pct: 12 },
          ].map((r) => (
            <div key={r.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-cream/85">{r.label}</span>
                <span className="text-gold font-semibold">{r.amount}</span>
              </div>
              <div className="h-2 bg-navy rounded-full overflow-hidden"><div className="h-full bg-gold" style={{ width: `${r.pct}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PaymentsPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon="✅" val="1,287" lbl="Successful (30d)" />
        <StatCard icon="❌" val="24" lbl="Failed (30d)" />
        <StatCard icon="💳" val="Stripe" lbl="Top Processor" />
        <StatCard icon="🔄" val="8" lbl="Refunds Pending" />
      </div>
      <div className="bg-navy-light border border-gold/15 rounded-2xl overflow-hidden">
        <h3 className="font-display text-lg font-semibold text-cream p-5 border-b border-gold/10">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead className="bg-navy-dark/50 text-xs uppercase tracking-wider text-cream/55">
              <tr>
                <th className="text-left px-5 py-3">Transaction</th>
                <th className="text-left px-5 py-3">Type</th>
                <th className="text-left px-5 py-3">User</th>
                <th className="text-left px-5 py-3">Date</th>
                <th className="text-right px-5 py-3">Amount</th>
                <th className="text-center px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10">
              {TRANSACTIONS.map((t) => (
                <tr key={t.id}>
                  <td className="px-5 py-3 font-mono text-gold">{t.id}</td>
                  <td className="px-5 py-3 text-cream/85">{t.type}</td>
                  <td className="px-5 py-3 text-cream/75">{t.user}</td>
                  <td className="px-5 py-3 text-cream/55">{t.date}</td>
                  <td className="px-5 py-3 text-right font-semibold text-cream">{t.amount}</td>
                  <td className="px-5 py-3 text-center"><StatusBadge status={t.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdsPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon="📢" val="142" lbl="Active Ads" />
        <StatCard icon="💰" val="$96K" lbl="Ad Revenue (30d)" trend="+22%" trendKind="up" />
        <StatCard icon="👁️" val="4.2M" lbl="Impressions" />
        <StatCard icon="📊" val="2.8%" lbl="Avg CTR" />
      </div>
      <div className="bg-navy-light border border-gold/15 rounded-2xl p-6">
        <h3 className="font-display text-lg font-semibold text-cream mb-3">Top Spenders</h3>
        <div className="divide-y divide-gold/10 text-sm">
          {[
            { name: "Keller Williams Global", spend: "$12,480" },
            { name: "Smith & Partners", spend: "$4,260" },
            { name: "Iberia Estates", spend: "$2,840" },
            { name: "Gulf Realty", spend: "$1,920" },
          ].map((s) => (
            <div key={s.name} className="flex justify-between py-2">
              <span className="text-cream/85">{s.name}</span>
              <span className="text-gold font-semibold">{s.spend}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UsersPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon="👥" val="3,842" lbl="Total Users" trend="+3" trendKind="up" />
        <StatCard icon="🏢" val="412" lbl="Agencies" />
        <StatCard icon="👤" val="3,268" lbl="Private" />
        <StatCard icon="🎖️" val="162" lbl="Enterprise" />
      </div>
      <div className="bg-navy-light border border-gold/15 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead className="bg-navy-dark/50 text-xs uppercase tracking-wider text-cream/55">
              <tr>
                <th className="text-left px-5 py-3">User</th>
                <th className="text-left px-5 py-3">Email</th>
                <th className="text-left px-5 py-3">Country</th>
                <th className="text-left px-5 py-3">Type</th>
                <th className="text-right px-5 py-3">Listings</th>
                <th className="text-left px-5 py-3">Joined</th>
                <th className="text-center px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10">
              {USERS.map((u) => (
                <tr key={u.id}>
                  <td className="px-5 py-3 text-cream font-semibold">{u.name}</td>
                  <td className="px-5 py-3 text-cream/70">{u.email}</td>
                  <td className="px-5 py-3 text-cream/70">{u.country}</td>
                  <td className="px-5 py-3 text-cream/70">{u.type}</td>
                  <td className="px-5 py-3 text-right text-gold font-semibold">{u.listings}</td>
                  <td className="px-5 py-3 text-cream/55">{u.joined}</td>
                  <td className="px-5 py-3 text-center"><StatusBadge status={u.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PartnershipsPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon="🤝" val="412" lbl="Active Partners" />
        <StatCard icon="🆕" val="28" lbl="Onboarding" />
        <StatCard icon="💰" val="$842K" lbl="Partner Revenue" />
        <StatCard icon="🌍" val="42" lbl="Countries" />
      </div>
      <div className="bg-navy-light border border-gold/15 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead className="bg-navy-dark/50 text-xs uppercase tracking-wider text-cream/55">
              <tr>
                <th className="text-left px-5 py-3">Agency</th>
                <th className="text-left px-5 py-3">Country</th>
                <th className="text-right px-5 py-3">Listings</th>
                <th className="text-left px-5 py-3">Tier</th>
                <th className="text-right px-5 py-3">Monthly</th>
                <th className="text-center px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10">
              {PARTNERSHIPS.map((p) => (
                <tr key={p.id}>
                  <td className="px-5 py-3 text-cream font-semibold">{p.agency}</td>
                  <td className="px-5 py-3 text-cream/70">{p.country}</td>
                  <td className="px-5 py-3 text-right text-gold font-semibold">{p.listings.toLocaleString()}</td>
                  <td className="px-5 py-3 text-cream/70">{p.tier}</td>
                  <td className="px-5 py-3 text-right font-semibold text-cream">{p.monthly}</td>
                  <td className="px-5 py-3 text-center"><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SupportPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon="📥" val="3" lbl="Open Tickets" trend="High" trendKind="down" />
        <StatCard icon="✅" val="142" lbl="Resolved (30d)" />
        <StatCard icon="⏱️" val="2.4h" lbl="Avg Response" />
        <StatCard icon="⭐" val="4.8" lbl="Satisfaction" />
      </div>
      <div className="space-y-3">
        {SUPPORT_TICKETS.map((t) => (
          <div key={t.id} className="bg-navy-light border border-gold/15 rounded-xl p-4 flex items-start gap-4">
            <div className="font-mono text-gold text-xs shrink-0 pt-0.5">{t.id}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-semibold text-cream">{t.subject}</span>
                <StatusBadge status={t.priority} />
                <StatusBadge status={t.status} />
              </div>
              <div className="text-xs text-cream/55">From: {t.from} · {t.time}</div>
            </div>
            {t.status === "open" && <button className="px-3 py-1.5 bg-gold text-navy-dark text-xs rounded-lg font-bold">Reply</button>}
          </div>
        ))}
      </div>
    </div>
  );
}

function CountriesPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon="🌍" val="42" lbl="Active" />
        <StatCard icon="📋" val="143" lbl="Launch Pipeline" />
        <StatCard icon="🎯" val="185" lbl="Target Total" />
        <StatCard icon="💰" val="$68.4K" lbl="Total Revenue" />
      </div>
      <div className="bg-navy-light border border-gold/15 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-navy-dark/50 text-xs uppercase tracking-wider text-cream/55">
              <tr>
                <th className="text-left px-5 py-3">Country</th>
                <th className="text-right px-5 py-3">Listings</th>
                <th className="text-right px-5 py-3">Users</th>
                <th className="text-right px-5 py-3">Revenue (30d)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/10">
              {COUNTRIES_ACTIVE.map((c) => (
                <tr key={c.name}>
                  <td className="px-5 py-3 text-cream font-semibold"><span className="text-xl mr-2">{c.flag}</span>{c.name}</td>
                  <td className="px-5 py-3 text-right text-cream">{c.listings.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right text-cream">{c.users.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right text-gold font-semibold">{c.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ModerationPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon="🚨" val="3" lbl="Open Cases" trend="Review" trendKind="down" />
        <StatCard icon="🤖" val="2" lbl="Auto-detected" />
        <StatCard icon="👤" val="1" lbl="User-reported" />
        <StatCard icon="✅" val="482" lbl="Cleared (30d)" />
      </div>
      <div className="space-y-3">
        {MODERATION.map((m) => (
          <div key={m.id} className="bg-navy-light border border-gold/15 rounded-xl p-4 flex items-start gap-4">
            <div className="text-2xl">🚨</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-semibold text-cream">{m.type}</span>
                <StatusBadge status={m.severity} />
              </div>
              <div className="text-sm text-cream/70">{m.listing}</div>
              <div className="text-xs text-cream/45 mt-1">Reporter: {m.reporter} · {m.time}</div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs rounded-lg font-semibold">Dismiss</button>
              <button className="px-3 py-1.5 bg-red-500/20 text-red-300 border border-red-500/40 text-xs rounded-lg font-semibold">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="max-w-3xl space-y-6">
      <div className="bg-navy-light border border-gold/15 rounded-2xl p-6">
        <h3 className="font-display text-lg font-semibold text-cream mb-4">Platform Settings</h3>
        <div className="space-y-3 text-sm">
          {[
            { label: "Auto-approve listings from verified agencies", enabled: true },
            { label: "Require 2FA for admin accounts", enabled: true },
            { label: "Auto-detect duplicate photos", enabled: true },
            { label: "Hold auction deposits in escrow", enabled: true },
            { label: "Email summaries to head office (daily)", enabled: true },
            { label: "Allow public enquiries without account", enabled: false },
          ].map((s) => (
            <div key={s.label} className="flex items-center justify-between py-2 border-b border-gold/10 last:border-0">
              <span className="text-cream/85">{s.label}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded ${s.enabled ? "bg-emerald-500/15 text-emerald-300" : "bg-cream/10 text-cream/50"}`}>
                {s.enabled ? "ON" : "OFF"}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-navy-light border border-gold/15 rounded-2xl p-6">
        <h3 className="font-display text-lg font-semibold text-cream mb-4">Admin Access</h3>
        <div className="text-sm text-cream/70">
          3 admin accounts active. Last login: Today 09:12 (Head Office). All admin actions are logged
          to audit trail.
        </div>
      </div>
    </div>
  );
}
