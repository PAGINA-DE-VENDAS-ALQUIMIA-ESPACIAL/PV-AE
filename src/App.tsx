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
  return (
    <div className="relative w-full min-h-screen bg-black text-slate-900 selection:bg-amber-500/30 selection:text-amber-900">
      {/* COMPONENTE 01 — HERO (Hero Principal, Cocriação, Vídeo de Apresentação, Background Frames, Header Global e Modais) */}
      <HeroSection />

      {/* COMPONENTE 02 — PROCESSOS */}
      <div id="processes" className="relative z-20 scroll-snap-section">
        <TimelineSection />
      </div>

      {/* COMPONENTE 03 — CLIENTES */}
      <div id="projects" className="relative z-10 bg-white text-slate-900 scroll-snap-section">
        <ClientesSection initialDark={false} />
      </div>

      {/* COMPONENTE 04 — ENTREGA */}
      <div id="deliverables" className="relative z-10 bg-white text-stone-900 pb-16 md:pb-20 lg:pb-24 overflow-hidden">
        <GridBackground isDark={false} opacity={0.10} gridSize={40} />
        <Oferta isDark={false} />
      </div>

      {/* COMPONENTE 05 — PLANO */}
      <div id="plans" className="relative z-10 bg-black text-white scroll-snap-section">
        <SaaSFeatureSection />
      </div>

      {/* COMPONENTE 06 — FAQ */}
      <div id="faq" className="relative z-10 bg-white text-slate-900 scroll-snap-section">
        <FAQ categories={faqCategories} faqData={faqData} isDark={false} />
      </div>

      {/* COMPONENTE 07 — CONTATO */}
      <div id="contact" className="relative z-10 bg-white text-stone-900 scroll-snap-section">
        <ContatoSection />
      </div>

    </div>
  );
}
