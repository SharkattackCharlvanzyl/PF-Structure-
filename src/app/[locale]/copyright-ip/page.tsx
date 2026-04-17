import Link from "next/link";

export const metadata = {
  title: "Copyright & Intellectual Property — Propworths",
  description: "Propworths policy on platform IP, user and seller content licence, restrictions, and IP complaint procedures.",
};

export default function CopyrightIpPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="relative overflow-hidden pt-24 md:pt-32 pb-12 px-4 text-center">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-6">
            Legal · IP
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight">
            Copyright &amp;{" "}
            <span className="italic font-normal text-gold">Intellectual Property</span>
          </h1>
          <p className="mt-4 text-sm text-cream/60">Version 1.0 — applies platform-wide</p>
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <Link href="/terms-of-use" className="text-xs px-3 py-1.5 rounded border border-gold/25 bg-gold/5 text-cream/80 hover:border-gold/50">← Terms of Use</Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-24 space-y-10 text-cream/80 text-sm leading-relaxed">
        <Section n="1" title="Platform IP">
          <p>The Platform, including its design, layout, software, databases, search features, trademarks, logos, and user interface elements, is owned by or licensed to Propworths and is protected by intellectual property laws.</p>
        </Section>

        <Section n="2" title="User & Seller Content">
          <p>Sellers/agents retain ownership of their listing content, but grant Propworths a worldwide, royalty-free licence to host, display, reproduce, distribute, and promote that content on the Platform and in marketing channels for the purpose of providing the service.</p>
        </Section>

        <Section n="3" title="Restrictions">
          <ul className="list-disc ml-6 space-y-1">
            <li>No scraping, copying, or reusing the Platform database without written permission.</li>
            <li>No reproduction of listing images or descriptions for competing services.</li>
            <li>No reverse engineering or unauthorised access attempts.</li>
          </ul>
        </Section>

        <Section n="4" title="IP Complaints">
          <p>If you believe content infringes your IP rights, send a notice to <strong className="text-cream">legal@propworths.com</strong> with: (a) identification of the work; (b) the infringing URL; (c) proof of ownership; and (d) your contact details.</p>
        </Section>
      </main>
    </div>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl md:text-2xl font-bold text-cream mb-3">{n}) {title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
