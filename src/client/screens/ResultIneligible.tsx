import React from 'react';

interface ResultIneligibleProps {
  onRetake: () => void;
}

export const ResultIneligible: React.FC<ResultIneligibleProps> = ({ onRetake }) => (
  <div style={s.page}>
    <div style={s.inner}>
      <div style={s.center}>
        <div style={s.iconCircle}><span style={{ fontSize: 30 }}>💛</span></div>
        <h1 style={s.title}>Not quite eligible yet</h1>
        <p style={s.body}>Based on your answers, you may not yet meet the current UK criteria for a medical cannabis prescription. UK guidelines require patients to have tried at least 2 licensed treatments first.</p>
      </div>
      <div style={s.card}>
        <p style={s.cardTitle}>What you can do next:</p>
        {[
          { icon: '🏥', text: 'Speak to your GP about trying additional licensed treatments' },
          { icon: '📋', text: 'Keep a symptom diary to support your case' },
          { icon: '🔁', text: 'Check your eligibility again after trying more treatments' },
        ].map((item, i) => (
          <div key={i} style={s.row}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ fontSize: 14, color: '#4a6b65' }}>{item.text}</span>
          </div>
        ))}
      </div>
      <a href="https://www.nhs.uk/conditions/medical-cannabis/" target="_blank" rel="noopener noreferrer" style={s.nhsLink}>
        NHS Medical Cannabis Guide
      </a>
      <button onClick={onRetake} style={s.retakeBtn}>Start Over</button>
      <p style={s.footer}>Powered by <span style={{ color: '#00a896', fontWeight: 600 }}>CompareTheLeaf.co.uk</span></p>
    </div>
  </div>
);

const s: Record<string, React.CSSProperties> = {
  page: { padding: '24px 20px 48px' },
  inner: { maxWidth: 440, margin: '0 auto' },
  center: { textAlign: 'center', marginBottom: 28 },
  iconCircle: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '50%', backgroundColor: '#fff3e0', marginBottom: 16 },
  title: { fontSize: 22, fontWeight: 700, color: '#1a2e2b', margin: '0 0 10px 0' },
  body: { fontSize: 14, color: '#4a6b65', lineHeight: 1.6, margin: 0 },
  card: { backgroundColor: '#ffffff', border: '1.5px solid #e0f0ee', borderRadius: 16, padding: '18px 20px', marginBottom: 20 },
  cardTitle: { fontSize: 14, fontWeight: 600, color: '#1a2e2b', margin: '0 0 14px 0' },
  row: { display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  nhsLink: { display: 'block', width: '100%', padding: '14px 0', border: '2px solid #00a896', color: '#00a896', borderRadius: 12, textAlign: 'center', fontSize: 15, fontWeight: 600, textDecoration: 'none', marginBottom: 12, boxSizing: 'border-box' },
  retakeBtn: { width: '100%', padding: '14px 0', border: '2px solid #e0f0ee', backgroundColor: 'transparent', color: '#4a6b65', borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: 'pointer', marginBottom: 16 },
  footer: { textAlign: 'center', fontSize: 12, color: '#9ab5b0' },
};
