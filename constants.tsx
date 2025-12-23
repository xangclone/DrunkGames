
import React from 'react';
import { CardType, Card, DiceRule } from './types';

export const INITIAL_CARDS: Card[] = [
  { id: '1', type: CardType.TRUTH, content: "Ai là người bạn cảm thấy 'phiền' nhất trong bàn nhậu này?", intensity: 1 },
  { id: '2', type: CardType.DARE, content: "Gọi điện cho người yêu cũ và nói 'Em/Anh nhớ món bún đậu mắm tôm mình hay ăn'.", intensity: 3 },
  { id: '3', type: CardType.CHALLENGE, content: "Uống 1 ly với người ngồi đối diện mà không dùng tay.", intensity: 2 },
  { id: '4', type: CardType.TRUTH, content: "Mô tả lần say xỉn đáng xấu hổ nhất của bạn.", intensity: 1 },
  { id: '5', type: CardType.DARE, content: "Thử thực hiện động tác moonwalk của Michael Jackson ngay tại chỗ.", intensity: 1 }
];

export const INITIAL_DICE_RULES: DiceRule[] = [
  { value: 1, label: 'TỰ XỬ', desc: 'Uống 1 ly ngay lập tức!' },
  { value: 2, label: 'CHỈ ĐỊNH', desc: 'Chọn 1 người uống cùng bạn.' },
  { value: 3, label: 'QUA LƯỢT', desc: 'May mắn! Bạn không cần uống.' },
  { value: 4, label: 'CẢ LÀNG', desc: 'Tất cả mọi người cùng cạn ly!' },
  { value: 5, label: 'TAY TRÁI', desc: 'Tất cả uống bằng tay không thuận.' },
  { value: 6, label: 'VUA LÌ ĐÒN', desc: 'Thách đấu 1 người oẳn tù tì, thua uống 2 ly.' },
];

export const DICE_ICONS: Record<number, React.ReactNode> = {
  1: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7z"/><path d="M12 7v10M9 12h6"/></svg>,
  2: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m10 14 2-2 2 2"/><path d="M12 12V3"/><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/></svg>,
  3: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
  4: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 18h12M12 22v-4M8 2l1 7h6l1-7H8zM7 9v5a5 5 0 0 0 10 0V9"/></svg>,
  5: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v10"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>,
  6: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 14s1 1 1 1 1-2 2-2 1 1 1 1 1-2 2-2 1 1 1 1 1-2 2-2 1 1 1 1"/><path d="M12 2v20"/><path d="m2 12 10 10 10-10L12 2z"/></svg>,
};

export const TYPE_COLORS = {
  [CardType.TRUTH]: 'border-[#00ffff] shadow-[0_0_20px_rgba(0,255,255,0.3)]',
  [CardType.DARE]: 'border-[#ff00ff] shadow-[0_0_20px_rgba(255,0,255,0.3)]',
  [CardType.CHALLENGE]: 'border-[#adff2f] shadow-[0_0_20px_rgba(173,255,47,0.3)]'
};

export const TYPE_TEXT_COLORS = {
  [CardType.TRUTH]: 'text-[#00ffff]',
  [CardType.DARE]: 'text-[#ff00ff]',
  [CardType.CHALLENGE]: 'text-[#adff2f]'
};

export const TYPE_LABELS = {
  [CardType.TRUTH]: 'TRUTH',
  [CardType.DARE]: 'DARE',
  [CardType.CHALLENGE]: 'DRINK'
};
