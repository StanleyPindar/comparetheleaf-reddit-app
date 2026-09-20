import React from 'react';
import { navigateTo } from '@devvit/web/client';
import { MatchedClinic } from '../types';

type ResultEligibleProps = {
  clinics: MatchedClinic[];
  onViewClinics: () => void;
  onRetake: () => void;
};

export const ResultEligible: React.FC<ResultEligibleProps> = ({ clinics, onViewClinics, onRetake }) => {
  const topClinic = clinics[0];

  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        <p style={styles.eyebrow}>Your preliminary result</p>
        <h1 id="screen-title" tabIndex={-1} style={styles.title}>Clinic information matched to your answers</h1>
        <p style={styles.subtitle}>This is a guide to comparing clinic information, not a medical assessment. A specialist doctor makes any clinical decision.</p>
      </section>

      {topClinic ? (
        <section style={styles.topCard} aria-label="Top clinic comparison result">
          <div style={styles.topLabel}>Top comparison option</div>
          <h2 style={styles.clinicName}>{topClinic.name}</h2>
          {topClinic.description && <p style={styles.description}>{topClinic.description}</p>}
          <div style={styles.summaryRow}>
            {topClinic.priceFrom !== null && <span>From £{topClinic.priceFrom} initial consultation</span>}
            {topClinic.nextAvailable && <span>{topClinic.nextAvailable}</span>}
          </div>
          <button type="button" style={styles.primaryButton} onClick={() => navigateTo(topClinic.profileUrl)}>
            View {topClinic.name} on CompareTheLeaf →
          </button>
        </section>
      ) : (
        <section style={styles.noMatchCard}>
          <h2 style={styles.noMatchTitle}>No specific clinic was matched</h2>
          <p style={styles.noMatchText}>You can still browse current clinic information and compare practical differences yourself.</p>
          <button type="button" style={styles.primaryButton} onClick={() => navigateTo('https://comparetheleaf.co.uk/clinics')}>
            Browse all clinics →
          </button>
        </section>
      )}

      {clinics.length > 1 && (
        <button type="button" style={styles.secondaryButton} onClick={onViewClinics}>
          Compare all {clinics.length} options
        </button>
      )}
      <button type="button" style={styles.retakeButton} onClick={onRetake}>Start again</button>
      <p style={styles.disclaimer}>CompareTheLeaf is an information and comparison platform, not a clinic. It does not provide medical advice or prescriptions.</p>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { padding: '20px 20px 32px', maxWidth: 480, margin: '0 auto' },
  hero: { textAlign: 'center', marginBottom: 16 },
  eyebrow: { fontSize: 13, fontWeight: 700, color: '#1a7f5a', margin: '0 0 6px 0' },
  title: { fontSize: 22, fontWeight: 750, color: '#1a2e2b', lineHeight: 1.25, margin: '0 0 10px 0', outline: 'none' },
  subtitle: { fontSize: 14, color: '#315e54', lineHeight: 1.55, margin: 0 },
  topCard: { backgroundColor: '#ffffff', border: '1px solid #b9dcd2', borderRadius: 16, padding: 18, marginBottom: 12, boxShadow: '0 3px 12px rgba(26, 127, 90, 0.08)' },
  topLabel: { display: 'inline-block', backgroundColor: '#e6f7f0', color: '#1a7f5a', borderRadius: 999, padding: '5px 9px', fontSize: 12, fontWeight: 700, marginBottom: 10 },
  clinicName: { color: '#1a2e2b', fontSize: 21, fontWeight: 750, margin: '0 0 7px 0', overflowWrap: 'anywhere' },
  description: { fontSize: 14, color: '#315e54', lineHeight: 1.5, margin: '0 0 12px 0' },
  summaryRow: { display: 'flex', flexDirection: 'column', gap: 5, color: '#4a6b65', fontSize: 13, lineHeight: 1.4, marginBottom: 14 },
  primaryButton: { width: '100%', minHeight: 48, padding: '12px 16px', backgroundColor: '#1a7f5a', color: '#ffffff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', lineHeight: 1.3 },
  noMatchCard: { backgroundColor: '#ffffff', border: '1px solid #c9e2dc', borderRadius: 16, padding: 18, marginBottom: 12, textAlign: 'left' },
  noMatchTitle: { color: '#1a2e2b', fontSize: 18, fontWeight: 750, margin: '0 0 7px 0' },
  noMatchText: { color: '#315e54', fontSize: 14, lineHeight: 1.5, margin: '0 0 16px 0' },
  secondaryButton: { width: '100%', minHeight: 48, padding: '12px 16px', backgroundColor: '#ffffff', color: '#1a7f5a', border: '2px solid #1a7f5a', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', marginBottom: 10 },
  retakeButton: { width: '100%', minHeight: 44, background: 'none', color: '#315e54', border: 'none', fontSize: 14, fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', marginBottom: 12 },
  disclaimer: { fontSize: 12, color: '#4a6b65', textAlign: 'center', lineHeight: 1.5, margin: 0 },
};
