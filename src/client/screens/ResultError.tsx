import React from 'react';

type ResultErrorProps = {
  message: string;
  onRetry: () => void;
  onBack: () => void;
};

export const ResultError: React.FC<ResultErrorProps> = ({ message, onRetry, onBack }) => (
  <div style={styles.page}>
    <div style={styles.inner}>
      <div style={styles.icon} aria-hidden="true">↻</div>
      <h1 id="screen-title" tabIndex={-1} style={styles.title}>We could not finish that check</h1>
      <p style={styles.body}>{message}</p>
      <div style={styles.card}>
        <p style={styles.cardTitle}>Your answers are still on this screen</p>
        <p style={styles.cardBody}>You can try again now, or go back to review your last answer. We have not saved this quiz response.</p>
      </div>
      <button type="button" onClick={onRetry} style={styles.retryButton}>Try again</button>
      <button type="button" onClick={onBack} style={styles.backButton}>← Review my answers</button>
    </div>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  page: { padding: '40px 20px', minHeight: '100%', display: 'flex', alignItems: 'center' },
  inner: { maxWidth: 440, margin: '0 auto', width: '100%', textAlign: 'center' },
  icon: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 58, height: 58, borderRadius: '50%', backgroundColor: '#eef5f3', color: '#315e54', fontSize: 34, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: 750, color: '#1a2e2b', margin: '0 0 10px 0', outline: 'none' },
  body: { fontSize: 15, color: '#315e54', lineHeight: 1.55, margin: '0 0 20px 0' },
  card: { backgroundColor: '#ffffff', border: '1px solid #c9e2dc', borderRadius: 14, padding: '16px', marginBottom: 18, textAlign: 'left' },
  cardTitle: { fontSize: 14, fontWeight: 700, color: '#1a2e2b', margin: '0 0 6px 0' },
  cardBody: { fontSize: 13, lineHeight: 1.5, color: '#4a6b65', margin: 0 },
  retryButton: { display: 'block', width: '100%', minHeight: 48, backgroundColor: '#1a7f5a', color: '#ffffff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 10 },
  backButton: { display: 'block', width: '100%', minHeight: 48, backgroundColor: '#ffffff', color: '#315e54', border: '2px solid #a7c9c1', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer' },
};
