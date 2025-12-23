
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardType, GameState, GameMode, AppView, DiceRule } from './types';
import { INITIAL_CARDS, INITIAL_DICE_RULES, TYPE_LABELS, TYPE_TEXT_COLORS } from './constants';
import CardComponent from './components/CardComponent';
import ManagementModal from './components/ManagementModal';
import DiceGame from './components/DiceGame';
import CandyGame from './components/CandyGame';
import { dbService } from './services/dbService';
import { soundService } from './services/soundService';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    diceRules: INITIAL_DICE_RULES,
    currentIndex: 0,
    isFlipped: false,
    mode: GameMode.ALL
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isManagementOpen, setIsManagementOpen] = useState(false);
  const [view, setView] = useState<AppView>('welcome');

  useEffect(() => {
    document.body.className = `safe-area-inset ${theme}-mode`;
  }, [theme]);

  const toggleTheme = () => {
    soundService.playClick();
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const loadData = async () => {
    setIsLoading(true);
    const cards = await dbService.getAllCards();
    const diceRules = await dbService.getDiceRules();

    setGameState(prev => ({ 
      ...prev, 
      cards: cards.length > 0 ? cards : INITIAL_CARDS,
      diceRules: diceRules || INITIAL_DICE_RULES
    }));
    
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredCards = useMemo(() => {
    if (gameState.mode === GameMode.ALL) return gameState.cards;
    return gameState.cards.filter(card => card.type === (gameState.mode as unknown as CardType));
  }, [gameState.cards, gameState.mode]);

  const currentCard = useMemo(() => {
    return filteredCards[gameState.currentIndex] || null;
  }, [filteredCards, gameState.currentIndex]);

  const handleNext = useCallback(() => {
    soundService.playFlip();
    setGameState(prev => {
      let nextIndex = prev.currentIndex + 1;
      if (nextIndex >= filteredCards.length) {
        return { ...prev, currentIndex: 0, isFlipped: false };
      }
      return { ...prev, currentIndex: nextIndex, isFlipped: false };
    });
  }, [filteredCards.length]);

  const handleFlip = () => {
    setGameState(prev => ({ ...prev, isFlipped: !prev.isFlipped }));
  };

  const handleShuffle = () => {
    if (filteredCards.length <= 1) return;
    soundService.playClick();
    setIsShuffling(true);
    setTimeout(() => {
      setGameState(prev => {
        const shuffled = [...prev.cards].sort(() => Math.random() - 0.5);
        return { ...prev, cards: shuffled, currentIndex: 0, isFlipped: false };
      });
      setIsShuffling(false);
    }, 800);
  };

  const selectMode = (mode: GameMode) => {
    soundService.playClick();
    setGameState(prev => ({ ...prev, mode, currentIndex: 0, isFlipped: false }));
    setView('game_cards');
    handleShuffle();
  };

  const handleAddCard = async (card: Card) => {
    soundService.playSuccess();
    await dbService.addCard(card, gameState.cards);
    setGameState(prev => ({ ...prev, cards: [...prev.cards, card] }));
  };

  const handleRemoveCard = async (id: string) => {
    soundService.playClick();
    await dbService.deleteCard(id, gameState.cards);
    setGameState(prev => ({
      ...prev,
      cards: prev.cards.filter(c => c.id !== id),
      currentIndex: 0
    }));
  };

  const handleUpdateDiceRules = async (rules: DiceRule[]) => {
    soundService.playSuccess();
    await dbService.saveDiceRules(rules);
    setGameState(prev => ({ ...prev, diceRules: rules }));
  };

  const handleResetData = async () => {
    if (confirm("Bạn có muốn xóa toàn bộ dữ liệu?")) {
      soundService.playBomb();
      await dbService.clearAll();
      await loadData();
    }
  };

  const changeView = (newView: AppView) => {
    soundService.playClick();
    setView(newView);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
        <div className="w-16 h-16 border-4 border-[var(--neon-cyan)] border-t-transparent rounded-full animate-spin"></div>
        <p className="neon-text-cyan font-mono text-[10px] tracking-[0.5em] animate-pulse uppercase">Syncing Reality...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[var(--text-color)] relative flex flex-col transition-colors duration-500">
      {/* Theme Toggle Button - Moved to Bottom Right */}
      <button 
        onClick={toggleTheme}
        className="fixed bottom-8 right-8 z-[100] glass w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl border-2 border-[var(--glass-border)] bg-[var(--glass-bg)]"
        title="Đổi giao diện"
      >
        {theme === 'dark' ? (
          <svg className="neon-text-cyan" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
        ) : (
          <svg className="text-slate-800" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        )}
      </button>

      {view === 'welcome' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-700">
          <div className="relative mb-12 md:mb-20">
            <h1 className="relative font-display text-7xl md:text-9xl lg:text-[13rem] tracking-tighter leading-none">
              <span className="block neon-text-cyan transform -rotate-3 transition-transform hover:rotate-0 duration-500 drop-shadow-[0_0_30px_rgba(0,255,255,0.4)]">DRUNK</span>
              <span className="block text-[var(--text-color)] transform rotate-2 transition-transform hover:rotate-0 duration-500 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">GAMES</span>
            </h1>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl z-10 px-4 mb-8">
            <button 
              onClick={() => changeView('mode_select')}
              className="group relative p-6 md:p-10 glass rounded-[30px] md:rounded-[40px] transition-all hover:scale-[1.02] hover:bg-[var(--text-color)]/[0.05] active:scale-95 text-left overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M7 7h.01M17 7h.01M7 17h.01M17 17h.01M12 12h.01" /></svg>
              </div>
              <span className="block font-display text-4xl md:text-5xl mb-1 tracking-widest text-[var(--text-color)]">LẬT THẺ</span>
              <span className="block font-mono text-[8px] md:text-[9px] uppercase opacity-40 tracking-[0.3em]">Truth or Dare Mode</span>
            </button>

            <button 
              onClick={() => changeView('game_dice')}
              className="group relative p-6 md:p-10 glass rounded-[30px] md:rounded-[40px] transition-all hover:scale-[1.02] hover:bg-[var(--neon-magenta)]/10 active:scale-95 text-left overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity neon-text-magenta">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg>
              </div>
              <span className="block font-display text-4xl md:text-5xl mb-1 tracking-widest neon-text-magenta">XÚC XẮC</span>
              <span className="block font-mono text-[8px] md:text-[9px] uppercase opacity-40 tracking-[0.3em]">Random Penalty</span>
            </button>

            <button 
              onClick={() => changeView('game_candy')}
              className="group relative p-6 md:p-10 glass rounded-[30px] md:rounded-[40px] transition-all hover:scale-[1.02] hover:bg-[var(--neon-lime)]/10 active:scale-95 text-left overflow-hidden sm:col-span-2 lg:col-span-1"
            >
              <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity neon-text-lime">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
              </div>
              <span className="block font-display text-4xl md:text-5xl mb-1 tracking-widest neon-text-lime">KẸO BOM</span>
              <span className="block font-mono text-[8px] md:text-[9px] uppercase opacity-40 tracking-[0.3em]">Pick & Survive</span>
            </button>
          </div>
        </div>
      )}

{view === 'mode_select' && (
  <div className="flex-1 flex flex-col items-center justify-center p-6 animate-in slide-in-from-bottom-10 duration-500">
    <h2 className="font-display text-4xl md:text-6xl text-[var(--text-color)] mb-10 md:mb-16 tracking-[0.2em] uppercase text-center px-4">GIAO THỨC LẬT THẺ</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full max-w-4xl px-4">
      {[
        { mode: GameMode.ALL, label: 'HỖN HỢP', desc: 'Entropy tối đa', color: 'border-[var(--text-color)]/20 text-[var(--text-color)]', icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/> },
        { mode: GameMode.TRUTH, label: 'SỰ THẬT', desc: 'Lớp bảo mật 0', color: 'border-[var(--neon-cyan)]/30 neon-text-cyan', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/> },
        { mode: GameMode.DARE, label: 'THỬ THÁCH', desc: 'Vượt ngưỡng an toàn', color: 'border-[var(--neon-magenta)]/30 neon-text-magenta', icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/> },
        // Sửa lỗi 1: Bọc icon bằng Fragment <> </>
        { mode: GameMode.CHALLENGE, label: 'NHẬU', desc: 'Quá tải hệ thống', color: 'border-[var(--neon-lime)]/30 neon-text-lime', icon: <><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></> }
      ].map((item) => (
        <button
          key={item.mode} // Sửa lỗi 2: Đưa key và onClick vào trong thẻ mở của button
          onClick={() => selectMode(item.mode)} 
          className={`group relative p-6 md:p-10 glass border-2 ${item.color} rounded-[30px] md:rounded-[40px] transition-all hover:scale-[1.02] text-left overflow-hidden`}
        >
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{item.icon}</svg>
          </div>
          <span className="block font-display text-4xl md:text-5xl mb-1 tracking-widest">{item.label}</span>
          <span className="block font-mono text-[9px] md:text-[10px] uppercase opacity-40 tracking-widest">{item.desc}</span>
        </button>
      ))}
    </div>
    <button onClick={() => changeView('welcome')} className="mt-12 md:mt-16 font-mono text-xs text-[var(--text-color)]/20 hover:text-[var(--text-color)] tracking-[0.5em] transition-all uppercase underline underline-offset-8">Quay lại Terminal</button>
  </div>
)}

      {view === 'game_cards' && (
        <div className="flex-1 flex flex-col p-4 md:p-8 animate-in fade-in duration-500">
           <header className="flex justify-between items-center mb-6 md:mb-12 glass p-4 md:p-5 rounded-[24px] md:rounded-[30px] max-w-6xl mx-auto w-full">
            <button onClick={() => changeView('welcome')} className="font-display text-3xl md:text-4xl neon-text-cyan">DRUNK GAMES</button>
            <div className="flex gap-2 md:gap-4">
              <button onClick={handleShuffle} title="Trộn bài" className="glass p-3 md:p-4 rounded-xl md:rounded-2xl hover:bg-[var(--text-color)]/10 transition-all text-[var(--text-color)]"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg></button>
              <button onClick={() => changeView('mode_select')} className="glass px-4 py-2 rounded-xl md:rounded-2xl font-black text-[8px] md:text-[9px] tracking-[0.2em] uppercase hidden sm:flex items-center gap-2 hover:bg-[var(--text-color)]/10 text-[var(--text-color)]">CHẾ ĐỘ</button>
              <button onClick={() => { soundService.playClick(); setIsManagementOpen(true); }} title="Cấu hình thẻ bài" className="glass p-3 md:p-4 rounded-xl md:rounded-2xl hover:bg-[var(--text-color)]/10 text-[var(--text-color)] flex items-center gap-2">
                <span className="hidden md:inline text-[9px] font-black tracking-widest uppercase">Quản lý thẻ</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </button>
            </div>
          </header>
          <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full pb-8 md:pb-0">
            {currentCard && (
              <div className="space-y-10 md:space-y-16 w-full text-center">
                <div className="font-mono text-[9px] md:text-[10px] text-[var(--text-color)]/40 tracking-[0.8em] uppercase">STATION {gameState.currentIndex + 1} // {filteredCards.length}</div>
                <CardComponent card={currentCard} isFlipped={gameState.isFlipped} onFlip={handleFlip} onComplete={handleNext} />
                <div className="flex justify-center items-center gap-8 md:gap-12">
                   <button onClick={handleShuffle} className="w-12 h-12 md:w-14 md:h-14 glass rounded-xl md:rounded-2xl flex items-center justify-center text-[var(--text-color)] hover:neon-text-cyan"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/><circle cx="8.5" cy="15.5" r="1.5"/><circle cx="12" cy="12" r="1.5"/></svg></button>
                   <button onClick={handleNext} className="group relative w-20 h-20 md:w-24 md:h-24 bg-[var(--text-color)] text-[var(--bg-color)] rounded-[28px] md:rounded-[32px] flex items-center justify-center shadow-lg hover:scale-110 active:scale-90 transition-all border border-transparent hover:border-[var(--neon-cyan)]/30"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg></button>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {view === 'game_dice' && (
        <DiceGame 
          onBack={() => changeView('welcome')} 
          rules={gameState.diceRules} 
          onUpdateRules={handleUpdateDiceRules}
        />
      )}

      {view === 'game_candy' && (
        <CandyGame 
          onBack={() => changeView('welcome')} 
        />
      )}

      {isShuffling && (
        <div className="fixed inset-0 pointer-events-none flex flex-col items-center justify-center z-[200] bg-black/40 backdrop-blur-3xl animate-in fade-in duration-300">
           <div className="neon-text-cyan font-display text-5xl md:text-7xl tracking-[0.4em] animate-pulse uppercase text-center px-6">RECONFIGURING</div>
        </div>
      )}

      {isManagementOpen && (
        <ManagementModal onClose={() => { soundService.playClick(); setIsManagementOpen(false); }} onAddCard={handleAddCard} onRemoveCard={handleRemoveCard} onReset={handleResetData} cards={gameState.cards} />
      )}
    </div>
  );
};

export default App;
