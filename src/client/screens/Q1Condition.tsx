import React from 'react';
import { OptionButton } from '../components/OptionButton';
import { ProgressBar } from '../components/ProgressBar';

const CONDITIONS = [
  'Chronic Pain',
  'Anxiety',
  'PTSD',
  'Multiple Sclerosis',
  'Epilepsy',
  'Insomnia',
  'Depression',
  'ADHD',
  'Nausea / Chemotherapy',
  'Other',
];

interface Q1ConditionProps {
  selected: string | null;
  onSelect: (value: string) => void;
  onNext: () => void;
}

export const Q1Condition: React.FC<Q1ConditionProps> = ({ selected, onSelect, onNext }) => {
  return (
    <div className="flex flex-col min-h-screen p-6 bg-[#f8fffe]">
      <div className="w-full max-w-md mx-auto">
        <ProgressBar current={1} total={4} />
        <h2 className="text-xl font-bold text-[#1a2e2b] mb-2">
          What is your primary condition?
        </h2>
        <p className="text-sm text-[#4a6b65] mb-5">
          Select the condition you are seeking treatment for.
        </p>
        <div className="space-y-2 mb-6">
          {CONDITIONS.map((c) => (
            <OptionButton key={c} label={c} selected={selected === c} onClick={() => onSelect(c)} />
          ))}
        </div>
        <button
          onClick={onNext}
          disabled={!selected}
          className="w-full py-4 bg-[#00a896] disabled:bg-[#b0d8d4] text-white font-semibold rounded-xl transition-colors text-base"
        >
          Next →
        </button>
      </div>
    </div>
  );
};
