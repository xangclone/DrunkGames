import React, { useState } from 'react';
import { Card, CardType } from '../types';
import { TYPE_TEXT_COLORS } from '../constants';

interface ManagementModalProps {
  onClose: () => void;
  onAddCard: (card: Card) => void;
  cards: Card[];
  onRemoveCard: (id: string) => void;
  onReset: () => void;
}

const ManagementModal: React.FC<ManagementModalProps> = ({ onClose, onAddCard, cards, onRemoveCard, onReset }) => {
  const [content, setContent] = useState('');
  const [type, setType] = useState<CardType>(CardType.TRUTH);
  const [intensity, setIntensity] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    const newCard: Card = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content,
      intensity
    };
    onAddCard(newCard);
    setContent('');
  };

  const handleAI = () => {
    alert("Tính năng AI tạm thời ngoại tuyến. Vui lòng thêm thẻ thủ công.");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#121212] w-full max-w-2xl max-h-[90vh] rounded-[40px] overflow-hidden border border-white/10 flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-display text-white tracking-[0.2em] uppercase">Data Console</h2>
            <div className="flex gap-4 items-center">
               <span className="flex items-center gap-1.5 font-mono text-[8px] text-[var(--neon-cyan)] tracking-widest uppercase">
                 <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-cyan)] animate-pulse"></span>
                 System Ready
               </span>
               <button onClick={onReset} className="font-mono text-[8px] text-red-500/60 tracking-widest uppercase hover:text-red-500 transition-colors">Format All</button>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1 space-y-10 custom-scrollbar">
          
          {/* Create New Card */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              {/* FIX: Nền tối hoàn toàn để không bị trắng */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nhập lệnh thực thi mới..."
                className="w-full bg-black/60 border border-white/10 rounded-[24px] p-6 text-white focus:ring-1 focus:ring-[var(--neon-cyan)]/50 outline-none transition-all min-h-[110px] text-sm resize-none placeholder:text-white/20"
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-3 items-center">
                {/* FIX: Select nền tối chữ trắng */}
                <select 
                  value={type} 
                  onChange={(e) => setType(e.target.value as CardType)}
                  className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2.5 text-[10px] font-black text-white outline-none uppercase appearance-none cursor-pointer"
                >
                  <option value={CardType.TRUTH}>Sự thật</option>
                  <option value={CardType.DARE}>Thử thách</option>
                  <option value={CardType.CHALLENGE}>Nhậu</option>
                </select>

                <div className="flex gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
                  {[1, 2, 3].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setIntensity(val)}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${intensity === val ? 'bg-white text-black font-black' : 'text-white/20'}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill={intensity >= val ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                className="bg-[var(--neon-cyan)] text-black font-black px-10 py-3 rounded-xl text-[9px] tracking-widest uppercase hover:scale-105 active:scale-95"
              >
                Thêm thẻ
              </button>
            </div>
          </form>

          {/* AI Generation Layer - Vô hiệu hóa */}
          <div className="relative group p-6 rounded-[32px] border border-white/5 overflow-hidden bg-white/[0.01] grayscale opacity-50">
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-gray-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-bold text-gray-500 text-xs tracking-wide uppercase">AI Synthesis</h3>
                  <p className="text-[8px] text-white/20 uppercase tracking-[0.2em]">Offline Mode</p>
                </div>
              </div>
              <button onClick={handleAI} className="glass border-white/10 text-gray-500 px-8 py-3 rounded-xl font-black text-[9px] uppercase cursor-not-allowed">
                Sync AI
              </button>
            </div>
          </div>

          {/* Inventory */}
          <div className="space-y-4 pb-10">
            <h3 className="font-mono text-[9px] text-white/20 tracking-[0.5em] uppercase flex items-center gap-4">
              Stored Entries ({cards.length})
              <div className="flex-1 h-[1px] bg-white/5"></div>
            </h3>
            <div className="grid gap-3">
              {cards.slice().reverse().map(card => (
                <div key={card.id} className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-2xl border border-white/5 group text-left">
                   <div className={`w-1.5 h-1.5 rounded-full ${TYPE_TEXT_COLORS[card.type]}`}></div>
                   <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-[8px] font-black uppercase ${TYPE_TEXT_COLORS[card.type]}`}>{card.type}</span>
                      </div>
                      <div className="text-xs text-white/60 italic">"{card.content}"</div>
                   </div>
                   <button onClick={() => onRemoveCard(card.id)} className="p-2 text-white/10 hover:text-red-500 transition-all">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                   </button>
                </div>
              ))}
            </div>
          </div>

        </div> {/* Kết thúc div nội dung cuộn */}
      </div> {/* Kết thúc div Modal trắng/đen chính */}
    </div> 
  );
};

export default ManagementModal;