import React, { useState } from 'react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import {
  UserCheck,
  Shield,
  Clock,
  DoorOpen,
  ArrowRight,
  Quote,
} from 'lucide-react';

interface BanquePriveeScreenProps {
  language: Language;
  isDarkTheme?: boolean;
  onOpenContact: () => void;
}

export const BanquePriveeScreen: React.FC<BanquePriveeScreenProps> = ({
  language,
  isDarkTheme = true,
  onOpenContact,
}) => {
  const t = translations[language].banquePriveePage;
  const [heroImgLoaded, setHeroImgLoaded] = useState(true);
  const [ambientImgLoaded, setAmbientImgLoaded] = useState(true);

  // Large high-fidelity architectural imagery
  const salonImgUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCm6gyUgrINcpwlNhbi81FgwGVVBciR70cylfZmShxOjRVgIfEfXIk9kDq66DH44AShzvIhQWyn8TvQXPzJG0hVwVmctRpTtDMORi2vAM5f6dd3kCrlxX7sLLgTqrCLU8_w5Jb1ZilTWSpvxjvXl89CpyBAgwRCIZfZeBzECJMskogkflS1smt5-CfIuGFH67Q-McjUwaxHUxAsf6-usmxbgpDbWPu4lII0Bk8-IWsH-PwCtTdee8wx';

  const pavillonImgUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBi0xMP8Cj1Cj0udVKJtpc3viJChqo9dyCE0Q0YYPr70lewRvW3qFO7ZLFgP8Vjw6bWEflHvJ1GZEpfR55eWBrz9mTXrHj45uy-vUPaKStnoWoI6zjJncW0hwJoEjRGenwaz1ebP4c5kK_HZws5dHNisG3nsZBvSdZY_E8h5mjvtX5R7lwxAEFWiCTxgiRcze8tvkHXPEO0ZHrjmz_J38HyulCmXZV10nnGUAWmOEFNoY-V28wkH15j';

  return (
    <div className="flex flex-col w-full bg-[#0E0E0E] text-[#F8F6F1] animate-in fade-in duration-300">
      {/* Editorial Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-8 pb-16">
        <div className="flex flex-col max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-[1px] bg-[#ECC246]"></span>
            <span className="text-[11px] text-[#ECC246] uppercase tracking-[0.2em] font-semibold">
              {t.kicker}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[54px] text-[#F8F6F1] tracking-tight mb-4 leading-tight text-balance">
            {t.heroTitle}
          </h1>

          <p className="text-[16px] lg:text-[18px] text-[#A3A099] max-w-2xl font-light leading-relaxed">
            {t.heroDescription}
          </p>
        </div>

        {/* Large Architectural Visual Frame: Private Salon */}
        <div className="mt-12 relative w-full overflow-hidden bg-[#131313] border border-[#2B2A26] shadow-2xl">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            {heroImgLoaded ? (
              <img
                src={salonImgUrl}
                alt="Salons confidentiels de haute banque privée Nexa"
                className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05]"
                onError={() => setHeroImgLoaded(false)}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-[#181818] to-[#252525] flex items-center justify-center p-8">
                <span className="font-serif text-xl italic text-[#A3A099]">
                  Salons Privés • Place Vendôme
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-transparent to-transparent"></div>

            {/* Badge overlay */}
            <div className="absolute bottom-6 left-6 md:left-8 md:bottom-8 flex items-center gap-2.5 bg-[#0A0A0A]/80 backdrop-blur-md px-4 py-2 border border-[#2B2A26]">
              <span className="w-2 h-2 rounded-full bg-[#ECC246]"></span>
              <span className="text-[10px] text-[#A3A099] uppercase tracking-widest font-medium">
                {t.badgeVendome}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Principles: Relation Personnelle, Discrétion, Long Terme */}
      <section className="w-full bg-[#131313] py-20 my-6 border-y border-[#2B2A26]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-2xl mb-14">
            <span className="text-[11px] text-[#ECC246] uppercase tracking-[0.18em] block mb-2 font-semibold">
              Notre Philosophie d'Accompagnement
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-[#F8F6F1]">
              L'Exigence de la Haute Banque au Quotidien
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 01: Relation Personnelle */}
            <div className="bg-[#181818] p-8 flex flex-col justify-between border border-[#2B2A26] hover:bg-[#1E1E1E] transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-3xl text-[#ECC246] font-light">
                    {t.pillar1Number}
                  </span>
                  <UserCheck className="w-5 h-5 text-[#ECC246]" />
                </div>
                <span className="text-[10px] text-[#ECC246] uppercase tracking-widest block font-medium mb-1">
                  {t.pillar1Subtitle}
                </span>
                <h3 className="font-serif text-xl text-[#F8F6F1] mb-3">
                  {t.pillar1Title}
                </h3>
                <p className="text-[14px] text-[#A3A099] font-light leading-relaxed">
                  {t.pillar1Desc}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#2B2A26] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ECC246]"></span>
                <span className="text-[11px] uppercase tracking-wider text-[#A3A099]">
                  Disponibilité Directe
                </span>
              </div>
            </div>

            {/* Pillar 02: Discrétion & Confiance */}
            <div className="bg-[#181818] p-8 flex flex-col justify-between border border-[#2B2A26] hover:bg-[#1E1E1E] transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-3xl text-[#ECC246] font-light">
                    {t.pillar2Number}
                  </span>
                  <Shield className="w-5 h-5 text-[#ECC246]" />
                </div>
                <span className="text-[10px] text-[#ECC246] uppercase tracking-widest block font-medium mb-1">
                  {t.pillar2Subtitle}
                </span>
                <h3 className="font-serif text-xl text-[#F8F6F1] mb-3">
                  {t.pillar2Title}
                </h3>
                <p className="text-[14px] text-[#A3A099] font-light leading-relaxed">
                  {t.pillar2Desc}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#2B2A26] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ECC246]"></span>
                <span className="text-[11px] uppercase tracking-wider text-[#A3A099]">
                  Secret Fiduciário
                </span>
              </div>
            </div>

            {/* Pillar 03: Long Terme */}
            <div className="bg-[#181818] p-8 flex flex-col justify-between border border-[#2B2A26] hover:bg-[#1E1E1E] transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-3xl text-[#ECC246] font-light">
                    {t.pillar3Number}
                  </span>
                  <Clock className="w-5 h-5 text-[#ECC246]" />
                </div>
                <span className="text-[10px] text-[#ECC246] uppercase tracking-widest block font-medium mb-1">
                  {t.pillar3Subtitle}
                </span>
                <h3 className="font-serif text-xl text-[#F8F6F1] mb-3">
                  {t.pillar3Title}
                </h3>
                <p className="text-[14px] text-[#A3A099] font-light leading-relaxed">
                  {t.pillar3Desc}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#2B2A26] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ECC246]"></span>
                <span className="text-[11px] uppercase tracking-wider text-[#A3A099]">
                  Vision Pérenne
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Large Ambient Showcase Image & Quote */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="relative overflow-hidden bg-[#181818] border border-[#2B2A26] shadow-xl">
          <div className="relative w-full h-[360px] md:h-[480px]">
            {ambientImgLoaded ? (
              <img
                src={pavillonImgUrl}
                alt="Architecture sereine du Pavillon Nexa"
                className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
                onError={() => setAmbientImgLoaded(false)}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full bg-[#1A1A1A]"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/40 to-transparent"></div>

            <div className="absolute inset-0 p-8 md:p-14 flex flex-col justify-end max-w-3xl">
              <Quote className="w-8 h-8 text-[#ECC246] mb-3 opacity-90" />
              <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl italic text-[#F8F6F1] leading-relaxed mb-4">
                {t.quote}
              </blockquote>
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#ECC246]">
                {t.quoteAuthor}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Discreet Call to Action */}
      <section className="w-full py-20 bg-[#131313] border-t border-[#2B2A26]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center space-y-5">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1F1F1F] text-[#ECC246] border border-[#2B2A26] mx-auto mb-2">
            <DoorOpen className="w-5 h-5" />
          </div>

          <h3 className="font-serif text-3xl lg:text-4xl text-[#F8F6F1] tracking-tight">
            {t.ctaTitle}
          </h3>

          <p className="text-[16px] text-[#A3A099] max-w-xl mx-auto font-light leading-relaxed">
            {t.ctaDesc}
          </p>

          <div className="pt-4">
            <button
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#C9A227] hover:bg-[#DFBE58] text-[#0A0A0A] text-[11px] uppercase tracking-[0.16em] font-semibold transition-all duration-150 cursor-pointer shadow-lg"
            >
              <span>{t.ctaBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
