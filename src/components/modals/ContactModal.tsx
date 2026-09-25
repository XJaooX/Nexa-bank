import React, { useState } from 'react';
import { Language } from '../../types';
import { translations } from '../../data/translations';
import { X, CheckCircle, PhoneCall, Mail, ShieldCheck } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const t = translations[language].home;
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    salon: 'Paris — Place Vendôme',
    nature: 'Gestion de Fortune (> 5M€)',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#141414] border border-[#2B2A26] text-[#F8F6F1] shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#A3A099] hover:text-white transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 mb-6">
          <span className="text-[10px] text-[#ECC246] uppercase tracking-[0.2em] font-semibold">
            Relations Confidentielles
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl tracking-tight text-[#F8F6F1]">
            Demande d’Entretien avec le Directoire
          </h3>
          <p className="text-[13px] text-[#A3A099] font-light">
            Nos associés-gérants vous accueillent dans nos salons ou organisent une visioconférence chiffrée.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-[#A3A099] block font-semibold">
                  Nom &amp; Prénom *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="M. / Mme de Saint-Germain"
                  className="w-full p-3 bg-[#1C1C1C] border border-[#2B2A26] text-xs text-[#F8F6F1] focus:border-[#ECC246] focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-[#A3A099] block font-semibold">
                  Coordonnées Confidentielles (Email) *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="contact@domaine.ch"
                  className="w-full p-3 bg-[#1C1C1C] border border-[#2B2A26] text-xs text-[#F8F6F1] focus:border-[#ECC246] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-[#A3A099] block font-semibold">
                  Salon d’Intérêt
                </label>
                <select
                  value={form.salon}
                  onChange={(e) => setForm({ ...form, salon: e.target.value })}
                  className="w-full p-3 bg-[#1C1C1C] border border-[#2B2A26] text-xs text-[#F8F6F1] focus:border-[#ECC246] focus:outline-none transition-colors"
                >
                  <option>Paris — 12, Place Vendôme</option>
                  <option>Genève — 4, Rue du Rhône</option>
                  <option>Luxembourg — 25, Bd Royal</option>
                  <option>Visioconférence Chiffrée Dédiée</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-[#A3A099] block font-semibold">
                  Nature de la Démarche
                </label>
                <select
                  value={form.nature}
                  onChange={(e) => setForm({ ...form, nature: e.target.value })}
                  className="w-full p-3 bg-[#1C1C1C] border border-[#2B2A26] text-xs text-[#F8F6F1] focus:border-[#ECC246] focus:outline-none transition-colors"
                >
                  <option>Gestion de Fortune (&gt; 5M€)</option>
                  <option>Family Office &amp; Gouvernance</option>
                  <option>Financement Stratégique d’Actifs</option>
                  <option>Ingénierie Fiscale Transfrontalière</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-[#A3A099] block font-semibold">
                Indications Particulières (Optionnel)
              </label>
              <textarea
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Précisez vos disponibilités ou les spécificités de votre dossier..."
                className="w-full p-3 bg-[#1C1C1C] border border-[#2B2A26] text-xs text-[#F8F6F1] focus:border-[#ECC246] focus:outline-none transition-colors"
              ></textarea>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-[11px] text-[#A3A099]">
                Confidentialité garantie par le secret bancaire souverain.
              </span>
              <button
                type="submit"
                className="px-6 py-3.5 bg-[#C9A227] hover:bg-[#DFBE58] text-black text-[11px] uppercase tracking-[0.14em] font-semibold transition-all cursor-pointer"
              >
                Transmettre au Directoire
              </button>
            </div>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4 animate-in fade-in">
            <CheckCircle className="w-12 h-12 text-[#ECC246] mx-auto" />
            <h4 className="font-serif text-xl text-[#F8F6F1]">
              Demande d’Entretien Transmise
            </h4>
            <p className="text-xs text-[#A3A099] max-w-md mx-auto leading-relaxed">
              Votre dossier a été transmis au cabinet du Directoire. Un associé-gérant prendra contact sous 24h ouvrées selon le canal confidentiel indiqué.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#1C1C1C] border border-[#2B2A26] hover:border-[#ECC246] text-xs uppercase tracking-wider text-[#ECC246] transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-[#2B2A26] flex items-center justify-between text-[11px] text-[#A3A099]">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-3.5 h-3.5 text-[#ECC246]" />
            <span>Ligne Directoire : +33 1 42 68 00 00</span>
          </div>
          <div className="flex items-center gap-1 text-[#ECC246]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secret Bancaire</span>
          </div>
        </div>
      </div>
    </div>
  );
};
