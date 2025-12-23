
import { Card, CardType, DiceRule } from "../types";

const API_URL = '/api/cards'; 
const LOCAL_STORAGE_KEY = 'drunk_cards_data_v2';
const DICE_RULES_KEY = 'drunk_dice_rules_v1';

export const dbService = {
  async isCloudActive(): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/health`, { 
        method: 'GET',
        signal: AbortSignal.timeout(1500) 
      });
      return response.ok;
    } catch {
      return false;
    }
  },

  async getAllCards(): Promise<Card[]> {
    try {
      const response = await fetch(API_URL);
      if (response.ok) return await response.json();
    } catch (e) {}
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  },

  async getDiceRules(): Promise<DiceRule[] | null> {
    const saved = localStorage.getItem(DICE_RULES_KEY);
    return saved ? JSON.parse(saved) : null;
  },

  async saveDiceRules(rules: DiceRule[]): Promise<void> {
    localStorage.setItem(DICE_RULES_KEY, JSON.stringify(rules));
  },

  async addCard(card: Card, allCards: Card[]): Promise<void> {
    const newCards = [...allCards, card];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCards));
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(card),
      });
    } catch (e) {}
  },

  async deleteCard(id: string, allCards: Card[]): Promise<void> {
    const newCards = allCards.filter(c => c.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCards));
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    } catch (e) {}
  },

  async clearAll(): Promise<void> {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem(DICE_RULES_KEY);
  }
};
