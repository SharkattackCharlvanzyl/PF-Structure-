export const locales = [
  "en", "fr", "es", "de", "pt", "ar", "zh", "ko", "ja",
  "nl", "it", "ru", "hi", "tr", "sv",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales: Locale[] = ["ar"];

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  pt: "Português",
  ar: "العربية",
  zh: "中文",
  ko: "한국어",
  ja: "日本語",
  nl: "Nederlands",
  it: "Italiano",
  ru: "Русский",
  hi: "हिन्दी",
  tr: "Türkçe",
  sv: "Svenska",
};
