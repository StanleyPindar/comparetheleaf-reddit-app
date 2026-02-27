import React from 'react';

interface WelcomeProps {
  onStart: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div style={styles.container}>
      <div style={styles.iconCircle}>
        <span style={styles.iconLeaf}>🌿</span>
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
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100%', padding: '40px 24px 32px', backgroundColor: '#f8fffe', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' },
  iconCircle: { width: 80, height: 80, borderRadius: '50%', backgroundColor: '#00a896', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, flexShrink: 0 },
  iconLeaf: { fontSize: 36 },
  title: { fontSize: 26, fontWeight: 800, color: '#1a2e2b', textAlign: 'center', margin: '0 0 14px 0', lineHeight: 1.25, maxWidth: 380 },
  subtitle: { fontSize: 15, color: '#4a6b65', textAlign: 'center', lineHeight: 1.6, margin: '0 0 28px 0', maxWidth: 380 },
  card: { width: '100%', maxWidth: 420, backgroundColor: '#ffffff', border: '1.5px solid #e0f0ee', borderRadius: 16, padding: '20px 24px', marginBottom: 28 },
  cardHeading: { fontSize: 14, fontWeight: 700, color: '#1a2e2b', marginBottom: 14 },
  checkRow: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 },
  checkIcon: { color: '#00a896', fontWeight: 700, fontSize: 16, flexShrink: 0 },
  checkText: { fontSize: 14, color: '#2d4a45' },
  ctaButton: { width: '100%', maxWidth: 420, padding: '18px 24px', backgroundColor: '#00a896', color: '#ffffff', border: 'none', borderRadius: 14, fontSize: 17, fontWeight: 700, cursor: 'pointer', marginBottom: 18, letterSpacing: '-0.2px' },
  footer: { fontSize: 12, color: '#9ab5b0', textAlign: 'center' },
  footerLink: { color: '#00a896', fontWeight: 600 },
};
