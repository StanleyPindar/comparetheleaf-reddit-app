import { describe, expect, it } from 'vitest';
import { normaliseRedditQuizResult } from './redditQuizResult';

describe('normaliseRedditQuizResult', () => {
  it('maps the active Edge Function clinic response into the card contract', () => {
    const result = normaliseRedditQuizResult({
      isEligible: true,
      message: 'Clinic information is ready.',
      matchedClinics: [
        {
          id: 'example-clinic',
          name: 'Example Clinic',
          description: 'A factual clinic description.',
          url: 'https://comparetheleaf.co.uk/clinics/example-clinic',
          priceFrom: 49,
          matchScore: 93,
          rating: 4.7,
          reviewCount: 102,
          pros: ['Clear pricing', 'Remote consultations'],
          nextAvailable: 'Next week',
          verdictSummary: 'A factual comparison note.',
        },
      ],
    });

    expect(result).toEqual({
      isEligible: true,
      message: 'Clinic information is ready.',
      matchedClinics: [
        {
          id: 'example-clinic',
          name: 'Example Clinic',
          description: 'A factual clinic description.',
          profileUrl: 'https://comparetheleaf.co.uk/clinics/example-clinic',
          priceFrom: 49,
          matchScore: 93,
          rating: 4.7,
          reviewCount: 102,
          pros: ['Clear pricing', 'Remote consultations'],
          nextAvailable: 'Next week',
          verdictSummary: 'A factual comparison note.',
        },
      ],
    });
  });

  it('rejects an incomplete service response', () => {
    expect(normaliseRedditQuizResult({ isEligible: true })).toBeNull();
  });

  it('excludes untrusted or incomplete clinic links without failing the whole response', () => {
    const result = normaliseRedditQuizResult({
      isEligible: true,
      message: 'Clinic information is ready.',
      matchedClinics: [
        {
          id: 'wrong-site',
          name: 'Wrong Site',
          url: 'https://example.com/clinics/wrong-site',
        },
      ],
    });

    expect(result?.matchedClinics).toEqual([]);
  });
});
