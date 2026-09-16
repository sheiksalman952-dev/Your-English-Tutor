export type ActiveView = 'live-call' | 'ai-coach' | 'practice-rooms' | 'dashboard';

export type CompanionMode = 'human' | 'anime';

export interface VocabularyItem {
  id: string;
  term: string;
  partOfSpeech: string;
  definition: string;
  level: 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  practiced?: boolean;
  phonetic?: string;
}

export interface GrammarWhisper {
  id: string;
  timeAgo: string;
  category: string;
  original: string;
  improved: string;
  explanation: string;
}

export interface ConversationQuestion {
  id: number;
  text: string;
  category: string;
}

export interface RoleplayScenario {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  levelRange: string;
  aiRole: string;
  accent: string;
  initialMessage: string;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  name: string;
  avatar?: string;
  role?: string;
  badge?: string;
  text: string;
  timestamp: string;
  accuracy?: number;
  phonetics?: { word: string; ipa: string }[];
  coaching?: {
    rawHighlight: string;
    improvedText: string;
    keywords: string[];
    grammarNote: string;
  };
}

export interface SpeakingTable {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  host: {
    name: string;
    countryFlag: string;
    level: string;
    avatar: string;
  };
  participants: string[];
  currentSpeaker: string;
  seatsOccupied: number;
  maxSeats: number;
  activeTopic?: boolean;
}
