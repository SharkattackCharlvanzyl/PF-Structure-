"use client";
import Link from "next/link";
import { useMemo, useState } from "react";

type Invoice = {
  num: string;
  date: string;
  name: string;
  email: string;
  plan: string;
  listings: number;
  total: number;
  currency: "USD" | "ZAR" | "EUR" | "GBP";
  sym: string;
};

const SAMPLE: Invoice[] = [
  { num: "PW-2026-00142", date: "2026-04-15", name: "Sandton Estates Pty Ltd", email: "admin@sandtonestates.co.za", plan: "Agency", listings: 86, total: 258, currency: "USD", sym: "$" },
  { num: "PW-2026-00141", date: "2026-04-15", name: "Franschhoek Wine Group", email: "listings@fwg.co.za", plan: "Enterprise", listings: 2450, total: 4900, currency: "USD", sym: "$" },
  { num: "PW-2026-00140", date: "2026-04-14", name: "Lisa Morrison", email: "lisa.m@gmail.com", plan: "Private", listings: 2, total: 15, currency: "USD", sym: "$" },
  { num: "PW-2026-00139", date: "2026-04-14", name: "Hamptons & Partners", email: "finance@hamptons.co.uk", plan: "Agency", listings: 412, total: 1236, currency: "GBP", sym: "£" },
  { num: "PW-2026-00138", date: "2026-04-13", name: "Umhlanga Realty", email: "accounts@umhlangarealty.co.za", plan: "Agency", listings: 58, total: 174, currency: "USD", sym: "$" },
  { num: "PW-2026-00137", date: "2026-04-13", name: "Dubai Marina Brokers LLC", email: "billing@dmb.ae", plan: "Enterprise", listings: 3200, total: 6400, currency: "USD", sym: "$" },
  { num: "PW-2026-00136", date: "2026-04-12", name: "Pete van der Merwe", email: "pete.vdm@outlook.com", plan: "Private", listings: 1, total: 7.5, currency: "USD", sym: "$" },
  { num: "PW-2026-00135", date: "2026-04-11", name: "Cape Heritage Properties", email: "team@capeheritage.com", plan: "Agency", listings: 124, total: 372, currency: "USD", sym: "$" },
];

