"use client";
import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { countries, regions, type Country } from "@/lib/countries";
import { localeNames, type Locale } from "@/i18n/config";

const regionKeys: Record<string, string> = {
  All: "regionAll",
  Africa: "regionAfrica",
  "Middle East": "regionMiddleEast",
  Europe: "regionEurope",
  Asia: "regionAsia",
  Americas: "regionAmericas",
  Oceania: "regionOceania",
};

export default function CountrySelector() {
  const t = useTranslations("countrySelector");
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<string>("All");
  const [selected, setSelected] = useState<Country | null>(null);
  const [selectedLang, setSelectedLang] = useState<string>("");

  const filtered = useMemo(() => {
    let list = countries;
    if (region !== "All") list = list.filter((c) => c.region === region);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q));
    }
    return list;
  }, [region, search]);

  const handleSelect = (country: Country) => {
    setSelected(country);
    setSelectedLang(country.lang);
  };

  const handleConfirm = () => {
    if (!selected) return;
    localStorage.setItem("pf_country", selected.code);
    localStorage.setItem("pf_currency", selected.currency);
    localStorage.setItem("pf_language", selectedLang);
    // Navigate to the selected locale
    router.push(`/${selectedLang}`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="font-display text-3xl md:text-4xl text-gold font-bold text-center mb-3">
        {t("heading")}
      </h2>
      <p className="text-cream/60 text-center mb-8 max-w-2xl mx-auto">
        {t("subheading")}
      </p>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-navy-light border-2 border-gold/20 rounded-xl px-5 py-3 text-cream placeholder-cream/30 focus:border-gold/50 focus:outline-none transition-colors"
        />
      </div>

      {/* Region Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {regions.map((r) => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              region === r
                ? "bg-gold text-cream-dark"
                : "bg-navy-light text-cream/60 hover:text-gold border border-gold/10"
            }`}
          >
            {t(regionKeys[r])}
          </button>
        ))}
      </div>

      {/* Country Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
        {filtered.map((country) => (
          <button
            key={country.code}
            onClick={() => handleSelect(country)}
            className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
              selected?.code === country.code
                ? "border-gold bg-gold/10"
                : "border-gold/10 bg-navy-light hover:border-gold/30"
            }`}
          >
            <img
              src={`https://flagcdn.com/32x24/${country.code}.png`}
              alt={country.name}
              width={32}
              height={24}
              className="rounded-sm"
            />
            <span className="text-sm text-cream/80 truncate">{country.name}</span>
          </button>
        ))}
      </div>

      {/* Language Selection & Confirm */}
      {selected && (
        <div className="max-w-xl mx-auto bg-navy-light border-2 border-gold/20 rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src={`https://flagcdn.com/48x36/${selected.code}.png`}
              alt={selected.name}
              width={48}
              height={36}
              className="rounded"
            />
            <div>
              <p className="text-gold font-bold text-lg">{selected.name}</p>
              <p className="text-cream/50 text-sm">{selected.currency}</p>
            </div>
          </div>

          <p className="text-cream/60 text-sm mb-3">{t("chooseLanguage")}</p>
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {Object.entries(localeNames).map(([code, name]) => (
              <button
                key={code}
                onClick={() => setSelectedLang(code)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  selectedLang === code
                    ? "bg-gold text-cream-dark font-bold"
                    : "bg-navy border border-gold/20 text-cream/60 hover:text-gold"
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          <button
            onClick={handleConfirm}
            className="btn-gold w-full text-lg"
          >
            {t("confirmButton")}
          </button>
          <p className="text-cream/40 text-xs mt-3">{t("savedMessage")}</p>
        </div>
      )}
    </div>
  );
}
