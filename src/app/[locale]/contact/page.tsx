"use client";
import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setError("Please complete all fields.");
      return;
    }
    if (!EMAIL_REGEX.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (form.message.trim().length < 10) {
      setError("Message must be at least 10 characters.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "info@propworths.com",
          subject: `Propworths Contact Form — ${form.subject}`,
          template: "contact-form",
          data: {
            name: form.name,
            from: form.email,
            subject: form.subject,
            message: form.message,
          },
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.success) {
        setError(body.error || "Something went wrong. Please try again or email info@propworths.com directly.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Network error. Please try again or email info@propworths.com directly.");
      setStatus("error");
    }
  }

  return (
    <div className="bg-navy text-cream min-h-screen">
      <header className="pt-24 md:pt-32 pb-10 px-4 border-b border-gold/15">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">Contact Us</h1>
          <p className="text-cream/70 text-base md:text-lg">
            Have a question about listings, payments, or partnerships? Send us a message and we&apos;ll be in touch soon.
          </p>
        </div>
      </header>

      <section className="px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          {status === "success" ? (
            <div className="bg-navy-light border border-gold/30 rounded-2xl p-8 md:p-10 text-center">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-3xl">
                ✓
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gold mb-3">
                Thanks — we&apos;ll be in touch soon
              </h2>
              <p className="text-cream/70 text-sm md:text-base">
                Your message has been sent to the Propworths team. We typically respond within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="bg-navy-light border border-gold/20 rounded-2xl p-6 md:p-8 space-y-5">
              <Field label="Name" required>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={inputCls}
                  placeholder="Your full name"
                  autoComplete="name"
                />
              </Field>

              <Field label="Email" required>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputCls}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </Field>

              <Field label="Subject" required>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  className={inputCls}
                  placeholder="What is this about?"
                />
              </Field>

              <Field label="Message" required hint="Minimum 10 characters">
                <textarea
                  required
                  rows={6}
                  minLength={10}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className={`${inputCls} resize-y`}
                  placeholder="Tell us how we can help…"
                />
              </Field>

              {error && (
                <div
                  role="alert"
                  className="p-3 rounded-lg border border-red-400/40 bg-red-900/20 text-sm text-red-200"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full px-6 py-3 bg-gold text-navy-dark font-bold rounded-xl hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Sending…" : "Send Message"}
              </button>

              <p className="text-xs text-cream/50 text-center">
                Or email us directly at{" "}
                <a href="mailto:info@propworths.com" className="text-gold underline">
                  info@propworths.com
                </a>
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

const inputCls =
  "w-full px-4 py-2.5 bg-navy border border-gold/25 rounded-lg text-cream text-sm focus:border-gold focus:outline-none placeholder:text-cream/40";

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-cream mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
        {hint && <span className="text-cream/50 font-normal ml-2">{hint}</span>}
      </label>
      {children}
    </div>
  );
}
