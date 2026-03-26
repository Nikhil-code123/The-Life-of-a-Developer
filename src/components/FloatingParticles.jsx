import { useEffect, useRef } from 'react';

const CODE_SYMBOLS = ['</', '{}', '=>', '&&', '||', '++', '!=', '===', '()', '[]', '??', '::',
  'fn()', '0x', '#!', '>=', '<=', '/*', '*/', '/**', '-->', '404', 'npm', 'git'];

export default function FloatingParticles({ count = 24 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = [];

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.textContent = CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)];
      const size = Math.random() * 10 + 9;
      const x = Math.random() * 100;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 20;
      const opacity = Math.random() * 0.18 + 0.04;
      const hue = Math.random() > 0.5 ? '#00d4ff' : '#a855f7';

      el.style.cssText = `
        position: absolute;
        left: ${x}%;
        bottom: -40px;
        font-family: 'JetBrains Mono', monospace;
        font-size: ${size}px;
        color: ${hue};
        opacity: ${opacity};
        pointer-events: none;
        user-select: none;
        animation: particleFloat ${duration}s ${delay}s linear infinite;
      `;

      container.appendChild(el);
      particles.push(el);
    }

    return () => particles.forEach(p => p.remove());
  }, [count]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
