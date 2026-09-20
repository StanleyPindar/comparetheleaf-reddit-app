import React, { useEffect, useRef, useState } from 'react';
import { ApiResult, MatchedClinic, QuizState, Screen } from './types';
import { Q1Condition } from './screens/Q1Condition';
import { Q2Treatments } from './screens/Q2Treatments';
import { Q3Severity } from './screens/Q3Severity';
import { Q4Preferences } from './screens/Q4Preferences';
import { Loading } from './screens/Loading';
import { ResultEligible } from './screens/ResultEligible';
import { ResultIneligible } from './screens/ResultIneligible';
import { ResultError } from './screens/ResultError';
import { ClinicResults } from './screens/ClinicResults';

const emptyQuiz = (): QuizState => ({
  condition: null,
  previousTreatments: null,
  severity: null,
  budget: null,
  consultationType: 'any',
});

export const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('q1-condition');
  const [quiz, setQuiz] = useState<QuizState>(emptyQuiz);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const heading = document.getElementById('screen-title');
    heading?.focus();
  }, [screen]);

  const submitQuiz = async () => {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    let didTimeout = false;
    const timeout = window.setTimeout(() => {
      didTimeout = true;
      controller.abort();
    }, 15_000);

    setErrorMessage('');
    setScreen('loading');

    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          answers: {
            primaryCondition: quiz.condition ?? '',
            previousTreatments: quiz.previousTreatments ?? 0,
            ...(quiz.severity ? { conditionDetails: { severity: quiz.severity } } : {}),
            preferences: {
              consultationType: quiz.consultationType,
              ...(quiz.budget ? { budget: quiz.budget } : {}),
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Service error: ${response.status}`);
      }

      const data = await response.json() as ApiResult;
      if (typeof data.isEligible !== 'boolean' || !Array.isArray(data.matchedClinics)) {
        throw new Error('The service returned an incomplete response.');
      }

      setResult(data);
      setScreen(data.isEligible ? 'eligible' : 'ineligible');
    } catch (error) {
      if (controller.signal.aborted && !didTimeout) {
        setErrorMessage('The check was cancelled. Your answers are still here if you would like to try again.');
      } else {
        console.error('Quiz submission error:', error);
        setErrorMessage('We could not load clinic information right now. Your answers have not been saved. Please try again.');
      }
      setScreen('error');
    } finally {
      window.clearTimeout(timeout);
      if (requestRef.current === controller) {
        requestRef.current = null;
      }
    }
  };

  const cancelSubmission = () => {
    requestRef.current?.abort();
  };

  const resetQuiz = () => {
    requestRef.current?.abort();
    setQuiz(emptyQuiz());
    setResult(null);
    setErrorMessage('');
    setScreen('q1-condition');
  };

  const clinics: MatchedClinic[] = result?.matchedClinics ?? [];

  return (
    <main style={styles.app} aria-live="polite">
      {screen === 'q1-condition' && (
        <Q1Condition
          selected={quiz.condition}
          onSelect={(value) => setQuiz((currentQuiz) => ({ ...currentQuiz, condition: value }))}
          onNext={() => setScreen('q2-treatments')}
        />
      )}

      {screen === 'q2-treatments' && (
        <Q2Treatments
          selected={quiz.previousTreatments}
          onSelect={(value) => setQuiz((currentQuiz) => ({ ...currentQuiz, previousTreatments: value }))}
          onNext={(selectedValue) => {
            if (selectedValue < 2) {
              setResult({
                isEligible: false,
                message: 'More treatment history is usually needed before a specialist can consider next steps.',
                matchedClinics: [],
              });
              setScreen('ineligible');
              return;
            }
            setScreen('q3-severity');
          }}
          onBack={() => setScreen('q1-condition')}
        />
      )}

      {screen === 'q3-severity' && (
        <Q3Severity
          selected={quiz.severity}
          onSelect={(value) => setQuiz((currentQuiz) => ({ ...currentQuiz, severity: value }))}
          onNext={() => setScreen('q4-preferences')}
          onBack={() => setScreen('q2-treatments')}
        />
      )}

      {screen === 'q4-preferences' && (
        <Q4Preferences
          budget={quiz.budget}
          onBudgetSelect={(value) => setQuiz((currentQuiz) => ({ ...currentQuiz, budget: value }))}
          onSubmit={submitQuiz}
          onBack={() => setScreen('q3-severity')}
        />
      )}

      {screen === 'loading' && <Loading onCancel={cancelSubmission} />}

      {screen === 'eligible' && (
        <ResultEligible
          clinics={clinics}
          onViewClinics={() => setScreen('clinics')}
          onRetake={resetQuiz}
        />
      )}

      {screen === 'ineligible' && (
        <ResultIneligible
          message={result?.message ?? ''}
          onBackToTreatments={() => setScreen('q2-treatments')}
          onRetake={resetQuiz}
        />
      )}

      {screen === 'error' && (
        <ResultError
          message={errorMessage}
          onRetry={submitQuiz}
          onBack={() => setScreen('q4-preferences')}
        />
      )}

      {screen === 'clinics' && (
        <ClinicResults
          clinics={clinics}
          onBack={() => setScreen('eligible')}
        />
      )}
    </main>
  );
};

const styles: Record<string, React.CSSProperties> = {
  app: {
    position: 'absolute',
    inset: 0,
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    backgroundColor: '#f8fffe',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
};
