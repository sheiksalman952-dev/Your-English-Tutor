import React, { useState } from 'react';
import { ChatMessage, RoleplayScenario } from '../types';
import { ROLEPLAY_SCENARIOS, TARGET_VOCABULARY, USER_AVATAR } from '../data/mockData';
import { speakEnglish } from '../utils/audio';

const AI_COACH_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuD9e4qR5iVv_G9uKz12T6-K1sWq3M7Gz10d9F0k1L2b4-G5H6J7K8L9M0N1P2Q3R4S5T6U7V8W9";

export const AiCoachView: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<RoleplayScenario>(ROLEPLAY_SCENARIOS[0]);
  const [rigorMode, setRigorMode] = useState<'gentle' | 'strict'>('strict');
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState('');
  const [nativeThoughtText, setNativeThoughtText] = useState('');
  const [showTranslator, setShowTranslator] = useState(false);
  const [wordsSpokenCount, setWordsSpokenCount] = useState(385);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'ai',
      name: 'Aria (AI Executive Coach)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      role: 'Head of Hiring',
      badge: 'British RP',
      text: "That makes sense from a roadmap perspective. But tell me, how did you manage pushback when your engineering lead claimed your proposed timeline was completely unrealistic?",
      timestamp: '10:42 AM',
      phonetics: [
        { word: 'unrealistic', ipa: '/ˌʌnrɪəˈlɪstɪk/' },
        { word: 'pushback', ipa: '/ˈpʊʃ.bæk/' }
      ]
    },
    {
      id: 'm2',
      sender: 'user',
      name: 'You (Alex)',
      avatar: USER_AVATAR,
      accuracy: 88,
      text: "Well, when he said the timeline is impossible, I decided to not fight him. Instead, I asked him which specific features we can remove to keep the launch date.",
      timestamp: '10:43 AM',
      coaching: {
        rawHighlight: "decided to not fight him ... which features we can remove",
        improvedText: "Instead of pushing back defensively, I partnered with him to de-scope secondary deliverables and protect our critical launch date.",
        keywords: ["push back defensively", "de-scope secondary deliverables"],
        grammarNote: "Native executive phrasing prefers 'de-scope deliverables' over 'remove features', and 'partnered with him' over 'not fighting him'."
      }
    },
    {
      id: 'm3',
      sender: 'ai',
      name: 'Aria (AI Executive Coach)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      role: 'Head of Hiring',
      badge: 'British RP',
      text: "An admirable strategy. When you offered those trade-offs, how did the executive stakeholders react to delaying secondary deliverables?",
      timestamp: '10:44 AM'
    }
  ]);

  const handlePlayAudio = (id: string, text: string) => {
    setPlayingAudioId(id);
    const accent = selectedScenario.accent.toLowerCase().includes('british') ? 'uk' : 'us';
    speakEnglish(text, accent, 1.0).then(() => {
      setPlayingAudioId(null);
    });
  };

  const handlePronounceChip = (word: string) => {
    const accent = selectedScenario.accent.toLowerCase().includes('british') ? 'uk' : 'us';
    speakEnglish(word, accent, 0.9);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      name: 'You (Alex)',
      avatar: USER_AVATAR,
      accuracy: 91,
      text: text.trim(),
      timestamp: 'Just now',
      coaching: {
        rawHighlight: text.trim().slice(0, 40) + '...',
        improvedText: `I presented the customer retention metrics transparently, demonstrating that shipping an uncompromised MVP outweighed rushing half-baked features.`,
        keywords: ['uncompromised MVP', 'phased rollout'],
        grammarNote: 'Using contrastive structures (e.g. "outweighed X over Y") demonstrates strong C1-level argumentation.'
      }
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setWordsSpokenCount(prev => prev + text.split(/\s+/).length);

    // AI responds after slight natural pause
    setTimeout(() => {
      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        name: 'Aria (AI Executive Coach)',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        role: selectedScenario.aiRole,
        badge: selectedScenario.accent,
        text: "That is a well-articulated concession. How did you ensure your junior developers didn't burn out under that compressed revised timeline?",
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, aiReply]);
      // Play audio prompt
      handlePlayAudio(aiReply.id, aiReply.text);
    }, 900);
  };

  const handleTranslateNativeThought = () => {
    if (!nativeThoughtText.trim()) return;
    // Simulate translation into natural idiom
    const translated = `In my previous organization, we established weekly cross-functional retrospectives to preemptively identify friction before it escalated.`;
    setInputText(translated);
    setNativeThoughtText('');
    setShowTranslator(false);
  };

  const handleToggleVoiceDictation = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      // Simulate spoken phrase insertion
      setTimeout(() => {
        setIsRecording(false);
        setInputText("I scheduled an impromptu sync with our principal engineer to align on the architectural bottlenecks.");
      }, 2500);
    }
  };

  const handleScenarioChange = (id: string) => {
    const sc = ROLEPLAY_SCENARIOS.find(s => s.id === id);
    if (!sc) return;
    setSelectedScenario(sc);
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'ai',
        name: `Aria (${sc.aiRole})`,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        role: sc.aiRole,
        badge: sc.accent,
        text: sc.initialMessage,
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Top Scenario Navigation & Configuration Header */}
      <div className="w-full bg-[#181c24] px-5 py-3 border-b border-[#262a33]/60 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4edea3] text-[20px]">psychology</span>
              <span className="text-[13px] font-bold text-[#dfe2ee]">Scenario:</span>
            </div>

            <select
              value={selectedScenario.id}
              onChange={(e) => handleScenarioChange(e.target.value)}
              className="h-9 px-3 bg-[#0a0e16] text-[#dfe2ee] text-[13px] font-semibold rounded-xl border border-[#262a33] focus:outline-none focus:border-[#4edea3]"
            >
              {ROLEPLAY_SCENARIOS.map(sc => (
                <option key={sc.id} value={sc.id}>
                  {sc.title} ({sc.levelRange})
                </option>
              ))}
            </select>

            <span className="px-2.5 py-0.5 rounded-full bg-[#4cd7f6]/10 text-[#4cd7f6] text-[11px] font-bold border border-[#4cd7f6]/25">
              Role: {selectedScenario.aiRole}
            </span>

            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#bbcabf] bg-[#1c2028] px-2 py-0.5 rounded-md border border-white/5">
              <span className="material-symbols-outlined text-[13px] text-[#4edea3]">record_voice_over</span>
              <span>{selectedScenario.accent}</span>
            </span>
          </div>

          {/* Right Rigor & Controls */}
          <div className="flex items-center gap-3">
            <div className="flex items-center p-0.5 bg-[#0a0e16] rounded-lg border border-[#262a33]">
              <button
                onClick={() => setRigorMode('gentle')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                  rigorMode === 'gentle' ? 'bg-[#262a33] text-[#4edea3]' : 'text-[#86948a]'
                }`}
              >
                Gentle Flow
              </button>
              <button
                onClick={() => setRigorMode('strict')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                  rigorMode === 'strict' ? 'bg-[#262a33] text-[#4edea3]' : 'text-[#86948a]'
                }`}
              >
                Strict Grammar
              </button>
            </div>

            <button
              onClick={() => handleScenarioChange(selectedScenario.id)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1c2028] hover:bg-[#262a33] text-[#bbcabf] hover:text-[#dfe2ee] text-[12px] transition-all border border-[#262a33]"
              title="Reset Round to Beginning"
            >
              <span className="material-symbols-outlined text-[15px]">refresh</span>
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-5 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Main Chat Stream (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Round Status Banner */}
            <div className="w-full bg-[#181c24] px-4 py-2 rounded-xl border border-[#262a33] flex items-center justify-between text-[12px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping" />
                <span className="font-bold text-[#dfe2ee]">
                  Round 2 of 5: Conflict Resolution & Product Trade-offs
                </span>
              </div>
              <span className="text-[#86948a] font-mono">Real-time Coaching Active</span>
            </div>

            {/* Conversation Flow Card */}
            <div className="bg-[#0f131c] rounded-2xl border border-[#262a33] p-4 sm:p-5 flex flex-col gap-5 min-h-[460px] shadow-2xl">
              {messages.map((msg) => (
                <div key={msg.id} className="flex flex-col gap-2">
                  {msg.sender === 'ai' ? (
                    /* AI Message Bubble */
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#1c2028] shrink-0 border border-[#4cd7f6]/40 shadow-md">
                        <img
                          alt={msg.name}
                          className="w-full h-full object-cover"
                          src={msg.avatar}
                        />
                      </div>
                      <div className="flex-1 max-w-2xl flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-bold text-[#dfe2ee]">{msg.name}</span>
                            {msg.badge && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#4cd7f6]/15 text-[#4cd7f6] font-semibold border border-[#4cd7f6]/25">
                                {msg.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#86948a]">{msg.timestamp}</span>
                        </div>

                        {/* Speech Bubble */}
                        <div className="p-4 rounded-2xl rounded-tl-sm bg-[#1c2028] border border-[#262a33] text-[#dfe2ee] text-[14px] leading-relaxed shadow-md">
                          <p>{msg.text}</p>

                          {/* Phonetic Pronunciation Chips if available */}
                          {msg.phonetics && (
                            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center gap-2 flex-wrap">
                              <span className="text-[11px] text-[#86948a] font-semibold">
                                Target Phonetics:
                              </span>
                              {msg.phonetics.map((p, pIdx) => (
                                <button
                                  key={pIdx}
                                  onClick={() => handlePronounceChip(p.word)}
                                  className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#262a33] hover:bg-[#353942] text-[11px] text-[#4cd7f6] transition-all border border-[#4cd7f6]/20 group"
                                  title={`Click to listen to "${p.word}"`}
                                  type="button"
                                >
                                  <span className="font-semibold">{p.word}</span>
                                  <span className="font-mono text-[10px] text-[#bbcabf] group-hover:text-[#dfe2ee]">
                                    {p.ipa}
                                  </span>
                                  <span className="material-symbols-outlined text-[13px] text-[#4edea3]">volume_up</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Audio Listen Button */}
                        <div className="flex items-center gap-2 mt-0.5">
                          <button
                            onClick={() => handlePlayAudio(msg.id, msg.text)}
                            disabled={playingAudioId === msg.id}
                            className="flex items-center gap-1.5 text-[11px] text-[#bbcabf] hover:text-[#4edea3] transition-colors"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[15px] text-[#4cd7f6]">
                              {playingAudioId === msg.id ? 'graphic_eq' : 'volume_up'}
                            </span>
                            <span>{playingAudioId === msg.id ? 'Speaking...' : 'Listen (1.0x)'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* User Speech Turn + Instant Coaching Card */
                    <div className="flex flex-col items-end gap-2.5">
                      <div className="flex items-start gap-3 flex-row-reverse max-w-2xl">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#262a33] shrink-0 border border-[#4edea3]/40 shadow-md">
                          <img
                            alt={msg.name}
                            className="w-full h-full object-cover"
                            src={msg.avatar}
                          />
                        </div>
                        <div className="flex-1 flex flex-col items-end gap-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[#86948a]">{msg.timestamp}</span>
                            <span className="text-[13px] font-bold text-[#dfe2ee]">{msg.name}</span>
                            {msg.accuracy && (
                              <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#4edea3]/20 text-[#4edea3] font-bold border border-[#4edea3]/30">
                                Accuracy {msg.accuracy}%
                              </span>
                            )}
                          </div>

                          {/* Raw User Bubble */}
                          <div className="p-4 rounded-2xl rounded-tr-sm bg-[#1c2028] border border-[#262a33] text-[#dfe2ee] text-[14px] leading-relaxed shadow-md">
                            "{msg.text}"
                          </div>
                        </div>
                      </div>

                      {/* AI Instant Coaching Nuance Card */}
                      {msg.coaching && (
                        <div className="w-full max-w-2xl ml-auto bg-[#181c24] border border-[#4edea3]/30 rounded-xl p-4 shadow-lg flex flex-col gap-3">
                          <div className="flex items-center justify-between border-b border-white/5 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-[#4edea3] text-[18px]">auto_fix_high</span>
                              <span className="text-[12px] font-bold text-[#dfe2ee] tracking-wide uppercase">
                                AI Instant Native Polish
                              </span>
                            </div>
                            <span className="text-[10px] text-[#4edea3] bg-[#4edea3]/10 px-2 py-0.5 rounded-full font-bold">
                              CEFR C1 Level Phrasing
                            </span>
                          </div>

                          {/* Comparison Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px]">
                            <div className="p-2.5 rounded-lg bg-[#0a0e16]/60 border border-[#262a33]">
                              <span className="text-[10px] font-bold text-[#ffb4ab] uppercase tracking-wider block mb-1">
                                What You Said:
                              </span>
                              <p className="text-[#bbcabf] italic">"{msg.text}"</p>
                            </div>
                            <div className="p-2.5 rounded-lg bg-[#4edea3]/10 border border-[#4edea3]/30">
                              <span className="text-[10px] font-bold text-[#4edea3] uppercase tracking-wider block mb-1">
                                Better Native Phrasing:
                              </span>
                              <p className="text-[#dfe2ee] font-medium">"{msg.coaching.improvedText}"</p>
                            </div>
                          </div>

                          {/* Grammar Nuance Explanation Box */}
                          <div className="p-2.5 rounded-lg bg-[#1c2028] border border-white/5 text-[12px] text-[#bbcabf] leading-relaxed flex items-start gap-2">
                            <span className="material-symbols-outlined text-[#4cd7f6] text-[16px] shrink-0 mt-0.5">info</span>
                            <div>
                              <strong className="text-[#dfe2ee] font-semibold mr-1">Why this sounds more native:</strong>
                              {msg.coaching.grammarNote}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick AI Response Suggestions */}
            <div className="w-full bg-[#181c24] p-3 rounded-xl border border-[#262a33] flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] text-[#86948a] font-bold uppercase tracking-wider">
                <span>Suggested Response Pathways:</span>
                <span className="text-[#4cd7f6]">Click to auto-populate</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => handleSendMessage("I aligned the roadmap around our core north-star metric and proposed a phased rollout to de-scope secondary features.")}
                  className="p-2.5 rounded-lg bg-[#1c2028] hover:bg-[#262a33] border border-white/5 text-left text-[12px] text-[#dfe2ee] transition-all group hover:border-[#4edea3]/30"
                  type="button"
                >
                  <span className="text-[#4edea3] font-bold block text-[11px] mb-0.5">
                    Option A: Metric-Focused
                  </span>
                  <p className="line-clamp-2 text-[#bbcabf] group-hover:text-[#dfe2ee]">
                    "I aligned the roadmap around our core north-star metric and proposed phased rollouts."
                  </p>
                </button>
                <button
                  onClick={() => handleSendMessage("I scheduled a 1-on-1 sync to understand his engineering constraints and build shared empathy before debating dates.")}
                  className="p-2.5 rounded-lg bg-[#1c2028] hover:bg-[#262a33] border border-white/5 text-left text-[12px] text-[#dfe2ee] transition-all group hover:border-[#4edea3]/30"
                  type="button"
                >
                  <span className="text-[#4cd7f6] font-bold block text-[11px] mb-0.5">
                    Option B: Soft Skills & Empathy
                  </span>
                  <p className="line-clamp-2 text-[#bbcabf] group-hover:text-[#dfe2ee]">
                    "I scheduled a 1-on-1 sync to understand engineering constraints before debating dates."
                  </p>
                </button>
                <button
                  onClick={() => handleSendMessage("I acknowledged his pushback as valid technical risk and made a strategic concession on real-time sync.")}
                  className="p-2.5 rounded-lg bg-[#1c2028] hover:bg-[#262a33] border border-white/5 text-left text-[12px] text-[#dfe2ee] transition-all group hover:border-[#4edea3]/30"
                  type="button"
                >
                  <span className="text-[#c0c1ff] font-bold block text-[11px] mb-0.5">
                    Option C: Concession Strategy
                  </span>
                  <p className="line-clamp-2 text-[#bbcabf] group-hover:text-[#dfe2ee]">
                    "I acknowledged his pushback as valid and made a strategic concession on real-time sync."
                  </p>
                </button>
              </div>
            </div>

            {/* Native Thought Translator Drawer Toggle */}
            {showTranslator && (
              <div className="w-full bg-[#181c24] p-3.5 rounded-xl border border-[#4cd7f6]/30 flex flex-col gap-2">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-bold text-[#dfe2ee] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#4cd7f6] text-[16px]">translate</span>
                    Native Thought Translator (Any Language)
                  </span>
                  <button
                    onClick={() => setShowTranslator(false)}
                    className="text-[#86948a] hover:text-[#dfe2ee]"
                  >
                    Close
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    value={nativeThoughtText}
                    onChange={(e) => setNativeThoughtText(e.target.value)}
                    placeholder="Escribe en español, écris en français, 用中文输入你的想法..."
                    className="flex-1 h-10 px-3 bg-[#0a0e16] border border-[#262a33] rounded-lg text-[13px] text-[#dfe2ee] focus:outline-none focus:border-[#4cd7f6]"
                  />
                  <button
                    onClick={handleTranslateNativeThought}
                    className="px-4 bg-[#4cd7f6] hover:bg-[#38bdf8] text-[#00344d] font-bold text-[12px] rounded-lg shadow-md"
                  >
                    Convert to Native Phrasing
                  </button>
                </div>
              </div>
            )}

            {/* Interactive Speech / Text Input Dock */}
            <div className="w-full bg-[#1c2028] p-3 rounded-2xl border border-[#262a33] flex items-center gap-2 shadow-xl">
              {/* Native Translator Toggle button */}
              <button
                onClick={() => setShowTranslator(!showTranslator)}
                className={`p-2.5 rounded-xl transition-all ${
                  showTranslator
                    ? 'bg-[#4cd7f6]/20 text-[#4cd7f6] border border-[#4cd7f6]/30'
                    : 'bg-[#262a33] text-[#bbcabf] hover:text-[#dfe2ee]'
                }`}
                title="Translate your native thoughts into natural English idioms"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">translate</span>
              </button>

              {/* Microphone dictation button */}
              <button
                onClick={handleToggleVoiceDictation}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all active:scale-95 ${
                  isRecording
                    ? 'bg-[#93000a] text-[#ffdad6] border border-[#ffb4ab]/40 animate-pulse'
                    : 'bg-[#4edea3] text-[#003824] shadow-md hover:bg-[#6ffbbe]'
                }`}
                title={isRecording ? 'Click to finish speaking' : 'Click to speak response'}
                type="button"
              >
                <span className="material-symbols-outlined text-[22px]">
                  {isRecording ? 'graphic_eq' : 'mic'}
                </span>
              </button>

              {/* Text Input */}
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={isRecording ? 'Listening to your speech...' : 'Type or speak your answer...'}
                className="flex-1 h-11 px-4 bg-[#0a0e16] border border-[#262a33] rounded-xl text-[14px] text-[#dfe2ee] placeholder-[#86948a] focus:outline-none focus:border-[#4edea3]"
              />

              {/* Submit Button */}
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className="h-11 px-5 rounded-xl bg-[#4edea3] hover:bg-[#10b981] disabled:opacity-40 disabled:hover:bg-[#4edea3] text-[#003824] font-bold text-[13px] flex items-center gap-1.5 transition-all shadow-md shadow-[#4edea3]/20"
                type="button"
              >
                <span>Send</span>
                <span className="material-symbols-outlined text-[16px]">send</span>
              </button>
            </div>
          </div>

          {/* Right Analytics & Vocabulary Drawer (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Session Vitals Card */}
            <div className="bg-[#1c2028] p-5 rounded-2xl border border-[#262a33] shadow-md flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h4 className="font-['Plus+Jakarta+Sans'] text-[16px] font-bold text-[#dfe2ee]">
                  Session Fluency Vitals
                </h4>
                <span className="text-[#4edea3] text-[11px] font-bold bg-[#4edea3]/10 px-2 py-0.5 rounded-full">
                  Live Engine
                </span>
              </div>

              {/* Circular Donut Gauges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#181c24] rounded-xl border border-white/5 flex flex-col items-center">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-[#262a33]"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      />
                      <path
                        className="text-[#4edea3]"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray="78, 100"
                        strokeLinecap="round"
                        strokeWidth="3.5"
                      />
                    </svg>
                    <span className="absolute text-[13px] font-extrabold text-[#4edea3]">78%</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#dfe2ee] mt-2">Vocab Range</span>
                  <span className="text-[10px] text-[#86948a]">CEFR C1 Level</span>
                </div>

                <div className="p-3 bg-[#181c24] rounded-xl border border-white/5 flex flex-col items-center">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-[#262a33]"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                      />
                      <path
                        className="text-[#4cd7f6]"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray="92, 100"
                        strokeLinecap="round"
                        strokeWidth="3.5"
                      />
                    </svg>
                    <span className="absolute text-[13px] font-extrabold text-[#4cd7f6]">92%</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#dfe2ee] mt-2">Grammar Acc.</span>
                  <span className="text-[10px] text-[#86948a]">High Precision</span>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="p-3 bg-[#181c24] rounded-xl border border-white/5 flex items-center justify-between text-[12px]">
                <div>
                  <span className="text-[#86948a] block">Spoken Today</span>
                  <span className="text-[16px] font-bold text-[#dfe2ee]">{wordsSpokenCount} words</span>
                </div>
                <div className="text-right">
                  <span className="text-[#86948a] block">Speaking Pace</span>
                  <span className="text-[16px] font-bold text-[#4edea3]">124 WPM</span>
                </div>
              </div>
            </div>

            {/* Target Vocabulary in this Scenario */}
            <div className="bg-[#1c2028] p-5 rounded-2xl border border-[#262a33] shadow-md flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h4 className="font-['Plus+Jakarta+Sans'] text-[15px] font-bold text-[#dfe2ee]">
                  Target Scenario Vocabulary
                </h4>
                <span className="text-[11px] text-[#86948a]">1 of 3 Used</span>
              </div>

              <div className="space-y-2.5">
                {TARGET_VOCABULARY.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#181c24] rounded-xl border border-white/5 flex flex-col gap-1 hover:border-[#4edea3]/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#dfe2ee] text-[13px]">{item.term}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-[#4edea3]/15 text-[#4edea3] rounded font-semibold">
                          {item.level}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          item.practiced ? 'bg-[#4edea3]/20 text-[#4edea3]' : 'bg-[#262a33] text-[#86948a]'
                        }`}
                      >
                        {item.practiced ? 'Mastered in turn' : 'Pending usage'}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#bbcabf] leading-snug">{item.definition}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Speaker Habit Tip Card */}
            <div className="bg-[#181c24] p-4 rounded-xl border border-[#4cd7f6]/25 shadow-md flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#4cd7f6]/15 text-[#4cd7f6] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[20px]">lightbulb</span>
              </div>
              <div className="text-[12px] text-[#bbcabf]">
                <strong className="text-[#dfe2ee] block mb-0.5">Executive Habit: The Rule of 3s</strong>
                When asked behavioral interview questions, open with: "There were three key factors I evaluated: first, the technical debt; second, the team velocity; and third, the customer impact."
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