export default function AdminInvoicesPage() {
  const [q, setQ] = useState("");
  const [cur, setCur] = useState("");
  const [sel, setSel] = useState<Invoice | null>(null);

  const filtered = useMemo(() => {
    return SAMPLE.filter((inv) => {
      const qm = !q || (inv.num + inv.name + inv.email + inv.plan).toLowerCase().includes(q.toLowerCase());
      const cm = !cur || inv.currency === cur;
      return qm && cm;
    });
  }, [q, cur]);

  const totalRev = SAMPLE.reduce((s, i) => s + (i.currency === "USD" ? i.total : 0), 0);
  const thisMonth = SAMPLE.filter((i) => i.date.startsWith("2026-04")).length;
  const latest = SAMPLE[0];

  return (
    <div className="bg-navy text-cream">
      <header className="pt-24 md:pt-28 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-between items-end">
            <div>
              <div className="text-xs text-gold tracking-wider uppercase font-semibold mb-1">Admin</div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-cream">Invoice Manager</h1>
              <p className="text-cream/60 text-sm mt-2">All paid Propworths listing subscriptions</p>
            </div>
            <div className="flex gap-2">
              <Link href="/admin-dashboard" className="text-xs px-3 py-2 rounded border border-gold/25 text-cream/80 hover:border-gold/50">← Dashboard</Link>
              <button onClick={() => alert("CSV export (demo)")} className="text-xs px-3 py-2 rounded bg-gold text-navy-dark font-semibold">Export CSV</button>
            </div>
          </div>
        </div>
      </header>

      <section className="px-4 pb-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Total Invoices" value={SAMPLE.length.toString()} />
          <Stat label="Total Monthly Revenue (USD)" value={`$${totalRev.toFixed(2)}`} />
          <Stat label="This Month" value={thisMonth.toString()} />
          <Stat label="Latest Invoice" value={`#${latest.num.split("-").pop()}`} sub={latest.name} />
        </div>
      </section>

      <section className="px-4 pb-6">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 items-center">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search invoices, customers, plans…"
            className="flex-1 min-w-[260px] px-4 py-2.5 bg-navy-light border border-gold/25 rounded-lg text-cream text-sm focus:border-gold outline-none"
          />
          <select
            value={cur}
            onChange={(e) => setCur(e.target.value)}
            className="px-4 py-2.5 bg-navy-light border border-gold/25 rounded-lg text-cream text-sm"
          >
            <option value="">All currencies</option>
            <option value="USD">USD</option>
            <option value="ZAR">ZAR</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="max-w-7xl mx-auto overflow-x-auto bg-navy-light border border-gold/20 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-navy-dark text-cream/70 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-3 text-left">Invoice #</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Plan</th>
                <th className="p-3 text-right">Listings</th>
                <th className="p-3 text-right">Total / mo</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => (
                <tr key={inv.num} onClick={() => setSel(inv)} className="border-t border-gold/10 hover:bg-gold/5 cursor-pointer">
                  <td className="p-3 text-gold font-mono">{inv.num}</td>
                  <td className="p-3 text-cream/70">{inv.date}</td>
                  <td className="p-3">
                    <div className="text-cream">{inv.name}</div>
                    <div className="text-xs text-cream/50">{inv.email}</div>
                  </td>
                  <td className="p-3">{inv.plan}</td>
                  <td className="p-3 text-right">{inv.listings.toLocaleString()}</td>
                  <td className="p-3 text-right text-gold font-semibold">{inv.sym}{inv.total.toFixed(2)}</td>
                  <td className="p-3 text-center">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-emerald-900/40 text-emerald-300 border border-emerald-400/20">✓ Paid</span>
                  </td>
                </tr>
              ))}
              {!filtered.length && (
                <tr><td colSpan={7} className="p-6 text-center text-cream/50 text-sm">No invoices match.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {sel && (
        <div onClick={() => setSel(null)} className="fixed inset-0 bg-black/70 backdrop-blur z-50 flex items-center justify-center p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-navy-light border border-gold/30 rounded-2xl max-w-lg w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="font-display text-xl font-bold text-cream">Invoice {sel.num}</div>
                <div className="text-sm text-cream/60">{sel.name} · {sel.email}</div>
              </div>
              <button onClick={() => setSel(null)} className="text-cream/60 hover:text-cream text-2xl leading-none">×</button>
            </div>
            <div className="space-y-2 text-sm">
              <Row k="Date" v={sel.date} />
              <Row k="Plan" v={sel.plan} />
              <Row k="Listings" v={`${sel.listings.toLocaleString()} listings`} />
              <Row k="Currency" v={sel.currency} />
              <Row k="Total Monthly" v={`${sel.sym}${sel.total.toFixed(2)} / month`} emphasis />
              <Row k="Status" v="✓ PAID" paid />
            </div>
            <div className="flex gap-3 mt-6">
              <button className="flex-1 px-4 py-2 bg-gold text-navy-dark font-semibold rounded-lg">View PDF</button>
              <button className="flex-1 px-4 py-2 border border-gold/30 text-cream rounded-lg hover:bg-gold/10">Resend Email</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-navy-light border border-gold/20 rounded-xl p-4">
      <div className="text-[11px] uppercase tracking-wider text-cream/60 mb-1">{label}</div>
      <div className="font-display text-2xl font-bold text-gold">{value}</div>
      {sub && <div className="text-xs text-cream/50 mt-1 truncate">{sub}</div>}
    </div>
  );
}

function Row({ k, v, emphasis, paid }: { k: string; v: string; emphasis?: boolean; paid?: boolean }) {
  return (
    <div className="flex justify-between py-2 border-b border-gold/10 last:border-0">
      <span className="text-cream/60">{k}</span>
      <span className={emphasis ? "font-display text-xl text-gold font-bold" : paid ? "text-emerald-400 font-semibold" : "text-cream"}>{v}</span>
    </div>
  );
}
