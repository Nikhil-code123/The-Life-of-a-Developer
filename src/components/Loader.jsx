import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLines = [
  'initializing developer.exe...',
  'loading impostor_syndrome.dll...',
  'mounting stack_overflow dependency...',
  'brewing coffee.jar ☕',
  'ignoring warnings: 1,247 errors found',
  'deploying to production (lol)',
  'system ready. good luck out there.',
];

export default function Loader({ onComplete }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLineIndex(i => {
        if (i < bootLines.length - 1) return i + 1;
        clearInterval(interval);
        return i;
      });
    }, 320);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setDone(true);
      setTimeout(onComplete, 600);
    }, bootLines.length * 320 + 400);
    return () => clearTimeout(t);
  }, [onComplete]);

  useEffect(() => {
    const target = ((lineIndex + 1) / bootLines.length) * 100;
    const timer = setTimeout(() => setPct(target), 100);
    return () => clearTimeout(timer);
  }, [lineIndex]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#03020a' }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5 }}
        >
          {/* Grid bg */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,212,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.15) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <div className="relative z-10 w-full max-w-lg px-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <div className="text-5xl font-display font-black mb-2" style={{ fontFamily: 'Syne' }}>
                <span className="gradient-text-electric">DEV</span>
                <span className="text-white">LIFE</span>
              </div>
              <div className="text-xs tracking-widest text-slate-500 uppercase">Story Engine v2.0.25</div>
            </motion.div>

            {/* Terminal */}
            <div className="glass-card neon-border p-6 mb-6 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="text-slate-500 text-xs ml-2">terminal — bash</span>
              </div>
              <div className="space-y-1 min-h-[160px]">
                {bootLines.slice(0, lineIndex + 1).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex gap-2 ${i === lineIndex ? 'text-cyan-400' : 'text-slate-500'}`}
                  >
                    <span className="text-purple-400">$</span>
                    <span>{line}</span>
                    {i === lineIndex && <span className="terminal-cursor" />}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div>
              <div className="flex justify-between text-xs text-slate-600 mb-2">
                <span>Loading experience</span>
                <span>{Math.round(pct)}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #7c3aed, #00d4ff)' }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
