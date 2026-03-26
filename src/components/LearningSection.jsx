import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useScrollAnimations';
import { storyContent } from '../data/storyContent';

const { learning } = storyContent;

function SkillCard({ skill, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
      className="glass-card p-5 cursor-pointer transition-all duration-300 group relative overflow-hidden"
      style={{
        border: hovered ? `1px solid ${skill.color}40` : '1px solid rgba(255,255,255,0.06)',
        boxShadow: hovered ? `0 0 30px ${skill.color}20, inset 0 0 20px ${skill.color}08` : 'none',
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 50%, ${skill.color}08, transparent 70%)` }} />

      <div className="relative z-10">
        <div className="text-3xl mb-3">{skill.emoji}</div>
        <div className="font-display font-bold text-white mb-1" style={{ fontFamily: 'Syne' }}>{skill.name}</div>
        <div className="text-xs text-slate-500 mb-4 font-mono">{skill.desc}</div>

        {/* Skill bar */}
        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: hovered ? `${skill.level}%` : '0%' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})` }}
          />
        </div>
        <div className="text-right text-xs font-mono mt-1" style={{ color: skill.color, opacity: hovered ? 1 : 0, transition: 'opacity 0.3s' }}>
          {skill.level}%
        </div>
      </div>
    </motion.div>
  );
}

export default function LearningSection() {
  const [ref, inView] = useInView(0.2);
  const [line, setLine] = useState(0);

  return (
    <section id="learning" className="relative min-h-screen py-32 px-6 overflow-hidden">
      {/* Bg */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 50%, rgba(0,212,255,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block font-mono text-xs text-cyan-400/60 mb-4">// chapter_01.html</div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4" style={{ fontFamily: 'Syne' }}>
            {learning.title}
          </h2>
          <p className="text-xl text-slate-400 italic">{learning.subtitle}</p>
          <div className="mt-6 inline-block glass-card px-6 py-3 font-mono text-sm text-slate-300 neon-border">
            {learning.quote}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Code block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card neon-border overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/2">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs font-mono text-slate-500">index.html — my_first_website</span>
              </div>
              <div className="p-6 font-mono text-sm space-y-1">
                {learning.codeLines.map((codeLine, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <span className="text-slate-700 select-none w-4 text-right text-xs">{i + 1}</span>
                    <span className={
                      codeLine.startsWith('<!--')
                        ? 'text-slate-500'
                        : codeLine.includes('<h1>') || codeLine.includes('<body>') || codeLine.includes('<html>')
                          ? 'text-cyan-400'
                          : 'text-slate-300'
                    }>
                      {codeLine}
                    </span>
                  </motion.div>
                ))}
                <div className="flex gap-4 mt-2">
                  <span className="text-slate-700 select-none w-4 text-right text-xs">{learning.codeLines.length + 1}</span>
                  <span className="terminal-cursor text-cyan-400" />
                </div>
              </div>
            </div>

            {/* Fun badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-6 glass-card p-4 neon-border-purple flex items-center gap-3"
            >
              <div className="text-2xl">🎉</div>
              <div>
                <div className="font-semibold text-white text-sm">First website achieved!</div>
                <div className="text-xs text-slate-500 font-mono">Times googled "how to center a div": 47</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Skill cards */}
          <div>
            <div className="text-xs font-mono text-slate-600 mb-4">// skills_acquired[]</div>
            <div className="grid grid-cols-2 gap-4">
              {learning.skills.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
