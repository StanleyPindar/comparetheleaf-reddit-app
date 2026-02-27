import React from 'react';

interface OptionButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const OptionButton: React.FC<OptionButtonProps> = ({ label, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
        selected
          ? 'border-[#00a896] bg-[#e6f7f5] text-[#00a896]'
          : 'border-[#e0f0ee] bg-white text-[#1a2e2b] hover:border-[#00a896]'
      }`}
    >
      <span className="flex items-center gap-2">
        <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${selected ? 'border-[#00a896] bg-[#00a896]' : 'border-[#c0d8d4]'}`} />
        {label}
      </span>
    </button>
  );
};
