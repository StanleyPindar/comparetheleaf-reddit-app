import React from 'react';
import { ProgressBar, OptionBtn } from './Q1Condition';

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

export const Q2Treatments: React.FC<Q2TreatmentsProps> = ({ selected, onSelect, onNext, onBack }) => (
  <div style={s.page}>
    <div style={s.inner}>
      <ProgressBar current={2} total={4} />
      <h2 style={s.heading}>How many conventional treatments have you tried?</h2>
      <p style={s.sub}>UK guidelines require patients to have tried at least 2 licensed treatments before being prescribed medical cannabis.</p>
      <div style={s.list}>
        {OPTIONS.map((o) => (
          <OptionBtn key={o.value} label={o.label} selected={selected === o.value} onClick={() => onSelect(o.value)} />
        ))}
      </div>
      <div style={s.row}>
        <button onClick={onBack} style={s.backBtn}>← Back</button>
        <button onClick={() => onNext(selected ?? 0)} disabled={selected === null} style={{ ...s.nextBtn, backgroundColor: selected !== null ? '#00a896' : '#b0d8d4', cursor: selected !== null ? 'pointer' : 'default' }}>
          Next →
        </button>
      </div>
    </div>
  </div>
);

const s: Record<string, React.CSSProperties> = {
  page: { padding: '24px 20px 48px' },
  inner: { maxWidth: 440, margin: '0 auto' },
  heading: { fontSize: 20, fontWeight: 700, color: '#1a2e2b', margin: '0 0 8px 0' },
  sub: { fontSize: 14, color: '#4a6b65', margin: '0 0 20px 0', lineHeight: 1.5 },
  list: { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 },
  row: { display: 'flex', gap: 12 },
  backBtn: { flex: 1, padding: '16px 0', border: '2px solid #e0f0ee', backgroundColor: 'transparent', color: '#4a6b65', borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer' },
  nextBtn: { flex: 2, padding: '16px 0', color: '#ffffff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700 },
};
