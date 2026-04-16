import Link from "next/link";

export const metadata = {
  title: "Payment Cancelled — Propworths",
  description: "Your payment was cancelled. No funds were taken. You can try again any time.",
};

export default function PaymentCancelPage() {
  return (
    <div className="bg-navy text-cream min-h-screen flex items-center justify-center px-4 py-24">
      <div className="bg-navy-light border border-gold/25 rounded-3xl p-10 md:p-12 max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-3xl">
          ↩️
        </div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-gold mb-3">Payment Cancelled</h1>
        <p className="text-cream/70 mb-8 leading-relaxed">
          No payment was taken. You can try again whenever you're ready — your items and listing data
          are saved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/list-property"
            className="px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors"
          >
            ← Back to Listing
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 border border-gold/40 text-gold rounded-xl hover:bg-gold/10 transition-colors"
          >
            My Dashboard
          </Link>
        </div>
        <div className="mt-8 text-xs text-cream/55">
          Need help?{" "}
          <Link href="/ai-chat" className="text-gold underline">
            Chat with our AI assistant
          </Link>
        </div>
      </div>
    </div>
  );
}
