import Link from "next/link";

export const metadata = {
  title: "Dispute Resolution & Arbitration — Propworths",
  description: "How disputes are handled on the Propworths platform: informal resolution, mediation, arbitration, and court actions.",
};

export default function DisputeResolutionPage() {
  return (
    <div className="bg-navy text-cream">
      <header className="pt-24 md:pt-32 pb-10 px-4 border-b border-gold/15">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
            Dispute Resolution &amp; Arbitration
          </h1>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-navy-light text-cream/70 border border-gold/20">Version 1.0</span>
            <span className="px-3 py-1 rounded-full bg-navy-light text-cream/70 border border-gold/20">Effective: [Insert Date]</span>
          </div>
          <div className="flex flex-wrap gap-4 mt-6 text-sm">
            <Link href="/terms-of-use" className="text-gold hover:text-gold-light">← Terms of Use</Link>
            <Link href="/auction-bidding-terms" className="text-gold hover:text-gold-light">Auction Terms</Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <Section n="1" title="Informal Resolution First">
          <p>
            If a dispute arises relating to the Platform, auctions, fees/commission, or these
            policies, you agree to first contact us to attempt good-faith resolution. Many issues can
            be resolved quickly by support and integrity teams.
          </p>
          <p>
            <strong className="text-cream">Legal Notices:</strong>{" "}
            <a href="mailto:legal@propworths.com" className="text-gold underline">legal@propworths.com</a>
          </p>
        </Section>

        <Section n="2" title="Mandatory Mediation (Optional by Jurisdiction)">
          <p>
            Where permitted, the parties agree to attempt mediation before commencing court
            proceedings, except for urgent injunctive relief (e.g., fraud, IP infringement, platform
            abuse).
          </p>
          <Note>
            Some jurisdictions require or prohibit certain pre-dispute clauses for consumers. This
            section should be adapted per country.
          </Note>
        </Section>

        <Section n="3" title="Arbitration Clause">
          <p>
            Unless prohibited by mandatory law, disputes will be finally resolved by arbitration under
            the rules stated in the Platform legal footer or in the applicable contracting entity's
            terms (e.g., ICC / LCIA / local arbitration centre).
          </p>
          <List>
            <li><strong>Seat / Venue:</strong> [Insert City, Country]</li>
            <li><strong>Language:</strong> English (unless otherwise agreed)</li>
            <li><strong>Number of Arbitrators:</strong> 1 (or 3 for high-value disputes)</li>
          </List>
        </Section>

        <Section n="4" title="Court & Injunctions">
          <p>
            Nothing prevents Propworths from seeking urgent court relief to protect Platform
            integrity, prevent fraud, enforce IP rights, or recover debts (including unpaid
            commission).
          </p>
        </Section>

        <Section n="5" title="Class / Group Actions (Where Permitted)">
          <p>
            Where allowed, disputes must be brought on an individual basis and not as a class or
            representative action. If your jurisdiction prohibits such waivers, this clause will not
            apply to the extent of that prohibition.
          </p>
        </Section>
      </main>
    </div>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl md:text-2xl font-bold text-cream mb-4 flex items-center gap-3">
        <span className="w-1 h-6 bg-gold rounded" />
        <span>
          <span className="text-gold/70 mr-2">{n})</span>
          {title}
        </span>
      </h2>
      <div className="space-y-3 text-cream/75 leading-relaxed text-[15px]">{children}</div>
    </section>
  );
}

function List({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 space-y-1.5 marker:text-gold/60">{children}</ul>;
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-navy-light border border-dashed border-gold/25 rounded-xl p-4 text-sm text-cream/70">
      {children}
    </div>
  );
}
