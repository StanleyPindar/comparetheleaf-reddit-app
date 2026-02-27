import React from 'react';

interface ResultIneligibleProps {
  onRetake: () => void;
}

export const ResultIneligible: React.FC<ResultIneligibleProps> = ({ onRetake }) => {
  return (
    <div className="flex flex-col min-h-screen p-6 bg-[#f8fffe]">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#fff3e0] mb-4">
            <span className="text-3xl">💛</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1a2e2b] mb-2">
            Not quite eligible yet
          </h1>
          <p className="text-sm text-[#4a6b65] leading-relaxed">
            Based on your answers, you may not yet meet the current UK criteria for a medical cannabis prescription. UK guidelines require patients to have tried at least 2 licensed treatments first.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#e0f0ee] p-5 mb-6">
          <h2 className="text-sm font-semibold text-[#1a2e2b] mb-3">What you can do next:</h2>
          <ul className="space-y-3">
            {[
              { icon: '🏥', text: 'Speak to your GP about trying additional licensed treatments' },
              { icon: '📋', text: 'Keep a symptom diary to support your case' },
              { icon: '🔁', text: 'Check your eligibility again after trying more treatments' },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#4a6b65]">
                <span className="text-lg leading-none">{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href="https://www.nhs.uk/conditions/medical-cannabis/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-4 border-2 border-[#00a896] text-[#00a896] font-semibold rounded-xl text-center text-base mb-3 hover:bg-[#e6f7f5] transition-colors"
        >
          NHS Medical Cannabis Guide →
        </a>

        <button
          onClick={onRetake}
          className="w-full py-3 border-2 border-[#e0f0ee] text-[#4a6b65] font-medium rounded-xl transition-colors text-sm hover:border-[#00a896]"
        >
          Start Over
        </button>

        <p className="text-center text-xs text-[#8aaba5] mt-4">
          Powered by <span className="font-medium text-[#00a896]">CompareTheLeaf.co.uk</span>
        </p>
      </div>
    </div>
   );
};
