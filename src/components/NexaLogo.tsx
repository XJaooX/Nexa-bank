import React from 'react';

interface NexaLogoProps {
  isDark?: boolean;
  className?: string;
  showSubtitle?: boolean;
  subtitleText?: string;
  onClick?: () => void;
}

export const NexaLogo: React.FC<NexaLogoProps> = ({
  isDark = false,
  showSubtitle = false,
  subtitleText = 'Banque Privée',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 sm:gap-3 select-none cursor-pointer group ${
        onClick ? 'hover:opacity-95 transition-opacity' : ''
      }`}
      role="banner"
      aria-label="Nexa Banque Privée"
    >
      {/* Signature dual slanted bars emblem */}
      <svg
        className="h-8 sm:h-9 lg:h-9.5 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105"
        viewBox="0 0 46 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* First slanted bar (Ivory in dark mode / Obsidian in light mode) */}
        <polygon
          points="13,0 19,0 6,32 0,32"
          fill={isDark ? '#F5F3EE' : '#111111'}
        />
        {/* Second slanted gold bar */}
        <polygon
          points="24,0 31,0 18,32 11,32"
          fill="#C9A227"
        />
      </svg>

      {/* Typography: NEXA in bold serif + BANQUE in warm gold */}
      <div className="flex items-baseline gap-1.5 sm:gap-2 shrink-0">
        <span
          className={`font-serif tracking-[0.24em] font-bold text-xl sm:text-2xl lg:text-[25px] leading-none ${
            isDark ? 'text-[#F8F6F1]' : 'text-[#111111]'
          }`}
        >
          NEXA
        </span>
        <span className="font-serif tracking-[0.22em] font-semibold text-xs sm:text-[13.5px] lg:text-[14.5px] text-[#C9A227] leading-none uppercase">
          BANQUE
        </span>
      </div>

      {showSubtitle && (
        <span
          className={`hidden md:inline-block text-[10px] lg:text-[11px] font-medium tracking-[0.2em] uppercase pl-2.5 sm:pl-3 border-l shrink-0 ${
            isDark
              ? 'text-[#A3A099] border-[#2B2A26]'
              : 'text-[#444748] border-[#C4C7C7]/60'
          }`}
        >
          {subtitleText}
        </span>
      )}
    </div>
  );
};
