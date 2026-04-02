import { useEffect } from "react";

const BASE_URL = "https://инфо-безопасность.рф";
const DEFAULT_TITLE = "инфо-безопасность.рф — Защита сетевой инфраструктуры";
const DEFAULT_DESC = "Профессиональная защита сетевой инфраструктуры: личная цифровая безопасность, защита бизнеса, шифрование трафика, Zero Trust, VPN. Тарифы от 555 ₽/мес.";
const DEFAULT_IMG = "https://cdn.poehali.dev/projects/233dcfd3-64d0-41d4-9ea3-846a99343f89/files/e18f9db9-344b-453f-9892-100652af633c.jpg";

interface MetaOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string;
}

function setTag(selector: string, attr: string, content: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    const [key, val] = selector.replace("meta[", "").replace("]", "").split("=");
    el.setAttribute(key, val.replace(/"/g, ""));
    document.head.appendChild(el);
  }
  el.setAttribute(attr, content);
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useMeta({ title, description, path, keywords }: MetaOptions) {
  useEffect(() => {
    const fullTitle = `${title} — инфо-безопасность.рф`;
    const url = `${BASE_URL}${path}`;

    document.title = fullTitle;
    setTag('meta[name="description"]', "content", description);
    setTag('meta[property="og:title"]', "content", fullTitle);
    setTag('meta[property="og:description"]', "content", description);
    setTag('meta[property="og:url"]', "content", url);
    setTag('meta[property="og:image"]', "content", DEFAULT_IMG);
    setTag('meta[property="og:type"]', "content", "website");
    setTag('meta[name="twitter:title"]', "content", fullTitle);
    setTag('meta[name="twitter:description"]', "content", description);
    if (keywords) setTag('meta[name="keywords"]', "content", keywords);
    setCanonical(url);

    return () => {
      document.title = DEFAULT_TITLE;
      setTag('meta[name="description"]', "content", DEFAULT_DESC);
      setTag('meta[property="og:title"]', "content", DEFAULT_TITLE);
      setTag('meta[property="og:description"]', "content", DEFAULT_DESC);
      setTag('meta[property="og:url"]', "content", BASE_URL + "/");
      setCanonical(BASE_URL + "/");
    };
  }, [title, description, path, keywords]);
}
