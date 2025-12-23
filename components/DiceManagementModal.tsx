
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[var(--card-bg)] w-full max-w-2xl max-h-[90vh] rounded-[40px] overflow-hidden border border-[var(--glass-border)] flex flex-col shadow-2xl transition-colors duration-400">
        <div className="p-8 border-b border-[var(--glass-border)] flex justify-between items-center bg-[var(--text-color)]/[0.02]">
          <h2 className="text-2xl font-display text-[var(--text-color)] tracking-[0.2em] uppercase">Dice Protocol Config</h2>
          <button onClick={onClose} className="w-10 h-10 glass rounded-full flex items-center justify-center text-[var(--text-color)]/40 hover:text-[var(--text-color)] transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1 space-y-6 custom-scrollbar">
          {editedRules.map((rule, idx) => (
            <div key={rule.value} className="flex gap-6 p-6 glass rounded-3xl border-[var(--glass-border)] items-center">
              <div className="text-[var(--neon-cyan)] opacity-70">
                {DICE_ICONS[rule.value]}
                <div className="text-center font-display text-2xl mt-1">{rule.value}</div>
              </div>
              <div className="flex-1 space-y-3">
                <input 
                  value={rule.label}
                  onChange={(e) => handleChange(idx, 'label', e.target.value)}
                  className="w-full bg-[var(--text-color)]/[0.05] border border-[var(--glass-border)] rounded-xl px-4 py-2 text-[var(--text-color)] font-bold text-sm outline-none focus:border-[var(--neon-cyan)]/50 transition-colors placeholder:text-[var(--text-color)]/20"
                  placeholder="Tiêu đề..."
                />
                <textarea 
                  value={rule.desc}
                  onChange={(e) => handleChange(idx, 'desc', e.target.value)}
                  className="w-full bg-[var(--text-color)]/[0.05] border border-[var(--glass-border)] rounded-xl px-4 py-2 text-[var(--text-color)]/70 text-xs outline-none focus:border-[var(--neon-cyan)]/50 resize-none transition-colors placeholder:text-[var(--text-color)]/20"
                  rows={2}
                  placeholder="Mô tả hình phạt..."
                />
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 border-t border-[var(--glass-border)] flex gap-4 bg-[var(--text-color)]/[0.02]">
           <button onClick={onClose} className="flex-1 py-4 glass rounded-2xl font-black text-[10px] tracking-widest uppercase text-[var(--text-color)]/40 hover:bg-[var(--text-color)]/5 transition-colors">Hủy</button>
           <button onClick={handleSave} className="flex-1 py-4 bg-[var(--text-color)] text-[var(--bg-color)] rounded-2xl font-black text-[10px] tracking-widest uppercase hover:scale-[1.02] transition-transform shadow-lg">Lưu cấu hình</button>
        </div>
      </div>
    </div>
  );
};

export default DiceManagementModal;
