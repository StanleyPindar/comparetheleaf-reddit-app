import React from 'react';
import { ProgressBar } from '../components/ProgressBar';
import { OptionButton } from '../components/OptionButton';

interface Q4PreferencesProps {
  format: string | null;
  budget: string | null;
  consultationType: string | null;
  onFormatSelect: (value: string) => void;
  onBudgetSelect: (value: string) => void;
  onConsultationSelect: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const Q4Preferences: React.FC<Q4PreferencesProps> = ({
  format, budget, consultationType,
  onFormatSelect, onBudgetSelect, onConsultationSelect,
  onSubmit, onBack,
}) => {
  return (
    <div className="flex flex-col min-h-screen p-6 bg-[#f8fffe]">
      <div className="w-full max-w-md mx-auto">
        <ProgressBar current={4} total={4} />
        <h2 className="text-xl font-bold text-[#1a2e2b] mb-1">
          Your preferences
        </h2>
        <p className="text-sm text-[#4a6b65] mb-5">
          Optional — helps us find your best clinic match.
        </p>

        <div className="mb-5">
          <p className="text-sm font-semibold text-[#1a2e2b] mb-2">Preferred product format</p>
          <div className="space-y-2">
            {[
              { label: 'Oil / Tincture', value: 'oil' },
              { label: 'Flower', value: 'flower' },
              { label: 'Capsules', value: 'capsules' },
              { label: 'No preference', value: 'any' },
            ].map((o) => (
              <OptionButton key={o.value} label={o.label} selected={format === o.value} onClick={() => onFormatSelect(o.value)} />
            ))}
          </div>
        </div>

        <div className="mb-5">
          <p className="text-sm font-semibold text-[#1a2e2b] mb-2">Monthly budget for medication</p>
          <div className="space-y-2">
            {[
              { label: 'Under £150', value: 'under-150' },
              { label: '£150 – £250', value: '150-250' },
              { label: '£250 – £400', value: '250-400' },
              { label: '£400+', value: '400+' },
            ].map((o) => (
              <OptionButton key={o.value} label={o.label} selected={budget === o.value} onClick={() => onBudgetSelect(o.value)} />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold text-[#1a2e2b] mb-2">Consultation type</p>
          <div className="space-y-2">
            {[
              { label: 'Video call', value: 'video' },
              { label: 'Phone call', value: 'phone' },
              { label: 'In person', value: 'in-person' },
            ].map((o) => (
              <OptionButton key={o.value} label={o.label} selected={consultationType === o.value} onClick={() => onConsultationSelect(o.value)} />
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 py-4 border-2 border-[#e0f0ee] text-[#4a6b65] font-semibold rounded-xl transition-colors text-base hover:border-[#00a896]"
          >
            ← Back
          </button>
          <button
            onClick={onSubmit}
            className="flex-2 w-full py-4 bg-[#00a896] text-white font-semibold rounded-xl transition-colors text-base hover:bg-[#008f7e]"
          >
            Check Eligibility →
          </button>
        </div>
      </div>
    </div>
  );
};
