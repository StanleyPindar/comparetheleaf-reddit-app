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
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#f8fffe]">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#e6f7f5] mb-6">
          <div className="w-8 h-8 border-4 border-[#00a896] border-t-transparent rounded-full animate-spin" />
        </div>
        <h2 className="text-xl font-bold text-[#1a2e2b] mb-2">Analysing your answers</h2>
        <p className="text-sm text-[#4a6b65] transition-all duration-300">{MESSAGES[msgIndex]}</p>
      </div>
    </div>
  );
};
