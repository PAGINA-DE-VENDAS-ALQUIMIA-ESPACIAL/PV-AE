/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, MouseEvent } from 'react';
import { ArrowRight, Menu, X, Star, ChevronDown, Sparkles, Compass, ShieldCheck, Play, User } from 'lucide-react';
import logoHorizontalBranca from '../../assets/images/Logomarca Horizontal - Secundária - Branca.svg';
import logoHorizontalColorida from '../../assets/images/Logomarca Horizontal - Secundária.svg';
import logoVerticalBranca from '../../assets/images/Logomarca Vertical - Principal - Branca.svg';
import logoVerticalColorida from '../../assets/images/Logomarca Vertical - Principal.svg';
import cardStudioLeft from '../../assets/images/Arquitetura Maquete e Plantas.jpeg';
import cardStudioRight from '../../assets/images/Arquitetura Maquete e Plantas 2.jpeg';
import { lazy, Suspense } from 'react';
import { OrbitingCocreateCards } from './OrbitingCocreateCards';
import { BackgroundFrames } from './BackgroundFrames';

const ProposalFormModal = lazy(() => import('./ProposalFormModal').then(m => ({ default: m.ProposalFormModal })));
const ClientPortalModal = lazy(() => import('./ClientPortalModal').then(m => ({ default: m.ClientPortalModal })));

const NOTION_FORM_URL = "https://alquimiaespacial.notion.site/36c302780bb881e29a53cd4ee6435a7e";

