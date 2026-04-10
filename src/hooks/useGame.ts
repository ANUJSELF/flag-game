import { useState, useCallback, useRef } from 'react';
import { Country, LeaderboardEntry } from '../types';
import { COUNTRIES, buildOptions } from '../data/countries';

const GAME_DURATION = 45;

export function useGame() {
  const [playerName, setPlayerName] = useState('');
  const [phase, setPhase] = useState<'start' | 'idle' | 'spinning' | 'question' | 'gameover'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [currentCountry, setCurrentCountry] = useState<Country>(COUNTRIES[0]);
  const [spinIndex, setSpinIndex] = useState(0);
  const [options, setOptions] = useState<Country[]>([]);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('flagWheelLeaderboard') || '[]');
    } catch {
      return [];
    }
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const spinIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback((onEnd: () => void) => {
    setTimeLeft(GAME_DURATION);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          onEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const startGame = useCallback((name: string, onTimerEnd: () => void) => {
    setPlayerName(name);
    setScore(0);
    setPhase('idle');
    setCurrentCountry(COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)]);
    startTimer(onTimerEnd);
  }, [startTimer]);

  const spin = useCallback((onSpinEnd: (country: Country) => void, playTick: () => void) => {
    setPhase('spinning');
    const targetIndex = Math.floor(Math.random() * COUNTRIES.length);
    const targetCountry = COUNTRIES[targetIndex];

    let totalSteps = 30 + Math.floor(Math.random() * 20);
    let step = 0;
    let currentIdx = Math.floor(Math.random() * COUNTRIES.length);

    const getDelay = (s: number) => {
      const progress = s / totalSteps;
      if (progress < 0.3) return 60;
      if (progress < 0.6) return 80 + (progress - 0.3) * 300;
      return 80 + (progress - 0.3) * 600;
    };

    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      step++;
      currentIdx = (currentIdx + 1) % COUNTRIES.length;
      setSpinIndex(currentIdx);
      setCurrentCountry(COUNTRIES[currentIdx]);
      playTick();

      if (step >= totalSteps) {
        setCurrentCountry(targetCountry);
        setSpinIndex(targetIndex);
        setTimeout(() => {
          setPhase('question');
          setOptions(buildOptions(targetCountry));
          onSpinEnd(targetCountry);
        }, 400);
        return;
      }

      timeoutId = setTimeout(tick, getDelay(step));
    };

    timeoutId = setTimeout(tick, getDelay(0));

    return () => clearTimeout(timeoutId);
  }, []);

  const answer = useCallback((selected: Country, correct: Country) => {
    const isCorrect = selected.code === correct.code;
    setLastAnswerCorrect(isCorrect);
    if (isCorrect) {
      setScore((s) => s + 1);
    }
    setPhase('idle');
    return isCorrect;
  }, []);

  const endGame = useCallback((finalScore: number, name: string) => {
    stopTimer();
    setPhase('gameover');
    const entry: LeaderboardEntry = {
      name,
      score: finalScore,
      date: new Date().toLocaleDateString(),
    };
    setLeaderboard((prev) => {
      const updated = [...prev, entry].sort((a, b) => b.score - a.score).slice(0, 10);
      localStorage.setItem('flagWheelLeaderboard', JSON.stringify(updated));
      return updated;
    });
  }, [stopTimer]);

  const reset = useCallback(() => {
    stopTimer();
    if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
    setPhase('start');
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setPlayerName('');
    setLastAnswerCorrect(null);
  }, [stopTimer]);

  return {
    playerName,
    phase,
    score,
    timeLeft,
    currentCountry,
    spinIndex,
    options,
    lastAnswerCorrect,
    leaderboard,
    startGame,
    spin,
    answer,
    endGame,
    reset,
    setPhase,
  };
}
