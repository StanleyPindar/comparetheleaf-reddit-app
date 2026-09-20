import React from 'react';
import { OptionButton, ProgressBar } from './Q1Condition';

type Q4PreferencesProps = {
  budget: string | null;
  onBudgetSelect: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
};

const BUDGET_OPTIONS = [
  { label: 'Under £100 per month', value: 'under-100' },
  { label: '£100 to £250 per month', value: '100-250' },
  { label: '£250 to £500 per month', value: '250-500' },
  { label: 'Over £500 per month', value: 'over-500' },
  { label: 'No preference', value: 'flexible' },
];

export const Q4Preferences: React.FC<Q4PreferencesProps> = ({ budget, onBudgetSelect, onSubmit, onBack }) => (
  <div style={styles.page}>
    <div style={styles.inner}>
      <ProgressBar current={4} total={4} />
      <h1 id="screen-title" tabIndex={-1} style={styles.heading}>One final preference</h1>
      <p style={styles.sub}>Optional — choose a budget range for clinic fees to make the comparison more useful.</p>

      <p style={styles.label}>Monthly budget</p>
      <div role="radiogroup" aria-label="Monthly clinic fee budget" style={styles.list}>
        {BUDGET_OPTIONS.map((option) => (
          <OptionButton
            key={option.value}
            label={option.label}
            selected={budget === option.value}
            onClick={() => onBudgetSelect(option.value)}
          />
        ))}
      </div>

      <p style={styles.note}>You can review clinic details and appointment formats before choosing what to do next.</p>

      <div style={styles.row}>
        <button type="button" onClick={onBack} style={styles.backButton}>← Back</button>
        <button type="button" onClick={onSubmit} style={styles.submitButton}>See clinic options →</button>
      </div>
    </div>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '20px 20px 40px' },
  inner: { maxWidth: 440, margin: '0 auto' },
  heading: { fontSize: 20, fontWeight: 750, color: '#1a2e2b', margin: '0 0 6px 0', outline: 'none' },
  sub: { fontSize: 14, color: '#4a6b65', margin: '0 0 18px 0', lineHeight: 1.5 },
  label: { fontSize: 14, fontWeight: 700, color: '#1a2e2b', margin: '0 0 10px 0' },
  list: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 },
  note: { fontSize: 12, color: '#4a6b65', margin: '0 0 20px 0', lineHeight: 1.5 },
  row: { display: 'flex', gap: 12 },
  backButton: { flex: 1, minHeight: 48, padding: '12px 0', border: '2px solid #a7c9c1', backgroundColor: '#ffffff', color: '#315e54', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer' },
  submitButton: { flex: 2, minHeight: 48, padding: '12px 0', backgroundColor: '#1a7f5a', color: '#ffffff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' },
};
