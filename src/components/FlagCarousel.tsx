import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { Country } from '../types';
import { COUNTRIES } from '../data/countries';

interface FlagCarouselProps {
  currentCountry: Country;
  spinIndex: number;
  isSpinning: boolean;
  onSpin: () => void;
  phase: string;
}

export default function FlagCarousel({
  currentCountry,
  spinIndex,
  isSpinning,
  onSpin,
  phase,
}: FlagCarouselProps) {
  const canSpin = phase === 'idle';
  const prevIndex = (spinIndex - 1 + COUNTRIES.length) % COUNTRIES.length;
  const nextIndex = (spinIndex + 1) % COUNTRIES.length;

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-8">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white/40 text-sm uppercase tracking-[0.3em] mb-8 font-medium"
      >
        {isSpinning ? 'Spinning...' : 'Which country does this flag belong to?'}
      </motion.p>

      <div className="relative flex items-center justify-center gap-6 mb-10 w-full max-w-3xl">
        <motion.div
          key={`prev-${prevIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isSpinning ? 0.3 : 0.15 }}
          className="hidden md:block"
        >
          <div className="w-32 h-20 rounded-lg overflow-hidden border border-white/10 shadow-md">
            <img
              src={COUNTRIES[prevIndex].flagUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-400/20 blur-xl scale-110" />
          <div className="absolute -inset-1 rounded-2xl border border-blue-400/30" />

          <motion.div
            className="relative w-72 h-44 md:w-96 md:h-56 lg:w-[440px] lg:h-64 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20"
            animate={isSpinning ? { y: [-2, 2, -2] } : {}}
            transition={{ repeat: Infinity, duration: 0.15 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentCountry.code}
                src={currentCountry.flagUrl}
                alt="Flag"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: isSpinning ? 0.05 : 0.3 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </motion.div>

          {!isSpinning && phase === 'idle' && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
              <div className="w-6 h-6 rounded-full bg-blue-400/30 border border-blue-400/60 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
              </div>
            </div>
          )}
        </div>

        <motion.div
          key={`next-${nextIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isSpinning ? 0.3 : 0.15 }}
          className="hidden md:block"
        >
          <div className="w-32 h-20 rounded-lg overflow-hidden border border-white/10 shadow-md">
            <img
              src={COUNTRIES[nextIndex].flagUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={onSpin}
        disabled={!canSpin}
        whileHover={canSpin ? { scale: 1.04 } : {}}
        whileTap={canSpin ? { scale: 0.96 } : {}}
        className="relative group px-14 py-5 rounded-2xl font-black text-xl tracking-wide disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden transition-all"
        style={{
          background: canSpin
            ? 'linear-gradient(135deg, #2563eb, #0891b2)'
            : 'rgba(255,255,255,0.05)',
          boxShadow: canSpin ? '0 0 40px rgba(37,99,235,0.4), 0 8px 32px rgba(0,0,0,0.3)' : 'none',
          color: 'white',
        }}
      >
        {canSpin && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        )}
        <span className="relative flex items-center gap-3">
          <Zap size={22} fill="currentColor" />
          {isSpinning ? 'Spinning...' : 'SPIN'}
        </span>
      </motion.button>

      <p className="text-white/20 text-xs mt-4 uppercase tracking-widest">
        {canSpin ? 'Click to spin the wheel' : isSpinning ? 'Watch the magic...' : 'Answer the question!'}
      </p>
    </div>
  );
}
