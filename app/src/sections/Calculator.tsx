import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Calculator as CalculatorIcon, Euro, Sun, Battery, TrendingDown } from 'lucide-react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface CalculationResult {
  annualProduction: number;
  annualSavings: number;
  selfConsumptionRate: number;
  paybackYears: number;
  co2Reduction: number;
}

const Calculator = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Input states
  const [location, setLocation] = useState('berlin');
  const [orientation, setOrientation] = useState('south');
  const [panelCount, setPanelCount] = useState(2);
  const [batteryCapacity, setBatteryCapacity] = useState(2);
  const [monthlyConsumption, setMonthlyConsumption] = useState(300);
  const [electricityPrice, setElectricityPrice] = useState(0.40);
  const [hasDynamicTariff, setHasDynamicTariff] = useState(false);
  
  // Results
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);

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

  const calculateResults = useCallback(() => {
    // Location factors (solar irradiance)
    const locationFactors: Record<string, number> = {
      berlin: 950,
      munich: 1100,
      hamburg: 900,
      cologne: 980,
      frankfurt: 1050,
      stuttgart: 1020,
    };
    
    // Orientation factors
    const orientationFactors: Record<string, number> = {
      south: 1.0,
      southeast: 0.95,
      southwest: 0.95,
      east: 0.85,
      west: 0.85,
    };
    
    const baseIrradiance = locationFactors[location] || 950;
    const orientationFactor = orientationFactors[orientation] || 1.0;
    const panelPower = 400; // Watts per panel
    
    // Annual production calculation
    const annualProduction = Math.round(
      panelCount * panelPower * baseIrradiance * orientationFactor * 0.85 / 1000
    ); // in kWh
    
    // Self-consumption rate based on battery
    const baseSelfConsumption = 0.35;
    const batteryBoost = batteryCapacity * 0.08;
    const selfConsumptionRate = Math.min(baseSelfConsumption + batteryBoost, 0.85);
    
    // Dynamic tariff bonus
    const tariffBonus = hasDynamicTariff ? 0.15 : 0;
    const effectiveSelfConsumption = Math.min(selfConsumptionRate + tariffBonus, 0.95);
    
    // Annual savings
    const annualSavings = Math.round(
      annualProduction * effectiveSelfConsumption * electricityPrice
    );
    
    // System cost estimation
    const panelCost = panelCount * 350;
    const batteryCost = batteryCapacity * 400;
    const installationCost = 500;
    const totalCost = panelCost + batteryCost + installationCost;
    
    // Payback period
    const paybackYears = annualSavings > 0 ? (totalCost / annualSavings).toFixed(1) : '0';
    
    // CO2 reduction (approx 400g CO2 per kWh grid electricity)
    const co2Reduction = Math.round(annualProduction * effectiveSelfConsumption * 0.4);
    
    setResults({
      annualProduction,
      annualSavings,
      selfConsumptionRate: Math.round(effectiveSelfConsumption * 100),
      paybackYears: parseFloat(paybackYears),
      co2Reduction,
    });
    
    // Generate chart data (20 years projection)
    const data = [];
    let cumulativeSavings = 0;
    const systemCost = totalCost;
    
    for (let year = 0; year <= 20; year++) {
      cumulativeSavings += annualSavings;
      data.push({
        year,
        savings: cumulativeSavings,
        cost: systemCost,
        net: cumulativeSavings - systemCost,
      });
    }
    setChartData(data);
  }, [location, orientation, panelCount, batteryCapacity, monthlyConsumption, electricityPrice, hasDynamicTariff]);

  useEffect(() => {
    calculateResults();
  }, [calculateResults]);

  return (
    <section
      id="calculator"
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-[150px] bg-[#0a0a0a]"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block mb-4 text-sm tracking-[0.3em] font-light uppercase text-[#4f8eff]">
            {t('calculator.tag')}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            {t('calculator.heading')}
          </h2>
          <p className="text-[#999] text-lg max-w-2xl mx-auto">
            {t('calculator.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Panel */}
          <div className={`bg-[#141414] rounded-2xl p-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h3 className="text-white text-xl mb-6 flex items-center gap-3">
              <CalculatorIcon className="text-[#4f8eff]" size={24} />
              {t('calculator.yourData')}
            </h3>
            
            <div className="space-y-6">
              {/* Location */}
              <div>
                <label className="text-[#999] text-sm mb-2 block">{t('calculator.locationLabel')}</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#4f8eff] focus:outline-none transition-colors"
                >
                  <option value="berlin">{t('calculator.locations.berlin')}</option>
                  <option value="munich">{t('calculator.locations.munich')}</option>
                  <option value="hamburg">{t('calculator.locations.hamburg')}</option>
                  <option value="cologne">{t('calculator.locations.cologne')}</option>
                  <option value="frankfurt">{t('calculator.locations.frankfurt')}</option>
                  <option value="stuttgart">{t('calculator.locations.stuttgart')}</option>
                </select>
              </div>
              
              {/* Orientation */}
              <div>
                <label className="text-[#999] text-sm mb-2 block">{t('calculator.orientationLabel')}</label>
                <select
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-white focus:border-[#4f8eff] focus:outline-none transition-colors"
                >
                  <option value="south">{t('calculator.orientations.south')}</option>
                  <option value="southeast">{t('calculator.orientations.southeast')}</option>
                  <option value="southwest">{t('calculator.orientations.southwest')}</option>
                  <option value="east">{t('calculator.orientations.east')}</option>
                  <option value="west">{t('calculator.orientations.west')}</option>
                </select>
              </div>
              
              {/* Panel Count */}
              <div>
                <label className="text-[#999] text-sm mb-2 block flex justify-between">
                  <span>{t('calculator.panelCountLabel')}</span>
                  <span className="text-[#4f8eff]">{panelCount}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={4}
                  value={panelCount}
                  onChange={(e) => setPanelCount(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer accent-[#4f8eff]"
                />
                <div className="flex justify-between text-xs text-[#666] mt-1">
                  <span>{t('calculator.panelMin')}</span>
                  <span>{t('calculator.panelMax')}</span>
                </div>
              </div>
              
              {/* Battery Capacity */}
              <div>
                <label className="text-[#999] text-sm mb-2 block flex justify-between">
                  <span>{t('calculator.batteryCapacityLabel')}</span>
                  <span className="text-[#00d084]">{batteryCapacity} kWh</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={0.5}
                  value={batteryCapacity}
                  onChange={(e) => setBatteryCapacity(parseFloat(e.target.value))}
                  className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer accent-[#00d084]"
                />
                <div className="flex justify-between text-xs text-[#666] mt-1">
                  <span>{t('calculator.batteryMin')}</span>
                  <span>{t('calculator.batteryMax')}</span>
                </div>
              </div>
              
              {/* Monthly Consumption */}
              <div>
                <label className="text-[#999] text-sm mb-2 block flex justify-between">
                  <span>{t('calculator.monthlyConsumptionLabel')}</span>
                  <span className="text-[#ffb800]">{monthlyConsumption} kWh</span>
                </label>
                <input
                  type="range"
                  min={100}
                  max={600}
                  step={50}
                  value={monthlyConsumption}
                  onChange={(e) => setMonthlyConsumption(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer accent-[#ffb800]"
                />
              </div>
              
              {/* Electricity Price */}
              <div>
                <label className="text-[#999] text-sm mb-2 block flex justify-between">
                  <span>{t('calculator.electricityPriceLabel')}</span>
                  <span className="text-white">{electricityPrice.toFixed(2)} €</span>
                </label>
                <input
                  type="range"
                  min={0.25}
                  max={0.60}
                  step={0.05}
                  value={electricityPrice}
                  onChange={(e) => setElectricityPrice(parseFloat(e.target.value))}
                  className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer accent-white"
                />
              </div>
              
              {/* Dynamic Tariff */}
              <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg">
                <div>
                  <span className="text-white block">{t('calculator.dynamicTariffTitle')}</span>
                  <span className="text-[#666] text-sm">{t('calculator.dynamicTariffSubtitle')}</span>
                </div>
                <button
                  onClick={() => setHasDynamicTariff(!hasDynamicTariff)}
                  className={`w-14 h-7 rounded-full transition-colors relative ${hasDynamicTariff ? 'bg-[#4f8eff]' : 'bg-[#333]'}`}
                >
                  <span className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${hasDynamicTariff ? 'left-8' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Results Panel */}
          <div className={`space-y-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#141414] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="text-[#ffb800]" size={20} />
                  <span className="text-[#999] text-sm">{t('calculator.metrics.annualProduction')}</span>
                </div>
                <div className="text-3xl font-bold text-white">
                  {results?.annualProduction || 0} <span className="text-lg font-normal text-[#999]">kWh</span>
                </div>
              </div>
              
              <div className="bg-[#141414] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Euro className="text-[#00d084]" size={20} />
                  <span className="text-[#999] text-sm">{t('calculator.metrics.annualSavings')}</span>
                </div>
                <div className="text-3xl font-bold text-white">
                  {results?.annualSavings || 0} <span className="text-lg font-normal text-[#999]">€</span>
                </div>
              </div>
              
              <div className="bg-[#141414] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Battery className="text-[#4f8eff]" size={20} />
                  <span className="text-[#999] text-sm">{t('calculator.metrics.selfConsumption')}</span>
                </div>
                <div className="text-3xl font-bold text-white">
                  {results?.selfConsumptionRate || 0} <span className="text-lg font-normal text-[#999]">%</span>
                </div>
              </div>
              
              <div className="bg-[#141414] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="text-[#ff6b6b]" size={20} />
                  <span className="text-[#999] text-sm">{t('calculator.metrics.payback')}</span>
                </div>
                <div className="text-3xl font-bold text-white">
                  {results?.paybackYears || 0} <span className="text-lg font-normal text-[#999]">{t('calculator.metrics.years')}</span>
                </div>
              </div>
            </div>
            
            {/* Chart */}
            <div className="bg-[#141414] rounded-xl p-6">
              <h4 className="text-white mb-4">{t('calculator.chartTitle')}</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00d084" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00d084" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="year" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} tickFormatter={(value) => `€${value}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                      formatter={(value: number) => [`€${value.toLocaleString()}`, '']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="savings" 
                      stroke="#00d084" 
                      fillOpacity={1} 
                      fill="url(#colorSavings)" 
                      name={t('calculator.chartLegend.savings')}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cost" 
                      stroke="#ff6b6b" 
                      strokeDasharray="5 5" 
                      name={t('calculator.chartLegend.systemCost')}
                      dot={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block w-full bg-[#4f8eff] hover:bg-[#3a7aee] text-white text-center py-4 rounded-xl font-medium transition-colors"
            >
              {t('calculator.cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
