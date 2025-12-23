
import React, { useState, useEffect, useCallback } from 'react';
import { soundService } from '../services/soundService';

interface CandyGameProps {
  onBack: () => void;
}

interface Candy {
  id: number;
  isBomb: boolean;
  isRevealed: boolean;
}

const CandyGame: React.FC<CandyGameProps> = ({ onBack }) => {
  const [candyCount, setCandyCount] = useState(6);
  const [candies, setCandies] = useState<Candy[]>([]);
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'exploded'>('setup');
  const [explodedId, setExplodedId] = useState<number | null>(null);

  const initGame = useCallback(() => {
    soundService.playClick();
    const bombIndex = Math.floor(Math.random() * candyCount);
    const newCandies = Array.from({ length: candyCount }, (_, i) => ({
      id: i,
      isBomb: i === bombIndex,
      isRevealed: false
    }));
    setCandies(newCandies);
    setExplodedId(null);
    setGameState('playing');
  }, [candyCount]);

  const handleCandyClick = (id: number) => {
    if (gameState !== 'playing') return;

    const candy = candies.find(c => c.id === id);
    if (!candy || candy.isRevealed) return;

    if (candy.isBomb) {
      const revealedAll = candies.map(c => ({ ...c, isRevealed: true }));
      setCandies(revealedAll);
      setExplodedId(id);
      setGameState('exploded');
      soundService.playBomb();
    } else {
      const newCandies = candies.map(c => 
        c.id === id ? { ...c, isRevealed: true } : c
      );
      setCandies(newCandies);
      soundService.playFlip();
    }
  };

  const handleBack = () => {
    soundService.playClick();
    onBack();
  };

  const adjustCandyCount = (delta: number) => {
    soundService.playClick();
    setCandyCount(prev => Math.min(20, Math.max(2, prev + delta)));
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 animate-in fade-in duration-500 relative">
      <header className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center safe-area-inset">
        <button 
          onClick={handleBack} 
          className="glass p-4 rounded-2xl hover:bg-[var(--text-color)]/10 transition-all group"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div className="font-display text-2xl tracking-widest text-[var(--text-color)]/20 uppercase">CANDY_BOMB</div>
      </header>

      {gameState === 'setup' ? (
        <div className="glass p-10 md:p-12 rounded-[40px] bg-[var(--card-bg)] border-[var(--glass-border)] max-w-md w-full text-center space-y-10 shadow-2xl animate-in zoom-in-95 duration-500 mx-4">
          <div className="space-y-2">
            <h2 className="font-display text-5xl text-[var(--text-color)] tracking-widest">THIẾT LẬP</h2>
            <p className="font-mono text-[9px] text-[var(--text-color)]/30 uppercase tracking-[0.3em]">Số lượng kẹo (Số người chơi)</p>
          </div>
          
          <div className="flex items-center justify-center gap-8">
            <button 
              onClick={() => adjustCandyCount(-1)}
              className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-3xl font-bold text-[var(--text-color)]/50 hover:text-[var(--text-color)] hover:bg-[var(--text-color)]/5 transition-colors"
            >-</button>
            <span className="font-display text-7xl text-[var(--neon-cyan)]">{candyCount}</span>
            <button 
              onClick={() => adjustCandyCount(1)}
              className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-3xl font-bold text-[var(--text-color)]/50 hover:text-[var(--text-color)] hover:bg-[var(--text-color)]/5 transition-colors"
            >+</button>
          </div>

          <button 
            onClick={initGame}
            className="w-full py-6 bg-[var(--text-color)] text-[var(--bg-color)] rounded-[24px] font-black text-xs tracking-[0.5em] uppercase shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
          >
            Bắt đầu quét
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl space-y-10 md:space-y-16 flex flex-col items-center">
          <div className="text-center px-4">
            {gameState === 'exploded' ? (
              <div className="animate-bounce">
                <h2 className="font-display text-5xl md:text-7xl text-red-500 tracking-tighter drop-shadow-[0_0_20px_rgba(239,68,68,0.5)] uppercase">BÙM! NHẬU ĐÊ!</h2>
                <p className="font-mono text-[10px] text-[var(--text-color)]/40 uppercase tracking-[0.5em] mt-2 italic">Dữ liệu đã bị phá hủy</p>
              </div>
            ) : (
              <div className="space-y-2">
                <h2 className="font-display text-4xl md:text-5xl text-[var(--text-color)] tracking-widest uppercase">CHỌN KẸO</h2>
                <p className="font-mono text-[10px] text-[var(--neon-cyan)] uppercase tracking-[0.5em] animate-pulse">System Monitoring...</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 md:gap-6 p-4">
            {candies.map((candy) => (
              <button
                key={candy.id}
                onClick={() => handleCandyClick(candy.id)}
                disabled={candy.isRevealed && gameState !== 'exploded'}
                className={`
                  relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl transition-all duration-500 preserve-3d
                  ${candy.isRevealed ? '[transform:rotateY(180deg)]' : 'hover:scale-110 active:scale-90'}
                `}
              >
                <div className="absolute inset-0 bg-[var(--card-bg)] border-2 border-[var(--glass-border)] rounded-3xl flex items-center justify-center backface-hidden shadow-lg z-10">
                  <div className="w-8 h-8 rounded-full bg-[var(--text-color)]/5 animate-pulse flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[var(--neon-cyan)]/30"></div>
                  </div>
                </div>

                <div className={`
                  absolute inset-0 rounded-3xl flex items-center justify-center [transform:rotateY(180deg)] backface-hidden border-2 transition-colors duration-500
                  ${!candy.isRevealed 
                    ? 'bg-[var(--card-bg)] border-[var(--glass-border)]' 
                    : candy.isBomb 
                      ? 'bg-red-500/20 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]' 
                      : 'bg-green-500/20 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]'}
                `}>
                  {candy.isRevealed && (
                    <>
                      {candy.isBomb ? (
                        <svg className="text-red-500 animate-ping" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10 2v2M14 2v2M8.5 4.5l1.5 1.5M15.5 4.5l-1.5 1.5M12 7a5 5 0 0 1 5 5c0 3.5-3 5-3 9h-4c0-4-3-5.5-3-9a5 5 0 0 1 5-5z"/></svg>
                      ) : (
                        <svg className="text-green-500 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
                          <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
                          <path d="M15.5 15.5 20 20M17 20l3-3" />
                          <path d="M8.5 8.5 4 4M7 4l-3 3" />
                          <path d="M15.5 8.5 20 4M17 4l3 3" />
                          <path d="M8.5 15.5 4 20M7 20l-3-3" />
                        </svg>
                      )}
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-4 md:gap-6 mt-8 md:mt-12 px-4">
            <button 
              onClick={() => { soundService.playClick(); setGameState('setup'); }}
              className="px-6 md:px-8 py-3 glass rounded-2xl text-[var(--text-color)]/30 font-bold hover:text-[var(--text-color)] transition-all uppercase tracking-[0.2em] text-[10px]"
            >
              Cài đặt
            </button>
            {gameState === 'exploded' && (
              <button 
                onClick={initGame}
                className="px-8 md:px-12 py-3 bg-[var(--neon-cyan)] text-black rounded-2xl font-black transition-all uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-[var(--neon-cyan)]/20 animate-bounce"
              >
                Ván mới
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CandyGame;
