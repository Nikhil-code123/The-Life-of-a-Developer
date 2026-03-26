export default function Footer() {
  return (
    <footer style={{ background: '#03020a', borderTop: '1px solid rgba(255,255,255,.05)', padding: '2.5rem 1.5rem', textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: '.72rem', color: '#334155' }}>
      <div style={{ marginBottom: '.5rem' }}>
        <span className="gradient-text-electric" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900 }}>DEVLIFE</span>
      </div>
      <div>Built with ☕ × ∞ | Powered by caffeine &amp; ctrl+z | No developers were harmed (probably)</div>
    </footer>
  );
}
