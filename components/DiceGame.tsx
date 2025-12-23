
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { DiceRule } from '../types';
import { DICE_ICONS } from '../constants';
import DiceManagementModal from './DiceManagementModal';
import { soundService } from '../services/soundService';

interface DiceGameProps {
  onBack: () => void;
  rules: DiceRule[];
  onUpdateRules: (rules: DiceRule[]) => void;
}

const DiceGame: React.FC<DiceGameProps> = ({ onBack, rules, onUpdateRules }) => {
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  
  const rotationRef = useRef({ x: 0, y: 0, z: 0 });
  const rollIntervalRef = useRef<number | null>(null);

  const getRotationForValue = (value: number) => {
    const rotations: Record<number, { x: number, y: number }> = {
      1: { x: 0, y: 0 },          // Front
      2: { x: 0, y: 180 },        // Back
      3: { x: 0, y: -90 },        // Right
      4: { x: 0, y: 90 },         // Left
      5: { x: -90, y: 0 },        // Top
      6: { x: 90, y: 0 }          // Bottom
    };
    return rotations[value];
  };

  const rollDice = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);

    const newValue = Math.floor(Math.random() * 6) + 1;
    const targetRot = getRotationForValue(newValue);

    const extraSpins = 2160; 
    const newX = rotationRef.current.x + extraSpins + targetRot.x - (rotationRef.current.x % 360);
    const newY = rotationRef.current.y + extraSpins + targetRot.y - (rotationRef.current.y % 360);
    const newZ = rotationRef.current.z + extraSpins;

    rotationRef.current = { x: newX, y: newY, z: newZ };
    setRotation(rotationRef.current);

    // Start rattling sound
    let rollCount = 0;
    const interval = window.setInterval(() => {
      soundService.playDiceRoll();
      rollCount++;
      if (rollCount > 15) {
         if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);
      }
    }, 150);
    rollIntervalRef.current = interval;

    setTimeout(() => {
      if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);
      setDiceValue(newValue);
      setIsRolling(false);
      soundService.playSuccess();
    }, 3000);
  }, [isRolling]);

  useEffect(() => {
    return () => {
      if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);
    };
  }, []);

  const currentRule = useMemo(() => rules.find(r => r.value === diceValue) || rules[0], [rules, diceValue]);

  const faceColors: Record<number, string> = {
    1: 'rgba(6, 182, 212, 0.4)', // Cyan
    2: 'rgba(217, 70, 239, 0.4)', // Magenta
    3: 'rgba(234, 179, 8, 0.4)',  // Yellow
    4: 'rgba(59, 130, 246, 0.4)',  // Blue
    5: 'rgba(34, 197, 94, 0.4)',  // Green
    6: 'rgba(239, 68, 68, 0.4)',   // Red
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in duration-500 overflow-hidden relative">
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-opacity duration-1000 pointer-events-none ${isRolling ? 'opacity-100' : 'opacity-0'}`}></div>

      <header className={`fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center transition-all duration-700 ${isRolling ? 'opacity-0 -translate-y-10' : 'opacity-100 translate-y-0'}`}>
        <button 
          onClick={() => { soundService.playClick(); onBack(); }} 
          className="glass p-4 rounded-2xl pointer-events-auto hover:bg-[var(--text-color)]/10 transition-all group shadow-xl"
        >
          <svg className="group-hover:-translate-x-1 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <button 
          onClick={() => { soundService.playClick(); setIsManageOpen(true); }}
          className="glass p-4 rounded-2xl pointer-events-auto hover:bg-[var(--text-color)]/10 transition-all text-[var(--text-color)]/40 hover:text-[var(--neon-cyan)] shadow-xl"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
        </button>
      </header>

      <div className="w-full max-w-lg flex flex-col items-center justify-center relative">
        <div className={`text-center space-y-6 transition-all duration-1000 w-full max-w-sm px-6 py-10 glass rounded-[40px] border-[var(--glass-border)] shadow-2xl z-20 mb-12 ${isRolling ? 'opacity-0 scale-90 blur-xl -translate-y-10' : 'opacity-100 scale-100 blur-0 translate-y-0'}`}>
           <div className="flex flex-col items-center">
             <div className="inline-block px-4 py-1 rounded-full bg-[var(--text-color)]/5 border border-[var(--glass-border)] text-[var(--text-color)]/40 font-mono text-[9px] tracking-[0.4em] uppercase mb-6">
                Terminal Response: {diceValue}
             </div>
             <h2 className="text-5xl font-display text-[var(--text-color)] tracking-widest leading-none drop-shadow-[0_0_15px_rgba(var(--text-color),0.1)]">
                {currentRule.label}
             </h2>
             <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-[var(--text-color)]/20 to-transparent my-6"></div>
             <p className="text-[var(--text-color)]/60 font-mono text-xs tracking-wider uppercase leading-relaxed italic">
                {currentRule.desc}
             </p>
           </div>
        </div>

        <div 
          className={`perspective-1000 w-48 h-48 cursor-pointer group relative z-40 transition-transform duration-1000 ease-in-out ${isRolling ? 'scale-[1.8] -translate-y-32' : 'scale-100 translate-y-0'}`}
          onClick={rollDice}
        >
          <div 
            className={`relative w-full h-full preserve-3d transition-transform duration-[3000ms] cubic-bezier-0.15, 0.85, 0.35, 1.2`}
            style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)` }}
          >
            <div className="absolute inset-0 glass border-2 border-cyan-500 rounded-3xl flex flex-col items-center justify-center text-cyan-500 [transform:translateZ(96px)] shadow-[inset_0_0_50px_rgba(6,182,212,0.3)] bg-cyan-500/10 backdrop-blur-md">
               {DICE_ICONS[1]}
               <div className="absolute top-3 right-5 font-display text-2xl opacity-30">1</div>
            </div>
            <div className="absolute inset-0 glass border-2 border-magenta-500 rounded-3xl flex flex-col items-center justify-center text-magenta-400 [transform:rotateY(180deg)_translateZ(96px)] shadow-[inset_0_0_50px_rgba(217,70,239,0.3)] bg-magenta-500/10 backdrop-blur-md">
               {DICE_ICONS[2]}
               <div className="absolute top-3 right-5 font-display text-2xl opacity-30">2</div>
            </div>
            <div className="absolute inset-0 glass border-2 border-yellow-500 rounded-3xl flex flex-col items-center justify-center text-yellow-400 [transform:rotateY(90deg)_translateZ(96px)] shadow-[inset_0_0_50px_rgba(234,179,8,0.3)] bg-yellow-500/10 backdrop-blur-md">
               {DICE_ICONS[3]}
               <div className="absolute top-3 right-5 font-display text-2xl opacity-30">3</div>
            </div>
            <div className="absolute inset-0 glass border-2 border-blue-500 rounded-3xl flex flex-col items-center justify-center text-blue-400 [transform:rotateY(-90deg)_translateZ(96px)] shadow-[inset_0_0_50px_rgba(59,130,246,0.3)] bg-blue-500/10 backdrop-blur-md">
               {DICE_ICONS[4]}
               <div className="absolute top-3 right-5 font-display text-2xl opacity-30">4</div>
            </div>
            <div className="absolute inset-0 glass border-2 border-green-500 rounded-3xl flex flex-col items-center justify-center text-green-400 [transform:rotateX(90deg)_translateZ(96px)] shadow-[inset_0_0_50px_rgba(34,197,94,0.3)] bg-green-500/10 backdrop-blur-md">
               {DICE_ICONS[5]}
               <div className="absolute top-3 right-5 font-display text-2xl opacity-30">5</div>
            </div>
            <div className="absolute inset-0 glass border-2 border-red-500 rounded-3xl flex flex-col items-center justify-center text-red-400 [transform:rotateX(-90deg)_translateZ(96px)] shadow-[inset_0_0_50px_rgba(239,68,68,0.3)] bg-red-500/10 backdrop-blur-md">
               {DICE_ICONS[6]}
               <div className="absolute top-3 right-5 font-display text-2xl opacity-30">6</div>
            </div>
          </div>
          
          <div 
            className="mt-20 w-32 h-6 blur-2xl rounded-full mx-auto transition-all duration-1000 opacity-60"
            style={{ 
              backgroundColor: isRolling ? 'rgba(var(--text-color),0.4)' : faceColors[diceValue],
              transform: isRolling ? 'scale(2) translateY(20px)' : 'scale(1) translateY(0)'
            }}
          ></div>
        </div>

        <div className={`mt-24 transition-all duration-700 ${isRolling ? 'opacity-0 scale-50 pointer-events-none translate-y-20' : 'opacity-100 scale-100 translate-y-0'}`}>
          <button 
            onClick={rollDice}
            disabled={isRolling}
            className="group relative w-32 h-32 bg-[var(--text-color)] text-[var(--bg-color)] rounded-[45px] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed z-10"
          >
            <div className={`transition-all duration-1000 ${isRolling ? 'rotate-[1080deg] scale-50' : 'rotate-0 scale-125'}`}>
               <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
               </svg>
            </div>
            <div className="absolute inset-0 rounded-[45px] border-4 border-[var(--text-color)] opacity-0 group-hover:opacity-10 group-hover:animate-ping pointer-events-none"></div>
            <span className="absolute -bottom-12 font-mono text-[10px] tracking-[0.5em] text-[var(--text-color)]/20 uppercase group-hover:text-[var(--text-color)]/40 transition-colors">Tung Xúc Xắc</span>
          </button>
        </div>
      </div>

      <style>{`
        .cubic-bezier {
          transition-timing-function: cubic-bezier(0.15, 0.85, 0.35, 1.2);
        }
      `}</style>

      {isManageOpen && (
        <DiceManagementModal 
          onClose={() => setIsManageOpen(false)} 
          rules={rules} 
          onSave={onUpdateRules}
        />
      )}
    </div>
  );
};

export default DiceGame;
