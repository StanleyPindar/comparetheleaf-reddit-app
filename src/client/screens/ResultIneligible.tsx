import React from 'react';

type ResultIneligibleProps = {
  message?: string;
  onBackToTreatments: () => void;
  onRetake: () => void;
};

export const ResultIneligible: React.FC<ResultIneligibleProps> = ({ message, onBackToTreatments, onRetake }) => (
  <div style={styles.page}>
    <div style={styles.inner}>
      <div style={styles.icon} aria-hidden="true">i</div>
      <h1 id="screen-title" tabIndex={-1} style={styles.title}>More information may be needed first</h1>
      <p style={styles.body}>{message ?? 'Your answers suggest that more treatment history may be needed before a specialist can consider next steps.'}</p>
      <div style={styles.card}>
        <p style={styles.cardTitle}>What you can do next</p>
        <p style={styles.cardBody}>Speak to a qualified healthcare professional about your symptoms and current treatment options. A short questionnaire cannot decide whether any treatment is suitable for you.</p>
      </div>
      <button type="button" onClick={onBackToTreatments} style={styles.primaryButton}>← Review treatment answer</button>
      <button type="button" onClick={onRetake} style={styles.secondaryButton}>Start again</button>
      <p style={styles.footer}>CompareTheLeaf is an information and comparison platform, not a clinic.</p>
    </div>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '32px 20px 40px' },
  inner: { maxWidth: 440, margin: '0 auto', textAlign: 'center' },
  icon: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: '50%', backgroundColor: '#fff4db', color: '#7a5300', fontSize: 28, fontWeight: 750, marginBottom: 14 },
  title: { fontSize: 22, fontWeight: 750, color: '#1a2e2b', margin: '0 0 10px 0', outline: 'none' },
  body: { fontSize: 15, color: '#315e54', lineHeight: 1.55, margin: '0 0 20px 0' },
  card: { backgroundColor: '#ffffff', border: '1px solid #c9e2dc', borderRadius: 14, padding: 16, marginBottom: 18, textAlign: 'left' },
  cardTitle: { fontSize: 14, fontWeight: 700, color: '#1a2e2b', margin: '0 0 6px 0' },
  cardBody: { fontSize: 13, color: '#4a6b65', lineHeight: 1.5, margin: 0 },
  primaryButton: { width: '100%', minHeight: 48, padding: '12px 16px', backgroundColor: '#1a7f5a', color: '#ffffff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 10 },
  secondaryButton: { width: '100%', minHeight: 48, padding: '12px 16px', backgroundColor: '#ffffff', color: '#315e54', border: '2px solid #a7c9c1', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', marginBottom: 14 },
  footer: { fontSize: 12, color: '#4a6b65', lineHeight: 1.5, margin: 0 },
};
