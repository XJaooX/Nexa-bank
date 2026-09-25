import React, { useState } from 'react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import {
  Building,
  Plane,
  Coins,
  ShieldCheck,
  Calculator,
  ArrowRight,
} from 'lucide-react';

interface FinancementScreenProps {
  language: Language;
  isDarkTheme: boolean;
  onOpenContact: () => void;
}

export const FinancementScreen: React.FC<FinancementScreenProps> = ({
  language,
  isDarkTheme,
  onOpenContact,
}) => {
  const t = translations[language].financement;

  const [assetType, setAssetType] = useState<'liquid' | 'real_estate' | 'art'>('liquid');

  const assetDetails = {
    liquid: {
      title: 'Portefeuille Titres Déposé (Lombard)',
      ltv: 'Quotité Élevée (~60% — 70%)',
      disponibility: 'Mise en place agile sous 48h',
      description: 'Ligne de liquidité mobilisable sans désinvestissement des positions stratégiques en portefeuille.',
    },
    real_estate: {
      title: 'Immobilier Résidentiel de Prestige',
      ltv: 'Quotité Modérée (~50% — 60%)',
      disponibility: 'Instruction notariale dédiée',
      description: 'Hôtels particuliers parisiens, domaines viticoles et villas de villégiature en France et en Suisse.',
    },
    art: {
      title: 'Actifs d’Art Muséal, Aviation & Yachts',
      ltv: 'Quotité Sur-Mesure (~40% — 50%)',
      disponibility: 'Expertise certifiée par collège d’experts',
      description: 'Solutions de crédit adossées à des œuvres de maîtres, jets d’affaires ou navires de haute plaisance.',
    },
  };

  const current = assetDetails[assetType];

  return (
    <div
      className={`flex flex-col w-full transition-colors duration-200 animate-in fade-in ${
        isDarkTheme ? 'bg-[#0E0E0E] text-[#F8F6F1]' : 'bg-[#FBF9F4] text-[#1B1C19]'
      }`}
    >
      {/* Hero */}
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

      {/* 3 Structured Credit Divisions */}
      <section
        className={`w-full py-16 border-y ${
          isDarkTheme
            ? 'bg-[#131313] border-[#2B2A26]'
            : 'bg-[#F5F3EE] border-[#E4E2DD]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Division 1 */}
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
                  <Coins className="w-5 h-5 text-[#C9A227]" />
                </div>
                <h3 className="font-serif text-xl font-medium">{t.lombardLoan}</h3>
                <p
                  className={`text-[14px] font-light leading-relaxed ${
                    isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                  }`}
                >
                  {t.lombardDesc}
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-[#C9A227]/20 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                <span className="text-[10px] uppercase tracking-wider font-semibold">
                  Mise en place rapide sans cession
                </span>
              </div>
            </div>

            {/* Division 2 */}
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
                  <Building className="w-5 h-5 text-[#C9A227]" />
                </div>
                <h3 className="font-serif text-xl font-medium">{t.prestigeRealEstate}</h3>
                <p
                  className={`text-[14px] font-light leading-relaxed ${
                    isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                  }`}
                >
                  {t.prestigeDesc}
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-[#C9A227]/20 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                <span className="text-[10px] uppercase tracking-wider font-semibold">
                  Transactions transfrontalières
                </span>
              </div>
            </div>

            {/* Division 3 */}
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
                  <Plane className="w-5 h-5 text-[#C9A227]" />
                </div>
                <h3 className="font-serif text-xl font-medium">{t.artAviation}</h3>
                <p
                  className={`text-[14px] font-light leading-relaxed ${
                    isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                  }`}
                >
                  {t.artAviationDesc}
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-[#C9A227]/20 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                <span className="text-[10px] uppercase tracking-wider font-semibold">
                  Expertises fiduciaires certifiées
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Asset Collateralization Framework (Qualitative Maquette) */}
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
              Étude Structurée (Maquette)
            </span>
            <h2 className="font-serif text-2xl md:text-3xl tracking-tight">
              {t.calculatorTitle}
            </h2>
            <p
              className={`text-[14px] font-light ${
                isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
              }`}
            >
              {t.calculatorSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-4">
              <label className="text-[10px] uppercase tracking-wider font-semibold block opacity-80">
                Sélectionnez la catégorie d’actif à adosser :
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'liquid', label: 'Portefeuille Titres (Lombard)' },
                  { id: 'real_estate', label: 'Immobilier Prime' },
                  { id: 'art', label: 'Art, Aviation & Yachts' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setAssetType(item.id as any)}
                    className={`p-3.5 text-[11px] font-medium text-left border transition-all cursor-pointer ${
                      assetType === item.id
                        ? 'bg-[#C9A227] text-black border-[#C9A227] font-semibold'
                        : isDarkTheme
                        ? 'bg-[#1C1C1C] text-[#A3A099] border-[#2B2A26] hover:text-[#F8F6F1]'
                        : 'bg-white text-[#444748] border-[#E4E2DD] hover:text-[#010101]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div
                className={`p-5 border space-y-2 ${
                  isDarkTheme ? 'bg-[#181818] border-[#2B2A26]' : 'bg-white border-[#E4E2DD]'
                }`}
              >
                <div className="text-xs font-semibold text-[#C9A227] uppercase tracking-wider">
                  Modalité d’Instruction
                </div>
                <p className="text-xs opacity-80 leading-relaxed">
                  {current.description}
                </p>
              </div>
            </div>

            {/* Framework Result Card */}
            <div
              className={`lg:col-span-5 p-8 border space-y-4 ${
                isDarkTheme
                  ? 'bg-[#181818] border-[#2B2A26]'
                  : 'bg-white border-[#E4E2DD]'
              }`}
            >
              <div className="flex items-center gap-2 text-[#C9A227]">
                <Calculator className="w-5 h-5" />
                <span className="text-[10px] uppercase tracking-widest font-semibold">
                  Faisabilité Fiduciária
                </span>
              </div>

              <div>
                <span className="font-serif text-2xl text-[#C9A227] block font-medium">
                  {current.title}
                </span>
                <span className="text-xs block mt-2 opacity-80">
                  {current.ltv}
                </span>
                <span className="text-xs block opacity-60 mt-1">
                  {current.disponibility}
                </span>
              </div>

              <div className="pt-2 border-t border-[#C9A227]/20">
                <button
                  onClick={onOpenContact}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#010101] text-white hover:bg-[#1C1C1C] dark:bg-[#C9A227] dark:text-black dark:hover:bg-[#DFBE58] text-[11px] uppercase tracking-[0.14em] font-semibold transition-all cursor-pointer"
                >
                  <span>Étudier une Ligne Structurée</span>
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
