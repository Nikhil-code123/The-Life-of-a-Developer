import { useState } from 'react';
import { motion } from 'framer-motion';
import { storyContent } from '../data/storyContent';

const { victory } = storyContent;

function AchievementCard({ ach, index }) {
  const [claimed, setClaimed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.04, y: -4 }}
      onClick={() => setClaimed(true)}
      data-hover
      className="glass-card p-6 cursor-pointer relative overflow-hidden group transition-all duration-300"
      style={{
        border: claimed ? `1px solid ${ach.color}60` : `1px solid rgba(255,255,255,0.06)`,
        boxShadow: claimed ? `0 0 40px ${ach.color}20` : 'none',
      }}
    >
      {/* Shine sweep */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${ach.color}08, transparent 60%)` }} />

      {claimed && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-xs"
          style={{ background: ach.color, boxShadow: `0 0 12px ${ach.color}` }}
        >
          ✓
        </motion.div>
      )}

      <div className="text-4xl mb-4">{ach.icon}</div>
      <div className="font-bold text-white mb-2" style={{ fontFamily: 'Syne', fontSize: '1rem' }}>
        {ach.label}
      </div>
      <div className="text-xs text-slate-500 leading-relaxed font-mono">{ach.desc}</div>

      {!claimed && (
        <div className="mt-4 text-xs font-mono" style={{ color: ach.color, opacity: 0.6 }}>
          click to claim →
        </div>
      )}
    </motion.div>
  );
}

export default function VictorySection() {
  return (
    <section id="victory" className="relative min-h-screen py-32 px-6 overflow-hidden">
      {/* Celebration bg */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(6,255,165,0.06) 0%, rgba(0,212,255,0.04) 40%, transparent 70%)' }} />

      {/* Confetti particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const colors = ['#00d4ff', '#06ffa5', '#a855f7', '#ffd700', '#ff6b35'];
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-3 opacity-20 rounded-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: colors[i % colors.length],
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
            animate={{
              y: [0, Math.random() * 20 - 10],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 360],
            }}
            transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, delay: Math.random() * 3 }}
          />
        );
      })}

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block font-mono text-xs text-green-400/60 mb-4">// chapter_final — success.exe</div>
          <h2 className="text-5xl md:text-7xl font-black mb-4" style={{ fontFamily: 'Syne' }}>
            <span className="gradient-text-cyber">{victory.title}</span>
          </h2>
          <p className="text-xl text-slate-400">{victory.subtitle}</p>
        </motion.div>

        {/* Achievement grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {victory.achievements.map((ach, i) => (
            <AchievementCard key={ach.label} ach={ach} index={i} />
          ))}
        </div>

        {/* Growth timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 mb-16"
          style={{ border: '1px solid rgba(6,255,165,0.2)' }}
        >
          <div className="text-xs font-mono text-slate-600 mb-6">// developer_journey.timeline</div>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { label: 'Day 1', desc: 'Hello World', emoji: '👶' },
              { label: 'Month 1', desc: 'CSS confusion', emoji: '😵' },
              { label: 'Month 3', desc: 'First project', emoji: '🏗️' },
              { label: 'Month 6', desc: 'First bug fix (took 2 days)', emoji: '🐛' },
              { label: 'Year 1', desc: 'Got hired!', emoji: '💼' },
              { label: 'Year 2', desc: 'Senior Developer', emoji: '🧠' },
              { label: 'Now', desc: '∞ learning', emoji: '🚀' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl mb-2">{item.emoji}</div>
                <div className="text-xs font-mono text-cyan-400 mb-1">{item.label}</div>
                <div className="text-xs text-slate-500">{item.desc}</div>
                {i < 6 && (
                  <div className="hidden sm:block absolute top-4 right-0 w-8 h-px bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="text-3xl md:text-5xl font-black mb-6 gradient-text-cyber" style={{ fontFamily: 'Syne' }}>
            "{victory.finalQuote}"
          </div>
          <p className="text-slate-600 font-mono text-sm mb-10">— The compiler, probably</p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            data-hover
            className="group relative px-10 py-5 rounded-full font-bold text-lg overflow-hidden inline-flex items-center gap-3"
            style={{ background: 'linear-gradient(135deg, #06ffa5, #00d4ff)', color: '#03020a' }}
          >
            <span className="relative z-10">🚀 {victory.cta}</span>
          </motion.button>

          <div className="mt-8 text-xs font-mono text-slate-700">
            // Thanks for watching. Now go ship something.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
