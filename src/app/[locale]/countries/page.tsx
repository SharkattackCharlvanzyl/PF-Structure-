import { useTranslations } from "next-intl";

const countries = [
  { key: "southAfrica", flag: "🇿🇦" },
  { key: "namibia", flag: "🇳🇦" },
  { key: "botswana", flag: "🇧🇼" },
  { key: "zimbabwe", flag: "🇿🇼" },
  { key: "mozambique", flag: "🇲🇿" },
  { key: "zambia", flag: "🇿🇲" },
  { key: "mauritius", flag: "🇲🇺" },
  { key: "kenya", flag: "🇰🇪" },
  { key: "tanzania", flag: "🇹🇿" },
  { key: "nigeria", flag: "🇳🇬" },
  { key: "ghana", flag: "🇬🇭" },
  { key: "portugal", flag: "🇵🇹" },
];

export default function CountriesPage() {
  const t = useTranslations("countries");

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <h1 className="font-display text-4xl md:text-5xl text-gold font-bold text-center mb-4">
        {t("title")}
      </h1>
      <p className="text-cream/60 text-center mb-12 text-lg">{t("subtitle")}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {countries.map((country) => (
          <div
            key={country.key}
            className="pf-card text-center hover:border-gold/40 transition-all duration-300 cursor-pointer group"
          >
            <div className="text-5xl mb-3">{country.flag}</div>
            <h3 className="text-cream group-hover:text-gold font-semibold text-sm transition-colors">
              {t(`list.${country.key}`)}
            </h3>
          </div>
        ))}
      </div>

      {/* Coming Soon */}
      <div className="mt-12 text-center">
        <p className="text-cream/40 text-sm">{t("comingSoon")}</p>
      </div>
    </div>
  );
}
