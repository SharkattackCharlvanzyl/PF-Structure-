"use client";
import Link from "next/link";
import { useState } from "react";

type Panel = "fav" | "search" | "recent" | null;

const FAVS = [
  { id: "fav1", title: "Modern Villa — Camps Bay", price: "ZAR 8,500,000", meta: "4 bed · 3 bath · 320 m² · Cape Town" },
  { id: "fav2", title: "Penthouse — Dubai Marina", price: "AED 4,200,000", meta: "3 bed · 2 bath · 180 m² · Dubai" },
  { id: "fav3", title: "Sea View Villa — Algarve", price: "€ 1,250,000", meta: "5 bed · 4 bath · 420 m² · Lagos" },
];

const SAVED = [
  { title: "🏠 Houses in Cape Town", alertsOn: true, tags: ["Cape Town", "House", "3+ beds", "R2M – R5M", "For Sale"], meta: "142 matching · updated 2h ago" },
  { title: "🏢 Dubai Apartments Under AED 3M", alertsOn: false, tags: ["Dubai", "Apartment", "≤ AED 3M"], meta: "68 matching · updated yesterday" },
];

const RECENT = [
  { title: "Stellenbosch Wine Estate", price: "R 32,000,000", meta: "88ha · vineyard · cellar" },
  { title: "Cape Town CBD Office", price: "R 45,000,000", meta: "Class A · 1,200 m² GLA" },
  { title: "Hout Bay Beach House", price: "R 18,500,000", meta: "5 bed · ocean view · 480 m²" },
  { title: "Umhlanga Penthouse", price: "R 12,900,000", meta: "3 bed · 220 m² · sea-facing" },
  { title: "Johannesburg Warehouse", price: "R 28,000,000", meta: "3,400 m² · roller doors · rail spur" },
];

