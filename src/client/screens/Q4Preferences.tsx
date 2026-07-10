import React from 'react';
import { ProgressBar, OptionBtn } from './Q1Condition';

// NOTE: format and consultationType props are kept for API compatibility but
// the format section has been removed (not clinically relevant) and
// consultationType is hardcoded to 'video' in App.tsx (all UK clinics are video).

interface Q4PreferencesProps {
  budget: string | null;
  onBudgetSelect: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const Q4Preferences: React.FC<Q4PreferencesProps> = ({
  budget,
  onBudgetSelect,
  onSubmit,
  onBack,
}) => (
  <div style={s.page}>
    <div style={s.inner}>
      <ProgressBar current={4} total={4} />
      <h2 style={s.heading}>Your preferences</h2>
      <p style={s.sub}>Optional — helps us find your best clinic match.</p>

      <p style={s.label}>Monthly budget (clinic fees + medication)</p>
      <div style={s.list}>
        {[
          { label: 'Under £100 / month', value: 'under-100' },
          { label: '£100 – £250 / month', value: '100-250' },
          { label: '£250 – £500 / month', value: '250-500' },
          { label: 'Over £500 / month', value: 'over-500' },
          { label: 'No preference', value: 'flexible' },
        ].map((o) => (
          <OptionBtn key={o.value} label={o.label} selected={budget === o.value} onClick={() => onBudgetSelect(o.value)} />
        ))}
      </div>

      <p style={s.note}>All UK medical cannabis clinics operate via video call — no in-person visit required.</p>

      <div style={s.row}>
        <button onClick={onBack} style={s.backBtn}>Back</button>
        <button onClick={onSubmit} style={s.submitBtn}>Check Eligibility</button>
      </div>
    </div>
  </div>
);

const s: Record<string, React.CSSProperties> = {
  page: { padding: '20px 20px 40px' },
  inner: { maxWidth: 440, margin: '0 auto' },
  heading: { fontSize: 18, fontWeight: 700, color: '#1a2e2b', margin: '0 0 6px 0' },
  sub: { fontSize: 13, color: '#4a6b65', margin: '0 0 18px 0' },
  label: { fontSize: 14, fontWeight: 600, color: '#1a2e2b', margin: '0 0 10px 0' },
  list: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 },
  note: { fontSize: 12, color: '#8aaba5', margin: '0 0 20px 0', lineHeight: 1.5 },
  row: { display: 'flex', gap: 12, marginTop: 4 },
  backBtn: { flex: 1, padding: '15px 0', border: '2px solid #e0f0ee', backgroundColor: 'transparent', color: '#4a6b65', borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
  submitBtn: { flex: 2, padding: '15px 0', backgroundColor: '#00a896', color: '#ffffff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' },
};
