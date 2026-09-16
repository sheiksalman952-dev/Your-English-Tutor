import React, { useState } from 'react';
import { USER_PROFILE_AVATAR, TARGET_VOCABULARY } from '../data/mockData';
import { speakEnglish } from '../utils/audio';

interface DashboardViewProps {
  onStartLiveCall: () => void;
  onStartAiCoach: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onStartLiveCall,
  onStartAiCoach
}) => {
  const [vocabFilter, setVocabFilter] = useState<'ALL' | 'B2' | 'C1' | 'C2'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVocab = TARGET_VOCABULARY.filter(item => {
    const matchesFilter = vocabFilter === 'ALL' || item.level === vocabFilter;
    const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-5 py-8 flex flex-col gap-8">
      {/* Profile & Fluency Overview Card */}
      <div className="w-full bg-[#181c24] rounded-2xl border border-[#262a33] p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#4edea3]/50 shadow-[0_0_20px_rgba(78,222,163,0.25)] shrink-0">
            <img
              alt="Alex profile avatar"
              className="w-full h-full object-cover"
              src={USER_PROFILE_AVATAR}
            />
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-[#4edea3] ring-2 ring-[#181c24]" />
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="font-['Plus+Jakarta+Sans'] text-[24px] font-extrabold text-[#dfe2ee]">
                Alex Morante
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#4edea3]/15 text-[#4edea3] text-[12px] font-bold border border-[#4edea3]/30">
                Level B2 High-Intermediate
              </span>
            </div>
            <p className="text-[13px] text-[#bbcabf] mt-1">
              Practicing daily towards C1 Professional Fluency • Joined 4 months ago
            </p>

            {/* Progress Bar to C1 */}
            <div className="mt-3 flex items-center gap-3 max-w-md">
              <div className="flex-1 h-2.5 bg-[#0a0e16] rounded-full overflow-hidden p-0.5 border border-[#262a33]">
                <div className="h-full bg-gradient-to-r from-[#4edea3] to-[#4cd7f6] rounded-full w-3/4" />
              </div>
              <span className="text-[12px] font-mono text-[#4cd7f6] font-bold">75% to C1</span>
            </div>
          </div>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onStartLiveCall}
            className="px-5 py-2.5 rounded-xl bg-[#4edea3] hover:bg-[#10b981] text-[#003824] font-bold text-[13px] shadow-lg shadow-[#4edea3]/20 transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
            <span>Live Session</span>
          </button>
          <button
            onClick={onStartAiCoach}
            className="px-5 py-2.5 rounded-xl bg-[#1c2028] hover:bg-[#262a33] text-[#dfe2ee] font-bold text-[13px] border border-[#262a33] transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">psychology</span>
            <span>AI Coach</span>
          </button>
        </div>
      </div>

      {/* 4 Hero Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#181c24] p-5 rounded-2xl border border-[#262a33] shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#4edea3]/15 text-[#4edea3] flex items-center justify-center text-[22px]">
            🔥
          </div>
          <div>
            <span className="text-[12px] text-[#86948a] font-medium block">Speaking Streak</span>
            <span className="text-[20px] font-extrabold text-[#dfe2ee]">7 Days</span>
          </div>
        </div>

        <div className="bg-[#181c24] p-5 rounded-2xl border border-[#262a33] shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#4cd7f6]/15 text-[#4cd7f6] flex items-center justify-center text-[22px]">
            ⏱️
          </div>
          <div>
            <span className="text-[12px] text-[#86948a] font-medium block">Total Spoken Time</span>
            <span className="text-[20px] font-extrabold text-[#dfe2ee]">18h 45m</span>
          </div>
        </div>

        <div className="bg-[#181c24] p-5 rounded-2xl border border-[#262a33] shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#c0c1ff]/15 text-[#c0c1ff] flex items-center justify-center text-[22px]">
            🎯
          </div>
          <div>
            <span className="text-[12px] text-[#86948a] font-medium block">Native Accuracy</span>
            <span className="text-[20px] font-extrabold text-[#dfe2ee]">92%</span>
          </div>
        </div>

        <div className="bg-[#181c24] p-5 rounded-2xl border border-[#262a33] shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#4edea3]/15 text-[#4edea3] flex items-center justify-center text-[22px]">
            📚
          </div>
          <div>
            <span className="text-[12px] text-[#86948a] font-medium block">Mastered Idioms</span>
            <span className="text-[20px] font-extrabold text-[#dfe2ee]">46 Terms</span>
          </div>
        </div>
      </div>

      {/* Grid: Fluency Radar Breakdown + 7-Day Activity Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Competencies Progress Bars (7 Cols) */}
        <div className="lg:col-span-7 bg-[#181c24] p-6 rounded-2xl border border-[#262a33] shadow-md flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#dfe2ee]">
              Fluency Competency Radar
            </h3>
            <span className="text-[11px] text-[#4edea3] font-mono">Real-time STT Evaluator</span>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-[13px] mb-1">
                <span className="text-[#dfe2ee] font-medium">Grammar Precision & Collocations</span>
                <span className="text-[#4edea3] font-bold font-mono">92%</span>
              </div>
              <div className="w-full h-2.5 bg-[#0a0e16] rounded-full overflow-hidden border border-[#262a33]">
                <div className="h-full bg-[#4edea3] rounded-full" style={{ width: '92%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[13px] mb-1">
                <span className="text-[#dfe2ee] font-medium">Pronunciation & Intonation (RP/GA)</span>
                <span className="text-[#4cd7f6] font-bold font-mono">84%</span>
              </div>
              <div className="w-full h-2.5 bg-[#0a0e16] rounded-full overflow-hidden border border-[#262a33]">
                <div className="h-full bg-[#4cd7f6] rounded-full" style={{ width: '84%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[13px] mb-1">
                <span className="text-[#dfe2ee] font-medium">Conversational Spontaneity & Low Hesitation</span>
                <span className="text-[#4edea3] font-bold font-mono">81%</span>
              </div>
              <div className="w-full h-2.5 bg-[#0a0e16] rounded-full overflow-hidden border border-[#262a33]">
                <div className="h-full bg-[#4edea3] rounded-full" style={{ width: '81%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[13px] mb-1">
                <span className="text-[#dfe2ee] font-medium">Vocabulary Sophistication (CEFR C1 Lexicon)</span>
                <span className="text-[#c0c1ff] font-bold font-mono">78%</span>
              </div>
              <div className="w-full h-2.5 bg-[#0a0e16] rounded-full overflow-hidden border border-[#262a33]">
                <div className="h-full bg-[#c0c1ff] rounded-full" style={{ width: '78%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[13px] mb-1">
                <span className="text-[#dfe2ee] font-medium">Active Listening & Question Engagement</span>
                <span className="text-[#4edea3] font-bold font-mono">88%</span>
              </div>
              <div className="w-full h-2.5 bg-[#0a0e16] rounded-full overflow-hidden border border-[#262a33]">
                <div className="h-full bg-[#4edea3] rounded-full" style={{ width: '88%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Speaking Activity Calendar (5 Cols) */}
        <div className="lg:col-span-5 bg-[#181c24] p-6 rounded-2xl border border-[#262a33] shadow-md flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#dfe2ee]">
              7-Day Practice Streak
            </h3>
            <span className="text-[12px] font-bold text-[#4edea3]">Active Streak: 7 Days</span>
          </div>

          <div className="grid grid-cols-7 gap-2 pt-2">
            {[
              { day: 'Mon', mins: 25, active: true },
              { day: 'Tue', mins: 30, active: true },
              { day: 'Wed', mins: 20, active: true },
              { day: 'Thu', mins: 45, active: true },
              { day: 'Fri', mins: 35, active: true },
              { day: 'Sat', mins: 40, active: true },
              { day: 'Sun', mins: 25, active: true, today: true }
            ].map((d, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center p-2.5 rounded-xl border transition-all ${
                  d.today
                    ? 'bg-[#4edea3]/20 border-[#4edea3] shadow-[0_0_12px_rgba(78,222,163,0.3)]'
                    : 'bg-[#1c2028] border-white/5'
                }`}
              >
                <span className="text-[11px] text-[#86948a] font-medium">{d.day}</span>
                <span className="text-[18px] my-1">🔥</span>
                <span className="text-[11px] font-mono font-bold text-[#dfe2ee]">{d.mins}m</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#1c2028] rounded-xl border border-white/5 text-[12px] text-[#bbcabf] mt-2">
            <strong className="text-[#dfe2ee] block mb-1">Consistency Benchmark:</strong>
            You are speaking an average of 31.4 minutes per day, outpacing 87% of intermediate learners in your cohort.
          </div>
        </div>
      </div>

      {/* Vocabulary & Idiom Bank */}
      <div className="w-full bg-[#181c24] rounded-2xl border border-[#262a33] p-6 shadow-md flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#dfe2ee]">
              Mastered Vocabulary & Idiom Vault
            </h3>
            <p className="text-[12px] text-[#bbcabf]">
              Words, collocations, and idioms you successfully used in live calls
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Filter pills */}
            {(['ALL', 'B2', 'C1', 'C2'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setVocabFilter(lvl)}
                className={`px-3 py-1 rounded-lg text-[12px] font-bold transition-all ${
                  vocabFilter === lvl
                    ? 'bg-[#4edea3] text-[#003824]'
                    : 'bg-[#1c2028] text-[#bbcabf] hover:text-[#dfe2ee] border border-[#262a33]'
                }`}
              >
                {lvl}
              </button>
            ))}

            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vocabulary..."
              className="h-8 px-3 bg-[#0a0e16] border border-[#262a33] rounded-lg text-[12px] text-[#dfe2ee] focus:outline-none focus:border-[#4edea3]"
            />
          </div>
        </div>

        {/* Vocab Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredVocab.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-[#1c2028] rounded-xl border border-[#262a33] hover:border-[#4edea3]/40 transition-colors flex flex-col justify-between gap-3 group"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-[#dfe2ee] text-[15px] group-hover:text-[#4edea3] transition-colors">
                      {item.term}
                    </h4>
                    <span className="text-[10px] font-mono text-[#4cd7f6]">{item.phonetic}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#4edea3]/15 text-[#4edea3] font-bold border border-[#4edea3]/30">
                    {item.level}
                  </span>
                </div>
                <p className="text-[12px] leading-relaxed text-[#bbcabf]">{item.definition}</p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-[#86948a]">{item.partOfSpeech}</span>
                <button
                  onClick={() => speakEnglish(item.term, 'uk', 0.9)}
                  className="flex items-center gap-1 text-[11px] text-[#4cd7f6] hover:text-[#4edea3] transition-colors"
                >
                  <span className="material-symbols-outlined text-[15px]">volume_up</span>
                  <span>Pronounce</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
