import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS, LANG_LABELS, type Lang } from "@/i18n";

const LanguageSwitcher = ({ className = "" }: { className?: string }) => {
  const { i18n, t } = useTranslation("common");
  const { search, hash } = useLocation();
  const current = i18n.language as Lang;

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={`flex items-center font-mono text-sm border border-border rounded-md overflow-hidden ${className}`}
    >
      {SUPPORTED_LANGS.map((lang) => (
        <Link
          key={lang}
          to={{ pathname: `/${lang}`, search, hash }}
          hrefLang={lang}
          lang={lang}
          title={LANG_LABELS[lang]}
          aria-current={lang === current ? "true" : undefined}
          className={`px-3 py-1.5 uppercase transition-colors ${
            lang === current
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          {lang}
        </Link>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
