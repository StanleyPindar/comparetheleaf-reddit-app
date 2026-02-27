import React from 'react';
import { OptionButton } from '../components/OptionButton';
import { ProgressBar } from '../components/ProgressBar';

const OPTIONS = [
  { label: 'Mild — manageable but affects daily life', value: 'mild' },
  { label: 'Moderate — significantly impacts daily activities', value: 'moderate' },
  { label: 'Severe — debilitating, hard to function', value: 'severe' },
];

interface Q3SeverityProps {
  selected: string | null;
  onSelect: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Q3Severity: React.FC<Q3SeverityProps> = ({ selected, onSelect, onNext, onBack }) => {
  return (
    <div className="flex flex-col min-h-screen p-6 bg-[#f8fffe]">
      <div className="w-full max-w-md mx-auto">
        <ProgressBar current={3} total={4} />
        <h2 className="text-xl font-bold text-[#1a2e2b] mb-2">
          How severe is your condition?
        </h2>
        <p className="text-sm text-[#4a6b65] mb-5">
          This helps us match you with the most appropriate clinic.
        </p>
        <div className="space-y-2 mb-6">
          {OPTIONS.map((o) => (
            <OptionButton
              key={o.value}
              label={o.label}
              selected={selected === o.value}
              onClick={() => onSelect(o.value)}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 py-4 border-2 border-[#e0f0ee] text-[#4a6b65] font-semibold rounded-xl transition-colors text-base hover:border-[#00a896]"
          >
            ← Back
          </button>
          <button
            onClick={onNext}
            disabled={!selected}
            className="flex-2 w-full py-4 bg-[#00a896] disabled:bg-[#b0d8d4] text-white font-semibold rounded-xl transition-colors text-base"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};
