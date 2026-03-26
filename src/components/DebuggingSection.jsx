import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useScrollAnimations';
import { storyContent } from '../data/storyContent';

const { debugging } = storyContent;

const BUG_COLORS = ['#ff6b35', '#ff2d78', '#ffd700', '#00d4ff', '#a855f7'];

function BugCard({ bug, index, onFix }) {
  const [fixing, setFixing] = useState(false);
  const [fixed, setFixed] = useState(false);

  const handleFix = () => {
    if (fixed || fixing) return;
    setFixing(true);
    setTimeout(() => {
      setFixed(true);
      onFix(bug.id);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`glass-card p-4 relative overflow-hidden transition-all duration-500 ${
        fixed ? 'opacity-60' : ''
      }`}
      style={{
        border: fixed
          ? '1px solid rgba(6, 255, 165, 0.3)'
          : `1px solid ${BUG_COLORS[index]}30`,
        boxShadow: fixed ? '0 0 20px rgba(6,255,165,0.1)' : `0 0 20px ${BUG_COLORS[index]}10`,
      }}
    >
      {/* Bug indicator */}
      <div className="absolute top-3 right-3 text-xl">
        {fixed ? '✅' : '🐛'}
      </div>

      <div className="font-mono text-xs mb-3" style={{ color: fixed ? '#06ffa5' : BUG_COLORS[index] }}>
        {fixed ? '// FIXED (somehow)' : `// ERROR_${bug.id.toString().padStart(3, '0')}`}
      </div>

      <div className={`font-mono text-xs md:text-sm mb-3 leading-relaxed transition-all duration-500 ${
        fixed ? 'line-through text-slate-600' : 'text-slate-300'
      }`}>
        {bug.code}
      </div>

      <div className="text-xs text-slate-600 font-mono mb-4 italic">
        hint: {bug.hint}
      </div>

      <button
        data-hover
        onClick={handleFix}
        disabled={fixed}
        className="text-xs font-mono px-4 py-2 rounded transition-all duration-200 disabled:cursor-not-allowed"
        style={{
          background: fixed
            ? 'rgba(6,255,165,0.1)'
            : fixing
              ? 'rgba(255,107,53,0.15)'
              : `rgba(${BUG_COLORS[index] === '#ffd700' ? '255,215,0' : '0,212,255'},0.1)`,
          border: `1px solid ${fixed ? '#06ffa5' : BUG_COLORS[index]}40`,
          color: fixed ? '#06ffa5' : fixing ? '#ff6b35' : BUG_COLORS[index],
        }}
      >
        {fixed ? 'Fixed ✓' : fixing ? 'fixing...' : '→ Fix Bug'}
      </button>

      {/* Fixed flash overlay */}
      <AnimatePresence>
        {fixing && !fixed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 rounded-2xl"
            style={{ background: '#06ffa5' }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function DebuggingSection() {
  const [fixedIds, setFixedIds] = useState([]);
  const allFixed = fixedIds.length === debugging.bugs.length;

  const onFix = (id) => setFixedIds(prev => [...prev, id]);

  return (
    <section id="debugging" className="relative min-h-screen py-32 px-6 overflow-hidden">
      {/* Bg */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(255,107,53,0.05) 0%, transparent 70%)' }} />

      {/* Floating bug emojis */}
      {['🐛', '🦟', '🐞', '🕷️', '🦂'].map((emoji, i) => (
        <div
          key={i}
          className="absolute text-2xl opacity-5 animate-float pointer-events-none"
          style={{
            top: `${15 + i * 15}%`,
            left: `${5 + i * 8}%`,
            animationDelay: `${i * 1.2}s`,
            animationDuration: `${7 + i}s`,
          }}
        >
          {emoji}
        </div>
      ))}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block font-mono text-xs text-red-400/60 mb-4">// chapter_02.js — line 404</div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4" style={{ fontFamily: 'Syne' }}>
            {debugging.title}
          </h2>
          <p className="text-xl text-slate-400">{debugging.subtitle}</p>

          <div className="mt-6 inline-block glass-card px-6 py-3 neon-border font-mono text-sm text-slate-300">
            {debugging.quote}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bug cards */}
          <div className="space-y-4">
            <div className="text-xs font-mono text-red-400/60 mb-4">// errors[] — click to "fix"</div>
            {debugging.bugs.map((bug, i) => (
              <BugCard key={bug.id} bug={bug} index={i} onFix={onFix} />
            ))}

            <AnimatePresence>
              {allFixed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-4 text-center"
                  style={{ border: '1px solid rgba(6,255,165,0.4)', boxShadow: '0 0 30px rgba(6,255,165,0.15)' }}
                >
                  <div className="text-2xl mb-2">🎉</div>
                  <div className="font-mono text-sm text-green-400">All bugs fixed! ...for now.</div>
                  <div className="font-mono text-xs text-slate-600 mt-1">New bugs created: probably 3</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Console log */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card neon-border overflow-hidden sticky top-24">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-red-900/10">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs font-mono text-red-400">Console — {fixedIds.length * 23} errors</span>
              </div>
              <div className="p-6 font-mono text-xs space-y-3">
                {debugging.consoleLogs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className={`flex gap-2 ${log.startsWith('//') ? 'text-slate-600' : 'text-yellow-400'}`}
                  >
                    {!log.startsWith('//') && <span className="text-red-500">⚠</span>}
                    <span>{log}</span>
                  </motion.div>
                ))}
              </div>

              {/* Works on my machine badge */}
              <div className="mx-6 mb-6 p-4 rounded-xl bg-green-900/20 border border-green-500/20">
                <div className="font-mono text-xs text-green-400 flex items-center gap-2">
                  <span>✓</span>
                  Works on my machine™
                </div>
                <div className="text-xs text-slate-600 mt-1 font-mono">— Certified developer excuse since 1969</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
