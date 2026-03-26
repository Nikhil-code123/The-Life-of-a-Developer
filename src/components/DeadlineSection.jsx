import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useScrollAnimations';
import { storyContent } from '../data/storyContent';

const { deadline } = storyContent;

function Notification({ notif, index, onDismiss }) {
  const colors = {
    client: { bg: 'rgba(124,58,237,0.15)', border: 'rgba(168,85,247,0.3)', label: 'Client', dot: '#a855f7' },
    boss: { bg: 'rgba(255,107,53,0.15)', border: 'rgba(255,107,53,0.4)', label: 'Boss', dot: '#ff6b35' },
    system: { bg: 'rgba(0,212,255,0.1)', border: 'rgba(0,212,255,0.3)', label: 'System', dot: '#00d4ff' },
  };
  const c = colors[notif.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.18, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onDismiss(index)}
      data-hover
      className="glass-card p-4 cursor-pointer select-none relative overflow-hidden"
      style={{ background: c.bg, border: `1px solid ${c.border}` }}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
          style={{ background: `${c.dot}20`, border: `1px solid ${c.dot}40` }}>
          {notif.type === 'client' ? '👤' : notif.type === 'boss' ? '😰' : '⚠️'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold" style={{ color: c.dot }}>{c.label}</span>
            <span className="text-xs text-slate-600 font-mono">{notif.time}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{notif.msg}</p>
        </div>
      </div>
      <div className="absolute top-2 right-2 text-xs text-slate-600 hover:text-white">✕</div>
    </motion.div>
  );
}

function CountdownClock() {
  const [seconds, setSeconds] = useState(7200); // 2 hours

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s > 0 ? s - 1 : 7200);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pct = ((7200 - seconds) / 7200) * 100;
  const critical = seconds < 1800;

  return (
    <div className="glass-card p-6 neon-border text-center">
      <div className="text-xs font-mono text-slate-600 mb-3">DEADLINE T-MINUS</div>
      <div className={`font-mono font-black text-4xl md:text-5xl mb-4 transition-colors duration-500 ${critical ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`}
        style={{ fontFamily: 'JetBrains Mono' }}>
        {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: critical ? 'linear-gradient(90deg, #ff2d78, #ff6b35)' : 'linear-gradient(90deg, #7c3aed, #00d4ff)',
            transition: 'width 1s linear, background 0.5s ease',
          }}
        />
      </div>
      <div className="text-xs font-mono text-slate-600">
        {critical ? '🔥 CRITICAL — caffeine required' : '⏳ time is a flat circle'}
      </div>
    </div>
  );
}

export default function DeadlineSection() {
  const [notifs, setNotifs] = useState(deadline.notifications);
  const [activeTab, setActiveTab] = useState(0);
  const [dismissed, setDismissed] = useState([]);

  const onDismiss = (i) => setDismissed(prev => [...prev, i]);

  return (
    <section id="deadline" className="relative min-h-screen py-32 px-6 overflow-hidden">
      {/* Chaotic red bg */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(255,45,120,0.07) 0%, transparent 70%)' }} />

      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-red-500/30 to-transparent animate-scanline" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block font-mono text-xs text-red-400/60 mb-4">// chapter_03 — PANIC_MODE.exe</div>
          <motion.h2
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            className="text-5xl md:text-7xl font-black mb-4 glow-ember"
            style={{ fontFamily: 'Syne', color: '#ff6b35' }}
          >
            {deadline.title}
          </motion.h2>
          <p className="text-xl text-slate-400">{deadline.subtitle}</p>
        </motion.div>

        {/* Browser tabs mock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card overflow-hidden mb-10"
          style={{ border: '1px solid rgba(255,107,53,0.2)' }}
        >
          <div className="flex overflow-x-auto bg-black/30 px-2 pt-2 gap-0.5 scrollbar-hide">
            {deadline.tabs.map((tab, i) => (
              <button
                key={i}
                data-hover
                onClick={() => setActiveTab(i)}
                className={`flex-shrink-0 px-3 py-2 text-xs font-mono rounded-t-lg transition-all duration-200 max-w-[140px] truncate ${
                  activeTab === i
                    ? 'bg-navy text-white'
                    : 'text-slate-600 hover:text-slate-400 hover:bg-white/5'
                }`}
              >
                {i === activeTab && <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 mr-1.5 animate-pulse" />}
                {tab}
              </button>
            ))}
          </div>
          <div className="p-6">
            <div className="font-mono text-xs text-slate-600 mb-2">// current tab: {deadline.tabs[activeTab]}</div>
            <div className="font-mono text-sm text-slate-400 italic">
              {activeTab === 7 ? '"Just for 5 minutes." — famous last words' :
               activeTab === 4 ? 'localhost:3001 — ERROR: port already in use' :
               activeTab === 5 ? '# WHY.md\n\nWHY\nWHY\nWHY\nWHY' :
               '...frantically googling...'}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Notifications */}
          <div>
            <div className="text-xs font-mono text-red-400/60 mb-4">// incoming_requests[] — click to dismiss</div>
            <div className="space-y-3">
              {deadline.notifications.map((notif, i) =>
                !dismissed.includes(i) ? (
                  <Notification key={i} notif={notif} index={i} onDismiss={onDismiss} />
                ) : (
                  <motion.div
                    key={i}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0, x: 100, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  />
                )
              )}
              {dismissed.length === deadline.notifications.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-4 text-center font-mono text-xs text-green-400"
                  style={{ border: '1px solid rgba(6,255,165,0.3)' }}
                >
                  ✓ All requests handled. Just kidding, 5 more incoming.
                </motion.div>
              )}
            </div>
          </div>

          {/* Right: countdown + progress bars */}
          <div className="space-y-6">
            <CountdownClock />

            <div className="glass-card p-6" style={{ border: '1px solid rgba(255,107,53,0.2)' }}>
              <div className="text-xs font-mono text-slate-600 mb-4">// progress_report.json</div>
              {[
                { label: 'Features Promised', value: 87, color: '#a855f7' },
                { label: 'Features Built', value: 23, color: '#06ffa5' },
                { label: 'Features Working', value: 9, color: '#00d4ff' },
                { label: 'Developer Sanity', value: 4, color: '#ff2d78' },
                { label: 'Coffee Remaining', value: 12, color: '#ff6b35' },
              ].map((bar, i) => (
                <div key={bar.label} className="mb-4">
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-400">{bar.label}</span>
                    <span style={{ color: bar.color }}>{bar.value}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.value}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.8, ease: 'easeOut' }}
                      style={{ background: bar.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
