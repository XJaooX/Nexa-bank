import React from 'react';
import { Language } from '../types';

interface LanguageSwitcherProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDarkTheme: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

const LANGUAGES: { code: Language; label: string; full: string }[] = [
  { code: 'fr', label: 'FR', full: 'Français' },
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'pt', label: 'PT', full: 'Português' },
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  language,
  onLanguageChange,
  isDarkTheme,
  className = '',
  size = 'sm',
}) => {
  const activeIndex = LANGUAGES.findIndex((l) => l.code === language);

  return (
    <div
      role="group"
      aria-label="Sélection de la langue"
      className={`relative inline-flex items-center p-[2px] transition-all duration-300 select-none ${
        isDarkTheme
          ? 'bg-[#151515] border border-[#2B2A26] shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]'
          : 'bg-[#ECE9E2] border border-[#DDD9D0] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]'
      } ${className}`}
    >
      {/* Smooth Sliding Active Pill Indicator */}
      <div
        className={`absolute top-[2px] bottom-[2px] w-[calc((100%-4px)/3)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
          isDarkTheme
            ? 'bg-gradient-to-b from-[#2C2920] to-[#1C1A14] border border-[#ECC246]/60 shadow-[0_0_12px_rgba(236,194,70,0.25)]'
            : 'bg-[#FFFFFF] border border-[#D4AF37]/60 shadow-[0_2px_6px_rgba(0,0,0,0.07)]'
        }`}
        style={{
          transform: `translateX(${Math.max(0, activeIndex) * 100}%)`,
        }}
      >
        {/* Subtle Luxury Gold Edge Highlight */}
        <div
          className={`absolute top-0 inset-x-1 h-[1px] ${
            isDarkTheme
              ? 'bg-gradient-to-r from-transparent via-[#ECC246]/80 to-transparent'
              : 'bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent'
          }`}
        />
      </div>

      {/* Language Options */}
      {LANGUAGES.map((lang) => {
        const isActive = language === lang.code;

        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => onLanguageChange(lang.code)}
            title={lang.full}
            aria-label={lang.full}
            aria-pressed={isActive}
            className={`relative z-10 font-sans tracking-[0.14em] uppercase transition-colors duration-200 cursor-pointer flex items-center justify-center ${
              size === 'sm'
                ? 'px-2 py-0.5 text-[10px] min-w-[28px]'
                : 'px-3 py-1 text-xs min-w-[36px]'
            } ${
              isActive
                ? isDarkTheme
                  ? 'text-[#ECC246] font-bold'
                  : 'text-[#755B00] font-bold'
                : isDarkTheme
                ? 'text-[#8E8B82] hover:text-[#F8F6F1] font-medium'
                : 'text-[#66645E] hover:text-[#1B1C19] font-medium'
            }`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
};
