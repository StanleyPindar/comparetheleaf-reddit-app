import React from 'react';
import { OptionButton } from '../components/OptionButton';
import { ProgressBar } from '../components/ProgressBar';

const OPTIONS = [
  { label: 'None — I have not tried any treatments yet', value: 0 },
  { label: '1 treatment', value: 1 },
  { label: '2 treatments', value: 2 },
  { label: '3 or more treatments', value: 3 },
];

interface Q2TreatmentsProps {
  selected: number | null;
  onSelect: (value: number) => void;
  onNext: (value: number) => void;
  onBack: () => void;
}

export const Q2Treatments: React.FC<Q2TreatmentsProps> = ({ selected, onSelect, onNext, onBack }) => {
  return (
    <div className="flex flex-col min-h-screen p-6 bg-[#f8fffe]">
      <div className="w-full max-w-md mx-auto">
        <ProgressBar current={2} total={4} />
        <h2 className="text-xl font-bold text-[#1a2e2b] mb-2">
          How many conventional treatments have you tried?
        </h2>
        <p className="text-sm text-[#4a6b65] mb-5">
          UK guidelines require patients to have tried at least 2 licensed treatments before being prescribed medical cannabis.
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
            Back
          </button>
          <button
            onClick={() => onNext(selected ?? 0)}
            disabled={selected === null}
            className="flex-1 py-4 bg-[#00a896] disabled:bg-[#b0d8d4] text-white font-semibold rounded-xl transition-colors text-base"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
