import React from 'react';
import { ProgressBar, OptionBtn } from './Q1Condition';

interface Q4PreferencesProps {
  format: string | null;
  budget: string | null;
  consultationType: string | null;
  onFormatSelect: (value: string) => void;
  onBudgetSelect: (value: string) => void;
  onConsultationSelect: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const Q4Preferences: React.FC<Q4PreferencesProps> = ({
  format, budget, consultationType,
  onFormatSelect, onBudgetSelect, onConsultationSelect,
  onSubmit, onBack,
}) => (
  <div style={s.page}>
    <div style={s.inner}>
      <ProgressBar current={4} total={4} />
      <h2 style={s.heading}>Your preferences</h2>
      <p style={s.sub}>Optional — helps us find your best clinic match.</p>
      <p style={s.label}>Preferred product format</p>
      <div style={s.list}>
        {[{label:'Oil / Tincture',value:'oil'},{label:'Flower',value:'flower'},{label:'Capsules',value:'capsules'},{label:'No preference',value:'any'}].map((o) => (
          <OptionBtn key={o.value} label={o.label} selected={format === o.value} onClick={() => onFormatSelect(o.value)} />
        ))}
      </div>
      <p style={s.label}>Monthly budget for medication</p>
      <div style={s.list}>
        {[{label:'Under £150',value:'under-150'},{label:'£150 – £250',value:'150-250'},{label:'£250 – £400',value:'250-400'},{label:'£400+',value:'400+'}].map((o) => (
          <OptionBtn key={o.value} label={o.label} selected={budget === o.value} onClick={() => onBudgetSelect(o.value)} />
        ))}
      </div>
      <p style={s.label}>Consultation type</p>
      <div style={s.list}>
        {[{label:'Video call',value:'video'},{label:'Phone call',value:'phone'},{label:'In person',value:'in-person'}].map((o) => (
          <OptionBtn key={o.value} label={o.label} selected={consultationType === o.value} onClick={() => onConsultationSelect(o.value)} />
        ))}
      </div>
      <div style={s.row}>
        <button onClick={onBack} style={s.backBtn}>Back</button>
        <button onClick={onSubmit} style={s.submitBtn}>Check Eligibility</button>
      </div>
    </div>
  </div>
);

const s: Record<string, React.CSSProperties> = {
  page: { padding: '24px 20px 48px' },
  inner: { maxWidth: 440, margin: '0 auto' },
  heading: { fontSize: 20, fontWeight: 700, color: '#1a2e2b', margin: '0 0 8px 0' },
  sub: { fontSize: 14, color: '#4a6b65', margin: '0 0 20px 0' },
  label: { fontSize: 14, fontWeight: 600, color: '#1a2e2b', margin: '0 0 10px 0' },
  list: { display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 },
  row: { display: 'flex', gap: 12, marginTop: 8 },
  backBtn: { flex: 1, padding: '16px 0', border: '2px solid #e0f0ee', backgroundColor: 'transparent', color: '#4a6b65', borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer' },
  submitBtn: { flex: 2, padding: '16px 0', backgroundColor: '#00a896', color: '#ffffff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' },
};
