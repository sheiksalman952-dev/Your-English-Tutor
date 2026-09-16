import React, { useState } from 'react';
import { ActiveView } from '../types';
import { LOGO_URL, USER_PROFILE_AVATAR } from '../data/mockData';

interface HeaderProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  onOpenMicCheck: () => void;
  onlineSpeakersCount?: number;
  isAnimeCompanion?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  onOpenMicCheck,
  onlineSpeakersCount = 1420,
  isAnimeCompanion = false
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f131c]/85 backdrop-blur-xl border-b border-[#262a33]/60 shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
      <div className="h-20 max-w-7xl mx-auto px-5 flex items-center justify-between gap-4">
        {/* Logo & Platform Badges */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveView('live-call')}
            className="flex items-center gap-2 text-left focus:outline-none group"
            title="SpeakFlow Home"
          >
            <img
              alt="SpeakFlow Logo"
              className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              src={LOGO_URL}
            />
            <span className="font-['Plus+Jakarta+Sans'] text-[18px] leading-6 text-[#dfe2ee] tracking-tight font-extrabold">
              SpeakFlow
            </span>
          </button>

          <span className="hidden lg:inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#262a33] text-[#4edea3] text-[11px] font-bold tracking-wider border border-[#4edea3]/20 shadow-[0_0_12px_rgba(78,222,163,0.15)]">
            100% Free Always
          </span>

          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#181c24] border border-[#262a33]/60">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
            <span className="text-[11px] font-semibold text-[#bbcabf]">
              {onlineSpeakersCount.toLocaleString()} Online Speakers
            </span>
          </div>

          {isAnimeCompanion && activeView === 'live-call' && (
            <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#262a33] text-[#4edea3] text-[11px] font-bold border border-[#4edea3]/30 shadow-[0_0_12px_rgba(78,222,163,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping" />
              Anime Sensei Mode Active
            </span>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => setActiveView('live-call')}
            className={`px-4 py-2 rounded-lg text-[14px] font-semibold transition-all ${
              activeView === 'live-call'
                ? 'bg-[#1c2028] text-[#4edea3] font-bold shadow-[0_0_16px_rgba(78,222,163,0.15)] border border-[#4edea3]/30'
                : 'text-[#bbcabf] hover:text-[#dfe2ee] hover:bg-[#181c24]'
            }`}
          >
            Live 1-on-1 Call
          </button>

          <button
            onClick={() => setActiveView('ai-coach')}
            className={`px-4 py-2 rounded-lg text-[14px] font-semibold transition-all ${
              activeView === 'ai-coach'
                ? 'bg-[#1c2028] text-[#4edea3] font-bold shadow-[0_0_16px_rgba(78,222,163,0.15)] border border-[#4edea3]/30'
                : 'text-[#bbcabf] hover:text-[#dfe2ee] hover:bg-[#181c24]'
            }`}
          >
            AI Fluency Coach
          </button>

          <button
            onClick={() => setActiveView('practice-rooms')}
            className={`px-4 py-2 rounded-lg text-[14px] font-semibold transition-all ${
              activeView === 'practice-rooms'
                ? 'bg-[#1c2028] text-[#4edea3] font-bold shadow-[0_0_16px_rgba(78,222,163,0.15)] border border-[#4edea3]/30'
                : 'text-[#bbcabf] hover:text-[#dfe2ee] hover:bg-[#181c24]'
            }`}
          >
            Practice Rooms
          </button>

          <button
            onClick={() => setActiveView('dashboard')}
            className={`px-4 py-2 rounded-lg text-[14px] font-semibold transition-all ${
              activeView === 'dashboard'
                ? 'bg-[#1c2028] text-[#4edea3] font-bold shadow-[0_0_16px_rgba(78,222,163,0.15)] border border-[#4edea3]/30'
                : 'text-[#bbcabf] hover:text-[#dfe2ee] hover:bg-[#181c24]'
            }`}
          >
            Fluency Dashboard
          </button>
        </nav>

        {/* Right User Controls & Status Indicators */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Mic Test */}
          <button
            onClick={onOpenMicCheck}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#181c24] hover:bg-[#1c2028] border border-[#262a33] text-[#bbcabf] hover:text-[#4edea3] transition-all text-[12px] font-medium"
            title="Quick Microphone & Speaker Test"
            type="button"
          >
            <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">mic</span>
            <span className="hidden sm:inline">Mic Check</span>
          </button>

          {/* Daily Speaking Streak */}
          <div
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#181c24] border border-[#262a33] text-[#dfe2ee] text-[12px] font-semibold"
            title="Daily Speaking Streak: 7 Days unbroken!"
          >
            <span className="text-base">🔥</span>
            <span className="font-bold">7 Days</span>
          </div>

          {/* Daily Goal 75% SVG Gauge */}
          <div
            className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#181c24] border border-[#262a33]"
            title="Daily Practice Target: 75% completed (18/25 mins)"
          >
            <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#262a33]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="text-[#4cd7f6]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="75, 100"
                strokeLinecap="round"
                strokeWidth="3"
              />
            </svg>
            <span className="absolute text-[9px] font-extrabold text-[#4cd7f6]">75%</span>
          </div>

          {/* User Profile Thumbnail & Level */}
          <button
            onClick={() => setActiveView('dashboard')}
            className="flex items-center gap-1.5 pl-1 focus:outline-none group"
            title="View Your Fluency Profile & Analytics"
          >
            <div className="relative">
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-[#4edea3]/50 group-hover:ring-[#4edea3] transition-all"
                src={USER_PROFILE_AVATAR}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#4edea3] ring-2 ring-[#0f131c]" />
            </div>
            <span
              className="px-1.5 py-0.5 rounded bg-[#4cd7f6]/15 text-[#4cd7f6] text-[11px] font-bold border border-[#4cd7f6]/30"
              title="CEFR Proficiency Level: B2 High Intermediate"
            >
              B2
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#181c24] text-[#bbcabf] hover:text-[#dfe2ee]"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#181c24] border-b border-[#262a33] px-5 py-3 flex flex-col gap-2">
          <button
            onClick={() => { setActiveView('live-call'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-[14px] font-semibold ${
              activeView === 'live-call' ? 'bg-[#262a33] text-[#4edea3]' : 'text-[#bbcabf]'
            }`}
          >
            Live 1-on-1 Call
          </button>
          <button
            onClick={() => { setActiveView('ai-coach'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-[14px] font-semibold ${
              activeView === 'ai-coach' ? 'bg-[#262a33] text-[#4edea3]' : 'text-[#bbcabf]'
            }`}
          >
            AI Fluency Coach
          </button>
          <button
            onClick={() => { setActiveView('practice-rooms'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-[14px] font-semibold ${
              activeView === 'practice-rooms' ? 'bg-[#262a33] text-[#4edea3]' : 'text-[#bbcabf]'
            }`}
          >
            Practice Rooms
          </button>
          <button
            onClick={() => { setActiveView('dashboard'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-[14px] font-semibold ${
              activeView === 'dashboard' ? 'bg-[#262a33] text-[#4edea3]' : 'text-[#bbcabf]'
            }`}
          >
            Fluency Dashboard
          </button>
        </div>
      )}
    </header>
  );
};
