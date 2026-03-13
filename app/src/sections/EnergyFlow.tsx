import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const EnergyFlow = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scenarios = [
    {
      title: t('energyFlow.scenarios.day.title'),
      description: t('energyFlow.scenarios.day.description'),
      image: '/images/solar_tag.jpg',
      imageAlt: t('energyFlow.scenarios.day.imageAlt'),
    },
    {
      title: t('energyFlow.scenarios.night.title'),
      description: t('energyFlow.scenarios.night.description'),
      image: '/images/akku_nachts.jpg',
      imageAlt: t('energyFlow.scenarios.night.imageAlt'),
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-[150px] bg-[#f5f5f5]"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block mb-4 text-sm tracking-[0.3em] font-light uppercase text-[#4f8eff]">
            {t('energyFlow.tag')}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] mb-6">
            {t('energyFlow.heading')}
          </h2>
          <p className="text-[#666] text-lg max-w-2xl mx-auto">
            {t('energyFlow.description')}
          </p>
        </div>

        {/* Day/Night Images */}
        <div className={`relative transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scenarios.map((scenario) => (
              <div key={scenario.title} className="bg-white rounded-3xl p-4 md:p-6 shadow-xl">
                <img
                  src={scenario.image}
                  alt={scenario.imageAlt}
                  className="w-full h-auto rounded-2xl object-cover"
                />
                <div className="pt-4">
                  <h3 className="text-xl font-semibold text-[#1a1a1a]">{scenario.title}</h3>
                  <p className="text-[#666] mt-2">{scenario.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* App Screenshots */}
        <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <img 
              src="/images/photo_2026-03-06_14-25-32.jpg" 
              alt={t('energyFlow.cards.monitoringTitle')} 
              className="w-full h-64 object-cover object-top"
            />
            <div className="p-4">
              <h4 className="font-medium text-[#1a1a1a]">{t('energyFlow.cards.monitoringTitle')}</h4>
              <p className="text-sm text-[#666] mt-1">{t('energyFlow.cards.monitoringDescription')}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <img 
              src="/images/photo_2026-03-06_15-36-24.jpg" 
              alt={t('energyFlow.cards.batteryTitle')} 
              className="w-full h-64 object-cover object-top"
            />
            <div className="p-4">
              <h4 className="font-medium text-[#1a1a1a]">{t('energyFlow.cards.batteryTitle')}</h4>
              <p className="text-sm text-[#666] mt-1">{t('energyFlow.cards.batteryDescription')}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <img 
              src="/images/photo_2026-03-06_14-25-32 (2).jpg" 
              alt={t('energyFlow.cards.reportsTitle')} 
              className="w-full h-64 object-cover object-top"
            />
            <div className="p-4">
              <h4 className="font-medium text-[#1a1a1a]">{t('energyFlow.cards.reportsTitle')}</h4>
              <p className="text-sm text-[#666] mt-1">{t('energyFlow.cards.reportsDescription')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnergyFlow;
