import { motion } from 'framer-motion';
import { Maximize2, Minimize2, Trophy } from 'lucide-react';

interface HeaderProps {
  playerName: string;
  score: number;
  timeLeft: number;
  isPlaying: boolean;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onShowLeaderboard: () => void;
}

export default function Header({
  playerName,
  score,
  timeLeft,
  isPlaying,
  isFullscreen,
  onToggleFullscreen,
  onShowLeaderboard,
}: HeaderProps) {
  const isUrgent = timeLeft <= 10 && isPlaying;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg flex items-center justify-center p-1">
            <img src="/amex-logo.png" alt="Company Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="text-white/60 text-xs uppercase tracking-widest font-medium">Corporate Events</p>
            <p className="text-white text-sm font-bold tracking-wide">Flag Challenge</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          {isPlaying && (
            <>
              <div className="glass-card px-5 py-2.5 rounded-xl text-center min-w-[120px]">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-0.5">Player</p>
                <p className="text-white font-bold text-sm truncate max-w-[100px]">{playerName || '—'}</p>
              </div>
              <div className="glass-card px-5 py-2.5 rounded-xl text-center min-w-[80px]">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-0.5">Score</p>
                <motion.p
                  key={score}
                  initial={{ scale: 1.4, color: '#22c55e' }}
                  animate={{ scale: 1, color: '#ffffff' }}
                  className="text-white font-bold text-lg"
                >
                  {score}
                </motion.p>
              </div>
              <motion.div
                className={`glass-card px-5 py-2.5 rounded-xl text-center min-w-[80px] ${isUrgent ? 'border-red-400/60' : ''}`}
                animate={isUrgent ? { scale: [1, 1.05, 1] } : {}}
                transition={{ repeat: Infinity, duration: 0.8 }}
              >
                <p className="text-white/50 text-xs uppercase tracking-wider mb-0.5">Time</p>
                <p className={`font-bold text-lg tabular-nums ${isUrgent ? 'text-red-400' : 'text-white'}`}>
                  {String(timeLeft).padStart(2, '0')}s
                </p>
              </motion.div>
            </>
          )}

          <button
            onClick={onShowLeaderboard}
            className="glass-card p-2.5 rounded-xl text-white/70 hover:text-yellow-400 transition-colors hover:bg-white/10"
            title="Leaderboard"
          >
            <Trophy size={20} />
          </button>

          <button
            onClick={onToggleFullscreen}
            className="glass-card p-2.5 rounded-xl text-white/70 hover:text-white transition-colors hover:bg-white/10"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </motion.div>
      </div>
    </header>
  );
}
