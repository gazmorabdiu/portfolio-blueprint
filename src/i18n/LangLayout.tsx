import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import i18n, { isLang } from "@/i18n";
import NotFound from "@/pages/NotFound";

const setMeta = (selector: string, attr: string, value: string) =>
  document.head.querySelector(selector)?.setAttribute(attr, value);

/** Syncs i18n, <html lang> and the SEO tags with the :lang URL segment. */
const LangLayout = () => {
  const { lang } = useParams();
  const valid = isLang(lang);

  useEffect(() => {
    if (!valid) return;
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    const title = i18n.t("title", { ns: "seo", lng: lang });
    const description = i18n.t("description", { ns: "seo", lng: lang });
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
  }, [lang, valid]);

  if (!valid) return <NotFound />;
  return <Outlet />;
};

export default LangLayout;
