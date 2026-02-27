import { Hono } from 'hono';

const api = new Hono();

const SUPABASE_URL =
  'https://qikekawvvxcdgiqknlrn.supabase.co/functions/v1/reddit-quiz-submission';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpa2VrYXd2dnhjZGdpcWtubHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MTg2MTcsImV4cCI6MjA2NDk5NDYxN30.UD8Pddyk6Q98fvGfynGowhswyA7mG0exE9RTtw0ZWdA';

// Maps clinic names (as returned by Supabase) to their verified slugs on comparetheleaf.co.uk
const CLINIC_SLUG_MAP: Record<string, string> = {
  'cb1 medical': 'cb1-medical',
  'releaf': 'releaf',
  'cantourage': 'cantourage',
  'alternaleaf': 'alternaleaf',
  'mamedica': 'mamedica',
  'sapphire medical': 'sapphire-medical',
  'lyphe clinic': 'lyphe-clinic',
  'lyphe': 'lyphe-clinic',
  'curaleaf': 'curaleaf',
  'zerenia clinic': 'zerenia-clinic',
  'zerenia': 'zerenia-clinic',
  'optimum clinic': 'optimum-clinic',
  'specialist cannabis clinic': 'specialist-cannabis-clinic',
  'the cannabis clinic london': 'the-cannabis-clinic-london',
  'emerald health': 'emerald-health',
  'cannabis access clinic': 'cannabis-access-clinic',
  'the cannabis clinic cardiff': 'the-cannabis-clinic-cardiff',
  'integro medical': 'integro-medical',
  'northern cannabis clinic': 'northern-cannabis-clinic',
  'medical cannabis clinics': 'medical-cannabis-clinics',
  'doe medical': 'doe-medical',
  'midlands cannabis clinic': 'midlands-cannabis-clinic',
  'green light medical': 'green-light-medical',
  'southwest cannabis clinic': 'southwest-cannabis-clinic',
};

function resolveSlug(clinic: { name?: string; slug?: string }): string {
  // Use slug from Supabase if already provided
  if (clinic.slug && clinic.slug.trim()) return clinic.slug.trim();
  // Look up by name
  if (clinic.name) {
    const key = clinic.name.toLowerCase().trim();
    if (CLINIC_SLUG_MAP[key]) return CLINIC_SLUG_MAP[key];
    // Fallback: convert name to kebab-case
    return clinic.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  return '';
}

api.post('/quiz', async (c) => {
  try {
    const body = await c.req.json();

    const response = await fetch(SUPABASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({
        source: 'reddit',
        answers: body.answers,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Supabase error:', response.status, errorText);
      return c.json({ error: 'Eligibility check failed', details: errorText }, 500);
    }

    const data = await response.json();

    // Ensure every matched clinic has a correct slug for comparetheleaf.co.uk
    if (data.matchedClinics && Array.isArray(data.matchedClinics)) {
      data.matchedClinics = data.matchedClinics.map((clinic: { name?: string; slug?: string }) => ({
        ...clinic,
        slug: resolveSlug(clinic),
      }));
    }

    return c.json(data);
  } catch (error) {
    console.error('Quiz proxy error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export { api };
