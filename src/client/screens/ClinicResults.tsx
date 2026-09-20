import React from 'react';
import { navigateTo } from '@devvit/web/client';
import { MatchedClinic } from '../types';

type ClinicResultsProps = {
  clinics: MatchedClinic[];
  onBack: () => void;
};

const StarRating: React.FC<{ rating: number; reviewCount: number | null }> = ({ rating, reviewCount }) => (
  <p style={styles.rating}>
    <span aria-hidden="true">★</span> {rating.toFixed(1)}
    {reviewCount !== null && <span style={styles.reviewCount}> ({reviewCount} reviews)</span>}
  </p>
);

const ClinicCard: React.FC<{ clinic: MatchedClinic; rank: number }> = ({ clinic, rank }) => (
  <article style={styles.card}>
    <div style={styles.cardHeader}>
      <span style={styles.rankBadge}>#{rank}</span>
      <div style={styles.clinicInfo}>
        <h2 style={styles.clinicName}>{clinic.name}</h2>
        {clinic.description && <p style={styles.description}>{clinic.description}</p>}
      </div>
      <div style={styles.matchScore} aria-label={`${clinic.matchScore}% match`}>
        <span style={styles.matchScoreNumber}>{clinic.matchScore}%</span>
        <span style={styles.matchScoreLabel}>match</span>
      </div>
    </div>

    {clinic.rating !== null && <StarRating rating={clinic.rating} reviewCount={clinic.reviewCount} />}

    {clinic.pros.length > 0 && (
      <ul style={styles.pros} aria-label="Clinic highlights">
        {clinic.pros.map((pro) => <li key={pro} style={styles.pro}>{pro}</li>)}
      </ul>
    )}

    <div style={styles.facts}>
      {clinic.priceFrom !== null && <span>Initial consultation from £{clinic.priceFrom}</span>}
      {clinic.nextAvailable && <span>{clinic.nextAvailable}</span>}
    </div>

    {clinic.verdictSummary && <p style={styles.verdict}>{clinic.verdictSummary}</p>}
    <button type="button" style={styles.ctaButton} onClick={() => navigateTo(clinic.profileUrl)}>
      View {clinic.name} →
    </button>
  </article>
);

export const ClinicResults: React.FC<ClinicResultsProps> = ({ clinics, onBack }) => (
  <div style={styles.container}>
    <button type="button" style={styles.backButton} onClick={onBack}>← Back to result</button>
    <h1 id="screen-title" tabIndex={-1} style={styles.title}>Compare clinic information</h1>
    <p style={styles.subtitle}>{clinics.length} option{clinics.length === 1 ? '' : 's'} matched to the preferences you selected.</p>

    {clinics.length === 0 ? (
      <div style={styles.noClinics}>
        <p style={styles.noClinicsText}>No specific clinic was matched. You can still browse and compare the current clinic directory.</p>
        <button type="button" style={styles.browseButton} onClick={() => navigateTo('https://comparetheleaf.co.uk/clinics')}>Browse all clinics →</button>
      </div>
    ) : (
      <div style={styles.list}>
        {clinics.map((clinic, index) => <ClinicCard key={clinic.id} clinic={clinic} rank={index + 1} />)}
      </div>
    )}

    <p style={styles.footer}>CompareTheLeaf is an information and comparison platform, not a clinic. Clinic information can change; check each profile for current details.</p>
  </div>
);

const styles: Record<string, React.CSSProperties> = {
  container: { padding: '20px 20px 32px', maxWidth: 480, margin: '0 auto' },
  backButton: { minHeight: 44, padding: '8px 0', background: 'none', border: 'none', color: '#315e54', fontSize: 14, fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', marginBottom: 6 },
  title: { fontSize: 22, fontWeight: 750, color: '#1a2e2b', margin: '0 0 5px 0', outline: 'none' },
  subtitle: { fontSize: 14, color: '#4a6b65', lineHeight: 1.5, margin: '0 0 18px 0' },
  list: { display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 },
  card: { backgroundColor: '#ffffff', border: '1px solid #c9e2dc', borderRadius: 14, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' },
  cardHeader: { display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  rankBadge: { flexShrink: 0, width: 28, height: 28, borderRadius: '50%', backgroundColor: '#1a7f5a', color: '#ffffff', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  clinicInfo: { flex: 1, minWidth: 0 },
  clinicName: { fontSize: 17, fontWeight: 750, color: '#1a2e2b', margin: '0 0 4px 0', overflowWrap: 'anywhere' },
  description: { fontSize: 13, color: '#4a6b65', lineHeight: 1.45, margin: 0, overflowWrap: 'anywhere' },
  matchScore: { display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 },
  matchScoreNumber: { fontSize: 17, fontWeight: 750, color: '#1a7f5a', lineHeight: 1 },
  matchScoreLabel: { fontSize: 11, color: '#4a6b65', marginTop: 2 },
  rating: { color: '#7a5300', fontSize: 13, fontWeight: 700, margin: '0 0 10px 0' },
  reviewCount: { color: '#4a6b65', fontWeight: 500 },
  pros: { display: 'flex', flexWrap: 'wrap', gap: 6, listStyle: 'none', padding: 0, margin: '0 0 12px 0' },
  pro: { fontSize: 12, color: '#315e54', backgroundColor: '#eef7f4', borderRadius: 999, padding: '5px 9px', overflowWrap: 'anywhere' },
  facts: { display: 'flex', flexDirection: 'column', gap: 4, backgroundColor: '#f4f8f7', borderRadius: 8, padding: '10px 12px', color: '#315e54', fontSize: 13, lineHeight: 1.4, marginBottom: 10 },
  verdict: { color: '#4a6b65', fontSize: 13, lineHeight: 1.5, margin: '0 0 12px 0' },
  ctaButton: { width: '100%', minHeight: 48, padding: '12px', backgroundColor: '#1a7f5a', color: '#ffffff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer' },
  noClinics: { backgroundColor: '#ffffff', border: '1px solid #c9e2dc', borderRadius: 14, padding: 20, textAlign: 'center', marginBottom: 20 },
  noClinicsText: { color: '#315e54', fontSize: 14, lineHeight: 1.5, margin: '0 0 14px 0' },
  browseButton: { minHeight: 44, padding: '10px 14px', backgroundColor: '#1a7f5a', color: '#ffffff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer' },
  footer: { fontSize: 12, color: '#4a6b65', textAlign: 'center', lineHeight: 1.5, margin: 0 },
};
