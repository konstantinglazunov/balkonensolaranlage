import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LANGS = ['de', 'en', 'ru'];

const SeoHreflang = () => {
  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const lang = pathParts[0];
    const tail = pathParts.slice(1).join('/');
    const suffix = tail ? `/${tail}` : '/';
    const origin = window.location.origin;

    document.querySelectorAll('link[data-hreflang-managed="true"]').forEach((node) => node.remove());

    LANGS.forEach((lng) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lng);
      link.setAttribute('href', `${origin}/${lng}${suffix}`.replace(/\/+$/, '/'));
      link.setAttribute('data-hreflang-managed', 'true');
      document.head.appendChild(link);
    });

    if (LANGS.includes(lang)) {
      document.documentElement.lang = lang;
    }
  }, [location.pathname]);

  return null;
};

export default SeoHreflang;
