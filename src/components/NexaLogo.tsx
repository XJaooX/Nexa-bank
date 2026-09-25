import React, { useState } from 'react';

interface NexaLogoProps {
  isDark?: boolean;
  className?: string;
  showSubtitle?: boolean;
  subtitleText?: string;
  onClick?: () => void;
}

export const NexaLogo: React.FC<NexaLogoProps> = ({
  isDark = false,
  className = 'h-8',
  showSubtitle = true,
  subtitleText = 'Banque Privée',
  onClick,
}) => {
  const [imgError, setImgError] = useState(false);

  const lightImgSrc =
    'https://lh3.googleusercontent.com/aida/AEtjO1Vv4uW9UB-ZXV7pCABr62L-DyP7xkCQFAml1zf5KBkOV7CP-aDa95ZL2HUiqT_EcJV-R-zDUy77jAC5ri35kxBAV-AKDc2WrSHfThNARAeIUucRhEu_3vwXoR1gg57h9DthusHpjg7yfaC520Mk7x0-rxLg6IIeQg-FenMy33ml2KITqNRwG7ThuA3IWqH-3WE5Thb7BScw-_fFvDSd1RCGb578BzXrmoVJmLRFEKDjkMMpk96Y663xatQ';
  const darkImgSrc =
    'https://lh3.googleusercontent.com/aida/AEtjO1UHc_JQxa1Ev0piLNDX-0QqKkwZDI4qsjVI_n9amsPg-XaS2feTvdBcKCf-ddY-sbem-ipoA1dkfBanKgYgPrBeUvA0N6ZLEnTORTHblnAuYKFZozB3qNBrGAkSKsm6L7uRY7apaGVeUxj0oTqaLdoGSvWw2lifEkk3uEkDbIVlnxa_RTXdcapuf3hnjzdn3DkUbbKBF9-ZLInHlxjX6_X8k-NjVS59Q4owIaZIFVGnoe8QEpnPNOVU7KQ';

  const currentSrc = isDark ? darkImgSrc : lightImgSrc;

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none cursor-pointer ${
        onClick ? 'hover:opacity-90 transition-opacity' : ''
      }`}
      role="banner"
    >
      {!imgError ? (
        <img
          src={currentSrc}
          alt="Nexa Banque"
          className={`${className} w-auto object-contain`}
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        /* Precise SVG vector fallback */
        <div className="flex items-center gap-3">
          <svg
            className="h-7 w-auto"
            viewBox="0 0 54 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* First slanted bar */}
            <polygon
              points="14,0 20,0 6,36 0,36"
              fill={isDark ? '#F5F3EE' : '#1C1C1C'}
            />
            {/* Second slanted gold bar */}
            <polygon
              points="24,0 32,0 18,36 10,36"
              fill="#C9A227"
            />
          </svg>
          <div className="flex items-baseline gap-2">
            <span
              className={`font-serif tracking-[0.22em] font-medium text-lg leading-none ${
                isDark ? 'text-[#F8F6F1]' : 'text-[#1C1C1C]'
              }`}
            >
              NEXA
            </span>
            <span className="font-serif tracking-[0.24em] font-light text-sm text-[#C9A227] leading-none">
              BANQUE
            </span>
          </div>
        </div>
      )}

      {showSubtitle && (
        <span
          className={`hidden sm:inline-block text-[11px] font-medium tracking-[0.2em] uppercase pl-3 border-l ${
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
