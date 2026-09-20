import type { ApiResult, MatchedClinic } from '../shared/redditQuizResult';

export type { ApiResult, MatchedClinic };

export type Screen =
  | 'q1-condition'
  | 'q2-treatments'
  | 'q3-severity'
  | 'q4-preferences'
  | 'loading'
  | 'eligible'
  | 'ineligible'
  | 'error'
  | 'clinics';

export type QuizState = {
  condition: string | null;
  previousTreatments: number | null;
  severity: string | null;
  budget: string | null;
  consultationType: 'any';
};
