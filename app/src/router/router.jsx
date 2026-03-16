import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import i18n from '../i18n';
import App from '../App.tsx';
import ImpressumPage from '../pages/ImpressumPage.tsx';
import DatenschutzPage from '../pages/DatenschutzPage.tsx';
import SeoHreflang from '../components/SeoHreflang';
import { isSupportedLang } from '../constants/i18n';

const detectBrowserLang = () => {
  const browserLang = (navigator.language || '').toLowerCase();
  if (browserLang.startsWith('de')) return 'de';
  if (browserLang.startsWith('ru')) return 'ru';
  return 'en';
};

const RootRedirect = () => {
  const targetLang = detectBrowserLang();
  return <Navigate to={`/${targetLang}/`} replace />;
};

const LocalizedRoutes = () => {
  const { lang } = useParams();
  const location = useLocation();
  const currentLang = isSupportedLang(lang) ? lang : null;

  useEffect(() => {
    if (currentLang && i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
  }, [currentLang]);

  if (!currentLang) {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const rest = pathParts.slice(1).join('/');
    return <Navigate to={`/de/${rest}`.replace(/\/+$/, '/')} replace />;
  }

  return (
    <>
      <SeoHreflang />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/impressum" element={<ImpressumPage />} />
        <Route path="/datenschutz" element={<DatenschutzPage />} />
        <Route path="*" element={<App />} />
      </Routes>
    </>
  );
};

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<RootRedirect />} />
    <Route path="/:lang/*" element={<LocalizedRoutes />} />
    <Route path="*" element={<RootRedirect />} />
  </Routes>
);

export default AppRouter;
