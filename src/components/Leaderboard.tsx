import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X, Medal } from 'lucide-react';
import { LeaderboardEntry } from '../types';

interface LeaderboardProps {
  isOpen: boolean;
  entries: LeaderboardEntry[];
  onClose: () => void;
}

export default function Leaderboard({ isOpen, entries, onClose }: LeaderboardProps) {
  const getMedalColor = (index: number) => {
    if (index === 0) return 'text-yellow-400';
    if (index === 1) return 'text-slate-300';
    if (index === 2) return 'text-amber-600';
    return 'text-white/30';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(0,8,30,0.85)', backdropFilter: 'blur(12px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 30, opacity: 0 }}
            transition={{ type: 'spring', damping: 22 }}
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-7">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center">
                    <Trophy size={20} className="text-yellow-400" />
                  </div>
                  <div>
                    <h2 className="text-white font-black text-xl">Leaderboard</h2>
                    <p className="text-white/40 text-xs">Top 10 scores</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {entries.length === 0 ? (
                <div className="text-center py-12">
                  <Trophy size={40} className="text-white/10 mx-auto mb-3" />
                  <p className="text-white/30 text-sm">No scores yet. Play to make history!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {entries.map((entry, i) => (
                    <motion.div
                      key={`${entry.name}-${entry.date}-${i}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`flex items-center gap-4 rounded-xl px-4 py-3 ${i === 0 ? 'bg-yellow-400/10 border border-yellow-400/20' : 'bg-white/3 border border-white/5'}`}
                    >
                      <div className="w-8 flex items-center justify-center">
                        {i < 3 ? (
                          <Medal size={20} className={getMedalColor(i)} />
                        ) : (
                          <span className="text-white/25 text-sm font-bold">{i + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold truncate">{entry.name}</p>
                        <p className="text-white/30 text-xs">{entry.date}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-black text-xl ${i === 0 ? 'text-yellow-300' : 'text-white'}`}>
                          {entry.score}
                        </p>
                        <p className="text-white/25 text-xs">pts</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
