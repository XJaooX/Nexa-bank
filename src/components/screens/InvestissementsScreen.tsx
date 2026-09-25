import React, { useState } from 'react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import {
  TrendingUp,
  PieChart,
  Coins,
  ShieldCheck,
  ArrowRight,
  Sliders,
} from 'lucide-react';

interface InvestissementsScreenProps {
  language: Language;
  isDarkTheme: boolean;
  onOpenContact: () => void;
}

export const InvestissementsScreen: React.FC<InvestissementsScreenProps> = ({
  language,
  isDarkTheme,
  onOpenContact,
}) => {
  const t = translations[language].investissements;

  type Strategy = 'conservative' | 'balanced' | 'growth';
  const [activeStrategy, setActiveStrategy] = useState<Strategy>('balanced');

  const strategyData = {
    conservative: {
      name: t.conservative,
      objective: 'Préservation Maximale du Pouvoir d’Achat',
      horizon: 'Pérénnité à Très Long Terme',
      allocations: [
        { label: 'Obligations Souveraines & Crédit Fiduciário', tier: 'Quote-part Fondamentale', widthPct: 45, color: '#C9A227' },
        { label: 'Or Physique en Coffre Sécurisé (Zurich)', tier: 'Réserve Stratégique', widthPct: 25, color: '#ECC246' },
        { label: 'Immobilier & Actifs Réels Tangibles', tier: 'Actifs d’Ancrage', widthPct: 20, color: '#755B00' },
        { label: 'Private Equity Primaire Décorrélé', tier: 'Opportunités Ciblées', widthPct: 10, color: '#A3A099' },
      ],
      commentary:
        language === 'pt'
          ? 'Prioridade máxima à preservação do capital real e imunização contra choques geopolíticos sistêmicos.'
          : language === 'en'
          ? 'Absolute priority on real capital preservation and systemic geopolitical hedging.'
          : "Priorité absolue à la préservation du pouvoir d'achat et à l'immunisation contre les chocs macroéconomiques.",
    },
    balanced: {
      name: t.balanced,
      objective: 'Équilibre entre Rendement Récurrent & Croissance',
      horizon: 'Gouvernance Intergénérationnelle',
      allocations: [
        { label: 'Private Equity & Club Deals Co-investis', tier: 'Part Prépondérante', widthPct: 35, color: '#C9A227' },
        { label: 'Mandat Discrétionnaire Décorrélé', tier: 'Part de Régulation', widthPct: 30, color: '#ECC246' },
        { label: 'Immobilier & Forêts Éco-gérées', tier: 'Patrimoine Tangible', widthPct: 20, color: '#755B00' },
        { label: 'Or Physique & Devises Souveraines', tier: 'Réserve de Prévoyance', widthPct: 15, color: '#A3A099' },
      ],
      commentary:
        language === 'pt'
          ? 'Combinação sinérgica entre fluxos previsíveis e valorização geracional em ativos descorrelacionados.'
          : language === 'en'
          ? 'Synergistic equilibrium between predictable cash flow and generational compounding in decorrelated assets.'
          : 'Équilibre sinusoïdal entre flux récurrents de trésorerie et appréciation à long terme des actifs de souveraineté.',
    },
    growth: {
      name: t.growth,
      objective: 'Expansion Capitalistique Sélective',
      horizon: 'Vision Décennale Dédiée',
      allocations: [
        { label: 'Direct Private Equity & M&A Européen', tier: 'Participation Directe Majeure', widthPct: 50, color: '#C9A227' },
        { label: 'Actifs d’Infrastructures & Énergie', tier: 'Investissement d’Avenir', widthPct: 25, color: '#ECC246' },
        { label: 'Mandat Spécialisé Opportunités', tier: 'Arbitrage Actif', widthPct: 15, color: '#755B00' },
        { label: 'Liquidités Tactiques & Métaux', tier: 'Flexibilité Immédiate', widthPct: 10, color: '#A3A099' },
      ],
      commentary:
        language === 'pt'
          ? 'Alocação focada em liderança de mercado, transições estruturais e criação direta de valor.'
          : language === 'en'
          ? 'Focused allocation driving strategic direct stakes, European market leaders, and long-horizon expansion.'
          : "Allocation résolument orientée vers l'expansion capitalistique et la participation directe dans les fleurons européens.",
    },
  };

  const current = strategyData[activeStrategy];

  return (
    <div
      className={`flex flex-col w-full transition-colors duration-200 animate-in fade-in ${
        isDarkTheme ? 'bg-[#0E0E0E] text-[#F8F6F1]' : 'bg-[#FBF9F4] text-[#1B1C19]'
      }`}
    >
      {/* Hero Banner */}
      <section className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-10 pb-16">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-[#C9A227]">
            <span className="w-8 h-[1px] bg-[#C9A227]"></span>
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">
              {t.kicker}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[52px] tracking-tight leading-[1.1] text-balance">
            {t.heroTitle}
          </h1>

          <p
            className={`text-[16px] lg:text-[18px] font-light leading-relaxed ${
              isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
            }`}
          >
            {t.heroDescription}
          </p>
        </div>
      </section>

      {/* Visual Showcase - Salons de Gestion Discrétionnaire */}
      <section className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pb-12 -mt-4">
        <div className="relative overflow-hidden border border-[#2B2A26] aspect-[21/9] sm:aspect-[24/9] shadow-2xl">
          <img
            src="/src/assets/images/investissements_hero_1790342733364.jpg"
            alt="Salons de Gestion d'Investissements et Ingénierie Financière - Nexa Banque Privée"
            className="w-full h-full object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-10">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#ECC246] font-semibold mb-2">
              Salons de Gestion Discrétionnaire • Genève & Paris
            </span>
            <p className="font-serif text-lg md:text-2xl text-[#F8F6F1] max-w-2xl font-light italic">
              « L'architecture ouverte et l'indépendance de conviction : le privilège d'investir avec une rigueur absolue. »
            </p>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars of Investment */}
      <section
        className={`w-full py-16 border-y ${
          isDarkTheme
            ? 'bg-[#131313] border-[#2B2A26]'
            : 'bg-[#F5F3EE] border-[#E4E2DD]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Chapter 1 */}
            <div
              className={`p-8 flex flex-col justify-between border ${
                isDarkTheme
                  ? 'bg-[#181818] border-[#2B2A26]'
                  : 'bg-white border-[#E4E2DD]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#C9A227] text-2xl font-serif">01</span>
                  <Sliders className="w-5 h-5 text-[#C9A227]" />
                </div>
                <h3 className="font-serif text-xl font-medium">
                  {t.discretionaryMandates}
                </h3>
                <p
                  className={`text-[14px] font-light leading-relaxed ${
                    isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                  }`}
                >
                  {t.discretionaryDesc}
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-[#C9A227]/20 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                <span className="text-[10px] uppercase tracking-wider font-semibold">
                  Architecture 100% Ouverte
                </span>
              </div>
            </div>

            {/* Chapter 2 */}
            <div
              className={`p-8 flex flex-col justify-between border ${
                isDarkTheme
                  ? 'bg-[#181818] border-[#2B2A26]'
                  : 'bg-white border-[#E4E2DD]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#C9A227] text-2xl font-serif">02</span>
                  <TrendingUp className="w-5 h-5 text-[#C9A227]" />
                </div>
                <h3 className="font-serif text-xl font-medium">
                  {t.privateEquity}
                </h3>
                <p
                  className={`text-[14px] font-light leading-relaxed ${
                    isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                  }`}
                >
                  {t.privateEquityDesc}
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-[#C9A227]/20 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                <span className="text-[10px] uppercase tracking-wider font-semibold">
                  Club Deals Co-investis
                </span>
              </div>
            </div>

            {/* Chapter 3 */}
            <div
              className={`p-8 flex flex-col justify-between border ${
                isDarkTheme
                  ? 'bg-[#181818] border-[#2B2A26]'
                  : 'bg-white border-[#E4E2DD]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#C9A227] text-2xl font-serif">03</span>
                  <Coins className="w-5 h-5 text-[#C9A227]" />
                </div>
                <h3 className="font-serif text-xl font-medium">
                  {t.realAssets}
                </h3>
                <p
                  className={`text-[14px] font-light leading-relaxed ${
                    isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                  }`}
                >
                  {t.realAssetsDesc}
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-[#C9A227]/20 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                <span className="text-[10px] uppercase tracking-wider font-semibold">
                  Coffres Sécurisés Zurich / Genève
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Asset Allocation Framework (No fake numbers) */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20">
        <div
          className={`p-8 lg:p-12 border ${
            isDarkTheme
              ? 'bg-[#141414] border-[#2B2A26]'
              : 'bg-[#F0EEE9] border-[#E4E2DD]'
          }`}
        >
          <div className="max-w-2xl mb-8 space-y-2">
            <span className="text-[11px] text-[#C9A227] uppercase tracking-[0.2em] font-semibold">
              Simulation Stratégique Conceptuelle (Maquette)
            </span>
            <h2 className="font-serif text-2xl md:text-3xl tracking-tight">
              {t.simulatorTitle}
            </h2>
            <p
              className={`text-[14px] font-light ${
                isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
              }`}
            >
              {t.simulatorSubtitle}
            </p>
          </div>

          {/* Strategy Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {(['conservative', 'balanced', 'growth'] as Strategy[]).map((st) => (
              <button
                key={st}
                onClick={() => setActiveStrategy(st)}
                className={`px-5 py-3 text-[11px] uppercase tracking-[0.14em] font-semibold transition-all cursor-pointer border ${
                  activeStrategy === st
                    ? 'bg-[#C9A227] text-black border-[#C9A227]'
                    : isDarkTheme
                    ? 'bg-[#1C1C1C] text-[#A3A099] border-[#2B2A26] hover:text-[#F8F6F1]'
                    : 'bg-white text-[#444748] border-[#E4E2DD] hover:text-[#010101]'
                }`}
              >
                {strategyData[st].name}
              </button>
            ))}
          </div>

          {/* Allocation Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Metrics */}
            <div className="lg:col-span-4 space-y-6">
              <div
                className={`p-6 border space-y-3 ${
                  isDarkTheme
                    ? 'bg-[#181818] border-[#2B2A26]'
                    : 'bg-white border-[#E4E2DD]'
                }`}
              >
                <span className="text-[10px] uppercase tracking-wider block opacity-70">
                  Objectif Stratégique Fiduciário
                </span>
                <span className="font-serif text-lg font-medium text-[#C9A227] block">
                  {current.objective}
                </span>

                <span className="text-[10px] uppercase tracking-wider block opacity-70 pt-2">
                  Horizon Patrimonial
                </span>
                <span className="text-sm font-medium block">
                  {current.horizon}
                </span>
              </div>

              <p
                className={`text-[13px] font-light leading-relaxed italic ${
                  isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                }`}
              >
                « {current.commentary} »
              </p>
            </div>

            {/* Right Proportional Allocation Bars (Qualitative) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider mb-2">
                <span>Classes d’Actifs Stratégiques</span>
                <span>Pondération Relative</span>
              </div>

              {current.allocations.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-[13px]">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs text-[#C9A227] font-medium uppercase tracking-wider">
                      {item.tier}
                    </span>
                  </div>
                  <div
                    className={`w-full h-2.5 overflow-hidden ${
                      isDarkTheme ? 'bg-[#222222]' : 'bg-[#E4E2DD]'
                    }`}
                  >
                    <div
                      className="h-full transition-all duration-500 ease-out"
                      style={{
                        width: `${item.widthPct}%`,
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}

              <div className="pt-6 flex justify-end">
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#010101] text-white hover:bg-[#1C1C1C] dark:bg-[#C9A227] dark:text-black dark:hover:bg-[#DFBE58] text-[11px] uppercase tracking-[0.14em] font-semibold transition-all cursor-pointer"
                >
                  <PieChart className="w-4 h-4" />
                  <span>{t.requestMandate}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
