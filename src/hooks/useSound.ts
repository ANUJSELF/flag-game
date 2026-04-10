import { useRef } from 'react';
import { Howl } from 'howler';

function createTone(frequency: number, duration: number, type: OscillatorType = 'sine', gain = 0.3): Promise<void> {
  return new Promise((resolve) => {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    gainNode.gain.setValueAtTime(gain, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
    oscillator.onended = () => {
      ctx.close();
      resolve();
    };
  });
}

export function useGameSounds() {
  const spinSoundRef = useRef<Howl | null>(null);

  function playSpinSound() {
    if (spinSoundRef.current) {
      spinSoundRef.current.stop();
    }
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.05;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3);
    source.connect(gainNode);
    gainNode.connect(ctx.destination);
    source.start();
    source.onended = () => ctx.close();
  }

  function playCorrectSound() {
    createTone(523.25, 0.15).then(() => createTone(659.25, 0.15)).then(() => createTone(783.99, 0.3));
  }

  function playWrongSound() {
    createTone(220, 0.15, 'sawtooth').then(() => createTone(196, 0.3, 'sawtooth'));
  }

  function playTickSound() {
    createTone(800, 0.05, 'square', 0.1);
  }

  return { playSpinSound, playCorrectSound, playWrongSound, playTickSound };
}
