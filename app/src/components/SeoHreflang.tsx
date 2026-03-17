import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LANGS = ['de', 'en', 'ru'];

const SeoHreflang = () => {
  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const lang = pathParts[0];
    const tail = pathParts.slice(1).join('/');
    const normalizedTail = tail ? `${tail.replace(/^\/+|\/+$/g, '')}/` : '';
    const suffix = `/${normalizedTail}`;
    const origin = window.location.origin;

    document.querySelectorAll('link[data-seo-managed="true"]').forEach((node) => node.remove());

    const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', `${origin}${location.pathname}`.replace(/\/+$/, '/'));
    canonical.setAttribute('data-seo-managed', 'true');
    document.head.appendChild(canonical);

    LANGS.forEach((lng) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lng);
      link.setAttribute('href', `${origin}/${lng}${suffix}`.replace(/\/+$/, '/'));
      link.setAttribute('data-seo-managed', 'true');
      document.head.appendChild(link);
    });

    const xDefault = document.createElement('link');
    xDefault.setAttribute('rel', 'alternate');
    xDefault.setAttribute('hreflang', 'x-default');
    xDefault.setAttribute('href', `${origin}/de${suffix}`.replace(/\/+$/, '/'));
    xDefault.setAttribute('data-seo-managed', 'true');
    document.head.appendChild(xDefault);

    if (LANGS.includes(lang)) {
      document.documentElement.lang = lang;
    }
  }, [location.pathname]);

  return null;
};

export default SeoHreflang;
