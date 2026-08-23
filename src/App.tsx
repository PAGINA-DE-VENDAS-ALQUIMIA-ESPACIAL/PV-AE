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

      {/* COMPONENTE 02 — PROCESSOS (Storytelling Floema 6 etapas com Efeito Cortina sobre o topo) */}
      <div id="processes" className="relative z-20 scroll-snap-section">
        <TimelineSection />
      </div>

      {/* COMPONENTE 03 — CLIENTES (Galeria Orbital 3D, Headline e Depoimentos Marquee - Modo Claro) */}
      <div id="projects" className="relative z-10 bg-white text-slate-900 scroll-snap-section">
        <ClientesSection initialDark={false} />
      </div>

      {/* COMPONENTE 04 — ENTREGA (7 Entregáveis e Split Comparativo - Modo Claro Papel) */}
      <div id="deliverables" className="relative z-10 bg-white text-stone-900 pt-20 sm:pt-24 lg:pt-24 pb-16 md:py-20 lg:py-24 overflow-hidden scroll-snap-section">
        <GridBackground isDark={false} opacity={0.10} gridSize={40} />
        <Oferta isDark={false} />
      </div>

      {/* COMPONENTE 05 — PLANO (SaaS Feature Section 4 Passos - Modo Escuro Nátivo do Componente) */}
      <div id="plans" className="relative z-10 bg-black text-white scroll-snap-section">
        <SaaSFeatureSection />
      </div>

      {/* COMPONENTE 06 — FAQ (Perguntas Frequentes com Busca Global e Papel Quadriculado - Modo Claro) */}
      <div id="faq" className="relative z-10 bg-white text-slate-900 scroll-snap-section">
        <FAQ categories={faqCategories} faqData={faqData} isDark={false} />
      </div>

      {/* COMPONENTE 07 — CONTATO (Sobre o Arquiteto Giro 3D, Banner CTA e Rodapé Institucional) */}
      <div id="contact" className="relative z-10 bg-white text-stone-900 scroll-snap-section">
        <ContatoSection />
      </div>
    </div>
  );
}
