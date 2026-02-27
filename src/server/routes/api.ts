import { Hono } from 'hono';

const api = new Hono( );

const SUPABASE_URL =
  'https://qikekawvvxcdgiqknlrn.supabase.co/functions/v1/reddit-quiz-submission';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpa2VrYXd2dnhjZGdpcWtubHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MTg2MTcsImV4cCI6MjA2NDk5NDYxN30.UD8Pddyk6Q98fvGfynGowhswyA7mG0exE9RTtw0ZWdA';

api.post('/quiz', async (c ) => {
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
    return c.json(data);
  } catch (error) {
    console.error('Quiz proxy error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export { api };
