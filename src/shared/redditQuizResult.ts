export type MatchedClinic = {
  id: string;
  name: string;
  description: string;
  profileUrl: string;
  priceFrom: number | null;
  matchScore: number;
  rating: number | null;
  reviewCount: number | null;
  pros: string[];
  nextAvailable: string;
  verdictSummary: string;
};

export type ApiResult = {
  isEligible: boolean;
  message: string;
  matchedClinics: MatchedClinic[];
};

const COMPARE_THE_LEAF_ORIGIN = 'https://comparetheleaf.co.uk';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const asString = (value: unknown, fallback = ''): string =>
  typeof value === 'string' ? value : fallback;

const asNullableNumber = (value: unknown): number | null =>
  typeof value === 'number' && Number.isFinite(value) ? value : null;

const asStringArray = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];

const resolveProfileUrl = (value: unknown): string | null => {
  const rawUrl = asString(value);

  try {
    const url = new URL(rawUrl);
    if (url.origin !== COMPARE_THE_LEAF_ORIGIN || !url.pathname.startsWith('/clinics/')) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
};

const normaliseClinic = (rawClinic: unknown): MatchedClinic | null => {
  if (!isRecord(rawClinic)) {
    return null;
  }

  const id = asString(rawClinic.id).trim();
  const name = asString(rawClinic.name).trim();
  const profileUrl = resolveProfileUrl(rawClinic.url);

  if (!id || !name || !profileUrl) {
    return null;
  }

  return {
    id,
    name,
    description: asString(rawClinic.description),
    profileUrl,
    priceFrom: asNullableNumber(rawClinic.priceFrom),
    matchScore: asNullableNumber(rawClinic.matchScore) ?? 0,
    rating: asNullableNumber(rawClinic.rating),
    reviewCount: asNullableNumber(rawClinic.reviewCount),
    pros: asStringArray(rawClinic.pros).slice(0, 3),
    nextAvailable: asString(rawClinic.nextAvailable, 'Contact clinic'),
    verdictSummary: asString(rawClinic.verdictSummary),
  };
};

export const normaliseRedditQuizResult = (rawResult: unknown): ApiResult | null => {
  if (!isRecord(rawResult)) {
    return null;
  }

  if (typeof rawResult.isEligible !== 'boolean' || typeof rawResult.message !== 'string') {
    return null;
  }

  const matchedClinics = Array.isArray(rawResult.matchedClinics)
    ? rawResult.matchedClinics
        .map(normaliseClinic)
        .filter((clinic): clinic is MatchedClinic => clinic !== null)
    : [];

  return {
    isEligible: rawResult.isEligible,
    message: rawResult.message,
    matchedClinics,
  };
};
