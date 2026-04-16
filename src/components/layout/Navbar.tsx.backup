"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Bars3Icon, XMarkIcon, GlobeAltIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { locales, localeNames, defaultLocale, type Locale } from "@/i18n/config";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/buy", label: t("buy") },
    { href: "/rent", label: t("rent") },
    { href: "/business", label: t("business") },
    { href: "/auctions", label: t("auctions") },
    { href: "/pricing", label: t("pricing") },
    { href: "/how-it-works", label: t("howItWorks") },
  ];

  const switchLocale = (newLocale: string) => {
    setLangOpen(false);
    // Remove current locale prefix from pathname
    let path = pathname;
    for (const loc of locales) {
      if (path.startsWith("/" + loc + "/")) {
        path = path.slice(("/" + loc).length);
        break;
      } else if (path === "/" + loc) {
        path = "/";
        break;
      }
    }
    // Build new path
    const newPath = newLocale === defaultLocale ? path || "/" : "/" + newLocale + path;
    router.push(newPath);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl font-bold text-gold">
          PropertyFinder
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-cream/70 hover:text-gold transition-colors text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gold/20 text-cream/70 hover:text-gold hover:border-gold/40 transition-colors text-sm"
            >
              <GlobeAltIcon className="w-4 h-4" />
              <span>{localeNames[locale as Locale]?.split(" ")[0] || locale.toUpperCase()}</span>
              <ChevronDownIcon className="w-3 h-3" />
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                <div className="absolute right-0 top-full mt-2 bg-navy-light border border-gold/20 rounded-xl shadow-2xl py-2 w-48 max-h-80 overflow-y-auto z-50">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={"w-full text-left px-4 py-2 text-sm transition-colors " + (loc === locale ? "text-gold bg-gold/10" : "text-cream/60 hover:text-cream hover:bg-gold/5")}
                    >
                      {localeNames[loc]}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <Link href="/valuate" className="text-cream/70 hover:text-gold text-sm">
            {t("valuate")}
          </Link>
          <Link
            href="/list-property"
            className="bg-gold text-navy-dark font-bold py-2 px-5 rounded-lg text-sm hover:bg-gold-dark transition-colors"
          >
            {t("listProperty")}
          </Link>
          <Link href="/login" className="text-cream/70 hover:text-gold text-sm">
            {t("login")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="text-gold p-1"
          >
            <GlobeAltIcon className="w-6 h-6" />
          </button>
          <button
            className="text-gold"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <XMarkIcon className="w-7 h-7" />
            ) : (
              <Bars3Icon className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Language dropdown (mobile) */}
      {langOpen && (
        <div className="lg:hidden bg-navy border-t border-gold/20 px-4 py-3 grid grid-cols-3 gap-2">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={"px-3 py-2 rounded-lg text-xs text-center transition-colors " + (loc === locale ? "bg-gold/20 text-gold" : "text-cream/50 hover:bg-gold/10")}
            >
              {localeNames[loc]}
            </button>
          ))}
        </div>
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy border-t border-gold/20 px-4 pb-6 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-cream/70 hover:text-gold border-b border-gold/10"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <Link href="/valuate" className="text-cream/70 hover:text-gold">
              {t("valuate")}
            </Link>
            <Link href="/calculators" className="text-cream/70 hover:text-gold">
              {t("calculators")}
            </Link>
            <Link
              href="/list-property"
              className="bg-gold text-navy-dark font-bold py-3 px-6 rounded-lg text-center"
            >
              {t("listProperty")}
            </Link>
            <Link href="/login" className="text-cream/70 hover:text-gold">
              {t("login")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
