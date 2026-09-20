import React from 'react';

type LoadingProps = {
  onCancel: () => void;
};

export const Loading: React.FC<LoadingProps> = ({ onCancel }) => (
  <div style={styles.page}>
    <div style={styles.content} role="status" aria-live="polite">
      <div style={styles.spinnerWrap} aria-hidden="true">
        <div style={styles.spinner} />
      </div>
      <h1 id="screen-title" tabIndex={-1} style={styles.title}>Finding clinic information</h1>
      <p style={styles.message}>This can take a few seconds. You can cancel and keep your answers if needed.</p>
      <button type="button" onClick={onCancel} style={styles.cancelButton}>Cancel and go back</button>
    </div>
    <style>{`@media (prefers-reduced-motion: no-preference) { @keyframes spin { to { transform: rotate(360deg); } } }`}</style>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  page: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: 24 },
  content: { textAlign: 'center', maxWidth: 320 },
  spinnerWrap: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '50%', backgroundColor: '#e6f7f0', marginBottom: 24 },
  spinner: { width: 32, height: 32, border: '4px solid #1a7f5a', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  title: { fontSize: 20, fontWeight: 750, color: '#1a2e2b', margin: '0 0 8px 0', outline: 'none' },
  message: { fontSize: 14, color: '#4a6b65', lineHeight: 1.5, margin: '0 0 20px 0' },
  cancelButton: { minHeight: 44, padding: '10px 14px', background: 'none', border: 'none', color: '#315e54', textDecoration: 'underline', cursor: 'pointer', fontSize: 14, fontWeight: 700 },
};
