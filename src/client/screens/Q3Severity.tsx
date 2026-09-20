import React from 'react';
import { OptionButton, ProgressBar } from './Q1Condition';

const OPTIONS = [
  { label: 'Mild — manageable but affects daily life', value: 'mild' },
  { label: 'Moderate — significantly impacts daily activities', value: 'moderate' },
  { label: 'Severe — difficult to manage day to day', value: 'severe' },
];

type Q3SeverityProps = {
  selected: string | null;
  onSelect: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export const Q3Severity: React.FC<Q3SeverityProps> = ({ selected, onSelect, onNext, onBack }) => (
  <div style={styles.page}>
    <div style={styles.inner}>
      <ProgressBar current={3} total={4} />
      <h1 id="screen-title" tabIndex={-1} style={styles.heading}>How much does it affect day-to-day life?</h1>
      <p style={styles.sub}>This helps make the clinic comparison more relevant to the information you share.</p>
      <div role="radiogroup" aria-label="Condition severity" style={styles.list}>
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
          onClick={onNext}
          disabled={!selected}
          style={{ ...styles.nextButton, backgroundColor: selected ? '#1a7f5a' : '#b0d8d4' }}
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
  list: { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 },
  row: { display: 'flex', gap: 12 },
  backButton: { flex: 1, minHeight: 48, padding: '12px 0', border: '2px solid #a7c9c1', backgroundColor: '#ffffff', color: '#315e54', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' },
  nextButton: { flex: 2, minHeight: 48, padding: '12px 0', color: '#ffffff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' },
};
