import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, UserStar, Sparkles, Handshake, Hourglass, Gift, X, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface OrbitingCard {
  id: number;
  num: string;
  category: string;
  shortLabel: string;
  title: string;
  desc: string;
  externalText: string;
  icon: React.ElementType;
  orbit: 'inner' | 'middle' | 'outer';
  phaseShift: number;
  speed: number; // radians per second
}

interface OrbitingCocreateCardsProps {
  logoBranca: string;
  logoColorida: string;
}

const STATIC_CARDS: OrbitingCard[] = [
  {
    id: 1,
    num: "01",
    category: "FILOSOFIA",
    shortLabel: "Origem",
    title: "Transformar o que existe no que pode ser.",
    desc: "A alquimia clássica descreve um caminho de transmutação: Nigredo, Albedo, Citrinitas e Rubedo. Cada etapa dissolve, purifica, amadurece e integra aquilo que está no caminho entre o bruto e o essencial.",
    externalText: "A Alquimia Espacial traduz essa origem para a arquitetura. Cada fase do programa corresponde a uma obra alquímica, conduzindo a transformação até que o projeto final se torne a sua própria Pedra Filosofal.",
    icon: Landmark,
    orbit: 'inner',
    phaseShift: 0,
    speed: 0.26
  },
  {
    id: 2,
    num: "02",
    category: "PROPÓSITO",
    shortLabel: "Público",
    title: "82% dos brasileiros constroem sem profissionais.",
    desc: "Segundo o CAU/BR, a maioria das pessoas reforma ou constrói sem contratar arquitetos. Esse dado revela um público autônomo em suas decisões, pesquisas e execução, porém sem a técnica — exatamente o perfil autodidata para o qual este programa foi concebido.",
    externalText: "Este programa nasceu para reduzir essa distância. Não substitui a arquitetura tradicional, nem compete com ela. Cria uma nova porta de entrada: um acompanhamento profissional mais acessível, próximo e participativo.",
    icon: UserStar,
    orbit: 'inner',
    phaseShift: Math.PI,
    speed: 0.26
  },
  {
    id: 3,
    num: "03",
    category: "METODOLOGIA",
    shortLabel: "Diferencial",
    title: "Entre o faça você mesmo e o projeto tradicional.",
    desc: "Uma terceira forma de projetar. Você conta com o olhar técnico de um arquiteto e participa ativamente das decisões, sem passar por todas as etapas de um projeto executivo tradicional. O processo une técnica, estratégia e autonomia para construir um melhor espaço.",
    externalText: "A entrega acontece no nível de anteprojeto: plantas básicas, estudos espaciais e direcionamentos para orientar sua execução. Em troca, você abre mão do detalhamento executivo e do acompanhamento por longos períodos de um projeto tradicional.",
    icon: Sparkles,
    orbit: 'middle',
    phaseShift: 0,
    speed: -0.20
  },
  {
    id: 4,
    num: "04",
    category: "COMPROMISSO",
    shortLabel: "Cocriação",
    title: "O projeto evolui junto com suas decisões.",
    desc: "O processo acontece em ciclos: estudo, preparação, sessão gravada, respostas e novos estudos. A cada etapa, suas decisões orientam o desenvolvimento seguinte, fazendo o projeto evoluir em conjunto até a solução final.",
    externalText: "Ao longo de quatro sessões, percorremos um caminho de construção contínua. As ideias são abertas, exploradas e refinadas em um looping de cocriação, passando pelas etapas da alquimia até que o espaço encontre sua forma mais coerente.",
    icon: Handshake,
    orbit: 'middle',
    phaseShift: Math.PI,
    speed: -0.20
  },
  {
    id: 5,
    num: "05",
    category: "BASTIDORES",
    shortLabel: "Ritmo",
    title: "Cada sessão é resultado de um trabalho invisível.",
    desc: "Antes de cada sessão existe um trabalho de bastidores: estudos, pesquisas e experimentações que dão forma ao próximo passo do projeto. As sessões são gravadas e entregues quando existe uma solução bem construída para apresentar.",
    externalText: "O conceito de trabalho de um ateliê digital permite um ritmo artesanal, onde cada projeto recebe atenção individual. Por isso, o tempo entre sessões acompanha as necessidades de cada etapa e o equilíbrio entre todos os projetos em desenvolvimento.",
    icon: Hourglass,
    orbit: 'outer',
    phaseShift: 0.5 * Math.PI,
    speed: 0.16
  },
  {
    id: 6,
    num: "06",
    category: "CLAREZA",
    shortLabel: "Resultado",
    title: "O projeto termina. A consciência espacial permanece.",
    desc: "Ao participar de cada etapa, você compreende o motivo por trás de cada escolha. O resultado não é apenas um ambiente bem resolvido, mas uma relação mais consciente com o lugar onde vive.",
    externalText: "Referências deixam de ser imagens soltas. Dúvidas dão lugar à clareza. O projeto passa a refletir quem você é hoje — e continua fazendo sentido porque você acompanhou cada decisão que o tornou possível.",
    icon: Gift,
    orbit: 'outer',
    phaseShift: 1.5 * Math.PI,
    speed: 0.16
  }
];

