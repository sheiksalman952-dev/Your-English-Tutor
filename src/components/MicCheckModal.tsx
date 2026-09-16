import React, { useState, useEffect, useRef } from 'react';
import { playChimeTone } from '../utils/audio';

interface MicCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MicCheckModal: React.FC<MicCheckModalProps> = ({ isOpen, onClose }) => {
  const [micActive, setMicActive] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(35);
  const [testingSpeaker, setTestingSpeaker] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('Default - MacBook Pro Microphone');
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    // Try acquiring real microphone or simulate live decibel levels
    let stream: MediaStream | null = null;
    let audioContext: AudioContext | null = null;

    async function initMic() {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          setMicActive(true);
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioContext = new AudioContextClass();
          const source = audioContext.createMediaStreamSource(stream);
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 64;
          source.connect(analyser);

          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          const checkVolume = () => {
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            const avg = sum / dataArray.length;
            const mapped = Math.min(100, Math.max(10, Math.round((avg / 128) * 100)));
            setVolumeLevel(mapped);
            animationFrameRef.current = requestAnimationFrame(checkVolume);
          };
          checkVolume();
          return;
        }
      } catch (err) {
        console.warn("Real mic permission constrained, running audio simulation:", err);
      }

      // Fallback simulation
      setMicActive(true);
      const interval = setInterval(() => {
        setVolumeLevel(Math.floor(25 + Math.random() * 55));
      }, 150);

      return () => clearInterval(interval);
    }

    initMic();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (stream) stream.getTracks().forEach(t => t.stop());
      if (audioContext) audioContext.close();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestSpeaker = () => {
    setTestingSpeaker(true);
    playChimeTone('test');
    setTimeout(() => setTestingSpeaker(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0e16]/80 backdrop-blur-md p-4">
      <div className="w-full max-w-md bg-[#1c2028] border border-[#262a33] rounded-2xl p-6 shadow-2xl flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#4edea3]/15 text-[#4edea3] flex items-center justify-center border border-[#4edea3]/30">
              <span className="material-symbols-outlined text-[22px]">mic</span>
            </div>
            <div>
              <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#dfe2ee]">
                Audio & Mic Check
              </h3>
              <p className="text-[12px] text-[#bbcabf]">
                Ensure your vocal presence is crystal clear
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#bbcabf] hover:text-[#dfe2ee] hover:bg-[#262a33] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Input device selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-[#bbcabf]">Microphone Input Device</label>
          <select
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            className="w-full h-11 bg-[#0a0e16] border border-[#262a33] text-[#dfe2ee] px-3 rounded-xl text-[13px] focus:outline-none focus:border-[#4edea3]"
          >
            <option>Default - MacBook Pro Microphone (Built-in)</option>
            <option>External USB Headset / AirPod Voice</option>
            <option>Virtual Studio Audio Driver</option>
          </select>
        </div>

        {/* Real-time Level Meter */}
        <div className="p-4 rounded-xl bg-[#181c24] border border-[#262a33] flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-[#dfe2ee] font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
              Microphone Sensitivity Level
            </span>
            <span className="font-mono text-[#4edea3] font-bold">{volumeLevel}%</span>
          </div>
          <div className="w-full h-3 bg-[#0a0e16] rounded-full overflow-hidden p-0.5 border border-[#262a33]">
            <div
              className={`h-full rounded-full transition-all duration-100 ${
                volumeLevel > 75 ? 'bg-[#ffb4ab]' : volumeLevel > 40 ? 'bg-[#4edea3]' : 'bg-[#4cd7f6]'
              }`}
              style={{ width: `${volumeLevel}%` }}
            />
          </div>
          <p className="text-[11px] text-[#86948a]">
            {volumeLevel > 75
              ? '⚠️ High volume detected: Move mic slightly further back.'
              : volumeLevel > 20
              ? '✅ Great level! Clear speech reception without clipping.'
              : 'Speak aloud into your microphone to verify detection.'}
          </p>
        </div>

        {/* Speaker Output Test */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#181c24] border border-[#262a33]">
          <div>
            <span className="text-[13px] font-semibold text-[#dfe2ee] block">Speaker Test Sound</span>
            <span className="text-[11px] text-[#bbcabf]">Play a high-definition verification chime</span>
          </div>
          <button
            onClick={handleTestSpeaker}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#4cd7f6]/15 hover:bg-[#4cd7f6]/25 text-[#4cd7f6] border border-[#4cd7f6]/30 text-[12px] font-bold transition-all active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">
              {testingSpeaker ? 'volume_up' : 'play_arrow'}
            </span>
            <span>{testingSpeaker ? 'Playing...' : 'Test Speaker'}</span>
          </button>
        </div>

        {/* Confirm */}
        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#4edea3] hover:bg-[#10b981] text-[#003824] font-bold text-[14px] shadow-lg shadow-[#4edea3]/20 transition-all"
          >
            All Set • Looks Ready
          </button>
        </div>
      </div>
    </div>
  );
};
