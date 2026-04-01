export interface Country {
  code: string;      // ISO 3166-1 alpha-2
  name: string;
  currency: string;
  lang: string;      // default language code
  region: string;    // Africa, Middle East, Europe, Asia, Americas, Oceania
}

export const countries: Country[] = [
  { code: "za", name: "South Africa", currency: "ZAR", lang: "en", region: "Africa" },
  { code: "ng", name: "Nigeria", currency: "NGN", lang: "en", region: "Africa" },
  { code: "ke", name: "Kenya", currency: "KES", lang: "en", region: "Africa" },
  { code: "eg", name: "Egypt", currency: "EGP", lang: "ar", region: "Africa" },
  { code: "gh", name: "Ghana", currency: "GHS", lang: "en", region: "Africa" },
  { code: "tz", name: "Tanzania", currency: "TZS", lang: "en", region: "Africa" },
  { code: "ma", name: "Morocco", currency: "MAD", lang: "ar", region: "Africa" },
  { code: "et", name: "Ethiopia", currency: "ETB", lang: "en", region: "Africa" },
  { code: "ae", name: "United Arab Emirates", currency: "AED", lang: "ar", region: "Middle East" },
  { code: "sa", name: "Saudi Arabia", currency: "SAR", lang: "ar", region: "Middle East" },
  { code: "qa", name: "Qatar", currency: "QAR", lang: "ar", region: "Middle East" },
  { code: "kw", name: "Kuwait", currency: "KWD", lang: "ar", region: "Middle East" },
  { code: "bh", name: "Bahrain", currency: "BHD", lang: "ar", region: "Middle East" },
  { code: "om", name: "Oman", currency: "OMR", lang: "ar", region: "Middle East" },
  { code: "il", name: "Israel", currency: "ILS", lang: "en", region: "Middle East" },
  { code: "gb", name: "United Kingdom", currency: "GBP", lang: "en", region: "Europe" },
  { code: "de", name: "Germany", currency: "EUR", lang: "de", region: "Europe" },
  { code: "fr", name: "France", currency: "EUR", lang: "fr", region: "Europe" },
  { code: "es", name: "Spain", currency: "EUR", lang: "es", region: "Europe" },
  { code: "it", name: "Italy", currency: "EUR", lang: "it", region: "Europe" },
  { code: "nl", name: "Netherlands", currency: "EUR", lang: "nl", region: "Europe" },
  { code: "pt", name: "Portugal", currency: "EUR", lang: "pt", region: "Europe" },
  { code: "se", name: "Sweden", currency: "SEK", lang: "sv", region: "Europe" },
  { code: "ch", name: "Switzerland", currency: "CHF", lang: "de", region: "Europe" },
  { code: "at", name: "Austria", currency: "EUR", lang: "de", region: "Europe" },
  { code: "be", name: "Belgium", currency: "EUR", lang: "nl", region: "Europe" },
  { code: "ie", name: "Ireland", currency: "EUR", lang: "en", region: "Europe" },
  { code: "pl", name: "Poland", currency: "PLN", lang: "en", region: "Europe" },
  { code: "ru", name: "Russia", currency: "RUB", lang: "ru", region: "Europe" },
  { code: "tr", name: "Turkey", currency: "TRY", lang: "tr", region: "Europe" },
  { code: "us", name: "United States", currency: "USD", lang: "en", region: "Americas" },
  { code: "ca", name: "Canada", currency: "CAD", lang: "en", region: "Americas" },
  { code: "mx", name: "Mexico", currency: "MXN", lang: "es", region: "Americas" },
  { code: "br", name: "Brazil", currency: "BRL", lang: "pt", region: "Americas" },
  { code: "ar", name: "Argentina", currency: "ARS", lang: "es", region: "Americas" },
  { code: "cl", name: "Chile", currency: "CLP", lang: "es", region: "Americas" },
  { code: "co", name: "Colombia", currency: "COP", lang: "es", region: "Americas" },
  { code: "cn", name: "China", currency: "CNY", lang: "zh", region: "Asia" },
  { code: "jp", name: "Japan", currency: "JPY", lang: "ja", region: "Asia" },
  { code: "kr", name: "South Korea", currency: "KRW", lang: "ko", region: "Asia" },
  { code: "in", name: "India", currency: "INR", lang: "hi", region: "Asia" },
  { code: "sg", name: "Singapore", currency: "SGD", lang: "en", region: "Asia" },
  { code: "th", name: "Thailand", currency: "THB", lang: "en", region: "Asia" },
  { code: "my", name: "Malaysia", currency: "MYR", lang: "en", region: "Asia" },
  { code: "id", name: "Indonesia", currency: "IDR", lang: "en", region: "Asia" },
  { code: "ph", name: "Philippines", currency: "PHP", lang: "en", region: "Asia" },
  { code: "vn", name: "Vietnam", currency: "VND", lang: "en", region: "Asia" },
  { code: "pk", name: "Pakistan", currency: "PKR", lang: "en", region: "Asia" },
  { code: "au", name: "Australia", currency: "AUD", lang: "en", region: "Oceania" },
  { code: "nz", name: "New Zealand", currency: "NZD", lang: "en", region: "Oceania" },
  { code: "fj", name: "Fiji", currency: "FJD", lang: "en", region: "Oceania" },
];

export const regions = ["All", "Africa", "Middle East", "Europe", "Asia", "Americas", "Oceania"] as const;
