import { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import Header from './components/Header';
import StartScreen from './components/StartScreen';
import FlagCarousel from './components/FlagCarousel';
import QuestionModal, { AnswerFeedback } from './components/QuestionModal';
import GameOver from './components/GameOver';
import Leaderboard from './components/Leaderboard';
import { useGame } from './hooks/useGame';
import { useGameSounds } from './hooks/useSound';
import { Country } from './types';

function Particles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-blue-400/20"
          initial={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
          }}
          animate={{
            y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
            x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 15 + Math.random() * 20,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const game = useGame();
  const sounds = useGameSounds();

  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackCorrect, setFeedbackCorrect] = useState(false);
  const [lastCorrectCountry, setLastCorrectCountry] = useState<Country>(game.currentCountry);

  const feedbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scoreRef = useRef(game.score);
  const nameRef = useRef(game.playerName);

  useEffect(() => {
    scoreRef.current = game.score;
  }, [game.score]);

  useEffect(() => {
    nameRef.current = game.playerName;
  }, [game.playerName]);

  const handleTimerEnd = useCallback(() => {
    game.endGame(scoreRef.current, nameRef.current);
  }, [game]);

  const handleStart = useCallback((name: string) => {
    game.startGame(name, handleTimerEnd);
  }, [game, handleTimerEnd]);

  const handleSpin = useCallback(() => {
    if (game.phase !== 'idle') return;
    sounds.playSpinSound();
    game.spin((_country: Country) => {}, sounds.playTickSound);
  }, [game, sounds]);

  const handleAnswer = useCallback((selected: Country) => {
    const correct = game.currentCountry;
    setLastCorrectCountry(correct);

    const isCorrect = game.answer(selected, correct);

    setFeedbackCorrect(isCorrect);
    setShowFeedback(true);

    if (isCorrect) {
      sounds.playCorrectSound();
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      sounds.playWrongSound();
    }

    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    feedbackTimeoutRef.current = setTimeout(() => setShowFeedback(false), 2000);

  }, [game, sounds]);

  // ✅ FINAL FIXED RESET
  const handleReset = useCallback(() => {
    game.reset();

    setShowFeedback(false);
    setFeedbackCorrect(false);

    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = null;
    }

    // 🔥 FORCE CLEAN RESET (BEST FOR EVENTS)
    setTimeout(() => {
      window.location.reload();
    }, 100);

  }, [game]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(() => {});
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const isPlaying = game.phase !== 'start' && game.phase !== 'gameover';

  return (
    <div className="min-h-screen bg-app flex flex-col relative">
      <Particles />

      <Header
        playerName={game.playerName}
        score={game.score}
        timeLeft={game.timeLeft}
        isPlaying={isPlaying}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        onShowLeaderboard={() => setShowLeaderboard(true)}
      />

      <AnimatePresence mode="wait">

        {game.phase === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1"
          >
            <StartScreen onStart={handleStart} />
          </motion.div>
        )}

        {(game.phase === 'idle' || game.phase === 'spinning' || game.phase === 'question') && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col pt-24"
          >
            <FlagCarousel
              currentCountry={game.currentCountry}
              spinIndex={game.spinIndex}
              isSpinning={game.phase === 'spinning'}
              onSpin={handleSpin}
              phase={game.phase}
            />
          </motion.div>
        )}

      </AnimatePresence>

      <QuestionModal
        isOpen={game.phase === 'question'}
        currentCountry={game.currentCountry}
        options={game.options}
        onAnswer={handleAnswer}
        lastAnswerCorrect={game.lastAnswerCorrect}
      />

      <AnswerFeedback
        show={showFeedback}
        isCorrect={feedbackCorrect}
        correctCountry={lastCorrectCountry}
      />

      <GameOver
        isOpen={game.phase === 'gameover'}
        playerName={game.playerName}
        score={game.score}
        onReset={handleReset}
      />

      <Leaderboard
        isOpen={showLeaderboard}
        entries={game.leaderboard}
        onClose={() => setShowLeaderboard(false)}
      />
    </div>
  );
}