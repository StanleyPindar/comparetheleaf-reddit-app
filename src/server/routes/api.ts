import { Hono } from 'hono';
import { normaliseRedditQuizResult } from '../../shared/redditQuizResult';

const api = new Hono();

const SUPABASE_URL =
  'https://qikekawvvxcdgiqknlrn.supabase.co/functions/v1/reddit-quiz-submission';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? '';

api.post('/quiz', async (context) => {
  try {
    const body = await context.req.json();
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
      return context.json({ error: 'Eligibility check failed' }, 502);
    }

    const result = normaliseRedditQuizResult(await response.json());
    if (!result) {
      console.error('Invalid eligibility response received from Supabase');
      return context.json({ error: 'Eligibility response could not be read' }, 502);
    }

    return context.json(result);
  } catch (error) {
    console.error('Quiz proxy error:', error);
    return context.json({ error: 'Internal server error' }, 500);
  }
});

export { api };
