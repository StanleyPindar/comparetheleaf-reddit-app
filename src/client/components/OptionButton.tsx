import React from 'react';

interface OptionButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const OptionButton: React.FC<OptionButtonProps> = ({ label, selected, onClick }) => (
  <button
    onClick={onClick}
    style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '12px 16px', borderRadius: 12, border: `2px solid ${selected ? '#00a896' : '#e0f0ee'}`, backgroundColor: selected ? '#e6f7f5' : '#ffffff', color: selected ? '#00a896' : '#1a2e2b', fontSize: 14, fontWeight: 500, textAlign: 'left', cursor: 'pointer' }}
  >
    <span style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${selected ? '#00a896' : '#c0d8d4'}`, backgroundColor: selected ? '#00a896' : 'transparent', flexShrink: 0, display: 'inline-block' }} />
    {label}
  </button>
);
