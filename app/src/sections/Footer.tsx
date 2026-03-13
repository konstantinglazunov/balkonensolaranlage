import { Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getFooterConfig } from '../config';

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Instagram,
  Facebook,
  Twitter,
};

const Footer = () => {
  const { t } = useTranslation();
  const { lang = 'de' } = useParams();
  const footerConfig = getFooterConfig(t, lang);

  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [newsletterConsent, setNewsletterConsent] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && newsletterConsent) {
      setIsSubscribed(true);
      setEmail('');
      setNewsletterConsent(false);
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white py-16 md:py-24">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl mb-6">{footerConfig.brandName}</h3>
            <p className="text-[#696969] font-light text-sm leading-relaxed mb-6">
              {footerConfig.brandDescription}
            </p>
            <div className="flex items-center gap-4">
              {footerConfig.socialLinks.map((social) => {
                const IconComponent = iconMap[social.icon];
                if (!IconComponent) return null;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-[#696969] hover:text-[#8b6d4b] transition-all duration-300 hover:scale-90"
                    aria-label={social.label}
                  >
                    <IconComponent size={20} strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Groups */}
          {footerConfig.linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-sans text-sm font-medium uppercase tracking-wider mb-6">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }
                      }}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'nofollow noopener noreferrer' : undefined}
                      className="text-[#696969] text-base font-light link-hover inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          {footerConfig.newsletterHeading && (
            <div className="lg:col-span-1">
              <h4 className="font-sans text-sm font-medium uppercase tracking-wider mb-6">{footerConfig.newsletterHeading}</h4>
              <p className="text-[#696969] text-sm font-light mb-4">
                {footerConfig.newsletterDescription}
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder={footerConfig.newsletterPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[#8b6d4b] transition-colors"
                  />
                </div>
                <label className="flex items-start gap-2 text-xs text-[#696969] leading-relaxed">
                  <input
                    type="checkbox"
                    checked={newsletterConsent}
                    onChange={(e) => setNewsletterConsent(e.target.checked)}
                    required
                    className="mt-0.5 h-4 w-4 accent-[#8b6d4b]"
                  />
                  <span>
                    {footerConfig.newsletterConsentText}{' '}
                    <a href={`/${lang}/datenschutz`} className="underline hover:text-black">
                      {t('common.privacyPolicy')}
                    </a>
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={!newsletterConsent}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#8b6d4b] text-white text-sm font-light tracking-wider btn-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubscribed ? (
                    <span>{footerConfig.newsletterSuccessText}</span>
                  ) : (
                    <>
                      <span>{footerConfig.newsletterButtonText}</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#333] text-xs uppercase tracking-wider font-medium">
              {footerConfig.copyrightText}
            </p>
            <div className="flex items-center gap-6">
              {footerConfig.legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#696969] text-xs hover:text-black transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
