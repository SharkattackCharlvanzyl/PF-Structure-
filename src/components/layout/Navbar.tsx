"use client";
import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/buy", label: t("buy") },
    { href: "/rent", label: t("rent") },
    { href: "/business", label: t("business") },
    { href: "/auctions", label: t("auctions") },
    { href: "/pricing", label: t("pricing") },
    { href: "/how-it-works", label: t("howItWorks") },
  ];

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

        <div className="hidden lg:flex items-center gap-4">
          <Link href="/valuate" className="text-cream/70 hover:text-gold text-sm">
            {t("valuate")}
          </Link>
          <Link href="/calculators" className="text-cream/70 hover:text-gold text-sm">
            {t("calculators")}
          </Link>
          <Link
            href="/list-property"
            className="bg-gold text-cream-dark font-bold py-2 px-5 rounded-lg text-sm hover:bg-gold-dark transition-colors"
          >
            {t("listProperty")}
          </Link>
          <Link href="/login" className="text-cream/70 hover:text-gold text-sm">
            {t("login")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-gold"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <XMarkIcon className="w-7 h-7" />
          ) : (
            <Bars3Icon className="w-7 h-7" />
          )}
        </button>
      </div>

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
              className="bg-gold text-cream-dark font-bold py-3 px-6 rounded-lg text-center"
            >
              {t("listProperty")}
            </Link>
            <Link href="/login" className="text-cream/70 hover:text-gold">
              {t("login")}
            </Link>
            <Link href="/login" className="text-gold hover:text-gold-light">
              {t("signup")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
