import fs from "fs";
import path from "path";
import type { Plugin } from "vite";

const SITE_URL = "https://gazmorabdiu.github.io";
const LANGS = ["en", "sq"] as const;
const DEFAULT_LANG = "en";

type Seo = { title: string; description: string; locale: string };

const readSeo = (lang: string): Seo =>
  JSON.parse(
    fs.readFileSync(path.resolve(__dirname, `src/i18n/locales/${lang}/seo.json`), "utf-8")
  );

const escapeAttr = (value: string) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

const setMeta = (html: string, pattern: RegExp, replacement: string) => {
  if (!pattern.test(html)) throw new Error(`seoPages: tag not found in index.html: ${pattern}`);
  return html.replace(pattern, replacement);
};

/**
 * After the build, emits one real HTML file per language (dist/en/index.html,
 * dist/sq/index.html) with localized <title>/description, canonical, hreflang and
 * Open Graph tags, so crawlers see the right language without running JS.
 * Also emits dist/404.html (GitHub Pages SPA fallback), sitemap.xml and
 * overwrites dist/index.html with hreflang tags for the "/" entry point.
 */
export function seoPages(): Plugin {
  let outDir = "dist";
  return {
    name: "seo-pages",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      const indexPath = path.join(outDir, "index.html");
      const template = fs.readFileSync(indexPath, "utf-8");

      const alternates = [
        ...LANGS.map(
          (l) => `<link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}/" />`
        ),
        `<link rel="alternate" hreflang="x-default" href="${SITE_URL}/${DEFAULT_LANG}/" />`,
      ].join("\n    ");

      const render = (lang: string) => {
        const seo = readSeo(lang);
        const title = escapeAttr(seo.title);
        const description = escapeAttr(seo.description);
        const url = `${SITE_URL}/${lang}/`;
        let html = template;
        html = setMeta(html, /<html lang="[^"]*"/, `<html lang="${lang}"`);
        html = setMeta(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`);
        html = setMeta(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${description}" />`);
        html = setMeta(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}" />`);
        html = setMeta(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${description}" />`);
        const extra = [
          `<link rel="canonical" href="${url}" />`,
          alternates,
          `<meta property="og:url" content="${url}" />`,
          `<meta property="og:locale" content="${seo.locale}" />`,
          ...LANGS.filter((l) => l !== lang).map(
            (l) => `<meta property="og:locale:alternate" content="${readSeo(l).locale}" />`
          ),
        ].join("\n    ");
        return html.replace("</head>", `    ${extra}\n  </head>`);
      };

      for (const lang of LANGS) {
        const dir = path.join(outDir, lang);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, "index.html"), render(lang));
      }

      // "/" redirects client-side to the visitor's language; crawlers get the default.
      fs.writeFileSync(indexPath, render(DEFAULT_LANG));
      // GitHub Pages serves 404.html for unknown paths, letting the SPA router handle them.
      fs.writeFileSync(path.join(outDir, "404.html"), template);

      const urls = LANGS.map(
        (l) =>
          `  <url>\n    <loc>${SITE_URL}/${l}/</loc>\n${LANGS.map(
            (a) => `    <xhtml:link rel="alternate" hreflang="${a}" href="${SITE_URL}/${a}/"/>`
          ).join("\n")}\n  </url>`
      ).join("\n");
      fs.writeFileSync(
        path.join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`
      );
    },
  };
}
