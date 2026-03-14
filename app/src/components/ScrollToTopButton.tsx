import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronUp } from 'lucide-react';

const ScrollToTopButton = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 450);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t('common.backToTop')}
      title={t('common.backToTop')}
      className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#8b6d4b] text-white shadow-[0_8px_22px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-[#7b5f43] focus:outline-none focus:ring-2 focus:ring-[#8b6d4b]/60 ${
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      <ChevronUp size={20} strokeWidth={2} />
    </button>
  );
};

export default ScrollToTopButton;
