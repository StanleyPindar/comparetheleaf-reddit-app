export type Screen =
  | 'welcome'
  | 'q1-condition'
  | 'q2-treatments'
  | 'q3-severity'
  | 'q4-preferences'
  | 'loading'
  | 'eligible'
  | 'ineligible'
  | 'clinics';

export interface QuizState {
  condition: string | null;
  previousTreatments: number | null;
  severity: string | null;
  format: string | null;
  budget: string | null;
  consultationType: string | null;
}

export interface MatchedClinic {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  website?: string;
  phone?: string;
  matchScore: number;
  matchReasons: string[];
  consultationPrice?: number;
  followUpPrice?: number;
  annualCostFirstYear?: number;
  rating?: number;
}

export interface ApiResult {
  isEligible: boolean;
  message: string;
  matchedClinics: MatchedClinic[];
}
