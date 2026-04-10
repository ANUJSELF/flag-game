import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { Country } from '../types';

interface QuestionModalProps {
  isOpen: boolean;
  currentCountry: Country;
  options: Country[];
  onAnswer: (country: Country) => void;
  lastAnswerCorrect: boolean | null;
}

export default function QuestionModal({
  isOpen,
  currentCountry,
  options,
  onAnswer,
}: QuestionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 flex items-center justify-center px-4"
          style={{ background: 'rgba(0,8,30,0.8)', backdropFilter: 'blur(12px)' }}
        >
          <motion.div
            initial={{ scale: 0.8, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="w-full max-w-lg"
          >
            <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-2xl">
              <p className="text-white/50 text-xs uppercase tracking-[0.3em] text-center mb-2">
                Guess the Country
              </p>

              <h2 className="text-white text-2xl font-black text-center mb-6">
                Which country's flag is this?
              </h2>

              {/* FLAG DISPLAY */}
              <div className="rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl mb-8 mx-auto w-full max-w-sm">
                <img
                  src={currentCountry.flagUrl}
                  alt="Flag"
                  className="w-full h-44 object-cover"
                />
              </div>

              {/* OPTIONS */}
              <div className="grid grid-cols-2 gap-3">
                {options.map((option, i) => (
                  <motion.button
                    key={option.code}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onAnswer(option)}
                    className="rounded-xl py-4 px-4 font-bold text-white text-sm text-center transition-all border border-white/10 hover:border-blue-400/50 bg-white/5 hover:bg-blue-500/20"
                  >
                    {option.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface AnswerFeedbackProps {
  show: boolean;
  isCorrect: boolean;
  correctCountry: Country;
}

export function AnswerFeedback({ show, isCorrect, correctCountry }: AnswerFeedbackProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 18 }}
          className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50"
        >
          <div
            className={`flex items-center gap-3 px-7 py-4 rounded-2xl font-bold text-white shadow-2xl border backdrop-blur-sm ${
              isCorrect
                ? 'bg-green-500/20 border-green-400/40'
                : 'bg-red-500/20 border-red-400/40'
            }`}
          >
            {isCorrect ? (
              <CheckCircle size={24} className="text-green-400" />
            ) : (
              <XCircle size={24} className="text-red-400" />
            )}

            <div>
              <p className={`font-black ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect!'}
              </p>

              {!isCorrect && (
                <p className="text-white/60 text-sm">
                  It was {correctCountry.name}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}