import { useRef } from 'react';
import { motion } from 'framer-motion';
import FloatingParticles from './FloatingParticles';
import { useParallax } from '../hooks/useScrollAnimations';
import { storyContent } from '../data/storyContent';

const { hero } = storyContent;

export default function HeroSection() {
  const [bgRef, parallaxY] = useParallax(0.3);

  const scrollToLearning = () => {
    document.getElementById('learning')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={bgRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Layered bg */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,58,237,0.15) 0%, rgba(0,212,255,0.05) 50%, transparent 100%)',
          transform: `translateY(${parallaxY * 0.15}px)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          transform: `translateY(${parallaxY * 0.08}px)`,
        }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 animate-pulse-slow"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.4), transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-15 animate-pulse-slow"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.4), transparent 70%)', filter: 'blur(60px)', animationDelay: '2s' }} />

      <FloatingParticles count={30} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass-card neon-border px-4 py-2 text-xs font-mono text-cyan-400 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          An interactive story about every developer ever
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-[0.9]"
          style={{ fontFamily: 'Syne' }}
        >
          <span className="block text-white glitch-text" data-text="The Life">The Life</span>
          <span className="block gradient-text-electric glow-text">of a</span>
          <span className="block text-white">Developer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base md:text-lg text-slate-400 max-w-xl mx-auto mb-3 leading-relaxed"
        >
          {hero.sub}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xs font-mono text-slate-600 mb-12"
        >
          {hero.tagline}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            data-hover
            onClick={scrollToLearning}
            className="group relative px-8 py-4 rounded-full font-semibold text-sm overflow-hidden transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #00d4ff)' }}
          >
            <span className="relative z-10">{hero.cta} →</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #00d4ff, #7c3aed)' }} />
          </button>
          <div className="text-xs font-mono text-slate-600 flex items-center gap-2">
            <span className="w-8 h-px bg-white/10" />
            scroll to experience
            <span className="w-8 h-px bg-white/10" />
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="text-xs font-mono text-slate-600">scroll</div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
