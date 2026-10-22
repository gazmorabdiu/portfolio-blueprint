import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const SUPPORTED_LANGS = ["en", "sq"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

export const LANG_LABELS: Record<Lang, string> = {
  en: "English",
  sq: "Shqip",
};

export const isLang = (value: string | undefined): value is Lang =>
  !!value && (SUPPORTED_LANGS as readonly string[]).includes(value);

// Every component owns a JSON file per language: locales/<lang>/<namespace>.json
const files = import.meta.glob("./locales/*/*.json", {
  eager: true,
  import: "default",
}) as Record<string, Record<string, unknown>>;

const resources: Record<string, Record<string, Record<string, unknown>>> = {};
for (const [path, content] of Object.entries(files)) {
  const [, lang, file] = path.match(/\.\/locales\/([^/]+)\/([^/]+)\.json$/)!;
  (resources[lang] ??= {})[file] = content;
}

/** Picks the first supported language from the browser preferences. */
export const detectLang = (): Lang => {
  const preferred = typeof navigator !== "undefined" ? navigator.languages ?? [navigator.language] : [];
  for (const tag of preferred) {
    const base = tag.toLowerCase().split("-")[0];
    if (isLang(base)) return base;
  }
  return DEFAULT_LANG;
};

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANG,
  fallbackLng: DEFAULT_LANG,
  defaultNS: "common",
  ns: Object.keys(resources[DEFAULT_LANG]),
  interpolation: { escapeValue: false },
  returnObjects: true,
});

export default i18n;
