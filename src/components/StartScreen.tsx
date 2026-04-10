import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Globe } from 'lucide-react';
import { COUNTRIES } from '../data/countries';

interface StartScreenProps {
  onStart: (name: string) => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onStart(name.trim());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="text-center max-w-2xl w-full"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 border border-blue-400/30 mb-6 mx-auto"
        >
          <Globe size={36} className="text-blue-300" />
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-3 tracking-tight">
          Random
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Flag Wheel
          </span>
        </h1>
        <p className="text-white/50 text-lg mb-10 font-light">
          Identify flags from around the world. 45 seconds. How many can you get?
        </p>

        <div className="glass-card rounded-2xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white/60 text-sm uppercase tracking-wider mb-2 text-left">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-lg placeholder-white/20 focus:outline-none focus:border-blue-400/60 focus:bg-white/8 transition-all"
                autoFocus
                maxLength={30}
              />
            </div>
            <motion.button
              type="submit"
              disabled={!name.trim()}
              whileHover={{ scale: name.trim() ? 1.02 : 1 }}
              whileTap={{ scale: name.trim() ? 0.98 : 1 }}
              className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              <Play size={22} fill="currentColor" />
              Start Game
            </motion.button>
          </form>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: 'Countries', value: `${COUNTRIES.length}` },
            { label: 'Time Limit', value: '45s' },
            { label: 'Options', value: '4' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl py-4 px-3">
              <p className="text-2xl font-black text-blue-300">{stat.value}</p>
              <p className="text-white/40 text-xs uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {COUNTRIES.slice(0, 12).map((c, i) => (
            <motion.img
              key={c.code}
              src={c.flagUrl}
              alt={c.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="w-8 h-5 object-cover rounded-sm"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
