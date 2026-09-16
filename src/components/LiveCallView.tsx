import React, { useState, useEffect } from 'react';
import { CompanionMode, VocabularyItem } from '../types';
import {
  ELENA_AVATAR,
  ANIME_SENSEI_AVATAR,
  USER_AVATAR,
  TARGET_VOCABULARY,
  GRAMMAR_WHISPERS
} from '../data/mockData';
import { speakEnglish } from '../utils/audio';

interface LiveCallViewProps {
  initialCompanionMode?: CompanionMode;
  onCompanionModeChange?: (mode: CompanionMode) => void;
}

const TOPICS = [
  {
    title: "Remote Autonomy vs. In-Office Synergies",
    description: "Explore how distributed teams navigate asynchronous collaboration, spontaneous innovation, and psychological workplace safety.",
    curatedFor: "Curated for B2 ➔ C1",
    questions: [
      "How do you maintain spontaneous connection with colleagues when you rarely meet in person?",
      "Has working remotely shifted your personal definition of work-life boundaries?",
      "What is one corporate ritual you believe should be discarded forever in modern teams?"
    ]
  },
  {
    title: "AI Automation in Creative & Strategic Work",
    description: "Debate whether generative AI models expand human creativity or automate away essential junior apprenticeships.",
    curatedFor: "Curated for C1 ➔ C2",
    questions: [
      "What is an area of your daily work where you refuse to delegate to artificial intelligence?",
      "How can organizations cultivate original strategic thinking when everyone uses the same LLMs?",
      "Do you believe conversational fluency in English is more or less critical in an AI-translated world?"
    ]
  },
  {
    title: "Global Relocation, Culture Shock & Identity",
    description: "Share personal stories on adapting to foreign idioms, cross-cultural team dynamics, and overcoming linguistic anxiety.",
    curatedFor: "Curated for B1 ➔ B2",
    questions: [
      "What was the most surprising cultural idiom or etiquette rule you had to unlearn?",
      "How do you handle moments where you cannot find the precise English word you want?",
      "What advice would you give someone feeling anxious before their very first English interview?"
    ]
  }
];

