import React from 'react';
import { navigateTo } from '@devvit/web/client';
import { MatchedClinic } from '../types';

interface ResultEligibleProps {
  clinics: MatchedClinic[];
  onViewClinics: () => void;
  onRetake: () => void;
}

export const ResultEligible: React.FC<ResultEligibleProps> = ({
  clinics,
  onViewClinics,
  onRetake,
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.checkIcon}>✅</div>
        <h1 style={styles.heroTitle}>You Are Likely Eligible!</h1>
        <p style={styles.heroSubtitle}>
          Based on your answers, you meet the minimum criteria for a medical cannabis consultation in the UK.
        </p>
      </div>
      <div style={styles.infoBox}>
        <h3 style={styles.infoTitle}>What this means</h3>
        <p style={styles.infoText}>
          UK medical cannabis has been legally available since 2018. A specialist doctor can assess your case and, if appropriate, issue a prescription. The next step is booking a consultation with a licensed clinic.
        </p>
      </div>
      {clinics.length > 0 && (
        <div style={styles.clinicTeaser}>
          <span style={styles.clinicCount}>{clinics.length}</span>
          <span style={styles.clinicTeaserText}>
            {clinics.length === 1 ? 'clinic matched' : 'clinics matched'} for your profile
          </span>
        </div>
      )}
      <button style={styles.primaryCta} onClick={onViewClinics}>
        🏥 View My Matched Clinics
      </button>
      <button
        style={styles.secondaryCta}
        onClick={() => navigateTo('https://comparetheleaf.co.uk' )}
      >
        Browse All Clinics on CompareTheLeaf →
      </button>
      <p style={styles.disclaimer}>
        This is an assessment, not a medical diagnosis. A final decision rests with a specialist doctor.
      </p>
      <button style={styles.retakeLink} onClick={onRetake}>
        Start again
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { padding: '16px 20px 28px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', maxWidth: '480px', margin: '0 auto' },
  hero: { textAlign: 'center', marginBottom: '14px', padding: '18px 16px', backgroundColor: '#f0faf5', borderRadius: '14px', border: '1px solid #c3e6d5' },
  checkIcon: { fontSize: '36px', marginBottom: '8px' },
  heroTitle: { fontSize: '20px', fontWeight: '700', color: '#1a7f5a', margin: '0 0 8px 0' },
  heroSubtitle: { fontSize: '13px', color: '#2d6b4e', margin: 0, lineHeight: '1.5' },
  infoBox: { backgroundColor: '#ffffff', border: '1px solid #e8e8e8', borderRadius: '10px', padding: '14px', marginBottom: '12px' },
  infoTitle: { fontSize: '13px', fontWeight: '600', color: '#444444', margin: '0 0 6px 0' },
  infoText: { fontSize: '13px', color: '#666666', margin: 0, lineHeight: '1.5' },
  clinicTeaser: { display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#fff8e1', border: '1px solid #ffe082', borderRadius: '10px', padding: '10px 14px', marginBottom: '14px' },
  clinicCount: { fontSize: '24px', fontWeight: '700', color: '#e65100' },
  clinicTeaserText: { fontSize: '14px', color: '#555555', fontWeight: '500' },
  primaryCta: { display: 'block', width: '100%', padding: '14px', backgroundColor: '#1a7f5a', color: '#ffffff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginBottom: '10px', textAlign: 'center' },
  secondaryCta: { display: 'block', width: '100%', padding: '12px', backgroundColor: '#ffffff', color: '#1a7f5a', border: '2px solid #1a7f5a', borderRadius: '12px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', marginBottom: '16px', textAlign: 'center', boxSizing: 'border-box' },
  disclaimer: { fontSize: '11px', color: '#aaaaaa', textAlign: 'center', lineHeight: '1.5', margin: '0 0 10px 0' },
  retakeLink: { display: 'block', width: '100%', background: 'none', border: 'none', color: '#aaaaaa', fontSize: '12px', cursor: 'pointer', textAlign: 'center', textDecoration: 'underline' },
};
