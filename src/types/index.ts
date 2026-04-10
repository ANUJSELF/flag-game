export interface Country {
  name: string;
  code: string;
  flagUrl: string;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

export type GamePhase = 'start' | 'spinning' | 'question' | 'answer' | 'gameover';
