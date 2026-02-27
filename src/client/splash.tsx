import './index.css';
import { requestExpandedMode } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const Splash = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f8fffe', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', padding: '32px 24px', gap: 0 }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', backgroundColor: '#00a896', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        <span style={{ fontSize: 32 }}>🌿</span>
      </div>
      <h1 style={{ fontSize: 20, fontWeight: 800, color: '#1a2e2b', textAlign: 'center', margin: '0 0 10px 0', lineHeight: 1.3, maxWidth: 300 }}>
        UK Medical Cannabis Eligibility Checker
      </h1>
      <p style={{ fontSize: 13, color: '#4a6b65', textAlign: 'center', margin: '0 0 24px 0', lineHeight: 1.5, maxWidth: 280 }}>
        Find out if you qualify in under 2 minutes
      </p>
      <button
        style={{ backgroundColor: '#00a896', color: '#ffffff', border: 'none', borderRadius: 12, padding: '14px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 16 }}
        onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
      >
        Check My Eligibility →
      </button>
      <p style={{ fontSize: 11, color: '#9ab5b0' }}>Powered by CompareTheLeaf.co.uk</p>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
