import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ChevronDown, FileSearch, ShoppingBag, CreditCard, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StepData {
  number: string;
  title: string;
  description: string;
  isInteractive?: boolean;
  linkUrl?: string;
  badgeText?: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Static Cloudinary Video & Poster URLs
const MP4_URL = "https://res.cloudinary.com/j4moon9r/video/upload/CP5_-_Montagem_c9vgoc.mp4";
const POSTER_URL = "https://res.cloudinary.com/j4moon9r/video/upload/so_0/CP5_-_Montagem_c9vgoc.jpg";

// Static Data Objects
const FEATURE_CARDS = [
  'Valor sob demanda',
  'Oferta sob medida',
  'Compra segura',
] as const;

const STEPS: StepData[] = [
  {
    number: '01',
    title: 'Diagnóstico',
    description: 'Conte sobre o seu espaço, suas necessidades e os objetivos que deseja alcançar. Essas informações são o ponto de partida para compreendermos o seu projeto.',
    isInteractive: true,
    linkUrl: 'https://alquimiaespacial.notion.site/36c302780bb881e29a53cd4ee6435a7e',
    badgeText: 'Formulário',
    icon: FileSearch,
  },
  {
    number: '02',
    title: 'Proposta',
    description: 'Analisamos cuidadosamente seu diagnóstico e elaboramos uma proposta exclusiva, apresentada em vídeo, detalhando o escopo, investimento e forma de pagamento.',
    isInteractive: false,
    icon: ShoppingBag,
  },
  {
    number: '03',
    title: 'Compra',
    description: 'Após aprovação da proposta apresentada, basta confirmar a sua compra para garantir a sua vaga e dar início oficialmente às etapas do nosso processo.',
    isInteractive: false,
    icon: CreditCard,
  },
  {
    number: '04',
    title: 'Agendamento',
    description: 'Você marca sua pré-sessão de levantamento e briefing no dia e horário de sua preferência. Após essa reunião, prepararemos o material para iniciar a primeira etapa do projeto.',
    isInteractive: false,
    icon: Calendar,
  },
];

export default function SaaSFeatureSection() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeStepDesktop, setActiveStepDesktop] = useState<number | null>(null);
  const [activeStepMobile, setActiveStepMobile] = useState<number | null>(null);
  const [isMobileCardsOpen, setIsMobileCardsOpen] = useState(false);

  // Lazy loading video after page load
  useEffect(() => {
    const injectVideo = () => {
      setVideoSrc(MP4_URL);
    };

    if (document.readyState === 'complete') {
      injectVideo();
    } else {
      window.addEventListener('load', injectVideo, { once: true });
      return () => window.removeEventListener('load', injectVideo);
    }
  }, []);

  const handleCanPlayThrough = () => {
    setIsVideoReady(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.65;
      videoRef.current.play().catch(() => {
        // Autoplay muted fallback
      });
    }
  };

  useEffect(() => {
    if (videoRef.current && isVideoReady) {
      videoRef.current.playbackRate = 0.65;
    }
  }, [isVideoReady]);

  return (
    <section aria-label="Etapas do Processo" className="w-full pt-20 sm:pt-24 lg:pt-24 pb-8 sm:pb-12 lg:pb-14 px-6 sm:px-10 lg:px-12 xl:px-16 flex flex-col justify-center font-['DM_Sans'] select-none relative overflow-hidden bg-black text-white">
      
      {/* 1. BACKGROUND VIDEO & POSTER OVERLAY - BOUNDED TO COMPACT BANNER HEIGHT */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Poster / Static Image Fallback */}
        <img
          src={POSTER_URL}
          alt=""
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Video Element */}
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={POSTER_URL}
            onCanPlayThrough={handleCanPlayThrough}
            onLoadedData={handleCanPlayThrough}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              isVideoReady ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Translucent Dark Yellow / Amber Overlay for rich video tint with high video visibility & text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#382402]/65 via-[#482f04]/55 to-[#2b1b02]/65 backdrop-blur-[0px]" />
      </div>

      {/* 2. MAIN CONTAINER */}
      <div className="w-full max-w-[1440px] mx-auto relative z-10 my-auto">
        
        {/* ========================================================= */}
        {/* DESKTOP LAYOUT (lg:grid): 12-Column Grid with Vertical Dividers */}
        {/* ========================================================= */}
        <div 
          onMouseLeave={() => setActiveStepDesktop(null)}
          className="hidden lg:grid lg:grid-cols-12 gap-0 divide-x divide-zinc-700/50 border-y border-zinc-700/50 py-6 items-stretch h-[360px] max-h-[360px] overflow-hidden"
        >
          
          {/* COLUMN 1: HEADLINE & SUBHEADLINE (4 of 12 columns for generous headline width) */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="col-span-4 flex flex-col justify-between pr-6 xl:pr-10 h-full"
          >
            <div className="flex flex-col justify-between h-full py-1">
              {/* Main Headline - Cargiona Regular base with Playfair Display Italic highlights */}
              <h2 className="text-[36px] xl:text-[38px] min-[1440px]:text-[40px] font-normal font-cargiona tracking-tight text-white leading-[1.10] mt-0 mb-4 xl:mb-5 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
                <span className="block whitespace-nowrap">Suas <span className="font-serif italic font-normal text-white">melhores ideias</span></span>
                <span className="block -mt-2 whitespace-nowrap">merecem um <span className="font-serif italic font-normal text-white">projeto à altura</span>.</span>
              </h2>

              {/* Subheadline Paragraph - Justified on Desktop */}
              <p className="text-sm sm:text-base text-white font-normal leading-relaxed my-auto [text-shadow:0_1px_3px_rgba(0,0,0,0.9)] text-justify [text-justify:inter-word]">
                Antes de definir qualquer investimento, precisamos entender o seu contexto. Como cada projeto possui objetivos, desafios e níveis de complexidade diferentes, toda proposta é construída a partir dessa análise.
              </p>

              {/* 3 Horizontal Translucent Yellow Pill Cards (Fits without clipping) */}
              <div className="flex items-center justify-between gap-1 xl:gap-1.5 mt-auto pt-2 w-full">
                {FEATURE_CARDS.map((label, i) => (
                  <div 
                    key={i}
                    className="flex-1 flex items-center justify-center px-1 xl:px-1.5 py-1.5 bg-[#E5A91B]/30 border border-[#E5A91B]/60 rounded-full backdrop-blur-xs shadow-md min-w-0"
                  >
                    <span className="text-[9.5px] min-[1400px]:text-[10.5px] font-extrabold text-white tracking-tight uppercase whitespace-nowrap text-center [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* COLUMNS 2 TO 5: THE 4 PROCESS STEPS (2 of 12 columns each) */}
          {STEPS.map((step, idx) => {
            const IconComponent = step.icon;
            const isActive = activeStepDesktop === idx;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.08 * (idx + 1), ease: 'easeOut' }}
                onMouseEnter={() => setActiveStepDesktop(idx)}
                onClick={() => setActiveStepDesktop(idx === activeStepDesktop ? null : idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveStepDesktop(idx === activeStepDesktop ? null : idx);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                aria-label={`Etapa ${step.number}: ${step.title}`}
                className={`col-span-2 flex flex-col justify-between px-4 xl:px-5 group relative h-full cursor-pointer transition-colors duration-200 rounded-xl focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E5A91B] ${
                  isActive ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'
                }`}
              >
                <div className="h-full flex flex-col justify-between pt-0 pb-2">
                  <div>
                    {/* Header: Step Number - White when unselected */}
                    <div className="flex items-baseline justify-between mb-1">
                      <span
                        className={`text-4xl sm:text-5xl font-bold font-sans tracking-tight leading-none transition-colors duration-200 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)] ${
                          isActive ? 'text-[#E5A91B]' : 'text-white group-hover:text-[#E5A91B]'
                        }`}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Vertical Dark Mustard Line Connector */}
                    <div className="w-[1.5px] h-4 bg-gradient-to-b from-[#E5A91B] to-[#E5A91B]/20 my-2" />

                    {/* Step Title & Icon beside name when active */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
                        {step.title}
                      </h3>

                      {/* Icon transitions beside the title on hover - Yellow icon */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                          className="relative shrink-0 flex items-center justify-center p-1"
                        >
                          {step.isInteractive && (
                            <div className="absolute inset-0 m-auto w-7 h-7 bg-[#E5A91B]/60 rounded-full blur-xs animate-pulse pointer-events-none z-0" />
                          )}
                          <IconComponent className="w-7 h-7 xl:w-8 xl:h-8 text-[#E5A91B] relative z-10 drop-shadow" />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Body Content area */}
                  <div className="flex-1 flex flex-col justify-center h-[170px] max-h-[170px] relative overflow-visible">
                    <AnimatePresence mode="wait" initial={false}>
                      {isActive ? (
                        <motion.div
                          key="text-content"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.18 }}
                          className="flex flex-col justify-between h-full py-1"
                        >
                          <p className="text-xs sm:text-sm text-white leading-relaxed font-normal [text-shadow:0_1px_3px_rgba(0,0,0,0.9)] text-justify [text-justify:inter-word]">
                            {step.description}
                          </p>

                          {/* Interactive Action Button for Step 01 */}
                          {step.isInteractive && step.linkUrl && (
                            <div className="relative inline-block mt-2.5">
                              {/* Subtle glowing pulse behind the button */}
                              <div className="absolute -inset-1 bg-[#E5A91B]/50 rounded-lg blur-md animate-pulse pointer-events-none" />
                              <a
                                href={step.linkUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                aria-label={`${step.badgeText || 'Formulário'} (abre em nova aba)`}
                                className="relative z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#E5A91B] text-white text-xs font-bold hover:bg-[#f0b424] transition-all duration-200 shadow-md active:scale-95 group/btn focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                              >
                                <span>{step.badgeText || 'Formulário'}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] text-white transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden="true" />
                              </a>
                            </div>
                          )}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="icon-content"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.18 }}
                          className="flex items-center justify-start my-auto py-2 overflow-visible"
                        >
                          {/* Left-Aligned White Icon with Expanded Glowing Yellow Aura */}
                          <div className="relative flex items-center justify-start p-2 overflow-visible">
                            {step.isInteractive && (
                              <div className="absolute inset-0 m-auto w-20 h-20 xl:w-24 xl:h-24 bg-[#E5A91B]/55 rounded-full blur-xl animate-pulse pointer-events-none z-0 scale-125" />
                            )}
                            <IconComponent className="w-16 h-16 xl:w-20 xl:h-20 text-white stroke-[1.25] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] relative z-10 transition-transform duration-200 group-hover:scale-105" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* MOBILE LAYOUT (< lg): Compact Banner with Toggle Arrow */}
        {/* ========================================================= */}
        <div className="block lg:hidden py-4 flex flex-col justify-between border-y border-zinc-700/50">
          
          {/* Header - Centered on Mobile with Smooth Fade/Slide Entrance */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-center flex flex-col items-center pt-1 w-full"
          >
            {/* Headline - Cargiona Regular base with Playfair Display Italic highlights */}
            <h2 className="text-[26px] sm:text-[28px] font-normal font-cargiona tracking-tight text-white leading-[1.08] mb-3 sm:mb-3.5 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)] text-center w-full max-w-[440px] sm:max-w-xl mx-auto px-0">
              Suas <span className="font-serif italic font-normal text-white">melhores ideias</span>
              <span className="block -mt-1">merecem um <span className="font-serif italic font-normal text-white">projeto à altura</span>.</span>
            </h2>
            
            {/* Subheadline - Scaled up slightly & wider edge coverage */}
            <p className="text-[15px] sm:text-base text-white font-normal leading-relaxed mb-4 sm:mb-5 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)] text-center w-full px-0">
              Antes de definir qualquer investimento, precisamos entender o seu contexto. Como cada projeto possui objetivos, desafios e níveis de complexidade diferentes, toda proposta é construída a partir dessa análise.
            </p>
            
            {/* Bouncing Chevron Toggle Arrow - Directly Below Subheadline */}
            <button
              type="button"
              onClick={() => setIsMobileCardsOpen(!isMobileCardsOpen)}
              aria-expanded={isMobileCardsOpen}
              aria-label={isMobileCardsOpen ? 'Ocultar etapas' : 'Ver etapas'}
              className="mt-1 mb-2 p-1.5 text-white hover:text-zinc-200 transition-colors cursor-pointer active:scale-95 focus:outline-none"
            >
              <motion.div
                animate={{ rotate: isMobileCardsOpen ? 180 : 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={!isMobileCardsOpen ? 'animate-bounce' : ''}
              >
                <ChevronDown className="w-9 h-9 sm:w-10 sm:h-10 text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]" />
              </motion.div>
            </button>
          </motion.div>

          {/* EXPANDABLE VERTICAL CARDS (Hidden by default, reveals smoothly on chevron click) */}
          <AnimatePresence initial={false}>
            {isMobileCardsOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="flex flex-col divide-y divide-zinc-700/50 pt-2 border-t border-zinc-700/40 my-3.5">
                  {STEPS.map((step, idx) => {
                    const isOpen = activeStepMobile === idx;
                    const IconComponent = step.icon;

                    return (
                      <div key={step.number} className="py-4">
                        
                        {/* Step Accordion Trigger / Header */}
                        <button
                          type="button"
                          onClick={() => setActiveStepMobile(isOpen ? null : idx)}
                          aria-expanded={isOpen}
                          className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer group py-1"
                        >
                          <div className="flex items-center gap-4">
                            {/* Step Number - White when unselected, Yellow when active */}
                            <span
                              className={`font-sans text-3xl sm:text-4xl font-bold transition-colors duration-200 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)] ${
                                isOpen
                                  ? 'text-[#E5A91B]'
                                  : 'text-white'
                              }`}
                            >
                              {step.number}
                            </span>

                            {/* Step Title - Always White */}
                            <span
                              className="text-lg sm:text-xl font-bold tracking-tight text-white transition-colors duration-200 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]"
                            >
                              {step.title}
                            </span>
                          </div>

                          {/* Right side: Step Icon + Chevron Arrow */}
                          <div className="flex items-center gap-3.5">
                            <div className="relative flex items-center justify-center overflow-visible p-1">
                              {step.isInteractive && (
                                <div className="absolute -inset-1 bg-[#E5A91B]/60 rounded-full blur-lg animate-pulse pointer-events-none scale-150" />
                              )}
                              <IconComponent
                                className={`w-8 h-8 sm:w-9 sm:h-9 transition-colors duration-200 drop-shadow relative z-10 ${
                                  isOpen ? 'text-[#E5A91B]' : 'text-white'
                                }`}
                              />
                            </div>

                            <ChevronDown
                              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 drop-shadow ${
                                isOpen ? 'text-[#E5A91B] rotate-180' : 'text-white rotate-0'
                              }`}
                            />
                          </div>
                        </button>

                        {/* Expanded Content for Active Step */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden pl-1 pr-2 pt-1 pb-1"
                            >
                              {/* Thin Vertical Accent Line */}
                              <div className="w-[1.5px] h-4 bg-gradient-to-b from-[#E5A91B] to-[#E5A91B]/20 my-2.5" />

                              {/* Description */}
                              <p className="text-sm sm:text-base text-white leading-relaxed font-normal mb-3.5 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)] text-justify [text-justify:inter-word]">
                                {step.description}
                              </p>

                              {/* Interactive Action Button for Step 01 */}
                              {step.isInteractive && step.linkUrl && (
                                <div className="relative inline-block mt-3 mb-1">
                                  {/* Subtle glowing pulse behind the button */}
                                  <div className="absolute -inset-1 bg-[#E5A91B]/50 rounded-lg blur-md animate-pulse pointer-events-none" />
                                  <a
                                    href={step.linkUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${step.badgeText || 'Formulário'} (abre em nova aba)`}
                                    className="relative z-10 inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#E5A91B] text-white text-xs sm:text-sm font-bold hover:bg-[#f0b424] transition-all duration-200 shadow-md active:scale-95 group/btn focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                                  >
                                    <span>{step.badgeText || 'Formulário'}</span>
                                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] text-white" aria-hidden="true" />
                                  </a>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3 Horizontal Translucent Yellow Pill Cards - Below Arrow (or Footer when section expanded) */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between gap-1 sm:gap-2 w-full px-0.5 mt-3 sm:mt-4"
          >
            {FEATURE_CARDS.map((label, i) => (
              <div 
                key={i}
                className="flex-1 flex items-center justify-center px-1 sm:px-2 py-1.5 sm:py-2 bg-[#E5A91B]/30 border border-[#E5A91B]/60 rounded-full backdrop-blur-xs shadow-md min-w-0"
              >
                <span className="text-[8.5px] min-[360px]:text-[9.5px] min-[400px]:text-[10.5px] sm:text-xs font-extrabold text-white tracking-tight uppercase whitespace-nowrap text-center [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

        </div>

      </div>

    </section>
  );
}
