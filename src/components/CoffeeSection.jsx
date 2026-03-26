import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyContent } from '../data/storyContent';

const { coffee } = storyContent;

function CoffeeCup({ energy }) {
  const fillPercent = energy;
  return (
    <div className="relative w-32 h-40 mx-auto">
      {/* Steam */}
      {energy > 30 && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-3">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ y: [-5, -20], opacity: [0.6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
              className="w-0.5 rounded-full"
              style={{
                height: '24px',
                background: `rgba(0,212,255,${0.5 - i * 0.1})`,
                filter: 'blur(2px)',
              }}
            />
          ))}
        </div>
      )}

      {/* Cup body */}
      <div className="absolute inset-0 rounded-b-3xl rounded-t-lg overflow-hidden"
        style={{ border: '2px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.4)' }}>
        {/* Coffee fill */}
        <motion.div
          animate={{ height: `${fillPercent}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute bottom-0 left-0 right-0"
          style={{
            background: energy > 70
              ? 'linear-gradient(to top, #06ffa5, #00d4ff)'
              : energy > 30
                ? 'linear-gradient(to top, #7c3aed, #a855f7)'
                : 'linear-gradient(to top, #2d1a4a, #4a2a7a)',
          }}
        />
        {/* Bubbles */}
        {energy > 50 && [0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ y: [0, -20], opacity: [0.4, 0], scale: [0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
            className="absolute bottom-4 rounded-full"
            style={{
              width: '6px',
              height: '6px',
              left: `${30 + i * 20}%`,
              background: '#00d4ff',
            }}
          />
        ))}
      </div>

      {/* Handle */}
      <div className="absolute right-0 top-1/3 w-6 h-12 rounded-r-full"
        style={{ border: '2px solid rgba(255,255,255,0.15)', borderLeft: 'none' }} />
    </div>
  );
}

export default function CoffeeSection() {
  const [energy, setEnergy] = useState(10);
  const levelData = energy < 33 ? coffee.levels[0] : energy < 66 ? coffee.levels[1] : coffee.levels[2];
  const thoughtIndex = Math.floor((energy / 100) * (coffee.thoughts.length - 1));

  return (
    <section id="coffee" className="relative min-h-screen py-32 px-6 overflow-hidden">
      {/* Night bg */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 80%, rgba(124,58,237,0.12) 0%, transparent 70%)' }} />

      {/* Stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 rounded-full bg-white"
          style={{
            top: `${Math.random() * 60}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.4 + 0.1,
          }}
          animate={{ opacity: [null, 0.1, 0.5, 0.1] }}
          transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block font-mono text-xs text-yellow-400/60 mb-4">// chapter_04 — fuel_system.ts</div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4" style={{ fontFamily: 'Syne' }}>
            {coffee.title}
          </h2>
          <p className="text-xl text-amber-400 italic font-mono">{coffee.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="text-xs font-mono text-slate-600 mb-2">// today_stats{}</div>
            {coffee.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-4 flex items-center justify-between"
                style={{ border: '1px solid rgba(255,165,0,0.15)' }}
              >
                <span className="text-xs font-mono text-slate-500">{stat.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-black text-2xl text-white" style={{ fontFamily: 'Syne' }}>{stat.value}</span>
                  <span className="text-xl">{stat.unit}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Center: Coffee cup + slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <CoffeeCup energy={energy} />

            <div className="mt-10 px-4">
              <div className="text-xs font-mono text-slate-500 mb-3">// caffeine_level: {energy}%</div>

              <input
                type="range"
                min={0}
                max={100}
                value={energy}
                onChange={e => setEnergy(Number(e.target.value))}
                data-hover
                className="w-full accent-purple-500 cursor-pointer"
                style={{ accentColor: levelData.color }}
              />

              <div className="flex justify-between text-xs font-mono text-slate-700 mt-1">
                <span>💀 0 cups</span>
                <span>🚀 10 cups</span>
              </div>
            </div>

            <motion.div
              key={levelData.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 glass-card p-4"
              style={{ border: `1px solid ${levelData.color}30` }}
            >
              <div className="font-bold text-sm mb-1" style={{ color: levelData.color }}>{levelData.label}</div>
              <div className="text-xs text-slate-400">{levelData.desc}</div>
            </motion.div>
          </motion.div>

          {/* Developer thoughts */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="text-xs font-mono text-slate-600 mb-2">// brain.thoughts[]</div>
            {coffee.thoughts.map((thought, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="glass-card p-4 text-sm text-slate-300 font-mono transition-all duration-500"
                style={{
                  border: `1px solid ${i <= thoughtIndex ? 'rgba(168,85,247,0.3)' : 'rgba(255,255,255,0.05)'}`,
                  opacity: i <= thoughtIndex ? 1 : 0.3,
                  transform: i === thoughtIndex ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                {i <= thoughtIndex ? '💡' : '💭'} {thought}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Late night quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-block glass-card px-8 py-5 text-lg italic text-slate-400 max-w-2xl"
            style={{ border: '1px solid rgba(255,165,0,0.15)' }}>
            "The best time to write clean code is when you have 4 hours of sleep and 7 cups of coffee."<br />
            <span className="text-xs font-mono text-slate-600 not-italic">— No developer ever, but also every developer</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