export default function FloatingToolbarPage() {
  const [panel, setPanel] = useState<Panel>(null);
  const [modal, setModal] = useState<"schedule" | "share" | "save" | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  function notify(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  return (
    <div className="bg-navy text-cream min-h-screen">
      <header className="pt-24 md:pt-32 pb-8 px-4 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
          Platform Feature
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-cream">
          Floating <span className="italic text-gold">toolbar demo</span>
        </h1>
        <p className="mt-4 text-cream/70 max-w-xl mx-auto text-sm">
          Favorites, saved searches, and recently viewed — always one tap away on every Propworths page.
        </p>
      </header>

      <section className="pb-32 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { ico: "❤️", title: "Favorites", desc: "One-tap access to saved properties." },
            { ico: "🔍", title: "Saved Searches", desc: "Rerun searches with alerts." },
            { ico: "🕐", title: "Recently Viewed", desc: "Last properties you looked at." },
            { ico: "📅", title: "Schedule a Viewing", desc: "Book inspections from any page." },
            { ico: "📤", title: "Share Property", desc: "WhatsApp, email, copy link." },
            { ico: "⬆️", title: "Back to Top", desc: "Quick scroll after long lists." },
          ].map((c) => (
            <div key={c.title} className="bg-navy-light border border-gold/15 rounded-xl p-5">
              <div className="text-3xl mb-2">{c.ico}</div>
              <div className="font-semibold text-cream">{c.title}</div>
              <div className="text-xs text-cream/60 mt-1">{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating toolbar */}
      <div className="fixed right-4 bottom-24 md:right-6 md:bottom-1/2 md:translate-y-1/2 flex md:flex-col gap-2 z-40">
        <TBtn onClick={() => setPanel("fav")} ico="❤️" tip="Favorites" badge="3" />
        <TBtn onClick={() => setModal("schedule")} ico="📅" tip="Schedule Viewing" />
        <TBtn onClick={() => setModal("share")} ico="📤" tip="Share Property" />
        <TBtn onClick={() => setPanel("search")} ico="🔍" tip="Saved Searches" badge="2" />
        <TBtn onClick={() => setPanel("recent")} ico="🕐" tip="Recently Viewed" badge="5" />
        <TBtn onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} ico="⬆️" tip="Back to Top" />
      </div>

      {/* Panel overlay */}
      {(panel || modal) && (
        <div onClick={() => { setPanel(null); setModal(null); }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
      )}

      {/* Favorites panel */}
      {panel === "fav" && (
        <SidePanel title={`❤️ Favorites (${FAVS.length} properties)`} onClose={() => setPanel(null)}>
          {FAVS.map((f) => (
            <div key={f.id} className="flex gap-3 p-3 bg-navy rounded-lg border border-gold/15 mb-2">
              <div className="w-16 h-16 rounded bg-gold/10 flex items-center justify-center text-2xl">🏠</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">{f.title}</div>
                <div className="text-gold text-sm font-bold">{f.price}</div>
                <div className="text-xs text-cream/60">{f.meta}</div>
              </div>
            </div>
          ))}
          <div className="flex gap-2 mt-4">
            <button onClick={() => notify("Opening comparison tool…")} className="flex-1 px-3 py-2 rounded-lg border border-gold/30 text-gold text-sm">⚖️ Compare All</button>
            <button onClick={() => notify("Opening full favorites…")} className="flex-1 px-3 py-2 rounded-lg bg-gold text-navy-dark text-sm font-semibold">View All ❤️</button>
          </div>
        </SidePanel>
      )}

      {/* Saved searches */}
      {panel === "search" && (
        <SidePanel title="🔍 Saved Searches" onClose={() => setPanel(null)}>
          {SAVED.map((s, i) => (
            <div key={i} className="p-3 bg-navy rounded-lg border border-gold/15 mb-2">
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-sm">{s.title}</div>
                <span className={`text-[10px] px-2 py-0.5 rounded ${s.alertsOn ? "bg-emerald-500/20 text-emerald-300" : "bg-navy-light text-cream/50"}`}>
                  {s.alertsOn ? "🔔 Alerts On" : "Alerts Off"}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {s.tags.map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-gold/10 text-gold">{t}</span>
                ))}
              </div>
              <div className="flex justify-between items-center text-xs text-cream/60">
                <span>{s.meta}</span>
                <button onClick={() => notify("Running saved search…")} className="text-gold">Run Search →</button>
              </div>
            </div>
          ))}
        </SidePanel>
      )}

      {/* Recently viewed */}
      {panel === "recent" && (
        <SidePanel title="🕐 Recently Viewed" onClose={() => setPanel(null)}>
          {RECENT.map((r, i) => (
            <div key={i} className="flex gap-3 p-3 bg-navy rounded-lg border border-gold/15 mb-2">
              <div className="w-14 h-14 rounded bg-gold/10 flex items-center justify-center text-xl">🏘️</div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{r.title}</div>
                <div className="text-gold text-sm">{r.price}</div>
                <div className="text-xs text-cream/60">{r.meta}</div>
              </div>
            </div>
          ))}
        </SidePanel>
      )}

      {/* Schedule modal */}
      {modal === "schedule" && (
        <Modal title="📅 Schedule a Viewing" onClose={() => setModal(null)}>
          <form onSubmit={(e) => { e.preventDefault(); notify("Viewing request sent — agent will confirm"); setModal(null); }} className="space-y-3">
            <Input label="Date" type="date" />
            <Input label="Time" type="time" />
            <Input label="Your Name" type="text" />
            <Input label="Phone" type="tel" />
            <button type="submit" className="w-full py-2.5 bg-gold text-navy-dark font-bold rounded-lg">Request Viewing</button>
          </form>
        </Modal>
      )}

      {/* Share modal */}
      {modal === "share" && (
        <Modal title="📤 Share This Property" onClose={() => setModal(null)}>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              ["💬", "WhatsApp"],
              ["📧", "Email"],
              ["📱", "SMS"],
              ["🐦", "X / Twitter"],
              ["📘", "Facebook"],
              ["🔗", "Copy Link"],
            ].map(([ico, t]) => (
              <button key={t} onClick={() => { notify(`Sharing via ${t}…`); setModal(null); }} className="p-3 bg-navy rounded-lg border border-gold/15 hover:border-gold text-center">
                <div className="text-2xl mb-1">{ico}</div>
                <div className="text-xs text-cream/75">{t}</div>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input readOnly value="https://propworths.com/property/123" className="flex-1 px-3 py-2 bg-navy rounded border border-gold/20 text-xs text-cream/70" />
            <button onClick={() => notify("Link copied to clipboard")} className="px-3 py-2 bg-gold text-navy-dark text-xs font-semibold rounded">Copy</button>
          </div>
        </Modal>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-lg bg-navy-light border border-gold/40 text-cream text-sm shadow-lg z-[60]">
          {toast}
        </div>
      )}

      <div className="fixed bottom-4 left-4 text-xs text-cream/40 hidden md:block">
        <Link href="/" className="hover:text-gold">← Back to home</Link>
      </div>
    </div>
  );
}

function TBtn({ onClick, ico, tip, badge }: { onClick: () => void; ico: string; tip: string; badge?: string }) {
  return (
    <button onClick={onClick} className="relative group w-12 h-12 rounded-full bg-navy-light border border-gold/40 hover:border-gold hover:bg-gold/10 flex items-center justify-center text-xl shadow-lg" aria-label={tip}>
      {ico}
      {badge && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gold text-navy-dark text-[10px] font-bold flex items-center justify-center">
          {badge}
        </span>
      )}
      <span className="absolute right-full mr-2 px-2 py-1 rounded bg-navy-dark border border-gold/30 text-xs text-cream opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none hidden md:block">
        {tip}
      </span>
    </button>
  );
}

function SidePanel({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-navy-light border-l border-gold/30 z-[55] flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-gold/20">
        <h2 className="font-display font-bold text-cream">{title}</h2>
        <button onClick={onClose} className="text-cream/60 hover:text-cream text-2xl leading-none">×</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">{children}</div>
    </div>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-[55]">
      <div className="bg-navy-light border border-gold/30 rounded-2xl max-w-md w-full p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-display font-bold text-cream">{title}</h2>
          <button onClick={onClose} className="text-cream/60 hover:text-cream text-2xl leading-none">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Input({ label, type }: { label: string; type: string }) {
  return (
    <div>
      <label className="block text-xs text-cream/70 mb-1">{label}</label>
      <input type={type} required className="w-full px-3 py-2 bg-navy rounded border border-gold/20 text-sm text-cream" />
    </div>
  );
}
