import './index.css';
import { requestExpandedMode } from '@devvit/web/client';
import { StrictMode, type CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';

export const Splash = () => (
  <main style={styles.page}>
    <img
      src="/comparetheleaf-wordmark.webp"
      alt="CompareTheLeaf"
      style={styles.logo}
    />
    <h1 style={styles.title}>Clinic comparison, in one short guide</h1>
    <p style={styles.subtitle}>Answer four quick questions to explore current clinic information and practical differences.</p>
    <button
      type="button"
      style={styles.button}
      onClick={(event) => requestExpandedMode(event.nativeEvent, 'game')}
    >
      Open checker →
    </button>
    <p style={styles.footer}>CompareTheLeaf is an information and comparison platform, not a clinic.</p>
  </main>
);

const styles: Record<string, CSSProperties> = {
  page: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f8fffe', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', padding: '32px 24px', textAlign: 'center' },
  logo: { width: 190, height: 'auto', marginBottom: 24 },
  title: { fontSize: 22, fontWeight: 750, color: '#1a2e2b', lineHeight: 1.25, margin: '0 0 10px 0', maxWidth: 340 },
  subtitle: { fontSize: 14, color: '#315e54', lineHeight: 1.55, margin: '0 0 24px 0', maxWidth: 320 },
  button: { minHeight: 48, padding: '12px 26px', backgroundColor: '#1a7f5a', color: '#ffffff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 16 },
  footer: { fontSize: 12, color: '#4a6b65', lineHeight: 1.45, maxWidth: 320, margin: 0 },
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
