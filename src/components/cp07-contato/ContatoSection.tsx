/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { AboutArchitectSection } from './AboutArchitectSection';
import { FooterSection } from './FooterSection';
import bannerImg from '../../assets/Bannerr 2.png';

export default function App() {
  const [isBannerZoomed, setIsBannerZoomed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      setIsHovered(true);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const activeZoom = isBannerZoomed || isHovered;

  return (
    <div className="min-h-screen w-full bg-white text-stone-900 font-sans flex flex-col transition-colors duration-300">
      
      {/* Áreas das Seções Inteiras dividindo o espaço */}
      <main className="w-full flex-1 flex flex-col">
        
        {/* Seção 1: Sobre o Arquiteto */}
        <AboutArchitectSection />

        {/* Seção 2: CTA Final */}
        <section 
          id="secao-cta-final" 
          className="relative w-full bg-white overflow-hidden transition-colors duration-300"
        >
          {/* Banner de fundo com zoom interativo e deslocamento ao passar o mouse ou clicar */}
          <div 
            className="relative w-full aspect-[2.85/1] xs:aspect-[3.1/1] sm:aspect-auto sm:h-[320px] lg:h-[360px] overflow-hidden cursor-pointer select-none"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest('a')) return;
              setIsBannerZoomed(prev => !prev);
            }}
          >
            <motion.img 
              src={bannerImg} 
              alt="Banner CTA Alquimia Espacial" 
              decoding="async"
              animate={{
                scale: activeZoom ? 1.45 : 1,
                filter: activeZoom ? 'saturate(1.35) contrast(1.05)' : 'saturate(1) contrast(1)',
              }}
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full h-full object-cover object-center block relative z-0 origin-[95%_50%]"
              style={{
                willChange: 'transform, filter',
              }}
            />

            {/* Conteúdo sobreposto: Headline e Botão exatamente posicionados */}
            <div className="absolute inset-0 w-full max-w-7xl mx-auto px-6 xs:px-8 sm:px-12 py-2 xs:py-2.5 sm:py-7 flex flex-col justify-between items-start z-10 pointer-events-none">
              
              {/* Metade Superior: Headline ajustada */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[340px] xs:max-w-[380px] sm:max-w-[560px] lg:max-w-[650px] mt-[4px] xs:mt-[8px] sm:mt-2"
              >
                <h2 
                  className="font-sans font-normal text-stone-950 tracking-tight text-left leading-[28px] sm:leading-[32px] text-[22px] xs:text-[24px] sm:text-[28px] lg:text-[32px] not-italic drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]"
                >
                  Pronto para descobrir<br />
                  o <span className="font-serif italic font-normal">verdadeiro potencial</span><br />
                  do <span className="font-serif italic font-normal">seu espaço?</span>
                </h2>
              </motion.div>

              {/* Metade Inferior: Botão de Ação */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="mb-2 xs:mb-3 sm:mb-6 max-w-full sm:max-w-none pointer-events-auto"
              >
                <a 
                  href="https://alquimiaespacial.notion.site/36c302780bb881e29a53cd4ee6435a7e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between gap-3 sm:gap-4 py-2 pl-4 sm:pl-6 pr-1.5 sm:pr-2 rounded-xl sm:rounded-2xl bg-white hover:bg-[#781A1A] text-stone-950 hover:text-white font-bold text-xs sm:text-base uppercase tracking-tight transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 group focus-visible:ring-2 focus-visible:ring-[#781A1A] focus-visible:outline-none cursor-pointer border-transparent"
                >
                  <span className="sm:hidden whitespace-nowrap text-xs text-stone-950 group-hover:text-white transition-colors">QUERO TRANSFORMAR</span>
                  <span className="hidden sm:inline whitespace-nowrap text-stone-950 group-hover:text-white transition-colors">QUERO TRANSFORMAR MEU ESPAÇO</span>
                  <span className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg sm:rounded-xl bg-black text-white group-hover:bg-white transition-colors shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:text-[#781A1A] transition-colors" />
                  </span>
                </a>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Seção 3: Rodapé */}
        <FooterSection />

      </main>
    </div>
  );
}

