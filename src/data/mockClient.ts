import { ClientPortfolio } from '../types';

export const mockClientPortfolio: ClientPortfolio = {
  accountHolder: 'Famille de Saint-Germain (Dossier Maquette)',
  societaireId: 'NX-SIMULATION-STAGE',
  privateBanker: {
    name: 'Charles de Saint-Germain',
    role: 'Associé Gérant Fictif & Membre du Directoire',
    salon: 'Paris — 12, Place Vendôme',
    phone: 'Ligne Interne Sécurisée (Maquette)',
    email: 'cabinet.fictif@nexa-banque.com',
  },
  valuationLabel: 'Portefeuille Consolidé Décorrélé',
  performanceLabel: 'Indice de Préservation Stable',
  allocations: [
    {
      category: 'Immobilier de Prestige & Forêts',
      weightTier: 'Quote-part Principale',
      color: '#C9A227', // Gold
    },
    {
      category: 'Private Equity & Club Deals',
      weightTier: 'Quote-part Stratégique',
      color: '#A3A099', // Warm charcoal
    },
    {
      category: 'Mandat Discrétionnaire Décorrélé',
      weightTier: 'Quote-part Équilibrée',
      color: '#755B00', // Deep bronze
    },
    {
      category: 'Or Physique & Devises Souveraines',
      weightTier: 'Réserve de Souveraineté',
      color: '#DFBE58', // Pale gold
    },
  ],
  recentMovements: [
    {
      id: 'OP-FID-A',
      date: 'Septembre 2026',
      label: 'Distribution Ficiaire — Club Deal Entreprises Européennes',
      category: 'Private Equity',
      type: 'inflow',
    },
    {
      id: 'OP-FID-B',
      date: 'Septembre 2026',
      label: 'Arbitrage Trimestriel — Mandat de Préservation Active',
      category: 'Mandat Discrétionnaire',
      type: 'neutral',
    },
    {
      id: 'OP-FID-C',
      date: 'Août 2026',
      label: 'Acquisition Foncière Conservatrice — Forêts Durables',
      category: 'Immobilier',
      type: 'outflow',
    },
    {
      id: 'OP-FID-D',
      date: 'Juillet 2026',
      label: 'Allocation Métaux Précieux — Coffres Sécurisés Suisse',
      category: 'Or Physique',
      type: 'neutral',
    },
  ],
  fiduciaryDocuments: [
    {
      id: 'DOC-Q3',
      title: 'Rapport Trimestriel de Préservation Fiduciaire Q3',
      type: 'Rapport d’Étude Maquette',
      date: 'Septembre 2026',
      size: 'Format PDF',
    },
    {
      id: 'DOC-TAX',
      title: 'Attestation de Conformité Transfrontalière (Paris — Genève — Luxembourg)',
      type: 'Document Fictif de Stage',
      date: 'Août 2026',
      size: 'Format PDF',
    },
    {
      id: 'DOC-PACT',
      title: 'Projet de Pacte d’Actionnaires & Charte Familiale',
      type: 'Modèle Fiduciário',
      date: 'Juin 2026',
      size: 'Format PDF',
    },
  ],
};
