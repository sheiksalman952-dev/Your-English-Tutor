import React, { useState } from 'react';
import { ActiveView, CompanionMode } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LiveCallView } from './components/LiveCallView';
import { AiCoachView } from './components/AiCoachView';
import { PracticeRoomsView } from './components/PracticeRoomsView';
import { DashboardView } from './components/DashboardView';
import { MicCheckModal } from './components/MicCheckModal';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('live-call');
  const [companionMode, setCompanionMode] = useState<CompanionMode>('human');
  const [isMicCheckOpen, setIsMicCheckOpen] = useState(false);

  const handleJoinTable = (tableId: string) => {
    setCompanionMode('human');
    setActiveView('live-call');
  };

  const handleInstantPair = (level: string) => {
    setCompanionMode('human');
    setActiveView('live-call');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f131c] text-[#dfe2ee] selection:bg-[#4edea3]/30 selection:text-[#4edea3]">
      {/* Global Fixed Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenMicCheck={() => setIsMicCheckOpen(true)}
        isAnimeCompanion={companionMode === 'anime'}
      />

      {/* Main Content Area (Offset for fixed header) */}
      <main className="flex-1 pt-20 flex flex-col">
        {activeView === 'live-call' && (
          <LiveCallView
            initialCompanionMode={companionMode}
            onCompanionModeChange={(mode) => setCompanionMode(mode)}
          />
        )}

        {activeView === 'ai-coach' && (
          <AiCoachView />
        )}

        {activeView === 'practice-rooms' && (
          <PracticeRoomsView
            onJoinTable={handleJoinTable}
            onInstantPair={handleInstantPair}
          />
        )}

        {activeView === 'dashboard' && (
          <DashboardView
            onStartLiveCall={() => {
              setCompanionMode('human');
              setActiveView('live-call');
            }}
            onStartAiCoach={() => setActiveView('ai-coach')}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onOpenDiagnostics={() => setIsMicCheckOpen(true)} />

      {/* Audio Diagnostics / Mic Check Modal */}
      <MicCheckModal
        isOpen={isMicCheckOpen}
        onClose={() => setIsMicCheckOpen(false)}
      />
    </div>
  );
}
