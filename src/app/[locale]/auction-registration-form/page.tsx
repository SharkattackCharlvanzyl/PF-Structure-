"use client";
import Link from "next/link";
import { useState } from "react";

export default function AuctionRegistrationFormPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  function next(e: React.FormEvent) {
    e.preventDefault();
    if (step < 4) setStep(step + 1);
    else setDone(true);
  }

  if (done) {
    return (
      <div className="bg-navy text-cream min-h-screen flex items-center px-4 py-24">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6 text-4xl">✅</div>
          <h1 className="font-display text-3xl font-bold text-cream mb-3">Thank you for registering!</h1>
          <p className="text-cream/70 mb-8">Your Propworths bidder registration has been received. We&apos;ll verify your documents within 24 hours and email you when bidding is activated.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/auctions" className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light">Browse Auctions →</Link>
            <Link href="/auction-how-to-bid" className="px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10">How to Bid</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-navy text-cream">
      <header className="pt-24 md:pt-32 pb-8 px-4 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
          Auctions · Registration
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-cream leading-tight">
          Register to <span className="italic font-normal text-gold">bid</span>
        </h1>
        <p className="mt-4 text-cream/70 max-w-2xl mx-auto">Complete the 4-step registration to access Propworths auctions in 185 countries.</p>
      </header>

      <section className="pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8 gap-2">
            {["Account", "Details", "Verification", "Preferences"].map((label, i) => {
              const s = i + 1;
              const active = step >= s;
              return (
                <div key={s} className="flex-1 flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${active ? "bg-gold text-navy-dark" : "bg-navy-light border border-gold/25 text-cream/50"}`}>{s}</div>
                  <div className="ml-2 text-xs hidden sm:block text-cream/70">{label}</div>
                  {s < 4 && <div className={`flex-1 h-[2px] mx-3 ${step > s ? "bg-gold" : "bg-gold/20"}`} />}
                </div>
              );
            })}
          </div>

          <form onSubmit={next} className="bg-navy-light border border-gold/20 rounded-2xl p-6 space-y-5">
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
            {step === 3 && <Step3 />}
            {step === 4 && <Step4 />}

            <div className="flex justify-between pt-4 border-t border-gold/15">
              {step > 1 ? (
                <button type="button" onClick={() => setStep(step - 1)} className="px-5 py-2.5 border border-gold/25 text-cream/70 rounded-lg hover:text-cream">
                  ← Back
                </button>
              ) : <span />}
              <button type="submit" className="px-6 py-2.5 bg-gold text-navy-dark font-bold rounded-lg hover:bg-gold-light">
                {step < 4 ? "Next →" : "Submit Registration"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children, req, hint }: { label: string; children: React.ReactNode; req?: boolean; hint?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-cream mb-1.5">
        {label}{req && <span className="text-red-400 ml-1">*</span>}
        {hint && <span className="text-cream/50 font-normal ml-2">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-4 py-2.5 bg-navy border border-gold/25 rounded-lg text-cream text-sm focus:border-gold focus:outline-none placeholder:text-cream/40";

function Step1() {
  return (
    <>
      <h2 className="font-display text-xl font-bold text-cream">Step 1 — Basic Account Setup</h2>
      <Field label="Full Name" req><input className={inputCls} placeholder="As on your ID" required /></Field>
      <Field label="Email Address" req><input type="email" className={inputCls} placeholder="you@email.com" required /></Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Password" req><input type="password" className={inputCls} placeholder="8+ characters" required /></Field>
        <Field label="Confirm Password" req><input type="password" className={inputCls} required /></Field>
      </div>
      <Field label="Referral Code" hint="(optional)"><input className={inputCls} placeholder="Enter code if you have one" /></Field>
    </>
  );
}

function Step2() {
  return (
    <>
      <h2 className="font-display text-xl font-bold text-cream">Step 2 — Personal &amp; Contact Details</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Date of Birth" req><input type="date" className={inputCls} required /></Field>
        <Field label="Phone Number" req><input type="tel" className={inputCls} placeholder="+27 82 000 0000" required /></Field>
      </div>
      <Field label="Street Address"><input className={inputCls} placeholder="123 Example St" /></Field>
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="City"><input className={inputCls} /></Field>
        <Field label="State / Province"><input className={inputCls} /></Field>
        <Field label="Postal / ZIP"><input className={inputCls} /></Field>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Country" req>
          <select className={inputCls} required defaultValue="">
            <option value="" disabled>Select country</option>
            <option>South Africa</option><option>United Kingdom</option><option>United Arab Emirates</option>
            <option>Portugal</option><option>Spain</option><option>Australia</option><option>USA</option>
            <option>Canada</option><option>Germany</option><option>Other</option>
          </select>
        </Field>
        <Field label="Preferred Language" hint="(optional)">
          <select className={inputCls} defaultValue="en">
            <option value="en">English</option><option value="af">Afrikaans</option><option value="fr">French</option>
            <option value="de">German</option><option value="es">Spanish</option><option value="pt">Portuguese</option>
          </select>
        </Field>
        <Field label="Display Currency" hint="(optional)">
          <select className={inputCls} defaultValue="USD">
            <option>USD</option><option>ZAR</option><option>EUR</option><option>GBP</option><option>AED</option>
          </select>
        </Field>
      </div>
    </>
  );
}

function Step3() {
  return (
    <>
      <h2 className="font-display text-xl font-bold text-cream">Step 3 — Verification Documents</h2>
      <Field label="Identity Proof" req hint="— Passport or national ID">
        <input type="file" accept=".pdf,.jpg,.png" className={inputCls} required />
      </Field>
      <Field label="Proof of Funds" req hint="— required for bidders">
        <input type="file" accept=".pdf,.jpg,.png" className={inputCls} required />
        <p className="text-xs text-cream/60 mt-2">Attorney trust letter or bank pre-approval (on letterhead). Bank statements alone are not accepted.</p>
      </Field>
      <Field label="Additional Documents" hint="(optional)">
        <input type="file" accept=".pdf,.jpg,.png" multiple className={inputCls} />
      </Field>
    </>
  );
}

function Step4() {
  return (
    <>
      <h2 className="font-display text-xl font-bold text-cream">Step 4 — Preferences &amp; Agreements</h2>
      <Field label="User Type" req hint="(select one or more)">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {["Individual Bidder", "Corporate Bidder", "Agent / Broker", "Developer"].map((t) => (
            <label key={t} className="flex items-center gap-2 px-3 py-2 bg-navy rounded-lg border border-gold/20">
              <input type="checkbox" className="accent-gold" /> {t}
            </label>
          ))}
        </div>
      </Field>
      <Field label="Auction Interests" hint="(optional)">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {["Residential", "Commercial", "Industrial", "Farm", "Business", "Developments"].map((t) => (
            <label key={t} className="flex items-center gap-2 px-3 py-2 bg-navy rounded-lg border border-gold/20">
              <input type="checkbox" className="accent-gold" /> {t}
            </label>
          ))}
        </div>
      </Field>
      <div className="p-4 rounded-lg border border-dashed border-gold/30 bg-gold/5">
        <h3 className="font-semibold text-gold mb-2">💰 Bidder Commitment &amp; Deposit Requirement</h3>
        <p className="text-xs text-cream/75 leading-relaxed">Before placing any bid you must deposit USD 10,000 into your own attorney&apos;s trust account and upload proof to the auction listing page. The deposit is credited to your purchase price if you win, or fully refunded by your attorney if you do not win. See the <Link href="/auction-faq" className="text-gold underline">FAQ</Link> for full details.</p>
      </div>
      <div className="space-y-2 text-sm">
        <label className="flex gap-3 items-start text-cream/80">
          <input type="checkbox" className="mt-1 accent-gold" required />
          <span>I accept the <Link href="/auction-bidding-terms" className="text-gold underline">Auction Bidding Terms</Link>, including the 5% Platform Commission on default.</span>
        </label>
        <label className="flex gap-3 items-start text-cream/80">
          <input type="checkbox" className="mt-1 accent-gold" required />
          <span>I accept the <Link href="/terms-of-use" className="text-gold underline">Terms of Use</Link> and <Link href="/privacy-policy" className="text-gold underline">Privacy Policy</Link>.</span>
        </label>
        <label className="flex gap-3 items-start text-cream/80">
          <input type="checkbox" className="mt-1 accent-gold" />
          <span>Send me auction alerts and platform updates by email.</span>
        </label>
      </div>
    </>
  );
}
