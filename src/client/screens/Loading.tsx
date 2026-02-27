import React, { useEffect, useState } from 'react';

const MESSAGES = [
  'Checking your eligibility...',
  'Reviewing treatment history...',
  'Matching you with clinics...',
  'Almost there...',
];

export const Loading: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: 24 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '50%', backgroundColor: '#e6f7f5', marginBottom: 24 }}>
          <div style={{ width: 32, height: 32, border: '4px solid #00a896', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1a2e2b', margin: '0 0 8px 0' }}>Analysing your answers</h2>
        <p style={{ fontSize: 14, color: '#4a6b65' }}>{MESSAGES[msgIndex]}</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
