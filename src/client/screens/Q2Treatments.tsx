import React from 'react';
import { OptionButton, ProgressBar } from './Q1Condition';

const OPTIONS = [
  { label: 'None — I have not tried any treatments yet', value: 0 },
  { label: '1 treatment', value: 1 },
  { label: '2 treatments', value: 2 },
  { label: '3 or more treatments', value: 3 },
];

type Q2TreatmentsProps = {
  selected: number | null;
  onSelect: (value: number) => void;
  onNext: (value: number) => void;
  onBack: () => void;
};

export const Q2Treatments: React.FC<Q2TreatmentsProps> = ({ selected, onSelect, onNext, onBack }) => (
  <div style={styles.page}>
    <div style={styles.inner}>
      <ProgressBar current={2} total={4} />
      <h1 id="screen-title" tabIndex={-1} style={styles.heading}>How many treatments have you tried?</h1>
      <p style={styles.sub}>Include treatments you have tried for this condition. This is used as one part of the preliminary guide.</p>
      <div role="radiogroup" aria-label="Number of treatments tried" style={styles.list}>
        {OPTIONS.map((option) => (
          <OptionButton
            key={option.value}
            label={option.label}
            selected={selected === option.value}
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>
      <div style={styles.row}>
        <button type="button" onClick={onBack} style={styles.backButton}>← Back</button>
        <button
          type="button"
          onClick={() => onNext(selected ?? 0)}
          disabled={selected === null}
          style={{ ...styles.nextButton, backgroundColor: selected !== null ? '#1a7f5a' : '#b0d8d4' }}
        >
          Continue →
        </button>
      </div>
    </div>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '24px 20px 40px' },
  inner: { maxWidth: 440, margin: '0 auto' },
  heading: { fontSize: 20, fontWeight: 750, color: '#1a2e2b', margin: '0 0 8px 0', outline: 'none' },
  sub: { fontSize: 14, color: '#4a6b65', margin: '0 0 18px 0', lineHeight: 1.5 },
  list: { display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 22 },
  row: { display: 'flex', gap: 12 },
  backButton: { flex: 1, minHeight: 48, padding: '12px 0', border: '2px solid #a7c9c1', backgroundColor: '#ffffff', color: '#315e54', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' },
  nextButton: { flex: 2, minHeight: 48, padding: '12px 0', color: '#ffffff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' },
};
