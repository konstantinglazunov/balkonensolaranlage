import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const SUPPORTED_LANGS = ['de', 'en', 'ru'];

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams();
  const currentLang = SUPPORTED_LANGS.includes(lang) ? lang : 'de';

  const switchLanguage = (nextLang) => {
    if (nextLang === currentLang) return;

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const [, ...rest] = pathSegments;
    const nextPath = rest.length > 0 ? `/${nextLang}/${rest.join('/')}` : `/${nextLang}/`;
    navigate(nextPath);
  };

  return (
    <div className="flex items-center gap-2">
      {SUPPORTED_LANGS.map((lng) => (
        <button
          key={lng}
          onClick={() => switchLanguage(lng)}
          className={`px-2 py-1 text-xs tracking-wider border transition-colors ${
            currentLang === lng
              ? 'bg-[#8b6d4b] border-[#8b6d4b] text-white'
              : 'bg-transparent border-current text-inherit'
          }`}
          aria-label={`Switch to ${lng.toUpperCase()}`}
        >
          {t(`language.${lng}`)}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
