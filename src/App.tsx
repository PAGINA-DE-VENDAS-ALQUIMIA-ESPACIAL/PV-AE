import { useState } from 'react';
import HeroSection from './components/cp01-hero-frames/HeroSection';
import TimelineSection from './components/cp02-processos/TimelineSection';
import ClientesSection from './components/cp03-clientes/ClientesSection';
import Oferta from './components/cp04-entrega/Oferta';
import SaaSFeatureSection from './components/cp05-plano/SaaSFeatureSection';
import FAQ from './components/cp06-faq/ui/faq-tabs';
import GridBackground from './components/cp06-faq/GridBackground';
import { categories as faqCategories, faqData } from './data/faqData';
import ContatoSection from './components/cp07-contato/ContatoSection';

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={`relative w-full min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-black text-white' : 'bg-black text-slate-900'
    } selection:bg-amber-500/30 selection:text-amber-900`}>
      {/* COMPONENTE 01 — HERO (Hero Principal, Cocriação, Vídeo de Apresentação, Background Frames, Header Global e Modais) */}
      <HeroSection isDark={isDark} onToggleDark={() => setIsDark(prev => !prev)} />

      {/* COMPONENTE 02 — PROCESSOS */}
      <div id="processes" className="relative z-20 scroll-snap-section">
        <TimelineSection />
      </div>

      {/* COMPONENTE 03 — CLIENTES */}
      <div id="projects" className={`relative z-10 scroll-snap-section transition-colors duration-300 ${
        isDark ? 'bg-black text-white' : 'bg-white text-slate-900'
      }`}>
        <ClientesSection isDark={isDark} initialDark={isDark} />
      </div>

      {/* COMPONENTE 04 — ENTREGA */}
      <div id="deliverables" className={`relative z-10 pb-16 md:pb-20 lg:pb-24 overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-black text-white' : 'bg-white text-stone-900'
      }`}>
        <GridBackground isDark={isDark} opacity={isDark ? 0.25 : 0.10} gridSize={40} />
        <Oferta isDark={isDark} />
      </div>

      {/* COMPONENTE 05 — PLANO */}
      <div id="plans" className="relative z-10 bg-black text-white scroll-snap-section">
        <SaaSFeatureSection />
      </div>

      {/* COMPONENTE 06 — FAQ */}
      <div id="faq" className={`relative z-10 scroll-snap-section transition-colors duration-300 ${
        isDark ? 'bg-black text-white' : 'bg-white text-slate-900'
      }`}>
        <FAQ categories={faqCategories} faqData={faqData} isDark={isDark} />
      </div>

      {/* COMPONENTE 07 — CONTATO */}
      <div id="contact" className={`relative z-10 scroll-snap-section transition-colors duration-300 ${
        isDark ? 'bg-black text-white' : 'bg-white text-stone-900'
      }`}>
        <ContatoSection isDark={isDark} />
      </div>


    </div>
  );
}
