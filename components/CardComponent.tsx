
import React from 'react';
import { Card, CardType } from '../types';
import { TYPE_COLORS, TYPE_LABELS, TYPE_TEXT_COLORS } from '../constants';
import { soundService } from '../services/soundService';

interface CardComponentProps {
  card: Card;
  isFlipped: boolean;
  onFlip: () => void;
  onComplete: () => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ card, isFlipped, onFlip, onComplete }) => {
  const handleFlip = () => {
    soundService.playFlip();
    onFlip();
  };

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundService.playClick();
    onFlip();
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  return (
    <div 
      className="relative w-72 h-[400px] md:w-80 md:h-[450px] cursor-pointer perspective-1000 group mx-auto"
      onClick={handleFlip}
    >
      <div 
        className={`relative w-full h-full transition-all duration-700 preserve-3d ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden glass border-2 rounded-[35px] md:rounded-[40px] shadow-xl flex flex-col items-center justify-center overflow-hidden bg-[var(--bg-color)]">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--text-color)]/5 to-transparent"></div>
          
          <div className="z-10 mb-6 text-[var(--text-color)]/80 animate-bounce">
            <svg width="60" height="60" className="md:w-20 md:h-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 7h.01M17 7h.01M7 17h.01M17 17h.01M12 12h.01" />
            </svg>
          </div>

          <h2 className="z-10 font-display text-3xl md:text-4xl text-[var(--text-color)] tracking-[0.2em] uppercase">LẬT THẺ</h2>
          <div className="absolute bottom-10 flex items-center gap-2 font-mono text-[8px] text-[var(--text-color)]/30 tracking-[0.4em] uppercase">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            ENCRYPTED SESSION
          </div>
        </div>

        {/* Back Side */}
        <div className={`absolute inset-0 backface-hidden [transform:rotateY(180deg)] glass border-4 ${TYPE_COLORS[card.type]} rounded-[35px] md:rounded-[40px] flex flex-col items-center justify-between p-6 md:p-8 overflow-hidden shadow-2xl bg-[var(--bg-color)]`}>
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-color)]/60 via-transparent to-[var(--bg-color)]/60"></div>
          
          <div className="w-full flex justify-between items-start z-10">
            <span className={`font-mono text-[8px] md:text-[10px] font-bold tracking-tighter opacity-60 ${TYPE_TEXT_COLORS[card.type]}`}>
              NODE_ID: {card.id.slice(0, 6)}
            </span>
            <div className="flex gap-1">
               {Array.from({ length: card.intensity }).map((_, i) => (
                 <svg key={i} className={`${TYPE_TEXT_COLORS[card.type]} md:w-[14px] md:h-[14px]`} width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
               ))}
            </div>
          </div>
          
          <div className="flex flex-col items-center z-10 flex-1 justify-center py-4 px-2">
            <div className={`mb-4 md:mb-6 p-2 rounded-xl border border-current/20 ${TYPE_TEXT_COLORS[card.type]}`}>
              {card.type === CardType.TRUTH && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
              {card.type === CardType.DARE && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>}
              {card.type === CardType.CHALLENGE && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>}
            </div>
            
            <span className={`px-4 py-1 rounded-full text-[8px] md:text-[9px] font-black tracking-[0.3em] mb-4 md:mb-6 uppercase border border-current/30 ${TYPE_TEXT_COLORS[card.type]}`}>
              {TYPE_LABELS[card.type]}
            </span>
            <p className="text-lg md:text-2xl font-bold text-center leading-tight md:leading-relaxed text-[var(--text-color)]">
              {card.content}
            </p>
          </div>

          <div className="w-full z-10">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--text-color)]/10 to-transparent mb-4 md:mb-6"></div>
            <button 
              className={`w-full py-4 glass border-[var(--text-color)]/5 rounded-2xl transition-all font-black text-[9px] uppercase tracking-[0.2em] text-[var(--text-color)]/90 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group/btn`}
              onClick={handleComplete}
            >
              HOÀN THÀNH
              <svg className="group-hover/btn:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
