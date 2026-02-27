import React from 'react';
import { navigateTo } from '@devvit/web/client';
import { MatchedClinic } from '../types';

interface ClinicResultsProps {
  clinics: MatchedClinic[];
  onBack: () => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ color: '#f5a623', fontSize: '14px' }}>
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(5 - full - (half ? 1 : 0))}
      <span style={{ color: '#888888', fontSize: '12px', marginLeft: '4px' }}>
        {rating.toFixed(1)}
      </span>
    </span>
  );
};

const ClinicCard: React.FC<{ clinic: MatchedClinic; rank: number }> = ({ clinic, rank }) => {
  const profileUrl = clinic.slug
    ? `https://comparetheleaf.co.uk/clinics/${clinic.slug}`
    : 'https://comparetheleaf.co.uk';

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={styles.rankBadge}>#{rank}</div>
        <div style={styles.clinicInfo}>
          <h3 style={styles.clinicName}>{clinic.name}</h3>
          {clinic.tagline && <p style={styles.clinicTagline}>{clinic.tagline}</p>}
        </div>
        {clinic.matchScore && (
          <div style={styles.matchScore}>
            <span style={styles.matchScoreNumber}>{clinic.matchScore}%</span>
            <span style={styles.matchScoreLabel}>match</span>
          </div>
         )}
      </div>
      {clinic.rating && (
        <div style={styles.ratingRow}>
          <StarRating rating={clinic.rating} />
        </div>
      )}
      {clinic.matchReasons && clinic.matchReasons.length > 0 && (
        <div style={styles.matchReasons}>
          {clinic.matchReasons.map((reason, i) => (
            <span key={i} style={styles.matchReason}>✓ {reason}</span>
          ))}
        </div>
      )}
      {(clinic.consultationPrice || clinic.followUpPrice) && (
        <div style={styles.pricingRow}>
          {clinic.consultationPrice && (
            <div style={styles.priceItem}>
              <span style={styles.priceLabel}>Initial consultation</span>
              <span style={styles.priceValue}>£{clinic.consultationPrice}</span>
            </div>
          )}
          {clinic.followUpPrice && (
            <div style={styles.priceItem}>
              <span style={styles.priceLabel}>Follow-up</span>
              <span style={styles.priceValue}>£{clinic.followUpPrice}</span>
            </div>
          )}
        </div>
      )}
      <button
        style={styles.ctaButton}
        onClick={() => navigateTo(profileUrl)}
      >
        View Full Profile on CompareTheLeaf →
      </button>
    </div>
  );
};

export const ClinicResults: React.FC<ClinicResultsProps> = ({ clinics, onBack }) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}>← Back</button>
        <div>
          <h2 style={styles.title}>Your Matched Clinics</h2>
          <p style={styles.subtitle}>{clinics.length} clinic{clinics.length !== 1 ? 's' : ''} matched to your profile</p>
        </div>
      </div>
      {clinics.length === 0 ? (
        <div style={styles.noClinics}>
          <p>No specific clinics matched your preferences. Browse all clinics on CompareTheLeaf.</p>
          <button style={styles.browseAllButton} onClick={() => navigateTo('https://comparetheleaf.co.uk/clinics' )}>
            Browse All Clinics →
          </button>
        </div>
      ) : (
        <div style={styles.clinicList}>
          {clinics.map((clinic, index) => (
            <ClinicCard key={clinic.id || index} clinic={clinic} rank={index + 1} />
          ))}
        </div>
      )}
      <div style={styles.footer}>
        <p style={styles.footerText}>
          Powered by{' '}
          <button style={styles.footerLinkButton} onClick={() => navigateTo('https://comparetheleaf.co.uk' )}>
            CompareTheLeaf.co.uk
          </button>
          {' '}— the UK's independent medical cannabis clinic comparison service.
        </p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { padding: '20px 20px 32px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', maxWidth: '480px', margin: '0 auto' },
  header: { marginBottom: '20px' },
  backButton: { background: 'none', border: 'none', color: '#1a7f5a', fontSize: '14px', fontWeight: '500', cursor: 'pointer', padding: '0 0 8px 0' },
  title: { fontSize: '20px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 4px 0' },
  subtitle: { fontSize: '13px', color: '#888888', margin: 0 },
  clinicList: { display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' },
  card: { backgroundColor: '#ffffff', border: '1px solid #e8e8e8', borderRadius: '14px', padding: '18px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  cardHeader: { display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' },
  rankBadge: { flexShrink: 0, width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#1a7f5a', color: '#ffffff', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  clinicInfo: { flex: 1 },
  clinicName: { fontSize: '16px', fontWeight: '700', color: '#1a1a1a', margin: '0 0 3px 0' },
  clinicTagline: { fontSize: '12px', color: '#888888', margin: 0 },
  matchScore: { display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 },
  matchScoreNumber: { fontSize: '18px', fontWeight: '700', color: '#1a7f5a', lineHeight: '1' },
  matchScoreLabel: { fontSize: '10px', color: '#888888' },
  ratingRow: { marginBottom: '10px' },
  matchReasons: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' },
  matchReason: { fontSize: '12px', color: '#2d6b4e', backgroundColor: '#f0faf5', padding: '4px 10px', borderRadius: '12px', fontWeight: '500' },
  pricingRow: { display: 'flex', gap: '16px', marginBottom: '14px', backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '10px 14px' },
  priceItem: { display: 'flex', flexDirection: 'column', gap: '2px' },
  priceLabel: { fontSize: '11px', color: '#aaaaaa' },
  priceValue: { fontSize: '16px', fontWeight: '700', color: '#1a1a1a' },
  ctaButton: { display: 'block', width: '100%', padding: '12px', backgroundColor: '#1a7f5a', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', textAlign: 'center', boxSizing: 'border-box' },
  noClinics: { textAlign: 'center', padding: '32px 20px', color: '#666666', fontSize: '14px' },
  browseAllButton: { display: 'inline-block', marginTop: '12px', color: '#1a7f5a', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' },
  footer: { borderTop: '1px solid #f0f0f0', paddingTop: '16px', textAlign: 'center' },
  footerText: { fontSize: '12px', color: '#aaaaaa', margin: 0, lineHeight: '1.5' },
  footerLinkButton: { color: '#1a7f5a', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', padding: 0 },
};