export const OrbitingCocreateCards: React.FC<OrbitingCocreateCardsProps> = ({
  logoBranca,
  logoColorida
}) => {
  const [time, setTime] = useState(0);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [seenCardIds, setSeenCardIds] = useState<Set<number>>(new Set());
  const [previouslySeenCardIds, setPreviouslySeenCardIds] = useState<Set<number>>(new Set());
  const [isLogoPinnedColor, setIsLogoPinnedColor] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1000);

  const containerRef = useRef<HTMLDivElement>(null);

  const showColoredLogo = isLogoPinnedColor || isLogoHovered;

  const cards = useMemo(() => STATIC_CARDS, []);

  // Track previous active card ID so leaving a card commits it to previouslySeenCardIds
  const prevActiveCardIdRef = useRef<number | null>(null);

  // Open card handler (marks card as seen and active)
  const handleOpenCard = useCallback((id: number) => {
    setActiveCardId(id);
    setSeenCardIds((prev) => new Set(prev).add(id));
  }, []);

  // Close card handler
  const handleCloseCard = useCallback(() => {
    setActiveCardId(null);
  }, []);

  // Whenever activeCardId changes, commit the PREVIOUS active card to previouslySeenCardIds
  useEffect(() => {
    if (prevActiveCardIdRef.current !== null && prevActiveCardIdRef.current !== activeCardId) {
      const lastCardId = prevActiveCardIdRef.current;
      setPreviouslySeenCardIds((prev) => new Set(prev).add(lastCardId));
    }
    prevActiveCardIdRef.current = activeCardId;

    if (activeCardId !== null) {
      setSeenCardIds((prev) => new Set(prev).add(activeCardId));
    }
  }, [activeCardId]);

  const [slideDirection, setSlideDirection] = useState<number>(1);

  // Navigate to Next Card
  const handleNextCard = useCallback(() => {
    if (activeCardId === null) return;
    setSlideDirection(1);
    const currentIndex = cards.findIndex((c) => c.id === activeCardId);
    const nextIndex = (currentIndex + 1) % cards.length;
    setActiveCardId(cards[nextIndex].id);
  }, [activeCardId, cards]);

  // Navigate to Previous Card
  const handlePrevCard = useCallback(() => {
    if (activeCardId === null) return;
    setSlideDirection(-1);
    const currentIndex = cards.findIndex((c) => c.id === activeCardId);
    const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
    setActiveCardId(cards[prevIndex].id);
  }, [activeCardId, cards]);

  // Touch swipe support for opening and switching modal cards
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const handleTouchStartCard = useCallback((e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchMoveCard = useCallback((e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEndCard = useCallback(() => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const diffX = touchStartXRef.current - touchEndXRef.current;
      if (diffX > 35) {
        handleNextCard();
      } else if (diffX < -35) {
        handlePrevCard();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  }, [handleNextCard, handlePrevCard]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeCardId === null) return;
      if (e.key === 'ArrowRight') {
        handleNextCard();
      } else if (e.key === 'ArrowLeft') {
        handlePrevCard();
      } else if (e.key === 'Escape') {
        setActiveCardId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCardId, handleNextCard, handlePrevCard]);

  // Responsive container width measurement via ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    setContainerWidth(el.offsetWidth);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Click outside listener to dismiss active card and resume orbit
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && containerRef.current.contains(event.target as Node)) {
        return;
      }
      setActiveCardId(null);
    };

    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);
  useEffect(() => {
    if (activeCardId === null) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Close modal if section moves out of viewport
      if (rect.bottom < viewportHeight * 0.25 || rect.top > viewportHeight * 0.75) {
        setActiveCardId(null);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio < 0.25) {
            setActiveCardId(null);
          }
        }
      },
      { threshold: [0.1, 0.25, 0.5] }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeCardId]);

  const lastStepTimeRef = useRef<number>(0);

  // Wheel handling for card switching or closing on scroll (Desktop)
  useEffect(() => {
    if (activeCardId === null) return;

    let accumulatedDelta = 0;
    let resetTimer: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      // Intercept wheel scroll to keep page static while switching cards
      e.preventDefault();

      accumulatedDelta += e.deltaY;

      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        accumulatedDelta = 0;
      }, 350);

      // Heavy or sustained scroll (> 320px) closes active card modal so page scroll proceeds to next section
      if (Math.abs(accumulatedDelta) > 320) {
        setActiveCardId(null);
        return;
      }

      const now = Date.now();
      // Moderate scroll flick changes card with smooth slide animation
      if (now - lastStepTimeRef.current > 380 && Math.abs(e.deltaY) > 10) {
        lastStepTimeRef.current = now;

        if (e.deltaY > 0) {
          handleNextCard();
        } else {
          handlePrevCard();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(resetTimer);
    };
  }, [activeCardId, handleNextCard, handlePrevCard]);

  // Touch swipe gesture support on mobile when modal is active
  useEffect(() => {
    if (activeCardId === null) return;

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const currentY = e.touches[0].clientY;
        const deltaY = touchStartY - currentY;

        if (Math.abs(deltaY) > 100) {
          setActiveCardId(null);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [activeCardId]);

  // Animation Loop via requestAnimationFrame (Continuous orbit)
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      setTime((prevTime) => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // 3 Perfect Circle Radii (Inner, Middle, Outer) memoized based on container width
  const isMobile = containerWidth < 640;
  const isTablet = containerWidth >= 640 && containerWidth < 1024;

  const innerRadius = useMemo(() => (isMobile ? 95 : isTablet ? 135 : 165), [isMobile, isTablet]);
  const middleRadius = useMemo(() => (isMobile ? 155 : isTablet ? 220 : 280), [isMobile, isTablet]);
  const outerRadius = useMemo(() => (isMobile ? 210 : isTablet ? 310 : 390), [isMobile, isTablet]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-[520px] sm:min-h-[760px] lg:min-h-[920px] flex items-center justify-center overflow-x-clip select-none py-8 sm:py-12 lg:py-16"
      onClick={() => {
        if (activeCardId !== null) {
          setActiveCardId(null);
        }
      }}
    >
      {/* 3 PERFECT CIRCULAR BACKGROUND ORBIT RINGS */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {/* Soft Transparent Yellow / Green Ambient Light Aura Behind Component */}
        <div className={`w-[85vw] max-w-[850px] aspect-square rounded-full bg-gradient-radial transition-all duration-700 blur-2xl sm:blur-[90px] pointer-events-none animate-aura-slow ${
          seenCardIds.size > 0
            ? 'from-[#B9A854]/15 via-[#726910]/8 via-white/2 to-transparent'
            : 'from-[#F3C04D]/15 via-[#E3B573]/8 via-white/2 to-transparent'
        }`} />

        {/* Ring 1 - Inner Orbit */}
        <div 
          className={`absolute rounded-full border transition-all duration-700 animate-ring-glow ${
            seenCardIds.size > 0
              ? 'border-[#B9A854]/30 sm:border-[#B9A854]/40 shadow-[0_0_12px_rgba(185,168,84,0.2),inset_0_0_8px_rgba(185,168,84,0.12)]'
              : 'border-[#E3B573]/30 sm:border-[#E3B573]/40 shadow-[0_0_12px_rgba(227,181,115,0.2),inset_0_0_8px_rgba(227,181,115,0.12)]'
          }`}
          style={{
            width: `${innerRadius * 2}px`,
            height: `${innerRadius * 2}px`,
          }}
        >
          {/* Subtle moving aura gradient sweep around inner ring */}
          <div className={`absolute -inset-[2px] rounded-full pointer-events-none animate-spin-slow mix-blend-screen blur-[1px] transition-all duration-700 ${
            seenCardIds.size > 0
              ? 'bg-[conic-gradient(from_0deg,transparent_0deg,rgba(185,168,84,0.35)_180deg,transparent_220deg)]'
              : 'bg-[conic-gradient(from_0deg,transparent_0deg,rgba(227,181,115,0.35)_180deg,transparent_220deg)]'
          }`} />
          <div className={`absolute inset-0 rounded-full border border-dashed animate-spin-slow pointer-events-none transition-all duration-700 ${
            seenCardIds.size > 0
              ? 'border-[#B9A854]/35 drop-shadow-[0_0_4px_rgba(185,168,84,0.3)]'
              : 'border-[#E3B573]/35 drop-shadow-[0_0_4px_rgba(227,181,115,0.3)]'
          }`} />
        </div>

        {/* Ring 2 - Middle Orbit */}
        <div 
          className={`absolute rounded-full border transition-all duration-700 animate-ring-glow ${
            seenCardIds.size > 0
              ? 'border-[#B9A854]/25 sm:border-[#B9A854]/35 shadow-[0_0_12px_rgba(185,168,84,0.18),inset_0_0_8px_rgba(185,168,84,0.1)]'
              : 'border-[#E3B573]/25 sm:border-[#E3B573]/35 shadow-[0_0_12px_rgba(227,181,115,0.18),inset_0_0_8px_rgba(227,181,115,0.1)]'
          }`}
          style={{
            width: `${middleRadius * 2}px`,
            height: `${middleRadius * 2}px`,
            animationDelay: '1.5s',
          }}
        >
          {/* Subtle moving aura gradient sweep around middle ring */}
          <div className={`absolute -inset-[2px] rounded-full pointer-events-none animate-spin-slow-reverse mix-blend-screen blur-[1px] transition-all duration-700 ${
            seenCardIds.size > 0
              ? 'bg-[conic-gradient(from_90deg,transparent_0deg,rgba(185,168,84,0.3)_180deg,transparent_220deg)]'
              : 'bg-[conic-gradient(from_90deg,transparent_0deg,rgba(227,181,115,0.3)_180deg,transparent_220deg)]'
          }`} />
          <div className={`absolute inset-0 rounded-full border border-dashed animate-spin-slow-reverse pointer-events-none transition-all duration-700 ${
            seenCardIds.size > 0
              ? 'border-[#B9A854]/30 drop-shadow-[0_0_4px_rgba(185,168,84,0.25)]'
              : 'border-[#E3B573]/30 drop-shadow-[0_0_4px_rgba(227,181,115,0.25)]'
          }`} />
        </div>

        {/* Ring 3 - Outer Orbit (3rd Cycle) */}
        <div 
          className={`absolute rounded-full border transition-all duration-700 animate-ring-glow ${
            seenCardIds.size > 0
              ? 'border-[#B9A854]/20 sm:border-[#B9A854]/30 shadow-[0_0_12px_rgba(185,168,84,0.15),inset_0_0_8px_rgba(185,168,84,0.08)]'
              : 'border-[#E3B573]/20 sm:border-[#E3B573]/30 shadow-[0_0_12px_rgba(227,181,115,0.15),inset_0_0_8px_rgba(227,181,115,0.08)]'
          }`}
          style={{
            width: `${outerRadius * 2}px`,
            height: `${outerRadius * 2}px`,
            animationDelay: '3s',
          }}
        >
          {/* Subtle moving aura gradient sweep around outer ring */}
          <div className={`absolute -inset-[2px] rounded-full pointer-events-none animate-spin-slow mix-blend-screen blur-[1px] transition-all duration-700 ${
            seenCardIds.size > 0
              ? 'bg-[conic-gradient(from_180deg,transparent_0deg,rgba(185,168,84,0.25)_180deg,transparent_220deg)]'
              : 'bg-[conic-gradient(from_180deg,transparent_0deg,rgba(227,181,115,0.25)_180deg,transparent_220deg)]'
          }`} />
          <div className={`absolute inset-0 rounded-full border border-dashed animate-spin-slow pointer-events-none transition-all duration-700 ${
            seenCardIds.size > 0
              ? 'border-[#B9A854]/25 drop-shadow-[0_0_4px_rgba(185,168,84,0.2)]'
              : 'border-[#E3B573]/25 drop-shadow-[0_0_4px_rgba(227,181,115,0.2)]'
          }`} />
        </div>
      </div>

      {/* CENTRAL LOGO STAGE - Balanced vertically in center */}
      <div className={`z-10 relative flex flex-col items-center justify-center pointer-events-auto transition-transform duration-500 ${
        showColoredLogo ? '-translate-y-2.5 sm:-translate-y-3.5 lg:-translate-y-4' : '-translate-y-1 sm:-translate-y-2'
      }`}>
        <div 
          className="relative group cursor-pointer flex flex-col items-center p-2 rounded-2xl transition-all"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            setIsLogoPinnedColor((prev) => !prev);
          }}
          role="button"
          tabIndex={0}
          aria-label="Alternar cor da logomarca"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsLogoPinnedColor((prev) => !prev);
            }
          }}
        >
          <div className={`relative flex items-center justify-center transition-all duration-500 ${
            showColoredLogo 
              ? 'w-40 sm:w-52 lg:w-64 h-[210px] sm:h-[295px] lg:h-[360px] scale-105 sm:scale-110' 
              : 'w-36 sm:w-48 lg:w-56 h-[190px] sm:h-[270px] lg:h-[320px] scale-100'
          }`}>
            <img 
              src={logoBranca} 
              alt="Alquimia Espacial Logomarca Vertical Branca" 
              decoding="async"
              loading="eager"
              style={{ filter: 'drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.4))' }}
              className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ${
                showColoredLogo ? 'opacity-0 scale-95' : 'opacity-100 scale-100 group-hover:scale-105'
              }`}
            />
            <img 
              src={logoColorida} 
              alt="Alquimia Espacial Logomarca Vertical Colorida" 
              decoding="async"
              loading="eager"
              style={{ filter: 'drop-shadow(0px 2px 5px rgba(255, 255, 255, 0.85))' }}
              className={`absolute inset-0 w-full h-full object-contain transition-all duration-500 ${
                showColoredLogo ? 'opacity-100 scale-105' : 'opacity-0 scale-95'
              }`}
            />
          </div>
        </div>
      </div>

      {/* ORBITING NODES & EXPANDABLE CENTER CARDS */}
      {cards.map((card) => {
        const IconComponent = card.icon;
        const radius = card.orbit === 'inner' ? innerRadius : card.orbit === 'middle' ? middleRadius : outerRadius;

        const rawAngle = time * card.speed + card.phaseShift;

        // Effective angle calculation for seamless viewport boundary wrapping
        let effectiveAngle = rawAngle;
        const cardMargin = 28; // margin so the node exits the boundary cleanly before wrapping
        const maxAllowedX = containerWidth / 2 + cardMargin;

        if (radius > maxAllowedX) {
          const r = maxAllowedX / radius;
          const thetaCut = Math.acos(Math.min(0.999, Math.max(0.001, r)));

          let u = rawAngle % (2 * Math.PI);
          if (u < 0) u += 2 * Math.PI;

          if (u < Math.PI) {
            // Top visible arc: [thetaCut, π - thetaCut]
            effectiveAngle = thetaCut + (u / Math.PI) * (Math.PI - 2 * thetaCut);
          } else {
            // Bottom visible arc: [π + thetaCut, 2π - thetaCut]
            effectiveAngle = (Math.PI + thetaCut) + ((u - Math.PI) / Math.PI) * (Math.PI - 2 * thetaCut);
          }
        }

        const orbitX = Math.cos(effectiveAngle) * radius;
        const orbitY = Math.sin(effectiveAngle) * radius;

        const isActive = activeCardId === card.id;
        const isSeen = seenCardIds.has(card.id);

        return (
          <motion.div
            key={card.id}
            className="absolute top-1/2 left-1/2 pointer-events-auto"
            initial={false}
            animate={{
              x: orbitX,
              y: orbitY,
            }}
            transition={{ duration: 0 }}
            style={{
              zIndex: card.orbit === 'inner' ? 20 : card.orbit === 'middle' ? 30 : 40,
              willChange: 'transform',
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleOpenCard(card.id);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.stopPropagation();
                handleOpenCard(card.id);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Card ${card.num}: ${card.title}`}
            aria-expanded={isActive}
          >
            {/* FLOATING COMPACT SQUARE ORBIT NODE */}
            <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div
                className={`cursor-pointer transition-all duration-300 flex flex-col items-center justify-center shadow-lg backdrop-blur-2xl overflow-visible aspect-square rounded-2xl p-1.5 group relative border-transparent ${
                  isSeen
                    ? 'w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-b from-[#726910] to-[#B9A854] border-transparent hover:scale-110'
                    : 'w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-b from-[#A07516] to-[#E3B573] border-transparent hover:scale-108'
                }`}
              >
                {/* Subtle Lighting Ambient Overlay without washing out dark top color */}
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none rounded-t-2xl" />

                <div className="w-full h-full flex flex-col items-center justify-center text-center relative z-10">
                  {/* Card Status Badge in top-right */}
                  {isSeen ? (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#4B460A] text-white flex items-center justify-center shadow-md z-20 transition-all border border-[#726910]">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-amber-950 text-amber-200 text-[9px] font-bold font-sans flex items-center justify-center shadow-md z-20 transition-all border border-amber-300/80">
                      {parseInt(card.num, 10)}
                    </span>
                  )}

                  <div className="text-white group-hover:scale-110 transition-transform mb-0.5 drop-shadow-sm">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold leading-none font-sans tracking-tight text-white drop-shadow-sm">
                    {card.shortLabel}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* OVERLAY & EXPANDED CARD WHEN A CARD IS ACTIVE */}
      <AnimatePresence>
        {activeCardId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleCloseCard}
            role="dialog"
            aria-modal="true"
            aria-label="Detalhes do Conceito"
            className="fixed inset-0 bg-black/40 backdrop-blur-[3px] z-[100] flex items-center justify-center p-3 sm:p-6 select-none cursor-pointer overflow-y-auto"
          >
            {(() => {
              const activeCard = cards.find(c => c.id === activeCardId);
              if (!activeCard) return null;

              const activeNum = activeCard.num;

              // Modal turns green ONLY on subsequent reopenings (when previouslySeenCardIds has it)
              const isModalReopenedGreen = previouslySeenCardIds.has(activeCard.id);
              const ActiveIcon = activeCard.icon;

              return (
                <AnimatePresence custom={slideDirection} mode="wait">
                  <motion.div
                    key={activeCard.id}
                    custom={slideDirection}
                    initial={{ opacity: 0, x: slideDirection * 28, scale: 0.97 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: slideDirection * -28, scale: 0.97 }}
                    transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 relative z-50 my-auto px-2 sm:px-6 pointer-events-none py-6"
                  >
                    {/* Left Flanking Text (Positioned to the left of center card on Desktop, top on Mobile) */}
                    <div className="text-center md:text-right w-full max-w-[310px] sm:max-w-[340px] md:max-w-[210px] lg:max-w-[250px] shrink-0 md:absolute md:right-[calc(50%+225px)] lg:right-[calc(50%+255px)] xl:right-[calc(50%+270px)]">
                      <span className={`text-xs sm:text-sm font-mono font-bold tracking-widest uppercase block mb-1 ${
                        isModalReopenedGreen ? 'text-[#D4C550]' : 'text-amber-400'
                      }`}>
                        Conceito {activeNum}
                      </span>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-tight font-sans transition-all duration-300">
                        {activeCard.category}
                      </h3>
                    </div>

                    {/* FIXED CENTER EXPANDED CARD (ALIGNED WITH LOGO CENTER) */}
                    <div 
                      onClick={(e) => e.stopPropagation()}
                      onTouchStart={handleTouchStartCard}
                      onTouchMove={handleTouchMoveCard}
                      onTouchEnd={handleTouchEndCard}
                      className={`pointer-events-auto w-full max-w-[330px] sm:max-w-[360px] lg:max-w-[380px] min-h-[370px] sm:min-h-[390px] lg:min-h-[410px] h-auto rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 flex flex-col justify-between shrink-0 relative overflow-hidden mx-auto transition-colors duration-500 touch-pan-x shadow-[0_25px_60px_rgba(0,0,0,0.95)] border-transparent ${
                        isModalReopenedGreen
                          ? 'bg-gradient-to-b from-[#726910] to-[#B9A854] border-transparent'
                          : 'bg-gradient-to-b from-[#A07516] to-[#E3B573] border-transparent'
                      }`}
                    >
                      {/* Subtle Ambient Vignette Overlay */}
                      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none" />
                      {/* Header Bar matching Reference UI */}
                      <div className="flex items-center justify-between w-full relative z-10">
                        <div className="flex items-center gap-2">
                          {/* Left Frosted Tag Pill */}
                          <div className="bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-transparent shadow-sm">
                            <ActiveIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isModalReopenedGreen ? 'text-[#EFEA99]' : 'text-amber-200'}`} />
                            <span>{activeCard.shortLabel}</span>
                          </div>

                          {/* Middle Tag Pill with 01 / 06 format */}
                          <div className="bg-white/10 backdrop-blur-md px-2.5 py-1.5 rounded-full text-white/90 text-[11px] sm:text-[12px] font-mono border-transparent">
                            {activeNum} / 06
                          </div>
                        </div>

                        {/* Top Right Close 'X' Circle */}
                        <button
                          onClick={handleCloseCard}
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 hover:bg-white/30 text-white transition-all flex items-center justify-center cursor-pointer border-transparent shrink-0 shadow-sm"
                          aria-label="Fechar card"
                        >
                          <X className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </div>

                      {/* Main Content Area */}
                      <div className="my-auto py-3 text-left relative z-10">
                        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight font-sans mb-2 sm:mb-3 drop-shadow-md">
                          {activeCard.title}
                        </h2>
                        <p className={`text-sm sm:text-base font-normal leading-relaxed text-justify drop-shadow-sm ${
                          isModalReopenedGreen ? 'text-amber-50/95' : 'text-amber-100/95'
                        }`}>
                          {activeCard.desc}
                        </p>
                      </div>

                      {/* Footer: Nav Controls & Dash Progress Bar */}
                      <div className="w-full pt-3 border-t border-white/20 flex items-center justify-between gap-3 relative z-10">
                        {/* Standalone Left Arrow at Corner */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevCard();
                          }}
                          className="text-white/80 hover:text-white hover:scale-125 transition-all p-1 cursor-pointer shrink-0"
                          aria-label="Card anterior"
                          title="Card anterior"
                        >
                          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                        </button>

                        {/* Dash Progress Indicators from card 1 through 6 */}
                        <div className="flex-1 flex items-center justify-center gap-2 px-1">
                          {cards.map((c) => {
                            const isCurrent = c.id === activeCard.id;
                            const isCardSeen = seenCardIds.has(c.id);
                            return (
                              <button
                                key={c.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveCardId(c.id);
                                }}
                                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                  isCurrent
                                    ? 'flex-1 max-w-[42px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                                    : isCardSeen
                                      ? 'w-3.5 bg-[#726910]'
                                      : 'w-2.5 bg-white/25 hover:bg-white/50'
                                }`}
                                aria-label={`Ir para card ${c.num}`}
                              />
                            );
                          })}
                        </div>

                        {/* Standalone Right Arrow at Corner */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextCard();
                          }}
                          className="text-white/80 hover:text-white hover:scale-125 transition-all p-1 cursor-pointer shrink-0"
                          aria-label="Próximo card"
                          title="Próximo card"
                        >
                          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>

                    {/* Right Flanking Text (Positioned to the right of center card on Desktop, below on Mobile matching card inner text width & justified) */}
                    <div className="text-justify md:text-left w-full max-w-[270px] sm:max-w-[292px] md:max-w-[210px] lg:max-w-[250px] mx-auto md:mx-0 shrink-0 md:absolute md:left-[calc(50%+225px)] lg:left-[calc(50%+255px)] xl:left-[calc(50%+270px)] relative z-20 pt-1 md:pt-0">
                      <p className="text-sm sm:text-base text-neutral-200 font-normal leading-relaxed">
                        {activeCard.externalText}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};



