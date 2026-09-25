import React from 'react';
import { Language, ScreenType } from '../types';
import { translations } from '../data/translations';
import { NexaLogo } from './NexaLogo';

interface FooterProps {
  isDarkTheme: boolean;
  language: Language;
  onNavigate: (screen: ScreenType) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  isDarkTheme,
  language,
  onNavigate,
  onOpenContact,
}) => {
  const t = translations[language].footer;

  return (
    <footer
      className={`w-full mt-24 border-t transition-colors duration-200 ${
        isDarkTheme
          ? 'bg-[#0A0A0A] border-[#2B2A26] text-[#F8F6F1]'
          : 'bg-[#F5F3EE] border-[#E4E2DD] text-[#1B1C19]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Column 1: Brand & Charter */}
          <div className="md:col-span-4 space-y-5">
            <NexaLogo isDark={isDarkTheme} onClick={() => onNavigate('accueil')} />
            <p
              className={`text-[13px] leading-relaxed max-w-sm font-light ${
                isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
              }`}
            >
              {t.desc}
            </p>
            <div className="pt-2">
              <span
                className={`inline-block text-[11px] font-semibold uppercase tracking-[0.14em] ${
                  isDarkTheme ? 'text-[#ECC246]' : 'text-[#755B00]'
                }`}
              >
                {t.acprBadge}
              </span>
            </div>
          </div>

          {/* Column 2: Salons Privés (Paris, Genève, Luxembourg) */}
          <div className="md:col-span-5 grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4
                className={`text-[11px] uppercase tracking-[0.16em] font-semibold ${
                  isDarkTheme ? 'text-[#F8F6F1]' : 'text-[#010101]'
                }`}
              >
                {t.paris}
              </h4>
              <p
                className={`text-[13px] leading-relaxed whitespace-pre-line font-light ${
                  isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                }`}
              >
                {t.parisAddr}
              </p>
            </div>

            <div className="space-y-2">
              <h4
                className={`text-[11px] uppercase tracking-[0.16em] font-semibold ${
                  isDarkTheme ? 'text-[#F8F6F1]' : 'text-[#010101]'
                }`}
              >
                {t.geneva}
              </h4>
              <p
                className={`text-[13px] leading-relaxed whitespace-pre-line font-light ${
                  isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                }`}
              >
                {t.genevaAddr}
              </p>
            </div>

            <div className="space-y-2">
              <h4
                className={`text-[11px] uppercase tracking-[0.16em] font-semibold ${
                  isDarkTheme ? 'text-[#F8F6F1]' : 'text-[#010101]'
                }`}
              >
                {t.luxembourg}
              </h4>
              <p
                className={`text-[13px] leading-relaxed whitespace-pre-line font-light ${
                  isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                }`}
              >
                {t.luxembourgAddr}
              </p>
            </div>
          </div>

          {/* Column 3: Relations Confidentielles & Directoire */}
          <div className="md:col-span-3 space-y-4">
            <h4
              className={`text-[11px] uppercase tracking-[0.16em] font-semibold ${
                isDarkTheme ? 'text-[#F8F6F1]' : 'text-[#010101]'
              }`}
            >
              {t.confidentialRelations}
            </h4>
            <p
              className={`text-[13px] leading-relaxed font-light ${
                isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
              }`}
            >
              {t.confidentialDesc}
            </p>
            <div>
              <button
                onClick={onOpenContact}
                className={`inline-block text-[11px] uppercase tracking-[0.14em] font-medium px-5 py-3 transition-colors cursor-pointer border ${
                  isDarkTheme
                    ? 'bg-[#181818] border-[#2B2A26] text-[#ECC246] hover:border-[#ECC246] hover:bg-[#222222]'
                    : 'bg-[#010101] border-[#010101] text-[#FBF9F4] hover:bg-[#1C1C1C]'
                }`}
              >
                {t.demandInterview}
              </button>
            </div>
          </div>
        </div>

        {/* Regulatory & Institutional Bottom Bar */}
        <div
          className={`mt-14 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6 text-[12px] ${
            isDarkTheme
              ? 'border-[#2B2A26] text-[#A3A099]'
              : 'border-[#E4E2DD] text-[#444748]'
          }`}
        >
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => onNavigate('banque-privee')}
              className="hover:underline cursor-pointer font-medium text-[#ECC246]"
            >
              {language === 'pt' ? 'Banca Privada' : language === 'en' ? 'Private Banking' : 'Banque Privée'}
            </button>
            <button
              onClick={() => onNavigate('maison')}
              className="hover:underline cursor-pointer"
            >
              {t.mentions}
            </button>
            <button
              onClick={() => onNavigate('maison')}
              className="hover:underline cursor-pointer"
            >
              {t.governance}
            </button>
            <button
              onClick={() => onNavigate('patrimoine')}
              className="hover:underline cursor-pointer"
            >
              {t.bankingSecret}
            </button>
            <button
              onClick={() => onNavigate('investissements')}
              className="hover:underline cursor-pointer"
            >
              {t.taxPillars}
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className="hover:underline cursor-pointer text-[#ECC246]/80 hover:text-[#ECC246]"
            >
              {language === 'pt' ? 'Consola Admin' : language === 'en' ? 'Admin Portal' : 'Console Admin'}
            </button>
          </div>
          <div className="text-[11px] uppercase tracking-[0.12em] opacity-80">
            {t.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};
