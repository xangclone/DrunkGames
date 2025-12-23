
export enum CardType {
  TRUTH = 'TRUTH',
  DARE = 'DARE',
  CHALLENGE = 'CHALLENGE'
}

export enum GameMode {
  ALL = 'ALL',
  TRUTH = 'TRUTH',
  DARE = 'DARE',
  CHALLENGE = 'CHALLENGE'
}

export interface Card {
  id: string;
  type: CardType;
  content: string;
  intensity: number; // 1 to 3
}

export interface DiceRule {
  value: number;
  label: string;
  desc: string;
}

export interface GameState {
  cards: Card[];
  diceRules: DiceRule[];
  currentIndex: number;
  isFlipped: boolean;
  mode: GameMode;
}

export type AppView = 'welcome' | 'mode_select' | 'game_cards' | 'game_dice' | 'game_candy';
