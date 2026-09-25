export type ScreenType = 'accueil' | 'banque-privee' | 'patrimoine' | 'investissements' | 'financement' | 'maison' | 'admin';

export type Language = 'fr' | 'en' | 'pt';

export interface SalonLocation {
  city: string;
  name: string;
  address: string;
  postal: string;
  country: string;
  phone: string;
  features: string[];
}

export interface ConsultationRequest {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  salon: string;
  nature: string;
  message?: string;
  date?: string;
  status?: 'nouveau' | 'en_cours' | 'confirme' | 'traite';
  assignedBanker?: string;
  estimatedAUM?: string;
}

export interface ClientPortfolio {
  accountHolder: string;
  societaireId: string;
  privateBanker: {
    name: string;
    role: string;
    salon: string;
    phone: string;
    email: string;
  };
  valuationLabel: string;
  performanceLabel: string;
  allocations: {
    category: string;
    weightTier: string;
    color: string;
  }[];
  recentMovements: {
    id: string;
    date: string;
    label: string;
    category: string;
    type: 'inflow' | 'outflow' | 'neutral';
  }[];
  fiduciaryDocuments: {
    id: string;
    title: string;
    type: string;
    date: string;
    size: string;
  }[];
}

export interface AdminClient {
  id: string;
  accountHolder: string;
  tier: 'UHNWI (> 50M€)' | 'HNWI (15M€ - 50M€)' | 'Family Office' | 'Institutionnel';
  totalAUM: number;
  currency: string;
  jurisdiction: 'Paris' | 'Genève' | 'Luxembourg' | 'Monaco';
  assignedBanker: string;
  mandateType: string;
  kycStatus: 'Vérifié' | 'Revue Annuelle' | 'En attente PEP';
  riskProfile: 'Préservation Absolue' | 'Équilibré Patrimonial' | 'Opportunités & Décorrélé';
  openDate: string;
  notes: string;
}

export interface AdminDeal {
  id: string;
  title: string;
  category: 'Private Equity' | 'Immobilier Prestige' | 'Dette Privée' | 'Actifs Réels & Viticoles';
  targetAmount: number;
  raisedAmount: number;
  targetIRR: string;
  minimumTicket: number;
  status: 'Ouvert' | 'Clôturé' | 'Sur-souscrit' | 'Étude Directoire';
  maturity: string;
  location: string;
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  severity: 'info' | 'warning' | 'security' | 'compliance';
  details: string;
}
