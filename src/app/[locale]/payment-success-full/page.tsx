import Link from "next/link";

export const metadata = {
  title: "Payment Successful — Propworths",
  description: "Your payment was processed successfully. Receipt and next steps inside.",
};

const DETAILS = [
  { label: "Transaction ID", value: "TXN-2026-1042" },
  { label: "Date", value: "Today, 14:32" },
  { label: "Payment Method", value: "Visa •• 4242" },
  { label: "Amount Paid", value: "$135.00 USD" },
  { label: "Processor", value: "Stripe" },
  { label: "Invoice", value: "INV-2026-0041" },
];

const NEXT_STEPS = [
  { icon: "⏳", title: "Within 15 minutes", text: "Your listing goes live across 185 countries. You'll receive an email confirmation with the public URL." },
  { icon: "📊", title: "Within 24 hours", text: "Analytics start flowing — views, enquiries, and saves visible on your dashboard." },
  { icon: "📩", title: "Ongoing", text: "Enquiries arrive by email, WhatsApp, and in-app. Reply within 48 hours to maintain your response-rate score." },
  { icon: "🧾", title: "On the 2nd of next month", text: "Your monthly invoice is issued automatically with a full reconciliation of actual listing usage." },
];

export default function PaymentSuccessFullPage() {
  return (
    <div className="bg-navy text-cream min-h-screen px-4 py-24">
      <div className="max-w-2xl mx-auto">
        <div className="bg-navy-light border border-emerald-500/40 rounded-3xl p-8 md:p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-4xl">
            ✓
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-gold mb-3">Payment Successful!</h1>
          <p className="text-cream/70 leading-relaxed max-w-md mx-auto">
            Your payment has been processed successfully. A receipt has been emailed to your registered
            address. Your listing will go live within 15 minutes.
          </p>
        </div>

        <div className="bg-navy-light border border-gold/20 rounded-2xl p-6 mt-6">
          <h2 className="font-display text-lg font-semibold text-cream mb-4">Transaction details</h2>
          <dl className="space-y-3 text-sm">
            {DETAILS.map((d) => (
              <div key={d.label} className="flex items-center justify-between py-2 border-b border-gold/10 last:border-0">
                <dt className="text-cream/55">{d.label}</dt>
                <dd className="font-mono text-cream">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="bg-navy-light border border-gold/20 rounded-2xl p-6 mt-6">
          <h2 className="font-display text-lg font-semibold text-cream mb-4">What happens next</h2>
          <div className="space-y-4">
            {NEXT_STEPS.map((s) => (
              <div key={s.title} className="flex gap-3">
                <div className="text-2xl shrink-0">{s.icon}</div>
                <div>
                  <div className="font-semibold text-cream text-sm">{s.title}</div>
                  <div className="text-sm text-cream/65 mt-0.5">{s.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link
            href="/user-dashboard"
            className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors text-center"
          >
            Open My Dashboard →
          </Link>
          <a
            href="#"
            className="px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors text-center"
          >
            Download Receipt (PDF)
          </a>
        </div>

        <div className="text-center mt-6 text-xs text-cream/55">
          Questions?{" "}
          <a href="mailto:billing@propworths.com" className="text-gold underline">
            billing@propworths.com
          </a>
        </div>
      </div>
    </div>
  );
}
