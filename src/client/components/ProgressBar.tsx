import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-xs text-[#8aaba5] mb-1">
        <span>Question {current} of {total}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-[#e0f0ee] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#00a896] rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
