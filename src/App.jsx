import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import HeroSection from './components/HeroSection';
import LearningSection from './components/LearningSection';
import DebuggingSection from './components/DebuggingSection';
import DeadlineSection from './components/DeadlineSection';
import CoffeeSection from './components/CoffeeSection';
import VictorySection from './components/VictorySection';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div className="noise-overlay" />
      <Loader onComplete={() => setLoaded(true)} />
      <CustomCursor />
      <Navbar visible={loaded} />

      <main>
        <HeroSection />
        <div className="section-divider" style={{ width: '60%' }} />
        <LearningSection />
        <div className="section-divider" style={{ width: '60%' }} />
        <DebuggingSection />
        <div className="section-divider" style={{ width: '60%' }} />
        <DeadlineSection />
        <div className="section-divider" style={{ width: '60%' }} />
        <CoffeeSection />
        <div className="section-divider" style={{ width: '60%' }} />
        <VictorySection />
      </main>

      <Footer />
    </>
  );
}
