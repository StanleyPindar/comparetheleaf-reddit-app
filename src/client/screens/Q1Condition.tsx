import React from 'react';

const CONDITIONS = [
  'Chronic Pain', 'Anxiety', 'PTSD', 'Multiple Sclerosis', 'Epilepsy',
  'Insomnia', 'Depression', 'ADHD', 'Nausea / Chemotherapy', 'Other',
];

interface Q1ConditionProps {
  selected: string | null;
  onSelect: (value: string) => void;
  onNext: () => void;
}

export const Q1Condition: React.FC<Q1ConditionProps> = ({ selected, onSelect, onNext }) => (
  <div style={s.page}>
    <div style={s.inner}>
      <ProgressBar current={1} total={4} />
      <h2 style={s.heading}>What is your primary condition?</h2>
      <p style={s.sub}>Select the condition you are seeking treatment for.</p>
      <div style={s.list}>
        {CONDITIONS.map((c) => (
          <OptionBtn key={c} label={c} selected={selected === c} onClick={() => onSelect(c)} />
        ))}
      </div>
      <button onClick={onNext} disabled={!selected} style={{ ...s.btn, backgroundColor: selected ? '#00a896' : '#b0d8d4', cursor: selected ? 'pointer' : 'default' }}>
        Next →
      </button>
    </div>
  </div>
);

/* ── Shared sub-components ─────────────────────────────────── */

export const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#8aaba5', marginBottom: 6 }}>
      <span>Question {current} of {total}</span>
      <span>{Math.round((current / total) * 100)}%</span>
    </div>
    <div style={{ width: '100%', height: 8, backgroundColor: '#e0f0ee', borderRadius: 99, overflow: 'hidden' }}>
      <div style={{ height: '100%', backgroundColor: '#00a896', borderRadius: 99, width: `${Math.round((current / total) * 100)}%`, transition: 'width 0.3s' }} />
    </div>
  </div>
);

export const OptionBtn: React.FC<{ label: string; selected: boolean; onClick: () => void }> = ({ label, selected, onClick }) => (
  <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '12px 16px', borderRadius: 12, border: `2px solid ${selected ? '#00a896' : '#e0f0ee'}`, backgroundColor: selected ? '#e6f7f5' : '#ffffff', color: selected ? '#00a896' : '#1a2e2b', fontSize: 14, fontWeight: 500, textAlign: 'left', cursor: 'pointer' }}>
    <span style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid ${selected ? '#00a896' : '#c0d8d4'}`, backgroundColor: selected ? '#00a896' : 'transparent', flexShrink: 0, display: 'inline-block' }} />
    {label}
  </button>
);

const s: Record<string, React.CSSProperties> = {
  page: { padding: '24px 20px 48px' },
  inner: { maxWidth: 440, margin: '0 auto' },
  heading: { fontSize: 20, fontWeight: 700, color: '#1a2e2b', margin: '0 0 8px 0' },
  sub: { fontSize: 14, color: '#4a6b65', margin: '0 0 20px 0' },
  list: { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 },
  btn: { width: '100%', padding: '16px 24px', color: '#ffffff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700 },
};
