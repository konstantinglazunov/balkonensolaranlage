import Footer from '../sections/Footer';
import { DatenschutzContent } from '../sections/Legal';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const DatenschutzPage = () => {
  const { t } = useTranslation();
  const { lang = 'de' } = useParams();

  return (
    <div className="min-h-screen bg-white">
      <main>
        <section className="bg-white py-20 md:py-24">
          <div className="max-w-[1100px] mx-auto px-6">
            <a href={`/${lang}/`} className="inline-block mb-10 text-sm text-[#696969] underline hover:text-black">
              {t('common.backToHome')}
            </a>
            <DatenschutzContent />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DatenschutzPage;
