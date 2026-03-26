import { motion } from 'framer-motion';
import { useScrollProgress, useActiveSection } from '../hooks/useScrollAnimations';

const SECTIONS = ['hero', 'learning', 'debugging', 'deadline', 'coffee', 'victory'];
const LABELS = ['Start', 'Learn', 'Debug', 'Chaos', 'Coffee', 'Win'];

export default function Navbar({ visible }) {
  const progress = useScrollProgress();
  const activeSection = useActiveSection(SECTIONS);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-white/5">
        <motion.div
          className="h-full"
          style={{
            width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, #7c3aed, #00d4ff, #06ffa5)',
          }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
        className="fixed top-6 left-6 z-50 flex items-center gap-3"
      >
        <div className="font-display font-black text-xl tracking-tight" style={{ fontFamily: 'Syne' }}>
          <span className="gradient-text-electric">DEV</span>
          <span className="text-white/80">LIFE</span>
        </div>
      </motion.div>

      {/* Sound toggle mock */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        className="fixed top-6 right-6 z-50"
      >
        <button data-hover className="glass-card px-3 py-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
          <span>♪</span>
          <span className="hidden sm:inline">ambient</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </button>
      </motion.div>

      {/* Side section dots */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 20 }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4 items-center"
      >
        {SECTIONS.map((id, i) => (
          <button
            key={id}
            data-hover
            onClick={() => scrollTo(id)}
            className="group flex items-center gap-2"
          >
            <span className={`text-xs font-mono opacity-0 group-hover:opacity-100 transition-all duration-200 text-right ${activeSection === i ? 'text-cyan-400' : 'text-slate-500'}`}>
              {LABELS[i]}
            </span>
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === i
                  ? 'bg-cyan-400 scale-150 shadow-[0_0_8px_rgba(0,212,255,0.8)]'
                  : 'bg-white/20 hover:bg-white/50'
              }`}
            />
          </button>
        ))}
      </motion.div>
    </>
  );
}
