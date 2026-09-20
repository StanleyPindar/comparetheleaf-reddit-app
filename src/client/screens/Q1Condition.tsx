import React from 'react';

const CONDITIONS = [
  'Chronic Pain', 'Anxiety', 'PTSD', 'Multiple Sclerosis', 'Epilepsy',
  'Insomnia', 'Depression', 'ADHD', 'Nausea / Chemotherapy', 'Other',
];

type Q1ConditionProps = {
  selected: string | null;
  onSelect: (value: string) => void;
  onNext: () => void;
};

export const Q1Condition: React.FC<Q1ConditionProps> = ({ selected, onSelect, onNext }) => (
  <div style={styles.page}>
    <div style={styles.inner}>
      <ProgressBar current={1} total={4} />
      <h1 id="screen-title" tabIndex={-1} style={styles.heading}>What is your primary condition?</h1>
      <p style={styles.sub}>Choose the condition you are looking to discuss with a specialist clinic.</p>
      <div role="radiogroup" aria-label="Primary condition" style={styles.list}>
        {CONDITIONS.map((condition) => (
          <OptionButton
            key={condition}
            label={condition}
            selected={selected === condition}
            onClick={() => onSelect(condition)}
          />
        ))}
      </div>
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
);

export const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => (
  <div style={progressStyles.wrap} aria-label={`Question ${current} of ${total}`}>
    <div style={progressStyles.labelRow}>
      <span>Question {current} of {total}</span>
      <span>{Math.round((current / total) * 100)}%</span>
    </div>
    <div style={progressStyles.track}>
      <div style={{ ...progressStyles.fill, width: `${Math.round((current / total) * 100)}%` }} />
    </div>
  </div>
);

type OptionButtonProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

export const OptionButton: React.FC<OptionButtonProps> = ({ label, selected, onClick }) => (
  <button
    type="button"
    role="radio"
    aria-checked={selected}
    onClick={onClick}
    style={{
      ...optionStyles.button,
      borderColor: selected ? '#1a7f5a' : '#c9e2dc',
      backgroundColor: selected ? '#e6f7f0' : '#ffffff',
      color: '#1a2e2b',
    }}
  >
    <span
      aria-hidden="true"
      style={{
        ...optionStyles.indicator,
        borderColor: selected ? '#1a7f5a' : '#6b8c85',
        backgroundColor: selected ? '#1a7f5a' : '#ffffff',
      }}
    />
    <span>{label}</span>
  </button>
);

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '20px 20px 28px' },
  inner: { maxWidth: 440, margin: '0 auto' },
  heading: { fontSize: 20, fontWeight: 750, color: '#1a2e2b', margin: '0 0 6px 0', outline: 'none' },
  sub: { fontSize: 14, color: '#4a6b65', margin: '0 0 16px 0', lineHeight: 1.5 },
  list: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 },
  nextButton: { width: '100%', minHeight: 48, padding: '12px 24px', color: '#ffffff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer' },
};

const progressStyles: Record<string, React.CSSProperties> = {
  wrap: { marginBottom: 16 },
  labelRow: { display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#4a6b65', marginBottom: 7 },
  track: { width: '100%', height: 8, backgroundColor: '#d8ebe6', borderRadius: 99, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: '#1a7f5a', borderRadius: 99, transition: 'width 0.3s' },
};

const optionStyles: Record<string, React.CSSProperties> = {
  button: { display: 'flex', alignItems: 'center', gap: 12, width: '100%', minHeight: 48, padding: '10px 14px', borderStyle: 'solid', borderWidth: 2, borderRadius: 12, fontSize: 14, fontWeight: 600, textAlign: 'left', cursor: 'pointer', lineHeight: 1.35 },
  indicator: { width: 18, height: 18, borderRadius: '50%', borderStyle: 'solid', borderWidth: 2, flexShrink: 0, boxShadow: 'inset 0 0 0 3px #ffffff' },
};
