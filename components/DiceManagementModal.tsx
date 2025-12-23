import React, { useState } from 'react';
import { DiceRule } from '../types';
import { DICE_ICONS } from '../constants';

interface DiceManagementModalProps {
  onClose: () => void;
  rules: DiceRule[];
  onSave: (rules: DiceRule[]) => void;
}

const DiceManagementModal: React.FC<DiceManagementModalProps> = ({ onClose, rules, onSave }) => {
  const [editedRules, setEditedRules] = useState<DiceRule[]>([...rules]);

  const handleChange = (index: number, field: keyof DiceRule, value: string) => {
    const updated = [...editedRules];
    updated[index] = { ...updated[index], [field]: value };
    setEditedRules(updated);
  };

  const handleSave = () => {
    onSave(editedRules);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#121212] w-full max-w-2xl max-h-[90vh] rounded-[40px] overflow-hidden border border-white/10 flex flex-col shadow-2xl transition-all duration-400">
        
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <h2 className="text-2xl font-display text-white tracking-[0.2em] uppercase">Dice Protocol Config</h2>
          <button onClick={onClose} className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all hover:rotate-90">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* List of Rules */}
        <div className="p-8 overflow-y-auto flex-1 space-y-6 custom-scrollbar">
          {editedRules.map((rule, idx) => (
            <div key={rule.value} className="flex gap-6 p-6 bg-white/[0.03] rounded-3xl border border-white/5 items-center group hover:border-[var(--neon-cyan)]/30 transition-all">
              <div className="text-[var(--neon-cyan)] opacity-70 group-hover:opacity-100 transition-opacity">
                {DICE_ICONS[rule.value]}
                <div className="text-center font-display text-2xl mt-1">{rule.value}</div>
              </div>
              
              <div className="flex-1 space-y-3">
                {/* Input Tiêu đề - Ép nền đen chữ trắng */}
                <input 
                  value={rule.label}
                  onChange={(e) => handleChange(idx, 'label', e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-white font-bold text-sm outline-none focus:border-[var(--neon-cyan)]/50 transition-all placeholder:text-white/10"
                  placeholder="Tiêu đề luật..."
                />
                
                {/* Textarea Mô tả - Ép nền đen chữ trắng */}
                <textarea 
                  value={rule.desc}
                  onChange={(e) => handleChange(idx, 'desc', e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white/70 text-xs outline-none focus:border-[var(--neon-cyan)]/50 resize-none transition-all placeholder:text-white/10"
                  rows={2}
                  placeholder="Mô tả hình phạt cụ thể..."
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-white/5 flex gap-4 bg-black/20">
           <button 
             onClick={onClose} 
             className="flex-1 py-4 glass border-white/10 rounded-2xl font-black text-[10px] tracking-widest uppercase text-white/40 hover:text-white hover:bg-white/5 transition-all"
           >
             Hủy bỏ
           </button>
           <button 
             onClick={handleSave} 
             className="flex-1 py-4 bg-[var(--neon-cyan)] text-black rounded-2xl font-black text-[10px] tracking-widest uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(0,255,255,0.2)]"
           >
             Cập nhật giao thức
           </button>
        </div>
      </div>
    </div>
  );
};

export default DiceManagementModal;