export const LiveCallView: React.FC<LiveCallViewProps> = ({
  initialCompanionMode = 'human',
  onCompanionModeChange
}) => {
  const [companionMode, setCompanionMode] = useState<CompanionMode>(initialCompanionMode);
  const [activeTab, setActiveTab] = useState<'topic' | 'assist' | 'notes'>('topic');
  const [currentTopicIdx, setCurrentTopicIdx] = useState(0);

  // Call session controls
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [seconds, setSeconds] = useState(14 * 60 + 31);
  const [callActive, setCallActive] = useState(true);
  const [showWrapUpModal, setShowWrapUpModal] = useState(false);

  // Anime Sensei specific states
  const [senseiMood, setSenseiMood] = useState<'cheerful' | 'thoughtful' | 'correcting' | 'encouraging'>('cheerful');
  const [senseiReaction, setSenseiReaction] = useState<'none' | 'nod' | 'burst'>('none');
  const [senseiSpeed, setSenseiSpeed] = useState<number>(1.0);
  const [isSamplingVoice, setIsSamplingVoice] = useState(false);

  // Bookmarks
  const [savedNotes, setSavedNotes] = useState<{ term: string; type: string; definition: string }[]>([
    { term: 'Vibe check', type: 'Idiom', definition: 'An assessment of the mood or feeling of a situation.' },
    { term: 'Cognitive fatigue', type: 'C2 Phrase', definition: 'Mental exhaustion caused by extended deliberate focus.' },
    { term: 'Asynchronous', type: 'C1 Lexicon', definition: 'Not coordinated in time; happening independently.' },
    { term: 'Pivot gracefully', type: 'Collocation', definition: 'To alter direction or strategy smoothly without disruption.' }
  ]);
  const [newNoteInput, setNewNoteInput] = useState('');

  // Timer effect
  useEffect(() => {
    if (!callActive) return;
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [callActive]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleCompanionModeSwitch = (mode: CompanionMode) => {
    setCompanionMode(mode);
    if (onCompanionModeChange) onCompanionModeChange(mode);
  };

  const handleTriggerReaction = (type: 'nod' | 'burst') => {
    setSenseiReaction(type);
    setTimeout(() => setSenseiReaction('none'), 1200);
  };

  const handleSampleVoice = () => {
    setIsSamplingVoice(true);
    handleTriggerReaction('nod');
    speakEnglish("Hello Alex! I am thrilled to explore this topic with you. Your phrasing is sounding remarkably natural today.", 'uk', senseiSpeed)
      .then(() => {
        setIsSamplingVoice(false);
        handleTriggerReaction('burst');
      });
  };

  const handlePronounceVocab = (term: string) => {
    speakEnglish(term, 'uk', 0.9);
  };

  const handleRollTopic = () => {
    setCurrentTopicIdx((prev) => (prev + 1) % TOPICS.length);
  };

  const handleAddBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteInput.trim()) return;
    setSavedNotes(prev => [
      { term: newNoteInput.trim(), type: 'Saved Term', definition: 'Captured during live conversational exchange.' },
      ...prev
    ]);
    setNewNoteInput('');
  };

  const currentTopic = TOPICS[currentTopicIdx];

  return (
    <div className="flex flex-col w-full">
      {/* Top Telemetry & Partner Mode Switcher Banner */}
      <div className="w-full bg-[#181c24] px-5 py-2.5 shadow-md border-b border-[#262a33]/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Left Session Identity */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-ping" />
              <span className="text-[12px] text-[#4edea3] font-bold uppercase tracking-wider">
                {companionMode === 'anime' ? 'Live Anime Companion' : 'Live Session'}
              </span>
            </div>

            <div className="h-4 w-px bg-[#31353e] hidden sm:block" />

            {/* Timer */}
            <div className="flex items-center gap-1.5 text-[#bbcabf] text-[12px]">
              <span className="material-symbols-outlined text-[16px] text-[#4cd7f6]">timer</span>
              <span className="font-semibold text-[#dfe2ee] font-mono" id="call-timer">
                {formatTimer(seconds)}
              </span>
              <span className="text-[#86948a]">/ 25:00 Target</span>
            </div>

            <div className="h-4 w-px bg-[#31353e] hidden md:block" />

            {/* Partner Verification Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1c2028] border border-[#4edea3]/25">
              <span className="material-symbols-outlined text-[#4edea3] text-[15px]">
                {companionMode === 'anime' ? 'smart_toy' : 'verified_user'}
              </span>
              <span className="text-[11px] text-[#dfe2ee] font-medium">
                {companionMode === 'anime' ? 'Aoi Sensei • Neural Voice v3.5' : 'Verified Fluent Peer'}
              </span>
              <span className="text-[#c0c1ff] text-[11px] font-bold">
                {companionMode === 'anime' ? '★ 4.99' : '★ 4.98'}
              </span>
            </div>
          </div>

          {/* Center/Right Companion Toggle */}
          <div className="flex items-center gap-3">
            <div className="flex items-center p-1 bg-[#0f131c] rounded-xl border border-[#262a33]">
              <button
                onClick={() => handleCompanionModeSwitch('human')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[12px] font-semibold transition-all ${
                  companionMode === 'human'
                    ? 'bg-[#1c2028] text-[#4edea3] shadow-[0_0_12px_rgba(78,222,163,0.2)] border border-[#4edea3]/30'
                    : 'text-[#bbcabf] hover:text-[#dfe2ee]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">person</span>
                <span>Elena (Peer)</span>
              </button>
              <button
                onClick={() => handleCompanionModeSwitch('anime')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[12px] font-semibold transition-all ${
                  companionMode === 'anime'
                    ? 'bg-[#1c2028] text-[#4cd7f6] shadow-[0_0_12px_rgba(76,215,246,0.25)] border border-[#4cd7f6]/30'
                    : 'text-[#bbcabf] hover:text-[#dfe2ee]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">smart_toy</span>
                <span>Aoi Sensei (Anime)</span>
              </button>
            </div>

            {/* Speaking Ratio */}
            <div className="hidden lg:flex items-center gap-2 text-[11px]">
              <span className="text-[#bbcabf]">Ratio</span>
              <div className="w-28 bg-[#31353e] h-2 rounded-full overflow-hidden flex shadow-inner">
                <div className="bg-[#4edea3] h-full transition-all duration-500" style={{ width: '48%' }} />
                <div className="bg-[#4cd7f6] h-full transition-all duration-500" style={{ width: '52%' }} />
              </div>
              <span className="text-[#4edea3] font-bold">48%</span>
              <span className="text-[#86948a]">/</span>
              <span className="text-[#4cd7f6] font-bold">52%</span>
            </div>

            <div className="hidden xl:flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#1c2028] text-[11px] text-[#bbcabf]">
              <span className="material-symbols-outlined text-[#4edea3] text-[14px]">speed</span>
              <span>{companionMode === 'anime' ? 'Latency: 14ms' : 'Latency: 28ms'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Workspace: Split Stage (8 Cols) + Right Drawer (4 Cols) */}
      <div className="w-full max-w-7xl mx-auto px-5 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Main Video & Avatar Stage */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Call Stage Screen */}
            <div className="relative w-full rounded-2xl bg-[#0a0e16] border border-[#262a33] overflow-hidden shadow-2xl aspect-video sm:aspect-[16/10] flex flex-col justify-between">
              {/* Atmospheric Cyber Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0b1420] via-[#0f172a] to-[#0a0e16] pointer-events-none" />
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#4edea3_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
              <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#4edea3]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#4cd7f6]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Top Floating Stage Banner */}
              <div className="relative z-10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 bg-[#1c2028]/85 backdrop-blur-md px-4 py-1.5 rounded-xl border border-white/10 shadow-lg">
                  <div className="relative flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-[#4cd7f6] animate-ping absolute opacity-75" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4cd7f6]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[15px] leading-tight font-bold text-[#dfe2ee]">
                        {companionMode === 'anime' ? 'Aoi Vance (葵)' : 'Elena Vance'}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#4cd7f6]/15 text-[#4cd7f6] border border-[#4cd7f6]/30">
                        {companionMode === 'anime' ? 'AI Anime Sensei' : 'C1 Target'}
                      </span>
                    </div>
                    <p className="text-[11px] leading-tight text-[#bbcabf]">
                      {companionMode === 'anime' ? 'Tokyo • Oxford RP Accent • Interactive 2D' : 'Madrid, Spain • Product Lead'}
                    </p>
                  </div>
                </div>

                {/* Live Speaking Status Pill */}
                <div className="flex items-center gap-2 bg-[#4edea3]/15 text-[#4edea3] border border-[#4edea3]/30 px-3 py-1.5 rounded-full backdrop-blur-md shadow-[0_0_16px_rgba(78,222,163,0.25)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4edea3] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4edea3]" />
                  </span>
                  <span className="text-[12px] font-bold tracking-wide">
                    {companionMode === 'anime'
                      ? `Aoi is speaking... (${senseiMood === 'cheerful' ? 'Cheerful & Warm' : senseiMood === 'thoughtful' ? 'Thoughtful Mode' : senseiMood === 'correcting' ? 'Pronunciation Guide' : 'High Encouragement'})`
                      : 'Elena speaking...'}
                  </span>
                </div>
              </div>

              {/* Central Visualizers: Left Partner View + Right Self Inset */}
              <div className="relative z-0 flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-stretch">
                {/* Partner Tile */}
                {companionMode === 'human' ? (
                  /* HUMAN PEER TILE: Elena Vance */
                  <div className="md:col-span-8 relative w-full h-full min-h-[220px] rounded-xl overflow-hidden bg-[#1c2028] flex flex-col items-center justify-center group shadow-md border border-white/5">
                    <img
                      alt="Elena Vance video feed"
                      className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                      src={ELENA_AVATAR}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e16]/90 via-transparent to-[#0a0e16]/30" />
                    {/* Elena audio wave overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0a0e16]/70 backdrop-blur-md">
                        <span className="material-symbols-outlined text-[#4cd7f6] text-[16px]">volume_up</span>
                        <span className="text-[11px] text-[#dfe2ee]">Madrid Time: 18:42</span>
                      </div>
                      {/* Reactive Waveform for Elena */}
                      <div className="flex items-end gap-1 h-6 px-2.5 py-1 bg-[#0a0e16]/70 backdrop-blur-md rounded-md">
                        <span className="w-1 bg-[#4cd7f6] rounded-full animate-[pulse_0.8s_infinite] h-2" />
                        <span className="w-1 bg-[#4cd7f6] rounded-full animate-[pulse_0.6s_infinite] h-4" />
                        <span className="w-1 bg-[#4edea3] rounded-full animate-[pulse_0.7s_infinite] h-6" />
                        <span className="w-1 bg-[#4edea3] rounded-full animate-[pulse_0.5s_infinite] h-5" />
                        <span className="w-1 bg-[#4cd7f6] rounded-full animate-[pulse_0.9s_infinite] h-3" />
                        <span className="w-1 bg-[#4cd7f6] rounded-full animate-[pulse_0.4s_infinite] h-6" />
                        <span className="w-1 bg-[#4edea3] rounded-full animate-[pulse_0.8s_infinite] h-4" />
                        <span className="w-1 bg-[#4edea3] rounded-full animate-[pulse_0.6s_infinite] h-2" />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ANIME COMPANION TILE: Aoi Sensei with Multi-Layered Motion Rig */
                  <div
                    className={`md:col-span-8 relative w-full h-full min-h-[260px] rounded-xl overflow-hidden bg-gradient-to-b from-[#131b28] to-[#0c121c] border border-[#4edea3]/30 flex flex-col items-center justify-between group shadow-2xl p-3 ${
                      senseiReaction === 'burst' ? 'sensei-burst' : ''
                    }`}
                  >
                    {/* Dynamic Aura Soundwave Rings Behind Character */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
                      <div className="w-64 h-64 rounded-full border-2 border-[#4edea3]/35 aura-ring-1" />
                      <div className="w-64 h-64 rounded-full border border-[#4cd7f6]/35 aura-ring-2" />
                      <div className="w-64 h-64 rounded-full border border-[#4edea3]/20 aura-ring-3" />
                      <div className="w-80 h-80 rounded-full border border-[#4edea3]/10 scale-125 opacity-40" />
                    </div>

                    {/* Floating Atmospheric Bokeh Sparks */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                      <div className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-[#4edea3]/70 blur-[1px] particle-1" />
                      <div className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-[#4cd7f6]/60 blur-[1.5px] particle-2" />
                      <div className="absolute top-1/2 right-1/6 w-1.5 h-1.5 rounded-full bg-[#6ffbbe]/80 blur-[0.5px] particle-3" />
                      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 rounded-full bg-[#c0c1ff]/40 blur-[2px] particle-2" />
                    </div>

                    {/* Character Motion Presentation */}
                    <div className="relative w-full flex-1 flex items-center justify-center py-1 overflow-hidden z-10">
                      <div className="relative flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64">
                        {/* Soft Backlight Radial Halo */}
                        <div
                          className={`absolute inset-0 rounded-full bg-gradient-to-tr from-[#4edea3]/35 via-[#4cd7f6]/25 to-[#c0c1ff]/15 blur-xl pointer-events-none transition-all duration-700 ${
                            senseiReaction === 'burst' ? 'scale-125 opacity-100' : 'opacity-80'
                          }`}
                        />
                        <div className="absolute inset-1 rounded-full border-2 border-[#4edea3]/40 shadow-[0_0_30px_rgba(78,222,163,0.35)] pointer-events-none" />

                        {/* Nested Rig: Breathing + Head Sway */}
                        <div
                          className={`relative z-10 w-48 h-48 sm:w-60 sm:h-60 rounded-full overflow-hidden border-2 border-[#4edea3]/60 shadow-2xl animate-organic-breathe ${
                            senseiReaction === 'nod' ? 'sensei-nod' : ''
                          }`}
                        >
                          <div className="w-full h-full animate-head-sway animate-hair-glint">
                            <img
                              alt="Aoi Vance Sensei"
                              className="w-full h-full object-cover object-top filter transition-all duration-700"
                              src={ANIME_SENSEI_AVATAR}
                            />
                            {/* Organic Eyelid Blink Overlay */}
                            <div className="absolute inset-0 pointer-events-none flex flex-col justify-start items-center overflow-hidden">
                              <div className="w-full h-[54%] animate-blink-realistic origin-top bg-gradient-to-b from-[#181a20]/90 via-[#2a1d2e]/80 to-transparent backdrop-blur-[0.5px] opacity-0" />
                            </div>
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0a0e16]/40 via-transparent to-transparent" />
                          </div>
                        </div>

                        {/* Live Status Pill on Avatar */}
                        <div className="absolute -top-1 right-2 bg-[#4edea3] text-[#003824] font-bold text-[11px] px-2.5 py-0.5 rounded-full shadow-lg flex items-center gap-1.5 z-20 border border-[#6ffbbe]/40">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#003824] opacity-80" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#003824]" />
                          </span>
                          <span>Speaking Live</span>
                        </div>
                      </div>
                    </div>

                    {/* Emotion / Expression Switcher Bar */}
                    <div className="w-full relative z-10 flex flex-wrap items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-[#0a0e16]/80 backdrop-blur-md border border-white/5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] uppercase font-bold text-[#86948a] tracking-wider hidden sm:inline">
                          Sensei Vibe:
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => { setSenseiMood('cheerful'); handleTriggerReaction('burst'); }}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                              senseiMood === 'cheerful'
                                ? 'bg-[#4edea3]/20 text-[#4edea3] border border-[#4edea3]/40'
                                : 'bg-[#262a33] text-[#bbcabf] hover:text-[#dfe2ee]'
                            }`}
                            type="button"
                          >
                            😊 Cheerful
                          </button>
                          <button
                            onClick={() => { setSenseiMood('thoughtful'); handleTriggerReaction('nod'); }}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                              senseiMood === 'thoughtful'
                                ? 'bg-[#4edea3]/20 text-[#4edea3] border border-[#4edea3]/40'
                                : 'bg-[#262a33] text-[#bbcabf] hover:text-[#dfe2ee]'
                            }`}
                            type="button"
                          >
                            🤔 Thoughtful
                          </button>
                          <button
                            onClick={() => { setSenseiMood('correcting'); handleTriggerReaction('nod'); }}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                              senseiMood === 'correcting'
                                ? 'bg-[#4edea3]/20 text-[#4edea3] border border-[#4edea3]/40'
                                : 'bg-[#262a33] text-[#bbcabf] hover:text-[#dfe2ee]'
                            }`}
                            type="button"
                          >
                            💡 Correcting
                          </button>
                          <button
                            onClick={() => { setSenseiMood('encouraging'); handleTriggerReaction('burst'); }}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                              senseiMood === 'encouraging'
                                ? 'bg-[#4edea3]/20 text-[#4edea3] border border-[#4edea3]/40'
                                : 'bg-[#262a33] text-[#bbcabf] hover:text-[#dfe2ee]'
                            }`}
                            type="button"
                          >
                            👏 Encouraging
                          </button>
                        </div>
                      </div>

                      {/* Live Vocal Cadence EQ Bars */}
                      <div className="flex items-center gap-1.5 bg-[#262a33]/80 px-2 py-1 rounded" title="Aoi Vocal Frequency Cadence">
                        <span className="material-symbols-outlined text-[#4cd7f6] text-[15px]">graphic_eq</span>
                        <div className="flex items-end gap-0.5 h-4 w-12">
                          <span className="w-1 bg-[#4edea3] rounded-full eq-bar-1 h-3" />
                          <span className="w-1 bg-[#4cd7f6] rounded-full eq-bar-2 h-4" />
                          <span className="w-1 bg-[#6ffbbe] rounded-full eq-bar-3 h-2" />
                          <span className="w-1 bg-[#4cd7f6] rounded-full eq-bar-4 h-3.5" />
                          <span className="w-1 bg-[#4edea3] rounded-full eq-bar-5 h-2.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Self View Tile (4 Cols md) */}
                <div className="md:col-span-4 relative w-full h-full min-h-[220px] rounded-xl overflow-hidden bg-[#262a33] flex flex-col justify-between group shadow-md border border-white/5">
                  {!isCamOff ? (
                    <img
                      alt="Alex self camera view"
                      className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                      src={USER_AVATAR}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#181c24] text-[#bbcabf]">
                      <span className="material-symbols-outlined text-[36px] text-[#ffb4ab]">videocam_off</span>
                      <span className="text-[12px] font-semibold mt-1">Camera Paused</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e16]/90 via-transparent to-[#0a0e16]/40 pointer-events-none" />

                  {/* Top Status */}
                  <div className="relative z-10 p-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#0a0e16]/75 backdrop-blur-md">
                      <span className="w-2 h-2 rounded-full bg-[#4edea3]" />
                      <span className="text-[11px] text-[#dfe2ee] font-semibold">You (Alex)</span>
                      <span className="px-1 bg-[#4edea3]/20 text-[#4edea3] rounded text-[9px] font-bold">B2</span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded bg-[#1c2028] text-[10px] text-[#bbcabf] font-mono">
                      1080p 60fps
                    </span>
                  </div>

                  {/* Mic Activity Bar */}
                  <div className="relative z-10 p-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0a0e16]/75 backdrop-blur-md text-[#bbcabf] text-[11px]">
                      <span className={`material-symbols-outlined text-[15px] ${isMuted ? 'text-[#ffb4ab]' : 'text-[#4edea3]'}`}>
                        {isMuted ? 'mic_off' : 'mic'}
                      </span>
                      <span>{isMuted ? 'Mic Muted' : 'Mic Active'}</span>
                    </div>

                    {!isMuted && (
                      <div className="flex items-center gap-1 bg-[#0a0e16]/75 backdrop-blur-md px-2 py-1 rounded-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping" />
                        <div className="flex items-end gap-0.5 h-3.5">
                          <span className="w-0.5 h-1.5 bg-[#4edea3] rounded" />
                          <span className="w-0.5 h-3 bg-[#4edea3] rounded" />
                          <span className="w-0.5 h-2 bg-[#4edea3] rounded" />
                          <span className="w-0.5 h-3.5 bg-[#4edea3] rounded" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Real-time Dynamic STT Caption Box Overlay */}
              {showCaptions && (
                <div className="relative z-10 px-4 pb-3">
                  <div className="w-full bg-[#0a0e16]/90 backdrop-blur-md p-3 rounded-xl border border-[#4cd7f6]/20 flex items-start gap-3 shadow-xl">
                    <div className="w-7 h-7 rounded-lg bg-[#4cd7f6]/15 flex items-center justify-center text-[#4cd7f6] shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[18px]">closed_caption</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[12px] text-[#4cd7f6] font-bold">
                            {companionMode === 'anime' ? 'Aoi Sensei:' : 'Elena Vance:'}
                          </span>
                          <span className="text-[10px] text-[#86948a]">Real-time Phonetic STT</span>
                        </div>
                        <span className="text-[10px] text-[#4edea3] font-mono bg-[#4edea3]/10 px-1.5 py-0.2 rounded border border-[#4edea3]/20">
                          RP Intonation: High Naturalness
                        </span>
                      </div>
                      <p className="text-[13px] leading-relaxed text-[#dfe2ee]">
                        {companionMode === 'anime' ? (
                          <>
                            "I totally agree with your point on{" "}
                            <span className="bg-[#4edea3]/20 text-[#4edea3] font-semibold px-1 rounded border-b border-[#4edea3]" title="Target Vocab C1">
                              asynchronous
                            </span>{" "}
                            flow! Notice how we pronounce it:{" "}
                            <span className="text-[#4cd7f6] font-mono text-[12px]">/eɪˈsɪŋ.krə.nəs/</span>. Could you try weaving that into your next answer?"
                          </>
                        ) : (
                          "\"I think the greatest friction with a pure remote model isn't productivity, it's losing those spontaneous casual brainstorms...\""
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Anime Voice Configuration Tray (Only visible in anime mode) */}
            {companionMode === 'anime' && (
              <div className="w-full bg-[#181c24] p-3 rounded-xl border border-[#262a33] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-wrap text-[12px]">
                  <span className="text-[11px] text-[#86948a] font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-[#4edea3]">tune</span>
                    Sensei Voice:
                  </span>
                  <div className="flex items-center gap-1 bg-[#1c2028] px-2 py-1 rounded-md text-[#dfe2ee]">
                    <span className="text-[#86948a] text-[11px]">Tone:</span>
                    <span className="font-semibold text-[#4cd7f6]">Warm & Sweet</span>
                  </div>
                  <div className="flex items-center gap-1 bg-[#1c2028] px-2 py-1 rounded-md text-[#dfe2ee]">
                    <span className="text-[#86948a] text-[11px]">Pitch:</span>
                    <span className="font-semibold text-[#dfe2ee]">Natural High (Oxford)</span>
                  </div>
                  <div className="flex items-center gap-1 bg-[#1c2028] p-0.5 rounded-md">
                    <span className="text-[#86948a] text-[11px] px-1">Speed:</span>
                    <button
                      onClick={() => setSenseiSpeed(1.0)}
                      className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                        senseiSpeed === 1.0 ? 'bg-[#4edea3] text-[#003824]' : 'text-[#bbcabf]'
                      }`}
                    >
                      1.0x
                    </button>
                    <button
                      onClick={() => setSenseiSpeed(0.9)}
                      className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                        senseiSpeed === 0.9 ? 'bg-[#4edea3] text-[#003824]' : 'text-[#bbcabf]'
                      }`}
                    >
                      0.9x
                    </button>
                    <button
                      onClick={() => setSenseiSpeed(1.2)}
                      className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                        senseiSpeed === 1.2 ? 'bg-[#4edea3] text-[#003824]' : 'text-[#bbcabf]'
                      }`}
                    >
                      1.2x
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleSampleVoice}
                  disabled={isSamplingVoice}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#4cd7f6]/15 hover:bg-[#4cd7f6]/25 text-[#4cd7f6] text-[12px] font-bold border border-[#4cd7f6]/30 transition-all active:scale-95"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isSamplingVoice ? 'graphic_eq' : 'play_circle'}
                  </span>
                  <span>{isSamplingVoice ? 'Synthesizing...' : 'Sample Voice'}</span>
                </button>
              </div>
            )}

            {/* Quick Cues & Reaction Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#181c24] p-3 rounded-xl border border-[#262a33]">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-semibold text-[#86948a] px-1">Quick Cues:</span>
                <button
                  onClick={() => {
                    handleTriggerReaction('nod');
                    speakEnglish("I will slow down my speaking pace so we can digest each word clearly.", 'uk', 0.85);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1c2028] hover:bg-[#262a33] text-[#dfe2ee] text-[12px] transition-all transform active:scale-95 border border-[#262a33]"
                  type="button"
                >
                  <span>🐢</span>
                  <span>Speak slower</span>
                </button>
                <button
                  onClick={() => {
                    handleTriggerReaction('nod');
                    speakEnglish("Certainly! Let me rephrase that question for you.", 'uk', 0.95);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1c2028] hover:bg-[#262a33] text-[#dfe2ee] text-[12px] transition-all transform active:scale-95 border border-[#262a33]"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#4cd7f6]">replay</span>
                  <span>Could you repeat?</span>
                </button>
                <button
                  onClick={() => {
                    handleTriggerReaction('burst');
                    alert("Cue signaled: Your partner is pausing to give you the floor!");
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1c2028] hover:bg-[#262a33] text-[#dfe2ee] text-[12px] transition-all transform active:scale-95 border border-[#262a33]"
                  type="button"
                >
                  <span>💡</span>
                  <span>I have a thought</span>
                </button>
                <button
                  onClick={() => {
                    handleTriggerReaction('burst');
                    speakEnglish("Thank you so much! That means a lot.", 'uk', 1.0);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1c2028] hover:bg-[#262a33] text-[#dfe2ee] text-[12px] transition-all transform active:scale-95 border border-[#262a33]"
                  type="button"
                >
                  <span>👏</span>
                  <span>{companionMode === 'anime' ? 'Sugoi! Great phrasing' : 'Great phrasing!'}</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-[#86948a] hidden sm:inline">Fluency Vibe:</span>
                <span className="px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#4edea3] font-bold text-[11px] border border-[#4edea3]/20">
                  {companionMode === 'anime' ? 'Anime Immersion Flow' : 'Dynamic Flow'}
                </span>
              </div>
            </div>

            {/* Floating Call Controls Dock Tray */}
            <div className="w-full bg-[#1c2028] p-3 rounded-xl shadow-xl flex items-center justify-between border border-[#262a33]">
              {/* Secondary Tools */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowCaptions(!showCaptions)}
                  className={`p-2.5 rounded-lg border transition-all ${
                    showCaptions
                      ? 'bg-[#262a33] text-[#4cd7f6] border-[#4cd7f6]/40'
                      : 'bg-[#181c24] text-[#86948a] border-[#262a33]'
                  }`}
                  title="Toggle Live Subtitles (Captions)"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">closed_caption</span>
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className="p-2.5 rounded-lg bg-[#262a33] hover:bg-[#353942] text-[#bbcabf] hover:text-[#dfe2ee] transition-all border border-[#262a33]"
                  title="Call Vocabulary Notebook"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">bookmark</span>
                </button>
                <button
                  onClick={handleRollTopic}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#262a33] hover:bg-[#353942] text-[#bbcabf] hover:text-[#4edea3] transition-all text-[12px] font-medium border border-[#262a33]"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">casino</span>
                  <span>Roll Next Topic</span>
                </button>
              </div>

              {/* Core Controls: Mic, Camera, Audio */}
              <div className="flex items-center gap-3">
                {/* Mute/Unmute */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all active:scale-95 ${
                    isMuted
                      ? 'bg-[#93000a] text-[#ffdad6] border border-[#ffb4ab]/40'
                      : 'bg-[#4edea3] text-[#003824] shadow-[0_0_20px_rgba(78,222,163,0.35)] hover:bg-[#6ffbbe]'
                  }`}
                  title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {isMuted ? 'mic_off' : 'mic'}
                  </span>
                </button>

                {/* Camera Toggle */}
                <button
                  onClick={() => setIsCamOff(!isCamOff)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 border ${
                    isCamOff
                      ? 'bg-[#262a33] text-[#ffb4ab] border-[#ffb4ab]/30'
                      : 'bg-[#262a33] hover:bg-[#353942] text-[#dfe2ee] border-white/10'
                  }`}
                  title={isCamOff ? 'Turn Camera On' : 'Turn Camera Off'}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {isCamOff ? 'videocam_off' : 'videocam'}
                  </span>
                </button>

                {/* Headset/Device settings */}
                <button
                  onClick={() => alert("Audio Device: Using Default High-Definition Headset output at 48kHz.")}
                  className="hidden sm:flex w-10 h-10 rounded-full bg-[#262a33] hover:bg-[#353942] text-[#bbcabf] hover:text-[#dfe2ee] items-center justify-center transition-all border border-white/5"
                  title="Audio Device Settings"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">headset</span>
                </button>
              </div>

              {/* End Call / Report */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert("Peer Report & Feedback: The SpeakFlow peer community is moderated for respectful, constructive practice.")}
                  className="p-2.5 rounded-lg bg-[#262a33] hover:bg-[#353942] text-[#bbcabf] hover:text-[#ffb4ab] transition-all border border-[#262a33]"
                  title="Safety & Peer Report"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">flag</span>
                </button>
                <button
                  onClick={() => setShowWrapUpModal(true)}
                  className="px-4 py-2.5 rounded-lg bg-[#93000a] hover:bg-[#ffb4ab]/30 text-[#ffb4ab] text-[12px] font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm border border-[#ffb4ab]/30"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">call_end</span>
                  <span className="hidden sm:inline">Wrap Up</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side Drawer: Active Topic / AI Whisperer / Saved Notes */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Drawer Tabs */}
            <div className="flex items-center p-1 bg-[#181c24] rounded-xl border border-[#262a33]">
              <button
                onClick={() => setActiveTab('topic')}
                className={`flex-1 py-1.5 rounded-lg text-[12px] font-bold text-center transition-all ${
                  activeTab === 'topic'
                    ? 'bg-[#1c2028] text-[#4edea3] shadow-sm border border-[#4edea3]/30'
                    : 'text-[#bbcabf] hover:text-[#dfe2ee]'
                }`}
              >
                Active Topic
              </button>
              <button
                onClick={() => setActiveTab('assist')}
                className={`flex-1 py-1.5 rounded-lg text-[12px] font-bold text-center transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'assist'
                    ? 'bg-[#1c2028] text-[#4cd7f6] shadow-sm border border-[#4cd7f6]/30'
                    : 'text-[#bbcabf] hover:text-[#dfe2ee]'
                }`}
              >
                <span>AI Whisperer</span>
                <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse" />
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-1.5 rounded-lg text-[12px] font-bold text-center transition-all ${
                  activeTab === 'notes'
                    ? 'bg-[#1c2028] text-[#c0c1ff] shadow-sm border border-[#c0c1ff]/30'
                    : 'text-[#bbcabf] hover:text-[#dfe2ee]'
                }`}
              >
                Saved ({savedNotes.length})
              </button>
            </div>

            {/* TAB 1: ACTIVE TOPIC */}
            {activeTab === 'topic' && (
              <div className="flex flex-col gap-4">
                <div className="bg-[#1c2028] p-4 rounded-xl shadow-md border border-[#262a33]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded bg-[#4cd7f6]/10 text-[#4cd7f6] text-[11px] font-bold tracking-wide uppercase">
                      Topic of Discussion
                    </span>
                    <span className="text-[#86948a] text-[11px]">{currentTopic.curatedFor}</span>
                  </div>
                  <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] text-[#dfe2ee] font-bold mb-1">
                    {currentTopic.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#bbcabf]">
                    {currentTopic.description}
                  </p>

                  {/* Questions */}
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="text-[11px] font-bold text-[#86948a] uppercase tracking-wider mb-0.5">
                      Conversation Questions
                    </div>
                    {currentTopic.questions.map((q, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          speakEnglish(q, 'uk', 1.0);
                        }}
                        className="p-2.5 bg-[#262a33] rounded-lg text-[#dfe2ee] text-[13px] hover:bg-[#353942] transition-colors cursor-pointer group flex items-start gap-2 border border-white/5"
                        title="Click to hear question spoken"
                      >
                        <span className="text-[#4edea3] font-bold text-[12px] mt-0.5">{idx + 1}.</span>
                        <p className="group-hover:text-[#6ffbbe] transition-colors">{q}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vocabulary Booster Tray */}
                <div className="bg-[#1c2028] p-4 rounded-xl shadow-md border border-[#262a33]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#4edea3] text-[18px]">auto_awesome</span>
                      <span className="text-[15px] font-bold text-[#dfe2ee]">Target Vocabulary</span>
                    </div>
                    <span className="text-[#86948a] text-[11px]">Click 🔊 to hear</span>
                  </div>

                  <div className="space-y-2">
                    {TARGET_VOCABULARY.slice(3, 6).map((item) => (
                      <div
                        key={item.id}
                        className="p-2.5 bg-[#181c24] rounded-lg flex items-center justify-between hover:bg-[#262a33] transition-colors border border-white/5"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#dfe2ee] font-bold text-[14px]">{item.term}</span>
                            <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#4edea3]/15 text-[#4edea3] font-semibold">
                              {item.level}
                            </span>
                            {item.phonetic && (
                              <span className="text-[11px] font-mono text-[#4cd7f6]">{item.phonetic}</span>
                            )}
                          </div>
                          <p className="text-[12px] text-[#bbcabf] mt-0.5">{item.definition}</p>
                        </div>
                        <button
                          onClick={() => handlePronounceVocab(item.term)}
                          className="p-1.5 rounded bg-[#1c2028] hover:text-[#4edea3] text-[#bbcabf] transition-colors"
                          title="Listen Pronunciation"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">volume_up</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: AI WHISPERER */}
            {activeTab === 'assist' && (
              <div className="bg-[#1c2028] p-4 rounded-xl shadow-md flex flex-col gap-3 border border-[#262a33]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">psychology</span>
                    <span className="text-[15px] font-bold text-[#dfe2ee]">
                      {companionMode === 'anime' ? 'Live Sensei Whisper' : 'Live Grammar Whisper'}
                    </span>
                  </div>
                  <span className="text-[10px] bg-[#4cd7f6]/20 text-[#4cd7f6] px-2 py-0.5 rounded-full font-bold">
                    Passive Coaching
                  </span>
                </div>
                <p className="text-[12px] text-[#bbcabf]">
                  Non-intrusive pointers captured automatically during natural speaking flow.
                </p>

                <div className="flex flex-col gap-3 mt-1">
                  {GRAMMAR_WHISPERS.map((whisper) => (
                    <div
                      key={whisper.id}
                      className="p-3 rounded-lg bg-[#181c24] flex flex-col gap-1 border border-white/5"
                    >
                      <div className="flex items-center justify-between text-[11px] text-[#86948a]">
                        <span>{whisper.timeAgo}</span>
                        <span className="text-[#4edea3] font-semibold">{whisper.category}</span>
                      </div>
                      <div className="text-[13px] text-[#ffb4ab] line-through">"{whisper.original}"</div>
                      <div className="text-[13px] text-[#4edea3] font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">arrow_right_alt</span>
                        <span>"{whisper.improved}"</span>
                      </div>
                      <p className="text-[11px] text-[#bbcabf] mt-0.5 leading-relaxed">
                        {whisper.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: SAVED VOCABULARY NOTES */}
            {activeTab === 'notes' && (
              <div className="bg-[#1c2028] p-4 rounded-xl shadow-md border border-[#262a33] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-bold text-[#dfe2ee]">Bookmarked This Call</span>
                  <span className="text-[11px] text-[#4edea3] font-bold">Auto-synced to Anki</span>
                </div>

                <form onSubmit={handleAddBookmark} className="flex gap-2">
                  <input
                    value={newNoteInput}
                    onChange={(e) => setNewNoteInput(e.target.value)}
                    placeholder="Add term or idiom..."
                    className="flex-1 h-9 px-3 bg-[#0a0e16] border border-[#262a33] rounded-lg text-[13px] text-[#dfe2ee] focus:outline-none focus:border-[#4edea3]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 bg-[#4edea3] text-[#003824] rounded-lg font-bold text-[12px]"
                  >
                    Save
                  </button>
                </form>

                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {savedNotes.map((note, idx) => (
                    <div key={idx} className="p-2.5 bg-[#181c24] rounded-lg border border-white/5">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-[#dfe2ee] text-[13px]">{note.term}</span>
                        <span className="text-[#4cd7f6] text-[10px] bg-[#4cd7f6]/10 px-1.5 rounded">{note.type}</span>
                      </div>
                      <p className="text-[12px] text-[#bbcabf] mt-1">{note.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Partner Card */}
            <div className="bg-[#181c24] p-4 rounded-xl flex items-center gap-3 border border-[#4edea3]/20 shadow-md">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#1c2028] shrink-0 border-2 border-[#4edea3]/50 shadow-[0_0_12px_rgba(78,222,163,0.3)] flex items-center justify-center">
                <img
                  alt={companionMode === 'anime' ? 'Aoi Vance' : 'Elena Vance'}
                  className="w-full h-full object-cover object-top"
                  src={companionMode === 'anime' ? ANIME_SENSEI_AVATAR : ELENA_AVATAR}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-[14px] font-bold text-[#dfe2ee] truncate">
                    {companionMode === 'anime' ? 'Aoi Vance • Sensei' : 'Elena Vance'}
                  </h4>
                  <span className="text-[#4edea3] text-[11px] font-semibold">
                    {companionMode === 'anime' ? 'Tier 1 AI Companion' : '84 calls completed'}
                  </span>
                </div>
                <p className="text-[12px] text-[#bbcabf] truncate">
                  {companionMode === 'anime'
                    ? 'Prefers: Oxford RP English • Socratic Questioning'
                    : 'Prefers: Constructive direct feedback'}
                </p>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-[#4cd7f6]">
                  <span className="material-symbols-outlined text-[13px]">
                    {companionMode === 'anime' ? 'psychology_alt' : 'handshake'}
                  </span>
                  <span>
                    {companionMode === 'anime'
                      ? 'Personalized memory: 12 sessions completed'
                      : 'Practicing together 2nd time'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Session Wrap-up Modal */}
      {showWrapUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0e16]/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg bg-[#1c2028] border border-[#262a33] rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#4edea3]/20 text-[#4edea3] flex items-center justify-center text-[24px]">
                🏆
              </div>
              <div>
                <h3 className="font-['Plus+Jakarta+Sans'] text-[20px] font-bold text-[#dfe2ee]">
                  Session Completed!
                </h3>
                <p className="text-[12px] text-[#bbcabf]">
                  Great conversational flow with {companionMode === 'anime' ? 'Aoi Sensei' : 'Elena Vance'}.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-2">
              <div className="p-3 bg-[#181c24] rounded-xl text-center border border-white/5">
                <span className="text-[11px] text-[#86948a] block">Duration</span>
                <span className="text-[18px] font-bold text-[#dfe2ee] font-mono">{formatTimer(seconds)}</span>
              </div>
              <div className="p-3 bg-[#181c24] rounded-xl text-center border border-white/5">
                <span className="text-[11px] text-[#86948a] block">Words Spoken</span>
                <span className="text-[18px] font-bold text-[#4edea3]">385</span>
              </div>
              <div className="p-3 bg-[#181c24] rounded-xl text-center border border-white/5">
                <span className="text-[11px] text-[#86948a] block">Accuracy</span>
                <span className="text-[18px] font-bold text-[#4cd7f6]">91%</span>
              </div>
            </div>

            <div className="p-3.5 bg-[#181c24] rounded-xl border border-white/5 text-[13px] text-[#bbcabf]">
              <strong className="text-[#dfe2ee] block mb-1">Key Takeaways:</strong>
              • Used "asynchronous" in context with accurate preposition.<br />
              • Spaced pauses reduced filler words ("um", "like") by 40%.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowWrapUpModal(false)}
                className="px-4 py-2 rounded-xl bg-[#262a33] text-[#dfe2ee] hover:bg-[#353942] text-[13px] font-semibold"
              >
                Return to Call
              </button>
              <button
                onClick={() => {
                  setShowWrapUpModal(false);
                  setCallActive(false);
                  alert("Session report saved to your Fluency Dashboard!");
                }}
                className="px-5 py-2 rounded-xl bg-[#4edea3] hover:bg-[#10b981] text-[#003824] font-bold text-[13px] shadow-lg shadow-[#4edea3]/20"
              >
                Save & Finish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
