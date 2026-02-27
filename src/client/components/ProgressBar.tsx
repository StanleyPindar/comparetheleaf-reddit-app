import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);
  return (
    <div style={{ width: '100%', marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#8aaba5', marginBottom: 6 }}>
        <span>Question {current} of {total}</span>
        <span>{percentage}%</span>
      </div>
      <div style={{ width: '100%', height: 8, backgroundColor: '#e0f0ee', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ height: '100%', backgroundColor: '#00a896', borderRadius: 99, width: `${percentage}%`, transition: 'width 0.3s' }} />
      </div>
    </div>
  );
};
