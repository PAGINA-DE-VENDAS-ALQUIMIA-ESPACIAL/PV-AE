import React, { useState, useCallback } from 'react';
import {
  Check,
  Globe,
  Building2,
  Layers,
  Home,
} from 'lucide-react';
import { ExpandingCards } from './ui/expanding-cards';
import { motion, AnimatePresence } from 'motion/react';
import {
  ENTREGAVEIS_OFERTA,
  ALINHAMENTO_IMAGES,
  ALQUIMIA_TOPICS,
  TRADICIONAL_TOPICS,
} from './oferta-data';

interface OfertaProps {
  isDark?: boolean;
}

export default function Oferta({ isDark = false }: OfertaProps) {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
  const [showLeftDetails, setShowLeftDetails] = useState<boolean>(false);
  const [showRightDetails, setShowRightDetails] = useState<boolean>(false);

  const toggleLeftDetails = useCallback(() => {
    setShowLeftDetails((prev) => !prev);
  }, []);

  const toggleRightDetails = useCallback(() => {
    setShowRightDetails((prev) => !prev);
  }, []);

  const handleKeyDownLeft = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleLeftDetails();
    }
  }, [toggleLeftDetails]);

  const handleKeyDownRight = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleRightDetails();
    }
  }, [toggleRightDetails]);

  return (
    <div id="oferta-container" className="relative w-full max-w-6xl mx-auto font-['DM_Sans',sans-serif] bg-transparent px-2 py-0">
      <div id="oferta-sections" className="relative z-10 space-y-10 md:space-y-14 lg:space-y-16">
        
        {/* Seção 1: Entregáveis (Trilha do que você leva) */}
        <section id="secao-entregaveis" className="scroll-snap-section scroll-mt-20 sm:scroll-mt-24 w-full bg-transparent py-0 sm:py-1">
          <div className="text-center mb-3 sm:mb-3 md:mb-3.5 lg:mb-4 max-w-5xl lg:max-w-6xl mx-auto px-2 sm:px-4 pt-20 sm:pt-22 md:pt-20 lg:pt-20">
            <h1 
              className={`font-cargiona text-[26px] sm:text-[28px] md:text-[38px] lg:text-[40px] font-normal tracking-tight leading-[1.08] md:leading-[1.10] ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              <span className="block">
                Entregas que <span className="font-['Playfair_Display',serif] italic font-normal px-0.5">revelam</span>
              </span>
              <span className="block -mt-1 md:-mt-2">
                um <span className="font-['Playfair_Display',serif] italic font-normal px-0.5">novo olhar</span> espacial.
              </span>
            </h1>
          </div>

          {/* Galeria recebe diretamente o array centralizado de dados e imagens */}
          <ExpandingCards items={ENTREGAVEIS_OFERTA} defaultActiveIndex={6} />

          {/* Sub-headline abaixo da galeria como complemento */}
          <div className="text-center mt-4 md:mt-5 max-w-5xl lg:max-w-6xl mx-auto px-2 sm:px-4 pb-2">
            <p 
              className={`text-[14.5px] sm:text-[15px] md:text-[16px] font-normal leading-snug sm:leading-relaxed text-center mx-auto w-full max-w-none sm:max-w-2xl md:max-w-3xl px-1 sm:px-0 [text-wrap:pretty] ${
                isDark ? 'text-neutral-400' : 'text-slate-600'
              }`}
            >
              <span className="sm:hidden block w-full mx-auto text-center text-[14.5px] leading-snug">
                Tudo o que você recebe neste projeto foi pensado<br />
                para um único objetivo: reduzir incertezas, fortalecer<br />
                decisões e tornar a transformação do espaço mais consciente.
              </span>
              <span className="hidden sm:inline">
                Tudo o que você recebe neste projeto foi pensado para um único objetivo: reduzir incertezas, fortalecer decisões e tornar a transformação do espaço mais consciente.
              </span>
            </p>
          </div>
        </section>

        {/* Seção 2: Alinhamento de Expectativas (Split-Screen Interativo estilo GIF) */}
        <section id="secao-alinhamento" className={`scroll-snap-section scroll-mt-20 sm:scroll-mt-24 w-full pb-6 md:pb-8 border-t bg-transparent ${
          isDark ? 'border-neutral-800 text-white' : 'border-slate-200 text-slate-900'
        }`}>
          
          {/* Headline */}
          <div className="text-center mb-3 sm:mb-3 md:mb-3.5 lg:mb-4 max-w-3xl mx-auto px-2 sm:px-4 pt-20 sm:pt-22 md:pt-20 lg:pt-20">
            <h2 className={`font-cargiona text-[26px] sm:text-[28px] md:text-[38px] lg:text-[40px] font-normal tracking-tight leading-[1.08] md:leading-[1.10] ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              <span className="block">
                Sua <span className="font-['Playfair_Display',serif] italic font-normal px-0.5">visão</span> encontra
              </span>
              <span className="block -mt-1 md:-mt-2">
                nossa <span className="font-['Playfair_Display',serif] italic font-normal px-0.5">forma de criar</span>.
              </span>
            </h2>
          </div>

          {/* Componente Split Desktop */}
          <div className="hidden md:flex relative w-full h-[530px] lg:h-[560px] rounded-3xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl mb-4 text-white items-stretch">
            
            {/* Lado Esquerdo: Alquimia Espacial (Verde-Oliva Transparente) */}
            <motion.div
              role="button"
              tabIndex={0}
              aria-label="Alquimia Espacial - Ver detalhes e alinhamento"
              aria-expanded={showLeftDetails}
              onClick={toggleLeftDetails}
              onKeyDown={handleKeyDownLeft}
              className="relative h-full overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border-r border-neutral-800/80 will-change-[width] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a9d59]"
              style={{
                width:
                  hoveredSide === 'left'
                    ? '54%'
                    : hoveredSide === 'right'
                    ? '46%'
                    : '50%',
              }}
              onMouseEnter={() => setHoveredSide('left')}
              onMouseLeave={() => setHoveredSide(null)}
            >
              {/* Background Image Estática com a Imagem Centralizada */}
              <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none w-full h-full transition-transform duration-300 ease-out"
                style={{
                  backgroundImage: `url("${ALINHAMENTO_IMAGES.alquimia}")`,
                }}
              />
              {/* Overlay Verde Oliva Dinâmico */}
              <div 
                className={`absolute inset-0 bg-gradient-to-b transition-all duration-300 ease-out pointer-events-none w-full h-full ${
                  showLeftDetails 
                    ? 'from-[#101907]/85 via-[#18220b]/75 to-[#101907]/92' 
                    : 'from-[#18220b]/30 via-[#18220b]/20 to-[#18220b]/40'
                }`} 
              />

              {/* Conteúdo Lado Esquerdo */}
              <div className="relative z-10 p-7 lg:p-9 flex flex-col justify-between h-full">
                
                {/* Cabeçalho do Card */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#3b4625]/90 border border-[#6b7c42]/80 px-3.5 py-1.5 rounded-full shadow-sm drop-shadow-sm">
                      ALQUIMIA ESPACIAL
                    </span>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">
                    Pode fazer sentido para você se...
                  </h3>
                </div>

                {/* Tópicos Alquimia Espacial */}
                <div className="space-y-4 my-auto py-2">
                  {ALQUIMIA_TOPICS.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 group/item">
                      <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#3b4625]/90 border border-[#8a9d59] shrink-0 mt-0.5 shadow-sm">
                        <span 
                          className="absolute inline-flex h-full w-full rounded-full bg-[#d2e0ab] opacity-40 animate-ping"
                          style={{ animationDuration: '3s' }}
                        ></span>
                        <Check className="relative w-3.5 h-3.5 text-[#d2e0ab]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base lg:text-[17px] font-bold text-white tracking-wide group-hover/item:text-[#d2e0ab] transition-colors drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">
                          {item.title}
                        </h4>

                        <AnimatePresence>
                          {showLeftDetails && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: 'easeOut' }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm lg:text-[15.5px] text-neutral-100/95 leading-relaxed font-normal mt-1.5 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">
                                {item.desc}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Rodapé: Mini Cards Horizontalmente Minimalistas e Fixos */}
                <div className="pt-3.5 border-t border-white/15 grid grid-cols-3 gap-2 shrink-0 mt-auto">
                  <div className="bg-[#243312]/80 backdrop-blur-md border border-[#60733d]/70 rounded-full py-1.5 px-3 flex flex-row items-center justify-center gap-1.5 text-center shadow-md">
                    <span className="text-xs font-extrabold text-[#d2e0ab] shrink-0">
                      $$
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold uppercase text-white/95 whitespace-nowrap drop-shadow-sm">MAIS ACESSÍVEL</span>
                  </div>

                  <div className="bg-[#243312]/80 backdrop-blur-md border border-[#60733d]/70 rounded-full py-1.5 px-3 flex flex-row items-center justify-center gap-1.5 text-center shadow-md">
                    <Globe className="w-3.5 h-3.5 text-[#d2e0ab] shrink-0" />
                    <span className="text-[11px] sm:text-xs font-semibold uppercase text-white/95 whitespace-nowrap drop-shadow-sm">ONLINE</span>
                  </div>

                  <div className="bg-[#243312]/80 backdrop-blur-md border border-[#60733d]/70 rounded-full py-1.5 px-3 flex flex-row items-center justify-center gap-1.5 text-center shadow-md">
                    <Home className="w-3.5 h-3.5 text-[#d2e0ab] shrink-0" />
                    <span className="text-[11px] sm:text-xs font-semibold uppercase text-white/95 whitespace-nowrap drop-shadow-sm">ANTEPROJETO</span>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Lado Direito: Projetos Tradicionais (Vinho/Bordeaux Transparente) */}
            <motion.div
              role="button"
              tabIndex={0}
              aria-label="Projetos Tradicionais - Ver detalhes e alinhamento"
              aria-expanded={showRightDetails}
              onClick={toggleRightDetails}
              onKeyDown={handleKeyDownRight}
              className="relative h-full overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[width] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b85265]"
              style={{
                width:
                  hoveredSide === 'right'
                    ? '54%'
                    : hoveredSide === 'left'
                    ? '46%'
                    : '50%',
              }}
              onMouseEnter={() => setHoveredSide('right')}
              onMouseLeave={() => setHoveredSide(null)}
            >
              {/* Background Image Estática com a Imagem Centralizada */}
              <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none w-full h-full transition-transform duration-300 ease-out"
                style={{
                  backgroundImage: `url("${ALINHAMENTO_IMAGES.tradicional}")`,
                }}
              />
              {/* Overlay Vinho Dinâmico */}
              <div 
                className={`absolute inset-0 bg-gradient-to-b transition-all duration-300 ease-out pointer-events-none w-full h-full ${
                  showRightDetails 
                    ? 'from-[#1a070a]/85 via-[#280c12]/75 to-[#1a070a]/92' 
                    : 'from-[#280c12]/30 via-[#280c12]/20 to-[#280c12]/40'
                }`} 
              />

              {/* Conteúdo Lado Direito */}
              <div className="relative z-10 p-7 lg:p-9 flex flex-col justify-between h-full">
                
                {/* Cabeçalho do Card */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#481923]/90 border border-[#8a3344]/80 px-3.5 py-1.5 rounded-full shadow-sm drop-shadow-sm">
                      PROJETOS TRADICIONAIS
                    </span>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">
                    Podem fazer mais sentido para você se...
                  </h3>
                </div>

                {/* Tópicos Projetos Tradicionais */}
                <div className="space-y-4 my-auto py-2">
                  {TRADICIONAL_TOPICS.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3.5 group/item">
                      <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#481923]/90 border border-[#b85265] shrink-0 mt-0.5 shadow-sm">
                        <span 
                          className="absolute inline-flex h-full w-full rounded-full bg-[#f2b3c0] opacity-40 animate-ping"
                          style={{ animationDuration: '3s' }}
                        ></span>
                        <Check className="relative w-3.5 h-3.5 text-[#f2b3c0]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-base lg:text-[17px] font-bold text-white tracking-wide group-hover/item:text-[#f2b3c0] transition-colors drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">
                          {item.title}
                        </h4>

                        <AnimatePresence>
                          {showRightDetails && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: 'easeOut' }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm lg:text-[15.5px] text-neutral-100/95 leading-relaxed font-normal mt-1.5 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">
                                {item.desc}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Rodapé: Mini Cards Horizontalmente Minimalistas e Fixos */}
                <div className="pt-3.5 border-t border-white/15 grid grid-cols-3 gap-2 shrink-0 mt-auto">
                  <div className="bg-[#3d141e]/80 backdrop-blur-md border border-[#853244]/70 rounded-full py-1.5 px-3 flex flex-row items-center justify-center gap-1.5 text-center shadow-md">
                    <span className="text-xs font-extrabold text-[#f2b3c0] shrink-0">
                      $$$$
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold uppercase text-white/95 whitespace-nowrap drop-shadow-sm">MAIS ELEVADO</span>
                  </div>

                  <div className="bg-[#3d141e]/80 backdrop-blur-md border border-[#853244]/70 rounded-full py-1.5 px-3 flex flex-row items-center justify-center gap-1.5 text-center shadow-md">
                    <Building2 className="w-3.5 h-3.5 text-[#f2b3c0] shrink-0" />
                    <span className="text-[11px] sm:text-xs font-semibold uppercase text-white/95 whitespace-nowrap drop-shadow-sm">PRESENCIAL</span>
                  </div>

                  <div className="bg-[#3d141e]/80 backdrop-blur-md border border-[#853244]/70 rounded-full py-1.5 px-3 flex flex-row items-center justify-center gap-1.5 text-center shadow-md">
                    <Layers className="w-3.5 h-3.5 text-[#f2b3c0] shrink-0" />
                    <span className="text-[11px] sm:text-xs font-semibold uppercase text-white/95 whitespace-nowrap drop-shadow-sm">EXECUTIVO</span>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>

          {/* Componente Mobile Unificado Ocupando Toda a Largura */}
          <div className="md:hidden relative w-full rounded-3xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl flex flex-col my-4 text-white">
            
            {/* Card Superior Mobile: Alquimia Espacial */}
            <div 
              role="button"
              tabIndex={0}
              aria-label="Alquimia Espacial - Ver detalhes e alinhamento"
              aria-expanded={showLeftDetails}
              onClick={toggleLeftDetails}
              onKeyDown={handleKeyDownLeft}
              className="relative p-5 sm:p-7 min-h-[380px] sm:min-h-[410px] flex flex-col justify-between cursor-pointer select-none overflow-hidden transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8a9d59]"
            >
              <div
                className={`absolute inset-0 bg-cover bg-center pointer-events-none w-full h-full transition-transform duration-300 ease-out ${
                  showLeftDetails ? 'scale-105' : 'scale-100'
                }`}
                style={{ backgroundImage: `url("${ALINHAMENTO_IMAGES.alquimia}")` }}
              />
              <div 
                className={`absolute inset-0 bg-gradient-to-b transition-all duration-300 ease-out pointer-events-none w-full h-full ${
                  showLeftDetails 
                    ? 'from-[#101907]/85 via-[#18220b]/75 to-[#101907]/92' 
                    : 'from-[#18220b]/30 via-[#18220b]/20 to-[#18220b]/40'
                }`} 
              />

              <div className="relative z-10 flex flex-col justify-between flex-1 w-full space-y-4">
                {/* Topo Mobile */}
                <div className="space-y-2 shrink-0 text-left w-full">
                  <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#3b4625]/90 border border-[#6b7c42]/80 px-3 py-1 rounded-full shadow-sm inline-block drop-shadow-sm">
                    ALQUIMIA ESPACIAL
                  </span>

                  <h3 className="text-[17.5px] sm:text-lg font-bold text-white tracking-tight drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)] whitespace-nowrap overflow-hidden text-ellipsis w-full">
                    Pode fazer sentido para você se...
                  </h3>
                </div>

                {/* Tópicos Mobile Espaçados */}
                <div className="space-y-3.5 py-2">
                  {ALQUIMIA_TOPICS.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="relative flex items-center justify-center w-5 h-5 rounded-full bg-[#3b4625]/90 border border-[#8a9d59] shrink-0 mt-0.5">
                        <span 
                          className="absolute inline-flex h-full w-full rounded-full bg-[#d2e0ab] opacity-40 animate-ping"
                          style={{ animationDuration: '3s' }}
                        ></span>
                        <Check className="relative w-3 h-3 text-[#d2e0ab]" />
                      </div>
                      <div className="flex-1">
                        <span className="font-bold text-white text-[15.5px] sm:text-base block drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">{item.title}</span>
                        <AnimatePresence>
                          {showLeftDetails && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: 'easeOut' }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm sm:text-[15px] text-neutral-100/95 leading-relaxed font-normal mt-1.5 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">
                                {item.desc}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Rodapé Mobile Mini Badges Fixos e Minimalistas */}
                <div className="pt-3 border-t border-white/15 grid grid-cols-3 gap-1.5 shrink-0 mt-auto">
                  <div className="bg-[#243312]/80 backdrop-blur-md border border-[#60733d]/70 rounded-full py-1 px-2 flex flex-row items-center justify-center gap-1 text-center shadow-md">
                    <span className="text-[10px] font-extrabold text-[#d2e0ab]">
                      $$
                    </span>
                    <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase text-white/95 whitespace-nowrap drop-shadow-sm">MAIS ACESSÍVEL</span>
                  </div>

                  <div className="bg-[#243312]/80 backdrop-blur-md border border-[#60733d]/70 rounded-full py-1 px-2 flex flex-row items-center justify-center gap-1 text-center shadow-md">
                    <Globe className="w-3 h-3 text-[#d2e0ab] shrink-0" />
                    <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase text-white/95 whitespace-nowrap drop-shadow-sm">ONLINE</span>
                  </div>

                  <div className="bg-[#243312]/80 backdrop-blur-md border border-[#60733d]/70 rounded-full py-1 px-2 flex flex-row items-center justify-center gap-1 text-center shadow-md">
                    <Home className="w-3 h-3 text-[#d2e0ab] shrink-0" />
                    <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase text-white/95 whitespace-nowrap drop-shadow-sm">ANTEPROJETO</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Inferior Mobile: Projetos Tradicionais */}
            <div 
              role="button"
              tabIndex={0}
              aria-label="Projetos Tradicionais - Ver detalhes e alinhamento"
              aria-expanded={showRightDetails}
              onClick={toggleRightDetails}
              onKeyDown={handleKeyDownRight}
              className="relative p-5 sm:p-7 min-h-[380px] sm:min-h-[410px] flex flex-col justify-between cursor-pointer select-none overflow-hidden border-t border-neutral-800 transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b85265]"
            >
              <div
                className={`absolute inset-0 bg-cover bg-center pointer-events-none w-full h-full transition-transform duration-300 ease-out ${
                  showRightDetails ? 'scale-105' : 'scale-100'
                }`}
                style={{ backgroundImage: `url("${ALINHAMENTO_IMAGES.tradicional}")` }}
              />
              <div 
                className={`absolute inset-0 bg-gradient-to-b transition-all duration-300 ease-out pointer-events-none w-full h-full ${
                  showRightDetails 
                    ? 'from-[#1a070a]/85 via-[#280c12]/75 to-[#1a070a]/92' 
                    : 'from-[#280c12]/30 via-[#280c12]/20 to-[#280c12]/40'
                }`} 
              />

              <div className="relative z-10 flex flex-col justify-between flex-1 w-full space-y-4 pt-1">
                {/* Topo Mobile */}
                <div className="space-y-2 shrink-0 text-left w-full">
                  <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#481923]/90 border border-[#8a3344]/80 px-3 py-1 rounded-full shadow-sm inline-block drop-shadow-sm">
                    PROJETOS TRADICIONAIS
                  </span>

                  <h3 className="text-[17.5px] sm:text-lg font-bold text-white tracking-tight drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)] whitespace-nowrap overflow-hidden text-ellipsis w-full">
                    Podem fazer mais sentido para você se...
                  </h3>
                </div>

                {/* Tópicos Mobile Espaçados */}
                <div className="space-y-3.5 py-2">
                  {TRADICIONAL_TOPICS.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="relative flex items-center justify-center w-5 h-5 rounded-full bg-[#481923]/90 border border-[#b85265] shrink-0 mt-0.5">
                        <span 
                          className="absolute inline-flex h-full w-full rounded-full bg-[#f2b3c0] opacity-40 animate-ping"
                          style={{ animationDuration: '3s' }}
                        ></span>
                        <Check className="relative w-3 h-3 text-[#f2b3c0]" />
                      </div>
                      <div className="flex-1">
                        <span className="font-bold text-white text-[15.5px] sm:text-base block drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">{item.title}</span>
                        <AnimatePresence>
                          {showRightDetails && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: 'easeOut' }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm sm:text-[15px] text-neutral-100/95 leading-relaxed font-normal mt-1.5 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.85)]">
                                {item.desc}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Rodapé Mobile Mini Badges Fixos e Minimalistas */}
                <div className="pt-3 border-t border-white/15 grid grid-cols-3 gap-1.5 shrink-0 mt-auto pb-1">
                  <div className="bg-[#3d141e]/80 backdrop-blur-md border border-[#853244]/70 rounded-full py-1 px-2 flex flex-row items-center justify-center gap-1 text-center shadow-md">
                    <span className="text-[10px] font-extrabold text-[#f2b3c0]">
                      $$$$
                    </span>
                    <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase text-white/95 whitespace-nowrap drop-shadow-sm">MAIS ELEVADO</span>
                  </div>

                  <div className="bg-[#3d141e]/80 backdrop-blur-md border border-[#853244]/70 rounded-full py-1 px-2 flex flex-row items-center justify-center gap-1 text-center shadow-md">
                    <Building2 className="w-3 h-3 text-[#f2b3c0] shrink-0" />
                    <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase text-white/95 whitespace-nowrap drop-shadow-sm">PRESENCIAL</span>
                  </div>

                  <div className="bg-[#3d141e]/80 backdrop-blur-md border border-[#853244]/70 rounded-full py-1 px-2 flex flex-row items-center justify-center gap-1 text-center shadow-md">
                    <Layers className="w-3 h-3 text-[#f2b3c0] shrink-0" />
                    <span className="text-[9.5px] sm:text-[10px] font-semibold uppercase text-white/95 whitespace-nowrap drop-shadow-sm">EXECUTIVO</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sub-headline abaixo das galerias como complemento */}
          <div className="text-center mt-4 md:mt-5 max-w-3xl mx-auto px-2 sm:px-4 pb-2">
            <p className={`text-[14.5px] sm:text-[15px] md:text-base font-normal leading-snug sm:leading-relaxed text-center mx-auto w-full max-w-none sm:max-w-2xl md:max-w-3xl px-1 sm:px-0 [text-wrap:pretty] ${
              isDark ? 'text-neutral-400' : 'text-slate-600'
            }`}>
              <span className="sm:hidden block w-full mx-auto text-center text-[14.5px] leading-snug">
                Esta metodologia foi criada para um perfil específico<br />
                de cliente. Se sua expectativa for diferente, o projeto<br />
                tradicional provavelmente será a escolha mais adequada.
              </span>
              <span className="hidden sm:inline">
                Esta metodologia foi criada para um perfil específico de cliente. Se sua expectativa for diferente, o projeto arquitetônico tradicional provavelmente será a escolha mais adequada.
              </span>
            </p>
          </div>

        </section>

      </div>
    </div>
  );
}
