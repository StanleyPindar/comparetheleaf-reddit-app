import React from 'react';

interface WelcomeProps {
  onStart: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div style={styles.container}>
      {/* CompareTheLeaf wordmark — replaces generic green circle */}
      <div style={styles.logoWrap}>
        <span style={styles.logoLeaf}>🌿</span>
        <span style={styles.logoText}>CompareTheLeaf</span>
      </div>
      <h1 style={styles.title}>UK Medical Cannabis Eligibility Checker</h1>
      <p style={styles.subtitle}>
        Find out if you qualify for a medical cannabis prescription in under 2 minutes — and discover which clinic is right for you.
      </p>
      <div style={styles.card}>
        <p style={styles.cardHeading}>What to expect:</p>
        {[
          '4 simple questions — no free text',
          'Instant eligibility result',
          'Personalised clinic recommendations',
          'Completely private and anonymous',
        ].map((item) => (
          <div key={item} style={styles.checkRow}>
            <span style={styles.checkIcon}>✓</span>
            <span style={styles.checkText}>{item}</span>
          </div>
        ))}
      </div>
      <button style={styles.ctaButton} onClick={onStart}>
        Check My Eligibility →
      </button>
      <p style={styles.footer}>
        Powered by <span style={styles.footerLink}>CompareTheLeaf.co.uk</span>
      </p>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 24px 36px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  logoWrap: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 },
  logoLeaf: { fontSize: 26 },
  logoText: { fontSize: 21, fontWeight: 800, color: '#00a896', letterSpacing: '-0.5px' },
  title: { fontSize: 22, fontWeight: 800, color: '#1a2e2b', textAlign: 'center', margin: '0 0 10px 0', lineHeight: 1.25, maxWidth: 380 },
  subtitle: { fontSize: 14, color: '#4a6b65', textAlign: 'center', lineHeight: 1.6, margin: '0 0 20px 0', maxWidth: 380 },
  card: { width: '100%', maxWidth: 420, backgroundColor: '#ffffff', border: '1.5px solid #e0f0ee', borderRadius: 16, padding: '16px 20px', marginBottom: 22 },
  cardHeading: { fontSize: 13, fontWeight: 700, color: '#1a2e2b', marginBottom: 11 },
  checkRow: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 },
  checkIcon: { color: '#00a896', fontWeight: 700, fontSize: 15, flexShrink: 0 },
  checkText: { fontSize: 13, color: '#2d4a45' },
  ctaButton: { width: '100%', maxWidth: 420, padding: '16px 24px', backgroundColor: '#00a896', color: '#ffffff', border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 14, letterSpacing: '-0.2px' },
  footer: { fontSize: 11, color: '#9ab5b0', textAlign: 'center' },
  footerLink: { color: '#00a896', fontWeight: 600 },
};
