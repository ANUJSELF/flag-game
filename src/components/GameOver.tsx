import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, Star } from 'lucide-react';

interface GameOverProps {
  isOpen: boolean;
  playerName: string;
  score: number;
  onReset: () => void;
}

export default function GameOver({ isOpen, playerName, score, onReset }: GameOverProps) {
  const getMessage = () => {
    if (score >= 10) return { title: "Outstanding!", sub: "You're a world geography expert!", color: 'text-yellow-300' };
    if (score >= 6) return { title: "Great job!", sub: "Solid knowledge of world flags!", color: 'text-blue-300' };
    if (score >= 3) return { title: "Good try!", sub: "Practice makes perfect!", color: 'text-cyan-300' };
    return { title: "Keep practicing!", sub: "You'll do better next time!", color: 'text-white/70' };
  };

  const { title, sub, color } = getMessage();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(0,8,30,0.9)', backdropFilter: 'blur(16px)' }}
        >
          <motion.div
            initial={{ scale: 0.7, y: 60, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.7, y: 60, opacity: 0 }}
            transition={{ type: 'spring', damping: 18, stiffness: 250 }}
            className="w-full max-w-md"
          >
            <div className="glass-card rounded-3xl p-10 border border-white/10 shadow-2xl text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-cyan-500/5" />

              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', damping: 12 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border-2 border-yellow-400/40 mb-6 mx-auto relative"
              >
                <Trophy size={36} className="text-yellow-400" />
                {score >= 6 && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="absolute"
                        style={{
                          top: `${50 + 55 * Math.sin((i * 60 * Math.PI) / 180)}%`,
                          left: `${50 + 55 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <Star size={10} className="text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    ))}
                  </>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-2">Time's Up!</p>
                <h2 className="text-white text-4xl font-black mb-1">
                  {playerName}
                </h2>
                <p className={`text-xl font-bold mb-6 ${color}`}>{title}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 rounded-2xl py-6 px-8 mb-6 border border-white/10"
              >
                <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Final Score</p>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', damping: 8 }}
                  className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300"
                >
                  {score}
                </motion.p>
                <p className="text-white/30 text-sm mt-1">correct answers</p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white/40 text-sm mb-8"
              >
                {sub}
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                onClick={() => window.location.reload()}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25"
              >
                <RotateCcw size={20} />
                Next Player
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
