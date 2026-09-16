import React from 'react';

interface FooterProps {
  onOpenDiagnostics?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDiagnostics }) => {
  return (
    <footer className="w-full bg-[#181c24] py-6 border-t border-[#262a33]/60 shadow-[0_-1px_8px_rgba(0,0,0,0.2)]">
      <div className="max-w-7xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="font-['Plus+Jakarta+Sans'] text-[16px] text-[#dfe2ee] font-extrabold tracking-tight">
            SpeakFlow
          </span>
          <span className="text-[#bbcabf] text-[13px]">
            • Free Authentic Conversational English for Everyone
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[#bbcabf] text-[12px] font-medium">
          <button
            onClick={() => alert("SpeakFlow adheres to strict privacy: voice streams are processed ephemerally in-session and never stored without consent.")}
            className="hover:text-[#dfe2ee] transition-colors"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => alert("SpeakFlow Community Standards: Zero judgment, constructive encouragement, patient listening, and respectful turn-taking across all languages.")}
            className="hover:text-[#dfe2ee] transition-colors"
          >
            Community Guidelines
          </button>
          <button
            onClick={onOpenDiagnostics}
            className="hover:text-[#4edea3] transition-colors text-[#4cd7f6] flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">tune</span>
            <span>Audio Diagnostics</span>
          </button>
          <span className="text-[#86948a]">© 2025 SpeakFlow</span>
        </div>
      </div>
    </footer>
  );
};