const menuCategories: {
  title: string;
  href: string;
  subItems?: { label: string; href: string }[];
}[] = [
  {
    title: 'Sobre',
    href: '#why-cocreate-section',
    subItems: [
      { label: 'Co-criação', href: '#why-cocreate-section' },
      { label: 'Apresentação do Programa', href: '#video-section' },
    ],
  },
  {
    title: 'Processos',
    href: '#processes',
  },
  {
    title: 'Clientes',
    href: '#projects',
    subItems: [
      { label: 'Projetos Realizados', href: '#projects' },
      { label: 'Depoimentos', href: '#testimonials' },
    ],
  },
  {
    title: 'Soluções',
    href: '#deliverables',
    subItems: [
      { label: 'Entregáveis do Projeto', href: '#deliverables' },
      { label: 'Alinhamento Estratégico', href: '#secao-alinhamento' },
    ],
  },
  {
    title: 'Passos',
    href: '#plans',
  },
  {
    title: 'Perguntas',
    href: '#faq',
  },
  {
    title: 'Contato',
    href: '#contact',
    subItems: [
      { label: 'Sobre o Arquiteto', href: '#secao-sobre-o-arquiteto' },
      { label: 'Iniciar Projeto', href: '#contact' },
    ],
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isHeaderLogoColored, setIsHeaderLogoColored] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [isClientPortalModalOpen, setIsClientPortalModalOpen] = useState(false);
  const headerLogoTimerRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMobileSubmenu = (key: string) => {
    setExpandedMobileMenu(prev => prev === key ? null : key);
  };

  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const elementRect = targetEl.getBoundingClientRect();
        const elementTop = elementRect.top + window.pageYOffset;
        window.scrollTo({
          top: Math.max(0, elementTop),
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    }
  };

  // Preload Section 3 images on mount for instant fluid transition
  useEffect(() => {
    const imagesToPreload = [
      cardStudioLeft,
      cardStudioRight,
      "https://img.youtube.com/vi/j0MB8RpxgPo/maxresdefault.jpg"
    ];
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);


  const [activeHighlights, setActiveHighlights] = useState<{ [key: string]: boolean }>({});
  const highlightTimersRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const triggerHighlight = (id: string, durationMs = 3000) => {
    if (highlightTimersRef.current[id]) {
      clearTimeout(highlightTimersRef.current[id]);
    }
    setActiveHighlights(prev => ({ ...prev, [id]: true }));
    highlightTimersRef.current[id] = setTimeout(() => {
      setActiveHighlights(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      delete highlightTimersRef.current[id];
    }, durationMs);
  };

  const handleHeaderLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);

    setIsHeaderLogoColored(true);
    if (headerLogoTimerRef.current) {
      clearTimeout(headerLogoTimerRef.current);
    }
    headerLogoTimerRef.current = setTimeout(() => {
      setIsHeaderLogoColored(false);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (headerLogoTimerRef.current) {
        clearTimeout(headerLogoTimerRef.current);
      }
      Object.values(highlightTimersRef.current).forEach(clearTimeout);
    };
  }, []);

  // Keyboard accessibility for inline video playback
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVideoPlaying) {
        setIsVideoPlaying(false);
      }
    };
    if (isVideoPlaying) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isVideoPlaying]);

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col selection:bg-white selection:text-black relative">
      {/* Dynamic Fluid Background Frame Animation (Mobile 9:16 & Desktop 16:9) */}
      <BackgroundFrames />

      {/* Navigation Header (Fixed Top so it stays visible across all sections on mobile & desktop) */}
      <header className="fixed top-0 inset-x-0 z-50 w-full px-3 sm:px-6 md:px-8 py-2.5 sm:py-3.5 transition-all duration-300 pointer-events-none">
        <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 flex flex-col justify-center bg-white/15 backdrop-blur-md rounded-2xl shadow-lg pointer-events-auto transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-[85vh] overflow-y-auto' : ''
        }`}>
          {/* Header Bar Row */}
          <div className="flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center gap-4 w-full">
            {/* Logo Link to Home/Hero (Horizontal Logo) */}
            <a 
              href="#hero-section" 
              onClick={handleHeaderLogoClick}
              className="group relative inline-flex items-center h-[46px] cursor-pointer focus:outline-none shrink-0 lg:justify-self-start"
              aria-label="Ir para o início"
            >
              {/* Colored Horizontal Logo (Default state) */}
              <img 
                src={logoHorizontalColorida} 
                alt="Logo Colorida Alquimia Espacial" 
                loading="eager"
                decoding="async"
                className={`h-[50px] w-auto max-w-[220px] sm:max-w-[280px] md:max-w-[320px] object-contain transition-opacity duration-300 ${
                  isHeaderLogoColored ? 'opacity-0' : 'opacity-100 group-hover:opacity-0 group-active:opacity-0'
                }`}
              />

              {/* White Horizontal Logo (Hover on desktop & Click/Touch on mobile) */}
              <img 
                src={logoHorizontalBranca} 
                alt="Logo Alquimia Espacial" 
                loading="eager"
                decoding="async"
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-[50px] w-auto max-w-[220px] sm:max-w-[280px] md:max-w-[320px] object-contain transition-opacity duration-300 ${
                  isHeaderLogoColored ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-active:opacity-100'
                }`}
              />
            </a>

            {/* Desktop Navigation Links (Centered in header on desktop lg+) */}
            <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 text-sm xl:text-[15px] font-semibold text-white whitespace-nowrap lg:justify-self-center">
              {menuCategories.map((cat) => {
                const hasSubItems = Boolean(cat.subItems && cat.subItems.length > 0);
                return (
                  <div key={cat.title} className="relative group py-1">
                    <a 
                      href={cat.href} 
                      onClick={(e) => handleAnchorClick(e, cat.href)}
                      className="hover:text-amber-300 transition-colors flex items-center cursor-pointer font-semibold text-white text-sm xl:text-[15px] tracking-wide drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.95)]"
                    >
                      <span>{cat.title}</span>
                    </a>
                    {hasSubItems && (
                      <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-30 min-w-[200px]">
                        <div className="flex flex-col gap-1.5 py-2 text-xs text-white">
                          {cat.subItems!.map((sub) => (
                            <a
                              key={sub.label}
                              href={sub.href}
                              onClick={(e) => handleAnchorClick(e, sub.href)}
                              className="px-1 py-1 text-white hover:text-amber-300 transition-colors flex items-center font-semibold group/sub cursor-pointer whitespace-nowrap text-left border-l-2 border-transparent hover:border-amber-300 pl-2"
                            >
                              <span className="drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.95)]">{sub.label}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Header Right Actions: Desktop Login Icon + Mobile Menu Toggle */}
            <div className="flex items-center gap-3 lg:justify-self-end">
              {/* Desktop Login / Espaço Co-criação Icon (Strong icon with drop shadow, no box/rectangle) */}
              <a 
                href="#"
                onClick={(e) => e.preventDefault()}
                className="hidden lg:flex items-center justify-center p-1.5 transition-transform hover:scale-110 duration-200 cursor-pointer"
                title="Espaço Co-criação"
                aria-label="Espaço Co-criação"
              >
                <User className="w-6 h-6 text-white hover:text-amber-300 transition-colors stroke-[2.2] drop-shadow-[0_1.5px_3.5px_rgba(0,0,0,0.95)]" />
              </a>

              {/* Mobile/Tablet Menu Toggle Button (Transparent background) */}
              <button 
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 rounded-full bg-transparent hover:bg-white/10 transition-all cursor-pointer"
                aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-white drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.9)]" />
                ) : (
                  <Menu className="w-6 h-6 text-white drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.9)]" />
                )}
              </button>
            </div>
          </div>

          {/* Expanded Mobile/Tablet Menu Items (Growing inside the rectangle container) */}
          {mobileMenuOpen && (
            <div className="lg:hidden w-full pt-3 mt-3 border-t border-white/25 flex flex-col gap-3 transition-all duration-300">
              <div className="flex flex-col gap-1.5 w-full">
                {menuCategories.map((cat) => {
                  const hasSubItems = Boolean(cat.subItems && cat.subItems.length > 0);
                  const isExpanded = hasSubItems && expandedMobileMenu === cat.title;

                  if (!hasSubItems) {
                    return (
                      <div key={cat.title} className="py-0.5">
                        <a 
                          href={cat.href} 
                          onClick={(e) => handleAnchorClick(e, cat.href)}
                          className="text-base sm:text-lg font-bold text-white drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.95)] hover:text-amber-300 transition-colors flex items-center justify-between py-1.5 border-b border-white/15"
                        >
                          <span>{cat.title}</span>
                        </a>
                      </div>
                    );
                  }

                  return (
                    <div key={cat.title} className="py-0.5 border-b border-white/15">
                      <div 
                        className="flex items-center justify-between cursor-pointer py-1.5 group"
                        onClick={() => toggleMobileSubmenu(cat.title)}
                      >
                        <a 
                          href={cat.href} 
                          onClick={(e) => handleAnchorClick(e, cat.href)}
                          className="text-base sm:text-lg font-bold text-white drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.95)] hover:text-amber-300 transition-colors"
                        >
                          {cat.title}
                        </a>
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMobileSubmenu(cat.title);
                          }}
                          className="p-1 text-white hover:text-amber-300 transition-colors focus:outline-none"
                          aria-label={`Expandir sub-menu ${cat.title}`}
                        >
                          <ChevronDown className={`w-5 h-5 transition-transform duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${isExpanded ? 'rotate-180 text-amber-300' : ''}`} />
                        </button>
                      </div>

                      {/* Sub-items accordion */}
                      {isExpanded && (
                        <div className="pl-3.5 pr-2 pb-2 pt-1.5 flex flex-col gap-2 text-sm border-l-2 border-amber-300 my-1">
                          {cat.subItems!.map((sub) => (
                            <a
                              key={sub.label}
                              href={sub.href}
                              onClick={(e) => handleAnchorClick(e, sub.href)}
                              className="py-1 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] hover:text-amber-200 transition-colors flex items-center font-medium"
                            >
                              <span>{sub.label}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Mobile Action & Status including Espaço Co-criação */}
              <div className="pt-2 pb-1 border-t border-white/15 flex flex-col gap-2.5 w-full">
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2.5 py-2 px-1 text-base sm:text-lg font-bold text-white drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.95)] hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <User className="w-5 h-5 text-white stroke-[2.2] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                  <span>Espaço Co-criação</span>
                </a>
                <a 
                  href={NOTION_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/90 hover:bg-white text-black font-semibold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] cursor-pointer"
                >
                  <span>Iniciar Projeto</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Seção 1: Hero */}
      <section 
        id="hero-section" 
        className="w-full min-h-screen bg-transparent flex flex-col justify-between relative overflow-hidden text-white pt-22 sm:pt-24 md:pt-32 pb-2 sm:pb-16 z-10 scroll-snap-section"
      >

        {/* Unified Hero Content Container */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-3 sm:pt-6 md:pt-12 pb-1 sm:pb-8 flex-1 flex flex-col justify-between z-10">
          {/* Top Eyebrow & Centered Headline Header (Div 1) - Positioned cleanly on mobile */}
          <div className="flex flex-col items-center justify-center text-center w-full mt-1 sm:mt-0 lg:-mt-[40px] mb-[28vh] xs:mb-[32vh] sm:mb-[38vh] md:mb-[50vh] lg:mb-[55vh]">
            {/* Eyebrow / Tag on top, centered with dark olive pulsing dot - Sleek compact translucent green badge */}
            <span className="inline-flex items-center justify-center gap-1.5 sm:gap-2 mx-auto mt-0 mb-4 sm:mb-8 lg:mb-10 h-[25px] xs:h-[26px] sm:h-[28px] px-3.5 sm:px-4 rounded-full bg-[#726910]/40 backdrop-blur-md transition-transform hover:scale-[1.02]">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#726910] animate-pulse shrink-0 shadow-[0_0_6px_rgba(114,105,16,0.8)]" />
              <span className="tracking-wider text-white font-sans font-normal text-[9.5px] xs:text-[10px] sm:text-[12px] leading-[10px] sm:leading-[14px] uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">DISPONÍVEL PARA NOVOS PROJETOS</span>
            </span>

            {/* Main Title, centered layout with generous mobile width, refined desktop scale, and tighter line spacing */}
            <h1 className="mt-1 sm:mt-3 lg:mt-5 text-[31px] xs:text-[35px] sm:text-[46px] md:text-[58px] lg:text-[76px] xl:text-[85px] 2xl:text-[88px] font-cargiona font-normal tracking-tight leading-[1.02] xs:leading-[1.0] sm:leading-[0.98] lg:leading-[0.96] text-white w-full max-w-full sm:max-w-[1180px] mx-auto text-center flex flex-col items-center justify-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] px-0">
              <span className="block text-center w-full whitespace-nowrap">
                O <span className="font-serif italic font-normal text-white text-[1.15em] px-0.5 sm:px-1.5 inline-block">potencial</span> do seu espaço
              </span>
              <span className="block text-center w-full whitespace-nowrap -mt-0.5 sm:-mt-1 lg:-mt-2">
                <span className="font-serif italic font-normal text-white">é maior</span> do que você <span className="font-serif italic font-normal text-white text-[1.08em] px-0.5 inline-block">imagina.</span>
              </span>
            </h1>
          </div>

          {/* Middle Row: Description + CTA (Left) & Video Shortcut Card (Right / Opposite) (Div 2) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-end my-3 sm:my-6 md:my-10">
            {/* Left Column: Paragraph + Desktop CTA */}
            <div className="lg:col-span-8 flex flex-col items-start justify-between gap-6 sm:gap-14 md:gap-16 lg:h-[216px]">
              <div className="relative w-full sm:max-w-[520px] lg:max-w-[740px]">
                {/* Ultra-subtle organic smoke vignette halo - completely seamless with no hard edges */}
                <div className="absolute -inset-8 sm:-inset-12 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.15)_55%,transparent_85%)] blur-2xl pointer-events-none -z-10" />

                <p className="text-white text-[17.5px] xs:text-[18.5px] sm:text-[21px] lg:text-[26px] leading-[25px] xs:leading-[26px] sm:leading-[28px] lg:leading-[34px] text-justify lg:text-left w-full font-normal not-italic [font-family:Arial,sans-serif] relative z-10 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] [text-wrap:pretty]">
                  Das <span className="font-serif italic font-normal text-[1.12em]">ideias soltas</span> à <span className="font-serif italic font-normal text-[1.12em]">visão clara</span>, existe um caminho que{' '}
                  transforma as <span className="font-serif italic font-normal text-[1.12em]">possibilidades</span> do seu espaço em <span className="font-serif italic font-normal text-[1.12em]">decisões </span>{' '}
                  <span className="font-serif italic font-normal text-[1.12em]">seguras</span> de projeto — <span className="font-serif italic font-normal text-[1.12em]">sessão por sessão, no seu ritmo</span>.
                </p>
              </div>

              {/* Desktop CTA Button (shown on desktop lg+) */}
              <a 
                href={NOTION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHighlight('hero-cta-desktop')}
                className={`hidden lg:inline-flex items-center justify-between gap-4 text-base font-bold transition-all duration-300 rounded-xl lg:rounded-2xl overflow-hidden group border-transparent cursor-pointer active:scale-95 py-2 pl-6 pr-2 shadow-lg ${
                  activeHighlights['hero-cta-desktop']
                    ? 'bg-[#781A1A] text-white'
                    : 'bg-white text-black hover:bg-[#781A1A] hover:text-white'
                }`}
              >
                <span className="font-bold tracking-tight transition-colors duration-300 text-black group-hover:text-white whitespace-nowrap">QUERO TRANSFORMAR MEU ESPAÇO</span>
                <span className="bg-black text-white group-hover:bg-white w-9 h-9 flex items-center justify-center transition-colors rounded-lg lg:rounded-xl shrink-0">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 text-white group-hover:text-[#781A1A]" />
                </span>
              </a>
            </div>

            {/* Right Column (Desktop) & Mobile Side-by-Side Row (CTA Left + Video Shortcut Card Right) */}
            <div className="lg:col-span-4 w-full flex flex-row items-stretch lg:items-end justify-between lg:justify-end gap-2.5 sm:gap-4 mt-[10px] lg:mt-0 lg:h-[216px]">
              {/* Mobile CTA Button (Side-by-side on mobile, with comfortable padding and rounded corners) */}
              <a 
                href={NOTION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHighlight('hero-cta-mobile')}
                className={`lg:hidden flex-1 inline-flex items-center justify-between gap-2 py-2 pl-3.5 pr-1.5 transition-all duration-300 rounded-xl overflow-hidden group border-transparent cursor-pointer active:scale-95 shadow-lg ${
                  activeHighlights['hero-cta-mobile']
                    ? 'bg-[#781A1A] text-white'
                    : 'bg-white text-black hover:bg-[#781A1A] hover:text-white'
                }`}
              >
                <span className="font-bold uppercase tracking-tight text-xs sm:text-sm leading-tight transition-colors duration-300 text-black group-hover:text-white">
                  QUERO TRANSFORMAR
                </span>
                <span className="bg-black text-white group-hover:bg-white w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-colors rounded-lg shrink-0">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 text-white group-hover:text-[#781A1A]" />
                </span>
              </a>

              {/* Video Shortcut Card - Transparent, borderless white-tinted card with enlarged photo view on mobile */}
              <div className="relative flex-1 lg:flex-none h-[52px] min-h-[52px] max-h-[52px] lg:h-[216px] lg:w-[320px] lg:max-h-none shrink-0 group">
                <a 
                  href="#video-section"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('video-section');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  className="w-full h-full rounded-xl lg:rounded-2xl bg-black/20 lg:bg-black/40 backdrop-blur-md p-0 border border-white/20 transition-all duration-300 flex flex-col justify-center cursor-pointer relative overflow-hidden z-10 hover:bg-[#781A1A] active:bg-[#781A1A] hover:scale-[1.03] active:scale-[0.96]"
                >
                  <div className="w-full h-full bg-transparent lg:bg-black/20 px-3 sm:px-3.5 py-1 lg:px-4 lg:py-3.5 flex flex-row lg:flex-col justify-between items-center lg:items-start relative z-10 overflow-hidden">
                    {/* Background Video Cover Image - Full edge-to-edge inside borderless card */}
                    <img 
                      src="https://img.youtube.com/vi/j0MB8RpxgPo/maxresdefault.jpg" 
                      alt="Apresentação do Programa Alquimia Espacial" 
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover object-top lg:object-center opacity-100 group-hover:scale-105 transition-all duration-300 pointer-events-none" 
                    />
                    <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

                    {/* Play Button Shortcut - Centered in card */}
                    <div className="flex items-center justify-center relative z-10 order-2 lg:order-1 lg:my-auto lg:w-full">
                      <Play className="w-5 h-5 lg:w-9 lg:h-9 text-white/90 fill-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] animate-pulse group-hover:scale-110 group-hover:text-white group-hover:fill-white transition-all duration-300" />
                    </div>

                    {/* Label Text */}
                    <div className="flex items-center gap-1.5 order-1 lg:order-2 lg:mb-1.5 text-white relative z-10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                      <span className="font-bold uppercase tracking-tight text-xs sm:text-sm text-white group-hover:text-amber-300 transition-colors">SAIBA MAIS</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0 shadow-[0_0_8px_rgba(245,194,122,0.8)]" />
                    </div>

                    {/* Desktop Progress Bar */}
                    <div className="hidden lg:block w-full space-y-1 relative z-10 lg:order-3">
                      <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden border-transparent">
                        <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-full w-2/3 group-hover:w-full transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Social Proof Star Rating Area (Div 3) */}
          <div className="w-full mt-4 sm:mt-5 pt-2 sm:pt-3 pb-1 mb-1 sm:mb-6 flex flex-col items-center gap-2 sm:gap-3">
            {/* Headline */}
            <p className="text-[12.5px] xs:text-[14px] sm:text-base md:text-lg text-white text-center px-1 py-0.5 whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
              <span className="font-bold text-white">Alquimia Espacial</span> — <span className="text-white font-normal">Programa de Co-criação Arquitetônica Online</span>
            </p>

            {/* Star Rating Badge (Gold accent) linking to Google Maps */}
            <a 
              href="https://google.com/maps?sca_esv=30342252162f46f6&output=search&q=alquimia+espacial+jose+de+alencar&source=lnms&fbs=ABfTbFVGaQeaqnsRPI5sOMG32KszkLt6nAp8aiRKj5vMjqZApKYr2wv-EHakX1SS4JF8fY1_A0DfPLoyd61yD2Gjy0hFwA9uQzfe2qr5XIoplX3KzYU15Dvac31IGqviSOjsAzDYdh6pLM90jPBzy9z3w4sX3qHUvjDnvyqeg9KZkT-pmp8-DP1oBRlOuQI1gmrqem3TToC0IjurFz_YaesP1eJ1FNsn_Q&entry=mc&ved=1t:200715&ictx=111"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/80 bg-white/75 backdrop-blur-md hover:bg-white/90 active:bg-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-neutral-900 transition-all duration-200 group cursor-pointer shadow-md"
            >
              <div className="flex items-center gap-0.5 text-[#F3C04D]">
                <Star className="w-4 h-4 fill-[#F3C04D] text-[#F3C04D] drop-shadow-[0_0_3px_rgba(243,192,77,0.8)]" />
                <Star className="w-4 h-4 fill-[#F3C04D] text-[#F3C04D] drop-shadow-[0_0_3px_rgba(243,192,77,0.8)]" />
                <Star className="w-4 h-4 fill-[#F3C04D] text-[#F3C04D] drop-shadow-[0_0_3px_rgba(243,192,77,0.8)]" />
                <Star className="w-4 h-4 fill-[#F3C04D] text-[#F3C04D] drop-shadow-[0_0_3px_rgba(243,192,77,0.8)]" />
                <Star className="w-4 h-4 fill-[#F3C04D] text-[#F3C04D] drop-shadow-[0_0_3px_rgba(243,192,77,0.8)]" />
              </div>
              <span className="text-neutral-800 group-hover:text-black text-xs font-semibold ml-0.5 transition-colors">no</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" aria-label="Google">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Edge-to-Edge Animated Project Cards Container (Full Screen Width) */}
        <div className="w-full overflow-hidden no-scrollbar mt-10 sm:mt-16 md:mt-24 pt-4 sm:pt-6 pb-12 sm:pb-16 relative z-10">
          {/* Scrolling Track (Duplicated for Seamless Infinite Loop) */}
          <div className="animate-marquee flex items-center gap-2.5 sm:gap-5">
            {[1, 2].map((loopIndex) => (
              <div key={loopIndex} className="flex items-center gap-2.5 sm:gap-5 shrink-0">
                {/* Card 1 */}
                <div 
                  onClick={() => triggerHighlight(`card-arch-${loopIndex}`)}
                  className={`w-[165px] sm:w-[190px] md:w-[210px] lg:w-[220px] p-3 sm:p-3.5 md:p-4 rounded-xl border transition-all duration-300 ease-out flex flex-col justify-between gap-1 text-left group cursor-pointer ${
                    activeHighlights[`card-arch-${loopIndex}`]
                      ? 'bg-[#781A1A] border-[#781A1A] text-white'
                      : 'bg-white/20 backdrop-blur-md border-white/30 hover:bg-[#781A1A] hover:border-[#781A1A] text-white'
                  }`}
                >
                  <h4 className="text-base sm:text-lg md:text-[20px] lg:text-[22px] leading-snug font-bold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] group-hover:text-white transition-colors">Arquitetura</h4>
                  <p className="text-xs sm:text-xs md:text-[13px] lg:text-[14px] font-medium truncate text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] group-hover:text-white transition-colors">Terrenos Livres</p>
                </div>

                {/* Card 2 */}
                <div 
                  onClick={() => triggerHighlight(`card-ref-${loopIndex}`)}
                  className={`w-[165px] sm:w-[190px] md:w-[210px] lg:w-[220px] p-3 sm:p-3.5 md:p-4 rounded-xl border transition-all duration-300 ease-out flex flex-col justify-between gap-1 text-left group cursor-pointer ${
                    activeHighlights[`card-ref-${loopIndex}`]
                      ? 'bg-[#781A1A] border-[#781A1A] text-white'
                      : 'bg-white/20 backdrop-blur-md border-white/30 hover:bg-[#781A1A] hover:border-[#781A1A] text-white'
                  }`}
                >
                  <h4 className="text-base sm:text-lg md:text-[20px] lg:text-[22px] leading-snug font-bold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] group-hover:text-white transition-colors">Reformas</h4>
                  <p className="text-xs sm:text-xs md:text-[13px] lg:text-[14px] font-medium truncate text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] group-hover:text-white transition-colors">Alterar Construções</p>
                </div>

                {/* Card 3 */}
                <div 
                  onClick={() => triggerHighlight(`card-[#1c2e03]-${loopIndex}`)}
                  className={`w-[165px] sm:w-[190px] md:w-[210px] lg:w-[220px] p-3 sm:p-3.5 md:p-4 rounded-xl border transition-all duration-300 ease-out flex flex-col justify-between gap-1 text-left group cursor-pointer ${
                    activeHighlights[`card-[#1c2e03]-${loopIndex}`]
                      ? 'bg-[#781A1A] border-[#781A1A] text-white'
                      : 'bg-white/20 backdrop-blur-md border-white/30 hover:bg-[#781A1A] hover:border-[#781A1A] text-white'
                  }`}
                >
                  <h4 className="text-base sm:text-lg md:text-[20px] lg:text-[22px] leading-snug font-bold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] group-hover:text-white transition-colors">Interiores</h4>
                  <p className="text-xs sm:text-xs md:text-[13px] lg:text-[14px] font-medium truncate text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] group-hover:text-white transition-colors">Espaços Harmônicos</p>
                </div>

                {/* Card 4 */}
                <div 
                  onClick={() => triggerHighlight(`card-land-${loopIndex}`)}
                  className={`w-[165px] sm:w-[190px] md:w-[210px] lg:w-[220px] p-3 sm:p-3.5 md:p-4 rounded-xl border transition-all duration-300 ease-out flex flex-col justify-between gap-1 text-left group cursor-pointer ${
                    activeHighlights[`card-land-${loopIndex}`]
                      ? 'bg-[#781A1A] border-[#781A1A] text-white'
                      : 'bg-white/20 backdrop-blur-md border-white/30 hover:bg-[#781A1A] hover:border-[#781A1A] text-white'
                  }`}
                >
                  <h4 className="text-base sm:text-lg md:text-[20px] lg:text-[22px] leading-snug font-bold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] group-hover:text-white transition-colors">Paisagismo</h4>
                  <p className="text-xs sm:text-xs md:text-[13px] lg:text-[14px] font-medium truncate text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] group-hover:text-white transition-colors">Áreas Externas</p>
                </div>

                {/* Card 5 */}
                <div 
                  onClick={() => triggerHighlight(`card-urb-${loopIndex}`)}
                  className={`w-[165px] sm:w-[190px] md:w-[210px] lg:w-[220px] p-3 sm:p-3.5 md:p-4 rounded-xl border transition-all duration-300 ease-out flex flex-col justify-between gap-1 text-left group cursor-pointer ${
                    activeHighlights[`card-urb-${loopIndex}`]
                      ? 'bg-[#781A1A] border-[#781A1A] text-white'
                      : 'bg-white/20 backdrop-blur-md border-white/30 hover:bg-[#781A1A] hover:border-[#781A1A] text-white'
                  }`}
                >
                  <h4 className="text-base sm:text-lg md:text-[20px] lg:text-[22px] leading-snug font-bold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] group-hover:text-white transition-colors">Urbanismo</h4>
                  <p className="text-xs sm:text-xs md:text-[13px] lg:text-[14px] font-medium truncate text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] group-hover:text-white transition-colors">Praças e Parques</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção 2: Por que Co-criar */}
      <section 
        id="why-cocreate-section" 
        className="w-full bg-transparent text-white font-sans py-10 sm:py-16 md:py-20 my-4 sm:my-8 border-transparent relative overflow-x-clip flex flex-col items-center justify-center min-h-[500px] sm:min-h-[720px] lg:min-h-[820px] z-10 scroll-mt-20 sm:scroll-mt-24 scroll-snap-section"
      >
        <div className="w-full max-w-7xl mx-auto px-0 sm:px-6 md:px-12 relative z-10 flex flex-col items-center">
          
          {/* DYNAMIC ORBITING COCREATE CARDS COMPONENT */}
          <div className="w-full relative z-10">
            <OrbitingCocreateCards 
              logoBranca={logoVerticalBranca} 
              logoColorida={logoVerticalColorida} 
            />
          </div>

        </div>
      </section>

      {/* Seção 3: Vídeo - Apresentação do Programa */}
      <section 
        id="video-section" 
        className="w-full min-h-screen bg-transparent text-white font-sans pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-8 border-transparent relative flex flex-col justify-center items-center z-10 scroll-snap-section"
      >
        {/* Subtle Ambient Radial Glow in Background at Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[380px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(212,175,55,0.08),transparent)] pointer-events-none" />

        <div className="w-full flex flex-col items-center relative z-10 my-auto py-1">
          {/* Section Headline Above Video - Clean responsive typography with tighter line spacing and light gray shadow */}
          <div className="mb-2 sm:mb-1 text-center w-[92vw] min-w-[280px] max-w-[370px] sm:max-w-none sm:w-[500px] md:w-[620px] lg:w-[760px] mx-auto px-1 flex flex-col items-center relative z-20">
            <h2 className="flex flex-col items-center justify-center w-full text-center tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
              <span className="font-cargiona font-normal text-white tracking-wide text-[24px] xs:text-[27px] sm:text-[34px] md:text-[40px] lg:text-[45px] leading-tight drop-shadow-[0_2px_8px_rgba(220,220,220,0.3)]">
                Entenda o programa
              </span>
              <span className="font-serif italic font-normal text-white text-[35px] xs:text-[40px] sm:text-[50px] md:text-[58px] lg:text-[66px] -mt-2.5 xs:-mt-3 sm:-mt-4 lg:-mt-5 leading-tight drop-shadow-[0_2px_10px_rgba(220,220,220,0.35)]">
                Alquimia Espacial
              </span>
            </h2>
          </div>

          {/* 3-Card Deck: Centered Video Card flanked by 2 side image cards */}
          <div className="w-full flex items-center justify-center mt-[175px] xs:mt-[195px] sm:mt-2 md:mt-3 lg:mt-3 my-3 xs:my-4 sm:my-2 md:my-3 lg:my-3 px-2 sm:px-8 md:px-12 lg:px-16">
            <div className="relative sm:static flex flex-col sm:flex-row items-center justify-center gap-0 w-full max-w-[1400px] mx-auto">
              
              {/* Left Image Card on Desktop & Mobile */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[80%] sm:relative sm:top-0 sm:left-0 sm:translate-x-0 sm:translate-y-0 w-[78vw] max-w-[310px] sm:max-w-none sm:w-[256px] md:w-[336px] lg:w-[416px] xl:w-[496px] aspect-[16/10] rounded-xl sm:rounded-2xl border-transparent bg-transparent overflow-hidden shadow-xl opacity-100 z-0 sm:-mr-[76px] md:-mr-[100px] lg:-mr-[125px] xl:-mr-[148px] pointer-events-none shrink-0 transition-all duration-300">
                <img 
                  src={cardStudioLeft} 
                  alt="Ateliê de Arquitetura e Maquete" 
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover opacity-90 brightness-100"
                />
                <div className="absolute inset-0 bg-white/20 backdrop-blur-[0.5px] pointer-events-none" />
              </div>

              {/* Center Featured Video Card with Subtle White & Golden Halo Light Glow */}
              <div className="relative z-10 shrink-0 group">
                {/* Very Subtle White & Faint Golden Halo Light Glow Behind Center Video */}
                <div className="absolute -inset-2 sm:-inset-3 rounded-2xl md:rounded-3xl bg-gradient-radial from-white/35 via-[#F3C04D]/20 to-transparent blur-xl pointer-events-none -z-10 group-hover:scale-105 transition-all duration-500 opacity-90" />

                <div 
                  onClick={() => setIsVideoPlaying(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsVideoPlaying(true);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Assistir à apresentação do programa"
                  className="relative z-10 w-[92vw] min-w-[280px] max-w-[370px] sm:max-w-none sm:w-[320px] md:w-[420px] lg:w-[520px] xl:w-[620px] aspect-[16/10] rounded-xl sm:rounded-2xl md:rounded-3xl bg-white/10 backdrop-blur-md border-transparent overflow-hidden shrink-0 shadow-[0_0_25px_rgba(255,255,255,0.4),0_0_45px_rgba(243,192,77,0.25)] focus:outline-none transition-all duration-300 group cursor-pointer hover:scale-[1.02] active:scale-[0.96]"
                >
                  {/* Background Video Poster Image - Clear & bright, no heavy dark filter */}
                  <img 
                    src="https://img.youtube.com/vi/j0MB8RpxgPo/maxresdefault.jpg" 
                    alt="Apresentação do Programa Alquimia Espacial" 
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
                  />

                  {/* Subtle edge highlight on play area */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors pointer-events-none" />

                  {/* Pulsating transparent Play Button icon without circle */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <Play className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white/95 fill-white/95 drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] animate-pulse group-hover:scale-110 group-hover:text-white group-hover:fill-white transition-all duration-300" />
                  </div>
                </div>
              </div>

              {/* Right Image Card on Desktop & Mobile */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[80%] sm:relative sm:top-0 sm:left-0 sm:translate-x-0 sm:translate-y-0 w-[78vw] max-w-[310px] sm:max-w-none sm:w-[256px] md:w-[336px] lg:w-[416px] xl:w-[496px] aspect-[16/10] rounded-xl sm:rounded-2xl border-transparent bg-transparent overflow-hidden shadow-xl opacity-100 z-0 sm:-ml-[76px] md:-ml-[100px] lg:-ml-[125px] xl:-ml-[148px] pointer-events-none shrink-0 transition-all duration-300">
                <img 
                  src={cardStudioRight} 
                  alt="Mesa de Apresentação e Projeto Arquitetônico" 
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover opacity-90 brightness-100"
                />
                <div className="absolute inset-0 bg-white/20 backdrop-blur-[0.5px] pointer-events-none" />
              </div>

            </div>
          </div>

          {/* Subtitle Description & Key Pillar Cards Positioned Side-by-Side */}
          <div className="mt-2 sm:mt-0 w-full flex flex-col items-center relative z-30">
            {/* Feature Highlight Cards - 3 side-by-side matching video card width on desktop & mobile, placed directly under video card on mobile over image */}
            <div className="mt-3 sm:mt-1 md:mt-2 lg:mt-2 mb-0 grid grid-cols-3 gap-1.5 sm:gap-2.5 md:gap-3 lg:gap-3.5 w-[92vw] min-w-[280px] max-w-[370px] sm:max-w-none sm:w-[290px] md:w-[380px] lg:w-[470px] xl:w-[560px]">
              <div 
                onClick={() => triggerHighlight('pill-valor')}
                className={`flex items-center justify-center gap-1 sm:gap-1.5 px-1 py-2 sm:px-2 sm:py-2.5 rounded-full transition-all duration-300 ease-out group cursor-pointer text-center w-full border-transparent ${
                  activeHighlights['pill-valor']
                    ? 'bg-[#781A1A] text-white scale-[1.03]'
                    : 'bg-[#A07516] hover:bg-[#781A1A] text-white'
                }`}
              >
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white fill-white shrink-0" />
                <span className="font-sans uppercase text-[9px] xs:text-[10px] sm:text-[11px] md:text-xs lg:text-xs font-bold tracking-wider text-white transition-colors duration-300 truncate">MÉTODO ÚNICO</span>
              </div>

              <div 
                onClick={() => triggerHighlight('pill-processo')}
                className={`flex items-center justify-center gap-1 sm:gap-1.5 px-1 py-2 sm:px-2 sm:py-2.5 rounded-full transition-all duration-300 ease-out group cursor-pointer text-center w-full border-transparent ${
                  activeHighlights['pill-processo']
                    ? 'bg-[#781A1A] text-white scale-[1.03]'
                    : 'bg-[#A07516] hover:bg-[#781A1A] text-white'
                }`}
              >
                <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white shrink-0" />
                <span className="font-sans uppercase text-[9px] xs:text-[10px] sm:text-[11px] md:text-xs lg:text-xs font-bold tracking-wider text-white transition-colors duration-300 truncate">PROJETO AUTORAL</span>
              </div>

              <div 
                onClick={() => triggerHighlight('pill-visao')}
                className={`flex items-center justify-center gap-1 sm:gap-1.5 px-1 py-2 sm:px-2 sm:py-2.5 rounded-full transition-all duration-300 ease-out group cursor-pointer text-center w-full border-transparent ${
                  activeHighlights['pill-visao']
                    ? 'bg-[#781A1A] text-white scale-[1.03]'
                    : 'bg-[#A07516] hover:bg-[#781A1A] text-white'
                }`}
              >
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white shrink-0" />
                <span className="font-sans uppercase text-[9px] xs:text-[10px] sm:text-[11px] md:text-xs lg:text-xs font-bold tracking-wider text-white transition-colors duration-300 truncate">ESCOLHA SEGURA</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Fullscreen Landscape Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-hidden bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
          {/* Backdrop Click */}
          <div 
            className="fixed inset-0 bg-black/90 cursor-pointer" 
            onClick={() => setIsVideoPlaying(false)} 
          />

          {/* Rotated Landscape Card Container on Mobile, Standard Container on Desktop (Zoom-in opening animation) */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rotate-90 w-[calc(100vh-24px)] h-[calc(100vw-20px)] sm:static sm:top-auto sm:left-auto sm:translate-x-0 sm:translate-y-0 sm:rotate-0 sm:w-full sm:max-w-5xl sm:h-auto sm:aspect-[16/9] z-10 bg-neutral-950 border border-neutral-800 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex flex-col justify-center items-center animate-in zoom-in-90 fade-in duration-300 ease-out">
            
            {/* Close X Button - Small, clean white X without background circle */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsVideoPlaying(false);
              }}
              className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-30 p-2 text-white/80 hover:text-white transition-all duration-200 cursor-pointer drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] active:scale-90 flex items-center justify-center group"
              aria-label="Fechar vídeo"
              title="Fechar vídeo"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Embedded Video */}
            <iframe 
              className="w-full h-full border-0 rounded-2xl sm:rounded-3xl bg-black"
              src="https://www.youtube-nocookie.com/embed/j0MB8RpxgPo?autoplay=1&playsinline=1&rel=0" 
              title="Apresentação do Programa Alquimia Espacial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Interactive Pop-Up Proposal Form Modal */}
      {isProposalModalOpen && (
        <Suspense fallback={null}>
          <ProposalFormModal
            isOpen={isProposalModalOpen}
            onClose={() => setIsProposalModalOpen(false)}
            onOpenLogin={() => setIsClientPortalModalOpen(true)}
          />
        </Suspense>
      )}

      {/* Docto-Espacial Restricted Client Portal Login Modal */}
      {isClientPortalModalOpen && (
        <Suspense fallback={null}>
          <ClientPortalModal
            isOpen={isClientPortalModalOpen}
            onClose={() => setIsClientPortalModalOpen(false)}
            onRequestProposal={() => setIsProposalModalOpen(true)}
          />
        </Suspense>
      )}
    </div>
  );
}


