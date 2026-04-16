import { useTranslations } from "next-intl";
import CountrySelector from "@/components/ui/CountrySelector";

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-12">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-gold mb-4">
          {t("hero.title")}
        </h1>
        <p className="font-display text-2xl md:text-3xl text-cream/80 mb-6">
          {t("hero.subtitle")}
        </p>
        <p className="text-lg text-cream/60 max-w-2xl mb-8">
          {t("hero.description", { count: "185" })}
        </p>
        <p className="text-gold/70 animate-bounce mt-4">
          ↓ {t("hero.scrollCue")}
        </p>
      </section>

      {/* Country Selector */}
      <section id="country-selector" className="py-16 px-4">
        <CountrySelector />
      </section>
    </>
  );
}
