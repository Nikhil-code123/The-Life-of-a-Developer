import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
    };

    const lerp = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        const offset = hovered ? 30 : 18;
        ringRef.current.style.transform = `translate(${ringPos.current.x - offset}px, ${ringPos.current.y - offset}px)`;
      }
      raf.current = requestAnimationFrame(lerp);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, [role="button"], input, [data-hover]')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', handleMouseOver);
    raf.current = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(raf.current);
    };
  }, [hovered]);

  return (
    <>
      <div ref={dotRef} className="custom-cursor hidden md:block" style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 10000 }} />
      <div ref={ringRef} className={`custom-cursor-ring hidden md:block ${hovered ? 'hovered' : ''}`} style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }} />
    </>
  );
}
