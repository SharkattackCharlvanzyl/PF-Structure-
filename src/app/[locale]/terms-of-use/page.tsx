import Link from "next/link";

export const metadata = {
  title: "Terms of Use — Propworths",
  description:
    "Terms of Use for the Propworths platform. Account rules, permitted and prohibited use, disclaimers, and governing law.",
};

const NAV = [
  { href: "#acceptance", label: "Acceptance" },
  { href: "#definitions", label: "Definitions" },
  { href: "#accounts", label: "Accounts & Verification" },
  { href: "#platform", label: "Platform Use" },
  { href: "#listings", label: "Listings & Content" },
  { href: "#liability", label: "Disclaimers" },
  { href: "#termination", label: "Termination" },
  { href: "#law", label: "Governing Law" },
  { href: "#contact", label: "Contact" },
];

export default function TermsOfUsePage() {
  return (
    <div className="bg-navy text-cream">
      <header className="pt-24 md:pt-32 pb-10 px-4 border-b border-gold/15">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">Terms of Use</h1>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30">International Platform</span>
            <span className="px-3 py-1 rounded-full bg-navy-light text-cream/70 border border-gold/20">Version 1.0</span>
            <span className="px-3 py-1 rounded-full bg-navy-light text-cream/70 border border-gold/20">Effective: [Insert Date]</span>
          </div>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 mt-6 text-sm">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-gold hover:text-gold-light">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <Section id="acceptance" n="1" title="Acceptance of these Terms">
          <p>
            These Terms of Use ("Terms") govern access to and use of the Propworths website, web
            application, mobile interfaces, APIs, and related services (collectively, the "Platform")
            operated by <strong className="text-cream">Propworths Head Office</strong> ("Propworths",
            "we", "us", "our").
          </p>
          <p>
            By creating an account, accessing, browsing, listing, advertising, bidding, or otherwise
            using the Platform, you confirm that you: (a) have read and understood these Terms;
            (b) agree to be legally bound by them; and (c) have authority to enter into these Terms.
            If you do not agree, do not use the Platform.
          </p>
          <Note>
            Auction bidding is additionally governed by the separate{" "}
            <Link href="/auction-bidding-terms" className="text-gold underline">
              Online Auction Bidding Terms &amp; Conditions
            </Link>
            . In case of conflict, the Auction Terms prevail for auction activities.
          </Note>
        </Section>

        <Section id="definitions" n="2" title="Definitions">
          <List>
            <li><strong>"User"</strong> means any person or entity using the Platform.</li>
            <li><strong>"Buyer"</strong> means a User who searches, enquires, bids, or purchases.</li>
            <li><strong>"Seller"</strong> means an owner, agent, developer, auctioneer, or authorised representative listing an item.</li>
            <li><strong>"Listing"</strong> means any property or business-for-sale advertisement, including text, images, media, pricing, and documents.</li>
            <li><strong>"Auction"</strong> means a time-bound bidding process hosted on the Platform.</li>
            <li><strong>"Accepted Bid"</strong> means a bid approved/accepted by the Seller through the Platform.</li>
            <li><strong>"Head Office"</strong> means the designated Propworths contracting entity shown in the Platform's legal footer and invoices.</li>
          </List>
        </Section>

        <Section id="accounts" n="3" title="Accounts, Eligibility & Verification">
          <SubHeading>3.1 Eligibility</SubHeading>
          <p>You must be legally capable of entering binding contracts in your jurisdiction. If you are acting for a company, you warrant you are authorised to bind that company.</p>
          <SubHeading>3.2 Account Security</SubHeading>
          <p>You are responsible for all activity on your account and must keep credentials secure. Notify us immediately if you suspect unauthorised access.</p>
          <SubHeading>3.3 KYC / Identity Checks</SubHeading>
          <p>
            We may require identity, address, and payment verification (including third-party
            verification providers) and may refuse, suspend, or limit access where verification is
            incomplete, inaccurate, or raises fraud/AML concerns.
          </p>
        </Section>

        <Section id="platform" n="4" title="Platform Rules (Permitted & Prohibited Use)">
          <SubHeading>4.1 Permitted Use</SubHeading>
          <p>You may use the Platform for lawful property search, advertising, communications, and transactions in accordance with these Terms and any applicable policies.</p>
          <SubHeading>4.2 Prohibited Conduct</SubHeading>
          <List>
            <li>Fraud, misrepresentation, shill bidding, bid manipulation, or circumvention of Platform processes.</li>
            <li>Uploading unlawful, defamatory, infringing, or misleading content.</li>
            <li>Attempting to bypass fees/commission, interfere with auctions, scrape data, reverse engineer, or harm Platform security.</li>
            <li>Impersonating others, creating fake accounts, or using automated bidding tools unless expressly allowed by us.</li>
          </List>
        </Section>

        <Section id="listings" n="5" title="Listings, Third-Party Content & No Agency">
          <SubHeading>5.1 Marketplace / Portal Nature</SubHeading>
          <p>
            Propworths is a technology platform. Unless we explicitly state otherwise in writing, we
            are not the seller, auctioneer, conveyancer, or agent for any transaction. Listings are
            provided by Sellers/agents who are responsible for accuracy and legal compliance.
          </p>
          <SubHeading>5.2 Content Responsibility</SubHeading>
          <p>
            Sellers/agents warrant that listings are accurate, not misleading, and that they have all
            rights/authority to list. Propworths may remove or edit listings for compliance, quality,
            or risk reasons at our discretion.
          </p>
        </Section>

        <Section id="liability" n="6" title="Disclaimers, Limitation of Liability">
          <p>
            The Platform is provided "as is" and "as available". We do not guarantee uninterrupted
            availability, error-free operation, or that listings are complete or accurate. You remain
            responsible for due diligence, inspections, legal and financial advice.
          </p>
          <p>
            To the maximum extent permitted by law, Propworths is not liable for indirect,
            consequential, special, or punitive damages, or for losses arising from reliance on
            listings, third-party content, failed communications, or disputes between Users.
          </p>
        </Section>

        <Section id="termination" n="7" title="Suspension, Termination & Enforcement">
          <p>
            We may suspend, limit, or terminate accounts and access at any time where we reasonably
            believe there is fraud, abuse, legal risk, breach of Terms/policies, or harm to Platform
            integrity. We may cooperate with law enforcement and share information as permitted by law.
          </p>
        </Section>

        <Section id="law" n="8" title="Governing Law & Dispute Resolution">
          <p>
            These Terms are governed by the law stated in the legal footer on the Platform, unless
            mandatory consumer rules in your jurisdiction require otherwise. Dispute handling is
            further described in{" "}
            <Link href="/dispute-resolution" className="text-gold underline">
              Dispute Resolution &amp; Arbitration
            </Link>
            .
          </p>
        </Section>

        <Section id="contact" n="9" title="Contact">
          <p>
            <strong className="text-cream">Propworths Head Office:</strong> [Legal Entity Name],
            [Registration No], [Address], [Country]
          </p>
          <p>
            <strong className="text-cream">Legal Notices Email:</strong>{" "}
            <a href="mailto:legal@propworths.com" className="text-gold underline">legal@propworths.com</a>
          </p>
          <p>
            <strong className="text-cream">Support:</strong>{" "}
            <a href="mailto:support@propworths.com" className="text-gold underline">support@propworths.com</a>
          </p>
        </Section>

        <div className="bg-navy-light border border-dashed border-gold/25 rounded-2xl p-5 text-sm text-cream/65">
          <strong className="text-cream">Important Legal Note.</strong> This document is designed for
          international use, but laws differ by country (consumer protection, auction rules,
          real-estate regulation, AML/KYC, data protection). Local counsel should adapt the governing
          law, consumer disclosures, and any mandatory provisions for each target market.
        </div>
      </main>
    </div>
  );
}

function Section({ id, n, title, children }: { id: string; n: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
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

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-semibold text-cream mt-4 mb-1">{children}</h3>;
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
