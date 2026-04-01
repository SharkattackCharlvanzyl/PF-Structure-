import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="bg-navy-dark border-t border-gold/20 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="font-display text-gold font-bold mb-4">PropertyFinder</h4>
            <p className="text-cream/50 text-sm">{t("footer.tagline")}</p>
          </div>
          <div>
            <h5 className="text-cream/80 font-semibold mb-3 text-sm uppercase tracking-wider">Property</h5>
            <div className="flex flex-col gap-2">
              <Link href="/buy" className="text-cream/50 hover:text-gold text-sm">{t("footer.buy")}</Link>
              <Link href="/rent" className="text-cream/50 hover:text-gold text-sm">{t("footer.rent")}</Link>
              <Link href="/auctions" className="text-cream/50 hover:text-gold text-sm">{t("footer.auctions")}</Link>
              <Link href="/valuate" className="text-cream/50 hover:text-gold text-sm">{t("footer.valuate")}</Link>
            </div>
          </div>
          <div>
            <h5 className="text-cream/80 font-semibold mb-3 text-sm uppercase tracking-wider">Services</h5>
            <div className="flex flex-col gap-2">
              <Link href="/list-property" className="text-cream/50 hover:text-gold text-sm">{t("footer.sell")}</Link>
              <Link href="/advertise" className="text-cream/50 hover:text-gold text-sm">{t("footer.advertise")}</Link>
              <Link href="/how-it-works" className="text-cream/50 hover:text-gold text-sm">{t("footer.howItWorks")}</Link>
              <Link href="/pricing" className="text-cream/50 hover:text-gold text-sm">{t("footer.commissionFees")}</Link>
            </div>
          </div>
          <div>
            <h5 className="text-cream/80 font-semibold mb-3 text-sm uppercase tracking-wider">Legal</h5>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-cream/50 hover:text-gold text-sm">{t("footer.about")}</Link>
              <Link href="/contact" className="text-cream/50 hover:text-gold text-sm">{t("footer.contact")}</Link>
              <Link href="/terms" className="text-cream/50 hover:text-gold text-sm">{t("footer.terms")}</Link>
              <Link href="/privacy" className="text-cream/50 hover:text-gold text-sm">{t("footer.privacy")}</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gold/10 pt-6 text-center">
          <p className="text-cream/40 text-sm">{t("common.copyright", { year: new Date().getFullYear().toString() })}</p>
        </div>
      </div>
    </footer>
  );
}
