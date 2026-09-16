import React, { useState } from 'react';
import { SpeakingTable } from '../types';
import { SPEAKING_TABLES } from '../data/mockData';
import { playChimeTone } from '../utils/audio';

interface PracticeRoomsViewProps {
  onJoinTable: (tableId: string) => void;
  onInstantPair: (level: string) => void;
}

const CATEGORIES = [
  'All Active Rooms (42)',
  'Beginner A1–A2',
  'Intermediate B1–B2',
  'Advanced C1–C2',
  'IELTS & Cambridge Prep',
  'Casual Chit-Chat',
  'Business & Tech'
];

export const PracticeRoomsView: React.FC<PracticeRoomsViewProps> = ({
  onJoinTable,
  onInstantPair
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All Active Rooms (42)');
  const [tables, setTables] = useState<SpeakingTable[]>(SPEAKING_TABLES);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Instant pairing widget state
  const [pairLevel, setPairLevel] = useState<'A1-A2' | 'B1-B2' | 'C1-C2'>('B1-B2');
  const [isPairing, setIsPairing] = useState(false);
  const [pairingCountdown, setPairingCountdown] = useState(10);

  // New Table Form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Casual Chit-Chat');
  const [newSeats, setNewSeats] = useState(5);
  const [newLevel, setNewLevel] = useState('Intermediate B1-B2');

  const filteredTables = tables.filter(t => {
    if (selectedCategory === 'All Active Rooms (42)') return true;
    return t.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
           selectedCategory.toLowerCase().includes(t.category.toLowerCase());
  });

  const handleStartPairing = () => {
    setIsPairing(true);
    setPairingCountdown(10);
    playChimeTone('test');

    const interval = setInterval(() => {
      setPairingCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsPairing(false);
          playChimeTone('success');
          onInstantPair(pairLevel);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCreateTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTable: SpeakingTable = {
      id: `table-${Date.now()}`,
      title: newTitle.trim(),
      description: `Hosted table practicing English conversational fluency at ${newLevel}. Respectful speaking environment.`,
      category: newCategory,
      tags: [newLevel, 'Open Seating', 'Live Audio'],
      host: {
        name: 'You (Alex)',
        countryFlag: '🌐',
        level: 'Level B2 Host',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFu2vGoCgT9w5GXsTV6g1SSTm_2xpicQD8Lxhls1nUMmoSGo_TmDFjlYp51asU2P28rgn4-Au--XGEqi6V4ueF2tOlVF_sO6Ff7lWah8tUO7pG8-iKh1MOL_-xUBwvrg1XHBN4tcIG7jYhflBNiHb2QqBzmZ0I5fUDXuBPGHaaL3lz9CANSmQUkwvPsTztWNNGmlW6p7kBj0qOVjz0MLgwkmFQl1XUS05icOc91T967MzmwCPes7pBnA'
      },
      participants: [],
      currentSpeaker: 'You (Host)',
      seatsOccupied: 1,
      maxSeats: newSeats,
      activeTopic: true
    };

    setTables([newTable, ...tables]);
    setShowCreateModal(false);
    setNewTitle('');
    playChimeTone('success');
  };

  return (
    <div className="w-full flex flex-col">
      {/* Hero Header Section */}
      <div className="w-full bg-gradient-to-b from-[#181c24] to-[#0f131c] py-10 px-5 border-b border-[#262a33]/60 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4edea3]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#4cd7f6]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-ping" />
              <span className="text-[12px] font-bold text-[#4edea3] uppercase tracking-wider">
                42 Live Audio Lounges Active
              </span>
              <span className="text-[#86948a] text-[12px]">•</span>
              <span className="text-[12px] text-[#bbcabf] font-semibold">100% Free Always</span>
            </div>
            <h1 className="font-['Plus+Jakarta+Sans'] text-[28px] sm:text-[34px] font-extrabold text-[#dfe2ee] leading-tight tracking-tight">
              Join Free Live Speaking Tables Right Now
            </h1>
            <p className="text-[15px] leading-relaxed text-[#bbcabf] mt-2">
              Jump into small-group audio circles (3–6 seats) or get matched 1-on-1 in seconds. No waiting, no subscription fees, and pure organic conversation practice.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#4edea3] hover:bg-[#10b981] text-[#003824] font-bold text-[14px] shadow-lg shadow-[#4edea3]/20 transition-all active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span>Create Table</span>
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('instant-pair-widget');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1c2028] hover:bg-[#262a33] text-[#dfe2ee] font-bold text-[14px] border border-[#262a33] transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px] text-[#4cd7f6]">bolt</span>
              <span>Fast 1-on-1 Pair</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full max-w-7xl mx-auto px-5 py-8 flex flex-col gap-8">
        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-[13px] font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#1c2028] text-[#4edea3] border border-[#4edea3]/40 shadow-sm'
                  : 'bg-[#181c24] text-[#bbcabf] hover:text-[#dfe2ee] border border-[#262a33]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live Audio Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredTables.map((table) => (
            <div
              key={table.id}
              className="bg-[#181c24] hover:bg-[#1c2028] rounded-2xl border border-[#262a33] hover:border-[#4edea3]/40 p-5 shadow-lg flex flex-col justify-between transition-all duration-300 group"
            >
              <div>
                {/* Top Host Banner & Seats */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#4edea3]/40">
                      <img
                        alt={table.host.name}
                        className="w-full h-full object-cover"
                        src={table.host.avatar}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#dfe2ee]">
                        <span>{table.host.name}</span>
                        <span>{table.host.countryFlag}</span>
                      </div>
                      <span className="text-[11px] text-[#4edea3] font-medium">{table.host.level}</span>
                    </div>
                  </div>

                  {/* Seats Status */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0f131c] border border-[#262a33]">
                    <span className="material-symbols-outlined text-[15px] text-[#4cd7f6]">groups</span>
                    <span className="text-[12px] font-bold text-[#dfe2ee] font-mono">
                      {table.seatsOccupied} / {table.maxSeats}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-['Plus+Jakarta+Sans'] text-[17px] font-bold text-[#dfe2ee] group-hover:text-[#4edea3] transition-colors mb-2">
                  {table.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#bbcabf] line-clamp-2 mb-4">
                  {table.description}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-1.5 flex-wrap mb-4">
                  {table.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-[#262a33] text-[11px] text-[#bbcabf] font-medium border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Participants Stack & Action Buttons */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2 overflow-hidden">
                    {table.participants.slice(0, 3).map((p, pIdx) => (
                      <img
                        key={pIdx}
                        alt="Participant"
                        className="inline-block h-7 w-7 rounded-full ring-2 ring-[#181c24] object-cover"
                        src={p}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#4edea3]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
                    <span className="truncate max-w-[100px]">{table.currentSpeaker}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(`Joined ${table.title} in Silent Listen Mode. You can unmute anytime.`)}
                    className="px-3 py-2 rounded-xl bg-[#262a33] hover:bg-[#353942] text-[#bbcabf] hover:text-[#dfe2ee] text-[12px] font-semibold transition-all"
                  >
                    Listen in
                  </button>
                  <button
                    onClick={() => onJoinTable(table.id)}
                    className="px-4 py-2 rounded-xl bg-[#4edea3] hover:bg-[#10b981] text-[#003824] text-[12px] font-bold shadow-md shadow-[#4edea3]/15 transition-all active:scale-95 flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">record_voice_over</span>
                    <span>Join Table</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instant 1-on-1 Speed Pairing Widget */}
        <div
          id="instant-pair-widget"
          className="w-full bg-gradient-to-r from-[#181c24] via-[#1c2028] to-[#181c24] rounded-2xl border border-[#4edea3]/30 p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4 max-w-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#4edea3]/15 text-[#4edea3] flex items-center justify-center shrink-0 border border-[#4edea3]/30 shadow-[0_0_20px_rgba(78,222,163,0.2)]">
              <span className="material-symbols-outlined text-[28px]">bolt</span>
            </div>
            <div>
              <h3 className="font-['Plus+Jakarta+Sans'] text-[20px] font-bold text-[#dfe2ee]">
                Instant 1-on-1 Speed Match
              </h3>
              <p className="text-[13px] text-[#bbcabf] mt-1">
                Skip table browsing. Match with a real peer at your exact fluency tier right now for a timed 15-minute warmup discussion.
              </p>
              {/* Level options */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[11px] text-[#86948a] font-bold uppercase">Target Tier:</span>
                {(['A1-A2', 'B1-B2', 'C1-C2'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setPairLevel(lvl)}
                    className={`px-3 py-1 rounded-lg text-[12px] font-bold transition-all ${
                      pairLevel === lvl
                        ? 'bg-[#4edea3] text-[#003824] shadow-sm'
                        : 'bg-[#262a33] text-[#bbcabf] hover:text-[#dfe2ee]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 shrink-0">
            <button
              onClick={handleStartPairing}
              disabled={isPairing}
              className={`px-8 py-3.5 rounded-xl font-bold text-[14px] transition-all flex items-center gap-2 shadow-xl ${
                isPairing
                  ? 'bg-[#1c2028] text-[#4edea3] border border-[#4edea3]/40 animate-pulse'
                  : 'bg-[#4edea3] hover:bg-[#10b981] text-[#003824] shadow-[#4edea3]/25 active:scale-95'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isPairing ? 'hourglass_top' : 'online_prediction'}
              </span>
              <span>
                {isPairing ? `Matching peer (${pairingCountdown}s)...` : 'Match Me in 10 Seconds'}
              </span>
            </button>
            <span className="text-[11px] text-[#86948a]">
              Average pairing wait: 4.2 seconds
            </span>
          </div>
        </div>

        {/* Weekly Speaking Practice Leaderboard */}
        <div className="w-full bg-[#181c24] rounded-2xl border border-[#262a33] p-6 shadow-md flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#dfe2ee]">
                Top Practice Partners This Week
              </h3>
              <p className="text-[12px] text-[#bbcabf]">
                Community learners who spent the most time speaking aloud
              </p>
            </div>
            <span className="text-[11px] text-[#4edea3] font-bold bg-[#4edea3]/10 px-2.5 py-1 rounded-full">
              Global Dojo
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#1c2028] rounded-xl border border-white/5 flex items-center gap-3">
              <span className="text-[24px]">🥇</span>
              <div>
                <span className="text-[14px] font-bold text-[#dfe2ee] block">Camila Silva 🇧🇷</span>
                <span className="text-[12px] text-[#4edea3] font-mono">14 hrs 20 mins</span>
                <span className="text-[11px] text-[#86948a] block">Level B2 ➔ C1</span>
              </div>
            </div>
            <div className="p-4 bg-[#1c2028] rounded-xl border border-white/5 flex items-center gap-3">
              <span className="text-[24px]">🥈</span>
              <div>
                <span className="text-[14px] font-bold text-[#dfe2ee] block">Hiroshi Tanaka 🇯🇵</span>
                <span className="text-[12px] text-[#4edea3] font-mono">12 hrs 45 mins</span>
                <span className="text-[11px] text-[#86948a] block">IELTS Band 7.5 Aim</span>
              </div>
            </div>
            <div className="p-4 bg-[#1c2028] rounded-xl border border-white/5 flex items-center gap-3">
              <span className="text-[24px]">🥉</span>
              <div>
                <span className="text-[14px] font-bold text-[#dfe2ee] block">Zeynep Kaya 🇹🇷</span>
                <span className="text-[12px] text-[#4edea3] font-mono">11 hrs 10 mins</span>
                <span className="text-[11px] text-[#86948a] block">Business Fluency</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Host / Create Table Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0e16]/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md bg-[#1c2028] border border-[#262a33] rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-[24px]">add_circle</span>
                <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#dfe2ee]">
                  Host a Speaking Table
                </h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-[#86948a] hover:text-[#dfe2ee]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateTable} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-semibold text-[#bbcabf]">Discussion Title or Topic</label>
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Travel mishaps and storytelling practice"
                  required
                  className="w-full h-10 px-3 bg-[#0a0e16] border border-[#262a33] rounded-xl text-[13px] text-[#dfe2ee] focus:outline-none focus:border-[#4edea3]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-semibold text-[#bbcabf]">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="h-10 px-2 bg-[#0a0e16] border border-[#262a33] rounded-xl text-[13px] text-[#dfe2ee] focus:outline-none focus:border-[#4edea3]"
                  >
                    <option>Casual Chit-Chat</option>
                    <option>Business & Tech</option>
                    <option>IELTS & Cambridge Prep</option>
                    <option>Beginner A1–A2</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-semibold text-[#bbcabf]">Target Level</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value)}
                    className="h-10 px-2 bg-[#0a0e16] border border-[#262a33] rounded-xl text-[13px] text-[#dfe2ee] focus:outline-none focus:border-[#4edea3]"
                  >
                    <option>Beginner A1-A2</option>
                    <option>Intermediate B1-B2</option>
                    <option>Advanced C1-C2</option>
                    <option>Open to All</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[12px] font-semibold text-[#bbcabf]">Maximum Seats</label>
                <div className="flex items-center gap-2">
                  {[3, 4, 5, 6].map(num => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setNewSeats(num)}
                      className={`flex-1 py-1.5 rounded-lg text-[13px] font-bold ${
                        newSeats === num
                          ? 'bg-[#4edea3] text-[#003824]'
                          : 'bg-[#0a0e16] text-[#bbcabf] border border-[#262a33]'
                      }`}
                    >
                      {num} seats
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-[#bbcabf] hover:text-[#dfe2ee] text-[13px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#4edea3] text-[#003824] font-bold text-[13px] hover:bg-[#10b981]"
                >
                  Launch Table Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
