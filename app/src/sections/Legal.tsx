import { useTranslation } from 'react-i18next';
import { getLegalConfig } from '../config';

const obfuscateEmail = (email: string): string => {
  const [localPart, domainPart] = email.split('@');
  if (!localPart || !domainPart) {
    return email;
  }

  const [domainName, ...tldParts] = domainPart.split('.');
  if (!domainName || tldParts.length === 0) {
    return `${localPart} [at] ${domainPart}`;
  }

  return `${localPart} [at] ${domainName} [dot] ${tldParts.join(' [dot] ')}`;
};

export const ImpressumContent = () => {
  const { t } = useTranslation();
  const legalConfig = getLegalConfig(t);
  const obfuscatedEmail = obfuscateEmail(legalConfig.email);

  return (
    <article id="impressum" className="scroll-mt-24">
      <h1 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-6">{t('legal.impressumTitle')}</h1>
      <p className="text-sm text-[#696969] mb-6">{t('legal.impressumSubtitle')}</p>

      <div className="space-y-3 text-[#333] leading-relaxed">
        <p><strong>{t('legal.fields.company')}</strong> {legalConfig.companyName}</p>
        <p><strong>{t('legal.fields.address')}</strong> {legalConfig.address}</p>
        <p>
          <strong>{t('legal.fields.contact')}</strong> {t('contact.phoneLabel')} {legalConfig.phone}, {t('contact.emailLabel')}{' '}
          <span className="select-all">{obfuscatedEmail}</span>
        </p>
      </div>
    </article>
  );
};

export const DatenschutzContent = () => {
  const { t } = useTranslation();
  const legalConfig = getLegalConfig(t);
  const obfuscatedPrivacyEmail = obfuscateEmail(legalConfig.privacyEmail);

  return (
    <article id="datenschutz" className="scroll-mt-24">
      <h1 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-6">{t('legal.privacyTitle')}</h1>

      <div className="space-y-5 text-[#333] leading-relaxed">
        <p>{t('legal.privacy.p1')}</p>
        <p>{t('legal.privacy.p2')}</p>
        <p>{t('legal.privacy.p3')}</p>
        <p>{t('legal.privacy.p4')}</p>
        <p>
          {t('legal.privacy.p5prefix')}{' '}
          <span className="select-all">{obfuscatedPrivacyEmail}</span>
          .
        </p>
        <p className="text-sm text-[#696969]">{t('legal.privacy.note')}</p>
      </div>
    </article>
  );
};

const Legal = () => {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="max-w-[1100px] mx-auto px-6 space-y-16">
        <ImpressumContent />
        <div className="border-t border-gray-200 pt-12">
          <DatenschutzContent />
        </div>
      </div>
    </section>
  );
};

export default Legal;
