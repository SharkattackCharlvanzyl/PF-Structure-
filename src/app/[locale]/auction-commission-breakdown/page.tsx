"use client";
import Link from "next/link";
import { useState } from "react";

const PRESETS = [100000, 250000, 500000, 750000, 1000000, 2000000, 5000000];

const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export default function AuctionCommissionBreakdownPage() {
  const [price, setPrice] = useState(500000);
  const pfComm = price * 0.05;
  const agComm = price * 0.05;
  const tcEst = price * 0.04;
  const aNetComm = price - pfComm - agComm;
  const pNetComm = price - pfComm;

  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-12 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Auctions · Commission Calculator
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
            Commission &amp;{" "}
            <span className="italic font-normal text-gold">net proceeds</span>
          </h1>
          <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
            Adjust the sale price to see Propworths&apos;s 5% commission, agent commission, and your net proceeds on both listing types.
          </p>
        </div>
      </header>

      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto bg-navy-light border border-gold/20 rounded-2xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h2 className="font-display text-xl font-bold text-cream">Adjust Sale Price</h2>
            <div className="font-display text-3xl font-bold text-gold">{fmt(price)} <span className="text-sm text-cream/50">USD</span></div>
          </div>
          <input
            type="range"
            min={50000}
            max={5000000}
            step={50000}
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            className="w-full accent-gold cursor-pointer"
          />
          <div className="flex flex-wrap gap-2 mt-4">
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => setPrice(p)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  price === p ? "border-gold bg-gold/20 text-gold" : "border-gold/25 text-cream/70 hover:border-gold/50"
                }`}
              >
                {fmt(p)}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-8 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <Card
            title="Agent / Auctioneer Listed"
            icon="🏢"
            sub="Sold through a licensed agent or auctioneer"
            rows={[
              ["Final Sale Price", fmt(price)],
              ["Propworths Commission (5%)", "– " + fmt(pfComm), "text-red-300"],
              ["Agent Commission (5%)", "– " + fmt(agComm), "text-red-300"],
              ["Total Commission", "– " + fmt(pfComm + agComm), "text-cream font-bold"],
              ["Est. Transfer Costs*", "≈ " + fmt(tcEst), "text-cream/50"],
            ]}
            net={aNetComm}
            price={price}
            totalComm={pfComm + agComm}
          />
          <Card
            title="Private / Owner Listed"
            icon="🏡"
            sub="Sold directly by the owner — no agent"
            rows={[
              ["Final Sale Price", fmt(price)],
              ["Propworths Commission (5%)", "– " + fmt(pfComm), "text-red-300"],
              ["Agent Commission", "None — $0", "text-cream/50"],
              ["Total Commission", "– " + fmt(pfComm), "text-cream font-bold"],
              ["Est. Transfer Costs*", "≈ " + fmt(tcEst), "text-cream/50"],
            ]}
            net={pNetComm}
            price={price}
            totalComm={pfComm}
          />
        </div>
      </section>

      <section className="py-6 px-4">
        <div className="max-w-5xl mx-auto p-6 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex flex-wrap items-center gap-5">
          <div className="text-4xl">💡</div>
          <div className="flex-1 min-w-[220px]">
            <div className="font-display text-lg font-bold text-cream mb-1">Private listing saves you the agent commission</div>
            <div className="text-sm text-cream/75">At {fmt(price)} that&apos;s {fmt(agComm)} saved. Propworths&apos;s 5% applies in both scenarios.</div>
          </div>
          <div className="text-center bg-navy/60 rounded-xl px-5 py-4">
            <div className="text-[11px] uppercase tracking-wider text-cream/60 mb-1">Agent commission saved</div>
            <div className="font-display text-2xl font-bold text-gold">{fmt(agComm)}</div>
          </div>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-cream mb-4">What if the winning bidder defaults?</h2>
          <p className="text-sm text-cream/70 mb-4">If the winning bidder fails to complete after their bid is accepted, the following applies regardless of listing type:</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["🚫", "No Success Commission", "Success commission (5% or 10%) is NOT owed by the seller. The sale did not complete."],
              ["⚡", "5% Charged to Defaulting Buyer", "Propworths charges the buyer 5% of the accepted bid, payable within 48 hours."],
              ["🔒", "$10,000 Security Deposit", "The buyer's $10,000 attorney trust deposit may be withheld pending resolution."],
              ["🔄", "Seller Can Relist", "Propworths may offer the property to the second-highest bidder, or the seller may relist."],
            ].map(([ico, t, d]) => (
              <div key={t} className="bg-navy-light border border-gold/15 rounded-xl p-4">
                <div className="text-2xl mb-2">{ico}</div>
                <div className="font-semibold text-gold text-sm mb-1">{t}</div>
                <div className="text-xs text-cream/70 leading-relaxed">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-10 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5">
          <div className="bg-navy-light border border-gold/15 rounded-xl p-5">
            <h3 className="font-semibold text-gold mb-3">ℹ️ What's included in commission</h3>
            <ul className="text-sm text-cream/70 space-y-2 list-disc ml-5">
              <li>Propworths&apos;s 5% covers: platform hosting, online auction technology, bidder verification, marketing reach across 185 countries, and full auction management.</li>
              <li>The agent&apos;s 5% covers: valuation, marketing support, buyer introductions, viewings, negotiation assistance, and post-sale coordination.</li>
              <li>Commission is deducted from sale proceeds at closing — not payable upfront.</li>
            </ul>
          </div>
          <div className="bg-navy-light border border-gold/15 rounded-xl p-5">
            <h3 className="font-semibold text-gold mb-3">⚠️ Transfer costs are separate</h3>
            <ul className="text-sm text-cream/70 space-y-1 list-disc ml-5">
              <li><strong className="text-cream">South Africa:</strong> transfer duty, conveyancing, compliance certs</li>
              <li><strong className="text-cream">UK:</strong> Stamp Duty Land Tax, conveyancing</li>
              <li><strong className="text-cream">Australia:</strong> state stamp duty, conveyancing, CGT</li>
              <li><strong className="text-cream">UAE:</strong> 4% DLD fee, agency fees, NOC fees</li>
              <li><strong className="text-cream">Portugal / Spain:</strong> IMT, notary, land registry, VAT</li>
              <li><strong className="text-cream">USA:</strong> transfer taxes, closing costs, title insurance</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-24 px-4">
        <div className="max-w-5xl mx-auto text-xs text-cream/50 leading-relaxed">
          * Transfer cost estimates are indicative only (approx. 3–5% of sale price) and vary significantly by country. Propworths is not a legal or tax advisor. Sellers must obtain independent legal and tax advice. All figures in USD. Commission is charged on the final accepted sale price and deducted at transfer/closing. See the <Link href="/auction-seller-agreement" className="text-gold underline">Seller Agreement</Link> and <Link href="/commission-fees" className="text-gold underline">Commission &amp; Fees Policy</Link> for full terms.
        </div>
      </section>
    </div>
  );
}

function Card({
  title, icon, sub, rows, net, price, totalComm,
}: {
  title: string;
  icon: string;
  sub: string;
  rows: (string | undefined)[][];
  net: number;
  price: number;
  totalComm: number;
}) {
  return (
    <div className="bg-navy-light border border-gold/20 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <div className="font-display text-lg font-bold text-cream">{title}</div>
          <div className="text-xs text-cream/60">{sub}</div>
        </div>
      </div>
      <div className="space-y-2">
        {rows.map(([label, val, cls], i) => (
          <div key={i} className="flex justify-between items-center py-2 border-b border-gold/10 last:border-0 text-sm">
            <span className="text-cream/70">{label}</span>
            <span className={`font-semibold ${cls || "text-cream"}`}>{val}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 p-4 rounded-xl bg-gold/10 border border-gold/30">
        <div className="text-xs uppercase tracking-wider text-gold mb-1">💰 Seller Net Proceeds</div>
        <div className="font-display text-2xl font-bold text-gold">{fmt(net)}</div>
        <div className="text-xs text-cream/60 mt-1">
          That&apos;s {((net / price) * 100).toFixed(1)}% of sale price after {fmt(totalComm)} commission. Before transfer costs.
        </div>
      </div>
    </div>
  );
}
