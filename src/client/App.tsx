import React, { useState } from 'react';
import { Screen, QuizState, ApiResult, MatchedClinic } from './types';
import { Welcome } from './screens/Welcome';
import { Q1Condition } from './screens/Q1Condition';
import { Q2Treatments } from './screens/Q2Treatments';
import { Q3Severity } from './screens/Q3Severity';
import { Q4Preferences } from './screens/Q4Preferences';
import { Loading } from './screens/Loading';
import { ResultEligible } from './screens/ResultEligible';
import { ResultIneligible } from './screens/ResultIneligible';
import { ClinicResults } from './screens/ClinicResults';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [quiz, setQuiz] = useState<QuizState>({
    condition: null,
    previousTreatments: null,
    severity: null,
    format: null,
    budget: null,
    consultationType: null,
  });
  const [result, setResult] = useState<ApiResult | null>(null);

  const submitQuiz = async () => {
    setScreen('loading');
    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: {
            primaryCondition: quiz.condition ?? '',
            previousTreatments: quiz.previousTreatments ?? 0,
            ...(quiz.severity ? { conditionDetails: { severity: quiz.severity } } : {}),
            preferences: {
              ...(quiz.format ? { format: quiz.format } : {}),
              ...(quiz.budget ? { budget: quiz.budget } : {}),
              ...(quiz.consultationType ? { consultationType: quiz.consultationType } : {}),
            },
          },
        }),
      });
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json() as ApiResult;
      setResult(data);
      setScreen(data.isEligible ? 'eligible' : 'ineligible');
    } catch (error) {
      console.error('Quiz submission error:', error);
      setResult({ isEligible: false, message: 'Could not check eligibility. Please try again.', matchedClinics: [] });
      setScreen('ineligible');
    }
  };

  const resetQuiz = () => {
    setQuiz({
      condition: null,
      previousTreatments: null,
      severity: null,
      format: null,
      budget: null,
      consultationType: null,
    });
    setResult(null);
    setScreen('welcome');
  };

  const clinics: MatchedClinic[] = result?.matchedClinics ?? [];

  return (
    <div className="w-full h-screen overflow-hidden bg-[#f8fffe] font-sans">
      <div className="w-full h-full overflow-y-auto">
        {screen === 'welcome' && (
          <Welcome onStart={() => setScreen('q1-condition')} />
        )}

        {screen === 'q1-condition' && (
          <Q1Condition
            selected={quiz.condition}
            onSelect={(v) => setQuiz((q) => ({ ...q, condition: v }))}
            onNext={() => setScreen('q2-treatments')}
          />
        )}

        {screen === 'q2-treatments' && (
          <Q2Treatments
            selected={quiz.previousTreatments}
            onSelect={(v) => setQuiz((q) => ({ ...q, previousTreatments: v }))}
            onNext={(selectedValue) => {
              if (selectedValue < 2) {
                setResult({
                  isEligible: false,
                  message: 'You have not yet tried enough treatments to be eligible.',
                  matchedClinics: [],
                });
                setScreen('ineligible');
              } else {
                setScreen('q3-severity');
              }
            }}
            onBack={() => setScreen('q1-condition')}
          />
        )}

        {screen === 'q3-severity' && (
          <Q3Severity
            selected={quiz.severity}
            onSelect={(v) => setQuiz((q) => ({ ...q, severity: v }))}
            onNext={() => setScreen('q4-preferences')}
            onBack={() => setScreen('q2-treatments')}
          />
        )}

        {screen === 'q4-preferences' && (
          <Q4Preferences
            format={quiz.format}
            budget={quiz.budget}
            consultationType={quiz.consultationType}
            onFormatSelect={(v) => setQuiz((q) => ({ ...q, format: v }))}
            onBudgetSelect={(v) => setQuiz((q) => ({ ...q, budget: v }))}
            onConsultationSelect={(v) => setQuiz((q) => ({ ...q, consultationType: v }))}
            onSubmit={submitQuiz}
            onBack={() => setScreen('q3-severity')}
          />
        )}

        {screen === 'loading' && <Loading />}

        {screen === 'eligible' && (
          <ResultEligible
            clinics={clinics}
            onViewClinics={() => setScreen('clinics')}
            onRetake={resetQuiz}
          />
        )}

        {screen === 'ineligible' && (
          <ResultIneligible onRetake={resetQuiz} />
        )}

        {screen === 'clinics' && (
          <ClinicResults
            clinics={clinics}
            onBack={() => setScreen('eligible')}
          />
        )}
      </div>
    </div>
  );
};
