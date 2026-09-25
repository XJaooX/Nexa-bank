import React from 'react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import {
  ShieldCheck,
  Scale,
  Clock,
  MapPin,
  PhoneCall,
  Calendar,
} from 'lucide-react';

interface MaisonScreenProps {
  language: Language;
  isDarkTheme: boolean;
  onOpenContact: () => void;
}

export const MaisonScreen: React.FC<MaisonScreenProps> = ({
  language,
  isDarkTheme,
  onOpenContact,
}) => {
  const t = translations[language].maison;

  const salons = [
    {
      city: 'Paris',
      name: 'Salons Vendôme',
      address: '12, Place Vendôme, 75001 Paris, France',
      phone: '+33 1 42 68 00 00',
      description:
        language === 'pt'
          ? 'Situado na histórica Place Vendôme, reúne nossos especialistas em direito fiduciário francês e estruturação de holdings familiares.'
          : language === 'en'
          ? 'Located in historic Place Vendôme, housing our specialists in French fiduciary law and family holding structures.'
          : "Au cœur historique de la Place Vendôme, nos salons accueillent le Directoire et nos juristes spécialisés dans l'ingénierie patrimoniale française.",
      amenities: ['Salons boisés confidentiels', 'Salle de conseil privée', 'Accès sécurisé réservé'],
    },
    {
      city: 'Genève',
      name: 'Pavillon du Rhône',
      address: '4, Rue du Rhône, 1204 Genève, Suisse',
      phone: '+41 22 819 00 00',
      description:
        language === 'pt'
          ? 'Sede da governança helvética, custódia de metais preciosos físicos e mandatos de investimento descorrelacionados.'
          : language === 'en'
          ? 'Headquarters of Swiss governance, physical precious metals custody vaults, and decorrelated investment mandates.'
          : 'Siège de la gouvernance helvétique, abritant nos coffres-forts souverains et nos gestionnaires de mandats discrétionnaires mondiaux.',
      amenities: ['Coffres-forts souterrains', 'Salons avec vue sur le lac', 'Accréditation FINMA'],
    },
    {
      city: 'Luxembourg',
      name: 'Résidence Royale',
      address: '25, Boulevard Royal, L-2449 Luxembourg',
      phone: '+352 26 89 00 00',
      description:
        language === 'pt'
          ? 'Centro de excelência para fundos dedicados (SIF, RAIF), family offices internacionais e estruturação tributária transfronteiriça.'
          : language === 'en'
          ? 'Center of excellence for specialized investment funds (SIF, RAIF), cross-border structuring, and pan-European family offices.'
          : 'Pôle d’expertise pour véhicules d’investissement dédiés (FIAR, SIF) et structurations multipartites transfrontalières européennes.',
      amenities: ['Pôle d’ingénierie fiscale', 'Salons institutionnels', 'Accréditation CSSF'],
    },
  ];

  return (
    <div
      className={`flex flex-col w-full animate-in fade-in duration-300 ${
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

      {/* Institutional Commitments */}
      <section
        className={`w-full py-16 border-y ${
          isDarkTheme
            ? 'bg-[#131313] border-[#2B2A26]'
            : 'bg-[#F5F3EE] border-[#E4E2DD]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="mb-12">
            <span className="text-[11px] text-[#C9A227] uppercase tracking-[0.2em] font-semibold block mb-2">
              Charte Déontologique
            </span>
            <h2 className="font-serif text-2xl md:text-3xl tracking-tight">
              {t.valuesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className={`p-8 border ${
                isDarkTheme
                  ? 'bg-[#181818] border-[#2B2A26]'
                  : 'bg-white border-[#E4E2DD]'
              }`}
            >
              <ShieldCheck className="w-6 h-6 text-[#C9A227] mb-4" />
              <h3 className="font-serif text-xl font-medium mb-2">{t.value1Title}</h3>
              <p
                className={`text-[14px] font-light leading-relaxed ${
                  isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                }`}
              >
                {t.value1Desc}
              </p>
            </div>

            <div
              className={`p-8 border ${
                isDarkTheme
                  ? 'bg-[#181818] border-[#2B2A26]'
                  : 'bg-white border-[#E4E2DD]'
              }`}
            >
              <Scale className="w-6 h-6 text-[#C9A227] mb-4" />
              <h3 className="font-serif text-xl font-medium mb-2">{t.value2Title}</h3>
              <p
                className={`text-[14px] font-light leading-relaxed ${
                  isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                }`}
              >
                {t.value2Desc}
              </p>
            </div>

            <div
              className={`p-8 border ${
                isDarkTheme
                  ? 'bg-[#181818] border-[#2B2A26]'
                  : 'bg-white border-[#E4E2DD]'
              }`}
            >
              <Clock className="w-6 h-6 text-[#C9A227] mb-4" />
              <h3 className="font-serif text-xl font-medium mb-2">{t.value3Title}</h3>
              <p
                className={`text-[14px] font-light leading-relaxed ${
                  isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                }`}
              >
                {t.value3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Salons Privés Directory */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20">
        <div className="mb-12">
          <span className="text-[11px] text-[#C9A227] uppercase tracking-[0.2em] font-semibold block mb-2">
            Ancrage Géographique &amp; Accueil
          </span>
          <h2 className="font-serif text-2xl md:text-3xl tracking-tight">
            {t.salonsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {salons.map((salon) => (
            <div
              key={salon.city}
              className={`p-8 border flex flex-col justify-between ${
                isDarkTheme
                  ? 'bg-[#141414] border-[#2B2A26]'
                  : 'bg-[#F0EEE9] border-[#E4E2DD]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl font-medium text-[#C9A227]">
                    {salon.city}
                  </span>
                  <MapPin className="w-5 h-5 text-[#C9A227]" />
                </div>
                <h4 className="font-serif text-lg font-medium">{salon.name}</h4>
                <p className="text-xs font-mono opacity-70">{salon.address}</p>
                <p
                  className={`text-[13px] font-light leading-relaxed ${
                    isDarkTheme ? 'text-[#A3A099]' : 'text-[#444748]'
                  }`}
                >
                  {salon.description}
                </p>

                <div className="pt-2 space-y-1.5">
                  {salon.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="text-[11px] flex items-center gap-2 opacity-80"
                    >
                      <span className="w-1.5 h-1.5 bg-[#C9A227] rounded-full"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6 border-t border-[#C9A227]/20 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-mono opacity-80">
                  <PhoneCall className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>{salon.phone}</span>
                </div>

                <button
                  onClick={onOpenContact}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#010101] text-white hover:bg-[#1C1C1C] dark:bg-[#C9A227] dark:text-black dark:hover:bg-[#DFBE58] text-[10px] uppercase tracking-[0.14em] font-semibold transition-all cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Demande de Visite Privée</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
